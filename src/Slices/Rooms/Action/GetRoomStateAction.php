<?php

declare(strict_types=1);

namespace Stories\Slices\Rooms\Action;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RuntimeException;
use Stories\Shared\Http\JsonResponder;
use Stories\Shared\Security\AuthContext;
use Stories\Slices\Rooms\Service\RoomService;

final class GetRoomStateAction
{
    public function __construct(
        private readonly RoomService $service,
        private readonly AuthContext $auth,
        private readonly JsonResponder $responder
    ) {
    }

    /** @param array<string, string> $args */
    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, array $args = []): ResponseInterface
    {
        try {
            $actor = $this->auth->user($request);
            $roomId = $this->resolveRoomId($request, $args);

            return $this->responder->respond($response, $this->service->state($roomId, $actor->id));
        } catch (RuntimeException $exception) {
            return $this->responder->respondError($request, $response, $exception, 400);
        }
    }

    /** @param array<string, string> $args */
    private function resolveRoomId(ServerRequestInterface $request, array $args): string
    {
        if (($args['roomId'] ?? '') !== '') {
            return (string) $args['roomId'];
        }

        /** @var object|null $route */
        $route = $request->getAttribute('route');
        if (is_object($route) && method_exists($route, 'getArguments')) {
            /** @var mixed $routeArguments */
            $routeArguments = $route->getArguments();
            if (is_array($routeArguments) && ($routeArguments['roomId'] ?? '') !== '') {
                return (string) $routeArguments['roomId'];
            }
        }

        $path = $request->getUri()->getPath();
        if (preg_match('#/rooms/([^/]+)$#', $path, $matches) === 1 && ($matches[1] ?? '') !== '') {
            return (string) $matches[1];
        }

        throw new RuntimeException('roomId is required');
    }
}
