<?php

declare(strict_types=1);

namespace Stories\Slices\Rooms\Service;

use Stories\Slices\Rooms\Domain\GameState;

final class RoomSnapshotBuilder
{
    public function __construct(
        private readonly ParticipantRepository $participantRepository,
        private readonly GameRepository $gameRepository
    ) {
    }

    /** @return array<string, mixed> */
    public function build(RoomRecord $room, ?string $requesterId): array
    {
        $snapshot = [
            'roomId' => $room->id,
            'name' => $room->name,
            'ownerId' => $room->ownerUserId,
            'inviteCode' => $room->inviteCode,
            'isPublic' => $room->isPublic,
            'hasPassword' => $room->passwordHash !== null,
            'participants' => $this->participantRepository->fetchSnapshotParticipants($room->id),
        ];

        $game = $this->gameRepository->findByRoomId($room->id);
        if ($game === null) {
            return $snapshot;
        }

        $state = $this->decodeState($game->stateJson);
        $round = $state->round;

        $snapshot['game'] = [
            'gameId' => $game->id,
            'status' => $game->status,
            'publicState' => [
                'activeDecree' => $round->activeDecree?->toPayload(),
                'alivePlayers' => $round->alivePlayers(),
                'discardPile' => $round->discardPilePayload(),
                'currentTurnPlayerId' => $round->currentPlayerId(),
                'deckCount' => $round->deckCount(),
            ],
            'privateState' => $requesterId !== null ? ['yourHand' => $round->handPayloadFor($requesterId)] : [],
        ];

        return $snapshot;
    }

    private function decodeState(string $json): GameState
    {
        $payload = json_decode($json, true);

        return GameState::fromPayload(is_array($payload) ? $payload : []);
    }
}
