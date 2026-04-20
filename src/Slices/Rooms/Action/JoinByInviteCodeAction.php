<?php

declare(strict_types=1);

namespace Stories\Slices\Rooms\Action;

use InvalidArgumentException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RuntimeException;
use Stories\Shared\Http\JsonResponder;
use Stories\Shared\Security\AuthContext;
use Stories\Slices\Rooms\Dto\JoinByCodeRequest;
use Stories\Slices\Rooms\Service\RoomService;

final class JoinByInviteCodeAction
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
            /** @var array<string, mixed> $body */
            $body = (array) $request->getParsedBody();
            $dto = JoinByCodeRequest::fromArray($body);

            return $this->responder->respond($response, $this->service->joinByInviteCode($dto->inviteCode, $actor, $dto->spectator));
        } catch (InvalidArgumentException|RuntimeException $exception) {
            return $this->responder->respond($response, ['error' => $exception->getMessage()], 400);
        }
    }
}
