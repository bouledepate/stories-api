<?php

declare(strict_types=1);

namespace Stories\Shared\Security;

use Psr\Http\Message\ServerRequestInterface;
use RuntimeException;

final class AuthContext
{
    public function __construct(private readonly JwtService $jwtService)
    {
    }

    public function user(ServerRequestInterface $request): AuthenticatedUser
    {
        $header = $request->getHeaderLine('Authorization');
        if (!str_starts_with($header, 'Bearer ')) {
            throw new RuntimeException('Missing bearer token');
        }

        $token = substr($header, 7);

        return AuthenticatedUser::fromClaims($this->jwtService->decode($token));
    }
}
