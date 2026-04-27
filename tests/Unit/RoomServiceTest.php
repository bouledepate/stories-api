<?php

declare(strict_types=1);

namespace Stories\Tests\Unit;

use PHPUnit\Framework\TestCase;
use Stories\Application\Rooms\BanParticipant\BanParticipantHandler;
use Stories\Application\Rooms\CreateRoom\CreateRoomHandler;
use Stories\Application\Rooms\CreateRoom\CreateRoomRequest;
use Stories\Application\Rooms\GetCurrentRoom\GetCurrentRoomHandler;
use Stories\Application\Rooms\GetRoomState\GetRoomStateHandler;
use Stories\Application\Rooms\JoinByCode\JoinByCodeHandler;
use Stories\Application\Rooms\JoinRoom\JoinRoomHandler;
use Stories\Application\Rooms\KickParticipant\KickParticipantHandler;
use Stories\Application\Rooms\LeaveRoom\LeaveRoomHandler;
use Stories\Application\Rooms\ListLobbies\ListLobbiesHandler;
use Stories\Application\Rooms\ReadyRoom\ReadyRoomHandler;
use Stories\Application\Rooms\RegenerateInviteCode\RegenerateInviteCodeHandler;
use Stories\Application\Rooms\Support\RoomUseCaseSupport;
use Stories\Application\Rooms\TransferOwnership\TransferOwnershipHandler;
use Stories\Application\Rooms\UpdateRoomSettings\UpdateRoomSettingsHandler;
use Stories\Domain\Matches\Card\CharacterCardRegistry;
use Stories\Infrastructure\Persistence\Matches\DbalMatchesRepository;
use Stories\Infrastructure\Persistence\Rooms\DbalRoomBansRepository;
use Stories\Infrastructure\Persistence\Rooms\DbalRoomParticipantsRepository;
use Stories\Infrastructure\Persistence\Rooms\DbalRoomsRepository;
use Stories\Infrastructure\Persistence\Rooms\DbalRoomSnapshotProvider;
use Stories\Domain\Matches\Service\CharacterDeckFactory;
use Stories\Domain\Matches\Service\CardEffectResolver;
use Stories\Domain\Matches\Service\MatchEngine;
use Stories\Domain\Matches\Service\PlayerEliminationService;
use Stories\Domain\Matches\Service\RoundFinisher;
use Stories\Domain\Matches\Service\RoundSetupFactory;
use Stories\Domain\Matches\Service\TurnResolver;
use Stories\Shared\Error\ApiException;
use Stories\Shared\Error\ApiErrorCode;
use Stories\Shared\Security\AuthenticatedUser;
use Stories\Tests\Support\TestDatabase;

final class RoomServiceTest extends TestCase
{
    /** @return array<string, object> */
    private function handlers(\Doctrine\DBAL\Connection $db): array
    {
        $rooms = new DbalRoomsRepository($db);
        $participants = new DbalRoomParticipantsRepository($db);
        $bans = new DbalRoomBansRepository($db);
        $snapshots = new DbalRoomSnapshotProvider($participants);
        $support = new RoomUseCaseSupport($rooms, $participants, $bans, $snapshots);
        $matches = new DbalMatchesRepository($db);
        $cards = new CharacterCardRegistry();
        $deckFactory = new CharacterDeckFactory($cards);
        $eliminations = new PlayerEliminationService();
        $effectResolver = new CardEffectResolver($cards, $eliminations);
        $engine = new MatchEngine(
            new RoundSetupFactory($deckFactory),
            new TurnResolver($effectResolver, $eliminations),
            new RoundFinisher(),
        );

        $joinHandler = new JoinRoomHandler($rooms, $participants, $bans, $matches, $support);

        return [
            'create' => new CreateRoomHandler($rooms, $participants, $support),
            'join' => $joinHandler,
            'joinByCode' => new JoinByCodeHandler($rooms, $joinHandler),
            'listLobbies' => new ListLobbiesHandler($rooms),
            'leave' => new LeaveRoomHandler($rooms, $participants, $matches, $engine, $support),
            'ready' => new ReadyRoomHandler($participants, $support),
            'state' => new GetRoomStateHandler($support),
            'current' => new GetCurrentRoomHandler($rooms, $participants, $support),
            'updateSettings' => new UpdateRoomSettingsHandler($rooms, $support),
            'regenerateInviteCode' => new RegenerateInviteCodeHandler($rooms, $support),
            'kick' => new KickParticipantHandler($participants, $support),
            'ban' => new BanParticipantHandler($participants, $bans, $support),
            'transferOwnership' => new TransferOwnershipHandler($rooms, $participants, $support),
        ];
    }

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

        $handlers = $this->handlers($db);

        $owner = new AuthenticatedUser('u1', 'owner', 'user');
        $second = new AuthenticatedUser('u2', 'player2', 'user');

        $created = $handlers['create']->handle(new CreateRoomRequest('Room 1'), $owner)->toArray();
        $roomId = (string) $created['roomId'];

        $handlers['join']->handle($roomId, $second, false);
        $handlers['ready']->handle($roomId, $owner, true);
        $handlers['ready']->handle($roomId, $second, true);
        $snapshot = $handlers['state']->handle($roomId, $owner->id)->toArray();
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

        $handlers = $this->handlers($db);

        $owner = new AuthenticatedUser('u1', 'owner', 'user');

        $handlers['create']->handle(new CreateRoomRequest('Room 1'), $owner);

        try {
            $handlers['create']->handle(new CreateRoomRequest('Room 2'), $owner);
            self::fail('Expected ApiException was not thrown');
        } catch (ApiException $exception) {
            self::assertSame(ApiErrorCode::OWNER_ALREADY_HAS_ROOM, $exception->errorCode);
        }
    }

    public function testOwnerLeaveTransfersOwnershipWhenRoomHasParticipants(): void
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

        $handlers = $this->handlers($db);

        $owner = new AuthenticatedUser('u1', 'owner', 'user');
        $player = new AuthenticatedUser('u2', 'player', 'user');
        $created = $handlers['create']->handle(new CreateRoomRequest('Room 1'), $owner)->toArray();
        $roomId = (string) $created['roomId'];
        $handlers['join']->handle($roomId, $player, false);

        $handlers['leave']->handle($roomId, $owner);

        $room = (new DbalRoomsRepository($db))->findById($roomId);
        self::assertNotNull($room);
        self::assertSame('u2', $room->ownerUserId);
    }

    public function testListLobbiesIncludesOwnerUsername(): void
    {
        $db = TestDatabase::create();
        $db->insert('users', [
            'id' => 'u1',
            'username' => 'owner',
            'password_hash' => 'x',
            'role' => 'user',
            'created_at' => gmdate(DATE_ATOM),
        ]);

        $handlers = $this->handlers($db);
        $owner = new AuthenticatedUser('u1', 'owner', 'user');

        $handlers['create']->handle(new CreateRoomRequest('Room 1'), $owner);

        $result = $handlers['listLobbies']->handle('public', 'all', 10, 0)->toArray();

        self::assertSame('owner', $result['items'][0]['ownerUsername'] ?? null);
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

        $handlers = $this->handlers($db);

        $owner = new AuthenticatedUser('u1', 'owner', 'user');
        $created = $handlers['create']->handle(new CreateRoomRequest('Room 1'), $owner)->toArray();
        $roomId = (string) $created['roomId'];

        $snapshot = $handlers['join']->handle($roomId, $owner, false)->toArray();
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

        $handlers = $this->handlers($db);

        $owner1 = new AuthenticatedUser('u1', 'owner1', 'user');
        $owner2 = new AuthenticatedUser('u2', 'owner2', 'user');
        $player = new AuthenticatedUser('u3', 'player', 'user');

        $room1 = $handlers['create']->handle(new CreateRoomRequest('Room 1'), $owner1)->toArray();
        $room2 = $handlers['create']->handle(new CreateRoomRequest('Room 2'), $owner2)->toArray();
        $handlers['join']->handle((string) $room1['roomId'], $player, false);

        try {
            $handlers['join']->handle((string) $room2['roomId'], $player, false);
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

        $handlers = $this->handlers($db);

        $owner = new AuthenticatedUser('u1', 'owner', 'user');
        $player = new AuthenticatedUser('u2', 'player', 'user');
        $created = $handlers['create']->handle(new CreateRoomRequest('Room 1'), $owner)->toArray();
        $roomId = (string) $created['roomId'];
        $handlers['join']->handle($roomId, $player, false);

        $snapshot = $handlers['transferOwnership']->handle($roomId, $owner, 'u2')->toArray();

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

        $handlers = $this->handlers($db);

        $owner = new AuthenticatedUser('u1', 'owner', 'user');
        $spectator = new AuthenticatedUser('u2', 'spectator', 'user');
        $created = $handlers['create']->handle(new CreateRoomRequest('Room 1'), $owner)->toArray();
        $roomId = (string) $created['roomId'];
        $handlers['join']->handle($roomId, $spectator, true);

        try {
            $handlers['ready']->handle($roomId, $spectator, true);
            self::fail('Expected ApiException was not thrown');
        } catch (ApiException $exception) {
            self::assertSame(ApiErrorCode::ONLY_ACTIVE_PLAYERS_CAN_TOGGLE_READY, $exception->errorCode);
        }

        $snapshot = $handlers['kick']->handle($roomId, $owner, 'u2')->toArray();
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

        $handlers = $this->handlers($db);

        $owner = new AuthenticatedUser('u1', 'owner', 'user');
        $spectator = new AuthenticatedUser('u2', 'spectator', 'user');
        $created = $handlers['create']->handle(new CreateRoomRequest('Room 1'), $owner)->toArray();
        $roomId = (string) $created['roomId'];
        $handlers['join']->handle($roomId, $spectator, true);

        try {
            $handlers['ban']->handle($roomId, $owner, 'u2');
            self::fail('Expected ban ApiException was not thrown');
        } catch (ApiException $exception) {
            self::assertSame(ApiErrorCode::SPECTATORS_CAN_ONLY_BE_KICKED, $exception->errorCode);
        }

        try {
            $handlers['transferOwnership']->handle($roomId, $owner, 'u2');
            self::fail('Expected transfer ApiException was not thrown');
        } catch (ApiException $exception) {
            self::assertSame(ApiErrorCode::SPECTATORS_CAN_ONLY_BE_KICKED, $exception->errorCode);
        }
    }

    public function testRoomWithOnlySpectatorsIsDeletedWhenOwnerLeaves(): void
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

        $handlers = $this->handlers($db);

        $owner = new AuthenticatedUser('u1', 'owner', 'user');
        $spectator = new AuthenticatedUser('u2', 'spectator', 'user');
        $created = $handlers['create']->handle(new CreateRoomRequest('Room 1'), $owner)->toArray();
        $roomId = (string) $created['roomId'];
        $handlers['join']->handle($roomId, $spectator, true);

        $handlers['leave']->handle($roomId, $owner);

        $room = (new DbalRoomsRepository($db))->findById($roomId);
        self::assertNull($room);
    }
}
