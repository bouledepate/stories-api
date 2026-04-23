<?php

declare(strict_types=1);

namespace Stories\Application\Rooms\UpdateRoomSettings;

use Stories\Application\Rooms\Support\RoomUseCaseSupport;
use Stories\Domain\Rooms\Repository\RoomsRepository;
use Stories\Shared\Security\AuthenticatedUser;

final class UpdateRoomSettingsHandler
{
    public function __construct(
        private readonly RoomsRepository $rooms,
        private readonly RoomUseCaseSupport $support,
    ) {
    }

    public function handle(string $roomId, AuthenticatedUser $actor, bool $isPublic, int $maxPlayers, string $password): \Stories\Application\Rooms\Support\RoomSnapshotResult
    {
        $room = $this->support->requireRoom($roomId);
        $this->support->ensureOwner($room, $actor);

        $trimmed = trim($password);
        $passwordHash = $trimmed === '' ? null : password_hash($trimmed, PASSWORD_DEFAULT);
        $this->rooms->updateSettings($roomId, $isPublic, $maxPlayers, $passwordHash);

        return $this->support->snapshot($roomId, $actor->id);
    }
}
