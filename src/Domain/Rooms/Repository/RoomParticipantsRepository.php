<?php

declare(strict_types=1);

namespace Stories\Domain\Rooms\Repository;

interface RoomParticipantsRepository
{
    public function addOwner(string $roomId, string $userId): void;

    public function upsertParticipant(string $roomId, string $userId, string $role): void;

    public function remove(string $roomId, string $userId): void;

    public function setReady(string $roomId, string $userId, bool $ready): void;

    public function exists(string $roomId, string $userId): bool;

    public function roleForUser(string $roomId, string $userId): ?string;

    public function findLatestRoomIdForUser(string $userId): ?string;

    public function countPlayers(string $roomId): int;

    /** @return list<array{userId:string,username:string,role:string,ready:bool}> */
    public function fetchSnapshotParticipants(string $roomId): array;
}
