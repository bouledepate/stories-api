<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Service;

use Stories\Domain\Matches\Model\Card;
use Stories\Domain\Matches\Model\RoundState;

final class PlayerEliminationService
{
    /**
     * @return list<Card>
     */
    public function eliminate(RoundState $round, string $userId): array
    {
        $playerState = $round->getPlayerState($userId);
        $discarded = $playerState->discardHand();
        $playerState->markEliminated();
        $playerState->clearAutoDiscardOnTurn();

        return $discarded;
    }
}
