<?php

declare(strict_types=1);

namespace Stories\Application\Matches\ChooseDecree;

final class ChooseDecreeRequest
{
    public function __construct(
        public readonly string $decreeCode,
        public readonly ?string $replaceDecreeCode = null,
    ) {
    }

    /** @param array<string,mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(
            (string) ($data['decreeCode'] ?? ''),
            isset($data['replaceDecreeCode']) ? (string) $data['replaceDecreeCode'] : null,
        );
    }
}
