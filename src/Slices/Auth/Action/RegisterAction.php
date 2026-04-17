<?php

declare(strict_types=1);

namespace Stories\Slices\Auth\Action;

use InvalidArgumentException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RuntimeException;
use Stories\Shared\Http\JsonResponder;
use Stories\Slices\Auth\Dto\RegisterRequest;
use Stories\Slices\Auth\Service\AuthService;

final class RegisterAction
{
    public function __construct(
        private readonly AuthService $service,
        private readonly JsonResponder $responder
    ) {
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        try {
            /** @var array<string, mixed> $body */
            $body = (array) $request->getParsedBody();
            $dto = RegisterRequest::fromArray($body);
            $token = $this->service->register($dto);

            return $this->responder->respond($response, $token, 201);
        } catch (InvalidArgumentException|RuntimeException $exception) {
            return $this->responder->respond($response, ['error' => $exception->getMessage()], 400);
        }
    }
}
