<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Card;

use Stories\Domain\Matches\Model\RoundAction;
use Stories\Domain\Matches\Service\CardEffectContext;

final class LadyCard extends AbstractCharacterCard
{
    public function code(): string
    {
        return 'lady';
    }

    public function name(): string
    {
        return 'Дворянка';
    }

    public function value(): int
    {
        return 4;
    }

    public function copies(): int
    {
        return 2;
    }

    public function resolve(CardEffectContext $context): void
    {
        $context->actorState->applyEffectProtection();
        $context->round->lastAction = new RoundAction(
            'lady_protection_applied',
            $context->play->actorUserId,
            $context->playedCard->code,
            $context->playedCard->name,
            gmdate(DATE_ATOM),
        );
    }
}
