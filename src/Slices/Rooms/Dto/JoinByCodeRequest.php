<?php

declare(strict_types=1);

namespace Stories\Slices\Rooms\Dto;

use InvalidArgumentException;

final class JoinByCodeRequest
{
    public function __construct(
        public readonly string $inviteCode,
        public readonly bool $spectator
    ) {
    }

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        $inviteCode = strtoupper(trim((string) ($data['inviteCode'] ?? '')));
        if (!preg_match('/^[A-Z0-9]{6}$/', $inviteCode)) {
            throw new InvalidArgumentException('inviteCode must be 6 chars [A-Z0-9]');
        }

        return new self($inviteCode, (bool) ($data['spectator'] ?? false));
    }
}
