<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Card;

use Stories\Domain\Matches\Model\RoundAction;
use Stories\Domain\Matches\Model\PendingDecision;
use Stories\Domain\Matches\Service\CardEffectContext;

final class QueenCard extends AbstractCharacterCard
{
    public function code(): string
    {
        return 'queen';
    }

    public function name(): string
    {
        return 'Королева';
    }

    public function value(): int
    {
        return 8;
    }

    public function copies(): int
    {
        return 1;
    }

    public function resolve(CardEffectContext $context): void
    {
        $decrees = $context->match->unsuppressedDecrees($context->round);
        if (count($decrees) === 1) {
            $decree = $decrees[0];
            $context->round->suppressDecree($decree->code);
            $context->round->lastAction = new RoundAction(
                'queen_decree_suppressed',
                $context->play->actorUserId,
                $context->playedCard->code,
                $context->playedCard->name,
                gmdate(DATE_ATOM),
                targetCardCode: $decree->code,
                targetCardName: $decree->title,
            );

            return;
        }

        if (count($decrees) > 1) {
            $context->round->pendingDecision = new PendingDecision(
                'queen_decree_suppression',
                $context->play->actorUserId,
                $context->play->actorUserId,
                $context->playedCard->code,
                $context->playedCard->name,
                availableDecrees: array_map(static fn ($decree): array => $decree->toArray(), $decrees),
            );
            $context->round->lastAction = new RoundAction(
                'queen_decree_choice_started',
                $context->play->actorUserId,
                $context->playedCard->code,
                $context->playedCard->name,
                gmdate(DATE_ATOM),
            );

            return;
        }

        $context->round->lastAction = new RoundAction(
            'queen_no_decree',
            $context->play->actorUserId,
            $context->playedCard->code,
            $context->playedCard->name,
            gmdate(DATE_ATOM),
        );
    }
}
