<?php

declare(strict_types=1);

use DI\Bridge\Slim\Bridge;
use Dotenv\Dotenv;

require __DIR__ . '/../vendor/autoload.php';

Dotenv::createImmutable(dirname(__DIR__))->safeLoad();

$containerFactory = require __DIR__ . '/../config/container.php';
$builder = $containerFactory($_ENV);
$container = $builder->build();

$app = Bridge::create($container);

$routes = require __DIR__ . '/../config/routes.php';
$routes($app);

$app->addBodyParsingMiddleware();
$app->addRoutingMiddleware();

$middleware = require __DIR__ . '/../config/middleware.php';
$middleware($app);

$app->addErrorMiddleware(true, true, true);

$app->run();
