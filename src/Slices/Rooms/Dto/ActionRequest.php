<?php

declare(strict_types=1);

namespace Stories\Slices\Rooms\Dto;

use Yiisoft\Validator\Rule\In;
use Yiisoft\Validator\Rule\Required;
use Yiisoft\Validator\Rule\StringValue;

final class ActionRequest
{
    public function __construct(
        #[Required]
        #[StringValue]
        #[In(['draw_character', 'play_character', 'pass_turn'])]
        public readonly string $actionType,

        public readonly ?string $cardCode
    ) {
    }

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        $cardCode = array_key_exists('cardCode', $data) ? (string) $data['cardCode'] : null;

        return new self(
            (string) ($data['actionType'] ?? ''),
            $cardCode
        );
    }
}
