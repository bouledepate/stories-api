<?php

declare(strict_types=1);

namespace Stories\Presentation\Http\Action;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RuntimeException;
use Stories\Presentation\Http\Response\JsonResponder;

abstract class JsonAction
{
    public function __construct(protected readonly JsonResponder $responder)
    {
    }

    /** @return array<string, mixed> */
    protected function body(ServerRequestInterface $request): array
    {
        $body = $request->getParsedBody();

        return is_array($body) ? $body : [];
    }

    protected function routeParam(ServerRequestInterface $request, string $name): string
    {
        $value = $request->getAttribute($name);
        if (is_scalar($value) && trim((string) $value) !== '') {
            return trim((string) $value);
        }

        /** @var object|null $route */
        $route = $request->getAttribute('route');
        if (is_object($route) && method_exists($route, 'getArguments')) {
            /** @var mixed $arguments */
            $arguments = $route->getArguments();
            if (is_array($arguments) && is_scalar($arguments[$name] ?? null) && trim((string) $arguments[$name]) !== '') {
                return trim((string) $arguments[$name]);
            }
        }

        throw new RuntimeException(sprintf('%s is required', $name));
    }

    /** @param array<string, mixed> $payload */
    protected function respond(
        ServerRequestInterface $request,
        ResponseInterface $response,
        array $payload,
        int $status = 200,
    ): ResponseInterface {
        return $this->responder->respondFromRequest($request, $response, $payload, $status);
    }
}
