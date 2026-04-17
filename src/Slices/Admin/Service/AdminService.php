<?php

declare(strict_types=1);

namespace Stories\Slices\Admin\Service;

use RuntimeException;
use Stories\Shared\Store\InMemoryStore;
use Stories\Slices\Admin\Dto\PatchCardRequest;

final class AdminService
{
    public function __construct(private readonly InMemoryStore $store)
    {
    }

    /** @return array<string, mixed> */
    public function cards(string $deck): array
    {
        if (!isset($this->store->cards[$deck])) {
            throw new RuntimeException('Deck not found');
        }

        return [
            'deck' => $deck,
            'cards' => array_values($this->store->cards[$deck]),
        ];
    }

    /** @return array<string, mixed> */
    public function patch(string $deck, string $cardCode, PatchCardRequest $request): array
    {
        if (!isset($this->store->cards[$deck][$cardCode])) {
            throw new RuntimeException('Card not found');
        }

        foreach ($request->fields as $field => $value) {
            $this->store->cards[$deck][$cardCode][$field] = $value;
        }

        $this->store->cards[$deck][$cardCode]['version'] = (int) $this->store->cards[$deck][$cardCode]['version'] + 1;

        return [
            'status' => 'updated',
            'card' => $this->store->cards[$deck][$cardCode],
        ];
    }

    /** @return array<string, mixed> */
    public function effects(): array
    {
        $effects = [];
        foreach ($this->store->cards as $deck => $cards) {
            foreach ($cards as $card) {
                $effects[] = [
                    'deck' => $deck,
                    'code' => $card['code'],
                    'effectKey' => $card['effectKey'],
                ];
            }
        }

        return ['effects' => $effects];
    }
}
