<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Model;

final class CardPlay
{
    public function __construct(
        public readonly string $actorUserId,
        public readonly string $cardCode,
        public readonly ?string $targetUserId = null,
        public readonly ?string $guessedCardCode = null,
        public readonly ?string $cardInstanceId = null,
        public readonly ?string $secondTargetUserId = null,
        public readonly ?bool $shouldSwap = null,
    ) {
    }
}
