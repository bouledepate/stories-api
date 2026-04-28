<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Service;

use Stories\Domain\Matches\Decree\DecreeRegistry;
use Stories\Domain\Matches\Model\MatchState;
use Stories\Domain\Matches\Model\PendingDecreeChoice;
use Stories\Shared\Error\ApiErrorCode;
use Stories\Shared\Error\ApiException;

final class DecreeRotationService
{
    private const ACTIVE_LIMIT = 3;

    public function __construct(
        private readonly DecreeRegistry $decrees,
        private readonly bool $maintenanceEnabled = false,
    )
    {
    }

    public function initializeForNewMatch(MatchState $match): void
    {
        $match->decreeDeckCodes = array_map(
            static fn ($decree): string => $decree->code(),
            $this->decrees->all(),
        );
        shuffle($match->decreeDeckCodes);
        $match->activeDecrees = [];
        $match->decreeDiscardCodes = [];
        $match->pendingDecreeChoice = null;
        $match->decreeRotationRoundNumber = 0;
    }

    public function prepareChoiceForRound(MatchState $match, int $roundNumber, string $leaderUserId): ?PendingDecreeChoice
    {
        if (count($match->activeDecrees) < self::ACTIVE_LIMIT) {
            return $this->prepareDrawPhaseChoice($match, $roundNumber, $leaderUserId);
        }

        if ($this->maintenanceEnabled) {
            return $this->prepareMaintenancePhaseChoice($match, $roundNumber, $leaderUserId);
        }

        $match->decreeRotationRoundNumber = $roundNumber;

        return null;
    }

    public function applyChoice(MatchState $match, string $chosenCode, ?string $replaceCode = null): void
    {
        $choice = $match->pendingDecreeChoice;
        if (!$choice instanceof PendingDecreeChoice) {
            throw new ApiException(ApiErrorCode::MATCH_STATE_INVALID);
        }

        $chosen = null;
        foreach ($choice->candidates as $candidate) {
            if ($candidate->code === $chosenCode) {
                $chosen = $candidate;
                continue;
            }

            $match->decreeDiscardCodes[] = $candidate->code;
        }

        if ($chosen === null) {
            throw new ApiException(ApiErrorCode::MATCH_STATE_INVALID);
        }

        if ($choice->phase === 'maintenance') {
            $this->replaceActiveDecree($match, $choice, $chosen, $replaceCode);
        } else {
            $match->activeDecrees[] = $chosen;
        }

        $match->decreeRotationRoundNumber = $choice->roundNumber;
        $match->pendingDecreeChoice = null;
    }

    private function prepareDrawPhaseChoice(MatchState $match, int $roundNumber, string $leaderUserId): ?PendingDecreeChoice
    {
        $candidateCodes = $this->drawCandidates($match, discardActiveCharacterDuplicates: true);
        if ($candidateCodes === []) {
            $match->decreeRotationRoundNumber = $roundNumber;
            return null;
        }

        return new PendingDecreeChoice(
            $roundNumber,
            $leaderUserId,
            'draw',
            $this->activateCodes($candidateCodes),
        );
    }

    private function prepareMaintenancePhaseChoice(MatchState $match, int $roundNumber, string $leaderUserId): ?PendingDecreeChoice
    {
        $candidateCodes = $this->drawCandidates($match, discardActiveCharacterDuplicates: false);
        if ($candidateCodes === []) {
            $match->decreeRotationRoundNumber = $roundNumber;
            return null;
        }

        return new PendingDecreeChoice(
            $roundNumber,
            $leaderUserId,
            'maintenance',
            $this->activateCodes($candidateCodes),
            $match->activeDecrees,
        );
    }

    /**
     * @return list<string>
     */
    private function drawCandidates(MatchState $match, bool $discardActiveCharacterDuplicates): array
    {
        $candidates = [];
        while (count($candidates) < 2 && $match->decreeDeckCodes !== []) {
            $code = array_shift($match->decreeDeckCodes);
            if (!is_string($code) || $code === '') {
                continue;
            }

            if ($discardActiveCharacterDuplicates && $this->isDuplicateOfActiveCharacter($match, $code)) {
                $match->decreeDiscardCodes[] = $code;
                continue;
            }

            $candidates[] = $code;
        }

        return $candidates;
    }

    private function isDuplicateOfActiveCharacter(MatchState $match, string $decreeCode): bool
    {
        $cardCode = $this->decrees->require($decreeCode)->cardCode();
        foreach ($match->activeDecrees as $activeDecree) {
            if ($activeDecree->cardCode === $cardCode) {
                return true;
            }
        }

        return false;
    }

    /**
     * @param list<string> $codes
     * @return list<\Stories\Domain\Matches\Model\ActiveDecree>
     */
    private function activateCodes(array $codes): array
    {
        $decrees = [];
        foreach ($codes as $code) {
            $decrees[] = $this->decrees->require($code)->activate();
        }

        return $decrees;
    }

    private function replaceActiveDecree(
        MatchState $match,
        PendingDecreeChoice $choice,
        \Stories\Domain\Matches\Model\ActiveDecree $chosen,
        ?string $replaceCode,
    ): void {
        if ($replaceCode === null || $replaceCode === '') {
            throw new ApiException(ApiErrorCode::MATCH_STATE_INVALID);
        }

        foreach ($match->activeDecrees as $index => $activeDecree) {
            if ($activeDecree->code !== $replaceCode) {
                continue;
            }

            $match->decreeDiscardCodes[] = $activeDecree->code;
            $match->activeDecrees[$index] = $chosen;

            return;
        }

        throw new ApiException(ApiErrorCode::MATCH_STATE_INVALID);
    }
}
