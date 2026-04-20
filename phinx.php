<?php

declare(strict_types=1);

$rootDir = __DIR__;
$dbDriver = strtolower((string) ($_ENV['DB_DRIVER'] ?? getenv('DB_DRIVER') ?: 'sqlite'));

$sqlitePath = (string) ($_ENV['DB_PATH'] ?? getenv('DB_PATH') ?: ($rootDir . '/var/data.sqlite'));

return [
    'paths' => [
        'migrations' => $rootDir . '/db/migrations',
        'seeds' => $rootDir . '/db/seeds',
    ],
    'environments' => [
        'default_migration_table' => 'phinxlog',
        'default_environment' => $dbDriver === 'sqlite' ? 'sqlite' : 'pgsql',
        'sqlite' => [
            'adapter' => 'sqlite',
            'name' => $sqlitePath,
            'suffix' => '',
        ],
        'pgsql' => [
            'adapter' => 'pgsql',
            'host' => (string) ($_ENV['DB_HOST'] ?? getenv('DB_HOST') ?: '127.0.0.1'),
            'name' => (string) ($_ENV['DB_NAME'] ?? getenv('DB_NAME') ?: 'stories'),
            'user' => (string) ($_ENV['DB_USER'] ?? getenv('DB_USER') ?: 'stories'),
            'pass' => (string) ($_ENV['DB_PASSWORD'] ?? getenv('DB_PASSWORD') ?: 'stories'),
            'port' => (int) ($_ENV['DB_PORT'] ?? getenv('DB_PORT') ?: 5432),
            'charset' => 'utf8',
            'schema' => 'public',
        ],
    ],
    'version_order' => 'creation',
];
