<?php

declare(strict_types=1);

namespace Stories\Application\Auth\Login;

use Psr\Log\LoggerInterface;
use Stories\Domain\Auth\Repository\AuthUserRepository;
use Stories\Shared\Error\ApiException;
use Stories\Shared\Error\ApiErrorCode;
use Stories\Shared\Security\JwtService;
use Stories\Shared\Security\PasswordHasher;

final class LoginHandler
{
    public function __construct(
        private readonly AuthUserRepository $users,
        private readonly JwtService $jwtService,
        private readonly PasswordHasher $passwordHasher,
        private readonly LoggerInterface $logger,
    ) {
    }

    public function handle(LoginRequest $request): LoginResult
    {
        $this->logger->info('auth.login.attempt', ['username' => $request->username]);
        $credentials = $this->users->findCredentialsByUsername($request->username);

        if ($credentials === null || !$this->passwordHasher->verify($request->password, $credentials['passwordHash'])) {
            $this->logger->info('auth.login.failed', ['username' => $request->username, 'reason' => 'INVALID_CREDENTIALS']);
            throw new ApiException(ApiErrorCode::INVALID_CREDENTIALS);
        }

        if ($this->passwordHasher->needsRehash($credentials['passwordHash'])) {
            $this->users->updatePasswordHash($credentials['id'], $this->passwordHasher->hash($request->password));
        }

        $this->logger->info('auth.login.success', [
            'userId' => $credentials['id'],
            'username' => $credentials['username'],
            'role' => $credentials['role'],
        ]);

        return new LoginResult($this->jwtService->issue($credentials['id'], $credentials['username'], $credentials['role']));
    }
}
