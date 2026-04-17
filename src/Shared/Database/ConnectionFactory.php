<?php

declare(strict_types=1);

namespace Stories\Shared\Database;

use Doctrine\DBAL\Connection;
use Doctrine\DBAL\DriverManager;

final class ConnectionFactory
{
    public static function create(string $path): Connection
    {
        return DriverManager::getConnection([
            'driver' => 'sqlite3',
            'path' => $path,
        ]);
    }
}
