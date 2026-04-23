<?php

declare(strict_types=1);

use Slim\App;
use Stories\Presentation\Http\Middleware\RequestResponseLoggingMiddleware;
use Stories\Presentation\Http\Middleware\SecurityHeadersMiddleware;

return static function (App $app): void {
    $app->add(RequestResponseLoggingMiddleware::class);
    $app->add(SecurityHeadersMiddleware::class);
};
