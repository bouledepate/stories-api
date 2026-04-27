<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Service;

use Stories\Domain\Matches\Model\CardPlay;
use Stories\Domain\Matches\Model\MatchState;
use Stories\Domain\Matches\Model\MatchStatus;
use Stories\Domain\Matches\Model\RoundFinishedReason;
use Stories\Domain\Matches\Model\RoundPlayerState;
use Stories\Domain\Matches\Model\RoundState;
use Stories\Domain\Matches\Model\RoundSummary;
use Stories\Shared\Error\ApiErrorCode;
use Stories\Shared\Error\ApiException;

final class MatchEngine
{
    public function __construct(
        private readonly RoundSetupFactory $roundSetup,
        private readonly TurnResolver $turnResolver,
        private readonly RoundFinisher $roundFinisher,
    ) {
    }

    public function startRound(MatchState $match): MatchState
    {
        $this->assertCanStartRound($match);

        return $this->activateRound($match, $this->roundSetup->create($match));
    }

    public function playCard(MatchState $match, CardPlay $play): MatchState
    {
        $round = $this->requireActiveRound($match);
        if ($round->hasPendingDecision()) {
            return $this->finalizeRoundProgress(
                $match,
                $round,
                $play->actorUserId,
                fn () => $this->turnResolver->resolvePendingDecision($round, $play),
            );
        }

        return $this->finalizeRoundProgress(
            $match,
            $round,
            $play->actorUserId,
            fn () => $this->turnResolver->resolveCardPlay($match, $round, $play),
        );
    }

    public function handlePlayerLeave(MatchState $match, string $userId): MatchState
    {
        if (!$match->hasPlayer($userId)) {
            return $match;
        }

        $round = $match->currentRound;
        if (!$round instanceof RoundState || !$round->isActive()) {
            $match->markUpdated();

            return $match;
        }

        $playerState = $round->findPlayerState($userId);
        if (!$playerState instanceof RoundPlayerState || !$playerState->isActive()) {
            $match->markUpdated();

            return $match;
        }

        if ($round->isPlayerTurn($userId)) {
            return $this->finalizeRoundProgress(
                $match,
                $round,
                $userId,
                fn () => $this->turnResolver->resolveLeaveOnTurn($round, $userId),
            );
        }

        $this->turnResolver->markLeaveOutsideTurn($round, $userId);

        return $this->completeRoundState($match, $round);
    }

    public function finishMatchWithWinner(MatchState $match, string $winnerUserId): MatchState
    {
        $match->status = MatchStatus::FINISHED;
        $match->winnerUserId = $winnerUserId;

        if ($match->currentRound instanceof RoundState && $match->currentRound->isActive()) {
            $match->currentRound->moveToFinished(RoundFinishedReason::SINGLE_WINNER, [$winnerUserId]);
            $match->lastRoundSummary = new RoundSummary(
                $match->roundNumber,
                RoundFinishedReason::SINGLE_WINNER,
                [$winnerUserId],
            );
        }

        $match->markUpdated();

        return $match;
    }

    private function assertCanStartRound(MatchState $match): void
    {
        if ($match->isFinished()) {
            throw new ApiException(ApiErrorCode::MATCH_ALREADY_FINISHED);
        }

        if ($match->hasActiveRound()) {
            throw new ApiException(ApiErrorCode::ROUND_ALREADY_ACTIVE);
        }
    }

    private function requireActiveRound(MatchState $match): RoundState
    {
        $round = $match->currentRound;
        if (!$round instanceof RoundState || !$round->isActive()) {
            throw new ApiException(ApiErrorCode::ROUND_NOT_ACTIVE);
        }

        return $round;
    }

    private function activateRound(MatchState $match, RoundState $round): MatchState
    {
        $match->roundNumber++;
        $match->status = MatchStatus::ACTIVE;
        $match->currentRound = $round;
        $match->markUpdated();

        return $match;
    }

    /**
     * @param callable():void $applyAction
     */
    private function finalizeRoundProgress(
        MatchState $match,
        RoundState $round,
        string $actorUserId,
        callable $applyAction,
    ): MatchState {
        $applyAction();

        if ($round->hasPendingDecision()) {
            return $this->completeRoundState($match, $round);
        }

        if ($this->roundFinisher->shouldFinishRound($round)) {
            $this->roundFinisher->finishRound($match, $round);

            return $match;
        }

        $this->turnResolver->advanceAfterAction($match, $round, $actorUserId);

        return $this->completeRoundState($match, $round);
    }

    private function completeRoundState(MatchState $match, RoundState $round): MatchState
    {
        if ($this->roundFinisher->shouldFinishRound($round)) {
            $this->roundFinisher->finishRound($match, $round);

            return $match;
        }

        $match->currentRound = $round;
        $match->markUpdated();

        return $match;
    }
}
