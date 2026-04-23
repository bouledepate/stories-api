<?php

declare(strict_types=1);

namespace Stories\Application\Rooms\LeaveRoom;

use Stories\Application\Rooms\Support\RoomUseCaseSupport;
use Stories\Domain\Rooms\Repository\RoomParticipantsRepository;
use Stories\Domain\Rooms\Repository\RoomsRepository;
use Stories\Shared\Security\AuthenticatedUser;

final class LeaveRoomHandler
{
    public function __construct(
        private readonly RoomsRepository $rooms,
        private readonly RoomParticipantsRepository $participants,
        private readonly RoomUseCaseSupport $support,
    ) {
    }

    public function handle(string $roomId, AuthenticatedUser $actor): void
    {
        $room = $this->support->requireRoom($roomId);
        if ($room->ownerUserId === $actor->id) {
            $this->rooms->delete($roomId);

            return;
        }

        $this->participants->remove($roomId, $actor->id);
    }
}
