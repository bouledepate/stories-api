<?php

declare(strict_types=1);

namespace Stories\Domain\Rooms\Repository;

use Stories\Domain\Rooms\Model\Room;

interface RoomSnapshotProvider
{
    /** @return array<string, mixed> */
    public function build(Room $room, ?string $requesterId): array;
}
