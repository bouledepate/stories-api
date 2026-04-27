<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Card;

use Stories\Domain\Matches\Model\RoundAction;
use Stories\Domain\Matches\Service\CardEffectContext;
use Stories\Shared\Error\ApiErrorCode;
use Stories\Shared\Error\ApiException;

final class GuardCard extends AbstractCharacterCard
{
    public function code(): string
    {
        return 'guard';
    }

    public function name(): string
    {
        return 'Стражник';
    }

    public function value(): int
    {
        return 1;
    }

    public function copies(): int
    {
        return 5;
    }

    public function resolve(CardEffectContext $context): void
    {
        $targetUserId = $context->resolveTargetUserId();
        if ($targetUserId === null) {
            $context->round->lastAction = new RoundAction(
                'guard_no_target',
                $context->play->actorUserId,
                $context->playedCard->code,
                $context->playedCard->name,
                gmdate(DATE_ATOM),
            );

            return;
        }

        $guessedCardCode = $context->requireGuessedCardCode();
        if ($guessedCardCode === $this->code()) {
            throw new ApiException(ApiErrorCode::GUARD_CANNOT_GUESS_GUARD);
        }

        $guessedCardName = $context->resolveCardName($guessedCardCode);
        $targetCard = $context->targetState($targetUserId)->peekFirstCardInHand();
        $actionType = $targetCard?->code === $guessedCardCode ? 'guard_guess_hit' : 'guard_guess_miss';

        if ($actionType === 'guard_guess_hit') {
            $context->eliminatePlayer($targetUserId);
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
