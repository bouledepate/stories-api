<?php

declare(strict_types=1);

use Stories\Shared\Database\ConnectionFactory;

require __DIR__ . '/../vendor/autoload.php';

$dbPath = (string) ($_ENV['DB_PATH'] ?? (__DIR__ . '/../var/data.sqlite'));
$dir = dirname($dbPath);
if (!is_dir($dir)) {
    mkdir($dir, 0777, true);
}

$conn = ConnectionFactory::create($dbPath);
$conn->executeStatement('CREATE TABLE IF NOT EXISTS schema_migrations(version TEXT PRIMARY KEY, applied_at TEXT NOT NULL)');

$files = glob(__DIR__ . '/../migrations/*.sql');
sort($files);

foreach ($files as $file) {
    $version = basename((string) $file);
    $exists = $conn->fetchOne('SELECT version FROM schema_migrations WHERE version = ?', [$version]);
    if ($exists !== false) {
        continue;
    }

    $sql = (string) file_get_contents((string) $file);
    $conn->executeStatement($sql);
    $conn->insert('schema_migrations', ['version' => $version, 'applied_at' => gmdate(DATE_ATOM)]);
    echo "Applied {$version}\n";
}

echo "Done\n";
