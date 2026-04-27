<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Card;

use Stories\Domain\Matches\Service\CardEffectContext;

final class KingCard extends AbstractCharacterCard
{
    public function code(): string
    {
        return 'king';
    }

    public function name(): string
    {
        return 'Король';
    }

    public function value(): int
    {
        return 9;
    }

    public function copies(): int
    {
        return 1;
    }

    public function resolve(CardEffectContext $context): void
    {
    }
}
