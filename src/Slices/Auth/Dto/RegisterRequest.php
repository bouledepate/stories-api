<?php

declare(strict_types=1);

namespace Stories\Slices\Auth\Dto;

use InvalidArgumentException;

final class RegisterRequest
{
    public function __construct(
        public readonly string $username,
        public readonly string $password
    ) {
    }

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        $username = trim((string) ($data['username'] ?? ''));
        $password = (string) ($data['password'] ?? '');

        if (mb_strlen($username) < 3 || mb_strlen($username) > 32) {
            throw new InvalidArgumentException('username must be 3..32 chars');
        }

        if (mb_strlen($password) < 6) {
            throw new InvalidArgumentException('password must be at least 6 chars');
        }

        return new self($username, $password);
    }
}
