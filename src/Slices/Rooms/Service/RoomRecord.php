<?php

declare(strict_types=1);

namespace Stories\Slices\Rooms\Service;

use Stories\Shared\Validation\BooleanNormalizer;

final class RoomRecord
{
    public function __construct(
        public readonly string $id,
        public readonly string $inviteCode,
        public readonly string $name,
        public readonly string $ownerUserId,
        public readonly string $ownerUsername,
        public readonly string $status,
        public readonly bool $isPublic,
        public readonly ?string $passwordHash,
        public readonly ?string $inviteCodeRegeneratedAt
    ) {
    }

    /** @param array<string, mixed> $row */
    public static function fromRow(array $row): self
    {
        return new self(
            (string) $row['id'],
            (string) $row['invite_code'],
            (string) $row['name'],
            (string) $row['owner_user_id'],
            (string) ($row['owner_username'] ?? ''),
            (string) $row['status'],
            BooleanNormalizer::fromMixed($row['is_public'] ?? null, true),
            isset($row['password_hash']) && $row['password_hash'] !== '' ? (string) $row['password_hash'] : null,
            isset($row['invite_code_regenerated_at']) && $row['invite_code_regenerated_at'] !== '' ? (string) $row['invite_code_regenerated_at'] : null
        );
    }
}
