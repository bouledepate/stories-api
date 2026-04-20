<?php

declare(strict_types=1);

namespace Stories\Slices\Auth\Dto;

use InvalidArgumentException;

final class UpdateProfileRequest
{
    public function __construct(
        public readonly ?string $username,
        public readonly ?string $password
    ) {
    }

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        $username = array_key_exists('username', $data) ? trim((string) $data['username']) : null;
        $password = array_key_exists('password', $data) ? (string) $data['password'] : null;

        if ($username !== null && (mb_strlen($username) < 3 || mb_strlen($username) > 32)) {
            throw new InvalidArgumentException('username must be 3..32 chars');
        }
        if ($password !== null && mb_strlen($password) < 6) {
            throw new InvalidArgumentException('password must be at least 6 chars');
        }
        if ($username === null && $password === null) {
            throw new InvalidArgumentException('No fields to update');
        }

        return new self($username, $password);
    }
}
