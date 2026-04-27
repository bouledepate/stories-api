<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Service;

use Stories\Domain\Matches\Card\CharacterCardRegistry;
use Stories\Domain\Matches\Decree\DecreeRegistry;
use Stories\Domain\Matches\Model\Card;
use Stories\Domain\Matches\Model\CardPlay;
use Stories\Domain\Matches\Model\MatchState;
use Stories\Domain\Matches\Model\RoundPlayerState;
use Stories\Domain\Matches\Model\RoundState;

final class CardEffectResolver
{
    public function __construct(
        private readonly CharacterCardRegistry $cards,
        private readonly DecreeRegistry $decrees,
        private readonly PlayerEliminationService $eliminations,
    ) {
    }

    public function resolve(
        MatchState $match,
        RoundState $round,
        CardPlay $play,
        Card $playedCard,
        RoundPlayerState $actorState,
    ): void {
        $activeDecree = $match->activeDecreeForCard($playedCard->code, $round);
        if ($activeDecree !== null) {
            $this->decrees->require($activeDecree->code)->resolve(new CardEffectContext(
                $match,
                $round,
                $play,
                $playedCard,
                $actorState,
                $this->cards,
                $this->eliminations,
            ));

            return;
        }

        $definition = $this->cards->require($playedCard->code);
        $definition->resolve(new CardEffectContext(
            $match,
            $round,
            $play,
            $playedCard,
            $actorState,
            $this->cards,
            $this->eliminations,
        ));
    }
}
