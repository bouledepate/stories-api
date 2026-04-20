<?php

declare(strict_types=1);

namespace Stories\Tests\Unit;

use PHPUnit\Framework\TestCase;
use Stories\Shared\Exception\ApiException;
use Stories\Shared\Http\ApiErrorCode;
use Stories\Shared\Security\AuthenticatedUser;
use Stories\Slices\Rooms\Dto\CreateRoomRequest;
use Stories\Slices\Rooms\Service\GameRepository;
use Stories\Slices\Rooms\Service\ParticipantRepository;
use Stories\Slices\Rooms\Service\RoomRepository;
use Stories\Slices\Rooms\Service\RoomService;
use Stories\Slices\Rooms\Service\RoomSnapshotBuilder;
use Stories\Slices\Rooms\Service\RoundFactory;
use Stories\Slices\Rooms\Service\RoundStateService;
use Stories\Tests\Support\TestDatabase;

final class RoomServiceTest extends TestCase
{
    public function testCreateJoinReadyStartFlow(): void
    {
        $db = TestDatabase::create();
        $db->insert('users', [
            'id' => 'u1',
            'username' => 'owner',
            'password_hash' => 'x',
            'role' => 'user',
            'created_at' => gmdate(DATE_ATOM),
        ]);
        $db->insert('users', [
            'id' => 'u2',
            'username' => 'player2',
            'password_hash' => 'x',
            'role' => 'user',
            'created_at' => gmdate(DATE_ATOM),
        ]);

        $service = new RoomService(
            new RoomRepository($db),
            new ParticipantRepository($db),
            new GameRepository($db),
            new RoomSnapshotBuilder(new ParticipantRepository($db), new GameRepository($db)),
            new RoundFactory($db),
            new RoundStateService(),
            30
        );

        $owner = new AuthenticatedUser('u1', 'owner', 'user');
        $second = new AuthenticatedUser('u2', 'player2', 'user');

        $created = $service->create(new CreateRoomRequest('Room 1'), $owner);
        $roomId = (string) $created['roomId'];

        $service->join($roomId, $second, false);
        $service->ready($roomId, $owner, true);
        $service->ready($roomId, $second, true);

        $started = $service->start($roomId, $owner);

        self::assertSame('u1', $started['ownerId']);
        self::assertArrayHasKey('game', $started);
        self::assertSame('in_progress', $started['game']['status']);
    }

    public function testOwnerCannotCreateSecondRoomWithoutClosingFirst(): void
    {
        $db = TestDatabase::create();
        $db->insert('users', [
            'id' => 'u1',
            'username' => 'owner',
            'password_hash' => 'x',
            'role' => 'user',
            'created_at' => gmdate(DATE_ATOM),
        ]);

        $service = new RoomService(
            new RoomRepository($db),
            new ParticipantRepository($db),
            new GameRepository($db),
            new RoomSnapshotBuilder(new ParticipantRepository($db), new GameRepository($db)),
            new RoundFactory($db),
            new RoundStateService(),
            30
        );

        $owner = new AuthenticatedUser('u1', 'owner', 'user');

        $service->create(new CreateRoomRequest('Room 1'), $owner);

        try {
            $service->create(new CreateRoomRequest('Room 2'), $owner);
            self::fail('Expected ApiException was not thrown');
        } catch (ApiException $exception) {
            self::assertSame(ApiErrorCode::OWNER_ALREADY_HAS_ROOM, $exception->errorCode);
        }
    }

    public function testOwnerLeaveClosesOwnedRoom(): void
    {
        $db = TestDatabase::create();
        $db->insert('users', [
            'id' => 'u1',
            'username' => 'owner',
            'password_hash' => 'x',
            'role' => 'user',
            'created_at' => gmdate(DATE_ATOM),
        ]);

        $service = new RoomService(
            new RoomRepository($db),
            new ParticipantRepository($db),
            new GameRepository($db),
            new RoomSnapshotBuilder(new ParticipantRepository($db), new GameRepository($db)),
            new RoundFactory($db),
            new RoundStateService(),
            30
        );

        $owner = new AuthenticatedUser('u1', 'owner', 'user');
        $created = $service->create(new CreateRoomRequest('Room 1'), $owner);
        $roomId = (string) $created['roomId'];

        $service->leave($roomId, $owner);

        self::assertNull((new RoomRepository($db))->findById($roomId));
    }
}
