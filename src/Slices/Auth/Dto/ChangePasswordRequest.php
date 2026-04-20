<?php

declare(strict_types=1);

namespace Stories\Slices\Auth\Dto;

use Yiisoft\Validator\Rule\Length;
use Yiisoft\Validator\Rule\Required;
use Yiisoft\Validator\Rule\StringValue;

final class ChangePasswordRequest
{
    public function __construct(
        #[Required]
        #[StringValue()]
        #[Length(min: 6)]
        public readonly string $currentPassword,

        #[Required]
        #[StringValue()]
        #[Length(min: 6)]
        public readonly string $newPassword
    ) {
    }

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(
            currentPassword: (string) ($data['currentPassword'] ?? ''),
            newPassword: (string) ($data['newPassword'] ?? '')
        );
    }
}
