<?php

declare(strict_types=1);

namespace Stories\Slices\Auth\Service;

use Doctrine\DBAL\Connection;
use Psr\Log\LoggerInterface;
use Stories\Shared\Exception\ApiException;
use Stories\Shared\Http\ApiErrorCode;
use Stories\Shared\Security\JwtService;
use Stories\Shared\Security\PasswordHasher;
use Stories\Slices\Auth\Dto\LoginRequest;
use Stories\Slices\Auth\Dto\RegisterRequest;
use Stories\Slices\Auth\Dto\ChangePasswordRequest;
use Stories\Slices\Auth\Dto\UpdateProfileRequest;

final class AuthService
{
    public function __construct(
        private readonly Connection $db,
        private readonly JwtService $jwtService,
        private readonly PasswordHasher $passwordHasher,
        private readonly LoggerInterface $logger
    ) {
    }

    /** @return array<string, mixed> */
    public function register(RegisterRequest $request): array
    {
        $this->logFlow('auth.register.attempt', ['username' => $request->username]);
        $exists = $this->db->createQueryBuilder()
            ->select('u.id')
            ->from('users', 'u')
            ->where('u.username = :username')
            ->setParameter('username', $request->username)
            ->fetchOne();

        if ($exists !== false) {
            $this->logFlow('auth.register.failed', ['username' => $request->username, 'reason' => 'USERNAME_ALREADY_EXISTS']);
            throw new ApiException(ApiErrorCode::USER_EXISTS);
        }

        $id = $this->uuid();
        $role = 'player';
        $this->db->insert('users', [
            'id' => $id,
            'username' => $request->username,
            'password_hash' => $this->passwordHasher->hash($request->password),
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

        $this->logFlow('auth.register.success', ['userId' => $id, 'username' => $request->username, 'role' => $role]);

        return $this->tokenPayload($id, $request->username, $role);
    }

    /** @return array<string, mixed> */
    public function login(LoginRequest $request): array
    {
        $this->logFlow('auth.login.attempt', ['username' => $request->username]);
        $row = $this->db->createQueryBuilder()
            ->select('u.id', 'u.username', 'u.password_hash', 'u.role')
            ->from('users', 'u')
            ->where('u.username = :username')
            ->setParameter('username', $request->username)
            ->fetchAssociative();

        if ($row === false || !$this->passwordHasher->verify($request->password, (string) $row['password_hash'])) {
            $this->logFlow('auth.login.failed', ['username' => $request->username, 'reason' => 'INVALID_CREDENTIALS']);
            throw new ApiException(ApiErrorCode::INVALID_CREDENTIALS);
        }

        if ($this->passwordHasher->needsRehash((string) $row['password_hash'])) {
            $this->db->update('users', ['password_hash' => $this->passwordHasher->hash($request->password)], ['id' => $row['id']]);
        }

        $this->logFlow('auth.login.success', ['userId' => (string) $row['id'], 'username' => (string) $row['username'], 'role' => (string) $row['role']]);

        return $this->tokenPayload((string) $row['id'], (string) $row['username'], (string) $row['role']);
    }

    /** @return array<string, mixed> */
    public function updateProfile(string $userId, UpdateProfileRequest $request): array
    {
        $this->logFlow('auth.profile.update.attempt', ['userId' => $userId]);
        $updates = [];

        if ($request->username !== null) {
            $exists = $this->db->createQueryBuilder()
                ->select('u.id')
                ->from('users', 'u')
                ->where('u.username = :username')
                ->andWhere('u.id <> :userId')
                ->setParameter('username', $request->username)
                ->setParameter('userId', $userId)
                ->fetchOne();

            if ($exists !== false) {
                $this->logFlow('auth.profile.update.failed', ['userId' => $userId, 'reason' => 'USERNAME_ALREADY_EXISTS']);
                throw new ApiException(ApiErrorCode::USER_EXISTS);
            }
            $updates['username'] = $request->username;
        }

        if ($request->password !== null) {
            $updates['password_hash'] = $this->passwordHasher->hash($request->password);
        }

        if ($updates === []) {
            $this->logFlow('auth.profile.update.failed', ['userId' => $userId, 'reason' => 'NO_FIELDS_TO_UPDATE']);
            throw new ApiException(ApiErrorCode::NO_FIELDS_TO_UPDATE);
        }

        $this->db->update('users', $updates, ['id' => $userId]);

        $this->logFlow('auth.profile.update.success', ['userId' => $userId, 'updatedFields' => array_keys($updates)]);

        return $this->me($userId);
    }

    /** @return array<string, mixed> */
    public function changePassword(string $userId, ChangePasswordRequest $request): array
    {
        $this->logFlow('auth.password.change.attempt', ['userId' => $userId]);
        $row = $this->db->createQueryBuilder()
            ->select('u.password_hash')
            ->from('users', 'u')
            ->where('u.id = :id')
            ->setParameter('id', $userId)
            ->fetchAssociative();

        if ($row === false) {
            $this->logFlow('auth.password.change.failed', ['userId' => $userId, 'reason' => 'USER_NOT_FOUND']);
            throw new ApiException(ApiErrorCode::USER_NOT_FOUND);
        }

        if (!$this->passwordHasher->verify($request->currentPassword, (string) $row['password_hash'])) {
            $this->logFlow('auth.password.change.failed', ['userId' => $userId, 'reason' => 'CURRENT_PASSWORD_INVALID']);
            throw new ApiException(ApiErrorCode::CURRENT_PASSWORD_INVALID);
        }

        $this->db->update('users', [
            'password_hash' => $this->passwordHasher->hash($request->newPassword),
        ], ['id' => $userId]);

        $this->logFlow('auth.password.change.success', ['userId' => $userId]);

        return ['message' => 'Password changed'];
    }

    /** @return array<string, mixed> */
    public function me(string $userId): array
    {
        $row = $this->db->createQueryBuilder()
            ->select('u.id', 'u.username', 'u.role', 's.wins', 's.losses', 's.victory_tokens', 's.eliminated_with_3')
            ->from('users', 'u')
            ->innerJoin('u', 'user_stats', 's', 's.user_id = u.id')
            ->where('u.id = :id')
            ->setParameter('id', $userId)
            ->fetchAssociative();

        if ($row === false) {
            throw new ApiException(ApiErrorCode::USER_NOT_FOUND);
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

    /** @param array<string, mixed> $context */
    private function logFlow(string $event, array $context = []): void
    {
        $this->logger->info($event, $context);
    }
}
