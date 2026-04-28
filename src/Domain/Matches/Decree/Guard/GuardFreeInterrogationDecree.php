<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Decree\Guard;

use Stories\Domain\Matches\Model\PendingDecision;
use Stories\Domain\Matches\Service\CardEffectContext;

final class GuardFreeInterrogationDecree extends AbstractGuardGuessDecree
{
    public function code(): string
    {
        return 'free_interrogation';
    }

    public function title(): string
    {
        return 'Свободный допрос';
    }

    public function effectText(): string
    {
        return 'Выберите игрока и назовите карту (включая Стражника). Если карта угадана, игрок выбывает из раунда.';
    }

    protected function canGuessGuard(): bool
    {
        return true;
    }

    protected function resolveMiss(
        CardEffectContext $context,
        string $targetUserId,
        string $guessedCardCode,
        string $guessedCardName,
    ): void {
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
}
