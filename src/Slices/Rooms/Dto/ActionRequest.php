<?php

declare(strict_types=1);

namespace Stories\Slices\Rooms\Dto;

use InvalidArgumentException;

final class ActionRequest
{
    public function __construct(
        public readonly string $actionType,
        public readonly ?string $cardCode
    ) {
    }

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        $actionType = (string) ($data['actionType'] ?? '');
        $allowed = ['draw_character', 'play_character', 'pass_turn'];
        if (!in_array($actionType, $allowed, true)) {
            throw new InvalidArgumentException('unsupported actionType');
        }

        $cardCode = isset($data['cardCode']) ? (string) $data['cardCode'] : null;

        return new self($actionType, $cardCode);
    }
}
