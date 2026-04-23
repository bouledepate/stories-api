<?php

declare(strict_types=1);

namespace Stories\Presentation\Http\Auth;

use Psr\Http\Message\ServerRequestInterface;
use Stories\Shared\Error\ApiException;
use Stories\Shared\Error\ApiErrorCode;
use Stories\Shared\Security\AuthenticatedUser;
use Stories\Shared\Security\JwtService;

final class AuthContext
{
    public function __construct(private readonly JwtService $jwtService)
    {
    }

    public function user(ServerRequestInterface $request): AuthenticatedUser
    {
        $header = $request->getHeaderLine('Authorization');
        if (!str_starts_with($header, 'Bearer ')) {
            throw new ApiException(ApiErrorCode::MISSING_BEARER_TOKEN);
        }

        $token = substr($header, 7);

        return AuthenticatedUser::fromClaims($this->jwtService->decode($token));
    }
}
