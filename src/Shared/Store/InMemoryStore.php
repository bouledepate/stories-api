<?php

declare(strict_types=1);

namespace Stories\Shared\Store;

final class InMemoryStore
{
    /** @var array<string, array<string, mixed>> */
    public array $users = [];

    /** @var array<string, array<string, mixed>> */
    public array $rooms = [];

    /** @var array<string, array<string, mixed>> */
    public array $cards = [
        'character' => [
            'guard' => ['code' => 'guard', 'name' => 'Guard', 'value' => 1, 'text' => 'Guess and eliminate.', 'effectKey' => 'guard', 'enabled' => true, 'version' => 1],
            'priest' => ['code' => 'priest', 'name' => 'Priest', 'value' => 2, 'text' => 'Peek at a hand.', 'effectKey' => 'priest', 'enabled' => true, 'version' => 1],
            'baron' => ['code' => 'baron', 'name' => 'Baron', 'value' => 3, 'text' => 'Compare values.', 'effectKey' => 'baron', 'enabled' => true, 'version' => 1],
            'shadow' => ['code' => 'shadow', 'name' => 'Shadow', 'value' => 10, 'text' => 'Removed at setup.', 'effectKey' => 'shadow', 'enabled' => true, 'version' => 1]
        ],
        'decree' => [
            'decree_royal_mercy' => ['code' => 'decree_royal_mercy', 'name' => 'Royal Mercy', 'text' => 'First elimination gives mercy.', 'effectKey' => 'decree_royal_mercy', 'enabled' => true, 'version' => 1],
            'decree_silent_court' => ['code' => 'decree_silent_court', 'name' => 'Silent Court', 'text' => 'No hand peeking this round.', 'effectKey' => 'decree_silent_court', 'enabled' => true, 'version' => 1],
            'decree_black_rose' => ['code' => 'decree_black_rose', 'name' => 'Black Rose', 'text' => 'Baron comparisons gain a token.', 'effectKey' => 'decree_black_rose', 'enabled' => true, 'version' => 1]
        ],
        'event' => []
    ];
}
