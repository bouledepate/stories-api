<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Card;

use Stories\Domain\Matches\Service\CardEffectContext;

final class BishopCard extends AbstractCharacterCard
{
    public function code(): string
    {
        return 'bishop';
    }

    public function name(): string
    {
        return 'Епископ';
    }

    public function value(): int
    {
        return 7;
    }

    public function copies(): int
    {
        return 1;
    }

    public function resolve(CardEffectContext $context): void
    {
    }
}
