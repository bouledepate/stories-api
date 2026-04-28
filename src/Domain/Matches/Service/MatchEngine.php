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
        private readonly DecreeRotationService $decreeRotation,
        private readonly TurnResolver $turnResolver,
        private readonly RoundFinisher $roundFinisher,
    ) {
    }

    public function startRound(MatchState $match): MatchState
    {
        $this->assertCanStartRound($match);
        if (!$this->ensureDecreeRotationResolved($match)) {
            return $match;
        }

        return $this->activateRound($match, $this->roundSetup->create($match));
    }

    public function chooseDecree(MatchState $match, string $actorUserId, string $chosenCode, ?string $replaceCode = null): MatchState
    {
        $choice = $match->pendingDecreeChoice;
        if ($choice === null) {
            throw new ApiException(ApiErrorCode::MATCH_STATE_INVALID);
        }

        if ($choice->leaderUserId !== $actorUserId) {
            throw new ApiException(ApiErrorCode::NOT_PLAYER_TURN);
        }

        $this->decreeRotation->applyChoice($match, $chosenCode, $replaceCode);
        $chosenDecree = null;
        foreach ($match->activeDecrees as $activeDecree) {
            if ($activeDecree->code === $chosenCode) {
                $chosenDecree = $activeDecree;
                break;
            }
        }

        $started = $this->startRound($match);
        if ($chosenDecree !== null && $started->currentRound instanceof RoundState) {
            $started->currentRound->lastAction = new \Stories\Domain\Matches\Model\RoundAction(
                'decree_chosen',
                $actorUserId,
                '',
                '',
                gmdate(DATE_ATOM),
                targetCardCode: $chosenDecree->code,
                targetCardName: $chosenDecree->title,
            );
        }

        return $started;
    }

    public function playCard(MatchState $match, CardPlay $play): MatchState
    {
        $round = $this->requireActiveRound($match);
        if ($round->hasPendingDecision()) {
            $advanceFromUserId = $this->turnResolver->resolvePendingDecision($round, $play);
            if ($round->hasPendingDecision()) {
                return $this->completeRoundState($match, $round);
            }

            if ($round->activePlayersCount() <= 1) {
                $this->roundFinisher->finishRound($match, $round);

                return $match;
            }

            $this->turnResolver->advanceAfterAction($match, $round, $advanceFromUserId);
            if ($round->lastAction?->type === 'peasant_reaction_safe') {
                $match->currentRound = $round;
                $match->markUpdated();

                return $match;
            }

            return $this->completeRoundState($match, $round);
        }

        return $this->finalizeRoundProgress(
            $match,
            $round,
            fn () => $this->turnResolver->resolveCardPlay($match, $round, $play),
            fn () => $play->actorUserId,
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
                fn () => $this->turnResolver->resolveLeaveOnTurn($round, $userId),
                fn () => $userId,
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

    private function ensureDecreeRotationResolved(MatchState $match): bool
    {
        if ($match->roundNumber === 0 && $match->activeDecrees === [] && $match->decreeDeckCodes === [] && $match->decreeDiscardCodes === []) {
            $this->decreeRotation->initializeForNewMatch($match);
        }

        $nextRoundNumber = $match->roundNumber + 1;
        if ($match->decreeRotationRoundNumber === $nextRoundNumber) {
            return true;
        }

        if ($match->pendingDecreeChoice !== null) {
            $match->markUpdated();

            return false;
        }

        $choice = $this->decreeRotation->prepareChoiceForRound(
            $match,
            $nextRoundNumber,
            $this->decreeLeaderUserId($match),
        );
        if ($choice !== null) {
            $match->pendingDecreeChoice = $choice;
            $match->markUpdated();

            return false;
        }

        $match->markUpdated();

        return true;
    }

    private function decreeLeaderUserId(MatchState $match): string
    {
        $players = $match->players;
        if ($players === []) {
            throw new ApiException(ApiErrorCode::MATCH_STATE_INVALID);
        }

        $maxPoints = max(array_map(static fn ($player): int => $player->points, $players));
        $leaders = array_values(array_filter($players, static fn ($player): bool => $player->points === $maxPoints));
        $winnerIds = $match->lastRoundSummary?->winnerUserIds ?? [];
        foreach ($winnerIds as $winnerId) {
            foreach ($leaders as $leader) {
                if ($leader->userId === $winnerId) {
                    return $leader->userId;
                }
            }
        }

        return $leaders[0]->userId;
    }

    /**
     * @param callable():void $applyAction
     * @param callable():string $advanceFromUserId
     */
    private function finalizeRoundProgress(
        MatchState $match,
        RoundState $round,
        callable $applyAction,
        callable $advanceFromUserId,
    ): MatchState {
        $applyAction();

        if ($round->hasPendingDecision()) {
            return $this->completeRoundState($match, $round);
        }

        if ($this->roundFinisher->shouldFinishRound($round)) {
            $this->roundFinisher->finishRound($match, $round);

            return $match;
        }

        $this->turnResolver->advanceAfterAction($match, $round, $advanceFromUserId());

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
