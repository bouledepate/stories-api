<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Model;

final class MatchPlayer
{
    public function __construct(
        public string $userId,
        public string $username,
        public int $points,
        public int $seat,
    ) {
    }

    /** @param array<string,mixed> $data */
    public static function fromArray(array $data, int $fallbackSeat): self
    {
        return new self(
            (string) ($data['userId'] ?? ''),
            (string) ($data['username'] ?? ''),
            (int) ($data['points'] ?? 0),
            (int) ($data['seat'] ?? $fallbackSeat),
        );
    }

    /** @return array{userId:string,username:string,points:int,seat:int} */
    public function toArray(): array
    {
        return [
            'userId' => $this->userId,
            'username' => $this->username,
            'points' => $this->points,
            'seat' => $this->seat,
        ];
    }
}

