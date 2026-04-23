<?php

declare(strict_types=1);

use DI\ContainerBuilder;
use Doctrine\DBAL\Connection;
use Monolog\Handler\StreamHandler;
use Monolog\Level;
use Monolog\Logger;
use Psr\Log\LoggerInterface;
use Stories\Shared\Database\ConnectionFactory;
use Stories\Shared\Cache\RedisConfig;
use Stories\Shared\Security\JwtService;
use Stories\Slices\Rooms\Service\RoomService;
use Yiisoft\Translator\CategorySource;
use Yiisoft\Translator\Message\Php\MessageSource;
use Yiisoft\Translator\Translator;
use Yiisoft\Translator\TranslatorInterface;
use Yiisoft\Validator\Validator;

return static function (array $env): ContainerBuilder {
    $jwtSecret = (string) ($env['JWT_SECRET'] ?? 'change-me');
    $inviteRotateCooldownSeconds = (int) ($env['INVITE_ROTATE_COOLDOWN_SECONDS'] ?? 60);
    $appLogFile = (string) ($env['APP_LOG_FILE'] ?? (__DIR__ . '/../var/logs/app.log'));

    $builder = new ContainerBuilder();
    $builder->addDefinitions([
        Connection::class => static fn () => ConnectionFactory::create($env),
        RedisConfig::class => static fn (): RedisConfig => RedisConfig::fromEnv($env),
        JwtService::class => static fn (): JwtService => new JwtService($jwtSecret),
        Validator::class => static fn (): Validator => new Validator(),
        LoggerInterface::class => static function () use ($appLogFile): LoggerInterface {
            $logDir = dirname($appLogFile);
            if (!is_dir($logDir)) {
                mkdir($logDir, 0777, true);
            }

            $logger = new Logger('stories-api');
            $logger->pushHandler(new StreamHandler($appLogFile, Level::Debug));
            $logger->pushHandler(new StreamHandler('php://stderr', Level::Debug));

            return $logger;
        },
        TranslatorInterface::class => static function (): TranslatorInterface {
            $translator = new Translator('en');
            $source = new MessageSource(dirname(__DIR__) . '/messages');
            $translator->addCategorySources(new CategorySource('app', $source));

            return $translator;
        },
        RoomService::class => DI\autowire()
            ->constructorParameter('inviteRotateCooldownSeconds', $inviteRotateCooldownSeconds),
    ]);

    return $builder;
};
