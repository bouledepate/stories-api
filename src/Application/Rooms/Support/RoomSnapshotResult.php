<?php

declare(strict_types=1);

namespace Stories\Application\Rooms\Support;

final class RoomSnapshotResult
{
    /** @param list<RoomParticipantView> $participants */
    public function __construct(
        public readonly string $roomId,
        public readonly string $name,
        public readonly string $ownerId,
        public readonly string $ownerUsername,
        public readonly string $inviteCode,
        public readonly bool $isPublic,
        public readonly int $maxPlayers,
        public readonly bool $hasPassword,
        public readonly array $participants,
    ) {
    }

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        $participants = array_map(
            static fn (array $participant): RoomParticipantView => RoomParticipantView::fromArray($participant),
            array_values(array_filter(
                $data['participants'] ?? [],
                static fn (mixed $participant): bool => is_array($participant),
            )),
        );

        return new self(
            (string) ($data['roomId'] ?? ''),
            (string) ($data['name'] ?? ''),
            (string) ($data['ownerId'] ?? ''),
            (string) ($data['ownerUsername'] ?? ''),
            (string) ($data['inviteCode'] ?? ''),
            (bool) ($data['isPublic'] ?? false),
            (int) ($data['maxPlayers'] ?? 0),
            (bool) ($data['hasPassword'] ?? false),
            $participants,
        );
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'roomId' => $this->roomId,
            'name' => $this->name,
            'ownerId' => $this->ownerId,
            'ownerUsername' => $this->ownerUsername,
            'inviteCode' => $this->inviteCode,
            'isPublic' => $this->isPublic,
            'maxPlayers' => $this->maxPlayers,
            'hasPassword' => $this->hasPassword,
            'participants' => array_map(
                static fn (RoomParticipantView $participant): array => $participant->toArray(),
                $this->participants,
            ),
        ];
    }
}
