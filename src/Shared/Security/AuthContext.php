<?php

declare(strict_types=1);

namespace Stories\Shared\Security;

use Psr\Http\Message\ServerRequestInterface;
use Stories\Shared\Exception\ApiException;
use Stories\Shared\Http\ApiErrorCode;

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
