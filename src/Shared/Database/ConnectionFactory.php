<?php

declare(strict_types=1);

namespace Stories\Shared\Database;

use Doctrine\DBAL\Connection;
use Doctrine\DBAL\DriverManager;

final class ConnectionFactory
{
    /**
     * @param array<string, mixed> $env
     */
    public static function create(array $env): Connection
    {
        $driver = strtolower((string) ($env['DB_DRIVER'] ?? 'sqlite'));

        if ($driver === 'pgsql' || $driver === 'postgres' || $driver === 'postgresql') {
            return DriverManager::getConnection([
                'driver' => 'pdo_pgsql',
                'host' => (string) ($env['DB_HOST'] ?? '127.0.0.1'),
                'port' => (int) ($env['DB_PORT'] ?? 5432),
                'dbname' => (string) ($env['DB_NAME'] ?? 'stories'),
                'user' => (string) ($env['DB_USER'] ?? 'stories'),
                'password' => (string) ($env['DB_PASSWORD'] ?? 'stories'),
                'charset' => 'utf8',
            ]);
        }

        $dbPath = (string) ($env['DB_PATH'] ?? (__DIR__ . '/../../../var/data.sqlite'));
        $dir = dirname($dbPath);
        if (!is_dir($dir)) {
            mkdir($dir, 0777, true);
        }

        return DriverManager::getConnection([
            'driver' => 'sqlite3',
            'path' => $dbPath,
        ]);
    }
}
