<?php

declare(strict_types=1);

namespace Stories\Slices\Admin\Action;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RuntimeException;
use Stories\Shared\Http\JsonResponder;
use Stories\Shared\Security\AuthContext;
use Stories\Slices\Admin\Service\AdminService;

final class ListCardsAction
{
    public function __construct(
        private readonly AdminService $service,
        private readonly AuthContext $auth,
        private readonly JsonResponder $responder
    ) {
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        try {
            $actor = $this->auth->user($request);
            if (($actor['role'] ?? '') !== 'admin') {
                throw new RuntimeException('Admin role required');
            }

            $deck = (string) ($request->getQueryParams()['deck'] ?? '');

            return $this->responder->respond($response, $this->service->cards($deck));
        } catch (RuntimeException $exception) {
            return $this->responder->respond($response, ['error' => $exception->getMessage()], 403);
        }
    }
}
