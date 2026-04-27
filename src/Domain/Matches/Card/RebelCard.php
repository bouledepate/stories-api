<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Card;

use Stories\Domain\Matches\Model\RoundAction;
use Stories\Domain\Matches\Service\CardEffectContext;

final class RebelCard extends AbstractCharacterCard
{
    public function code(): string
    {
        return 'rebel';
    }

    public function name(): string
    {
        return 'Мятежник';
    }

    public function value(): int
    {
        return 5;
    }

    public function copies(): int
    {
        return 2;
    }

    public function resolve(CardEffectContext $context): void
    {
        $targetUserId = $context->requireTargetUserId(true);
        $targetState = $context->targetState($targetUserId);
        $currentCard = $targetState->peekFirstCardInHand();
        if ($currentCard !== null && $targetState->shouldConsumeBlackRoseInstead($currentCard, $context->play->actorUserId !== $targetUserId)) {
            $targetState->consumeBlackRoseToken();
            $context->round->lastAction = new RoundAction(
                'black_rose_saved',
                $context->play->actorUserId,
                $context->playedCard->code,
                $context->playedCard->name,
                gmdate(DATE_ATOM),
                $targetUserId,
                null,
                null,
                $currentCard->code,
                $currentCard->name,
            );

            return;
        }

        $discardedCard = $targetState->removeFirstCardFromHand();
        $targetState->addToDiscard($discardedCard);
        if ($discardedCard?->code === 'king') {
            $context->eliminatePlayer($targetUserId);
            $context->round->lastAction = new RoundAction(
                'king_discard_elimination',
                $context->play->actorUserId,
                $context->playedCard->code,
                $context->playedCard->name,
                gmdate(DATE_ATOM),
                $targetUserId,
                null,
                null,
                $discardedCard->code,
                $discardedCard->name,
            );

            return;
        }

        $context->round->drawFor($targetUserId);

        $context->round->lastAction = new RoundAction(
            'rebel_redraw',
            $context->play->actorUserId,
            $context->playedCard->code,
            $context->playedCard->name,
            gmdate(DATE_ATOM),
            $targetUserId,
            null,
            null,
            $discardedCard?->code,
            $discardedCard?->name,
        );
    }
}
