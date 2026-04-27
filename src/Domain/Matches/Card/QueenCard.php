<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Card;

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
    }
}
