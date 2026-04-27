<?php

declare(strict_types=1);

namespace Stories\Application\Matches\StartRound;

use Stories\Application\Matches\Support\MatchViewFormatter;
use Stories\Domain\Matches\Model\MatchPlayer;
use Stories\Domain\Matches\Model\MatchState;
use Stories\Domain\Matches\Repository\MatchesRepository;
use Stories\Domain\Matches\Repository\RoomMatchPlayersProvider;
use Stories\Domain\Matches\Service\MatchEngine;
use Stories\Domain\Rooms\Repository\RoomsRepository;
use Stories\Shared\Error\ApiErrorCode;
use Stories\Shared\Error\ApiException;
use Stories\Shared\Security\AuthenticatedUser;

final class StartRoundHandler
{
    public function __construct(
        private readonly MatchesRepository $matches,
        private readonly RoomsRepository $rooms,
        private readonly RoomMatchPlayersProvider $playersProvider,
        private readonly MatchEngine $engine,
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
        $this->syncPlayersFromRoom($match);
        $match->assertOwner($actor->id);

        $updated = $this->engine->startRound($match);
        $this->matches->save($updated);
        $this->rooms->updateStatus($updated->roomId, 'active');

        return $this->formatter->format($updated, $actor->id);
    }

    private function syncPlayersFromRoom(MatchState $match): void
    {
        $fresh = $this->playersProvider->fetchPlayers($match->roomId);
        if (count($fresh) < 2) {
            throw new ApiException(ApiErrorCode::NOT_ENOUGH_PLAYERS_TO_START_MATCH);
        }

        $pointsByUser = [];
        foreach ($match->players as $player) {
            $pointsByUser[$player->userId] = $player->points;
        }

        $players = [];
        foreach ($fresh as $index => $item) {
            $userId = (string) ($item['userId'] ?? '');
            $players[] = new MatchPlayer(
                userId: $userId,
                username: (string) ($item['username'] ?? ''),
                points: (int) ($pointsByUser[$userId] ?? 0),
                seat: (int) $index,
            );
        }
        $match->players = $players;

        $ownerStillPlayer = false;
        foreach ($players as $player) {
            if ($player->userId === $match->ownerUserId) {
                $ownerStillPlayer = true;
                break;
            }
        }
        if (!$ownerStillPlayer) {
            $first = $players[0] ?? null;
            if ($first instanceof MatchPlayer) {
                $match->ownerUserId = $first->userId;
            }
        }
    }
}
