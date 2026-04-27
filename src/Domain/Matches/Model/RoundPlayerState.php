<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Model;

use Stories\Shared\Error\ApiErrorCode;
use Stories\Shared\Error\ApiException;

final class RoundPlayerState
{
    /**
     * @param list<Card> $hand
     * @param list<Card> $discard
     */
    public function __construct(
        public bool $eliminated,
        public array $hand,
        public array $discard,
        public bool $autoDiscardOnTurn = false,
        public ?string $lockedCardInstanceId = null,
        public ?string $lockedCardCode = null,
        public bool $protectedFromEffects = false,
        public bool $hasBlackRoseToken = false,
    ) {
    }

    /** @param array<string,mixed> $data */
    public static function fromArray(array $data): self
    {
        $hand = [];
        foreach ((array) ($data['hand'] ?? []) as $cardData) {
            if (is_array($cardData)) {
                $hand[] = Card::fromArray($cardData);
            }
        }

        $discard = [];
        foreach ((array) ($data['discard'] ?? []) as $cardData) {
            if (is_array($cardData)) {
                $discard[] = Card::fromArray($cardData);
            }
        }

        return new self(
            (bool) ($data['eliminated'] ?? false),
            $hand,
            $discard,
            (bool) ($data['autoDiscardOnTurn'] ?? false),
            isset($data['lockedCardInstanceId']) ? (string) $data['lockedCardInstanceId'] : null,
            isset($data['lockedCardCode']) ? (string) $data['lockedCardCode'] : null,
            (bool) ($data['protectedFromEffects'] ?? false),
            (bool) ($data['hasBlackRoseToken'] ?? false),
        );
    }

    public function isActive(): bool
    {
        return !$this->eliminated;
    }

    public function hasCard(string $cardCode): bool
    {
        foreach ($this->hand as $card) {
            if ($card->code === $cardCode) {
                return true;
            }
        }

        return false;
    }

    public function removeCardFromHand(string $cardCode, ?string $instanceId = null): Card
    {
        foreach ($this->hand as $index => $card) {
            if ($instanceId !== null && $instanceId !== '' && $card->instanceId !== $instanceId) {
                continue;
            }

            if ($card->code !== $cardCode) {
                continue;
            }

            unset($this->hand[$index]);
            $this->hand = array_values($this->hand);
            if ($this->isLockedCard($card)) {
                $this->clearLockedCard();
            }

            return $card;
        }

        throw new ApiException(ApiErrorCode::CARD_NOT_IN_HAND);
    }

    public function removeFirstCardFromHand(): ?Card
    {
        $first = $this->hand[0] ?? null;
        if (!$first instanceof Card) {
            return null;
        }

        return $this->removeCardFromHand($first->code, $first->instanceId);
    }

    public function peekFirstCardInHand(): ?Card
    {
        $first = $this->hand[0] ?? null;

        return $first instanceof Card ? $first : null;
    }

    public function addToDiscard(Card $card): void
    {
        $this->discard[] = $card;
    }

    public function addToHand(Card $card): void
    {
        $this->hand[] = $card;
    }

    public function swapFirstHandCardWith(self $other): void
    {
        $ownCard = $this->removeFirstCardFromHand();
        $otherCard = $other->removeFirstCardFromHand();
        if (!$ownCard instanceof Card || !$otherCard instanceof Card) {
            throw new ApiException(ApiErrorCode::MATCH_STATE_INVALID);
        }

        $this->addToHand($otherCard);
        $other->addToHand($ownCard);
    }

    /**
     * @return list<Card>
     */
    public function discardHand(): array
    {
        $discarded = $this->hand;
        foreach ($discarded as $card) {
            $this->discard[] = $card;
        }

        $this->hand = [];
        $this->clearLockedCard();

        return $discarded;
    }

    public function markEliminated(): void
    {
        $this->eliminated = true;
        $this->clearLockedCard();
        $this->hasBlackRoseToken = false;
    }

    public function markAutoDiscardOnTurn(): void
    {
        $this->autoDiscardOnTurn = true;
        $this->eliminated = true;
    }

    public function clearAutoDiscardOnTurn(): void
    {
        $this->autoDiscardOnTurn = false;
    }

    public function lockCurrentHandCard(): void
    {
        $card = $this->peekFirstCardInHand();
        $this->lockedCardInstanceId = $card?->instanceId;
        $this->lockedCardCode = $card?->code;
    }

    public function hasLockedCard(): bool
    {
        return ($this->lockedCardInstanceId !== null && $this->lockedCardInstanceId !== '')
            || ($this->lockedCardCode !== null && $this->lockedCardCode !== '');
    }

    public function isLockedCard(Card $card): bool
    {
        if ($this->lockedCardInstanceId !== null && $this->lockedCardInstanceId !== '') {
            return $card->instanceId === $this->lockedCardInstanceId;
        }

        if ($this->lockedCardCode !== null && $this->lockedCardCode !== '') {
            return $card->code === $this->lockedCardCode;
        }

        return false;
    }

    public function clearLockedCard(): void
    {
        $this->lockedCardInstanceId = null;
        $this->lockedCardCode = null;
    }

    public function applyEffectProtection(): void
    {
        $this->protectedFromEffects = true;
    }

    public function clearEffectProtection(): void
    {
        $this->protectedFromEffects = false;
    }

    public function applyBlackRoseToken(): void
    {
        $this->hasBlackRoseToken = true;
    }

    public function consumeBlackRoseToken(): void
    {
        $this->hasBlackRoseToken = false;
    }

    public function shouldConsumeBlackRoseInstead(Card $card, bool $causedByOtherPlayer): bool
    {
        return $causedByOtherPlayer && $this->hasBlackRoseToken && $card->value >= 7;
    }

    public function handValue(): int
    {
        $max = 0;
        foreach ($this->hand as $card) {
            $max = max($max, $card->value);
        }

        return $max;
    }

    public function discardValueSum(): int
    {
        $sum = 0;
        foreach ($this->discard as $card) {
            $sum += $card->value;
        }

        return $sum;
    }

    /** @return array<string,mixed> */
    public function toArray(): array
    {
        return [
            'eliminated' => $this->eliminated,
            'hand' => array_map(static fn (Card $card): array => $card->toArray(), $this->hand),
            'discard' => array_map(static fn (Card $card): array => $card->toArray(), $this->discard),
            'autoDiscardOnTurn' => $this->autoDiscardOnTurn,
            'lockedCardInstanceId' => $this->lockedCardInstanceId,
            'lockedCardCode' => $this->lockedCardCode,
            'protectedFromEffects' => $this->protectedFromEffects,
            'hasBlackRoseToken' => $this->hasBlackRoseToken,
        ];
    }
}
