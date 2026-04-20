<?php

declare(strict_types=1);

namespace Stories\Tests\Support;

use Doctrine\DBAL\Connection;
use Doctrine\DBAL\Exception;
use Stories\Shared\Database\ConnectionFactory;

final class TestDatabase
{
    public static function create(): Connection
    {
        $path = tempnam(sys_get_temp_dir(), 'stories-test-');
        if ($path === false) {
            throw new \RuntimeException('Cannot create temporary database path');
        }

        $db = ConnectionFactory::create($path);
        self::migrate($db);

        return $db;
    }

    private static function migrate(Connection $db): void
    {
        foreach (glob(__DIR__ . '/../../migrations/*.sql') ?: [] as $file) {
            $sql = file_get_contents((string) $file);
            if (!is_string($sql)) {
                throw new \RuntimeException('Cannot read migration file');
            }

            try {
                $db->executeStatement($sql);
            } catch (Exception $e) {
                if (!str_contains($e->getMessage(), 'duplicate column name: invite_code')) {
                    throw $e;
                }
            }
        }
    }
}
