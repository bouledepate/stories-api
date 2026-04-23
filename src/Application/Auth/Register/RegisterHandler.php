<?php

declare(strict_types=1);

namespace Stories\Application\Auth\Register;

use Psr\Log\LoggerInterface;
use Stories\Domain\Auth\Repository\AuthUserRepository;
use Stories\Shared\Error\ApiException;
use Stories\Shared\Error\ApiErrorCode;
use Stories\Shared\Security\JwtService;
use Stories\Shared\Security\PasswordHasher;

final class RegisterHandler
{
    public function __construct(
        private readonly AuthUserRepository $users,
        private readonly JwtService $jwtService,
        private readonly PasswordHasher $passwordHasher,
        private readonly LoggerInterface $logger,
    ) {
    }

    public function handle(RegisterRequest $request): RegisterResult
    {
        $this->logger->info('auth.register.attempt', ['username' => $request->username]);

        if ($this->users->usernameExists($request->username)) {
            $this->logger->info('auth.register.failed', ['username' => $request->username, 'reason' => 'USERNAME_ALREADY_EXISTS']);
            throw new ApiException(ApiErrorCode::USER_EXISTS);
        }

        $id = bin2hex(random_bytes(16));
        $role = 'player';
        $this->users->create($id, $request->username, $this->passwordHasher->hash($request->password), $role);

        $this->logger->info('auth.register.success', ['userId' => $id, 'username' => $request->username, 'role' => $role]);

        return new RegisterResult($this->jwtService->issue($id, $request->username, $role));
    }
}
