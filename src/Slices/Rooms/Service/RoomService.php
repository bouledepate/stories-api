<?php

declare(strict_types=1);

namespace Stories\Slices\Rooms\Service;

use RuntimeException;
use Stories\Shared\Store\InMemoryStore;
use Stories\Slices\Rooms\Dto\ActionRequest;
use Stories\Slices\Rooms\Dto\CreateRoomRequest;

final class RoomService
{
    public function __construct(
        private readonly InMemoryStore $store,
        private readonly int $disconnectGraceSeconds = 30
    ) {
    }

    /** @param array<string, mixed> $actor */
    /** @return array<string, mixed> */
    public function create(CreateRoomRequest $request, array $actor): array
    {
        $roomId = $this->uuid();
        $this->store->rooms[$roomId] = [
            'roomId' => $roomId,
            'name' => $request->name,
            'ownerId' => $actor['sub'],
            'participants' => [
                $actor['sub'] => [
                    'userId' => $actor['sub'],
                    'username' => $actor['username'],
                    'role' => 'owner',
                    'ready' => false,
                ],
            ],
            'game' => null,
        ];

        return $this->snapshot($roomId, (string) $actor['sub']);
    }

    /** @param array<string, mixed> $actor */
    /** @return array<string, mixed> */
    public function join(string $roomId, array $actor, bool $spectator): array
    {
        $room = &$this->requireRoom($roomId);
        $role = $spectator ? 'spectator' : 'player';
        $room['participants'][(string) $actor['sub']] = [
            'userId' => $actor['sub'],
            'username' => $actor['username'],
            'role' => $role,
            'ready' => false,
        ];

        return $this->snapshot($roomId, (string) $actor['sub']);
    }

    /** @param array<string, mixed> $actor */
    public function leave(string $roomId, array $actor): void
    {
        $room = &$this->requireRoom($roomId);
        unset($room['participants'][(string) $actor['sub']]);
    }

    /** @param array<string, mixed> $actor */
    /** @return array<string, mixed> */
    public function ready(string $roomId, array $actor, bool $ready): array
    {
        $room = &$this->requireRoom($roomId);
        $participant = &$room['participants'][(string) $actor['sub']];
        if ($participant === null) {
            throw new RuntimeException('User is not in room');
        }

        $participant['ready'] = $ready;

        return $this->snapshot($roomId, (string) $actor['sub']);
    }

    /** @param array<string, mixed> $actor */
    /** @return array<string, mixed> */
    public function start(string $roomId, array $actor): array
    {
        $room = &$this->requireRoom($roomId);
        if ($room['ownerId'] !== $actor['sub']) {
            throw new RuntimeException('Only owner can start game');
        }

        $readyPlayers = [];
        foreach ($room['participants'] as $participant) {
            if (in_array($participant['role'], ['owner', 'player'], true) && $participant['ready'] === true) {
                $readyPlayers[] = $participant;
            }
        }

        if (count($readyPlayers) < 2) {
            throw new RuntimeException('Need at least 2 ready players');
        }

        $playerIds = array_map(static fn (array $item): string => (string) $item['userId'], $readyPlayers);
        $room['game'] = [
            'gameId' => $this->uuid(),
            'status' => 'in_progress',
            'decreeRoundsUsed' => 0,
            'disconnectDeadlines' => [],
            'scoreboard' => array_fill_keys($playerIds, 0),
            'round' => $this->buildRound($playerIds, $playerIds[0], 0),
        ];

        return $this->snapshot($roomId, (string) $actor['sub']);
    }

    /** @param array<string, mixed> $actor */
    /** @return array<string, mixed> */
    public function action(string $roomId, array $actor, ActionRequest $request): array
    {
        $room = &$this->requireRoom($roomId);
        if (!is_array($room['game']) || !is_array($room['game']['round'])) {
            throw new RuntimeException('Game not started');
        }

        /** @var array<string, mixed> $round */
        $round = &$room['game']['round'];
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

            return ['result' => 'drawn', 'handSize' => count($hand)];
        }

        if ($request->actionType === 'play_character') {
            if ($request->cardCode === null) {
                throw new RuntimeException('cardCode is required for play_character');
            }

            $played = $this->removeCardFromHand($hand, $request->cardCode);
            $round['discardPile'][] = $played;
            $this->moveToNextAlive($round);

            return ['result' => 'played', 'card' => $played, 'nextPlayerId' => $round['turnOrder'][$round['currentTurnIndex']]];
        }

        $this->moveToNextAlive($round);

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
        $room = &$this->requireRoom($roomId);
        if ($room['game'] === null) {
            return;
        }

        $room['game']['disconnectDeadlines'][$userId] = time() + $this->disconnectGraceSeconds;
    }

    private function resolveDisconnectTimeouts(string $roomId): void
    {
        $room = &$this->requireRoom($roomId);
        if (!is_array($room['game']) || !is_array($room['game']['round'])) {
            return;
        }

        $now = time();
        foreach ($room['game']['disconnectDeadlines'] as $userId => $deadline) {
            if ($now < $deadline) {
                continue;
            }

            $round = &$room['game']['round'];
            $round['alivePlayers'] = array_values(array_filter(
                $round['alivePlayers'],
                static fn (string $aliveId): bool => $aliveId !== $userId
            ));

            if (isset($round['hands'][$userId])) {
                foreach ($round['hands'][$userId] as $card) {
                    $round['discardPile'][] = $card;
                }
                $round['hands'][$userId] = [];
            }

            unset($room['game']['disconnectDeadlines'][$userId]);
        }
    }

    /** @param array<string, mixed> $room */
    /** @return array<string, mixed> */
    private function snapshot(string $roomId, ?string $requesterId): array
    {
        $room = $this->requireRoom($roomId);
        $snapshot = [
            'roomId' => $room['roomId'],
            'name' => $room['name'],
            'ownerId' => $room['ownerId'],
            'participants' => array_values($room['participants']),
        ];

        if (is_array($room['game']) && is_array($room['game']['round'])) {
            $round = $room['game']['round'];
            $snapshot['game'] = [
                'gameId' => $room['game']['gameId'],
                'status' => $room['game']['status'],
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
        $characterDeck = array_values(array_filter(
            $this->store->cards['character'],
            static fn (array $card): bool => $card['enabled'] === true && $card['code'] !== 'shadow'
        ));
        shuffle($characterDeck);

        $decrees = array_values(array_filter(
            $this->store->cards['decree'],
            static fn (array $card): bool => $card['enabled'] === true
        ));
        shuffle($decrees);

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
    private function &requireRoom(string $roomId): array
    {
        if (!isset($this->store->rooms[$roomId])) {
            throw new RuntimeException('Room not found');
        }

        return $this->store->rooms[$roomId];
    }

    private function uuid(): string
    {
        return bin2hex(random_bytes(16));
    }
}
