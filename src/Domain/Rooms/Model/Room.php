<?php

declare(strict_types=1);

namespace Stories\Domain\Rooms\Model;

final class Room
{
    public function __construct(
        public readonly string $id,
        public readonly string $inviteCode,
        public readonly string $name,
        public readonly string $ownerUserId,
        public readonly string $ownerUsername,
        public readonly string $status,
        public readonly bool $isPublic,
        public readonly int $maxPlayers,
        public readonly ?string $passwordHash,
        public readonly ?string $inviteCodeRegeneratedAt,
    ) {
    }
}
