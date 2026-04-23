<?php

declare(strict_types=1);

namespace Stories\Infrastructure\WebSocket;

final class SocketMessage
{
    /** @param array<string, mixed> $payload */
    public function __construct(
        public readonly string $type,
        public readonly array $payload = []
    ) {
    }

    /** @param array<string, mixed> $decoded */
    public static function fromDecoded(array $decoded): ?self
    {
        $type = $decoded['type'] ?? null;
        if (!is_string($type) || $type === '') {
            return null;
        }

        return new self($type, $decoded);
    }

    public function roomId(?string $fallback = null): ?string
    {
        $roomId = $this->payload['roomId'] ?? $fallback;

        return is_string($roomId) && $roomId !== '' ? $roomId : null;
    }

    /** @return array<string, mixed> */
    public function eventData(): array
    {
        $value = $this->payload['data'] ?? [];

        return is_array($value) ? $value : [];
    }

    public function eventName(): ?string
    {
        $value = $this->payload['event'] ?? null;

        return is_string($value) && $value !== '' ? $value : null;
    }

    public function token(): ?string
    {
        $value = $this->payload['token'] ?? null;

        return is_string($value) && trim($value) !== '' ? trim($value) : null;
    }
}
