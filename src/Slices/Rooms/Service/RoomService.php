<?php

declare(strict_types=1);

namespace Stories\Slices\Rooms\Service;

use Stories\Shared\Exception\ApiException;
use Stories\Shared\Http\ApiErrorCode;
use Stories\Shared\Security\AuthenticatedUser;
use Stories\Slices\Rooms\Domain\GameState;
use Stories\Slices\Rooms\Dto\ActionRequest;
use Stories\Slices\Rooms\Dto\CreateRoomRequest;

final class RoomService
{
    public function __construct(
        private readonly RoomRepository $roomRepository,
        private readonly ParticipantRepository $participantRepository,
        private readonly RoomBanRepository $roomBanRepository,
        private readonly GameRepository $gameRepository,
        private readonly RoomSnapshotBuilder $snapshotBuilder,
        private readonly RoundFactory $roundFactory,
        private readonly RoundStateService $roundStateService,
        private readonly int $disconnectGraceSeconds = 30,
        private readonly int $inviteRotateCooldownSeconds = 60
    ) {
    }

    /** @return array<string, mixed> */
    public function create(CreateRoomRequest $request, AuthenticatedUser $actor): array
    {
        if ($this->roomRepository->ownerHasRoom($actor->id)) {
            throw new ApiException(ApiErrorCode::OWNER_ALREADY_HAS_ROOM);
        }

        $roomId = $this->uuid();
        $password = trim($request->password);
        $passwordHash = $password !== '' ? password_hash($password, PASSWORD_DEFAULT) : null;
        $this->roomRepository->create($roomId, $this->generateInviteCode(), $request->name, $actor->id, $request->isPublic, $passwordHash);
        $this->participantRepository->addOwner($roomId, $actor->id);

        return $this->snapshot($roomId, $actor->id);
    }

    /** @return array<string, mixed> */
    public function join(string $roomId, AuthenticatedUser $actor, bool $spectator, ?string $password = null): array
    {
        $room = $this->requireRoom($roomId);
        if ($this->roomBanRepository->isBanned($roomId, $actor->id)) {
            throw new ApiException(ApiErrorCode::USER_BLOCKED_IN_ROOM);
        }
        if ($room->ownerUserId !== $actor->id) {
            $this->guardPassword($room, $password);
        }

        $role = $spectator ? 'spectator' : 'player';
        $this->participantRepository->upsertParticipant($roomId, $actor->id, $role);

        return $this->snapshot($roomId, $actor->id);
    }

    /** @return array<string, mixed> */
    public function joinByInviteCode(string $inviteCode, AuthenticatedUser $actor, bool $spectator, ?string $password = null): array
    {
        $roomId = $this->roomRepository->findRoomIdByInviteCode($inviteCode);
        if ($roomId === null) {
            throw new ApiException(ApiErrorCode::INVITE_CODE_NOT_FOUND);
        }

        return $this->join($roomId, $actor, $spectator, $password);
    }

    /**
     * @return array{items:list<array<string,mixed>>,limit:int,offset:int}
     */
    public function listLobbies(string $visibility, string $passwordFilter, int $limit, int $offset): array
    {
        return [
            'items' => $this->roomRepository->listLobbies($visibility, $passwordFilter, $limit, $offset),
            'limit' => $limit,
            'offset' => $offset,
        ];
    }

    public function leave(string $roomId, AuthenticatedUser $actor): void
    {
        $room = $this->requireRoom($roomId);
        if ($room->ownerUserId === $actor->id) {
            $this->roomRepository->delete($roomId);

            return;
        }

        $this->participantRepository->remove($roomId, $actor->id);
    }

    /** @return array<string, mixed> */
    public function ready(string $roomId, AuthenticatedUser $actor, bool $ready): array
    {
        $this->ensureParticipantExists($roomId, $actor->id);
        $this->participantRepository->setReady($roomId, $actor->id, $ready);

        return $this->snapshot($roomId, $actor->id);
    }

    /** @return array<string, mixed> */
    public function start(string $roomId, AuthenticatedUser $actor): array
    {
        $room = $this->requireRoom($roomId);
        if ($room->ownerUserId !== $actor->id) {
            throw new ApiException(ApiErrorCode::ONLY_OWNER_CAN_START_GAME);
        }

        $playerIds = $this->participantRepository->fetchReadyPlayerIds($roomId);
        if (count($playerIds) < 2) {
            throw new ApiException(ApiErrorCode::NEED_READY_PLAYERS);
        }

        $state = new GameState(
            0,
            [],
            array_fill_keys($playerIds, 0),
            $this->roundFactory->create($playerIds, $playerIds[0], 0)
        );

        $this->gameRepository->upsert($this->uuid(), $roomId, $state);
        $this->roomRepository->updateStatus($roomId, 'in_game');

        return $this->snapshot($roomId, $actor->id);
    }

    /** @return array<string, mixed> */
    public function action(string $roomId, AuthenticatedUser $actor, ActionRequest $request): array
    {
        $game = $this->requireGame($roomId);
        $state = $this->decodeState($game->stateJson);

        $result = $this->roundStateService->applyAction($state, $actor, $request);
        $this->gameRepository->persistState($game->id, $state);

        return $result;
    }

    /** @return array<string, mixed> */
    public function state(string $roomId, ?string $requesterId = null): array
    {
        if ($requesterId !== null) {
            if ($this->roomBanRepository->isBanned($roomId, $requesterId)) {
                throw new ApiException(ApiErrorCode::USER_BLOCKED_IN_ROOM);
            }

            $this->ensureParticipantExists($roomId, $requesterId);
        }
        $this->resolveDisconnectTimeouts($roomId);

        return $this->snapshot($roomId, $requesterId);
    }

    public function markDisconnected(string $roomId, string $userId): void
    {
        $game = $this->requireGame($roomId);
        $state = $this->decodeState($game->stateJson);
        $state->markDisconnected($userId, time() + $this->disconnectGraceSeconds);
        $this->gameRepository->persistState($game->id, $state);
    }

    /** @return array<string, mixed> */
    public function updateSettings(string $roomId, AuthenticatedUser $actor, bool $isPublic, string $password): array
    {
        $room = $this->requireRoom($roomId);
        $this->ensureOwner($room, $actor);

        $trimmed = trim($password);
        $passwordHash = $trimmed === '' ? null : password_hash($trimmed, PASSWORD_DEFAULT);
        $this->roomRepository->updateSettings($roomId, $isPublic, $passwordHash);

        return $this->snapshot($roomId, $actor->id);
    }

    /** @return array<string, mixed> */
    public function regenerateInviteCode(string $roomId, AuthenticatedUser $actor): array
    {
        $room = $this->requireRoom($roomId);
        $this->ensureOwner($room, $actor);

        if ($room->inviteCodeRegeneratedAt !== null) {
            $lastTs = strtotime($room->inviteCodeRegeneratedAt) ?: 0;
            if ((time() - $lastTs) < $this->inviteRotateCooldownSeconds) {
                throw new ApiException(ApiErrorCode::INVITE_CODE_ROTATE_COOLDOWN);
            }
        }

        $this->roomRepository->rotateInviteCode($roomId, $this->generateInviteCode());

        return $this->snapshot($roomId, $actor->id);
    }

    /** @return array<string, mixed> */
    public function kick(string $roomId, AuthenticatedUser $actor, string $targetUserId): array
    {
        $room = $this->requireRoom($roomId);
        $this->ensureOwner($room, $actor);
        if ($targetUserId === $room->ownerUserId) {
            throw new ApiException(ApiErrorCode::OWNER_CANNOT_BE_REMOVED);
        }
        $role = $this->participantRepository->roleForUser($roomId, $targetUserId);
        if ($role !== 'player') {
            throw new ApiException(ApiErrorCode::ONLY_PLAYERS_CAN_BE_KICKED);
        }

        $this->participantRepository->remove($roomId, $targetUserId);

        return $this->snapshot($roomId, $actor->id);
    }

    /** @return array<string, mixed> */
    public function ban(string $roomId, AuthenticatedUser $actor, string $targetUserId): array
    {
        $room = $this->requireRoom($roomId);
        $this->ensureOwner($room, $actor);
        if ($targetUserId === $room->ownerUserId) {
            throw new ApiException(ApiErrorCode::OWNER_CANNOT_BE_REMOVED);
        }

        $this->participantRepository->remove($roomId, $targetUserId);
        $this->roomBanRepository->ban($roomId, $targetUserId, $actor->id);

        return $this->snapshot($roomId, $actor->id);
    }

    private function resolveDisconnectTimeouts(string $roomId): void
    {
        $game = $this->gameRepository->findByRoomId($roomId);
        if ($game === null) {
            return;
        }

        $state = $this->decodeState($game->stateJson);
        if ($this->roundStateService->resolveDisconnectTimeouts($state, time())) {
            $this->gameRepository->persistState($game->id, $state);
        }
    }

    private function ensureParticipantExists(string $roomId, string $userId): void
    {
        if (!$this->participantRepository->exists($roomId, $userId)) {
            throw new ApiException(ApiErrorCode::USER_NOT_IN_ROOM);
        }
    }

    private function ensureOwner(RoomRecord $room, AuthenticatedUser $actor): void
    {
        if ($room->ownerUserId !== $actor->id) {
            throw new ApiException(ApiErrorCode::ONLY_OWNER_CAN_MANAGE_ROOM);
        }
    }

    /** @return array<string, mixed> */
    private function snapshot(string $roomId, ?string $requesterId): array
    {
        return $this->snapshotBuilder->build($this->requireRoom($roomId), $requesterId);
    }

    private function requireRoom(string $roomId): RoomRecord
    {
        $room = $this->roomRepository->findById($roomId);
        if ($room === null) {
            throw new ApiException(ApiErrorCode::ROOM_NOT_FOUND);
        }

        return $room;
    }

    private function requireGame(string $roomId): GameRecord
    {
        $game = $this->gameRepository->findByRoomId($roomId);
        if ($game === null) {
            throw new ApiException(ApiErrorCode::GAME_NOT_STARTED);
        }

        return $game;
    }

    private function decodeState(string $json): GameState
    {
        $payload = json_decode($json, true);

        return GameState::fromPayload(is_array($payload) ? $payload : []);
    }

    private function uuid(): string
    {
        return bin2hex(random_bytes(16));
    }

    private function generateInviteCode(): string
    {
        $alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        for ($attempt = 0; $attempt < 8; $attempt++) {
            $code = '';
            for ($i = 0; $i < 6; $i++) {
                $code .= $alphabet[random_int(0, strlen($alphabet) - 1)];
            }

            if (!$this->roomRepository->inviteCodeExists($code)) {
                return $code;
            }
        }

        throw new ApiException(ApiErrorCode::INVITE_CODE_GENERATION_FAILED);
    }

    private function guardPassword(RoomRecord $room, ?string $password): void
    {
        if ($room->passwordHash === null) {
            return;
        }

        if ($password === null || $password === '') {
            throw new ApiException(ApiErrorCode::ROOM_PASSWORD_REQUIRED);
        }

        if (!password_verify($password, $room->passwordHash)) {
            throw new ApiException(ApiErrorCode::ROOM_PASSWORD_INVALID);
        }
    }
}
