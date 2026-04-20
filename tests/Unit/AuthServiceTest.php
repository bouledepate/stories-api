<?php

declare(strict_types=1);

namespace Stories\Tests\Unit;

use PHPUnit\Framework\TestCase;
use Psr\Log\NullLogger;
use Stories\Shared\Security\JwtService;
use Stories\Shared\Security\PasswordHasher;
use Stories\Slices\Auth\Dto\LoginRequest;
use Stories\Slices\Auth\Dto\RegisterRequest;
use Stories\Slices\Auth\Dto\ChangePasswordRequest;
use Stories\Slices\Auth\Service\AuthService;
use Stories\Tests\Support\TestDatabase;

final class AuthServiceTest extends TestCase
{
    public function testRegisterHashesPasswordAndUsesPlayerRole(): void
    {
        $db = TestDatabase::create();
        $service = new AuthService($db, new JwtService('test-secret-1234567890'), new PasswordHasher(), new NullLogger());

        $service->register(new RegisterRequest('admin', 'StrongPassword123!'));

        $row = $db->createQueryBuilder()
            ->select('u.password_hash', 'u.role')
            ->from('users', 'u')
            ->where('u.username = :username')
            ->setParameter('username', 'admin')
            ->fetchAssociative();

        self::assertIsArray($row);
        self::assertNotSame(hash('sha256', 'StrongPassword123!'), (string) $row['password_hash']);
        self::assertTrue(password_verify('StrongPassword123!', (string) $row['password_hash']));
        self::assertSame('player', $row['role']);
    }

    public function testLoginVerifiesArgonHash(): void
    {
        $db = TestDatabase::create();
        $hasher = new PasswordHasher();
        $db->insert('users', [
            'id' => 'u-auth',
            'username' => 'tester',
            'password_hash' => $hasher->hash('Password#123'),
            'role' => 'player',
            'created_at' => gmdate(DATE_ATOM),
        ]);
        $db->insert('user_stats', [
            'user_id' => 'u-auth',
            'wins' => 0,
            'losses' => 0,
            'victory_tokens' => 0,
            'eliminated_with_3' => 0,
        ]);

        $service = new AuthService($db, new JwtService('test-secret-1234567890'), $hasher, new NullLogger());
        $tokenPayload = $service->login(new LoginRequest('tester', 'Password#123'));

        self::assertArrayHasKey('accessToken', $tokenPayload);
    }

    public function testChangePasswordRehashesWhenCurrentPasswordIsValid(): void
    {
        $db = TestDatabase::create();
        $hasher = new PasswordHasher();
        $db->insert('users', [
            'id' => 'u-change-password',
            'username' => 'tester',
            'password_hash' => $hasher->hash('Password#123'),
            'role' => 'player',
            'created_at' => gmdate(DATE_ATOM),
        ]);
        $db->insert('user_stats', [
            'user_id' => 'u-change-password',
            'wins' => 0,
            'losses' => 0,
            'victory_tokens' => 0,
            'eliminated_with_3' => 0,
        ]);

        $service = new AuthService($db, new JwtService('test-secret-1234567890'), $hasher, new NullLogger());
        $result = $service->changePassword('u-change-password', new ChangePasswordRequest('Password#123', 'NewPassword#123'));

        self::assertSame(['message' => 'Password changed'], $result);
        $hash = (string) $db->createQueryBuilder()
            ->select('u.password_hash')
            ->from('users', 'u')
            ->where('u.id = :id')
            ->setParameter('id', 'u-change-password')
            ->fetchOne();
        self::assertTrue($hasher->verify('NewPassword#123', $hash));
    }
}
