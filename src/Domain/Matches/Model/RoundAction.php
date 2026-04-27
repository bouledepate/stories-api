<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Model;

final class RoundAction
{
    public function __construct(
        public string $type,
        public string $actorUserId,
        public string $cardCode,
        public string $cardName,
        public string $at,
        public ?string $targetUserId = null,
        public ?string $guessedCardCode = null,
        public ?string $guessedCardName = null,
        public ?string $targetCardCode = null,
        public ?string $targetCardName = null,
        public ?string $secondTargetUserId = null,
    ) {
    }

    /** @param array<string,mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(
            (string) ($data['type'] ?? 'card_played'),
            (string) ($data['actorUserId'] ?? ''),
            (string) ($data['cardCode'] ?? ''),
            (string) ($data['cardName'] ?? ''),
            (string) ($data['at'] ?? gmdate(DATE_ATOM)),
            isset($data['targetUserId']) ? (string) $data['targetUserId'] : null,
            isset($data['guessedCardCode']) ? (string) $data['guessedCardCode'] : null,
            isset($data['guessedCardName']) ? (string) $data['guessedCardName'] : null,
            isset($data['targetCardCode']) ? (string) $data['targetCardCode'] : null,
            isset($data['targetCardName']) ? (string) $data['targetCardName'] : null,
            isset($data['secondTargetUserId']) ? (string) $data['secondTargetUserId'] : null,
        );
    }

    /** @return array<string,string|null> */
    public function toArray(): array
    {
        return [
            'type' => $this->type,
            'actorUserId' => $this->actorUserId,
            'cardCode' => $this->cardCode,
            'cardName' => $this->cardName,
            'at' => $this->at,
            'targetUserId' => $this->targetUserId,
            'secondTargetUserId' => $this->secondTargetUserId,
            'guessedCardCode' => $this->guessedCardCode,
            'guessedCardName' => $this->guessedCardName,
            'targetCardCode' => $this->targetCardCode,
            'targetCardName' => $this->targetCardName,
        ];
    }
}
