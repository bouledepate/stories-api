<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Model;

final class ActiveDecree
{
    public function __construct(
        public string $code,
        public string $title,
        public string $cardCode,
        public string $effectText,
    ) {
    }

    /** @param array<string,mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(
            (string) ($data['code'] ?? ''),
            (string) ($data['title'] ?? ''),
            (string) ($data['cardCode'] ?? ''),
            (string) ($data['effectText'] ?? ''),
        );
    }

    /** @return array{code:string,title:string,cardCode:string,effectText:string} */
    public function toArray(): array
    {
        return [
            'code' => $this->code,
            'title' => $this->title,
            'cardCode' => $this->cardCode,
            'effectText' => $this->effectText,
        ];
    }
}
