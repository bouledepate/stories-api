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
use Stories\Slices\Rooms\Dto\ReadyRequest;
use Stories\Slices\Rooms\Service\RoomService;

final class ReadyAction
{
    public function __construct(
        private readonly RoomService $service,
        private readonly AuthContext $auth,
        private readonly JsonResponder $responder,
        private readonly InputValidator $validator
    ) {
    }

    /** @param array<string, string> $args */
    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        try {
            $actor = $this->auth->user($request);
            /** @var array<string, mixed> $body */
            $body = (array) $request->getParsedBody();
            $dto = ReadyRequest::fromArray($body);
            $this->validator->validate($dto);

            return $this->responder->respond($response, $this->service->ready((string) $args['roomId'], $actor, (bool) $dto->ready));
        } catch (InvalidArgumentException|RuntimeException $exception) {
            return $this->responder->respondError($request, $response, $exception->getMessage(), 400);
        }
    }
}
