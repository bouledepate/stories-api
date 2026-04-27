<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Model;

final class RoundSummary
{
    /**
     * @param list<string> $winnerUserIds
     */
    public function __construct(
        public int $roundNumber,
        public RoundFinishedReason $finishedReason,
        public array $winnerUserIds,
    ) {
    }

    /** @param array<string,mixed> $data */
    public static function fromArray(array $data): ?self
    {
        if (!isset($data['roundNumber'], $data['finishedReason'])) {
            return null;
        }
        $reason = RoundFinishedReason::tryFrom((string) $data['finishedReason']);
        if ($reason === null) {
            return null;
        }

        return new self(
            (int) $data['roundNumber'],
            $reason,
            array_values(array_map(static fn (mixed $item): string => (string) $item, (array) ($data['winnerUserIds'] ?? []))),
        );
    }

    /** @return array<string,mixed> */
    public function toArray(): array
    {
        return [
            'roundNumber' => $this->roundNumber,
            'finishedReason' => $this->finishedReason->value,
            'winnerUserIds' => array_values($this->winnerUserIds),
        ];
    }
}

