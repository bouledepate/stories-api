<?php

declare(strict_types=1);

namespace Stories\Slices\Rooms\Dto;

use InvalidArgumentException;

final class CreateRoomRequest
{
    public function __construct(public readonly string $name)
    {
    }

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        $name = trim((string) ($data['name'] ?? ''));
        if (mb_strlen($name) < 3 || mb_strlen($name) > 64) {
            throw new InvalidArgumentException('name must be 3..64 chars');
        }

        return new self($name);
    }
}
