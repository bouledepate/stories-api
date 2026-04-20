<?php

declare(strict_types=1);

namespace Stories\Shared\Security;

final class PasswordHasher
{
    public function hash(string $plainPassword): string
    {
        return password_hash($plainPassword, $this->algorithm());
    }

    public function verify(string $plainPassword, string $hash): bool
    {
        return password_verify($plainPassword, $hash);
    }

    public function needsRehash(string $hash): bool
    {
        return password_needs_rehash($hash, $this->algorithm());
    }

    private function algorithm(): string|int|null
    {
        if (defined('PASSWORD_ARGON2ID')) {
            return PASSWORD_ARGON2ID;
        }

        return PASSWORD_BCRYPT;
    }
}
