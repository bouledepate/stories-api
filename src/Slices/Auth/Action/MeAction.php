<?php

declare(strict_types=1);

namespace Stories\Slices\Auth\Action;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RuntimeException;
use Stories\Shared\Http\JsonResponder;
use Stories\Shared\Security\AuthContext;
use Stories\Slices\Auth\Service\AuthService;

final class MeAction
{
    public function __construct(
        private readonly AuthService $service,
        private readonly AuthContext $auth,
        private readonly JsonResponder $responder
    ) {
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        try {
            $user = $this->auth->user($request);

            return $this->responder->respond($response, $this->service->me($user->id));
        } catch (RuntimeException $exception) {
            return $this->responder->respondError($request, $response, $exception->getMessage(), 401);
        }
    }
}
