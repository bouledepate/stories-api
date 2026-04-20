<?php

declare(strict_types=1);

namespace Stories\Slices\Rooms\Service;

final class GameRecord
{
    public function __construct(
        public readonly string $id,
        public readonly string $roomId,
        public readonly string $status,
        public readonly int $decreeRoundsUsed,
        public readonly string $stateJson
    ) {
    }

    /** @param array<string, mixed> $row */
    public static function fromRow(array $row): self
    {
        return new self(
            (string) $row['id'],
            (string) $row['room_id'],
            (string) $row['status'],
            (int) $row['decree_rounds_used'],
            (string) $row['state_json']
        );
    }
}
