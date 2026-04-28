<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Service;

use Stories\Domain\Matches\Decree\DecreeRegistry;
use Stories\Domain\Matches\Model\Card;
use Stories\Domain\Matches\Model\CardPlay;
use Stories\Domain\Matches\Model\MatchState;
use Stories\Domain\Matches\Model\RoundAction;
use Stories\Domain\Matches\Model\RoundPlayerState;
use Stories\Domain\Matches\Model\RoundState;
use Stories\Shared\Error\ApiErrorCode;
use Stories\Shared\Error\ApiException;

final class TurnResolver
{
    public function __construct(
        private readonly CardEffectResolver $effectResolver,
        private readonly DecreeRegistry $decrees,
        private readonly PlayerEliminationService $eliminations,
    )
    {
    }

    public function resolveCardPlay(MatchState $match, RoundState $round, CardPlay $play): void
    {
        $this->assertCanPlayCard($match, $round, $play);

        $playerState = $round->getPlayerState($play->actorUserId);
        $hadLockedCard = $playerState->hasLockedCard();
        $playedCard = $this->removePlayedCard($round, $play, $playerState);
        $this->effectResolver->resolve($match, $round, $play, $playedCard, $playerState);
        if ($hadLockedCard) {
            $playerState->clearLockedCard();
        }
    }

    public function resolvePendingDecision(RoundState $round, CardPlay $play): string
    {
        $pendingDecision = $round->pendingDecision;
        if ($pendingDecision === null) {
            throw new ApiException(ApiErrorCode::MATCH_STATE_INVALID);
        }

        if ($pendingDecision->actorUserId !== $play->actorUserId || $pendingDecision->cardCode !== $play->cardCode) {
            throw new ApiException(ApiErrorCode::NOT_PLAYER_TURN);
        }

        if ($pendingDecision->type === 'feudal_lord_swap') {
            $this->resolveFeudalPendingDecision($round, $play, $pendingDecision);
            return $pendingDecision->originActorUserId;
        }

        if ($pendingDecision->type === 'guard_miss_peasant_reaction') {
            $this->resolvePeasantReactionPendingDecision($round, $play, $pendingDecision);
            return $pendingDecision->originActorUserId;
        }

        if ($pendingDecision->type === 'queen_decree_suppression') {
            $this->resolveQueenDecreeSuppression($round, $play, $pendingDecision);
            return $pendingDecision->originActorUserId;
        }

        if ($pendingDecision->type === 'suspicion_counter_guess') {
            $this->resolveSuspicionCounterGuess($round, $play, $pendingDecision);
            return $pendingDecision->originActorUserId;
        }

        throw new ApiException(ApiErrorCode::MATCH_STATE_INVALID);
    }

    private function resolveSuspicionCounterGuess(RoundState $round, CardPlay $play, \Stories\Domain\Matches\Model\PendingDecision $pendingDecision): void
    {
        $guessedCardCode = $play->guessedCardCode;
        if ($guessedCardCode === null || $guessedCardCode === '') {
            throw new ApiException(ApiErrorCode::CARD_GUESS_REQUIRED);
        }

        if ($guessedCardCode === 'guard') {
            throw new ApiException(ApiErrorCode::GUARD_CANNOT_GUESS_GUARD);
        }

        $originState = $round->getPlayerState($pendingDecision->originActorUserId);
        $originCard = $originState->peekFirstCardInHand();
        $actionType = $originCard?->code === $guessedCardCode ? 'decree_guard_counter_guess_hit' : 'decree_guard_counter_guess_miss';

        if ($actionType === 'decree_guard_counter_guess_hit') {
            $this->eliminations->eliminate($round, $pendingDecision->originActorUserId);
        }

        $round->lastAction = new RoundAction(
            $actionType,
            $play->actorUserId,
            $pendingDecision->cardCode,
            $pendingDecision->cardName,
            gmdate(DATE_ATOM),
            $pendingDecision->originActorUserId,
            $guessedCardCode,
            $originCard?->code === $guessedCardCode ? $originCard?->name : $guessedCardCode,
        );
        $round->clearPendingDecision();
    }

    private function resolveQueenDecreeSuppression(RoundState $round, CardPlay $play, \Stories\Domain\Matches\Model\PendingDecision $pendingDecision): void
    {
        $targetDecreeCode = $play->targetDecreeCode;
        $availableDecrees = $pendingDecision->availableDecrees;
        $selectedDecree = null;
        foreach ($availableDecrees as $decree) {
            if (!is_array($decree) || (string) ($decree['code'] ?? '') !== $targetDecreeCode) {
                continue;
            }

            $selectedDecree = $decree;
            break;
        }

        if ($selectedDecree === null || $targetDecreeCode === null || $targetDecreeCode === '') {
            throw new ApiException(ApiErrorCode::TARGET_PLAYER_REQUIRED);
        }

        $round->suppressDecree($targetDecreeCode);
        $round->lastAction = new RoundAction(
            'queen_decree_suppressed',
            $play->actorUserId,
            $pendingDecision->cardCode,
            $pendingDecision->cardName,
            gmdate(DATE_ATOM),
            targetCardCode: $targetDecreeCode,
            targetCardName: (string) ($selectedDecree['title'] ?? $targetDecreeCode),
        );
        $round->clearPendingDecision();
    }

    private function resolveFeudalPendingDecision(RoundState $round, CardPlay $play, \Stories\Domain\Matches\Model\PendingDecision $pendingDecision): void
    {
        $targetState = $round->getPlayerState((string) $pendingDecision->targetUserId);
        $secondTargetState = $round->getPlayerState((string) $pendingDecision->secondTargetUserId);
        if ($play->shouldSwap === true) {
            $targetState->swapFirstHandCardWith($secondTargetState);
            $round->lastAction = new RoundAction(
                'feudal_swap',
                $play->actorUserId,
                $pendingDecision->cardCode,
                $pendingDecision->cardName,
                gmdate(DATE_ATOM),
                $pendingDecision->targetUserId,
                secondTargetUserId: $pendingDecision->secondTargetUserId,
            );
        } else {
            $round->lastAction = new RoundAction(
                'feudal_keep',
                $play->actorUserId,
                $pendingDecision->cardCode,
                $pendingDecision->cardName,
                gmdate(DATE_ATOM),
                $pendingDecision->targetUserId,
                secondTargetUserId: $pendingDecision->secondTargetUserId,
            );
        }

        $round->clearPendingDecision();
    }

    private function resolvePeasantReactionPendingDecision(RoundState $round, CardPlay $play, \Stories\Domain\Matches\Model\PendingDecision $pendingDecision): void
    {
        $playerState = $round->getPlayerState($play->actorUserId);
        if ($pendingDecision->canReact && $play->shouldReact === true) {
            $playedCard = $playerState->removeCardFromHand('peasant', $play->cardInstanceId);
            $playerState->addToDiscard($playedCard);
            $round->drawFor($play->actorUserId);
            $drawnCard = $playerState->peekFirstCardInHand();

            if ($drawnCard?->code === $pendingDecision->guessedCardCode) {
                $this->eliminations->eliminate($round, $play->actorUserId);
                $round->lastAction = new RoundAction(
                    'peasant_reaction_eliminated',
                    $play->actorUserId,
                    $pendingDecision->cardCode,
                    $pendingDecision->cardName,
                    gmdate(DATE_ATOM),
                    $play->actorUserId,
                    $pendingDecision->guessedCardCode,
                    $pendingDecision->guessedCardName,
                );
            } else {
                $round->lastAction = new RoundAction(
                    'peasant_reaction_safe',
                    $play->actorUserId,
                    $pendingDecision->cardCode,
                    $pendingDecision->cardName,
                    gmdate(DATE_ATOM),
                    $play->actorUserId,
                    $pendingDecision->guessedCardCode,
                    $pendingDecision->guessedCardName,
                );
            }
        } else {
            $round->lastAction = new RoundAction(
                'guard_miss_resolved',
                $play->actorUserId,
                $pendingDecision->cardCode,
                $pendingDecision->cardName,
                gmdate(DATE_ATOM),
                $play->actorUserId,
                $pendingDecision->guessedCardCode,
                $pendingDecision->guessedCardName,
            );
        }

        $round->clearPendingDecision();
    }

    public function advanceAfterAction(MatchState $match, RoundState $round, string $actorUserId): void
    {
        $nextPlayerId = $this->nextActivePlayerId($match, $round, $actorUserId);
        $this->advanceToPlayableTurn($match, $round, $nextPlayerId);
    }

    public function resolveLeaveOnTurn(RoundState $round, string $userId): void
    {
        $round->clearPendingDecision();
        $this->discardOneCardAndEliminate($round, $userId, 'auto_played_on_leave');
    }

    public function markLeaveOutsideTurn(RoundState $round, string $userId): void
    {
        $playerState = $round->getPlayerState($userId);
        $playerState->markAutoDiscardOnTurn();
        $round->lastAction = new RoundAction(
            'auto_discard_on_turn',
            $userId,
            '',
            '',
            gmdate(DATE_ATOM),
        );
    }

    private function assertCanPlayCard(MatchState $match, RoundState $round, CardPlay $play): void
    {
        if (!$round->isActive()) {
            throw new ApiException(ApiErrorCode::ROUND_NOT_ACTIVE);
        }

        if (!$round->isPlayerTurn($play->actorUserId)) {
            throw new ApiException(ApiErrorCode::NOT_PLAYER_TURN);
        }

        $playerState = $round->getPlayerState($play->actorUserId);
        if (!$playerState->isActive()) {
            throw new ApiException(ApiErrorCode::PLAYER_ELIMINATED);
        }

        $selectedCard = $this->findSelectedCard($playerState, $play);
        if ($selectedCard !== null && $playerState->isLockedCard($selectedCard)) {
            throw new ApiException(ApiErrorCode::CARD_PLAY_BLOCKED);
        }

        if ($selectedCard !== null) {
            foreach ($match->unsuppressedDecrees($round) as $activeDecree) {
                $this->decrees->require($activeDecree->code)->assertCanPlayCard($playerState, $selectedCard);
            }
        }
    }

    private function removePlayedCard(RoundState $round, CardPlay $play, RoundPlayerState $playerState): Card
    {
        $playedCard = $playerState->removeCardFromHand($play->cardCode, $play->cardInstanceId);
        $playerState->addToDiscard($playedCard);
        $round->lastAction = new RoundAction(
            'card_played',
            $play->actorUserId,
            $playedCard->code,
            $playedCard->name,
            gmdate(DATE_ATOM),
        );

        return $playedCard;
    }

    private function findSelectedCard(RoundPlayerState $playerState, CardPlay $play): ?Card
    {
        foreach ($playerState->hand as $card) {
            if ($play->cardInstanceId !== null && $play->cardInstanceId !== '' && $card->instanceId !== $play->cardInstanceId) {
                continue;
            }

            if ($card->code === $play->cardCode) {
                return $card;
            }
        }

        return null;
    }

    private function nextActivePlayerId(MatchState $match, RoundState $round, string $currentUserId): string
    {
        $ordered = $match->orderedPlayerIds();
        $startIndex = array_search($currentUserId, $ordered, true);
        $startIndex = is_int($startIndex) ? $startIndex : 0;

        $count = count($ordered);
        for ($step = 1; $step <= $count; $step++) {
            $index = ($startIndex + $step) % $count;
            $candidate = $ordered[$index];
            $state = $round->findPlayerState($candidate);
            if (!$state instanceof RoundPlayerState || !$state->isActive()) {
                continue;
            }

            return $candidate;
        }

        throw new ApiException(ApiErrorCode::MATCH_STATE_INVALID);
    }

    private function advanceToPlayableTurn(MatchState $match, RoundState $round, string $nextPlayerId): void
    {
        $currentUserId = $nextPlayerId;
        while (true) {
            $state = $round->findPlayerState($currentUserId);
            if (!$state instanceof RoundPlayerState || !$state->isActive()) {
                throw new ApiException(ApiErrorCode::MATCH_STATE_INVALID);
            }

            if (!$state->autoDiscardOnTurn) {
                $state->clearEffectProtection();
                $round->activePlayerId = $currentUserId;
                $round->drawFor($currentUserId);

                return;
            }

            $this->discardOneCardAndEliminate($round, $currentUserId, 'auto_discard_on_turn');
            if ($round->activePlayersCount() <= 1) {
                return;
            }

            $currentUserId = $this->nextActivePlayerId($match, $round, $currentUserId);
        }
    }

    private function discardOneCardAndEliminate(RoundState $round, string $userId, string $actionType): void
    {
        $discarded = $this->eliminations->eliminate($round, $userId);
        $firstDiscarded = $discarded[0] ?? null;
        $round->lastAction = new RoundAction(
            $actionType,
            $userId,
            $firstDiscarded?->code ?? '',
            $firstDiscarded?->name ?? '',
            gmdate(DATE_ATOM),
        );
    }
}
