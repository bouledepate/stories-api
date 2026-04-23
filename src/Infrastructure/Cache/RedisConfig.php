<?php

declare(strict_types=1);

namespace Stories\Infrastructure\Cache;

final class RedisConfig
{
    public function __construct(
        public readonly bool $enabled,
        public readonly string $host,
        public readonly int $port,
        public readonly int $db,
        public readonly ?string $password,
    ) {
    }

    /**
     * @param array<string, mixed> $env
     */
    public static function fromEnv(array $env): self
    {
        return new self(
            enabled: filter_var((string) ($env['REDIS_ENABLED'] ?? '0'), FILTER_VALIDATE_BOOL),
            host: (string) ($env['REDIS_HOST'] ?? '127.0.0.1'),
            port: (int) ($env['REDIS_PORT'] ?? 6379),
            db: (int) ($env['REDIS_DB'] ?? 0),
            password: ($env['REDIS_PASSWORD'] ?? null) !== null ? (string) $env['REDIS_PASSWORD'] : null,
        );
    }

    public function toDsn(): string
    {
        $auth = $this->password !== null && $this->password !== '' ? ":{$this->password}@" : '';

        return sprintf('redis://%s%s:%d/%d', $auth, $this->host, $this->port, $this->db);
    }
}
