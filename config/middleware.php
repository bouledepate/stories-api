<?php

declare(strict_types=1);

use Slim\App;
use Stories\Shared\Http\Middleware\RequestResponseLoggingMiddleware;

return static function (App $app): void {
    $app->add(RequestResponseLoggingMiddleware::class);
};
