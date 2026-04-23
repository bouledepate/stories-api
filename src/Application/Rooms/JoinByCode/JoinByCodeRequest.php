<?php

declare(strict_types=1);

namespace Stories\Application\Rooms\JoinByCode;

use Stories\Shared\Validation\BooleanNormalizer;
use Yiisoft\Validator\Rule\Length;
use Yiisoft\Validator\Rule\Required;
use Yiisoft\Validator\Rule\StringValue;

final class JoinByCodeRequest
{
    public function __construct(
        #[Required]
        #[StringValue]
        #[Length(min: 6, max: 6)]
        public readonly string $inviteCode,

        public readonly bool $spectator = false,

        #[StringValue]
        #[Length(min: 0, max: 128)]
        public readonly ?string $password = null,
    ) {
    }

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        $password = trim((string) ($data['password'] ?? ''));

        return new self(
            strtoupper(trim((string) ($data['inviteCode'] ?? ''))),
            BooleanNormalizer::fromMixed($data['spectator'] ?? null, false),
            $password === '' ? null : $password,
        );
    }
}
