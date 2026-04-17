<?php

declare(strict_types=1);

namespace Stories\Slices\Rooms\Service;

use Doctrine\DBAL\Connection;
use RuntimeException;
use Stories\Slices\Rooms\Dto\ActionRequest;
use Stories\Slices\Rooms\Dto\CreateRoomRequest;

final class RoomService
{
    public function __construct(
        private readonly Connection $db,
        private readonly int $disconnectGraceSeconds = 30
    ) {
    }

    /** @param array<string, mixed> $actor */
    /** @return array<string, mixed> */
    public function create(CreateRoomRequest $request, array $actor): array
    {
        $roomId = $this->uuid();
        $this->db->insert('rooms', [
            'id' => $roomId,
            'name' => $request->name,
            'owner_user_id' => (string) $actor['sub'],
            'status' => 'lobby',
            'created_at' => gmdate(DATE_ATOM),
        ]);

        $this->db->insert('room_participants', [
            'room_id' => $roomId,
            'user_id' => (string) $actor['sub'],
            'role' => 'owner',
            'ready' => 0,
            'joined_at' => gmdate(DATE_ATOM),
        ]);

        return $this->snapshot($roomId, (string) $actor['sub']);
    }

    /** @param array<string, mixed> $actor */
    /** @return array<string, mixed> */
    public function join(string $roomId, array $actor, bool $spectator): array
    {
        $this->requireRoom($roomId);

        $role = $spectator ? 'spectator' : 'player';
        $this->db->executeStatement(
            'INSERT INTO room_participants(room_id, user_id, role, ready, joined_at)
             VALUES (?, ?, ?, 0, ?)
             ON CONFLICT(room_id, user_id) DO UPDATE SET role = excluded.role',
            [$roomId, (string) $actor['sub'], $role, gmdate(DATE_ATOM)]
        );

        return $this->snapshot($roomId, (string) $actor['sub']);
    }

    /** @param array<string, mixed> $actor */
    public function leave(string $roomId, array $actor): void
    {
        $this->db->delete('room_participants', ['room_id' => $roomId, 'user_id' => (string) $actor['sub']]);
    }

    /** @param array<string, mixed> $actor */
    /** @return array<string, mixed> */
    public function ready(string $roomId, array $actor, bool $ready): array
    {
        $exists = $this->db->fetchOne(
            'SELECT 1 FROM room_participants WHERE room_id = ? AND user_id = ?',
            [$roomId, (string) $actor['sub']]
        );

        if ($exists === false) {
            throw new RuntimeException('User is not in room');
        }

        $this->db->update('room_participants', ['ready' => $ready ? 1 : 0], ['room_id' => $roomId, 'user_id' => (string) $actor['sub']]);

        return $this->snapshot($roomId, (string) $actor['sub']);
    }

    /** @param array<string, mixed> $actor */
    /** @return array<string, mixed> */
    public function start(string $roomId, array $actor): array
    {
        $room = $this->requireRoom($roomId);
        if ($room['owner_user_id'] !== $actor['sub']) {
            throw new RuntimeException('Only owner can start game');
        }

        $readyPlayers = $this->db->fetchAllAssociative(
            "SELECT user_id FROM room_participants WHERE room_id = ? AND role IN ('owner','player') AND ready = 1 ORDER BY joined_at",
            [$roomId]
        );

        if (count($readyPlayers) < 2) {
            throw new RuntimeException('Need at least 2 ready players');
        }

        $playerIds = array_map(static fn (array $row): string => (string) $row['user_id'], $readyPlayers);
        $state = [
            'decreeRoundsUsed' => 0,
            'disconnectDeadlines' => [],
            'scoreboard' => array_fill_keys($playerIds, 0),
            'round' => $this->buildRound($playerIds, $playerIds[0], 0),
        ];

        $gameId = $this->uuid();
        $this->db->executeStatement(
            'INSERT INTO games(id, room_id, status, decree_rounds_used, state_json, created_at)
             VALUES (?, ?, ?, ?, ?, ?)
             ON CONFLICT(room_id) DO UPDATE SET id=excluded.id, status=excluded.status, decree_rounds_used=excluded.decree_rounds_used, state_json=excluded.state_json',
            [$gameId, $roomId, 'in_progress', 0, json_encode($state, JSON_UNESCAPED_UNICODE), gmdate(DATE_ATOM)]
        );

        $this->db->update('rooms', ['status' => 'in_game'], ['id' => $roomId]);

        return $this->snapshot($roomId, (string) $actor['sub']);
    }

    /** @param array<string, mixed> $actor */
    /** @return array<string, mixed> */
    public function action(string $roomId, array $actor, ActionRequest $request): array
    {
        $game = $this->requireGame($roomId);
        $state = $this->decodeState($game['state_json']);
        $round = &$state['round'];

        $currentPlayerId = $round['turnOrder'][$round['currentTurnIndex']];
        if ($currentPlayerId !== $actor['sub']) {
            throw new RuntimeException('Not your turn');
        }

        $hand = &$round['hands'][(string) $actor['sub']];
        if ($request->actionType === 'draw_character') {
            if (count($round['characterDeck']) === 0) {
                return ['result' => 'deck_empty'];
            }

            $card = array_shift($round['characterDeck']);
            $hand[] = $card;
            $this->persistState((string) $game['id'], $state);

            return ['result' => 'drawn', 'handSize' => count($hand)];
        }

        if ($request->actionType === 'play_character') {
            if ($request->cardCode === null) {
                throw new RuntimeException('cardCode is required for play_character');
            }

            $played = $this->removeCardFromHand($hand, $request->cardCode);
            $round['discardPile'][] = $played;
            $this->moveToNextAlive($round);
            $this->persistState((string) $game['id'], $state);

            return ['result' => 'played', 'card' => $played, 'nextPlayerId' => $round['turnOrder'][$round['currentTurnIndex']]];
        }

        $this->moveToNextAlive($round);
        $this->persistState((string) $game['id'], $state);

        return ['result' => 'passed', 'nextPlayerId' => $round['turnOrder'][$round['currentTurnIndex']]];
    }

    /** @return array<string, mixed> */
    public function state(string $roomId, ?string $requesterId = null): array
    {
        $this->resolveDisconnectTimeouts($roomId);

        return $this->snapshot($roomId, $requesterId);
    }

    public function markDisconnected(string $roomId, string $userId): void
    {
        $game = $this->requireGame($roomId);
        $state = $this->decodeState($game['state_json']);
        $state['disconnectDeadlines'][$userId] = time() + $this->disconnectGraceSeconds;
        $this->persistState((string) $game['id'], $state);
    }

    private function resolveDisconnectTimeouts(string $roomId): void
    {
        $game = $this->findGame($roomId);
        if ($game === false) {
            return;
        }

        $state = $this->decodeState($game['state_json']);
        $now = time();
        $changed = false;
        foreach ($state['disconnectDeadlines'] as $userId => $deadline) {
            if ($now < $deadline) {
                continue;
            }

            $state['round']['alivePlayers'] = array_values(array_filter(
                $state['round']['alivePlayers'],
                static fn (string $aliveId): bool => $aliveId !== $userId
            ));

            if (isset($state['round']['hands'][$userId])) {
                foreach ($state['round']['hands'][$userId] as $card) {
                    $state['round']['discardPile'][] = $card;
                }
                $state['round']['hands'][$userId] = [];
            }

            unset($state['disconnectDeadlines'][$userId]);
            $changed = true;
        }

        if ($changed) {
            $this->persistState((string) $game['id'], $state);
        }
    }

    /** @return array<string, mixed> */
    private function snapshot(string $roomId, ?string $requesterId): array
    {
        $room = $this->requireRoom($roomId);
        $participants = $this->db->fetchAllAssociative(
            'SELECT p.user_id, u.username, p.role, p.ready
             FROM room_participants p JOIN users u ON u.id = p.user_id
             WHERE p.room_id = ? ORDER BY p.joined_at',
            [$roomId]
        );

        $snapshot = [
            'roomId' => $room['id'],
            'name' => $room['name'],
            'ownerId' => $room['owner_user_id'],
            'participants' => array_map(
                static fn (array $row): array => [
                    'userId' => $row['user_id'],
                    'username' => $row['username'],
                    'role' => $row['role'],
                    'ready' => ((int) $row['ready']) === 1,
                ],
                $participants
            ),
        ];

        $game = $this->findGame($roomId);
        if ($game !== false) {
            $state = $this->decodeState($game['state_json']);
            $round = $state['round'];
            $snapshot['game'] = [
                'gameId' => $game['id'],
                'status' => $game['status'],
                'publicState' => [
                    'activeDecree' => $round['activeDecree'],
                    'alivePlayers' => $round['alivePlayers'],
                    'discardPile' => $round['discardPile'],
                    'currentTurnPlayerId' => $round['turnOrder'][$round['currentTurnIndex']],
                    'deckCount' => count($round['characterDeck']),
                ],
                'privateState' => $requesterId !== null ? ['yourHand' => $round['hands'][$requesterId] ?? []] : [],
            ];
        }

        return $snapshot;
    }

    /** @param array<string, mixed> $round */
    private function moveToNextAlive(array &$round): void
    {
        $playersCount = count($round['turnOrder']);
        for ($i = 0; $i < $playersCount; $i++) {
            $round['currentTurnIndex'] = ($round['currentTurnIndex'] + 1) % $playersCount;
            $candidate = $round['turnOrder'][$round['currentTurnIndex']];
            if (in_array($candidate, $round['alivePlayers'], true)) {
                return;
            }
        }
    }

    /** @param list<array<string, mixed>> $hand */
    /** @return array<string, mixed> */
    private function removeCardFromHand(array &$hand, string $cardCode): array
    {
        foreach ($hand as $idx => $card) {
            if ($card['code'] !== $cardCode) {
                continue;
            }
            unset($hand[$idx]);
            $hand = array_values($hand);
            return $card;
        }

        throw new RuntimeException('Card not in hand');
    }

    /** @param list<string> $players */
    /** @return array<string, mixed> */
    private function buildRound(array $players, string $firstPlayerId, int $decreeRoundsUsed): array
    {
        $characterDeck = $this->db->fetchAllAssociative(
            "SELECT code, name, value, text FROM cards WHERE deck='character' AND enabled=1 AND code <> 'shadow' ORDER BY RANDOM()"
        );
        $decrees = $this->db->fetchAllAssociative(
            "SELECT code, name, text, effect_key FROM cards WHERE deck='decree' AND enabled=1 ORDER BY RANDOM()"
        );

        $hiddenCard = array_shift($characterDeck);
        $hands = [];
        foreach ($players as $playerId) {
            $hands[$playerId] = [array_shift($characterDeck)];
        }

        $activeDecree = null;
        if ($decreeRoundsUsed < 3 && count($decrees) > 0) {
            $activeDecree = $decrees[0];
        }

        $turnOrder = [$firstPlayerId];
        foreach ($players as $playerId) {
            if ($playerId !== $firstPlayerId) {
                $turnOrder[] = $playerId;
            }
        }

        return [
            'activeDecree' => $activeDecree,
            'hiddenCard' => $hiddenCard,
            'characterDeck' => $characterDeck,
            'discardPile' => [],
            'turnOrder' => $turnOrder,
            'currentTurnIndex' => 0,
            'hands' => $hands,
            'alivePlayers' => $players,
        ];
    }

    /** @return array<string, mixed> */
    private function requireRoom(string $roomId): array
    {
        $room = $this->db->fetchAssociative('SELECT id, name, owner_user_id, status FROM rooms WHERE id = ?', [$roomId]);
        if ($room === false) {
            throw new RuntimeException('Room not found');
        }
        return $room;
    }

    /** @return array<string, mixed> */
    private function requireGame(string $roomId): array
    {
        $game = $this->findGame($roomId);
        if ($game === false) {
            throw new RuntimeException('Game not started');
        }
        return $game;
    }

    private function findGame(string $roomId): array|false
    {
        return $this->db->fetchAssociative('SELECT id, room_id, status, decree_rounds_used, state_json FROM games WHERE room_id = ?', [$roomId]);
    }

    /** @param array<string, mixed> $state */
    private function persistState(string $gameId, array $state): void
    {
        $this->db->update('games', ['state_json' => json_encode($state, JSON_UNESCAPED_UNICODE)], ['id' => $gameId]);
    }

    /** @return array<string, mixed> */
    private function decodeState(string $json): array
    {
        /** @var array<string, mixed> $state */
        $state = (array) json_decode($json, true);
        return $state;
    }

    private function uuid(): string
    {
        return bin2hex(random_bytes(16));
    }
}
