<?php

declare(strict_types=1);

namespace Stories\Slices\Rooms\Action;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RuntimeException;
use Stories\Shared\Http\JsonResponder;
use Stories\Shared\Security\AuthContext;
use Stories\Slices\Rooms\Service\RoomService;

final class TransferOwnershipAction
{
    public function __construct(
        private readonly RoomService $service,
        private readonly AuthContext $auth,
        private readonly JsonResponder $responder,
    ) {
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        try {
            $actor = $this->auth->user($request);
            $roomId = (string) ($request->getAttribute('roomId') ?? '');
            $userId = (string) ($request->getAttribute('userId') ?? '');

            return $this->responder->respondFromRequest($request, $response, $this->service->transferOwnership($roomId, $actor, $userId));
        } catch (RuntimeException $exception) {
            return $this->responder->respondError($request, $response, $exception, 400);
        }
    }
}
