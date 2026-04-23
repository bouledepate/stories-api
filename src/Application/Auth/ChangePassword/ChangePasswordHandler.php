<?php

declare(strict_types=1);

namespace Stories\Application\Auth\ChangePassword;

use Psr\Log\LoggerInterface;
use Stories\Domain\Auth\Repository\AuthUserRepository;
use Stories\Shared\Error\ApiException;
use Stories\Shared\Error\ApiErrorCode;
use Stories\Shared\Security\PasswordHasher;

final class ChangePasswordHandler
{
    public function __construct(
        private readonly AuthUserRepository $users,
        private readonly PasswordHasher $passwordHasher,
        private readonly LoggerInterface $logger,
    ) {
    }

    public function handle(string $userId, ChangePasswordRequest $request): ChangePasswordResult
    {
        $this->logger->info('auth.password.change.attempt', ['userId' => $userId]);
        $profile = $this->users->findProfileById($userId);
        if ($profile === null) {
            $this->logger->info('auth.password.change.failed', ['userId' => $userId, 'reason' => 'USER_NOT_FOUND']);
            throw new ApiException(ApiErrorCode::USER_NOT_FOUND);
        }

        $credentials = $this->users->findCredentialsByUsername($profile['username']);
        if ($credentials === null || !$this->passwordHasher->verify($request->currentPassword, $credentials['passwordHash'])) {
            $this->logger->info('auth.password.change.failed', ['userId' => $userId, 'reason' => 'CURRENT_PASSWORD_INVALID']);
            throw new ApiException(ApiErrorCode::CURRENT_PASSWORD_INVALID);
        }

        $this->users->updatePasswordHash($userId, $this->passwordHasher->hash($request->newPassword));
        $this->logger->info('auth.password.change.success', ['userId' => $userId]);

        return new ChangePasswordResult('Password changed');
    }
}
