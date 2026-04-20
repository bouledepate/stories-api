<?php

declare(strict_types=1);

namespace Stories\Shared\WebSocket;

final class ConnectionState
{
    public function __construct(
        public readonly string $clientId,
        public ?string $roomId = null,
        public bool $lobbiesSubscribed = false
    ) {
    }

    public static function create(): self
    {
        return new self(bin2hex(random_bytes(8)));
    }
}
