<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Repository;

use Stories\Domain\Matches\Model\MatchState;

interface MatchesRepository
{
    public function create(MatchState $state): void;

    public function save(MatchState $state): void;

    public function findById(string $matchId): ?MatchState;

    public function findByRoomId(string $roomId): ?MatchState;
}

