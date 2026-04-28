<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Service;

use Stories\Domain\Matches\Decree\DecreeRegistry;
use Stories\Domain\Matches\Model\MatchState;

final class DecreeRotationService
{
    public function __construct(private readonly DecreeRegistry $decrees)
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
        $this->rotate($match);
    }

    public function rotateForRound(MatchState $match): void
    {
        if ($match->roundNumber === 0 && $match->activeDecrees !== []) {
            return;
        }

        $this->rotate($match);
    }

    private function rotate(MatchState $match): void
    {
        if ($match->decreeDeckCodes === []) {
            return;
        }

        $candidates = [];
        $drawCount = min(2, count($match->decreeDeckCodes));
        for ($index = 0; $index < $drawCount; $index++) {
            $code = array_shift($match->decreeDeckCodes);
            if (is_string($code) && $code !== '') {
                $candidates[] = $code;
            }
        }

        if ($candidates === []) {
            return;
        }

        $chosenCode = array_shift($candidates);
        foreach ($candidates as $candidateCode) {
            $match->decreeDeckCodes[] = $candidateCode;
        }

        $chosenDecree = $this->decrees->require($chosenCode)->activate();
        foreach ($match->activeDecrees as $index => $activeDecree) {
            if ($activeDecree->cardCode !== $chosenDecree->cardCode) {
                continue;
            }

            $match->decreeDeckCodes[] = $activeDecree->code;
            $match->activeDecrees[$index] = $chosenDecree;

            return;
        }

        if (count($match->activeDecrees) < 3) {
            $match->activeDecrees[] = $chosenDecree;

            return;
        }

        $replacedDecree = array_shift($match->activeDecrees);
        if ($replacedDecree !== null) {
            $match->decreeDeckCodes[] = $replacedDecree->code;
        }

        $match->activeDecrees[] = $chosenDecree;
    }
}
