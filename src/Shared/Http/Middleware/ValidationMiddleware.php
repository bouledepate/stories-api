<?php

declare(strict_types=1);

namespace Stories\Shared\Http\Middleware;

use Psr\Http\Message\ResponseFactoryInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Stories\Shared\Validation\RequestValidator;

final class ValidationMiddleware implements MiddlewareInterface
{
    public function __construct(
        private readonly RequestValidator $requestValidator,
        private readonly ResponseFactoryInterface $responseFactory
    ) {
    }

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $key = $this->routeKey($request);
        if ($key === null) {
            return $handler->handle($request);
        }
        /** @var mixed $parsedBody */
        $parsedBody = $request->getParsedBody();
        $payload = is_array($parsedBody) ? $parsedBody : [];

        $errors = $this->requestValidator->validate($key, $payload);
        if ($errors === []) {
            return $handler->handle($request);
        }

        $response = $this->responseFactory->createResponse(422)->withHeader('Content-Type', 'application/json');
        $response->getBody()->write((string) json_encode([
            'error' => 'Validation failed',
            'fields' => $errors,
        ], JSON_UNESCAPED_UNICODE));

        return $response;
    }

    private function routeKey(ServerRequestInterface $request): ?string
    {
        $method = strtoupper($request->getMethod());
        $path = $request->getUri()->getPath();

        return match (true) {
            $method === 'POST' && $path === '/auth/register' => 'POST /auth/register',
            $method === 'POST' && $path === '/auth/login' => 'POST /auth/login',
            $method === 'PATCH' && $path === '/auth/me' => 'PATCH /auth/me',
            $method === 'POST' && $path === '/rooms' => 'POST /rooms',
            $method === 'POST' && $path === '/rooms/join-by-code' => 'POST /rooms/join-by-code',
            $method === 'POST' && preg_match('#^/rooms/[^/]+/ready$#', $path) === 1 => 'POST /rooms/{roomId}/ready',
            $method === 'POST' && preg_match('#^/rooms/[^/]+/actions$#', $path) === 1 => 'POST /rooms/{roomId}/actions',
            default => null,
        };
    }
}
