<?php

declare(strict_types=1);

namespace Stories\Shared\Http;

use Psr\Http\Message\ResponseInterface;

final class JsonResponder
{
    /** @param array<string, mixed> $payload */
    public function respond(ResponseInterface $response, array $payload, int $status = 200): ResponseInterface
    {
        $response->getBody()->write((string) json_encode($payload, JSON_UNESCAPED_UNICODE));

        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus($status);
    }
}
