<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Model;

final class Card
{
    public function __construct(
        public string $code,
        public string $name,
        public int $value,
        public ?string $instanceId = null,
    ) {
    }

    /** @param array<string,mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(
            (string) ($data['code'] ?? ''),
            (string) ($data['name'] ?? ''),
            (int) ($data['value'] ?? 0),
            isset($data['instanceId']) ? (string) $data['instanceId'] : null,
        );
    }

    /** @return array{code:string,name:string,value:int,instanceId:?string} */
    public function toArray(): array
    {
        return [
            'code' => $this->code,
            'name' => $this->name,
            'value' => $this->value,
            'instanceId' => $this->instanceId,
        ];
    }
}
