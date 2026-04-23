<?php

declare(strict_types=1);

namespace Stories\Application\Rooms\KickParticipant;

use Stories\Application\Rooms\Support\RoomUseCaseSupport;
use Stories\Domain\Rooms\Repository\RoomParticipantsRepository;
use Stories\Shared\Error\ApiException;
use Stories\Shared\Error\ApiErrorCode;
use Stories\Shared\Security\AuthenticatedUser;

final class KickParticipantHandler
{
    public function __construct(
        private readonly RoomParticipantsRepository $participants,
        private readonly RoomUseCaseSupport $support,
    ) {
    }

    public function handle(string $roomId, AuthenticatedUser $actor, string $targetUserId): \Stories\Application\Rooms\Support\RoomSnapshotResult
    {
        $room = $this->support->requireRoom($roomId);
        $this->support->ensureOwner($room, $actor);
        if ($targetUserId === $room->ownerUserId) {
            throw new ApiException(ApiErrorCode::OWNER_CANNOT_BE_REMOVED);
        }

        $role = $this->participants->roleForUser($roomId, $targetUserId);
        if ($role === null) {
            throw new ApiException(ApiErrorCode::ONLY_PLAYERS_CAN_BE_KICKED);
        }

        $this->participants->remove($roomId, $targetUserId);

        return $this->support->snapshot($roomId, $actor->id);
    }
}
