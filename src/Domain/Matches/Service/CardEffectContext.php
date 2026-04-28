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
use Stories\Shared\Error\ApiErrorCode;
use Stories\Shared\Error\ApiException;

final class CardEffectContext
{
    public function __construct(
        public readonly MatchState $match,
        public readonly RoundState $round,
        public readonly CardPlay $play,
        public readonly Card $playedCard,
        public readonly RoundPlayerState $actorState,
        private readonly CharacterCardRegistry $cards,
        private readonly DecreeRegistry $decrees,
        private readonly PlayerEliminationService $eliminations,
    ) {
    }

    public function requireOtherActiveTargetUserId(): string
    {
        $targetUserId = $this->resolveTargetUserId();
        if ($targetUserId === null) {
            throw new ApiException(ApiErrorCode::TARGET_PLAYER_REQUIRED);
        }

        return $targetUserId;
    }

    public function requireTargetUserId(bool $allowSelf = false): string
    {
        $targetUserId = $this->resolveTargetUserId($allowSelf);
        if ($targetUserId === null) {
            throw new ApiException(ApiErrorCode::TARGET_PLAYER_REQUIRED);
        }

        return $targetUserId;
    }

    /**
     * @return array{0:string,1:string}|null
     */
    public function resolveTwoTargetUserIds(bool $allowSelf = false): ?array
    {
        $availableTargetIds = $this->availableTargetUserIds($allowSelf);
        if (count($availableTargetIds) < 2) {
            return null;
        }

        $firstTargetUserId = $this->play->targetUserId;
        $secondTargetUserId = $this->play->secondTargetUserId;
        if ($firstTargetUserId === null || $firstTargetUserId === '' || $secondTargetUserId === null || $secondTargetUserId === '') {
            throw new ApiException(ApiErrorCode::TARGET_PLAYER_REQUIRED);
        }

        if ($firstTargetUserId === $secondTargetUserId) {
            throw new ApiException(ApiErrorCode::TARGET_PLAYER_INVALID);
        }

        if (!in_array($firstTargetUserId, $availableTargetIds, true) || !in_array($secondTargetUserId, $availableTargetIds, true)) {
            throw new ApiException(ApiErrorCode::TARGET_PLAYER_INVALID);
        }

        return [$firstTargetUserId, $secondTargetUserId];
    }

    public function resolveTargetUserId(bool $allowSelf = false): ?string
    {
        $targetUserId = $this->play->targetUserId;
        $availableTargetIds = $this->availableTargetUserIds($allowSelf);

        if ($targetUserId === null || $targetUserId === '') {
            if ($availableTargetIds === []) {
                return null;
            }

            throw new ApiException(ApiErrorCode::TARGET_PLAYER_REQUIRED);
        }

        if (!$allowSelf && $targetUserId === $this->play->actorUserId) {
            throw new ApiException(ApiErrorCode::TARGET_PLAYER_INVALID);
        }

        $targetState = $this->round->findPlayerState($targetUserId);
        if (!$targetState instanceof RoundPlayerState || !$targetState->isActive()) {
            if ($availableTargetIds === []) {
                return null;
            }

            throw new ApiException(ApiErrorCode::TARGET_PLAYER_INVALID);
        }

        if ($targetUserId !== $this->play->actorUserId && $this->targetIsProtectedFromPlayedCard($targetState)) {
            if ($availableTargetIds === []) {
                return null;
            }

            throw new ApiException(ApiErrorCode::TARGET_PLAYER_PROTECTED);
        }

        return $targetUserId;
    }

    public function hasAvailableOtherTarget(): bool
    {
        return $this->availableTargetUserIds() !== [];
    }

    /**
     * @return list<string>
     */
    private function availableTargetUserIds(bool $allowSelf = false): array
    {
        $targetIds = [];
        foreach ($this->round->players as $userId => $state) {
            if (!$state instanceof RoundPlayerState || !$state->isActive()) {
                continue;
            }

            if ($userId === $this->play->actorUserId) {
                if ($allowSelf) {
                    $targetIds[] = $userId;
                }

                continue;
            }

            if ($this->targetIsProtectedFromPlayedCard($state)) {
                continue;
            }

            $targetIds[] = $userId;
        }

        return $targetIds;
    }

    private function targetIsProtectedFromPlayedCard(RoundPlayerState $targetState): bool
    {
        if ($targetState->protectedFromEffects) {
            return true;
        }

        foreach ($this->match->unsuppressedDecrees($this->round) as $activeDecree) {
            if ($this->decrees->require($activeDecree->code)->protectsFromCardEffect($targetState, $this->playedCard->code)) {
                return true;
            }
        }

        return false;
    }

    public function requireGuessedCardCode(): string
    {
        $guessedCardCode = $this->play->guessedCardCode;
        if ($guessedCardCode === null || $guessedCardCode === '') {
            throw new ApiException(ApiErrorCode::CARD_GUESS_REQUIRED);
        }

        try {
            $this->cards->require($guessedCardCode);
        } catch (ApiException) {
            throw new ApiException(ApiErrorCode::CARD_GUESS_INVALID);
        }

        return $guessedCardCode;
    }

    public function targetState(string $userId): RoundPlayerState
    {
        return $this->round->getPlayerState($userId);
    }

    public function resolveCardName(string $cardCode): string
    {
        return $this->cards->require($cardCode)->name();
    }

    /**
     * @return list<Card>
     */
    public function eliminatePlayer(string $userId): array
    {
        return $this->eliminations->eliminate($this->round, $userId);
    }
}
