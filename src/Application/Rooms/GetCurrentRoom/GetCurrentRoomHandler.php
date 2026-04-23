<?php

declare(strict_types=1);

namespace Stories\Application\Rooms\GetCurrentRoom;

use Stories\Application\Rooms\Support\RoomUseCaseSupport;
use Stories\Domain\Rooms\Repository\RoomParticipantsRepository;
use Stories\Domain\Rooms\Repository\RoomsRepository;
use Stories\Shared\Security\AuthenticatedUser;

final class GetCurrentRoomHandler
{
    public function __construct(
        private readonly RoomsRepository $rooms,
        private readonly RoomParticipantsRepository $participants,
        private readonly RoomUseCaseSupport $support,
    ) {
    }

    public function handle(AuthenticatedUser $actor): ?\Stories\Application\Rooms\Support\RoomSnapshotResult
    {
        $ownedRoomId = $this->rooms->findOwnedRoomId($actor->id);
        if ($ownedRoomId !== null) {
            return $this->support->snapshot($ownedRoomId, $actor->id);
        }

        $roomId = $this->participants->findLatestRoomIdForUser($actor->id);
        if ($roomId === null) {
            return null;
        }

        return $this->support->snapshot($roomId, $actor->id);
    }
}
