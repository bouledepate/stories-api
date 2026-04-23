<?php

declare(strict_types=1);

namespace Stories\Application\Rooms\GetRoomState;

use Stories\Application\Rooms\Support\RoomUseCaseSupport;

final class GetRoomStateHandler
{
    public function __construct(private readonly RoomUseCaseSupport $support)
    {
    }

    public function handle(string $roomId, ?string $requesterId = null): \Stories\Application\Rooms\Support\RoomSnapshotResult
    {
        if ($requesterId !== null) {
            $this->support->ensureRequesterCanReadState($roomId, $requesterId);
        }

        return $this->support->snapshot($roomId, $requesterId);
    }
}
