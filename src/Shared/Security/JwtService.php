<?php

declare(strict_types=1);

namespace Stories\Shared\Security;

use Stories\Shared\Error\ApiException;
use Stories\Shared\Error\ApiErrorCode;

final class JwtService
{
    public function __construct(
        private readonly string $secret,
        private readonly int $ttlSeconds = 3600
    ) {
    }

    public function issue(string $userId, string $username, string $role): string
    {
        $issuedAt = time();
        $payload = [
            'sub' => $userId,
            'username' => $username,
            'role' => $role,
            'iat' => $issuedAt,
            'exp' => $issuedAt + $this->ttlSeconds,
        ];

        $encoded = $this->base64UrlEncode((string) json_encode($payload, JSON_UNESCAPED_UNICODE));
        $signature = hash_hmac('sha256', $encoded, $this->secret);

        return $encoded . '.' . $signature;
    }

    /** @return array<string, mixed> */
    public function decode(string $token): array
    {
        $parts = explode('.', $token);
        if (count($parts) !== 2) {
            throw new ApiException(ApiErrorCode::INVALID_TOKEN_FORMAT);
        }

        [$encoded, $signature] = $parts;
        $expected = hash_hmac('sha256', $encoded, $this->secret);
        if (!hash_equals($expected, $signature)) {
            throw new ApiException(ApiErrorCode::INVALID_TOKEN_SIGNATURE);
        }

        $payloadJson = $this->base64UrlDecode($encoded);
        if ($payloadJson === false) {
            throw new ApiException(ApiErrorCode::INVALID_TOKEN_PAYLOAD);
        }

        /** @var array<string, mixed> $payload */
        $payload = (array) json_decode($payloadJson, true);
        if (!isset($payload['sub'], $payload['username'], $payload['role'], $payload['exp'])) {
            throw new ApiException(ApiErrorCode::INVALID_TOKEN_CLAIMS);
        }

        if ((int) $payload['exp'] < time()) {
            throw new ApiException(ApiErrorCode::TOKEN_EXPIRED);
        }

        return $payload;
    }

    private function base64UrlEncode(string $value): string
    {
        return rtrim(strtr(base64_encode($value), '+/', '-_'), '=');
    }

    private function base64UrlDecode(string $value): string|false
    {
        $padLength = 4 - (strlen($value) % 4);
        if ($padLength < 4) {
            $value .= str_repeat('=', $padLength);
        }

        return base64_decode(strtr($value, '-_', '+/'), true);
    }
}
