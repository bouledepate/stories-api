<?php

declare(strict_types=1);

namespace Stories\Slices\Rooms\Dto;

use Yiisoft\Validator\Rule\Length;
use Yiisoft\Validator\Rule\Nullable;
use Yiisoft\Validator\Rule\Required;
use Yiisoft\Validator\Rule\StringValue;

final class CreateRoomRequest
{
    public function __construct(
        #[Required]
        #[StringValue]
        #[Length(min: 3, max: 64)]
        public readonly string $name,

        public readonly bool $isPublic = true,

        #[Nullable]
        #[StringValue]
        #[Length(min: 0, max: 128)]
        public readonly ?string $password = null
    ) {
    }

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        $password = trim((string) ($data['password'] ?? ''));

        return new self(
            trim((string) ($data['name'] ?? '')),
            (bool) ($data['isPublic'] ?? true),
            $password === '' ? null : $password
        );
    }
}
