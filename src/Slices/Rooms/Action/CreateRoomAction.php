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
use Stories\Slices\Rooms\Dto\CreateRoomRequest;
use Stories\Slices\Rooms\Service\RoomService;

final class CreateRoomAction
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
            $dto = CreateRoomRequest::fromArray($body);
            $this->validator->validate($dto);

            return $this->responder->respond($response, $this->service->create($dto, $actor), 201);
        } catch (InvalidArgumentException|RuntimeException $exception) {
            return $this->responder->respondError($request, $response, $exception->getMessage(), 400);
        }
    }
}
