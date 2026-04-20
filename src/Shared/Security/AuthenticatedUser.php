<?php

declare(strict_types=1);

namespace Stories\Shared\Security;

final class AuthenticatedUser
{
    public function __construct(
        public readonly string $id,
        public readonly string $username,
        public readonly string $role
    ) {
    }

    /** @param array<string, mixed> $claims */
    public static function fromClaims(array $claims): self
    {
        return new self(
            (string) ($claims['sub'] ?? ''),
            (string) ($claims['username'] ?? ''),
            (string) ($claims['role'] ?? 'player')
        );
    }
}
