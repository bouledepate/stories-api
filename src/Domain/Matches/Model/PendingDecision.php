<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Model;

final class PendingDecision
{
    public function __construct(
        public string $type,
        public string $actorUserId,
        public string $originActorUserId,
        public string $cardCode,
        public string $cardName,
        public ?string $targetUserId = null,
        public ?string $secondTargetUserId = null,
        public ?Card $targetCard = null,
        public ?Card $secondTargetCard = null,
        public ?string $guessedCardCode = null,
        public ?string $guessedCardName = null,
        public bool $canReact = false,
    ) {
    }

    /** @param array<string,mixed> $data */
    public static function fromArray(array $data): ?self
    {
        if (
            !isset(
                $data['type'],
                $data['actorUserId'],
                $data['originActorUserId'],
                $data['cardCode'],
                $data['cardName'],
            )
        ) {
            return null;
        }

        return new self(
            (string) $data['type'],
            (string) $data['actorUserId'],
            (string) $data['originActorUserId'],
            (string) $data['cardCode'],
            (string) $data['cardName'],
            isset($data['targetUserId']) ? (string) $data['targetUserId'] : null,
            isset($data['secondTargetUserId']) ? (string) $data['secondTargetUserId'] : null,
            is_array($data['targetCard'] ?? null) ? Card::fromArray($data['targetCard']) : null,
            is_array($data['secondTargetCard'] ?? null) ? Card::fromArray($data['secondTargetCard']) : null,
            isset($data['guessedCardCode']) ? (string) $data['guessedCardCode'] : null,
            isset($data['guessedCardName']) ? (string) $data['guessedCardName'] : null,
            (bool) ($data['canReact'] ?? false),
        );
    }

    /** @return array<string,mixed> */
    public function toArray(): array
    {
        return [
            'type' => $this->type,
            'actorUserId' => $this->actorUserId,
            'originActorUserId' => $this->originActorUserId,
            'cardCode' => $this->cardCode,
            'cardName' => $this->cardName,
            'targetUserId' => $this->targetUserId,
            'secondTargetUserId' => $this->secondTargetUserId,
            'targetCard' => $this->targetCard?->toArray(),
            'secondTargetCard' => $this->secondTargetCard?->toArray(),
            'guessedCardCode' => $this->guessedCardCode,
            'guessedCardName' => $this->guessedCardName,
            'canReact' => $this->canReact,
        ];
    }
}
