<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Decree;

use Stories\Domain\Matches\Model\ActiveDecree;
use Stories\Domain\Matches\Service\CardEffectContext;

abstract class AbstractCharacterDecree
{
    abstract public function code(): string;

    abstract public function title(): string;

    abstract public function cardCode(): string;

    abstract public function effectText(): string;

    abstract public function resolve(CardEffectContext $context): void;

    public function activate(): ActiveDecree
    {
        return new ActiveDecree($this->code(), $this->title(), $this->cardCode(), $this->effectText());
    }
}
