<?php

declare(strict_types=1);

namespace Stories\Application\Rooms\ListLobbies;

final class LobbyView
{
    public function __construct(
        public readonly string $roomId,
        public readonly string $name,
        public readonly string $status,
        public readonly bool $isPublic,
        public readonly int $maxPlayers,
        public readonly string $ownerUserId,
        public readonly bool $hasPassword,
        public readonly int $playersCount,
        public readonly string $inviteCode,
        public readonly string $createdAt,
    ) {
    }

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(
            (string) ($data['roomId'] ?? ''),
            (string) ($data['name'] ?? ''),
            (string) ($data['status'] ?? ''),
            (bool) ($data['isPublic'] ?? false),
            (int) ($data['maxPlayers'] ?? 0),
            (string) ($data['ownerUserId'] ?? ''),
            (bool) ($data['hasPassword'] ?? false),
            (int) ($data['playersCount'] ?? 0),
            (string) ($data['inviteCode'] ?? ''),
            (string) ($data['createdAt'] ?? ''),
        );
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'roomId' => $this->roomId,
            'name' => $this->name,
            'status' => $this->status,
            'isPublic' => $this->isPublic,
            'maxPlayers' => $this->maxPlayers,
            'ownerUserId' => $this->ownerUserId,
            'hasPassword' => $this->hasPassword,
            'playersCount' => $this->playersCount,
            'inviteCode' => $this->inviteCode,
            'createdAt' => $this->createdAt,
        ];
    }
}
