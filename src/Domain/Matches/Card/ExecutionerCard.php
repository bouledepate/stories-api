<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Card;

use Stories\Domain\Matches\Model\RoundAction;
use Stories\Domain\Matches\Service\CardEffectContext;

final class ExecutionerCard extends AbstractCharacterCard
{
    public function code(): string
    {
        return 'executioner';
    }

    public function name(): string
    {
        return 'Палач';
    }

    public function value(): int
    {
        return 3;
    }

    public function copies(): int
    {
        return 2;
    }

    public function resolve(CardEffectContext $context): void
    {
        $targetUserId = $context->resolveTargetUserId();
        if ($targetUserId === null) {
            $context->round->lastAction = new RoundAction(
                'executioner_no_target',
                $context->play->actorUserId,
                $context->playedCard->code,
                $context->playedCard->name,
                gmdate(DATE_ATOM),
            );

            return;
        }

        $targetCard = $context->targetState($targetUserId)->peekFirstCardInHand();
        $actionType = ($targetCard?->value ?? PHP_INT_MAX) <= 4 ? 'executioner_eliminate' : 'executioner_survive';

        if ($actionType === 'executioner_eliminate') {
            $context->eliminatePlayer($targetUserId);
        }

        $context->round->lastAction = new RoundAction(
            $actionType,
            $context->play->actorUserId,
            $context->playedCard->code,
            $context->playedCard->name,
            gmdate(DATE_ATOM),
            $targetUserId,
        );
    }
}
