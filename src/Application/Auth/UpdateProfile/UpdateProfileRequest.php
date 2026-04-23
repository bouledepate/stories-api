<?php

declare(strict_types=1);

namespace Stories\Application\Auth\UpdateProfile;

use Yiisoft\Validator\Rule\Length;
use Yiisoft\Validator\Rule\StringValue;

final class UpdateProfileRequest
{
    public function __construct(
        #[StringValue]
        #[Length(min: 3, max: 32)]
        public readonly ?string $username = null,

        #[StringValue]
        #[Length(min: 6)]
        public readonly ?string $password = null,
    ) {
    }

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        $username = array_key_exists('username', $data) ? trim((string) $data['username']) : null;
        $password = array_key_exists('password', $data) ? (string) $data['password'] : null;

        return new self(
            $username === '' ? null : $username,
            $password === '' ? null : $password,
        );
    }
}
