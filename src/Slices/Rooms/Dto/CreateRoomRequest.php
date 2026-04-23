<?php

declare(strict_types=1);

namespace Stories\Slices\Rooms\Dto;

use Yiisoft\Validator\Rule\Length;
use Yiisoft\Validator\Rule\Required;
use Yiisoft\Validator\Rule\StringValue;
use Stories\Shared\Validation\BooleanNormalizer;

final class CreateRoomRequest
{
    public function __construct(
        #[Required]
        #[StringValue]
        #[Length(min: 3, max: 64)]
        public readonly string $name,

        public readonly bool $isPublic = true,

        public readonly int $maxPlayers = 6,

        #[StringValue]
        #[Length(min: 0, max: 128)]
        public readonly string $password = ''
    ) {
    }

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(
            trim((string) ($data['name'] ?? '')),
            BooleanNormalizer::fromMixed($data['isPublic'] ?? null, true),
            max(2, min(6, (int) ($data['maxPlayers'] ?? 6))),
            trim((string) ($data['password'] ?? ''))
        );
    }
}
