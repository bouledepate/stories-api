<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Decree\Peasant;

use Stories\Domain\Matches\Decree\AbstractCharacterDecree;
use Stories\Domain\Matches\Model\MatchState;
use Stories\Domain\Matches\Model\RoundPlayerState;
use Stories\Domain\Matches\Model\RoundState;
use Stories\Domain\Matches\Service\CardEffectContext;

final class PeasantDarkHorseDecree extends AbstractCharacterDecree
{
    public function code(): string
    {
        return 'peasant_dark_horse';
    }

    public function title(): string
    {
        return 'Тёмная лошадка';
    }

    public function cardCode(): string
    {
        return 'peasant';
    }

    public function effectText(): string
    {
        return 'Получите 1 королевский жетон, если сохранили эту карту до конца раунда.';
    }

    public function resolve(CardEffectContext $context): void
    {
    }

    public function awardEndRoundBonuses(MatchState $match, RoundState $round): void
    {
        foreach ($match->players as $index => $player) {
            $state = $round->findPlayerState($player->userId);
            if (!$state instanceof RoundPlayerState || !$state->isActive() || !$state->hasCard($this->cardCode())) {
                continue;
            }

            $match->players[$index]->points++;
        }
    }
}
