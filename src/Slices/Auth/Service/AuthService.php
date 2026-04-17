<?php

declare(strict_types=1);

namespace Stories\Slices\Auth\Service;

use RuntimeException;
use Stories\Shared\Security\JwtService;
use Stories\Shared\Store\InMemoryStore;
use Stories\Slices\Auth\Dto\LoginRequest;
use Stories\Slices\Auth\Dto\RegisterRequest;

final class AuthService
{
    public function __construct(
        private readonly InMemoryStore $store,
        private readonly JwtService $jwtService
    ) {
    }

    /** @return array<string, mixed> */
    public function register(RegisterRequest $request): array
    {
        if (isset($this->store->users[$request->username])) {
            throw new RuntimeException('Username already exists');
        }

        $role = $request->username === 'admin' ? 'admin' : 'player';
        $id = $this->uuid();
        $this->store->users[$request->username] = [
            'id' => $id,
            'username' => $request->username,
            'passwordHash' => hash('sha256', $request->password),
            'role' => $role,
            'wins' => 0,
            'losses' => 0,
            'victoryTokens' => 0,
            'eliminatedWith3' => 0,
        ];

        return $this->tokenPayload($id, $request->username, $role);
    }

    /** @return array<string, mixed> */
    public function login(LoginRequest $request): array
    {
        $user = $this->store->users[$request->username] ?? null;
        if ($user === null || $user['passwordHash'] !== hash('sha256', $request->password)) {
            throw new RuntimeException('Invalid credentials');
        }

        return $this->tokenPayload((string) $user['id'], (string) $user['username'], (string) $user['role']);
    }

    /** @return array<string, mixed> */
    public function me(string $userId): array
    {
        foreach ($this->store->users as $user) {
            if ($user['id'] === $userId) {
                return [
                    'id' => $user['id'],
                    'username' => $user['username'],
                    'role' => $user['role'],
                    'wins' => $user['wins'],
                    'losses' => $user['losses'],
                    'victoryTokens' => $user['victoryTokens'],
                    'eliminatedWith3' => $user['eliminatedWith3'],
                ];
            }
        }

        throw new RuntimeException('User not found');
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
