<?php

declare(strict_types=1);

namespace Stories\Infrastructure\Persistence\Auth;

use Doctrine\DBAL\Connection;
use Stories\Domain\Auth\Repository\AuthUserRepository;

final class DbalAuthUserRepository implements AuthUserRepository
{
    public function __construct(private readonly Connection $db)
    {
    }

    public function usernameExists(string $username, ?string $exceptUserId = null): bool
    {
        $qb = $this->db->createQueryBuilder()
            ->select('u.id')
            ->from('users', 'u')
            ->where('u.username = :username')
            ->setParameter('username', $username);

        if ($exceptUserId !== null) {
            $qb
                ->andWhere('u.id <> :userId')
                ->setParameter('userId', $exceptUserId);
        }

        return $qb->fetchOne() !== false;
    }

    public function create(string $id, string $username, string $passwordHash, string $role): void
    {
        $this->db->insert('users', [
            'id' => $id,
            'username' => $username,
            'password_hash' => $passwordHash,
            'role' => $role,
            'created_at' => gmdate(DATE_ATOM),
        ]);
    }

    public function findCredentialsByUsername(string $username): ?array
    {
        $row = $this->db->createQueryBuilder()
            ->select('u.id', 'u.username', 'u.password_hash', 'u.role')
            ->from('users', 'u')
            ->where('u.username = :username')
            ->setParameter('username', $username)
            ->fetchAssociative();

        if ($row === false) {
            return null;
        }

        return [
            'id' => (string) $row['id'],
            'username' => (string) $row['username'],
            'passwordHash' => (string) $row['password_hash'],
            'role' => (string) $row['role'],
        ];
    }

    public function updatePasswordHash(string $userId, string $passwordHash): void
    {
        $this->db->update('users', ['password_hash' => $passwordHash], ['id' => $userId]);
    }

    public function updateProfile(string $userId, ?string $username, ?string $passwordHash): void
    {
        $updates = [];
        if ($username !== null) {
            $updates['username'] = $username;
        }
        if ($passwordHash !== null) {
            $updates['password_hash'] = $passwordHash;
        }
        if ($updates === []) {
            return;
        }

        $this->db->update('users', $updates, ['id' => $userId]);
    }

    public function findProfileById(string $userId): ?array
    {
        $row = $this->db->createQueryBuilder()
            ->select('u.id', 'u.username', 'u.role')
            ->from('users', 'u')
            ->where('u.id = :id')
            ->setParameter('id', $userId)
            ->fetchAssociative();

        if ($row === false) {
            return null;
        }

        return [
            'id' => (string) $row['id'],
            'username' => (string) $row['username'],
            'role' => (string) $row['role'],
        ];
    }
}
