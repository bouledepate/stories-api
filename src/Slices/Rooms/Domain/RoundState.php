<?php

declare(strict_types=1);

namespace Stories\Slices\Rooms\Domain;

use Stories\Shared\Exception\ApiException;
use Stories\Shared\Http\ApiErrorCode;

final class RoundState
{
    /**
     * @param list<GameCard> $characterDeck
     * @param list<GameCard> $discardPile
     * @param list<string> $turnOrder
     * @param array<string, list<GameCard>> $hands
     * @param list<string> $alivePlayers
     */
    public function __construct(
        public readonly ?GameCard $activeDecree,
        public readonly ?GameCard $hiddenCard,
        private array $characterDeck,
        private array $discardPile,
        private array $turnOrder,
        private int $currentTurnIndex,
        private array $hands,
        private array $alivePlayers
    ) {
    }

    /** @param array<string, mixed> $payload */
    public static function fromPayload(array $payload): self
    {
        $hands = [];
        foreach ((array) $payload['hands'] as $playerId => $cards) {
            $hands[(string) $playerId] = array_map(
                static fn (array $card): GameCard => GameCard::fromPayload($card),
                (array) $cards
            );
        }

        return new self(
            isset($payload['activeDecree']) && is_array($payload['activeDecree']) ? GameCard::fromPayload($payload['activeDecree']) : null,
            isset($payload['hiddenCard']) && is_array($payload['hiddenCard']) ? GameCard::fromPayload($payload['hiddenCard']) : null,
            array_map(static fn (array $card): GameCard => GameCard::fromPayload($card), (array) $payload['characterDeck']),
            array_map(static fn (array $card): GameCard => GameCard::fromPayload($card), (array) $payload['discardPile']),
            array_map('strval', (array) $payload['turnOrder']),
            (int) $payload['currentTurnIndex'],
            $hands,
            array_map('strval', (array) $payload['alivePlayers'])
        );
    }

    /** @return array<string, mixed> */
    public function toPayload(): array
    {
        $hands = [];
        foreach ($this->hands as $playerId => $cards) {
            $hands[$playerId] = array_map(static fn (GameCard $card): array => $card->toPayload(), $cards);
        }

        return [
            'activeDecree' => $this->activeDecree?->toPayload(),
            'hiddenCard' => $this->hiddenCard?->toPayload(),
            'characterDeck' => array_map(static fn (GameCard $card): array => $card->toPayload(), $this->characterDeck),
            'discardPile' => array_map(static fn (GameCard $card): array => $card->toPayload(), $this->discardPile),
            'turnOrder' => $this->turnOrder,
            'currentTurnIndex' => $this->currentTurnIndex,
            'hands' => $hands,
            'alivePlayers' => $this->alivePlayers,
        ];
    }

    public function currentPlayerId(): string
    {
        return $this->turnOrder[$this->currentTurnIndex];
    }

    public function drawCharacter(string $playerId): bool
    {
        if ($this->characterDeck === []) {
            return false;
        }

        $card = array_shift($this->characterDeck);
        if ($card === null) {
            return false;
        }

        $this->hands[$playerId] ??= [];
        $this->hands[$playerId][] = $card;

        return true;
    }

    public function handSize(string $playerId): int
    {
        return count($this->hands[$playerId] ?? []);
    }

    /** @return array<string, mixed> */
    public function playCharacter(string $playerId, string $cardCode): array
    {
        $cards = $this->hands[$playerId] ?? [];
        foreach ($cards as $index => $card) {
            if ($card->code !== $cardCode) {
                continue;
            }

            unset($cards[$index]);
            $this->hands[$playerId] = array_values($cards);
            $this->discardPile[] = $card;

            return $card->toPayload();
        }

        throw new ApiException(ApiErrorCode::CARD_NOT_IN_HAND);
    }

    public function moveToNextAlivePlayer(): void
    {
        $playersCount = count($this->turnOrder);
        for ($i = 0; $i < $playersCount; $i++) {
            $this->currentTurnIndex = ($this->currentTurnIndex + 1) % $playersCount;
            if (in_array($this->turnOrder[$this->currentTurnIndex], $this->alivePlayers, true)) {
                return;
            }
        }
    }

    public function removeDisconnectedPlayer(string $userId): void
    {
        $this->alivePlayers = array_values(array_filter(
            $this->alivePlayers,
            static fn (string $aliveId): bool => $aliveId !== $userId
        ));

        $cards = $this->hands[$userId] ?? [];
        foreach ($cards as $card) {
            $this->discardPile[] = $card;
        }

        $this->hands[$userId] = [];
    }

    /** @return list<string> */
    public function alivePlayers(): array
    {
        return $this->alivePlayers;
    }

    /** @return list<array<string, mixed>> */
    public function discardPilePayload(): array
    {
        return array_map(static fn (GameCard $card): array => $card->toPayload(), $this->discardPile);
    }

    public function deckCount(): int
    {
        return count($this->characterDeck);
    }

    /** @return list<array<string, mixed>> */
    public function handPayloadFor(string $userId): array
    {
        return array_map(static fn (GameCard $card): array => $card->toPayload(), $this->hands[$userId] ?? []);
    }
}
