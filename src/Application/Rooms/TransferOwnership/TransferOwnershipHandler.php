<?php

declare(strict_types=1);

namespace Stories\Application\Rooms\TransferOwnership;

use Stories\Application\Rooms\Support\RoomUseCaseSupport;
use Stories\Domain\Rooms\Repository\RoomParticipantsRepository;
use Stories\Domain\Rooms\Repository\RoomsRepository;
use Stories\Shared\Error\ApiException;
use Stories\Shared\Error\ApiErrorCode;
use Stories\Shared\Security\AuthenticatedUser;

final class TransferOwnershipHandler
{
    public function __construct(
        private readonly RoomsRepository $rooms,
        private readonly RoomParticipantsRepository $participants,
        private readonly RoomUseCaseSupport $support,
    ) {
    }

    public function handle(string $roomId, AuthenticatedUser $actor, string $targetUserId): \Stories\Application\Rooms\Support\RoomSnapshotResult
    {
        $room = $this->support->requireRoom($roomId);
        $this->support->ensureOwner($room, $actor);
        if ($targetUserId === $actor->id) {
            throw new ApiException(ApiErrorCode::CANNOT_TRANSFER_OWNERSHIP_TO_SELF);
        }

        $role = $this->participants->roleForUser($roomId, $targetUserId);
        if ($role === null) {
            throw new ApiException(ApiErrorCode::USER_NOT_IN_ROOM);
        }
        if ($role === 'spectator') {
            throw new ApiException(ApiErrorCode::SPECTATORS_CAN_ONLY_BE_KICKED);
        }

        $this->rooms->transferOwnership($roomId, $actor->id, $targetUserId);

        return $this->support->snapshot($roomId, $targetUserId);
    }
}
