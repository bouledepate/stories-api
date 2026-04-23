<?php

declare(strict_types=1);

namespace Stories\Application\Rooms\ReadyRoom;

use Stories\Application\Rooms\Support\RoomUseCaseSupport;
use Stories\Domain\Rooms\Repository\RoomParticipantsRepository;
use Stories\Shared\Error\ApiException;
use Stories\Shared\Error\ApiErrorCode;
use Stories\Shared\Security\AuthenticatedUser;

final class ReadyRoomHandler
{
    public function __construct(
        private readonly RoomParticipantsRepository $participants,
        private readonly RoomUseCaseSupport $support,
    ) {
    }

    public function handle(string $roomId, AuthenticatedUser $actor, bool $ready): \Stories\Application\Rooms\Support\RoomSnapshotResult
    {
        $this->support->ensureParticipantExists($roomId, $actor->id);
        $role = $this->participants->roleForUser($roomId, $actor->id);
        if ($role !== 'owner' && $role !== 'player') {
            throw new ApiException(ApiErrorCode::ONLY_ACTIVE_PLAYERS_CAN_TOGGLE_READY);
        }

        $this->participants->setReady($roomId, $actor->id, $ready);

        return $this->support->snapshot($roomId, $actor->id);
    }
}
