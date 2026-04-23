<?php

declare(strict_types=1);

namespace Stories\Presentation\Http\Action\Auth;

use InvalidArgumentException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RuntimeException;
use Stories\Presentation\Http\Action\JsonAction;
use Stories\Application\Auth\Register\RegisterRequest;
use Stories\Application\Auth\Register\RegisterHandler;
use Stories\Presentation\Http\Response\JsonResponder;
use Stories\Presentation\Http\Validation\InputValidator;

final class RegisterAction extends JsonAction
{
    public function __construct(
        private readonly RegisterHandler $handler,
        private readonly InputValidator $validator,
        JsonResponder $responder,
    ) {
        parent::__construct($responder);
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        try {
            $dto = RegisterRequest::fromArray($this->body($request));
            $this->validator->validate($dto);

            return $this->respond($request, $response, $this->handler->handle($dto)->toArray(), 201);
        } catch (InvalidArgumentException|RuntimeException $exception) {
            return $this->responder->respondError($request, $response, $exception, 400);
        }
    }
}
