<?php

declare(strict_types=1);

namespace Stories\Slices\Rooms\Action;

use InvalidArgumentException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RuntimeException;
use Stories\Shared\Http\JsonResponder;
use Stories\Shared\Security\AuthContext;
use Stories\Slices\Rooms\Dto\ActionRequest;
use Stories\Slices\Rooms\Service\RoomService;

final class SubmitAction
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
            $dto = ActionRequest::fromArray($body);
            $result = $this->service->action((string) $args['roomId'], $actor, $dto);

            return $this->responder->respond($response, [
                'result' => $result,
                'state' => $this->service->state((string) $args['roomId'], (string) $actor['sub']),
            ]);
        } catch (InvalidArgumentException|RuntimeException $exception) {
            return $this->responder->respond($response, ['error' => $exception->getMessage()], 400);
        }
    }
}
