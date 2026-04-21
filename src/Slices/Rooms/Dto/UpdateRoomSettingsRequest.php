<?php

declare(strict_types=1);

namespace Stories\Slices\Rooms\Dto;

use Yiisoft\Validator\Rule\Length;
use Yiisoft\Validator\Rule\StringValue;
use Stories\Shared\Validation\BooleanNormalizer;

final class UpdateRoomSettingsRequest
{
    public function __construct(
        public readonly bool $isPublic,

        #[StringValue]
        #[Length(min: 0, max: 128)]
        public readonly string $password = ''
    ) {
    }

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(
            BooleanNormalizer::fromMixed($data['isPublic'] ?? null, true),
            trim((string) ($data['password'] ?? '')),
        );
    }
}
