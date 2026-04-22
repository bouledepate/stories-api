<?php

declare(strict_types=1);

namespace Stories\Slices\Rooms\Action;

use InvalidArgumentException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RuntimeException;
use Stories\Shared\Http\JsonResponder;
use Stories\Shared\Validation\InputValidator;
use Stories\Shared\Security\AuthContext;
use Stories\Slices\Rooms\Dto\JoinByCodeRequest;
use Stories\Slices\Rooms\Service\RoomService;

final class JoinByInviteCodeAction
{
    public function __construct(
        private readonly RoomService $service,
        private readonly AuthContext $auth,
        private readonly JsonResponder $responder,
        private readonly InputValidator $validator
    ) {
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        try {
            $actor = $this->auth->user($request);
            /** @var array<string, mixed> $body */
            $body = (array) $request->getParsedBody();
            $dto = JoinByCodeRequest::fromArray($body);
            $this->validator->validate($dto);

            return $this->responder->respondFromRequest($request, $response, $this->service->joinByInviteCode($dto->inviteCode, $actor, $dto->spectator, $dto->password));
        } catch (InvalidArgumentException|RuntimeException $exception) {
            return $this->responder->respondError($request, $response, $exception, 400);
        }
    }
}
