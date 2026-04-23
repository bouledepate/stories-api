<?php

declare(strict_types=1);

namespace Stories\Application\Rooms\RegenerateInviteCode;

use Stories\Application\Rooms\Support\RoomUseCaseSupport;
use Stories\Domain\Rooms\Repository\RoomsRepository;
use Stories\Shared\Security\AuthenticatedUser;

final class RegenerateInviteCodeHandler
{
    public function __construct(
        private readonly RoomsRepository $rooms,
        private readonly RoomUseCaseSupport $support,
    ) {
    }

    public function handle(string $roomId, AuthenticatedUser $actor): \Stories\Application\Rooms\Support\RoomSnapshotResult
    {
        $room = $this->support->requireRoom($roomId);
        $this->support->ensureOwner($room, $actor);
        $this->support->ensureInviteCooldown($room);

        $this->rooms->rotateInviteCode($roomId, $this->support->generateInviteCode());

        return $this->support->snapshot($roomId, $actor->id);
    }
}
