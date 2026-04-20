<?php

declare(strict_types=1);

namespace Stories\Slices\Admin\Action;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Stories\Shared\Exception\ApiException;
use Stories\Shared\Http\ApiErrorCode;
use Stories\Shared\Http\JsonResponder;
use Stories\Shared\Security\AuthContext;
use Stories\Slices\Admin\Dto\PatchCardRequest;
use Stories\Slices\Admin\Service\AdminService;

final class PatchCardAction
{
    public function __construct(
        private readonly AdminService $service,
        private readonly AuthContext $auth,
        private readonly JsonResponder $responder
    ) {
    }

    /** @param array<string, string> $args */
    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        try {
            $actor = $this->auth->user($request);
            if ($actor->role !== 'admin') {
                throw new ApiException(ApiErrorCode::ADMIN_ROLE_REQUIRED);
            }

            /** @var array<string, mixed> $body */
            $body = (array) $request->getParsedBody();
            $dto = PatchCardRequest::fromArray($body);

            return $this->responder->respond(
                $response,
                $this->service->patch((string) $args['deck'], (string) $args['cardCode'], $dto)
            );
        } catch (\Throwable $exception) {
            return $this->responder->respondError($request, $response, $exception, 403);
        }
    }
}
