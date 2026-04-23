<?php

declare(strict_types=1);

namespace Stories\Tests\Unit;

use PHPUnit\Framework\TestCase;
use Psr\Log\NullLogger;
use Stories\Application\Auth\ChangePassword\ChangePasswordHandler;
use Stories\Application\Auth\ChangePassword\ChangePasswordRequest;
use Stories\Application\Auth\Login\LoginRequest;
use Stories\Application\Auth\Register\RegisterRequest;
use Stories\Application\Auth\Login\LoginHandler;
use Stories\Application\Auth\Me\GetMeHandler;
use Stories\Application\Auth\Register\RegisterHandler;
use Stories\Application\Auth\UpdateProfile\UpdateProfileHandler;
use Stories\Infrastructure\Persistence\Auth\DbalAuthUserRepository;
use Stories\Shared\Security\JwtService;
use Stories\Shared\Security\PasswordHasher;
use Stories\Tests\Support\TestDatabase;

final class AuthServiceTest extends TestCase
{
    /** @return array{register:RegisterHandler,login:LoginHandler,changePassword:ChangePasswordHandler} */
    private function handlers(\Doctrine\DBAL\Connection $db, ?PasswordHasher $hasher = null): array
    {
        $passwordHasher = $hasher ?? new PasswordHasher();
        $users = new DbalAuthUserRepository($db);
        $logger = new NullLogger();
        $jwt = new JwtService('test-secret-1234567890');
        $getMe = new GetMeHandler($users);

        return [
            'register' => new RegisterHandler($users, $jwt, $passwordHasher, $logger),
            'login' => new LoginHandler($users, $jwt, $passwordHasher, $logger),
            'updateProfile' => new UpdateProfileHandler($users, $passwordHasher, $getMe, $logger),
            'changePassword' => new ChangePasswordHandler($users, $passwordHasher, $logger),
            'getMe' => $getMe,
        ];
    }

    public function testRegisterHashesPasswordAndUsesPlayerRole(): void
    {
        $db = TestDatabase::create();
        $handlers = $this->handlers($db);

        $handlers['register']->handle(new RegisterRequest('admin', 'StrongPassword123!'));

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

        $handlers = $this->handlers($db, $hasher);
        $tokenPayload = $handlers['login']->handle(new LoginRequest('tester', 'Password#123'))->toArray();

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

        $handlers = $this->handlers($db, $hasher);
        $result = $handlers['changePassword']->handle('u-change-password', new ChangePasswordRequest('Password#123', 'NewPassword#123'))->toArray();

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
