<?php

declare(strict_types=1);

namespace Stories\Application\Matches\PlayCard;

use Stories\Application\Matches\Support\MatchViewFormatter;
use Stories\Domain\Matches\Model\CardPlay;
use Stories\Domain\Matches\Repository\MatchesRepository;
use Stories\Domain\Matches\Service\MatchEngine;
use Stories\Shared\Error\ApiErrorCode;
use Stories\Shared\Error\ApiException;
use Stories\Shared\Security\AuthenticatedUser;

final class PlayCardHandler
{
    public function __construct(
        private readonly MatchesRepository $matches,
        private readonly MatchEngine $engine,
        private readonly MatchViewFormatter $formatter,
    ) {
    }

    /**
     * @return array<string,mixed>
     */
    public function handle(string $matchId, PlayCardRequest $request, AuthenticatedUser $actor): array
    {
        $match = $this->matches->findById($matchId);
        if ($match === null) {
            throw new ApiException(ApiErrorCode::MATCH_NOT_FOUND);
        }

        $match->assertHasPlayer($actor->id);

        $updated = $this->engine->playCard($match, new CardPlay(
            $actor->id,
            $request->cardCode,
            $request->targetUserId,
            $request->guessedCardCode,
            $request->cardInstanceId,
            $request->secondTargetUserId,
            $request->shouldReact,
            $request->shouldSwap,
            $request->targetDecreeCode,
        ));
        $this->matches->save($updated);

        return $this->formatter->format($updated, $actor->id);
    }
}
