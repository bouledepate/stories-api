<?php

declare(strict_types=1);

namespace Stories\Presentation\Http\Action\Rooms;

use InvalidArgumentException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RuntimeException;
use Stories\Application\Rooms\GetRoomMatch\GetRoomMatchHandler;
use Stories\Presentation\Http\Action\JsonAction;
use Stories\Presentation\Http\Auth\AuthContext;
use Stories\Presentation\Http\Response\JsonResponder;

final class GetRoomMatchAction extends JsonAction
{
    public function __construct(
        private readonly GetRoomMatchHandler $handler,
        private readonly AuthContext $auth,
        JsonResponder $responder,
    ) {
        parent::__construct($responder);
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        try {
            $roomId = $this->routeParam($request, 'roomId');

            return $this->respond($request, $response, $this->handler->handle($roomId, $this->auth->user($request)));
        } catch (InvalidArgumentException|RuntimeException $exception) {
            return $this->responder->respondError($request, $response, $exception, 400);
        }
    }
}

