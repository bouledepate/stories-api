<?php

declare(strict_types=1);

namespace Stories\Presentation\Http\Action\Rooms;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Stories\Presentation\Http\Action\JsonAction;
use Stories\Application\Rooms\GetCurrentRoom\GetCurrentRoomHandler;
use Stories\Presentation\Http\Response\JsonResponder;
use Stories\Presentation\Http\Auth\AuthContext;

final class GetCurrentRoomAction extends JsonAction
{
    public function __construct(
        private readonly GetCurrentRoomHandler $handler,
        private readonly AuthContext $auth,
        JsonResponder $responder,
    ) {
        parent::__construct($responder);
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        return $this->respond($request, $response, $this->handler->handle($this->auth->user($request))?->toArray() ?? []);
    }
}
