<?php

declare(strict_types=1);

namespace Stories\Application\Rooms\GetRoomMatch;

use Stories\Application\Matches\Support\MatchViewFormatter;
use Stories\Domain\Matches\Repository\MatchesRepository;
use Stories\Domain\Rooms\Repository\RoomParticipantsRepository;
use Stories\Domain\Rooms\Repository\RoomsRepository;
use Stories\Shared\Error\ApiErrorCode;
use Stories\Shared\Error\ApiException;
use Stories\Shared\Security\AuthenticatedUser;

final class GetRoomMatchHandler
{
    public function __construct(
        private readonly RoomsRepository $rooms,
        private readonly RoomParticipantsRepository $participants,
        private readonly MatchesRepository $matches,
        private readonly MatchViewFormatter $formatter,
    ) {
    }

    /**
     * @return array<string,mixed>
     */
    public function handle(string $roomId, AuthenticatedUser $actor): array
    {
        $room = $this->rooms->findById($roomId);
        if ($room === null) {
            throw new ApiException(ApiErrorCode::ROOM_NOT_FOUND);
        }

        if (!$this->participants->exists($roomId, $actor->id)) {
            throw new ApiException(ApiErrorCode::USER_NOT_IN_ROOM);
        }

        $match = $this->matches->findByRoomId($roomId);

        return [
            'match' => $match !== null
                ? $this->formatter->format($match, $actor->id)
                : null,
        ];
    }
}
