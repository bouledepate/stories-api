<?php

declare(strict_types=1);

namespace Stories\Shared\Security;

use RuntimeException;

final class JwtService
{
    public function __construct(
        private readonly string $secret,
        private readonly int $ttlSeconds = 3600
    ) {
    }

    public function issue(string $userId, string $username, string $role): string
    {
        $payload = [
            'sub' => $userId,
            'username' => $username,
            'role' => $role,
            'exp' => time() + $this->ttlSeconds,
        ];

        $json = (string) json_encode($payload, JSON_UNESCAPED_UNICODE);
        $encoded = rtrim(strtr(base64_encode($json), '+/', '-_'), '=');
        $signature = hash_hmac('sha256', $encoded, $this->secret);

        return $encoded . '.' . $signature;
    }

    /** @return array<string, mixed> */
    public function decode(string $token): array
    {
        $parts = explode('.', $token);
        if (count($parts) !== 2) {
            throw new RuntimeException('Invalid token format');
        }

        [$encoded, $signature] = $parts;
        $expected = hash_hmac('sha256', $encoded, $this->secret);
        if (!hash_equals($expected, $signature)) {
            throw new RuntimeException('Invalid token signature');
        }

        $payloadJson = base64_decode(strtr($encoded, '-_', '+/'), true);
        if ($payloadJson === false) {
            throw new RuntimeException('Invalid token payload');
        }

        /** @var array<string, mixed> $payload */
        $payload = (array) json_decode($payloadJson, true);
        if (!isset($payload['exp']) || (int) $payload['exp'] < time()) {
            throw new RuntimeException('Token expired');
        }

        return $payload;
    }
}
