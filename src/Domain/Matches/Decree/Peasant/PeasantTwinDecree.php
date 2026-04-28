<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Decree\Peasant;

use Stories\Domain\Matches\Decree\AbstractCharacterDecree;
use Stories\Domain\Matches\Model\RoundPlayerState;
use Stories\Domain\Matches\Service\CardEffectContext;

final class PeasantTwinDecree extends AbstractCharacterDecree
{
    public function code(): string
    {
        return 'peasant_twin';
    }

    public function title(): string
    {
        return 'Близнец';
    }

    public function cardCode(): string
    {
        return 'peasant';
    }

    public function effectText(): string
    {
        return 'Эта карта в конце раунда будет равна старшей карте в вашем сбросе.';
    }

    public function resolve(CardEffectContext $context): void
    {
    }

    public function showdownHandValue(RoundPlayerState $state, int $baseValue): int
    {
        $hasPeasant = false;
        $bestNonPeasant = 0;
        foreach ($state->hand as $card) {
            if ($card->code === $this->cardCode()) {
                $hasPeasant = true;
                continue;
            }

            $bestNonPeasant = max($bestNonPeasant, $card->value);
        }

        if (!$hasPeasant) {
            return $baseValue;
        }

        $bestDiscard = 0;
        foreach ($state->discard as $card) {
            $bestDiscard = max($bestDiscard, $card->value);
        }

        return max($bestNonPeasant, $bestDiscard);
    }
}
