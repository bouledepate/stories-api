<?php

declare(strict_types=1);

namespace Stories\Presentation\Http\Action\Rooms;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RuntimeException;
use Stories\Presentation\Http\Action\JsonAction;
use Stories\Application\Rooms\RegenerateInviteCode\RegenerateInviteCodeHandler;
use Stories\Presentation\Http\Response\JsonResponder;
use Stories\Presentation\Http\Auth\AuthContext;

final class RegenerateInviteCodeAction extends JsonAction
{
    public function __construct(
        private readonly RegenerateInviteCodeHandler $handler,
        private readonly AuthContext $auth,
        JsonResponder $responder,
    ) {
        parent::__construct($responder);
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        try {
            return $this->respond($request, $response, $this->handler->handle(
                $this->routeParam($request, 'roomId'),
                $this->auth->user($request),
            )->toArray());
        } catch (RuntimeException $exception) {
            return $this->responder->respondError($request, $response, $exception, 400);
        }
    }
}
