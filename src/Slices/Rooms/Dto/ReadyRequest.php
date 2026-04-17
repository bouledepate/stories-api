<?php

declare(strict_types=1);

namespace Stories\Slices\Rooms\Dto;

use InvalidArgumentException;

final class ReadyRequest
{
    public function __construct(public readonly bool $ready)
    {
    }

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        if (!array_key_exists('ready', $data)) {
            throw new InvalidArgumentException('ready is required');
        }

        return new self((bool) $data['ready']);
    }
}
