<?php

declare(strict_types=1);

namespace Stories\Presentation\Web;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class UiIndexAction
{
    public function __invoke(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $indexPath = dirname(__DIR__, 3) . '/public/web/index.html';
        $response->getBody()->write((string) file_get_contents($indexPath));

        return $response->withHeader('Content-Type', 'text/html; charset=utf-8');
    }
}
