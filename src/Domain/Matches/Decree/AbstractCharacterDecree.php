<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Decree;

use Stories\Domain\Matches\Model\ActiveDecree;
use Stories\Domain\Matches\Model\Card;
use Stories\Domain\Matches\Model\MatchState;
use Stories\Domain\Matches\Model\RoundPlayerState;
use Stories\Domain\Matches\Model\RoundState;
use Stories\Domain\Matches\Service\CardEffectContext;

abstract class AbstractCharacterDecree
{
    abstract public function code(): string;

    abstract public function title(): string;

    abstract public function cardCode(): string;

    abstract public function effectText(): string;

    abstract public function resolve(CardEffectContext $context): void;

    public function afterCardPlay(CardEffectContext $context): void
    {
    }

    public function showdownHandValue(RoundPlayerState $state, int $baseValue): int
    {
        return $baseValue;
    }

    public function awardEndRoundBonuses(MatchState $match, RoundState $round): void
    {
    }

    public function protectsFromCardEffect(RoundPlayerState $targetState, string $playedCardCode): bool
    {
        return false;
    }

    /**
     * @param list<Card> $deck
     */
    public function modifyRoundDeck(array &$deck): array
    {
        return [];
    }

    public function assertCanPlayCard(MatchState $match, RoundState $round, RoundPlayerState $actorState, Card $selectedCard): void
    {
    }

    public function activate(): ActiveDecree
    {
        return new ActiveDecree($this->code(), $this->title(), $this->cardCode(), $this->effectText());
    }
}
