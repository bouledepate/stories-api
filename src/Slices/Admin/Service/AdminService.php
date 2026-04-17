<?php

declare(strict_types=1);

namespace Stories\Slices\Admin\Service;

use Doctrine\DBAL\Connection;
use RuntimeException;
use Stories\Slices\Admin\Dto\PatchCardRequest;

final class AdminService
{
    public function __construct(private readonly Connection $db)
    {
    }

    /** @return array<string, mixed> */
    public function cards(string $deck): array
    {
        $allowed = ['character', 'decree', 'event'];
        if (!in_array($deck, $allowed, true)) {
            throw new RuntimeException('Deck not found');
        }

        $cards = $this->db->fetchAllAssociative('SELECT deck, code, name, text, value, effect_key, enabled, version FROM cards WHERE deck = ? ORDER BY id', [$deck]);

        return ['deck' => $deck, 'cards' => array_map([$this, 'normalizeCard'], $cards)];
    }

    /** @return array<string, mixed> */
    public function patch(string $deck, string $cardCode, PatchCardRequest $request): array
    {
        $card = $this->db->fetchAssociative('SELECT id, deck, code, name, text, value, effect_key, enabled, version FROM cards WHERE deck = ? AND code = ?', [$deck, $cardCode]);
        if ($card === false) {
            throw new RuntimeException('Card not found');
        }

        $updates = [];
        if (array_key_exists('name', $request->fields)) {
            $updates['name'] = (string) $request->fields['name'];
        }
        if (array_key_exists('value', $request->fields)) {
            $updates['value'] = $request->fields['value'] === null ? null : (int) $request->fields['value'];
        }
        if (array_key_exists('text', $request->fields)) {
            $updates['text'] = (string) $request->fields['text'];
        }
        if (array_key_exists('enabled', $request->fields)) {
            $updates['enabled'] = (bool) $request->fields['enabled'] ? 1 : 0;
        }
        if (array_key_exists('effectKey', $request->fields)) {
            $updates['effect_key'] = (string) $request->fields['effectKey'];
        }

        $updates['version'] = (int) $card['version'] + 1;
        $this->db->update('cards', $updates, ['id' => $card['id']]);

        $fresh = $this->db->fetchAssociative('SELECT deck, code, name, text, value, effect_key, enabled, version FROM cards WHERE id = ?', [$card['id']]);

        return [
            'status' => 'updated',
            'card' => $this->normalizeCard($fresh ?: []),
        ];
    }

    /** @return array<string, mixed> */
    public function effects(): array
    {
        $rows = $this->db->fetchAllAssociative('SELECT deck, code, effect_key FROM cards ORDER BY deck, id');

        return [
            'effects' => array_map(
                static fn (array $row): array => [
                    'deck' => $row['deck'],
                    'code' => $row['code'],
                    'effectKey' => $row['effect_key'],
                ],
                $rows
            ),
        ];
    }

    /** @param array<string, mixed> $card */
    /** @return array<string, mixed> */
    private function normalizeCard(array $card): array
    {
        return [
            'deck' => $card['deck'] ?? null,
            'code' => $card['code'] ?? null,
            'name' => $card['name'] ?? null,
            'text' => $card['text'] ?? null,
            'value' => isset($card['value']) ? (int) $card['value'] : null,
            'effectKey' => $card['effect_key'] ?? null,
            'enabled' => isset($card['enabled']) ? ((int) $card['enabled'] === 1) : false,
            'version' => isset($card['version']) ? (int) $card['version'] : 0,
        ];
    }
}
