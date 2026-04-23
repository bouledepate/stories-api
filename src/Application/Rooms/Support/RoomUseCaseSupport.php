<?php

declare(strict_types=1);

namespace Stories\Application\Rooms\Support;

use Stories\Domain\Rooms\Model\Room;
use Stories\Domain\Rooms\Repository\RoomBansRepository;
use Stories\Domain\Rooms\Repository\RoomParticipantsRepository;
use Stories\Domain\Rooms\Repository\RoomsRepository;
use Stories\Domain\Rooms\Repository\RoomSnapshotProvider;
use Stories\Shared\Error\ApiException;
use Stories\Shared\Error\ApiErrorCode;
use Stories\Shared\Security\AuthenticatedUser;

final class RoomUseCaseSupport
{
    public function __construct(
        private readonly RoomsRepository $rooms,
        private readonly RoomParticipantsRepository $participants,
        private readonly RoomBansRepository $bans,
        private readonly RoomSnapshotProvider $snapshots,
        private readonly int $inviteRotateCooldownSeconds = 60,
    ) {
    }

    public function requireRoom(string $roomId): Room
    {
        $room = $this->rooms->findById($roomId);
        if ($room === null) {
            throw new ApiException(ApiErrorCode::ROOM_NOT_FOUND);
        }

        return $room;
    }

    public function snapshot(string $roomId, ?string $requesterId): RoomSnapshotResult
    {
        return RoomSnapshotResult::fromArray($this->snapshots->build($this->requireRoom($roomId), $requesterId));
    }

    public function ensureOwner(Room $room, AuthenticatedUser $actor): void
    {
        if ($room->ownerUserId !== $actor->id) {
            throw new ApiException(ApiErrorCode::ONLY_OWNER_CAN_MANAGE_ROOM);
        }
    }

    public function ensureParticipantExists(string $roomId, string $userId): void
    {
        if (!$this->participants->exists($roomId, $userId)) {
            throw new ApiException(ApiErrorCode::USER_NOT_IN_ROOM);
        }
    }

    public function ensureRequesterCanReadState(string $roomId, string $requesterId): void
    {
        if ($this->bans->isBanned($roomId, $requesterId)) {
            throw new ApiException(ApiErrorCode::USER_BLOCKED_IN_ROOM);
        }

        $this->ensureParticipantExists($roomId, $requesterId);
    }

    public function guardPassword(Room $room, ?string $password): void
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

    public function generateRoomId(): string
    {
        return bin2hex(random_bytes(16));
    }

    public function generateInviteCode(): string
    {
        $alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        for ($attempt = 0; $attempt < 8; $attempt++) {
            $code = '';
            for ($i = 0; $i < 6; $i++) {
                $code .= $alphabet[random_int(0, strlen($alphabet) - 1)];
            }

            if (!$this->rooms->inviteCodeExists($code)) {
                return $code;
            }
        }

        throw new ApiException(ApiErrorCode::INVITE_CODE_GENERATION_FAILED);
    }

    public function ensureInviteCooldown(Room $room): void
    {
        if ($room->inviteCodeRegeneratedAt === null) {
            return;
        }

        $lastTs = strtotime($room->inviteCodeRegeneratedAt) ?: 0;
        if ((time() - $lastTs) < $this->inviteRotateCooldownSeconds) {
            throw new ApiException(ApiErrorCode::INVITE_CODE_ROTATE_COOLDOWN);
        }
    }
}
