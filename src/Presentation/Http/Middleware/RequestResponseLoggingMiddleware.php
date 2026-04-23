<?php

declare(strict_types=1);

namespace Stories\Presentation\Http\Middleware;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Psr\Log\LoggerInterface;

final class RequestResponseLoggingMiddleware implements MiddlewareInterface
{
    public function __construct(private readonly LoggerInterface $logger)
    {
    }

    /** @var list<string> */
    private array $sensitiveKeys = ['password', 'password_hash', 'accessToken', 'token', 'authorization', 'cookie', 'set-cookie'];

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $startedAt = microtime(true);
        $requestId = $this->requestId($request);
        $userId = $this->userId($request);
        $route = $request->getAttribute('route') ?? $request->getAttribute('__route__');

        $requestLog = [
            'event' => 'http.request',
            'requestId' => $requestId,
            'route' => is_string($route) ? $route : null,
            'userId' => $userId,
            'method' => $request->getMethod(),
            'path' => $request->getUri()->getPath(),
            'ip' => $request->getServerParams()['REMOTE_ADDR'] ?? null,
            'query' => $this->sanitize($request->getQueryParams()),
            'headers' => $this->sanitizeHeaders($request->getHeaders()),
            'body' => $this->sanitize($this->requestBody($request)),
        ];

        $this->logger->info('http.request', $requestLog);

        try {
            $response = $handler->handle($request);
        } catch (\Throwable $throwable) {
            $errorLog = [
                'event' => 'http.exception',
                'requestId' => $requestId,
                'route' => is_string($route) ? $route : null,
                'userId' => $userId,
                'method' => $request->getMethod(),
                'path' => $request->getUri()->getPath(),
                'durationMs' => (int) ((microtime(true) - $startedAt) * 1000),
                'errorClass' => $throwable::class,
                'errorMessage' => $throwable->getMessage(),
            ];
            $this->logger->error('http.exception', $errorLog);
            throw $throwable;
        }

        $responseLog = [
            'event' => 'http.response',
            'requestId' => $requestId,
            'route' => is_string($route) ? $route : null,
            'userId' => $userId,
            'method' => $request->getMethod(),
            'path' => $request->getUri()->getPath(),
            'status' => $response->getStatusCode(),
            'durationMs' => (int) ((microtime(true) - $startedAt) * 1000),
            'headers' => $this->sanitizeHeaders($response->getHeaders()),
            'body' => $this->sanitize($this->responseBody($response)),
        ];

        $this->logger->info('http.response', $responseLog);

        return $response->withHeader('X-Request-Id', $requestId);
    }

    private function requestId(ServerRequestInterface $request): string
    {
        $headerId = trim($request->getHeaderLine('X-Request-Id'));
        if ($headerId !== '') {
            return $headerId;
        }

        return bin2hex(random_bytes(8));
    }

    private function userId(ServerRequestInterface $request): ?string
    {
        $auth = $request->getAttribute('auth');
        if ($auth === null || !is_object($auth) || !property_exists($auth, 'id')) {
            return null;
        }

        $id = $auth->id;
        if (!is_string($id) || $id === '') {
            return null;
        }

        return $id;
    }

    /** @return array<string, mixed>|string|null */
    private function requestBody(ServerRequestInterface $request): array|string|null
    {
        /** @var mixed $parsed */
        $parsed = $request->getParsedBody();
        if (is_array($parsed)) {
            return $parsed;
        }

        return null;
    }

    /** @return array<string, mixed>|string|null */
    private function responseBody(ResponseInterface $response): array|string|null
    {
        $contentType = strtolower($response->getHeaderLine('Content-Type'));
        if (!str_contains($contentType, 'application/json')) {
            return null;
        }

        $stream = $response->getBody();
        if (!$stream->isSeekable()) {
            return null;
        }

        $pos = $stream->tell();
        $stream->rewind();
        $raw = $stream->getContents();
        $stream->seek($pos);

        if ($raw === '') {
            return null;
        }

        $decoded = json_decode($raw, true);
        if (is_array($decoded)) {
            return $decoded;
        }

        return null;
    }

    /** @param array<string, list<string>> $headers */
    /** @return array<string, string> */
    private function sanitizeHeaders(array $headers): array
    {
        $normalized = [];
        foreach ($headers as $name => $values) {
            $normalized[$name] = implode(', ', $values);
        }

        /** @var array<string, string> $sanitized */
        $sanitized = $this->sanitize($normalized);

        return $sanitized;
    }

    /** @param mixed $value */
    private function sanitize(mixed $value): mixed
    {
        if (is_array($value)) {
            $result = [];
            foreach ($value as $key => $item) {
                $normalizedKey = is_string($key) ? strtolower($key) : (string) $key;
                if ($this->isSensitive($normalizedKey)) {
                    $result[$key] = '***';
                    continue;
                }

                $result[$key] = $this->sanitize($item);
            }

            return $result;
        }

        return $value;
    }

    private function isSensitive(string $field): bool
    {
        foreach ($this->sensitiveKeys as $sensitiveKey) {
            if (str_contains($field, $sensitiveKey)) {
                return true;
            }
        }

        return false;
    }
}
