<?php

declare(strict_types=1);

namespace Stories\Application\Rooms\ReadyRoom;

use Stories\Shared\Validation\BooleanNormalizer;

final class ReadyRequest
{
    public function __construct(public readonly bool $ready)
    {
    }

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(BooleanNormalizer::fromMixed($data['ready'] ?? null, false));
    }
}
