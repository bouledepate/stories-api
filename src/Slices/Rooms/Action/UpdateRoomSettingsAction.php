<?php

declare(strict_types=1);

namespace Stories\Slices\Rooms\Action;

use InvalidArgumentException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RuntimeException;
use Stories\Shared\Http\JsonResponder;
use Stories\Shared\Security\AuthContext;
use Stories\Shared\Validation\InputValidator;
use Stories\Slices\Rooms\Dto\UpdateRoomSettingsRequest;
use Stories\Slices\Rooms\Service\RoomService;

final class UpdateRoomSettingsAction
{
    public function __construct(
        private readonly RoomService $service,
        private readonly AuthContext $auth,
        private readonly JsonResponder $responder,
        private readonly InputValidator $validator,
    ) {
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        try {
            $actor = $this->auth->user($request);
            $roomId = (string) ($request->getAttribute('roomId') ?? '');
            /** @var array<string, mixed> $body */
            $body = (array) $request->getParsedBody();
            $dto = UpdateRoomSettingsRequest::fromArray($body);
            $this->validator->validate($dto);

            return $this->responder->respond($response, $this->service->updateSettings($roomId, $actor, $dto->isPublic, $dto->password));
        } catch (InvalidArgumentException|RuntimeException $exception) {
            return $this->responder->respondError($request, $response, $exception, 400);
        }
    }
}
