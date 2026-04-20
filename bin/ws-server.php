#!/usr/bin/env php
<?php

declare(strict_types=1);

use Dotenv\Dotenv;
use Ratchet\Http\HttpServer;
use Ratchet\Server\IoServer;
use Ratchet\WebSocket\WsServer;
use Stories\Shared\WebSocket\RoomWebSocketServer;

require __DIR__ . '/../vendor/autoload.php';

Dotenv::createImmutable(dirname(__DIR__))->safeLoad();

$host = $_ENV['WS_HOST'] ?? '0.0.0.0';
$port = (int) ($_ENV['WS_PORT'] ?? 8081);

$server = IoServer::factory(
    new HttpServer(new WsServer(new RoomWebSocketServer())),
    $port,
    $host
);

fwrite(STDOUT, sprintf("WebSocket server started on ws://%s:%d\n", $host, $port));
$server->run();
