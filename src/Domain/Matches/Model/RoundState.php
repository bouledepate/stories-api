<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Model;

use Stories\Shared\Error\ApiErrorCode;
use Stories\Shared\Error\ApiException;

final class RoundState
{
    /**
     * @param list<Card> $deck
     * @param list<Card> $revealedCards
     * @param array<string,RoundPlayerState> $players
     * @param list<string> $roundWinners
     * @param list<string> $suppressedDecreeCodes
     * @param list<Card> $removedDecreeCards
     */
    public function __construct(
        public RoundStatus $status,
        public ?string $activePlayerId,
        public Card $setAsideCard,
        public array $deck,
        public array $revealedCards,
        public array $players,
        public ?RoundAction $lastAction,
        public ?RoundFinishedReason $finishedReason,
        public array $roundWinners,
        public ?PendingDecision $pendingDecision = null,
        public array $suppressedDecreeCodes = [],
        public array $removedDecreeCards = [],
    ) {
    }

    /** @param array<string,mixed> $data */
    public static function fromArray(array $data): self
    {
        $deck = [];
        foreach ((array) ($data['deck'] ?? []) as $cardData) {
            if (is_array($cardData)) {
                $deck[] = Card::fromArray($cardData);
            }
        }

        $revealedCards = [];
        foreach ((array) ($data['revealedCards'] ?? []) as $cardData) {
            if (is_array($cardData)) {
                $revealedCards[] = Card::fromArray($cardData);
            }
        }

        $removedDecreeCards = [];
        foreach ((array) ($data['removedDecreeCards'] ?? []) as $cardData) {
            if (is_array($cardData)) {
                $removedDecreeCards[] = Card::fromArray($cardData);
            }
        }

        $players = [];
        foreach ((array) ($data['players'] ?? []) as $userId => $playerData) {
            if (is_array($playerData)) {
                $players[(string) $userId] = RoundPlayerState::fromArray($playerData);
            }
        }

        $setAsideData = $data['setAsideCard'] ?? [];
        $setAsideCard = is_array($setAsideData) ? Card::fromArray($setAsideData) : new Card('', '', 0);
        $lastActionData = $data['lastAction'] ?? null;
        $pendingDecisionData = $data['pendingDecision'] ?? null;
        $suppressedDecreeCodes = array_values(array_map(
            static fn (mixed $item): string => (string) $item,
            (array) ($data['suppressedDecreeCodes'] ?? [])
        ));

        return new self(
            RoundStatus::tryFrom((string) ($data['status'] ?? 'active')) ?? RoundStatus::ACTIVE,
            isset($data['activePlayerId']) ? (string) $data['activePlayerId'] : null,
            $setAsideCard,
            $deck,
            $revealedCards,
            $players,
            is_array($lastActionData) ? RoundAction::fromArray($lastActionData) : null,
            isset($data['finishedReason']) ? RoundFinishedReason::tryFrom((string) $data['finishedReason']) : null,
            array_values(array_map(static fn (mixed $item): string => (string) $item, (array) ($data['roundWinners'] ?? []))),
            is_array($pendingDecisionData) ? PendingDecision::fromArray($pendingDecisionData) : null,
            $suppressedDecreeCodes,
            $removedDecreeCards,
        );
    }

    public function isActive(): bool
    {
        return $this->status === RoundStatus::ACTIVE;
    }

    public function isPlayerTurn(string $userId): bool
    {
        return $this->activePlayerId === $userId;
    }

    public function getPlayerState(string $userId): RoundPlayerState
    {
        $state = $this->players[$userId] ?? null;
        if (!$state instanceof RoundPlayerState) {
            throw new ApiException(ApiErrorCode::PLAYER_NOT_IN_MATCH);
        }

        return $state;
    }

    public function findPlayerState(string $userId): ?RoundPlayerState
    {
        $state = $this->players[$userId] ?? null;

        return $state instanceof RoundPlayerState ? $state : null;
    }

    public function activePlayerState(): ?RoundPlayerState
    {
        if ($this->activePlayerId === null) {
            return null;
        }

        return $this->findPlayerState($this->activePlayerId);
    }

    public function hasCardsInDeck(): bool
    {
        return $this->deck !== [];
    }

    public function hasPendingDecision(): bool
    {
        return $this->pendingDecision instanceof PendingDecision;
    }

    public function clearPendingDecision(): void
    {
        $this->pendingDecision = null;
    }

    public function suppressDecree(string $decreeCode): void
    {
        if (in_array($decreeCode, $this->suppressedDecreeCodes, true)) {
            return;
        }

        $this->suppressedDecreeCodes[] = $decreeCode;
    }

    public function isDecreeSuppressed(string $decreeCode): bool
    {
        return in_array($decreeCode, $this->suppressedDecreeCodes, true);
    }

    public function drawFor(string $userId): void
    {
        if ($this->deck === []) {
            return;
        }

        $player = $this->getPlayerState($userId);
        if (count($player->hand) >= 2) {
            return;
        }

        $card = array_shift($this->deck);
        if (!$card instanceof Card) {
            throw new ApiException(ApiErrorCode::MATCH_STATE_INVALID);
        }

        $player->addToHand($card);
    }

    public function drawBottomFor(string $userId): void
    {
        if ($this->deck === []) {
            return;
        }

        $player = $this->getPlayerState($userId);
        if (count($player->hand) >= 2) {
            return;
        }

        $card = array_pop($this->deck);
        if (!$card instanceof Card) {
            throw new ApiException(ApiErrorCode::MATCH_STATE_INVALID);
        }

        $player->addToHand($card);
    }

    public function activePlayersCount(): int
    {
        $count = 0;
        foreach ($this->players as $player) {
            if ($player->isActive()) {
                $count++;
            }
        }

        return $count;
    }

    public function moveToFinished(RoundFinishedReason $reason, array $winnerIds): void
    {
        $this->status = RoundStatus::FINISHED;
        $this->finishedReason = $reason;
        $this->roundWinners = array_values($winnerIds);
        $this->activePlayerId = null;
    }

    /** @return array<string,mixed> */
    public function toArray(): array
    {
        $players = [];
        foreach ($this->players as $userId => $state) {
            $players[$userId] = $state->toArray();
        }

        return [
            'status' => $this->status->value,
            'activePlayerId' => $this->activePlayerId,
            'setAsideCard' => $this->setAsideCard->toArray(),
            'deck' => array_map(static fn (Card $card): array => $card->toArray(), $this->deck),
            'revealedCards' => array_map(static fn (Card $card): array => $card->toArray(), $this->revealedCards),
            'removedDecreeCards' => array_map(static fn (Card $card): array => $card->toArray(), $this->removedDecreeCards),
            'players' => $players,
            'pendingDecision' => $this->pendingDecision?->toArray(),
            'suppressedDecreeCodes' => array_values($this->suppressedDecreeCodes),
            'lastAction' => $this->lastAction?->toArray(),
            'finishedReason' => $this->finishedReason?->value,
            'roundWinners' => array_values($this->roundWinners),
        ];
    }
}
