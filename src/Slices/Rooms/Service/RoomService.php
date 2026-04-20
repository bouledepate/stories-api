<?php

declare(strict_types=1);

namespace Stories\Slices\Rooms\Service;

use Doctrine\DBAL\Connection;
use RuntimeException;
use Stories\Shared\Security\AuthenticatedUser;
use Stories\Slices\Rooms\Domain\GameState;
use Stories\Slices\Rooms\Dto\ActionRequest;
use Stories\Slices\Rooms\Dto\CreateRoomRequest;

final class RoomService
{
    public function __construct(
        private readonly Connection $db,
        private readonly RoundFactory $roundFactory,
        private readonly RoundStateService $roundStateService,
        private readonly int $disconnectGraceSeconds = 30
    ) {
    }

    /** @return array<string, mixed> */
    public function create(CreateRoomRequest $request, AuthenticatedUser $actor): array
    {
        $roomId = $this->uuid();

        $this->db->insert('rooms', [
            'id' => $roomId,
            'invite_code' => $this->generateInviteCode(),
            'name' => $request->name,
            'owner_user_id' => $actor->id,
            'status' => 'lobby',
            'created_at' => gmdate(DATE_ATOM),
        ]);

        $this->db->insert('room_participants', [
            'room_id' => $roomId,
            'user_id' => $actor->id,
            'role' => 'owner',
            'ready' => 0,
            'joined_at' => gmdate(DATE_ATOM),
        ]);

        return $this->snapshot($roomId, $actor->id);
    }

    /** @return array<string, mixed> */
    public function join(string $roomId, AuthenticatedUser $actor, bool $spectator): array
    {
        $this->requireRoom($roomId);

        $role = $spectator ? 'spectator' : 'player';
        $this->db->executeStatement(
            'INSERT INTO room_participants(room_id, user_id, role, ready, joined_at)
             VALUES (?, ?, ?, 0, ?)
             ON CONFLICT(room_id, user_id) DO UPDATE SET role = excluded.role',
            [$roomId, $actor->id, $role, gmdate(DATE_ATOM)]
        );

        return $this->snapshot($roomId, $actor->id);
    }

    /** @return array<string, mixed> */
    public function joinByInviteCode(string $inviteCode, AuthenticatedUser $actor, bool $spectator): array
    {
        $roomId = $this->db->createQueryBuilder()
            ->select('r.id')
            ->from('rooms', 'r')
            ->where('r.invite_code = :inviteCode')
            ->setParameter('inviteCode', $inviteCode)
            ->fetchOne();
        if ($roomId === false) {
            throw new RuntimeException('Invite code not found');
        }

        return $this->join((string) $roomId, $actor, $spectator);
    }

    public function leave(string $roomId, AuthenticatedUser $actor): void
    {
        $this->db->delete('room_participants', ['room_id' => $roomId, 'user_id' => $actor->id]);
    }

    /** @return array<string, mixed> */
    public function ready(string $roomId, AuthenticatedUser $actor, bool $ready): array
    {
        $this->ensureParticipantExists($roomId, $actor->id);

        $this->db->update('room_participants', ['ready' => $ready ? 1 : 0], ['room_id' => $roomId, 'user_id' => $actor->id]);

        return $this->snapshot($roomId, $actor->id);
    }

    /** @return array<string, mixed> */
    public function start(string $roomId, AuthenticatedUser $actor): array
    {
        $room = $this->requireRoom($roomId);
        if ($room->ownerUserId !== $actor->id) {
            throw new RuntimeException('Only owner can start game');
        }

        $playerIds = $this->fetchReadyPlayerIds($roomId);
        if (count($playerIds) < 2) {
            throw new RuntimeException('Need at least 2 ready players');
        }

        $state = new GameState(
            0,
            [],
            array_fill_keys($playerIds, 0),
            $this->roundFactory->create($playerIds, $playerIds[0], 0)
        );

        $gameId = $this->uuid();
        $this->db->executeStatement(
            'INSERT INTO games(id, room_id, status, decree_rounds_used, state_json, created_at)
             VALUES (?, ?, ?, ?, ?, ?)
             ON CONFLICT(room_id) DO UPDATE SET id=excluded.id, status=excluded.status, decree_rounds_used=excluded.decree_rounds_used, state_json=excluded.state_json',
            [$gameId, $roomId, 'in_progress', 0, json_encode($state->toPayload(), JSON_UNESCAPED_UNICODE), gmdate(DATE_ATOM)]
        );

        $this->db->update('rooms', ['status' => 'in_game'], ['id' => $roomId]);

        return $this->snapshot($roomId, $actor->id);
    }

    /** @return array<string, mixed> */
    public function action(string $roomId, AuthenticatedUser $actor, ActionRequest $request): array
    {
        $game = $this->requireGame($roomId);
        $state = $this->decodeState($game->stateJson);

        $result = $this->roundStateService->applyAction($state, $actor, $request);
        $this->persistState($game->id, $state);

        return $result;
    }

    /** @return array<string, mixed> */
    public function state(string $roomId, ?string $requesterId = null): array
    {
        $this->resolveDisconnectTimeouts($roomId);

        return $this->snapshot($roomId, $requesterId);
    }

    public function markDisconnected(string $roomId, string $userId): void
    {
        $game = $this->requireGame($roomId);
        $state = $this->decodeState($game->stateJson);
        $state->markDisconnected($userId, time() + $this->disconnectGraceSeconds);
        $this->persistState($game->id, $state);
    }

    private function resolveDisconnectTimeouts(string $roomId): void
    {
        $game = $this->findGame($roomId);
        if ($game === null) {
            return;
        }

        $state = $this->decodeState($game->stateJson);
        if ($this->roundStateService->resolveDisconnectTimeouts($state, time())) {
            $this->persistState($game->id, $state);
        }
    }

    /** @return list<string> */
    private function fetchReadyPlayerIds(string $roomId): array
    {
        $readyPlayers = $this->db->fetchAllAssociative(
            "SELECT user_id FROM room_participants WHERE room_id = ? AND role IN ('owner','player') AND ready = 1 ORDER BY joined_at",
            [$roomId]
        );

        return array_map(static fn (array $row): string => (string) $row['user_id'], $readyPlayers);
    }

    private function ensureParticipantExists(string $roomId, string $userId): void
    {
        $exists = $this->db->fetchOne('SELECT 1 FROM room_participants WHERE room_id = ? AND user_id = ?', [$roomId, $userId]);
        if ($exists === false) {
            throw new RuntimeException('User is not in room');
        }
    }

    /** @return array<string, mixed> */
    private function snapshot(string $roomId, ?string $requesterId): array
    {
        $room = $this->requireRoom($roomId);
        $participantsRows = $this->db->fetchAllAssociative(
            'SELECT p.user_id, u.username, p.role, p.ready
             FROM room_participants p JOIN users u ON u.id = p.user_id
             WHERE p.room_id = ? ORDER BY p.joined_at',
            [$roomId]
        );

        $participants = array_map(
            static fn (array $row): array => [
                'userId' => (string) $row['user_id'],
                'username' => (string) $row['username'],
                'role' => (string) $row['role'],
                'ready' => ((int) $row['ready']) === 1,
            ],
            $participantsRows
        );

        $snapshot = [
            'roomId' => $room->id,
            'name' => $room->name,
            'ownerId' => $room->ownerUserId,
            'inviteCode' => $room->inviteCode,
            'participants' => $participants,
        ];

        $game = $this->findGame($roomId);
        if ($game !== null) {
            $state = $this->decodeState($game->stateJson);
            $round = $state->round;

            $snapshot['game'] = [
                'gameId' => $game->id,
                'status' => $game->status,
                'publicState' => [
                    'activeDecree' => $round->activeDecree?->toPayload(),
                    'alivePlayers' => $round->alivePlayers(),
                    'discardPile' => $round->discardPilePayload(),
                    'currentTurnPlayerId' => $round->currentPlayerId(),
                    'deckCount' => $round->deckCount(),
                ],
                'privateState' => $requesterId !== null ? ['yourHand' => $round->handPayloadFor($requesterId)] : [],
            ];
        }

        return $snapshot;
    }

    private function requireRoom(string $roomId): RoomRecord
    {
        $room = $this->db->createQueryBuilder()
            ->select('r.id', 'r.invite_code', 'r.name', 'r.owner_user_id', 'r.status')
            ->from('rooms', 'r')
            ->where('r.id = :roomId')
            ->setParameter('roomId', $roomId)
            ->fetchAssociative();
        if ($room === false) {
            throw new RuntimeException('Room not found');
        }

        return RoomRecord::fromRow($room);
    }

    private function requireGame(string $roomId): GameRecord
    {
        $game = $this->findGame($roomId);
        if ($game === null) {
            throw new RuntimeException('Game not started');
        }

        return $game;
    }

    private function findGame(string $roomId): ?GameRecord
    {
        $row = $this->db->fetchAssociative('SELECT id, room_id, status, decree_rounds_used, state_json FROM games WHERE room_id = ?', [$roomId]);

        return $row === false ? null : GameRecord::fromRow($row);
    }

    private function persistState(string $gameId, GameState $state): void
    {
        $this->db->update('games', ['state_json' => json_encode($state->toPayload(), JSON_UNESCAPED_UNICODE)], ['id' => $gameId]);
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

            $exists = $this->db->createQueryBuilder()
                ->select('1')
                ->from('rooms', 'r')
                ->where('r.invite_code = :inviteCode')
                ->setParameter('inviteCode', $code)
                ->fetchOne();
            if ($exists === false) {
                return $code;
            }
        }

        throw new RuntimeException('Failed to generate invite code');
    }
}

final class RoomRecord
{
    public function __construct(
        public readonly string $id,
        public readonly string $inviteCode,
        public readonly string $name,
        public readonly string $ownerUserId,
        public readonly string $status
    ) {
    }

    /** @param array<string, mixed> $row */
    public static function fromRow(array $row): self
    {
        return new self((string) $row['id'], (string) $row['invite_code'], (string) $row['name'], (string) $row['owner_user_id'], (string) $row['status']);
    }
}

final class GameRecord
{
    public function __construct(
        public readonly string $id,
        public readonly string $roomId,
        public readonly string $status,
        public readonly int $decreeRoundsUsed,
        public readonly string $stateJson
    ) {
    }

    /** @param array<string, mixed> $row */
    public static function fromRow(array $row): self
    {
        return new self(
            (string) $row['id'],
            (string) $row['room_id'],
            (string) $row['status'],
            (int) $row['decree_rounds_used'],
            (string) $row['state_json']
        );
    }
}
