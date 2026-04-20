<?php

declare(strict_types=1);

namespace Stories\Slices\Auth\Dto;

use Yiisoft\Validator\Rule\FilledAtLeast;
use Yiisoft\Validator\Rule\Length;
use Yiisoft\Validator\Rule\StringValue;

#[FilledAtLeast(['username', 'password'])]
final class UpdateProfileRequest
{
    public function __construct(
        #[StringValue(skipOnEmpty: true)]
        #[Length(min: 3, max: 32, skipOnEmpty: true)]
        public readonly ?string $username,

        #[StringValue(skipOnEmpty: true)]
        #[Length(min: 6, skipOnEmpty: true)]
        public readonly ?string $password
    ) {
    }

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        $username = array_key_exists('username', $data) ? trim((string) $data['username']) : null;
        $password = array_key_exists('password', $data) ? (string) $data['password'] : null;

        return new self($username, $password);
    }
}
