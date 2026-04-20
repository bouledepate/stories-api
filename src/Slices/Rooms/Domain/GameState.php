<?php

declare(strict_types=1);

namespace Stories\Slices\Rooms\Domain;

final class GameState
{
    /** @param array<string, int> $disconnectDeadlines */
    /** @param array<string, int> $scoreboard */
    public function __construct(
        public readonly int $decreeRoundsUsed,
        private array $disconnectDeadlines,
        public readonly array $scoreboard,
        public readonly RoundState $round
    ) {
    }

    /** @param array<string, mixed> $payload */
    public static function fromPayload(array $payload): self
    {
        $disconnectDeadlines = [];
        foreach ((array) $payload['disconnectDeadlines'] as $userId => $deadline) {
            $disconnectDeadlines[(string) $userId] = (int) $deadline;
        }

        $scoreboard = [];
        foreach ((array) $payload['scoreboard'] as $userId => $score) {
            $scoreboard[(string) $userId] = (int) $score;
        }

        return new self(
            (int) $payload['decreeRoundsUsed'],
            $disconnectDeadlines,
            $scoreboard,
            RoundState::fromPayload((array) $payload['round'])
        );
    }

    /** @return array<string, mixed> */
    public function toPayload(): array
    {
        return [
            'decreeRoundsUsed' => $this->decreeRoundsUsed,
            'disconnectDeadlines' => $this->disconnectDeadlines,
            'scoreboard' => $this->scoreboard,
            'round' => $this->round->toPayload(),
        ];
    }

    public function markDisconnected(string $userId, int $deadline): void
    {
        $this->disconnectDeadlines[$userId] = $deadline;
    }

    public function resolveDisconnectTimeouts(int $now): bool
    {
        $changed = false;
        foreach ($this->disconnectDeadlines as $userId => $deadline) {
            if ($now < $deadline) {
                continue;
            }

            $this->round->removeDisconnectedPlayer($userId);
            unset($this->disconnectDeadlines[$userId]);
            $changed = true;
        }

        return $changed;
    }
}
