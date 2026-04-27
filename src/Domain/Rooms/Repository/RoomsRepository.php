<?php

declare(strict_types=1);

namespace Stories\Domain\Rooms\Repository;

use Stories\Domain\Rooms\Model\Room;

interface RoomsRepository
{
    public function create(string $roomId, string $inviteCode, string $name, string $ownerUserId, bool $isPublic, int $maxPlayers, ?string $passwordHash): void;

    public function ownerHasRoom(string $ownerUserId): bool;

    public function findOwnedRoomId(string $ownerUserId): ?string;

    public function delete(string $roomId): void;

    public function findById(string $roomId): ?Room;

    public function findRoomIdByInviteCode(string $inviteCode): ?string;

    public function inviteCodeExists(string $inviteCode): bool;

    public function updateSettings(string $roomId, bool $isPublic, int $maxPlayers, ?string $passwordHash): void;

    public function rotateInviteCode(string $roomId, string $inviteCode): void;

    public function transferOwnership(string $roomId, string $currentOwnerId, string $targetUserId): void;

    public function updateStatus(string $roomId, string $status): void;

    /** @return list<array<string, mixed>> */
    public function listLobbies(string $visibility, string $passwordFilter, int $limit, int $offset): array;
}
