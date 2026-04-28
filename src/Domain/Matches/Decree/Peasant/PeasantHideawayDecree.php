<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Decree\Peasant;

use Stories\Domain\Matches\Decree\AbstractCharacterDecree;
use Stories\Domain\Matches\Model\Card;
use Stories\Domain\Matches\Model\MatchState;
use Stories\Domain\Matches\Model\PendingDecision;
use Stories\Domain\Matches\Model\RoundPlayerState;
use Stories\Domain\Matches\Model\RoundState;
use Stories\Domain\Matches\Service\CardEffectContext;
use Stories\Shared\Error\ApiErrorCode;
use Stories\Shared\Error\ApiException;

final class PeasantHideawayDecree extends AbstractCharacterDecree
{
    public function code(): string
    {
        return 'peasant_hideaway';
    }

    public function title(): string
    {
        return 'Тайник';
    }

    public function cardCode(): string
    {
        return 'peasant';
    }

    public function effectText(): string
    {
        return 'В свой ход можете дополнительно сыграть эту карту, чтобы взять нижнюю карту из колоды.';
    }

    public function resolve(CardEffectContext $context): void
    {
    }

    public function afterCardPlay(CardEffectContext $context): void
    {
        if ($context->playedCard->code === $this->cardCode()) {
            return;
        }

        if ($context->round->hasPendingDecision() || !$context->round->hasCardsInDeck() || $context->round->activePlayersCount() <= 1) {
            return;
        }

        if (!$context->actorState->isActive() || !$context->actorState->hasCard($this->cardCode())) {
            return;
        }

        $context->round->pendingDecision = new PendingDecision(
            'peasant_hideaway_bonus',
            $context->play->actorUserId,
            $context->play->actorUserId,
            $this->cardCode(),
            'Крестьянин',
        );
    }

    public function assertCanPlayCard(MatchState $match, RoundState $round, RoundPlayerState $actorState, Card $selectedCard): void
    {
        if ($selectedCard->code !== $this->cardCode()) {
            return;
        }

        $pendingDecision = $round->pendingDecision;
        if (
            $pendingDecision?->type === 'peasant_hideaway_bonus'
            && $pendingDecision->actorUserId === $round->activePlayerId
        ) {
            return;
        }

        throw new ApiException(ApiErrorCode::CARD_PLAY_FORBIDDEN_BY_DECREE);
    }
}
