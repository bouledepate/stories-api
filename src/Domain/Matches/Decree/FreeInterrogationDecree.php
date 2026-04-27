<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Decree;

use Stories\Domain\Matches\Model\PendingDecision;
use Stories\Domain\Matches\Model\RoundAction;
use Stories\Domain\Matches\Service\CardEffectContext;

final class FreeInterrogationDecree extends AbstractCharacterDecree
{
    public function code(): string
    {
        return 'free_interrogation';
    }

    public function title(): string
    {
        return 'Свободный допрос';
    }

    public function cardCode(): string
    {
        return 'guard';
    }

    public function effectText(): string
    {
        return 'Выберите игрока и назовите карту (включая Стражника). Если карта угадана, игрок выбывает из раунда.';
    }

    public function resolve(CardEffectContext $context): void
    {
        $targetUserId = $context->resolveTargetUserId();
        if ($targetUserId === null) {
            $context->round->lastAction = new RoundAction(
                'decree_no_target',
                $context->play->actorUserId,
                $context->playedCard->code,
                $context->playedCard->name,
                gmdate(DATE_ATOM),
            );

            return;
        }

        $guessedCardCode = $context->requireGuessedCardCode();
        $guessedCardName = $context->resolveCardName($guessedCardCode);
        $targetCard = $context->targetState($targetUserId)->peekFirstCardInHand();
        $actionType = $targetCard?->code === $guessedCardCode ? 'decree_guard_guess_hit' : 'decree_guard_guess_miss';

        if ($actionType === 'decree_guard_guess_hit') {
            $context->eliminatePlayer($targetUserId);
        } else {
            $context->round->pendingDecision = new PendingDecision(
                'guard_miss_peasant_reaction',
                $targetUserId,
                $context->play->actorUserId,
                'peasant',
                $context->resolveCardName('peasant'),
                guessedCardCode: $guessedCardCode,
                guessedCardName: $guessedCardName,
                canReact: $context->targetState($targetUserId)->hasCard('peasant'),
            );
        }

        $context->round->lastAction = new RoundAction(
            $actionType,
            $context->play->actorUserId,
            $context->playedCard->code,
            $context->playedCard->name,
            gmdate(DATE_ATOM),
            $targetUserId,
            $guessedCardCode,
            $guessedCardName,
        );
    }
}
