<?php

declare(strict_types=1);

namespace Stories\Application\Rooms\LeaveRoom;

use Stories\Application\Rooms\Support\RoomUseCaseSupport;
use Stories\Domain\Matches\Model\MatchPlayer;
use Stories\Domain\Matches\Model\RoundState;
use Stories\Domain\Matches\Repository\MatchesRepository;
use Stories\Domain\Matches\Service\MatchEngine;
use Stories\Domain\Rooms\Repository\RoomParticipantsRepository;
use Stories\Domain\Rooms\Repository\RoomsRepository;
use Stories\Shared\Security\AuthenticatedUser;

final class LeaveRoomHandler
{
    public function __construct(
        private readonly RoomsRepository $rooms,
        private readonly RoomParticipantsRepository $participants,
        private readonly MatchesRepository $matches,
        private readonly MatchEngine $engine,
        private readonly RoomUseCaseSupport $support,
    ) {
    }

    public function handle(string $roomId, AuthenticatedUser $actor): void
    {
        $room = $this->support->requireRoom($roomId);
        $this->support->ensureParticipantExists($roomId, $actor->id);
        $match = $this->matches->findByRoomId($roomId);

        $snapshotBeforeLeave = $this->participants->fetchSnapshotParticipants($roomId);
        $nextOwnerId = null;
        if ($room->ownerUserId === $actor->id) {
            $nextOwnerId = $this->selectNextOwnerId($snapshotBeforeLeave, $actor->id);
            if ($nextOwnerId !== null) {
                $this->rooms->transferOwnership($roomId, $actor->id, $nextOwnerId);
            }
        }

        $this->participants->remove($roomId, $actor->id);

        $remainingParticipants = $this->participants->fetchSnapshotParticipants($roomId);
        $remainingPlayerIds = $this->activePlayerIds($remainingParticipants);
        if ($remainingParticipants === [] || $remainingPlayerIds === []) {
            $this->rooms->delete($roomId);

            return;
        }

        if ($match !== null) {
            $updated = $this->engine->handlePlayerLeave($match, $actor->id);
            $this->removePlayerFromMatch($updated, $actor->id);
            if ($nextOwnerId !== null && $updated->ownerUserId === $actor->id) {
                $updated->ownerUserId = $nextOwnerId;
            }

            if (count($remainingPlayerIds) === 1 && $updated->hasPlayer($remainingPlayerIds[0])) {
                $this->engine->finishMatchWithWinner($updated, $remainingPlayerIds[0]);
            }

            $this->matches->save($updated);

            $this->rooms->updateStatus(
                $roomId,
                count($remainingPlayerIds) >= 2 && !$updated->isFinished() ? 'active' : 'lobby'
            );

            return;
        }

        $this->rooms->updateStatus($roomId, 'lobby');
    }

    /**
     * @param list<array{userId:string,username:string,role:string,ready:bool}> $participants
     */
    private function selectNextOwnerId(array $participants, string $leavingOwnerId): ?string
    {
        foreach ($participants as $participant) {
            if ($participant['userId'] === $leavingOwnerId) {
                continue;
            }
            if ($participant['role'] === 'owner' || $participant['role'] === 'player') {
                return $participant['userId'];
            }
        }

        return null;
    }

    /**
     * @param list<array{userId:string,username:string,role:string,ready:bool}> $participants
     * @return list<string>
     */
    private function activePlayerIds(array $participants): array
    {
        $ids = [];
        foreach ($participants as $participant) {
            if ($participant['role'] !== 'owner' && $participant['role'] !== 'player') {
                continue;
            }
            $ids[] = $participant['userId'];
        }

        return $ids;
    }

    private function removePlayerFromMatch(\Stories\Domain\Matches\Model\MatchState $match, string $userId): void
    {
        $match->players = array_values(array_filter(
            $match->players,
            static fn (MatchPlayer $player): bool => $player->userId !== $userId
        ));

        foreach ($match->players as $index => $player) {
            $player->seat = $index;
        }

        if ($match->currentRound instanceof RoundState) {
            unset($match->currentRound->players[$userId]);
        }
    }
}
