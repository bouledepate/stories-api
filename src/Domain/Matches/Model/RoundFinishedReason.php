<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Model;

enum RoundFinishedReason: string
{
    case SINGLE_WINNER = 'single_winner';
    case TIE = 'tie';
}

