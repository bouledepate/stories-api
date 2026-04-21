<?php

declare(strict_types=1);

namespace Stories\Slices\Rooms\Service;

final class RoomSnapshotBuilder
{
    public function __construct(
        private readonly ParticipantRepository $participantRepository
    ) {
    }

    /** @return array<string, mixed> */
    public function build(RoomRecord $room, ?string $requesterId): array
    {
        $snapshot = [
            'roomId' => $room->id,
            'name' => $room->name,
            'ownerId' => $room->ownerUserId,
            'ownerUsername' => $room->ownerUsername,
            'inviteCode' => $room->inviteCode,
            'isPublic' => $room->isPublic,
            'hasPassword' => $room->passwordHash !== null,
            'participants' => $this->participantRepository->fetchSnapshotParticipants($room->id),
        ];

        return $snapshot;
    }
}
