<?php

declare(strict_types=1);

namespace Stories\Slices\Auth\Service;

use Doctrine\DBAL\Connection;
use RuntimeException;
use Stories\Shared\Security\JwtService;
use Stories\Slices\Auth\Dto\LoginRequest;
use Stories\Slices\Auth\Dto\RegisterRequest;

final class AuthService
{
    public function __construct(
        private readonly Connection $db,
        private readonly JwtService $jwtService
    ) {
    }

    /** @return array<string, mixed> */
    public function register(RegisterRequest $request): array
    {
        $exists = $this->db->fetchOne('SELECT id FROM users WHERE username = ?', [$request->username]);
        if ($exists !== false) {
            throw new RuntimeException('Username already exists');
        }

        $id = $this->uuid();
        $role = $request->username === 'admin' ? 'admin' : 'player';
        $this->db->insert('users', [
            'id' => $id,
            'username' => $request->username,
            'password_hash' => hash('sha256', $request->password),
            'role' => $role,
            'created_at' => gmdate(DATE_ATOM),
        ]);

        $this->db->insert('user_stats', [
            'user_id' => $id,
            'wins' => 0,
            'losses' => 0,
            'victory_tokens' => 0,
            'eliminated_with_3' => 0,
        ]);

        return $this->tokenPayload($id, $request->username, $role);
    }

    /** @return array<string, mixed> */
    public function login(LoginRequest $request): array
    {
        $row = $this->db->fetchAssociative('SELECT id, username, password_hash, role FROM users WHERE username = ?', [$request->username]);
        if ($row === false || $row['password_hash'] !== hash('sha256', $request->password)) {
            throw new RuntimeException('Invalid credentials');
        }

        return $this->tokenPayload((string) $row['id'], (string) $row['username'], (string) $row['role']);
    }

    /** @return array<string, mixed> */
    public function me(string $userId): array
    {
        $row = $this->db->fetchAssociative(
            'SELECT u.id, u.username, u.role, s.wins, s.losses, s.victory_tokens, s.eliminated_with_3
             FROM users u
             JOIN user_stats s ON s.user_id = u.id
             WHERE u.id = ?',
            [$userId]
        );

        if ($row === false) {
            throw new RuntimeException('User not found');
        }

        return [
            'id' => $row['id'],
            'username' => $row['username'],
            'role' => $row['role'],
            'wins' => (int) $row['wins'],
            'losses' => (int) $row['losses'],
            'victoryTokens' => (int) $row['victory_tokens'],
            'eliminatedWith3' => (int) $row['eliminated_with_3'],
        ];
    }

    /** @return array<string, mixed> */
    private function tokenPayload(string $id, string $username, string $role): array
    {
        return [
            'accessToken' => $this->jwtService->issue($id, $username, $role),
            'tokenType' => 'bearer',
        ];
    }

    private function uuid(): string
    {
        return bin2hex(random_bytes(16));
    }
}
