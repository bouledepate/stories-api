<?php

declare(strict_types=1);

namespace Stories\Application\Auth\Register;

use Yiisoft\Validator\Rule\Length;
use Yiisoft\Validator\Rule\Required;
use Yiisoft\Validator\Rule\StringValue;

final class RegisterRequest
{
    public function __construct(
        #[Required]
        #[StringValue]
        #[Length(min: 3, max: 32)]
        public readonly string $username,

        #[Required]
        #[StringValue]
        #[Length(min: 6)]
        public readonly string $password
    ) {
    }

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(
            trim((string) ($data['username'] ?? '')),
            (string) ($data['password'] ?? '')
        );
    }
}
