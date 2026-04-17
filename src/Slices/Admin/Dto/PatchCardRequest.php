<?php

declare(strict_types=1);

namespace Stories\Slices\Admin\Dto;

final class PatchCardRequest
{
    /** @param array<string, mixed> $fields */
    public function __construct(public readonly array $fields)
    {
    }

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        $allowed = ['name', 'value', 'text', 'enabled', 'effectKey'];
        $fields = [];
        foreach ($allowed as $key) {
            if (array_key_exists($key, $data)) {
                $fields[$key] = $data[$key];
            }
        }

        return new self($fields);
    }
}
