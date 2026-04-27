<?php

declare(strict_types=1);

namespace Stories\Presentation\Http\Action\Matches;

use InvalidArgumentException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RuntimeException;
use Stories\Application\Matches\CreateMatch\CreateMatchHandler;
use Stories\Application\Matches\CreateMatch\CreateMatchRequest;
use Stories\Presentation\Http\Action\JsonAction;
use Stories\Presentation\Http\Auth\AuthContext;
use Stories\Presentation\Http\Response\JsonResponder;
use Stories\Presentation\Http\Validation\InputValidator;

final class CreateMatchAction extends JsonAction
{
    public function __construct(
        private readonly CreateMatchHandler $handler,
        private readonly AuthContext $auth,
        private readonly InputValidator $validator,
        JsonResponder $responder,
    ) {
        parent::__construct($responder);
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        try {
            $dto = CreateMatchRequest::fromArray($this->body($request));
            $this->validator->validate($dto);

            return $this->respond($request, $response, $this->handler->handle($dto, $this->auth->user($request)), 201);
        } catch (InvalidArgumentException|RuntimeException $exception) {
            return $this->responder->respondError($request, $response, $exception, 400);
        }
    }
}

