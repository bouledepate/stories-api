<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Decree\Peasant;

use Stories\Domain\Matches\Decree\AbstractCharacterDecree;
use Stories\Domain\Matches\Model\Card;
use Stories\Domain\Matches\Model\RoundPlayerState;
use Stories\Domain\Matches\Service\CardEffectContext;
use Stories\Shared\Error\ApiErrorCode;
use Stories\Shared\Error\ApiException;

final class PeasantBestFriendDecree extends AbstractCharacterDecree
{
    public function code(): string
    {
        return 'peasant_best_friend';
    }

    public function title(): string
    {
        return 'Лучший друг';
    }

    public function cardCode(): string
    {
        return 'peasant';
    }

    public function effectText(): string
    {
        return 'Пока активен указ: уберите из колоды одну карту Крестьянин. Вы не можете разыграть эту карту. Её можно сбросить эффектами других карт.';
    }

    public function resolve(CardEffectContext $context): void
    {
    }

    public function modifyRoundDeck(array &$deck): array
    {
        foreach ($deck as $index => $card) {
            if ($card->code !== $this->cardCode()) {
                continue;
            }

            unset($deck[$index]);
            $deck = array_values($deck);

            return [$card];
        }

        return [];
    }

    public function assertCanPlayCard(\Stories\Domain\Matches\Model\MatchState $match, \Stories\Domain\Matches\Model\RoundState $round, RoundPlayerState $actorState, Card $selectedCard): void
    {
        if ($selectedCard->code === $this->cardCode()) {
            throw new ApiException(ApiErrorCode::CARD_PLAY_FORBIDDEN_BY_DECREE);
        }
    }
}
