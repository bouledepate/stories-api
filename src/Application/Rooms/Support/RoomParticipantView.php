<?php

declare(strict_types=1);

namespace Stories\Application\Rooms\Support;

final class RoomParticipantView
{
    public function __construct(
        public readonly string $userId,
        public readonly string $username,
        public readonly string $role,
        public readonly bool $ready,
    ) {
    }

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(
            (string) ($data['userId'] ?? ''),
            (string) ($data['username'] ?? ''),
            (string) ($data['role'] ?? ''),
            (bool) ($data['ready'] ?? false),
        );
    }

    /** @return array{userId:string,username:string,role:string,ready:bool} */
    public function toArray(): array
    {
        return [
            'userId' => $this->userId,
            'username' => $this->username,
            'role' => $this->role,
            'ready' => $this->ready,
        ];
    }
}
