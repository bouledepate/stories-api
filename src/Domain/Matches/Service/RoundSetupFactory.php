<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Service;

use Stories\Domain\Matches\Model\Card;
use Stories\Domain\Matches\Model\MatchPlayer;
use Stories\Domain\Matches\Model\MatchState;
use Stories\Domain\Matches\Model\RoundPlayerState;
use Stories\Domain\Matches\Model\RoundState;
use Stories\Domain\Matches\Model\RoundStatus;
use Stories\Shared\Error\ApiErrorCode;
use Stories\Shared\Error\ApiException;

final class RoundSetupFactory
{
    public function __construct(private readonly CharacterDeckFactory $deckFactory)
    {
    }

    public function create(MatchState $match): RoundState
    {
        $deck = $this->deckFactory->createShuffledDeck();
        $this->assertDeckCapacity($match, $deck);

        $round = new RoundState(
            status: RoundStatus::ACTIVE,
            activePlayerId: $this->pickFirstPlayerId($match),
            setAsideCard: $this->drawRequiredCard($deck),
            deck: [],
            revealedCards: $this->drawRevealedCards($match, $deck),
            players: $this->drawOpeningHands($match, $deck),
            lastAction: null,
            finishedReason: null,
            roundWinners: [],
        );

        $round->deck = array_values($deck);
        $round->drawFor($round->activePlayerId ?? '');

        return $round;
    }

    private function pickFirstPlayerId(MatchState $match): string
    {
        $playerIds = array_map(static fn (MatchPlayer $player): string => $player->userId, $match->players);
        if ($playerIds === []) {
            throw new ApiException(ApiErrorCode::MATCH_STATE_INVALID);
        }

        $winnerIds = $match->lastRoundSummary?->winnerUserIds ?? [];
        $eligible = array_values(array_filter(
            $winnerIds,
            static fn (string $id): bool => in_array($id, $playerIds, true)
        ));

        if (count($eligible) === 1) {
            return $eligible[0];
        }

        $pool = $eligible !== [] ? $eligible : $playerIds;
        if (count($pool) === 1) {
            return $pool[0];
        }

        return $pool[random_int(0, count($pool) - 1)];
    }

    /**
     * @param list<mixed> $deck
     */
    private function assertDeckCapacity(MatchState $match, array $deck): void
    {
        $requiredCards = count($match->players) + 1 + (count($match->players) === 2 ? 3 : 0);
        if (count($deck) < $requiredCards) {
            throw new ApiException(ApiErrorCode::MATCH_STATE_INVALID);
        }
    }

    /**
     * @param array<int,mixed> $deck
     */
    private function drawRequiredCard(array &$deck): Card
    {
        $card = array_shift($deck);
        if ($card instanceof Card) {
            return $card;
        }

        throw new ApiException(ApiErrorCode::MATCH_STATE_INVALID);
    }

    /**
     * @param array<int,mixed> $deck
     * @return list<Card>
     */
    private function drawRevealedCards(MatchState $match, array &$deck): array
    {
        $revealedCards = [];
        if (count($match->players) !== 2) {
            return $revealedCards;
        }

        for ($index = 0; $index < 3; $index++) {
            $revealedCards[] = $this->drawRequiredCard($deck);
        }

        return $revealedCards;
    }

    /**
     * @param array<int,mixed> $deck
     * @return array<string,RoundPlayerState>
     */
    private function drawOpeningHands(MatchState $match, array &$deck): array
    {
        $roundPlayers = [];
        foreach ($match->players as $player) {
            $roundPlayers[$player->userId] = new RoundPlayerState(false, [$this->drawRequiredCard($deck)], []);
        }

        return $roundPlayers;
    }
}
