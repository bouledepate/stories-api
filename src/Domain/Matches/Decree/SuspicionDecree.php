<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Decree;

use Stories\Domain\Matches\Model\PendingDecision;
use Stories\Domain\Matches\Model\RoundAction;
use Stories\Domain\Matches\Service\CardEffectContext;
use Stories\Shared\Error\ApiErrorCode;
use Stories\Shared\Error\ApiException;

final class SuspicionDecree extends AbstractCharacterDecree
{
    public function code(): string
    {
        return 'suspicion';
    }

    public function title(): string
    {
        return 'Подозрения';
    }

    public function cardCode(): string
    {
        return 'guard';
    }

    public function effectText(): string
    {
        return 'Выберите игрока и назовите карту (кроме Стражника). Если карта угадана, игрок выбывает из раунда. Иначе он немедленно называет карту в ответ. Вы выбываете, если ваша карта была угадана.';
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
        if ($guessedCardCode === $this->cardCode()) {
            throw new ApiException(ApiErrorCode::GUARD_CANNOT_GUESS_GUARD);
        }

        $guessedCardName = $context->resolveCardName($guessedCardCode);
        $targetCard = $context->targetState($targetUserId)->peekFirstCardInHand();
        $actionType = $targetCard?->code === $guessedCardCode ? 'decree_guard_guess_hit' : 'decree_guard_guess_miss';

        if ($actionType === 'decree_guard_guess_hit') {
            $context->eliminatePlayer($targetUserId);
        } else {
            $context->round->pendingDecision = new PendingDecision(
                'suspicion_counter_guess',
                $targetUserId,
                $context->play->actorUserId,
                $context->playedCard->code,
                $context->playedCard->name,
                targetUserId: $context->play->actorUserId,
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
