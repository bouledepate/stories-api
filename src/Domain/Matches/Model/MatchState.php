<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Model;

use Stories\Shared\Error\ApiErrorCode;
use Stories\Shared\Error\ApiException;

final class MatchState
{
    /**
     * @param list<MatchPlayer> $players
     */
    public function __construct(
        public string $id,
        public string $roomId,
        public string $ownerUserId,
        public MatchStatus $status,
        public array $players,
        public int $roundNumber,
        public ?string $winnerUserId,
        public ?RoundState $currentRound,
        public ?RoundSummary $lastRoundSummary,
        public string $createdAt,
        public string $updatedAt,
    ) {
    }

    /** @param array<string,mixed> $state */
    public static function fromArray(array $state): self
    {
        $players = [];
        foreach (($state['players'] ?? []) as $index => $player) {
            if (!is_array($player)) {
                continue;
            }
            $players[] = MatchPlayer::fromArray($player, (int) $index);
        }

        $currentRound = $state['currentRound'] ?? null;

        return new self(
            (string) ($state['id'] ?? ''),
            (string) ($state['roomId'] ?? ''),
            (string) ($state['ownerUserId'] ?? ''),
            MatchStatus::tryFrom((string) ($state['status'] ?? 'pending')) ?? MatchStatus::PENDING,
            $players,
            (int) ($state['roundNumber'] ?? 0),
            isset($state['winnerUserId']) ? (string) $state['winnerUserId'] : null,
            is_array($currentRound) ? RoundState::fromArray($currentRound) : null,
            isset($state['lastRoundSummary']) && is_array($state['lastRoundSummary'])
                ? RoundSummary::fromArray($state['lastRoundSummary'])
                : null,
            (string) ($state['createdAt'] ?? gmdate(DATE_ATOM)),
            (string) ($state['updatedAt'] ?? gmdate(DATE_ATOM)),
        );
    }

    public function isFinished(): bool
    {
        return $this->status === MatchStatus::FINISHED;
    }

    public function hasActiveRound(): bool
    {
        return $this->currentRound instanceof RoundState && $this->currentRound->isActive();
    }

    public function hasPlayer(string $userId): bool
    {
        foreach ($this->players as $player) {
            if ($player->userId === $userId) {
                return true;
            }
        }

        return false;
    }

    public function assertOwner(string $userId): void
    {
        if ($this->ownerUserId !== $userId) {
            throw new ApiException(ApiErrorCode::ONLY_OWNER_CAN_MANAGE_ROOM);
        }
    }

    public function assertHasPlayer(string $userId): void
    {
        if (!$this->hasPlayer($userId)) {
            throw new ApiException(ApiErrorCode::PLAYER_NOT_IN_MATCH);
        }
    }

    public function markUpdated(): void
    {
        $this->updatedAt = gmdate(DATE_ATOM);
    }

    /** @return list<string> */
    public function orderedPlayerIds(): array
    {
        return array_map(static fn (MatchPlayer $player): string => $player->userId, $this->players);
    }

    /** @return array<string,mixed> */
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'roomId' => $this->roomId,
            'ownerUserId' => $this->ownerUserId,
            'status' => $this->status->value,
            'players' => array_map(static fn (MatchPlayer $player): array => $player->toArray(), $this->players),
            'roundNumber' => $this->roundNumber,
            'winnerUserId' => $this->winnerUserId,
            'currentRound' => $this->currentRound?->toArray(),
            'lastRoundSummary' => $this->lastRoundSummary?->toArray(),
            'createdAt' => $this->createdAt,
            'updatedAt' => $this->updatedAt,
        ];
    }
}
