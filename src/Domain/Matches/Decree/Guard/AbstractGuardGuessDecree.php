<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Decree\Guard;

use Stories\Domain\Matches\Decree\AbstractCharacterDecree;
use Stories\Domain\Matches\Model\RoundAction;
use Stories\Domain\Matches\Service\CardEffectContext;
use Stories\Shared\Error\ApiErrorCode;
use Stories\Shared\Error\ApiException;

abstract class AbstractGuardGuessDecree extends AbstractCharacterDecree
{
    final public function cardCode(): string
    {
        return 'guard';
    }

    final public function resolve(CardEffectContext $context): void
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
        if (!$this->canGuessGuard() && $guessedCardCode === $this->cardCode()) {
            throw new ApiException(ApiErrorCode::GUARD_CANNOT_GUESS_GUARD);
        }

        $guessedCardName = $context->resolveCardName($guessedCardCode);
        $targetCard = $context->targetState($targetUserId)->peekFirstCardInHand();
        $hit = $targetCard?->code === $guessedCardCode;

        if ($hit) {
            $context->eliminatePlayer($targetUserId);
        } else {
            $this->resolveMiss($context, $targetUserId, $guessedCardCode, $guessedCardName);
        }

        $context->round->lastAction = new RoundAction(
            $hit ? 'decree_guard_guess_hit' : 'decree_guard_guess_miss',
            $context->play->actorUserId,
            $context->playedCard->code,
            $context->playedCard->name,
            gmdate(DATE_ATOM),
            $targetUserId,
            $guessedCardCode,
            $guessedCardName,
        );
    }

    abstract protected function canGuessGuard(): bool;

    abstract protected function resolveMiss(
        CardEffectContext $context,
        string $targetUserId,
        string $guessedCardCode,
        string $guessedCardName,
    ): void;
}
