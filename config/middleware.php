<?php

declare(strict_types=1);

use Slim\App;
use Stories\Shared\Http\Middleware\RequestResponseLoggingMiddleware;
use Stories\Shared\Http\Middleware\SecurityHeadersMiddleware;

return static function (App $app): void {
    $app->add(RequestResponseLoggingMiddleware::class);
    $app->add(SecurityHeadersMiddleware::class);
};
