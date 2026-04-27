<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Card;

use Stories\Domain\Matches\Service\CardEffectContext;

final class PeasantCard extends AbstractCharacterCard
{
    public function code(): string
    {
        return 'peasant';
    }

    public function name(): string
    {
        return 'Крестьянин';
    }

    public function value(): int
    {
        return 0;
    }

    public function copies(): int
    {
        return 2;
    }

    public function resolve(CardEffectContext $context): void
    {
        // Regular turn play is allowed, but the card has no standalone effect.
    }
}
