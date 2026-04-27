<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Card;

use Stories\Domain\Matches\Model\RoundAction;
use Stories\Domain\Matches\Service\CardEffectContext;

final class ScoutCard extends AbstractCharacterCard
{
    public function code(): string
    {
        return 'scout';
    }

    public function name(): string
    {
        return 'Разведчик';
    }

    public function value(): int
    {
        return 2;
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
                'scout_no_target',
                $context->play->actorUserId,
                $context->playedCard->code,
                $context->playedCard->name,
                gmdate(DATE_ATOM),
            );

            return;
        }

        $targetState = $context->targetState($targetUserId);
        $targetState->lockCurrentHandCard();

        $context->round->lastAction = new RoundAction(
            'scout_lock_applied',
            $context->play->actorUserId,
            $context->playedCard->code,
            $context->playedCard->name,
            gmdate(DATE_ATOM),
            $targetUserId,
        );
    }
}
