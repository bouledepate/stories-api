<?php

declare(strict_types=1);

use DI\ContainerBuilder;
use Doctrine\DBAL\Connection;
use Psr\Http\Message\ResponseFactoryInterface;
use Slim\Psr7\Factory\ResponseFactory;
use Stories\Shared\Database\ConnectionFactory;
use Stories\Shared\Security\JwtService;
use Stories\Slices\Rooms\Service\RoomService;
use Yiisoft\Validator\Validator;

return static function (array $env): ContainerBuilder {
    $dbPath = (string) ($env['DB_PATH'] ?? (__DIR__ . '/../var/data.sqlite'));
    $jwtSecret = (string) ($env['JWT_SECRET'] ?? 'change-me');
    $disconnectGraceSeconds = (int) ($env['DISCONNECT_GRACE_SECONDS'] ?? 30);

    $dir = dirname($dbPath);
    if (!is_dir($dir)) {
        mkdir($dir, 0777, true);
    }

    $builder = new ContainerBuilder();
    $builder->addDefinitions([
        Connection::class => static fn (): Connection => ConnectionFactory::create($dbPath),
        JwtService::class => static fn (): JwtService => new JwtService($jwtSecret),
        Validator::class => static fn (): Validator => new Validator(),
        ResponseFactoryInterface::class => static fn (): ResponseFactoryInterface => new ResponseFactory(),
        RoomService::class => DI\autowire()->constructorParameter('disconnectGraceSeconds', $disconnectGraceSeconds),
    ]);

    return $builder;
};
