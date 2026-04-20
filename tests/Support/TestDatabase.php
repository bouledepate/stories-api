<?php

declare(strict_types=1);

namespace Stories\Tests\Support;

use Doctrine\DBAL\Connection;
use Stories\Shared\Database\ConnectionFactory;

final class TestDatabase
{
    public static function create(): Connection
    {
        $path = tempnam(sys_get_temp_dir(), 'stories-test-');
        if ($path === false) {
            throw new \RuntimeException('Cannot create temporary database path');
        }

        self::migrate($path);

        return ConnectionFactory::create([
            'DB_DRIVER' => 'sqlite',
            'DB_PATH' => $path,
        ]);
    }

    private static function migrate(string $dbPath): void
    {
        $rootDir = dirname(__DIR__, 2);
        $env = [
            'DB_DRIVER' => 'sqlite',
            'DB_PATH' => $dbPath,
        ];

        $cmd = escapeshellarg(PHP_BINARY)
            . ' '
            . escapeshellarg($rootDir . '/vendor/bin/phinx')
            . ' migrate -c '
            . escapeshellarg($rootDir . '/phinx.php')
            . ' -e sqlite';

        $proc = proc_open($cmd, [
            1 => ['pipe', 'w'],
            2 => ['pipe', 'w'],
        ], $pipes, $rootDir, $env);

        if (!\is_resource($proc)) {
            throw new \RuntimeException('Unable to start migration process for tests');
        }

        $stdout = stream_get_contents($pipes[1]);
        $stderr = stream_get_contents($pipes[2]);
        fclose($pipes[1]);
        fclose($pipes[2]);

        $exitCode = proc_close($proc);
        if ($exitCode !== 0) {
            throw new \RuntimeException(sprintf(
                "Test migrations failed with code %d\nstdout: %s\nstderr: %s",
                $exitCode,
                $stdout ?: '-',
                $stderr ?: '-'
            ));
        }
    }
}
