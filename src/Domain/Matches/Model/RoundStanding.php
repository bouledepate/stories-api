<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Model;

final class RoundStanding
{
    public function __construct(
        public string $userId,
        public int $handValue,
        public int $discardSum,
    ) {
    }
}

