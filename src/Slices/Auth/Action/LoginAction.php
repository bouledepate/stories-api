<?php

declare(strict_types=1);

namespace Stories\Slices\Auth\Action;

use InvalidArgumentException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RuntimeException;
use Stories\Shared\Http\JsonResponder;
use Stories\Shared\Validation\InputValidator;
use Stories\Slices\Auth\Dto\LoginRequest;
use Stories\Slices\Auth\Service\AuthService;

final class LoginAction
{
    public function __construct(
        private readonly AuthService $service,
        private readonly JsonResponder $responder,
        private readonly InputValidator $validator
    ) {
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        try {
            /** @var array<string, mixed> $body */
            $body = (array) $request->getParsedBody();
            $dto = LoginRequest::fromArray($body);
            $this->validator->validate($dto);

            return $this->responder->respond($response, $this->service->login($dto));
        } catch (InvalidArgumentException|RuntimeException $exception) {
            return $this->responder->respond($response, ['error' => $exception->getMessage()], 401);
        }
    }
}
