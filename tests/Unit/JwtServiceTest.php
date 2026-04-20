<?php

declare(strict_types=1);

namespace Stories\Tests\Unit;

use PHPUnit\Framework\TestCase;
use Stories\Shared\Security\JwtService;

final class JwtServiceTest extends TestCase
{
    public function testIssueAndDecodeContainExpectedClaims(): void
    {
        $service = new JwtService('test-secret-1234567890', 3600);

        $token = $service->issue('u1', 'alice', 'player');
        $claims = $service->decode($token);

        self::assertSame('u1', $claims['sub']);
        self::assertSame('alice', $claims['username']);
        self::assertSame('player', $claims['role']);
        self::assertArrayHasKey('iat', $claims);
        self::assertArrayHasKey('exp', $claims);
    }
}
