<?php

declare(strict_types=1);

use Dotenv\Dotenv;

require __DIR__ . '/../vendor/autoload.php';

$rootDir = dirname(__DIR__);

if (file_exists($rootDir . '/.env')) {
    Dotenv::createImmutable($rootDir)->safeLoad();
}

$dbDriver = strtolower((string) ($_ENV['DB_DRIVER'] ?? getenv('DB_DRIVER') ?: 'sqlite'));
$dbPath = (string) ($_ENV['DB_PATH'] ?? getenv('DB_PATH') ?: ($rootDir . '/var/data.sqlite'));

if ($dbDriver === 'sqlite') {
    $dir = dirname($dbPath);
    if (!is_dir($dir)) {
        mkdir($dir, 0777, true);
    }
}

if ($dbDriver === 'pgsql' || $dbDriver === 'postgres' || $dbDriver === 'postgresql') {
    $dbHost = (string) ($_ENV['DB_HOST'] ?? getenv('DB_HOST') ?: 'postgres');
    $dbPort = (int) ($_ENV['DB_PORT'] ?? getenv('DB_PORT') ?: 5432);
    $dbName = (string) ($_ENV['DB_NAME'] ?? getenv('DB_NAME') ?: 'stories');
    $dbUser = (string) ($_ENV['DB_USER'] ?? getenv('DB_USER') ?: 'stories');
    $dbPassword = (string) ($_ENV['DB_PASSWORD'] ?? getenv('DB_PASSWORD') ?: 'stories');

    $maxAttempts = 30;
    $attempt = 0;
    while ($attempt < $maxAttempts) {
        try {
            new PDO(
                sprintf('pgsql:host=%s;port=%d;dbname=%s', $dbHost, $dbPort, $dbName),
                $dbUser,
                $dbPassword
            );
            break;
        } catch (Throwable $exception) {
            $attempt++;
            if ($attempt >= $maxAttempts) {
                fwrite(
                    STDERR,
                    sprintf(
                        "Database is not ready after %d attempts (%s:%d): %s\n",
                        $maxAttempts,
                        $dbHost,
                        $dbPort,
                        $exception->getMessage()
                    )
                );
                exit(1);
            }
            usleep(500000);
        }
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
