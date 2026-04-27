<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Service;

use Stories\Domain\Matches\Card\CharacterCardRegistry;
use Stories\Domain\Matches\Model\Card;

final class CharacterDeckFactory
{
    public function __construct(private readonly CharacterCardRegistry $cards)
    {
    }

    /**
     * @return list<Card>
     */
    public function createShuffledDeck(): array
    {
        $deck = [];
        foreach ($this->cards->all() as $definition) {
            for ($i = 0; $i < $definition->copies(); $i++) {
                $deck[] = $definition->toStateCard($this->newInstanceId($definition->code(), $i));
            }
        }

        shuffle($deck);

        return array_values($deck);
    }

    private function newInstanceId(string $cardCode, int $index): string
    {
        return sprintf('%s-%d-%s', $cardCode, $index, bin2hex(random_bytes(6)));
    }
}
