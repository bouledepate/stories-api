<?php

declare(strict_types=1);

namespace Stories\Slices\Rooms\Action;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RuntimeException;
use Stories\Shared\Http\JsonResponder;
use Stories\Shared\Security\AuthContext;
use Stories\Slices\Rooms\Service\RoomService;

final class LeaveRoomAction
{
    public function __construct(
        private readonly RoomService $service,
        private readonly AuthContext $auth,
        private readonly JsonResponder $responder
    ) {
    }

    /** @param array<string, string> $args */
    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        try {
            $actor = $this->auth->user($request);
            $this->service->leave((string) $args['roomId'], $actor);

            return $this->responder->respond($response, ['status' => 'left', 'roomId' => $args['roomId']]);
        } catch (RuntimeException $exception) {
            return $this->responder->respond($response, ['error' => $exception->getMessage()], 400);
        }
    }
}
