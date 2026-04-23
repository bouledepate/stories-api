<?php

declare(strict_types=1);

namespace Stories\Presentation\Http\Action\Rooms;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RuntimeException;
use Stories\Presentation\Http\Action\JsonAction;
use Stories\Application\Rooms\JoinRoom\JoinRoomHandler;
use Stories\Presentation\Http\Response\JsonResponder;
use Stories\Presentation\Http\Auth\AuthContext;
use Stories\Shared\Validation\BooleanNormalizer;

final class JoinRoomAction extends JsonAction
{
    public function __construct(
        private readonly JoinRoomHandler $handler,
        private readonly AuthContext $auth,
        JsonResponder $responder,
    ) {
        parent::__construct($responder);
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        try {
            $body = $this->body($request);
            $spectator = BooleanNormalizer::fromMixed($request->getQueryParams()['spectator'] ?? null, false)
                || BooleanNormalizer::fromMixed($body['spectator'] ?? null, false);
            $password = trim((string) ($body['password'] ?? ''));

            return $this->respond($request, $response, $this->handler->handle(
                $this->routeParam($request, 'roomId'),
                $this->auth->user($request),
                $spectator,
                $password === '' ? null : $password,
            )->toArray());
        } catch (RuntimeException $exception) {
            return $this->responder->respondError($request, $response, $exception, 400);
        }
    }
}
