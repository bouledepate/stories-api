<?php

declare(strict_types=1);

namespace Stories\Presentation\Http\Action\Rooms;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RuntimeException;
use Stories\Presentation\Http\Action\JsonAction;
use Stories\Application\Rooms\LeaveRoom\LeaveRoomHandler;
use Stories\Presentation\Http\Response\JsonResponder;
use Stories\Presentation\Http\Auth\AuthContext;

final class LeaveRoomAction extends JsonAction
{
    public function __construct(
        private readonly LeaveRoomHandler $handler,
        private readonly AuthContext $auth,
        JsonResponder $responder,
    ) {
        parent::__construct($responder);
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        try {
            $roomId = $this->routeParam($request, 'roomId');
            $this->handler->handle($roomId, $this->auth->user($request));

            return $this->respond($request, $response, ['status' => 'left', 'roomId' => $roomId]);
        } catch (RuntimeException $exception) {
            return $this->responder->respondError($request, $response, $exception, 400);
        }
    }
}
