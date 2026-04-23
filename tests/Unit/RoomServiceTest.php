<?php

declare(strict_types=1);

namespace Stories\Tests\Unit;

use PHPUnit\Framework\TestCase;
use Stories\Shared\Exception\ApiException;
use Stories\Shared\Http\ApiErrorCode;
use Stories\Shared\Security\AuthenticatedUser;
use Stories\Slices\Rooms\Dto\CreateRoomRequest;
use Stories\Slices\Rooms\Service\ParticipantRepository;
use Stories\Slices\Rooms\Service\RoomBanRepository;
use Stories\Slices\Rooms\Service\RoomRepository;
use Stories\Slices\Rooms\Service\RoomService;
use Stories\Slices\Rooms\Service\RoomSnapshotBuilder;
use Stories\Tests\Support\TestDatabase;

final class RoomServiceTest extends TestCase
{
    public function testCreateJoinReadyFlow(): void
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
            new RoomBanRepository($db),
            new RoomSnapshotBuilder(new ParticipantRepository($db))
        );

        $owner = new AuthenticatedUser('u1', 'owner', 'user');
        $second = new AuthenticatedUser('u2', 'player2', 'user');

        $created = $service->create(new CreateRoomRequest('Room 1'), $owner);
        $roomId = (string) $created['roomId'];

        $service->join($roomId, $second, false);
        $service->ready($roomId, $owner, true);
        $service->ready($roomId, $second, true);
        $snapshot = $service->state($roomId, $owner->id);
        self::assertSame($roomId, $snapshot['roomId']);
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
            new RoomBanRepository($db),
            new RoomSnapshotBuilder(new ParticipantRepository($db))
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
            new RoomBanRepository($db),
            new RoomSnapshotBuilder(new ParticipantRepository($db))
        );

        $owner = new AuthenticatedUser('u1', 'owner', 'user');
        $created = $service->create(new CreateRoomRequest('Room 1'), $owner);
        $roomId = (string) $created['roomId'];

        $service->leave($roomId, $owner);

        self::assertNull((new RoomRepository($db))->findById($roomId));
    }

    public function testJoinSameRoomReturnsSnapshotWithoutChangingOwnerRole(): void
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
            new RoomBanRepository($db),
            new RoomSnapshotBuilder(new ParticipantRepository($db))
        );

        $owner = new AuthenticatedUser('u1', 'owner', 'user');
        $created = $service->create(new CreateRoomRequest('Room 1'), $owner);
        $roomId = (string) $created['roomId'];

        $snapshot = $service->join($roomId, $owner, false);
        $participant = array_values(array_filter(
            $snapshot['participants'],
            static fn (array $item): bool => (string) $item['userId'] === 'u1'
        ))[0] ?? null;

        self::assertNotNull($participant);
        self::assertSame('owner', $participant['role']);
    }

    public function testParticipantCannotJoinAnotherRoomUntilLeavesCurrent(): void
    {
        $db = TestDatabase::create();
        foreach ([['u1', 'owner1'], ['u2', 'owner2'], ['u3', 'player']] as [$id, $username]) {
            $db->insert('users', [
                'id' => $id,
                'username' => $username,
                'password_hash' => 'x',
                'role' => 'user',
                'created_at' => gmdate(DATE_ATOM),
            ]);
        }

        $service = new RoomService(
            new RoomRepository($db),
            new ParticipantRepository($db),
            new RoomBanRepository($db),
            new RoomSnapshotBuilder(new ParticipantRepository($db))
        );

        $owner1 = new AuthenticatedUser('u1', 'owner1', 'user');
        $owner2 = new AuthenticatedUser('u2', 'owner2', 'user');
        $player = new AuthenticatedUser('u3', 'player', 'user');

        $room1 = $service->create(new CreateRoomRequest('Room 1'), $owner1);
        $room2 = $service->create(new CreateRoomRequest('Room 2'), $owner2);
        $service->join((string) $room1['roomId'], $player, false);

        try {
            $service->join((string) $room2['roomId'], $player, false);
            self::fail('Expected ApiException was not thrown');
        } catch (ApiException $exception) {
            self::assertSame(ApiErrorCode::USER_ALREADY_HAS_ACTIVE_ROOM, $exception->errorCode);
        }
    }

    public function testOwnerCanTransferOwnership(): void
    {
        $db = TestDatabase::create();
        foreach ([['u1', 'owner'], ['u2', 'player']] as [$id, $username]) {
            $db->insert('users', [
                'id' => $id,
                'username' => $username,
                'password_hash' => 'x',
                'role' => 'user',
                'created_at' => gmdate(DATE_ATOM),
            ]);
        }

        $service = new RoomService(
            new RoomRepository($db),
            new ParticipantRepository($db),
            new RoomBanRepository($db),
            new RoomSnapshotBuilder(new ParticipantRepository($db))
        );

        $owner = new AuthenticatedUser('u1', 'owner', 'user');
        $player = new AuthenticatedUser('u2', 'player', 'user');
        $created = $service->create(new CreateRoomRequest('Room 1'), $owner);
        $roomId = (string) $created['roomId'];
        $service->join($roomId, $player, false);

        $snapshot = $service->transferOwnership($roomId, $owner, 'u2');

        self::assertSame('u2', $snapshot['ownerId']);
        $roles = [];
        foreach ($snapshot['participants'] as $participant) {
            $roles[(string) $participant['userId']] = (string) $participant['role'];
        }
        self::assertSame('player', $roles['u1']);
        self::assertSame('owner', $roles['u2']);
    }

    public function testSpectatorCannotToggleReadyAndCanBeKicked(): void
    {
        $db = TestDatabase::create();
        foreach ([['u1', 'owner'], ['u2', 'spectator']] as [$id, $username]) {
            $db->insert('users', [
                'id' => $id,
                'username' => $username,
                'password_hash' => 'x',
                'role' => 'user',
                'created_at' => gmdate(DATE_ATOM),
            ]);
        }

        $service = new RoomService(
            new RoomRepository($db),
            new ParticipantRepository($db),
            new RoomBanRepository($db),
            new RoomSnapshotBuilder(new ParticipantRepository($db))
        );

        $owner = new AuthenticatedUser('u1', 'owner', 'user');
        $spectator = new AuthenticatedUser('u2', 'spectator', 'user');
        $created = $service->create(new CreateRoomRequest('Room 1'), $owner);
        $roomId = (string) $created['roomId'];
        $service->join($roomId, $spectator, true);

        try {
            $service->ready($roomId, $spectator, true);
            self::fail('Expected ApiException was not thrown');
        } catch (ApiException $exception) {
            self::assertSame(ApiErrorCode::ONLY_ACTIVE_PLAYERS_CAN_TOGGLE_READY, $exception->errorCode);
        }

        $snapshot = $service->kick($roomId, $owner, 'u2');
        $userIds = array_map(static fn (array $item): string => (string) $item['userId'], $snapshot['participants']);

        self::assertNotContains('u2', $userIds);
    }

    public function testSpectatorCannotBeBannedOrReceiveOwnership(): void
    {
        $db = TestDatabase::create();
        foreach ([['u1', 'owner'], ['u2', 'spectator']] as [$id, $username]) {
            $db->insert('users', [
                'id' => $id,
                'username' => $username,
                'password_hash' => 'x',
                'role' => 'user',
                'created_at' => gmdate(DATE_ATOM),
            ]);
        }

        $service = new RoomService(
            new RoomRepository($db),
            new ParticipantRepository($db),
            new RoomBanRepository($db),
            new RoomSnapshotBuilder(new ParticipantRepository($db))
        );

        $owner = new AuthenticatedUser('u1', 'owner', 'user');
        $spectator = new AuthenticatedUser('u2', 'spectator', 'user');
        $created = $service->create(new CreateRoomRequest('Room 1'), $owner);
        $roomId = (string) $created['roomId'];
        $service->join($roomId, $spectator, true);

        try {
            $service->ban($roomId, $owner, 'u2');
            self::fail('Expected ban ApiException was not thrown');
        } catch (ApiException $exception) {
            self::assertSame(ApiErrorCode::SPECTATORS_CAN_ONLY_BE_KICKED, $exception->errorCode);
        }

        try {
            $service->transferOwnership($roomId, $owner, 'u2');
            self::fail('Expected transfer ApiException was not thrown');
        } catch (ApiException $exception) {
            self::assertSame(ApiErrorCode::SPECTATORS_CAN_ONLY_BE_KICKED, $exception->errorCode);
        }
    }
}
