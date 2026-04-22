<?php

declare(strict_types=1);

namespace Stories\Slices\Admin\Action;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Stories\Shared\Exception\ApiException;
use Stories\Shared\Http\ApiErrorCode;
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
            if ($actor->role !== 'admin') {
                throw new ApiException(ApiErrorCode::ADMIN_ROLE_REQUIRED);
            }

            $deck = (string) ($request->getQueryParams()['deck'] ?? '');

            return $this->responder->respondFromRequest($request, $response, $this->service->cards($deck));
        } catch (\Throwable $exception) {
            return $this->responder->respondError($request, $response, $exception, 403);
        }
    }
}
