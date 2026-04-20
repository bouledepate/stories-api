<?php

declare(strict_types=1);

use Dotenv\Dotenv;

require __DIR__ . '/../vendor/autoload.php';

$rootDir = dirname(__DIR__);

if (file_exists($rootDir . '/.env')) {
    Dotenv::createImmutable($rootDir)->safeLoad();
}

$dbDriver = strtolower((string) ($_ENV['DB_DRIVER'] ?? 'sqlite'));
$dbPath = (string) ($_ENV['DB_PATH'] ?? ($rootDir . '/var/data.sqlite'));

if ($dbDriver === 'sqlite') {
    $dir = dirname($dbPath);
    if (!is_dir($dir)) {
        mkdir($dir, 0777, true);
    }
}

$cmd = escapeshellarg(PHP_BINARY)
    . ' '
    . escapeshellarg($rootDir . '/vendor/bin/phinx')
    . ' migrate -c '
    . escapeshellarg($rootDir . '/phinx.php')
    . ' -e '
    . escapeshellarg($dbDriver === 'sqlite' ? 'sqlite' : 'pgsql');

passthru($cmd, $exitCode);
exit($exitCode);
