<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Service;

use Stories\Domain\Matches\Model\MatchState;
use Stories\Domain\Matches\Model\MatchStatus;
use Stories\Domain\Matches\Model\RoundFinishedReason;
use Stories\Domain\Matches\Model\RoundPlayerState;
use Stories\Domain\Matches\Model\RoundStanding;
use Stories\Domain\Matches\Model\RoundState;
use Stories\Domain\Matches\Model\RoundSummary;
use Stories\Shared\Error\ApiErrorCode;
use Stories\Shared\Error\ApiException;

final class RoundFinisher
{
    public function shouldFinishRound(RoundState $round): bool
    {
        if ($round->hasPendingDecision()) {
            return false;
        }

        if ($round->activePlayersCount() <= 1) {
            return true;
        }

        if ($round->hasCardsInDeck()) {
            return false;
        }

        if ($round->lastAction === null || $round->activePlayerId === null) {
            return false;
        }

        $activeState = $round->activePlayerState();
        if (!$activeState instanceof RoundPlayerState || !$activeState->isActive()) {
            return false;
        }

        return count($activeState->hand) <= 1;
    }

    public function finishRound(MatchState $match, RoundState $round): void
    {
        $alive = $this->buildAliveStandings($match, $round);
        if ($alive === []) {
            throw new ApiException(ApiErrorCode::MATCH_STATE_INVALID);
        }

        $winnerIds = $this->resolveRoundWinners($alive);
        $this->awardRoundPoints($match, $winnerIds);
        $finishedReason = count($winnerIds) > 1 ? RoundFinishedReason::TIE : RoundFinishedReason::SINGLE_WINNER;
        $round->moveToFinished($finishedReason, $winnerIds);
        $match->currentRound = $round;
        $match->lastRoundSummary = new RoundSummary(
            $match->roundNumber,
            $finishedReason,
            $winnerIds,
        );

        $this->finalizeMatchStatusAfterRound($match);
    }

    /**
     * @return list<RoundStanding>
     */
    private function buildAliveStandings(MatchState $match, RoundState $round): array
    {
        $alive = [];
        foreach ($match->players as $player) {
            $state = $round->findPlayerState($player->userId);
            if (!$state instanceof RoundPlayerState || !$state->isActive()) {
                continue;
            }

            $alive[] = new RoundStanding(
                $player->userId,
                $state->handValue(),
                $state->discardValueSum(),
            );
        }

        return $alive;
    }

    /**
     * @param list<RoundStanding> $alive
     * @return list<string>
     */
    private function resolveRoundWinners(array $alive): array
    {
        usort($alive, static function (RoundStanding $left, RoundStanding $right): int {
            if ($left->handValue !== $right->handValue) {
                return $right->handValue <=> $left->handValue;
            }

            return $right->discardSum <=> $left->discardSum;
        });

        $top = $alive[0];
        $winners = array_values(array_filter(
            $alive,
            static fn (RoundStanding $item): bool => $item->handValue === $top->handValue && $item->discardSum === $top->discardSum
        ));

        return array_map(static fn (RoundStanding $item): string => $item->userId, $winners);
    }

    /**
     * @param list<string> $winnerIds
     */
    private function awardRoundPoints(MatchState $match, array $winnerIds): void
    {
        foreach ($match->players as $index => $player) {
            if (in_array($player->userId, $winnerIds, true)) {
                $match->players[$index]->points++;
            }
        }
    }

    private function finalizeMatchStatusAfterRound(MatchState $match): void
    {
        $targetPoints = $this->targetPoints(count($match->players));
        foreach ($match->players as $player) {
            if ($player->points >= $targetPoints) {
                $match->status = MatchStatus::FINISHED;
                $match->winnerUserId = $player->userId;
                $match->markUpdated();

                return;
            }
        }

        $match->status = MatchStatus::PENDING;
        $match->markUpdated();
    }

    private function targetPoints(int $playersCount): int
    {
        return match (true) {
            $playersCount <= 2 => 7,
            $playersCount === 3 => 6,
            $playersCount === 4 => 5,
            default => 4,
        };
    }
}
