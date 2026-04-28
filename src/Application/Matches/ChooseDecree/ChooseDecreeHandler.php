<?php

declare(strict_types=1);

namespace Stories\Application\Matches\ChooseDecree;

use Stories\Application\Matches\Support\MatchViewFormatter;
use Stories\Domain\Matches\Repository\MatchesRepository;
use Stories\Domain\Matches\Service\MatchEngine;
use Stories\Domain\Rooms\Repository\RoomsRepository;
use Stories\Shared\Error\ApiErrorCode;
use Stories\Shared\Error\ApiException;
use Stories\Shared\Security\AuthenticatedUser;

final class ChooseDecreeHandler
{
    public function __construct(
        private readonly MatchesRepository $matches,
        private readonly RoomsRepository $rooms,
        private readonly MatchEngine $engine,
        private readonly MatchViewFormatter $formatter,
    ) {
    }

    /** @return array<string,mixed> */
    public function handle(string $matchId, ChooseDecreeRequest $request, AuthenticatedUser $actor): array
    {
        $match = $this->matches->findById($matchId);
        if ($match === null) {
            throw new ApiException(ApiErrorCode::MATCH_NOT_FOUND);
        }

        $updated = $this->engine->chooseDecree($match, $actor->id, $request->decreeCode, $request->replaceDecreeCode);
        $this->matches->save($updated);
        if ($updated->hasActiveRound()) {
            $this->rooms->updateStatus($updated->roomId, 'active');
        }

        return $this->formatter->format($updated, $actor->id);
    }
}
