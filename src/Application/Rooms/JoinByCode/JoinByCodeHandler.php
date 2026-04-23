<?php

declare(strict_types=1);

namespace Stories\Application\Rooms\JoinByCode;

use Stories\Application\Rooms\JoinRoom\JoinRoomHandler;
use Stories\Domain\Rooms\Repository\RoomsRepository;
use Stories\Shared\Error\ApiException;
use Stories\Shared\Error\ApiErrorCode;
use Stories\Shared\Security\AuthenticatedUser;

final class JoinByCodeHandler
{
    public function __construct(
        private readonly RoomsRepository $rooms,
        private readonly JoinRoomHandler $joinRoom,
    ) {
    }

    public function handle(string $inviteCode, AuthenticatedUser $actor, bool $spectator, ?string $password = null): \Stories\Application\Rooms\Support\RoomSnapshotResult
    {
        $roomId = $this->rooms->findRoomIdByInviteCode($inviteCode);
        if ($roomId === null) {
            throw new ApiException(ApiErrorCode::INVITE_CODE_NOT_FOUND);
        }

        return $this->joinRoom->handle($roomId, $actor, $spectator, $password);
    }
}
