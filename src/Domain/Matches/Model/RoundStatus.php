<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Model;

enum RoundStatus: string
{
    case ACTIVE = 'active';
    case FINISHED = 'finished';
}

