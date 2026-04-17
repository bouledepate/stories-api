<?php

declare(strict_types=1);

namespace Stories\Slices\Auth\Dto;

use InvalidArgumentException;

final class LoginRequest
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

        if ($username === '' || $password === '') {
            throw new InvalidArgumentException('username and password are required');
        }

        return new self($username, $password);
    }
}
