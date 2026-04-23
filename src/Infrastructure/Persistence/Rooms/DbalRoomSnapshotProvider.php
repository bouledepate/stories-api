<?php

declare(strict_types=1);

namespace Stories\Infrastructure\Persistence\Rooms;

use Stories\Domain\Rooms\Model\Room;
use Stories\Domain\Rooms\Repository\RoomSnapshotProvider;

final class DbalRoomSnapshotProvider implements RoomSnapshotProvider
{
    public function __construct(private readonly DbalRoomParticipantsRepository $participants)
    {
    }

    public function build(Room $room, ?string $requesterId): array
    {
        return [
            'roomId' => $room->id,
            'name' => $room->name,
            'ownerId' => $room->ownerUserId,
            'ownerUsername' => $room->ownerUsername,
            'inviteCode' => $room->inviteCode,
            'isPublic' => $room->isPublic,
            'maxPlayers' => $room->maxPlayers,
            'hasPassword' => $room->passwordHash !== null,
            'participants' => $this->participants->fetchSnapshotParticipants($room->id),
        ];
    }
}
