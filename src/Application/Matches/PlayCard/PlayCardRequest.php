<?php

declare(strict_types=1);

namespace Stories\Application\Matches\PlayCard;

use Yiisoft\Validator\Rule\Length;
use Yiisoft\Validator\Rule\Required;
use Yiisoft\Validator\Rule\StringValue;

final class PlayCardRequest
{
    public function __construct(
        #[Required]
        #[StringValue]
        #[Length(min: 1, max: 64)]
        public readonly string $cardCode,
        public readonly ?string $targetUserId = null,
        public readonly ?string $secondTargetUserId = null,
        public readonly ?string $guessedCardCode = null,
        public readonly ?string $cardInstanceId = null,
        public readonly ?bool $shouldSwap = null,
    ) {
    }

    /** @param array<string,mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(
            trim((string) ($data['cardCode'] ?? '')),
            isset($data['targetUserId']) ? trim((string) $data['targetUserId']) : null,
            isset($data['secondTargetUserId']) ? trim((string) $data['secondTargetUserId']) : null,
            isset($data['guessedCardCode']) ? trim((string) $data['guessedCardCode']) : null,
            isset($data['cardInstanceId']) ? trim((string) $data['cardInstanceId']) : null,
            array_key_exists('shouldSwap', $data) ? (bool) $data['shouldSwap'] : null,
        );
    }
}
