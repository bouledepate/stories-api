<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Card;

use Stories\Domain\Matches\Model\PendingDecision;
use Stories\Domain\Matches\Model\RoundAction;
use Stories\Domain\Matches\Service\CardEffectContext;

final class FeudalLordCard extends AbstractCharacterCard
{
    public function code(): string
    {
        return 'feudal_lord';
    }

    public function name(): string
    {
        return 'Феодал';
    }

    public function value(): int
    {
        return 6;
    }

    public function copies(): int
    {
        return 2;
    }

    public function resolve(CardEffectContext $context): void
    {
        $targetIds = $context->resolveTwoTargetUserIds(true);
        if ($targetIds === null) {
            $context->round->lastAction = new RoundAction(
                'feudal_no_target',
                $context->play->actorUserId,
                $context->playedCard->code,
                $context->playedCard->name,
                gmdate(DATE_ATOM),
            );

            return;
        }

        [$targetUserId, $secondTargetUserId] = $targetIds;
        $targetState = $context->targetState($targetUserId);
        $secondTargetState = $context->targetState($secondTargetUserId);
        $targetCard = $targetState->peekFirstCardInHand();
        $secondTargetCard = $secondTargetState->peekFirstCardInHand();
        if ($targetCard === null || $secondTargetCard === null) {
            $context->round->lastAction = new RoundAction(
                'feudal_no_target',
                $context->play->actorUserId,
                $context->playedCard->code,
                $context->playedCard->name,
                gmdate(DATE_ATOM),
            );

            return;
        }

        $context->round->pendingDecision = new PendingDecision(
            'feudal_lord_swap',
            $context->play->actorUserId,
            $context->play->actorUserId,
            $context->playedCard->code,
            $context->playedCard->name,
            $targetUserId,
            $secondTargetUserId,
            $targetCard,
            $secondTargetCard,
        );
        $context->round->lastAction = new RoundAction(
            'feudal_inspect',
            $context->play->actorUserId,
            $context->playedCard->code,
            $context->playedCard->name,
            gmdate(DATE_ATOM),
            $targetUserId,
            secondTargetUserId: $secondTargetUserId,
        );
    }
}
