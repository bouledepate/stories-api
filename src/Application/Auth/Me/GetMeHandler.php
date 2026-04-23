<?php

declare(strict_types=1);

namespace Stories\Application\Auth\Me;

use Stories\Domain\Auth\Repository\AuthUserRepository;
use Stories\Shared\Error\ApiException;
use Stories\Shared\Error\ApiErrorCode;

final class GetMeHandler
{
    public function __construct(private readonly AuthUserRepository $users)
    {
    }

    public function handle(string $userId): MeResult
    {
        $profile = $this->users->findProfileById($userId);
        if ($profile === null) {
            throw new ApiException(ApiErrorCode::USER_NOT_FOUND);
        }

        return new MeResult($profile['id'], $profile['username'], $profile['role']);
    }
}
