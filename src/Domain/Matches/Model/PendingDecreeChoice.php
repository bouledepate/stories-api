<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Model;

final class PendingDecreeChoice
{
    /**
     * @param list<ActiveDecree> $candidates
     * @param list<ActiveDecree> $replaceableDecrees
     */
    public function __construct(
        public int $roundNumber,
        public string $leaderUserId,
        public string $phase,
        public array $candidates,
        public array $replaceableDecrees = [],
    ) {
    }

    /** @param array<string,mixed> $data */
    public static function fromArray(array $data): self
    {
        $candidates = [];
        foreach ((array) ($data['candidates'] ?? []) as $candidateData) {
            if (is_array($candidateData)) {
                $candidates[] = ActiveDecree::fromArray($candidateData);
            }
        }

        $replaceableDecrees = [];
        foreach ((array) ($data['replaceableDecrees'] ?? []) as $decreeData) {
            if (is_array($decreeData)) {
                $replaceableDecrees[] = ActiveDecree::fromArray($decreeData);
            }
        }

        return new self(
            (int) ($data['roundNumber'] ?? 0),
            (string) ($data['leaderUserId'] ?? ''),
            (string) ($data['phase'] ?? 'draw'),
            $candidates,
            $replaceableDecrees,
        );
    }

    /** @return array<string,mixed> */
    public function toArray(): array
    {
        return [
            'roundNumber' => $this->roundNumber,
            'leaderUserId' => $this->leaderUserId,
            'phase' => $this->phase,
            'candidates' => array_map(static fn (ActiveDecree $decree): array => $decree->toArray(), $this->candidates),
            'replaceableDecrees' => array_map(static fn (ActiveDecree $decree): array => $decree->toArray(), $this->replaceableDecrees),
        ];
    }
}
