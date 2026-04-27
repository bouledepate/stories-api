<?php

declare(strict_types=1);

namespace Stories\Application\Rooms\JoinRoom;

use Stories\Domain\Matches\Model\MatchStatus;
use Stories\Domain\Matches\Repository\MatchesRepository;
use Stories\Application\Rooms\Support\RoomUseCaseSupport;
use Stories\Domain\Rooms\Repository\RoomBansRepository;
use Stories\Domain\Rooms\Repository\RoomParticipantsRepository;
use Stories\Domain\Rooms\Repository\RoomsRepository;
use Stories\Shared\Error\ApiException;
use Stories\Shared\Error\ApiErrorCode;
use Stories\Shared\Security\AuthenticatedUser;

final class JoinRoomHandler
{
    public function __construct(
        private readonly RoomsRepository $rooms,
        private readonly RoomParticipantsRepository $participants,
        private readonly RoomBansRepository $bans,
        private readonly MatchesRepository $matches,
        private readonly RoomUseCaseSupport $support,
    ) {
    }

    public function handle(string $roomId, AuthenticatedUser $actor, bool $spectator, ?string $password = null): \Stories\Application\Rooms\Support\RoomSnapshotResult
    {
        $room = $this->support->requireRoom($roomId);
        $currentRoomId = $this->participants->findLatestRoomIdForUser($actor->id);
        if ($currentRoomId !== null) {
            if ($currentRoomId === $roomId) {
                return $this->support->snapshot($roomId, $actor->id);
            }

            $ownedRoomId = $this->rooms->findOwnedRoomId($actor->id);
            throw new ApiException($ownedRoomId === $currentRoomId
                ? ApiErrorCode::OWNER_ALREADY_HAS_ROOM
                : ApiErrorCode::USER_ALREADY_HAS_ACTIVE_ROOM);
        }

        if ($this->bans->isBanned($roomId, $actor->id)) {
            throw new ApiException(ApiErrorCode::USER_BLOCKED_IN_ROOM);
        }

        $this->support->guardPassword($room, $password);

        $activeMatch = $this->matches->findByRoomId($roomId);
        $forceSpectator = $activeMatch !== null && $activeMatch->status !== MatchStatus::FINISHED;
        $joinAsSpectator = $spectator || $forceSpectator;

        if (!$joinAsSpectator && $this->participants->countPlayers($roomId) >= $room->maxPlayers) {
            throw new ApiException(ApiErrorCode::ROOM_IS_FULL);
        }

        $this->participants->upsertParticipant($roomId, $actor->id, $joinAsSpectator ? 'spectator' : 'player');

        return $this->support->snapshot($roomId, $actor->id);
    }
}
