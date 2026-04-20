<?php

declare(strict_types=1);

namespace Stories\Slices\Rooms\Domain;

final class GameCard
{
    public function __construct(
        public readonly string $code,
        public readonly string $name,
        public readonly ?int $value,
        public readonly ?string $text,
        public readonly ?string $effectKey = null
    ) {
    }

    /** @param array<string, mixed> $row */
    public static function fromDbRow(array $row): self
    {
        return new self(
            (string) $row['code'],
            (string) $row['name'],
            isset($row['value']) ? (int) $row['value'] : null,
            isset($row['text']) ? (string) $row['text'] : null,
            isset($row['effect_key']) ? (string) $row['effect_key'] : null,
        );
    }

    /** @param array<string, mixed> $payload */
    public static function fromPayload(array $payload): self
    {
        return new self(
            (string) $payload['code'],
            (string) ($payload['name'] ?? ''),
            isset($payload['value']) ? (int) $payload['value'] : null,
            isset($payload['text']) ? (string) $payload['text'] : null,
            isset($payload['effectKey']) ? (string) $payload['effectKey'] : null,
        );
    }

    /** @return array<string, mixed> */
    public function toPayload(): array
    {
        return [
            'code' => $this->code,
            'name' => $this->name,
            'value' => $this->value,
            'text' => $this->text,
            'effectKey' => $this->effectKey,
        ];
    }
}
