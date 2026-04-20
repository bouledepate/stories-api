<?php

declare(strict_types=1);

namespace Stories\Slices\Rooms\Service;

use Doctrine\DBAL\Connection;
use Stories\Slices\Rooms\Domain\GameCard;
use Stories\Slices\Rooms\Domain\RoundState;

final class RoundFactory
{
    public function __construct(private readonly Connection $db)
    {
    }

    /** @param list<string> $players */
    public function create(array $players, string $firstPlayerId, int $decreeRoundsUsed): RoundState
    {
        $characterDeck = array_map(
            static fn (array $row): GameCard => GameCard::fromDbRow($row),
            $this->db->createQueryBuilder()
                ->select('c.code', 'c.name', 'c.value', 'c.text')
                ->from('cards', 'c')
                ->where('c.deck = :deck')
                ->andWhere('c.enabled = 1')
                ->andWhere('c.code <> :excludedCode')
                ->orderBy('RANDOM()')
                ->setParameter('deck', 'character')
                ->setParameter('excludedCode', 'shadow')
                ->fetchAllAssociative()
        );

        $decrees = array_map(
            static fn (array $row): GameCard => GameCard::fromDbRow($row),
            $this->db->createQueryBuilder()
                ->select('c.code', 'c.name', 'c.text', 'c.effect_key')
                ->from('cards', 'c')
                ->where('c.deck = :deck')
                ->andWhere('c.enabled = 1')
                ->orderBy('RANDOM()')
                ->setParameter('deck', 'decree')
                ->fetchAllAssociative()
        );

        $hiddenCard = array_shift($characterDeck);
        $hands = [];
        foreach ($players as $playerId) {
            $card = array_shift($characterDeck);
            $hands[$playerId] = $card !== null ? [$card] : [];
        }

        $activeDecree = $decreeRoundsUsed < 3 ? ($decrees[0] ?? null) : null;

        $turnOrder = [$firstPlayerId];
        foreach ($players as $playerId) {
            if ($playerId !== $firstPlayerId) {
                $turnOrder[] = $playerId;
            }
        }

        return new RoundState(
            $activeDecree,
            $hiddenCard,
            $characterDeck,
            [],
            $turnOrder,
            0,
            $hands,
            $players
        );
    }
}
