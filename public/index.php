<?php

declare(strict_types=1);

use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';

$container = require __DIR__ . '/../config/bootstrap.php';

$app = AppFactory::create();
$app->addBodyParsingMiddleware();
$app->addRoutingMiddleware();
$app->addErrorMiddleware(true, true, true);

$routes = require __DIR__ . '/../config/routes.php';
$routes($app, $container);

$app->run();
