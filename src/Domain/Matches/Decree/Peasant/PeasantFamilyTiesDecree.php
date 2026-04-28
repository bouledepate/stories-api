<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Decree\Peasant;

use Stories\Domain\Matches\Decree\AbstractCharacterDecree;
use Stories\Domain\Matches\Model\RoundPlayerState;
use Stories\Domain\Matches\Service\CardEffectContext;

final class PeasantFamilyTiesDecree extends AbstractCharacterDecree
{
    public function code(): string
    {
        return 'peasant_family_ties';
    }

    public function title(): string
    {
        return 'Родственные связи';
    }

    public function cardCode(): string
    {
        return 'peasant';
    }

    public function effectText(): string
    {
        return 'До конца раунда у вас иммунитет к эффекту карты Стражник.';
    }

    public function resolve(CardEffectContext $context): void
    {
    }

    public function protectsFromCardEffect(RoundPlayerState $targetState, string $playedCardCode): bool
    {
        return $playedCardCode === 'guard' && $targetState->hasCard($this->cardCode());
    }
}
