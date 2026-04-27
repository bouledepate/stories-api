<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Card;

use Stories\Domain\Matches\Model\Card;
use Stories\Domain\Matches\Service\CardEffectContext;

abstract class AbstractCharacterCard
{
    final public function toStateCard(?string $instanceId = null): Card
    {
        return new Card(
            $this->code(),
            $this->name(),
            $this->value(),
            $instanceId,
        );
    }

    abstract public function code(): string;

    abstract public function name(): string;

    abstract public function value(): int;

    abstract public function copies(): int;

    abstract public function resolve(CardEffectContext $context): void;
}
