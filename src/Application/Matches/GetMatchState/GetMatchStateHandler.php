<?php

declare(strict_types=1);

namespace Stories\Application\Matches\GetMatchState;

use Stories\Application\Matches\Support\MatchViewFormatter;
use Stories\Domain\Matches\Repository\MatchesRepository;
use Stories\Shared\Error\ApiErrorCode;
use Stories\Shared\Error\ApiException;
use Stories\Shared\Security\AuthenticatedUser;

final class GetMatchStateHandler
{
    public function __construct(
        private readonly MatchesRepository $matches,
        private readonly MatchViewFormatter $formatter,
    ) {
    }

    /**
     * @return array<string,mixed>
     */
    public function handle(string $matchId, AuthenticatedUser $actor): array
    {
        $match = $this->matches->findById($matchId);
        if ($match === null) {
            throw new ApiException(ApiErrorCode::MATCH_NOT_FOUND);
        }

        $match->assertHasPlayer($actor->id);

        return $this->formatter->format($match, $actor->id);
    }
}
