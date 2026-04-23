<?php

declare(strict_types=1);

use DI\ContainerBuilder;
use Doctrine\DBAL\Connection;
use Monolog\Handler\StreamHandler;
use Monolog\Level;
use Monolog\Logger;
use Psr\Log\LoggerInterface;
use Stories\Domain\Auth\Repository\AuthUserRepository;
use Stories\Domain\Rooms\Repository\RoomBansRepository;
use Stories\Domain\Rooms\Repository\RoomParticipantsRepository;
use Stories\Domain\Rooms\Repository\RoomsRepository;
use Stories\Domain\Rooms\Repository\RoomSnapshotProvider;
use Stories\Infrastructure\Persistence\Auth\DbalAuthUserRepository;
use Stories\Infrastructure\Persistence\Rooms\DbalRoomBansRepository;
use Stories\Infrastructure\Persistence\Rooms\DbalRoomParticipantsRepository;
use Stories\Infrastructure\Persistence\Rooms\DbalRoomsRepository;
use Stories\Infrastructure\Persistence\Rooms\DbalRoomSnapshotProvider;
use Stories\Infrastructure\Persistence\ConnectionFactory;
use Stories\Infrastructure\Cache\RedisConfig;
use Stories\Shared\Security\JwtService;
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
        AuthUserRepository::class => DI\autowire(DbalAuthUserRepository::class),
        RoomsRepository::class => DI\autowire(DbalRoomsRepository::class),
        RoomParticipantsRepository::class => DI\autowire(DbalRoomParticipantsRepository::class),
        RoomBansRepository::class => DI\autowire(DbalRoomBansRepository::class),
        RoomSnapshotProvider::class => DI\autowire(DbalRoomSnapshotProvider::class),
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
        \Stories\Application\Rooms\Support\RoomUseCaseSupport::class => DI\autowire()
            ->constructorParameter('inviteRotateCooldownSeconds', $inviteRotateCooldownSeconds),
    ]);

    return $builder;
};
