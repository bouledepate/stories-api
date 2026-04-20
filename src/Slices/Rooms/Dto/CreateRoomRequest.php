<?php

declare(strict_types=1);

namespace Stories\Slices\Rooms\Dto;

use Yiisoft\Validator\Rule\Length;
use Yiisoft\Validator\Rule\Required;
use Yiisoft\Validator\Rule\StringValue;

final class CreateRoomRequest
{
    public function __construct(
        #[Required]
        #[StringValue]
        #[Length(min: 3, max: 64)]
        public readonly string $name
    ) {
    }

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(trim((string) ($data['name'] ?? '')));
    }
}
