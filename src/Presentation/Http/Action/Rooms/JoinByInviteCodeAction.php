<?php

declare(strict_types=1);

namespace Stories\Presentation\Http\Action\Rooms;

use InvalidArgumentException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RuntimeException;
use Stories\Presentation\Http\Action\JsonAction;
use Stories\Application\Rooms\JoinByCode\JoinByCodeRequest;
use Stories\Application\Rooms\JoinByCode\JoinByCodeHandler;
use Stories\Presentation\Http\Response\JsonResponder;
use Stories\Presentation\Http\Auth\AuthContext;
use Stories\Presentation\Http\Validation\InputValidator;

final class JoinByInviteCodeAction extends JsonAction
{
    public function __construct(
        private readonly JoinByCodeHandler $handler,
        private readonly AuthContext $auth,
        private readonly InputValidator $validator,
        JsonResponder $responder,
    ) {
        parent::__construct($responder);
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        try {
            $dto = JoinByCodeRequest::fromArray($this->body($request));
            $this->validator->validate($dto);

            return $this->respond($request, $response, $this->handler->handle(
                $dto->inviteCode,
                $this->auth->user($request),
                $dto->spectator,
                $dto->password,
            )->toArray());
        } catch (InvalidArgumentException|RuntimeException $exception) {
            return $this->responder->respondError($request, $response, $exception, 400);
        }
    }
}
