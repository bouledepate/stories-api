<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Decree\Guard;

use Stories\Domain\Matches\Model\PendingDecision;
use Stories\Domain\Matches\Service\CardEffectContext;

final class GuardSuspicionDecree extends AbstractGuardGuessDecree
{
    public function code(): string
    {
        return 'suspicion';
    }

    public function title(): string
    {
        return 'Подозрения';
    }

    public function effectText(): string
    {
        return 'Выберите игрока и назовите карту (кроме Стражника). Если карта угадана, игрок выбывает из раунда. Иначе он немедленно называет карту в ответ. Вы выбываете, если ваша карта была угадана.';
    }

    protected function canGuessGuard(): bool
    {
        return false;
    }

    protected function resolveMiss(
        CardEffectContext $context,
        string $targetUserId,
        string $guessedCardCode,
        string $guessedCardName,
    ): void {
        $context->round->pendingDecision = new PendingDecision(
            'suspicion_counter_guess',
            $targetUserId,
            $context->play->actorUserId,
            $context->playedCard->code,
            $context->playedCard->name,
            targetUserId: $context->play->actorUserId,
        );
    }
}
