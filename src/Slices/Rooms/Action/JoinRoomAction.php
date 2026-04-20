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

    /** @param array<string, string> $args */
    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        try {
            $actor = $this->auth->user($request);
            /** @var array<string, mixed> $body */
            $body = (array) $request->getParsedBody();
            $spectator = (($request->getQueryParams()['spectator'] ?? 'false') === 'true') || (bool) ($body['spectator'] ?? false);
            $password = trim((string) ($body['password'] ?? ''));

            return $this->responder->respond(
                $response,
                $this->service->join((string) $args['roomId'], $actor, $spectator, $password === '' ? null : $password)
            );
        } catch (RuntimeException $exception) {
            return $this->responder->respondError($request, $response, $exception, 400);
        }
    }
}
