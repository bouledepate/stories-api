<?php

declare(strict_types=1);

namespace Stories\Slices\Rooms\Action;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RuntimeException;
use Stories\Shared\Http\JsonResponder;
use Stories\Shared\Security\AuthContext;
use Stories\Slices\Rooms\Service\RoomService;

final class JoinRoomAction
{
    public function __construct(
        private readonly RoomService $service,
        private readonly AuthContext $auth,
        private readonly JsonResponder $responder
    ) {
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        try {
            $actor = $this->auth->user($request);
            $roomId = (string) ($request->getAttribute('roomId') ?? '');
            /** @var array<string, mixed> $body */
            $body = (array) $request->getParsedBody();
            $spectator = (($request->getQueryParams()['spectator'] ?? 'false') === 'true') || (bool) ($body['spectator'] ?? false);
            $password = trim((string) ($body['password'] ?? ''));

            return $this->responder->respond(
                $response,
                $this->service->join($roomId, $actor, $spectator, $password === '' ? null : $password)
            );
        } catch (RuntimeException $exception) {
            return $this->responder->respondError($request, $response, $exception, 400);
        }
    }
}
