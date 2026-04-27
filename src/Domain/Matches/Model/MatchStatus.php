<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Model;

enum MatchStatus: string
{
    case PENDING = 'pending';
    case ACTIVE = 'active';
    case FINISHED = 'finished';
}

