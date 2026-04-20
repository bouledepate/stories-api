<?php

declare(strict_types=1);

namespace Stories\Slices\Rooms\Dto;

use Yiisoft\Validator\Rule\BooleanValue;
use Yiisoft\Validator\Rule\Required;

final class ReadyRequest
{
    public function __construct(
        #[Required]
        #[BooleanValue]
        public readonly ?bool $ready
    ) {
    }

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(array_key_exists('ready', $data) ? (bool) $data['ready'] : null);
    }
}
