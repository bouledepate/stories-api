<?php

declare(strict_types=1);

namespace Stories\Application\Rooms\ListLobbies;

final class ListLobbiesResult
{
    /** @param list<LobbyView> $items */
    public function __construct(
        public readonly array $items,
        public readonly int $limit,
        public readonly int $offset,
    ) {
    }

    /** @param list<array<string, mixed>> $items */
    public static function fromRows(array $items, int $limit, int $offset): self
    {
        return new self(
            array_map(static fn (array $item): LobbyView => LobbyView::fromArray($item), $items),
            $limit,
            $offset,
        );
    }

    /** @return array{items:list<array<string,mixed>>,limit:int,offset:int} */
    public function toArray(): array
    {
        return [
            'items' => array_map(static fn (LobbyView $item): array => $item->toArray(), $this->items),
            'limit' => $this->limit,
            'offset' => $this->offset,
        ];
    }
}
