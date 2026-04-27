<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Model;

final class PendingDecision
{
    public function __construct(
        public string $type,
        public string $actorUserId,
        public string $cardCode,
        public string $cardName,
        public string $targetUserId,
        public string $secondTargetUserId,
        public Card $targetCard,
        public Card $secondTargetCard,
    ) {
    }

    /** @param array<string,mixed> $data */
    public static function fromArray(array $data): ?self
    {
        if (
            !isset(
                $data['type'],
                $data['actorUserId'],
                $data['cardCode'],
                $data['cardName'],
                $data['targetUserId'],
                $data['secondTargetUserId'],
                $data['targetCard'],
                $data['secondTargetCard'],
            )
            || !is_array($data['targetCard'])
            || !is_array($data['secondTargetCard'])
        ) {
            return null;
        }

        return new self(
            (string) $data['type'],
            (string) $data['actorUserId'],
            (string) $data['cardCode'],
            (string) $data['cardName'],
            (string) $data['targetUserId'],
            (string) $data['secondTargetUserId'],
            Card::fromArray($data['targetCard']),
            Card::fromArray($data['secondTargetCard']),
        );
    }

    /** @return array<string,mixed> */
    public function toArray(): array
    {
        return [
            'type' => $this->type,
            'actorUserId' => $this->actorUserId,
            'cardCode' => $this->cardCode,
            'cardName' => $this->cardName,
            'targetUserId' => $this->targetUserId,
            'secondTargetUserId' => $this->secondTargetUserId,
            'targetCard' => $this->targetCard->toArray(),
            'secondTargetCard' => $this->secondTargetCard->toArray(),
        ];
    }
}
