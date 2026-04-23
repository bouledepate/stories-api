<?php

declare(strict_types=1);

namespace Stories\Slices\Rooms\Action;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Stories\Shared\Http\JsonResponder;
use Stories\Shared\Security\AuthContext;
use Stories\Slices\Rooms\Service\RoomService;

final class GetCurrentRoomAction
{
    public function __construct(
        private readonly RoomService $service,
        private readonly AuthContext $auth,
        private readonly JsonResponder $responder
    ) {
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $actor = $this->auth->user($request);
        $currentRoom = $this->service->current($actor);

        return $this->responder->respondFromRequest($request, $response, $currentRoom ?? []);
    }
}
