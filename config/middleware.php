<?php

declare(strict_types=1);

use Slim\App;
use Stories\Shared\Http\Middleware\RequestResponseLoggingMiddleware;
use Stories\Shared\Http\Middleware\ValidationMiddleware;

return static function (App $app): void {
    $app->add(ValidationMiddleware::class);
    $app->add(RequestResponseLoggingMiddleware::class);
};
