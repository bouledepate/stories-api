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
        #[Length(exactly: 6)]
        public readonly string $inviteCode,

        public readonly bool $spectator = false,

        #[Length(min: 0, max: 128)]
        public readonly string $password = '',
    ) {
    }

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        $password = trim((string) ($data['password'] ?? ''));

        return new self(
            strtoupper(trim((string) ($data['inviteCode'] ?? ''))),
            BooleanNormalizer::fromMixed($data['spectator'] ?? null, false),
            $password,
        );
    }
}
