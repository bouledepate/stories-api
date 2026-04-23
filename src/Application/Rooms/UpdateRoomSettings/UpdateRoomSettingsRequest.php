<?php

declare(strict_types=1);

namespace Stories\Application\Rooms\UpdateRoomSettings;

use Stories\Shared\Validation\BooleanNormalizer;
use Yiisoft\Validator\Rule\Length;
use Yiisoft\Validator\Rule\StringValue;

final class UpdateRoomSettingsRequest
{
    public function __construct(
        public readonly bool $isPublic = true,
        public readonly int $maxPlayers = 6,

        #[StringValue]
        #[Length(min: 0, max: 128)]
        public readonly string $password = '',
    ) {
    }

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(
            BooleanNormalizer::fromMixed($data['isPublic'] ?? null, true),
            max(2, min(6, (int) ($data['maxPlayers'] ?? 6))),
            trim((string) ($data['password'] ?? '')),
        );
    }
}
