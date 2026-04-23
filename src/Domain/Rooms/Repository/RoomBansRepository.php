<?php

declare(strict_types=1);

namespace Stories\Domain\Rooms\Repository;

interface RoomBansRepository
{
    public function isBanned(string $roomId, string $userId): bool;

    public function ban(string $roomId, string $userId, string $blockedByUserId): void;
}
