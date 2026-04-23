<?php

declare(strict_types=1);

namespace Stories\Domain\Auth\Repository;

interface AuthUserRepository
{
    public function usernameExists(string $username, ?string $exceptUserId = null): bool;

    public function create(string $id, string $username, string $passwordHash, string $role): void;

    /** @return array{id:string,username:string,passwordHash:string,role:string}|null */
    public function findCredentialsByUsername(string $username): ?array;

    public function updatePasswordHash(string $userId, string $passwordHash): void;

    public function updateProfile(string $userId, ?string $username, ?string $passwordHash): void;

    /** @return array{id:string,username:string,role:string}|null */
    public function findProfileById(string $userId): ?array;
}
