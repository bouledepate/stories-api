<?php

declare(strict_types=1);

namespace Stories\Application\Matches\CreateMatch;

use Stories\Application\Matches\Support\MatchViewFormatter;
use Stories\Domain\Matches\Model\MatchPlayer;
use Stories\Domain\Matches\Model\MatchState;
use Stories\Domain\Matches\Model\MatchStatus;
use Stories\Domain\Matches\Repository\MatchesRepository;
use Stories\Domain\Matches\Repository\RoomMatchPlayersProvider;
use Stories\Domain\Rooms\Repository\RoomParticipantsRepository;
use Stories\Domain\Rooms\Repository\RoomsRepository;
use Stories\Shared\Error\ApiErrorCode;
use Stories\Shared\Error\ApiException;
use Stories\Shared\Security\AuthenticatedUser;

final class CreateMatchHandler
{
    public function __construct(
        private readonly MatchesRepository $matches,
        private readonly RoomsRepository $rooms,
        private readonly RoomParticipantsRepository $participants,
        private readonly RoomMatchPlayersProvider $playersProvider,
        private readonly MatchViewFormatter $formatter,
    ) {
    }

    /**
     * @return array<string,mixed>
     */
    public function handle(CreateMatchRequest $request, AuthenticatedUser $actor): array
    {
        $room = $this->rooms->findById($request->roomId);
        if ($room === null) {
            throw new ApiException(ApiErrorCode::ROOM_NOT_FOUND);
        }
        if ($room->ownerUserId !== $actor->id) {
            throw new ApiException(ApiErrorCode::ONLY_OWNER_CAN_MANAGE_ROOM);
        }

        $existing = $this->matches->findByRoomId($request->roomId);
        if ($existing !== null && $existing->status !== MatchStatus::FINISHED) {
            throw new ApiException(ApiErrorCode::MATCH_ALREADY_EXISTS);
        }

        $players = $this->playersProvider->fetchPlayers($request->roomId);
        if (count($players) < 2) {
            throw new ApiException(ApiErrorCode::NOT_ENOUGH_PLAYERS_TO_START_MATCH);
        }
        $snapshotParticipants = $this->participants->fetchSnapshotParticipants($request->roomId);
        $notReadyExists = array_filter(
            $snapshotParticipants,
            static fn (array $item): bool => in_array((string) ($item['role'] ?? ''), ['owner', 'player'], true)
                && ($item['ready'] ?? false) !== true
        ) !== [];
        if ($notReadyExists) {
            throw new ApiException(ApiErrorCode::PLAYERS_NOT_READY);
        }

        $match = new MatchState(
            id: $this->generateId(),
            roomId: $request->roomId,
            ownerUserId: $actor->id,
            status: MatchStatus::PENDING,
            players: array_values(array_map(
                static fn (array $player, int $seat): MatchPlayer => new MatchPlayer(
                    (string) $player['userId'],
                    (string) $player['username'],
                    0,
                    $seat,
                ),
                $players,
                array_keys($players)
            )),
            roundNumber: 0,
            winnerUserId: null,
            currentRound: null,
            lastRoundSummary: null,
            createdAt: gmdate(DATE_ATOM),
            updatedAt: gmdate(DATE_ATOM),
        );

        $this->matches->create($match);

        return $this->formatter->format($match, $actor->id);
    }

    private function generateId(): string
    {
        return 'm_' . bin2hex(random_bytes(8));
    }
}
