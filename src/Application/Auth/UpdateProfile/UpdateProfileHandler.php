<?php

declare(strict_types=1);

namespace Stories\Application\Auth\UpdateProfile;

use Psr\Log\LoggerInterface;
use Stories\Application\Auth\Me\GetMeHandler;
use Stories\Application\Auth\Me\MeResult;
use Stories\Application\Auth\UpdateProfile\UpdateProfileResult;
use Stories\Domain\Auth\Repository\AuthUserRepository;
use Stories\Shared\Error\ApiException;
use Stories\Shared\Error\ApiErrorCode;
use Stories\Shared\Security\PasswordHasher;

final class UpdateProfileHandler
{
    public function __construct(
        private readonly AuthUserRepository $users,
        private readonly PasswordHasher $passwordHasher,
        private readonly GetMeHandler $getMe,
        private readonly LoggerInterface $logger,
    ) {
    }

    public function handle(string $userId, UpdateProfileRequest $request): UpdateProfileResult
    {
        $this->logger->info('auth.profile.update.attempt', ['userId' => $userId]);

        if ($request->username !== null && $this->users->usernameExists($request->username, $userId)) {
            $this->logger->info('auth.profile.update.failed', ['userId' => $userId, 'reason' => 'USERNAME_ALREADY_EXISTS']);
            throw new ApiException(ApiErrorCode::USER_EXISTS);
        }

        $passwordHash = $request->password !== null ? $this->passwordHasher->hash($request->password) : null;
        if ($request->username === null && $passwordHash === null) {
            $this->logger->info('auth.profile.update.failed', ['userId' => $userId, 'reason' => 'NO_FIELDS_TO_UPDATE']);
            throw new ApiException(ApiErrorCode::NO_FIELDS_TO_UPDATE);
        }

        $this->users->updateProfile($userId, $request->username, $passwordHash);

        $updatedFields = array_values(array_filter([
            $request->username !== null ? 'username' : null,
            $passwordHash !== null ? 'password_hash' : null,
        ]));
        $this->logger->info('auth.profile.update.success', ['userId' => $userId, 'updatedFields' => $updatedFields]);

        $profile = $this->getMe->handle($userId);

        return new UpdateProfileResult($profile->id, $profile->username, $profile->role);
    }
}
