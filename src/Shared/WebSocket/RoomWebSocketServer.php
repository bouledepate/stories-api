<?php

declare(strict_types=1);

namespace Stories\Shared\WebSocket;

use Ratchet\ConnectionInterface;
use Ratchet\MessageComponentInterface;
use SplObjectStorage;

final class RoomWebSocketServer implements MessageComponentInterface
{
    /** @var SplObjectStorage<ConnectionInterface, ConnectionState> */
    private SplObjectStorage $clients;

    public function __construct()
    {
        $this->clients = new SplObjectStorage();
    }

    public function onOpen(ConnectionInterface $connection): void
    {
        $state = ConnectionState::create();
        $this->clients[$connection] = $state;

        $this->send($connection, [
            'type' => 'connected',
            'clientId' => $state->clientId,
            'timestamp' => time(),
        ]);
    }

    public function onMessage(ConnectionInterface $connection, $rawMessage): void
    {
        $decoded = json_decode((string) $rawMessage, true);
        $message = is_array($decoded) ? SocketMessage::fromDecoded($decoded) : null;

        if ($message === null) {
            $this->send($connection, ['type' => 'error', 'message' => 'Invalid payload']);

            return;
        }

        if ($message->type === 'ping') {
            $this->send($connection, ['type' => 'pong', 'timestamp' => time()]);

            return;
        }

        if ($message->type === 'subscribe_room') {
            $this->handleSubscription($connection, $message);

            return;
        }

        if ($message->type === 'room_event') {
            $this->handleRoomEvent($connection, $message);

            return;
        }

        $this->send($connection, ['type' => 'error', 'message' => sprintf('Unknown message type: %s', $message->type)]);
    }

    public function onClose(ConnectionInterface $connection): void
    {
        if (!isset($this->clients[$connection])) {
            return;
        }

        /** @var ConnectionState $state */
        $state = $this->clients[$connection];
        unset($this->clients[$connection]);

        if ($state->roomId === null) {
            return;
        }

        $this->broadcastToRoom($state->roomId, [
            'type' => 'presence',
            'roomId' => $state->roomId,
            'message' => sprintf('Client %s left room', $state->clientId),
            'timestamp' => time(),
        ]);
    }

    public function onError(ConnectionInterface $connection, \Exception $exception): void
    {
        $this->send($connection, [
            'type' => 'error',
            'message' => 'Connection error',
            'details' => $exception->getMessage(),
        ]);
        $connection->close();
    }

    private function handleSubscription(ConnectionInterface $connection, SocketMessage $message): void
    {
        $roomId = $message->roomId();
        if ($roomId === null) {
            $this->send($connection, ['type' => 'error', 'message' => 'roomId is required']);

            return;
        }

        /** @var ConnectionState $state */
        $state = $this->clients[$connection];
        $state->roomId = $roomId;

        $this->broadcastToRoom($roomId, [
            'type' => 'presence',
            'roomId' => $roomId,
            'message' => sprintf('Client %s joined room', $state->clientId),
            'timestamp' => time(),
        ]);
    }

    private function handleRoomEvent(ConnectionInterface $connection, SocketMessage $message): void
    {
        /** @var ConnectionState $state */
        $state = $this->clients[$connection];
        $roomId = $message->roomId($state->roomId);
        if ($roomId === null) {
            $this->send($connection, ['type' => 'error', 'message' => 'roomId is required']);

            return;
        }

        $this->broadcastToRoom($roomId, [
            'type' => 'room_event',
            'roomId' => $roomId,
            'event' => $message->eventName(),
            'data' => $message->eventData(),
            'from' => $state->clientId,
            'timestamp' => time(),
        ]);
    }

    /** @param array<string, mixed> $payload */
    private function send(ConnectionInterface $connection, array $payload): void
    {
        $connection->send((string) json_encode($payload, JSON_UNESCAPED_UNICODE));
    }

    /** @param array<string, mixed> $payload */
    private function broadcastToRoom(string $roomId, array $payload): void
    {
        foreach ($this->clients as $connection) {
            /** @var ConnectionState $state */
            $state = $this->clients[$connection];
            if ($state->roomId !== $roomId) {
                continue;
            }

            $this->send($connection, $payload);
        }
    }
}
