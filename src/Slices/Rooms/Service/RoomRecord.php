<?php

declare(strict_types=1);

namespace Stories\Slices\Rooms\Service;

final class RoomRecord
{
    public function __construct(
        public readonly string $id,
        public readonly string $inviteCode,
        public readonly string $name,
        public readonly string $ownerUserId,
        public readonly string $status
    ) {
    }

    /** @param array<string, mixed> $row */
    public static function fromRow(array $row): self
    {
        return new self((string) $row['id'], (string) $row['invite_code'], (string) $row['name'], (string) $row['owner_user_id'], (string) $row['status']);
    }
}
