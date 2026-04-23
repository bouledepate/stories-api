<?php

declare(strict_types=1);

namespace Stories\Application\Rooms\CreateRoom;

use Stories\Application\Rooms\CreateRoom\CreateRoomRequest;
use Stories\Application\Rooms\Support\RoomUseCaseSupport;
use Stories\Domain\Rooms\Repository\RoomParticipantsRepository;
use Stories\Domain\Rooms\Repository\RoomsRepository;
use Stories\Shared\Error\ApiException;
use Stories\Shared\Error\ApiErrorCode;
use Stories\Shared\Security\AuthenticatedUser;

final class CreateRoomHandler
{
    public function __construct(
        private readonly RoomsRepository $rooms,
        private readonly RoomParticipantsRepository $participants,
        private readonly RoomUseCaseSupport $support,
    ) {
    }

    public function handle(CreateRoomRequest $request, AuthenticatedUser $actor): \Stories\Application\Rooms\Support\RoomSnapshotResult
    {
        if ($this->rooms->ownerHasRoom($actor->id)) {
            throw new ApiException(ApiErrorCode::OWNER_ALREADY_HAS_ROOM);
        }

        $roomId = $this->support->generateRoomId();
        $password = trim($request->password);
        $passwordHash = $password !== '' ? password_hash($password, PASSWORD_DEFAULT) : null;
        $this->rooms->create(
            $roomId,
            $this->support->generateInviteCode(),
            $request->name,
            $actor->id,
            $request->isPublic,
            $request->maxPlayers,
            $passwordHash,
        );
        $this->participants->addOwner($roomId, $actor->id);

        return $this->support->snapshot($roomId, $actor->id);
    }
}
