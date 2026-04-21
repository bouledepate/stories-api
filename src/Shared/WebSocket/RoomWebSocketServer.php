<?php

declare(strict_types=1);

namespace Stories\Shared\WebSocket;

use Doctrine\DBAL\Connection;
use Ratchet\ConnectionInterface;
use Ratchet\MessageComponentInterface;
use SplObjectStorage;
use Stories\Shared\Database\ConnectionFactory;
use Stories\Shared\Exception\ApiException;
use Stories\Shared\Security\JwtService;

final class RoomWebSocketServer implements MessageComponentInterface
{
    /** @var SplObjectStorage<ConnectionInterface, ConnectionState> */
    private SplObjectStorage $clients;
    private ?Connection $runtimeDb = null;
    private ?JwtService $runtimeJwt = null;

    public function __construct(
        private readonly ?Connection $db = null,
        private readonly ?JwtService $jwtService = null
    ) {
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

        if ($message->type === 'subscribe_lobbies') {
            $this->handleLobbiesSubscription($connection, $message);

            return;
        }

        if ($message->type === 'room_event') {
            $this->handleRoomEvent($connection, $message);

            return;
        }

        if ($message->type === 'lobbies_event') {
            $this->handleLobbiesEvent($connection, $message);

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

        if (!$this->authenticate($state, $message)) {
            $this->send($connection, ['type' => 'error', 'message' => 'Authentication required']);

            return;
        }

        $accessReason = $this->roomAccessDeniedReason((string) $state->userId, $roomId);
        if ($accessReason !== null) {
            $state->roomId = null;
            $this->send($connection, [
                'type' => 'room_event',
                'roomId' => $roomId,
                'event' => 'access_denied',
                'data' => ['reason' => $accessReason],
                'timestamp' => time(),
            ]);

            return;
        }

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

        if (!$this->authenticate($state, $message)) {
            $this->send($connection, ['type' => 'error', 'message' => 'Authentication required']);

            return;
        }

        $accessReason = $this->roomAccessDeniedReason((string) $state->userId, $roomId);
        if ($accessReason !== null) {
            $state->roomId = null;
            $this->send($connection, [
                'type' => 'room_event',
                'roomId' => $roomId,
                'event' => 'access_denied',
                'data' => ['reason' => $accessReason],
                'timestamp' => time(),
            ]);

            return;
        }

        $this->broadcastToRoom($roomId, [
            'type' => 'room_event',
            'roomId' => $roomId,
            'event' => $message->eventName(),
            'data' => $message->eventData(),
            'from' => $state->clientId,
            'userId' => $state->userId,
            'username' => $state->username,
            'timestamp' => time(),
        ]);
    }

    private function handleLobbiesSubscription(ConnectionInterface $connection, SocketMessage $message): void
    {
        /** @var ConnectionState $state */
        $state = $this->clients[$connection];
        if (!$this->authenticate($state, $message)) {
            $this->send($connection, ['type' => 'error', 'message' => 'Authentication required']);

            return;
        }

        $state->lobbiesSubscribed = true;

        $this->send($connection, [
            'type' => 'lobbies_subscribed',
            'timestamp' => time(),
        ]);
    }

    private function handleLobbiesEvent(ConnectionInterface $connection, SocketMessage $message): void
    {
        /** @var ConnectionState $state */
        $state = $this->clients[$connection];
        if (!$this->authenticate($state, $message)) {
            $this->send($connection, ['type' => 'error', 'message' => 'Authentication required']);

            return;
        }

        $this->broadcastToLobbies([
            'type' => 'lobbies_event',
            'event' => $message->eventName(),
            'data' => $message->eventData(),
            'from' => $state->clientId,
            'userId' => $state->userId,
            'username' => $state->username,
            'timestamp' => time(),
        ]);
    }

    private function authenticate(ConnectionState $state, SocketMessage $message): bool
    {
        if ($state->userId !== null) {
            return true;
        }

        $token = $message->token();
        if ($token === null) {
            return false;
        }

        try {
            $payload = $this->jwt()->decode($token);
            $state->userId = isset($payload['sub']) ? (string) $payload['sub'] : null;
            $state->username = isset($payload['username']) ? (string) $payload['username'] : null;

            return $state->userId !== null && $state->userId !== '';
        } catch (ApiException) {
            return false;
        }
    }

    private function roomAccessDeniedReason(string $userId, string $roomId): ?string
    {
        if ($userId === '' || $roomId === '') {
            return 'not_in_room';
        }

        $db = $this->db();

        $isBanned = $db->createQueryBuilder()
            ->select('1')
            ->from('room_bans', 'rb')
            ->where('rb.room_id = :roomId')
            ->andWhere('rb.user_id = :userId')
            ->setParameter('roomId', $roomId)
            ->setParameter('userId', $userId)
            ->setMaxResults(1)
            ->fetchOne();
        if ($isBanned !== false) {
            return 'banned';
        }

        $participant = $db->createQueryBuilder()
            ->select('1')
            ->from('room_participants', 'p')
            ->where('p.room_id = :roomId')
            ->andWhere('p.user_id = :userId')
            ->setParameter('roomId', $roomId)
            ->setParameter('userId', $userId)
            ->setMaxResults(1)
            ->fetchOne();

        return $participant !== false ? null : 'not_in_room';
    }

    private function db(): Connection
    {
        if ($this->db !== null) {
            return $this->db;
        }

        if ($this->runtimeDb === null) {
            $this->runtimeDb = ConnectionFactory::create($_ENV);
        }

        return $this->runtimeDb;
    }

    private function jwt(): JwtService
    {
        if ($this->jwtService !== null) {
            return $this->jwtService;
        }

        if ($this->runtimeJwt === null) {
            $this->runtimeJwt = new JwtService((string) ($_ENV['JWT_SECRET'] ?? 'change-me'));
        }

        return $this->runtimeJwt;
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

    /** @param array<string, mixed> $payload */
    private function broadcastToLobbies(array $payload): void
    {
        foreach ($this->clients as $connection) {
            /** @var ConnectionState $state */
            $state = $this->clients[$connection];
            if (!$state->lobbiesSubscribed) {
                continue;
            }

            $this->send($connection, $payload);
        }
    }
}
