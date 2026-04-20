<?php

declare(strict_types=1);

namespace Stories\Tests\Unit;

use PHPUnit\Framework\TestCase;
use Stories\Slices\Admin\Dto\PatchCardRequest;
use Stories\Slices\Admin\Service\AdminService;
use Stories\Tests\Support\TestDatabase;

final class AdminServiceTest extends TestCase
{
    public function testCardsReturnsDeckAndNormalizedCards(): void
    {
        $db = TestDatabase::create();
        $service = new AdminService($db);

        $result = $service->cards('character');

        self::assertSame('character', $result['deck']);
        self::assertNotEmpty($result['cards']);
        self::assertArrayHasKey('effectKey', $result['cards'][0]);
    }

    public function testPatchUpdatesCardVersionAndFields(): void
    {
        $db = TestDatabase::create();
        $service = new AdminService($db);

        $response = $service->patch('character', 'guard', new PatchCardRequest([
            'name' => 'New Guard',
            'enabled' => false,
        ]));

        self::assertSame('updated', $response['status']);
        self::assertSame('New Guard', $response['card']['name']);
        self::assertFalse($response['card']['enabled']);
        self::assertGreaterThan(1, $response['card']['version']);
    }
}
