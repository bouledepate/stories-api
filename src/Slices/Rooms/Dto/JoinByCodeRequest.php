<?php

declare(strict_types=1);

namespace Stories\Slices\Rooms\Dto;

use Yiisoft\Validator\Rule\Regex;
use Yiisoft\Validator\Rule\Required;
use Yiisoft\Validator\Rule\StringValue;

final class JoinByCodeRequest
{
    public function __construct(
        #[Required]
        #[StringValue]
        #[Regex('/^[A-Z0-9]{6}$/')]
        public readonly string $inviteCode,

        public readonly bool $spectator
    ) {
    }

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(
            strtoupper(trim((string) ($data['inviteCode'] ?? ''))),
            (bool) ($data['spectator'] ?? false)
        );
    }
}
