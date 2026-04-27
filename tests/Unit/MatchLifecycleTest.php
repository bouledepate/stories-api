<?php

declare(strict_types=1);

namespace Stories\Tests\Unit;

use PHPUnit\Framework\TestCase;
use Stories\Application\Matches\CreateMatch\CreateMatchHandler;
use Stories\Application\Matches\CreateMatch\CreateMatchRequest;
use Stories\Application\Matches\GetMatchState\GetMatchStateHandler;
use Stories\Application\Matches\PlayCard\PlayCardHandler;
use Stories\Application\Matches\PlayCard\PlayCardRequest;
use Stories\Application\Matches\StartRound\StartRoundHandler;
use Stories\Application\Matches\Support\MatchViewFormatter;
use Stories\Application\Rooms\GetRoomMatch\GetRoomMatchHandler;
use Stories\Application\Rooms\LeaveRoom\LeaveRoomHandler;
use Stories\Application\Rooms\Support\RoomUseCaseSupport;
use Stories\Domain\Matches\Card\CharacterCardRegistry;
use Stories\Domain\Matches\Model\Card;
use Stories\Domain\Matches\Model\CardPlay;
use Stories\Domain\Matches\Model\MatchPlayer;
use Stories\Domain\Matches\Model\MatchState;
use Stories\Domain\Matches\Model\MatchStatus;
use Stories\Domain\Matches\Model\RoundAction;
use Stories\Domain\Matches\Model\RoundFinishedReason;
use Stories\Domain\Matches\Model\RoundPlayerState;
use Stories\Domain\Matches\Model\RoundState;
use Stories\Domain\Matches\Model\RoundStatus;
use Stories\Domain\Matches\Model\RoundSummary;
use Stories\Domain\Matches\Service\CardEffectResolver;
use Stories\Domain\Matches\Service\CharacterDeckFactory;
use Stories\Domain\Matches\Service\MatchEngine;
use Stories\Domain\Matches\Service\PlayerEliminationService;
use Stories\Domain\Matches\Service\RoundFinisher;
use Stories\Domain\Matches\Service\RoundSetupFactory;
use Stories\Domain\Matches\Service\TurnResolver;
use Stories\Infrastructure\Persistence\Matches\DbalMatchesRepository;
use Stories\Infrastructure\Persistence\Matches\DbalRoomMatchPlayersProvider;
use Stories\Infrastructure\Persistence\Rooms\DbalRoomBansRepository;
use Stories\Infrastructure\Persistence\Rooms\DbalRoomParticipantsRepository;
use Stories\Infrastructure\Persistence\Rooms\DbalRoomsRepository;
use Stories\Infrastructure\Persistence\Rooms\DbalRoomSnapshotProvider;
use Stories\Shared\Error\ApiErrorCode;
use Stories\Shared\Error\ApiException;
use Stories\Shared\Security\AuthenticatedUser;
use Stories\Tests\Support\TestDatabase;

final class MatchLifecycleTest extends TestCase
{
    public function testCreateStartAndPlayFlow(): void
    {
        $db = TestDatabase::create();
        $this->seedRoomWithTwoPlayers($db);

        $rooms = new DbalRoomsRepository($db);
        $matches = new DbalMatchesRepository($db);
        $playersProvider = new DbalRoomMatchPlayersProvider($db);
        $formatter = new MatchViewFormatter();
        $engine = $this->createEngine();

        $create = new CreateMatchHandler($matches, $rooms, new DbalRoomParticipantsRepository($db), $playersProvider, $formatter);
        $start = new StartRoundHandler($matches, $rooms, $playersProvider, $engine, $formatter);
        $play = new PlayCardHandler($matches, $engine, $formatter);
        $state = new GetMatchStateHandler($matches, $formatter);

        $owner = new AuthenticatedUser('u1', 'owner', 'player');
        $second = new AuthenticatedUser('u2', 'player2', 'player');

        $created = $create->handle(new CreateMatchRequest('room-1'), $owner);
        $matchId = (string) $created['matchId'];
        self::assertSame('pending', $created['status']);

        $started = $start->handle($matchId, $owner);
        self::assertSame('active', $started['status']);
        self::assertSame(1, $started['roundNumber']);
        self::assertIsArray($started['currentRound']);

        $round = (array) $started['currentRound'];
        self::assertCount(3, (array) ($round['revealedCards'] ?? []));
        self::assertTrue((bool) ($round['hasSetAsideCard'] ?? false));
        self::assertArrayNotHasKey('setAsideCard', $round);
        $activePlayerId = (string) ($round['activePlayerId'] ?? '');
        self::assertContains($activePlayerId, ['u1', 'u2']);
        $actor = $activePlayerId === 'u1' ? $owner : $second;
        $viewer = $activePlayerId === 'u1' ? $second : $owner;
        $snapshotForActor = $state->handle($matchId, $actor);
        $actorRound = (array) $snapshotForActor['currentRound'];
        $activeRow = $this->findPlayerRow((array) $actorRound['players'], $activePlayerId);
        $hand = (array) ($activeRow['hand'] ?? []);
        $firstCardCode = (string) (($hand[0] ?? [])['code'] ?? '');
        self::assertNotSame('', $firstCardCode);
        $playRequest = match ($firstCardCode) {
            'guard' => new PlayCardRequest($firstCardCode, $viewer->id, 'king'),
            'scout', 'executioner' => new PlayCardRequest($firstCardCode, $viewer->id),
            'rebel' => new PlayCardRequest($firstCardCode, $viewer->id),
            'feudal_lord' => new PlayCardRequest($firstCardCode, $actor->id, null, null, $viewer->id, false),
            default => new PlayCardRequest($firstCardCode),
        };

        $afterPlay = $play->handle($matchId, $playRequest, $actor);
        $afterRound = (array) $afterPlay['currentRound'];
        self::assertNotNull($afterRound['lastAction']);

        $snapshotForViewer = $state->handle($matchId, $viewer);
        $viewerRound = (array) $snapshotForViewer['currentRound'];
        $actorFromViewer = $this->findPlayerRow((array) $viewerRound['players'], $activePlayerId);
        if (($viewerRound['status'] ?? '') === 'finished') {
            self::assertNotSame([], $actorFromViewer['hand']);
        } else {
            self::assertSame([], $actorFromViewer['hand']);
        }
    }

    public function testCannotPlayOutOfTurn(): void
    {
        $db = TestDatabase::create();
        $this->seedRoomWithTwoPlayers($db);

        $rooms = new DbalRoomsRepository($db);
        $matches = new DbalMatchesRepository($db);
        $playersProvider = new DbalRoomMatchPlayersProvider($db);
        $formatter = new MatchViewFormatter();
        $engine = $this->createEngine();

        $create = new CreateMatchHandler($matches, $rooms, new DbalRoomParticipantsRepository($db), $playersProvider, $formatter);
        $start = new StartRoundHandler($matches, $rooms, $playersProvider, $engine, $formatter);
        $play = new PlayCardHandler($matches, $engine, $formatter);

        $owner = new AuthenticatedUser('u1', 'owner', 'player');
        $second = new AuthenticatedUser('u2', 'player2', 'player');

        $created = $create->handle(new CreateMatchRequest('room-1'), $owner);
        $matchId = (string) $created['matchId'];
        $started = $start->handle($matchId, $owner);
        $round = (array) $started['currentRound'];
        $activePlayerId = (string) ($round['activePlayerId'] ?? '');
        $nonActiveUser = $activePlayerId === 'u1' ? $second : $owner;
        $nonActiveRow = $this->findPlayerRow((array) $round['players'], $nonActiveUser->id);
        $cardCode = (string) (((array) ($nonActiveRow['hand'] ?? []))[0]['code'] ?? 'peasant');

        try {
            $play->handle($matchId, new PlayCardRequest($cardCode), $nonActiveUser);
            self::fail('Expected ApiException was not thrown');
        } catch (ApiException $exception) {
            self::assertSame(ApiErrorCode::NOT_PLAYER_TURN, $exception->errorCode);
        }
    }

    public function testLeavingCurrentTurnPlayerAutoPlaysAndRemainingPlayerWinsMatch(): void
    {
        $db = TestDatabase::create();
        $this->seedRoomWithTwoPlayers($db);

        $rooms = new DbalRoomsRepository($db);
        $participants = new DbalRoomParticipantsRepository($db);
        $bans = new DbalRoomBansRepository($db);
        $support = new RoomUseCaseSupport($rooms, $participants, $bans, new DbalRoomSnapshotProvider($participants));
        $matches = new DbalMatchesRepository($db);
        $playersProvider = new DbalRoomMatchPlayersProvider($db);
        $formatter = new MatchViewFormatter();
        $engine = $this->createEngine();

        $create = new CreateMatchHandler($matches, $rooms, $participants, $playersProvider, $formatter);
        $start = new StartRoundHandler($matches, $rooms, $playersProvider, $engine, $formatter);
        $leave = new LeaveRoomHandler($rooms, $participants, $matches, $engine, $support);

        $owner = new AuthenticatedUser('u1', 'owner', 'player');
        $second = new AuthenticatedUser('u2', 'player2', 'player');

        $created = $create->handle(new CreateMatchRequest('room-1'), $owner);
        $matchId = (string) $created['matchId'];
        // Force owner to be the first player this round to avoid randomness in tests.
        $match = $matches->findById($matchId);
        self::assertNotNull($match);
        $match->lastRoundSummary = new RoundSummary(0, RoundFinishedReason::SINGLE_WINNER, ['u1']);
        $matches->save($match);
        $start->handle($matchId, $owner);

        $leave->handle('room-1', $owner);

        $room = $rooms->findById('room-1');
        self::assertNotNull($room);
        self::assertSame('u2', $room->ownerUserId);

        $updated = $matches->findById($matchId);
        self::assertNotNull($updated);
        self::assertSame('u2', $updated->ownerUserId);
        self::assertSame('finished', $updated->status->value);
        self::assertSame('u2', $updated->winnerUserId);
        self::assertFalse($updated->hasPlayer('u1'));
        self::assertCount(1, $updated->players);
        self::assertNotNull($updated->currentRound);
        self::assertSame('auto_played_on_leave', $updated->currentRound?->lastAction?->type);
    }

    public function testFinishedRoomMatchIsReturnedForResultsView(): void
    {
        $db = TestDatabase::create();
        $this->seedRoomWithTwoPlayers($db);

        $rooms = new DbalRoomsRepository($db);
        $participants = new DbalRoomParticipantsRepository($db);
        $bans = new DbalRoomBansRepository($db);
        $support = new RoomUseCaseSupport($rooms, $participants, $bans, new DbalRoomSnapshotProvider($participants));
        $matches = new DbalMatchesRepository($db);
        $playersProvider = new DbalRoomMatchPlayersProvider($db);
        $formatter = new MatchViewFormatter();
        $engine = $this->createEngine();

        $create = new CreateMatchHandler($matches, $rooms, $participants, $playersProvider, $formatter);
        $start = new StartRoundHandler($matches, $rooms, $playersProvider, $engine, $formatter);
        $leave = new LeaveRoomHandler($rooms, $participants, $matches, $engine, $support);
        $getRoomMatch = new GetRoomMatchHandler($rooms, $participants, $matches, $formatter);

        $owner = new AuthenticatedUser('u1', 'owner', 'player');
        $second = new AuthenticatedUser('u2', 'player2', 'player');

        $created = $create->handle(new CreateMatchRequest('room-1'), $owner);
        $matchId = (string) $created['matchId'];
        $start->handle($matchId, $owner);
        $leave->handle('room-1', $owner);

        $roomMatch = $getRoomMatch->handle('room-1', $second);

        self::assertNotNull($roomMatch['match'] ?? null);
        self::assertSame('finished', $roomMatch['match']['status'] ?? null);
    }

    public function testShowdownCardsAreVisibleToAllPlayersAfterRoundEnds(): void
    {
        $formatter = new MatchViewFormatter();
        $now = gmdate(DATE_ATOM);

        $match = new MatchState(
            id: 'match-showdown',
            roomId: 'room-1',
            ownerUserId: 'u1',
            status: MatchStatus::PENDING,
            players: [
                new MatchPlayer('u1', 'owner', 1, 0),
                new MatchPlayer('u2', 'player2', 0, 1),
            ],
            roundNumber: 3,
            winnerUserId: null,
            currentRound: new RoundState(
                status: RoundStatus::FINISHED,
                activePlayerId: null,
                setAsideCard: new Card('set_aside', 'Отложенная', 0),
                deck: [],
                revealedCards: [],
                players: [
                    'u1' => new RoundPlayerState(false, [new Card('queen', 'Королева', 8)], [new Card('guard', 'Стражник', 1)]),
                    'u2' => new RoundPlayerState(false, [new Card('king', 'Король', 9)], [new Card('scout', 'Разведчик', 2)]),
                ],
                lastAction: new RoundAction('card_played', 'u2', 'scout', 'Разведчик', $now),
                finishedReason: RoundFinishedReason::SINGLE_WINNER,
                roundWinners: ['u2'],
            ),
            lastRoundSummary: new RoundSummary(3, RoundFinishedReason::SINGLE_WINNER, ['u2']),
            createdAt: $now,
            updatedAt: $now,
        );

        $view = $formatter->format($match, 'u1');
        $roundPlayers = (array) (($view['currentRound'] ?? [])['players'] ?? []);
        $opponent = $this->findPlayerRow($roundPlayers, 'u2');

        self::assertCount(1, (array) ($opponent['hand'] ?? []));
        self::assertSame('king', $opponent['hand'][0]['code'] ?? null);
    }

    public function testLastPlayerFinishesTurnAfterDeckRunsOut(): void
    {
        $engine = $this->createEngine();
        $now = gmdate(DATE_ATOM);

        $match = new MatchState(
            id: 'match-1',
            roomId: 'room-1',
            ownerUserId: 'u1',
            status: MatchStatus::ACTIVE,
            players: [
                new MatchPlayer('u1', 'owner', 0, 0),
                new MatchPlayer('u2', 'player2', 0, 1),
            ],
            roundNumber: 1,
            winnerUserId: null,
            currentRound: new RoundState(
                status: RoundStatus::ACTIVE,
                activePlayerId: 'u2',
                setAsideCard: new Card('set_aside', 'Отложенная', 0),
                deck: [],
                revealedCards: [],
                players: [
                    'u1' => new RoundPlayerState(false, [new Card('guard', 'Стражник', 1)], []),
                    'u2' => new RoundPlayerState(false, [
                        new Card('queen', 'Королева', 8),
                        new Card('king', 'Король', 9),
                    ], []),
                ],
                lastAction: new RoundAction('card_played', 'u1', 'guard', 'Стражник', $now),
                finishedReason: null,
                roundWinners: [],
            ),
            lastRoundSummary: null,
            createdAt: $now,
            updatedAt: $now,
        );

        $updated = $engine->playCard($match, new CardPlay('u2', 'queen'));

        self::assertSame('pending', $updated->status->value);
        self::assertNotNull($updated->currentRound);
        self::assertSame('finished', $updated->currentRound->status->value);
        self::assertSame(['u2'], $updated->currentRound->roundWinners);
    }

    public function testGuardGuessEliminatesTargetOnHit(): void
    {
        $engine = $this->createEngine();
        $now = gmdate(DATE_ATOM);

        $match = new MatchState(
            id: 'match-guard-hit',
            roomId: 'room-1',
            ownerUserId: 'u1',
            status: MatchStatus::ACTIVE,
            players: [
                new MatchPlayer('u1', 'owner', 0, 0),
                new MatchPlayer('u2', 'player2', 0, 1),
            ],
            roundNumber: 1,
            winnerUserId: null,
            currentRound: new RoundState(
                status: RoundStatus::ACTIVE,
                activePlayerId: 'u1',
                setAsideCard: new Card('set_aside', 'Отложенная', 0),
                deck: [new Card('queen', 'Королева', 8)],
                revealedCards: [],
                players: [
                    'u1' => new RoundPlayerState(false, [
                        new Card('guard', 'Стражник', 1),
                        new Card('scout', 'Разведчик', 2),
                    ], []),
                    'u2' => new RoundPlayerState(false, [new Card('king', 'Король', 9)], []),
                ],
                lastAction: new RoundAction('card_played', 'u2', 'guard', 'Стражник', $now),
                finishedReason: null,
                roundWinners: [],
            ),
            lastRoundSummary: null,
            createdAt: $now,
            updatedAt: $now,
        );

        $updated = $engine->playCard($match, new CardPlay('u1', 'guard', 'u2', 'king'));

        self::assertSame('pending', $updated->status->value);
        self::assertSame('finished', $updated->currentRound?->status->value);
        self::assertSame(['u1'], $updated->currentRound?->roundWinners);
        self::assertSame('guard_guess_hit', $updated->currentRound?->lastAction?->type);
        self::assertSame('u2', $updated->currentRound?->lastAction?->targetUserId);
        self::assertSame('king', $updated->currentRound?->lastAction?->guessedCardCode);
        self::assertTrue($updated->currentRound?->getPlayerState('u2')->eliminated);
        self::assertCount(1, $updated->currentRound?->getPlayerState('u2')->discard ?? []);
    }

    public function testGuardGuessMissWithoutPeasantUsesHiddenResolutionThenPassesTurn(): void
    {
        $engine = $this->createEngine();
        $now = gmdate(DATE_ATOM);

        $match = new MatchState(
            id: 'match-guard-miss',
            roomId: 'room-1',
            ownerUserId: 'u1',
            status: MatchStatus::ACTIVE,
            players: [
                new MatchPlayer('u1', 'owner', 0, 0),
                new MatchPlayer('u2', 'player2', 0, 1),
            ],
            roundNumber: 1,
            winnerUserId: null,
            currentRound: new RoundState(
                status: RoundStatus::ACTIVE,
                activePlayerId: 'u1',
                setAsideCard: new Card('set_aside', 'Отложенная', 0),
                deck: [new Card('queen', 'Королева', 8)],
                revealedCards: [],
                players: [
                    'u1' => new RoundPlayerState(false, [
                        new Card('guard', 'Стражник', 1),
                        new Card('scout', 'Разведчик', 2),
                    ], []),
                    'u2' => new RoundPlayerState(false, [new Card('king', 'Король', 9)], []),
                ],
                lastAction: new RoundAction('card_played', 'u2', 'guard', 'Стражник', $now),
                finishedReason: null,
                roundWinners: [],
            ),
            lastRoundSummary: null,
            createdAt: $now,
            updatedAt: $now,
        );

        $updated = $engine->playCard($match, new CardPlay('u1', 'guard', 'u2', 'queen'));

        self::assertSame('active', $updated->status->value);
        self::assertSame('active', $updated->currentRound?->status->value);
        self::assertSame('guard_guess_miss', $updated->currentRound?->lastAction?->type);
        self::assertSame('u1', $updated->currentRound?->activePlayerId);
        self::assertNotNull($updated->currentRound?->pendingDecision);
        self::assertSame('guard_miss_peasant_reaction', $updated->currentRound?->pendingDecision?->type);
        self::assertFalse($updated->currentRound?->pendingDecision?->canReact ?? true);
        self::assertSame('u2', $updated->currentRound?->pendingDecision?->actorUserId);
        self::assertFalse($updated->currentRound?->getPlayerState('u2')->eliminated);

        $resolved = $engine->playCard($updated, new CardPlay('u2', 'peasant', shouldReact: false));

        self::assertSame('active', $resolved->currentRound?->status->value);
        self::assertSame('guard_miss_resolved', $resolved->currentRound?->lastAction?->type);
        self::assertNull($resolved->currentRound?->pendingDecision);
        self::assertSame('u2', $resolved->currentRound?->activePlayerId);
        self::assertFalse($resolved->currentRound?->getPlayerState('u2')->eliminated);
        self::assertCount(2, $resolved->currentRound?->getPlayerState('u2')->hand ?? []);
    }

    public function testGuardCannotGuessGuard(): void
    {
        $engine = $this->createEngine();
        $now = gmdate(DATE_ATOM);

        $match = new MatchState(
            id: 'match-guard-forbidden',
            roomId: 'room-1',
            ownerUserId: 'u1',
            status: MatchStatus::ACTIVE,
            players: [
                new MatchPlayer('u1', 'owner', 0, 0),
                new MatchPlayer('u2', 'player2', 0, 1),
            ],
            roundNumber: 1,
            winnerUserId: null,
            currentRound: new RoundState(
                status: RoundStatus::ACTIVE,
                activePlayerId: 'u1',
                setAsideCard: new Card('set_aside', 'Отложенная', 0),
                deck: [new Card('queen', 'Королева', 8)],
                revealedCards: [],
                players: [
                    'u1' => new RoundPlayerState(false, [
                        new Card('guard', 'Стражник', 1, 'guard-u1'),
                        new Card('scout', 'Разведчик', 2, 'scout-u1'),
                    ], []),
                    'u2' => new RoundPlayerState(false, [new Card('king', 'Король', 9, 'king-u2')], []),
                ],
                lastAction: new RoundAction('card_played', 'u2', 'guard', 'Стражник', $now),
                finishedReason: null,
                roundWinners: [],
            ),
            lastRoundSummary: null,
            createdAt: $now,
            updatedAt: $now,
        );

        try {
            $engine->playCard($match, new CardPlay('u1', 'guard', 'u2', 'guard', 'guard-u1'));
            self::fail('Expected ApiException was not thrown');
        } catch (ApiException $exception) {
            self::assertSame(ApiErrorCode::GUARD_CANNOT_GUESS_GUARD, $exception->errorCode);
        }
    }

    public function testGuardGuessMissWithPeasantCanReactAndSurvive(): void
    {
        $engine = $this->createEngine();
        $now = gmdate(DATE_ATOM);

        $match = new MatchState(
            id: 'match-guard-peasant-safe',
            roomId: 'room-1',
            ownerUserId: 'u1',
            status: MatchStatus::ACTIVE,
            players: [
                new MatchPlayer('u1', 'owner', 0, 0),
                new MatchPlayer('u2', 'player2', 0, 1),
            ],
            roundNumber: 1,
            winnerUserId: null,
            currentRound: new RoundState(
                status: RoundStatus::ACTIVE,
                activePlayerId: 'u1',
                setAsideCard: new Card('set_aside', 'Отложенная', 0),
                deck: [new Card('queen', 'Королева', 8, 'queen-deck')],
                revealedCards: [],
                players: [
                    'u1' => new RoundPlayerState(false, [
                        new Card('guard', 'Стражник', 1, 'guard-u1'),
                        new Card('scout', 'Разведчик', 2, 'scout-u1'),
                    ], []),
                    'u2' => new RoundPlayerState(false, [new Card('peasant', 'Крестьянин', 0, 'peasant-u2')], []),
                ],
                lastAction: new RoundAction('card_played', 'u2', 'scout', 'Разведчик', $now),
                finishedReason: null,
                roundWinners: [],
            ),
            lastRoundSummary: null,
            createdAt: $now,
            updatedAt: $now,
        );

        $pending = $engine->playCard($match, new CardPlay('u1', 'guard', 'u2', 'king', 'guard-u1'));

        self::assertSame('guard_guess_miss', $pending->currentRound?->lastAction?->type);
        self::assertTrue($pending->currentRound?->pendingDecision?->canReact ?? false);

        $resolved = $engine->playCard($pending, new CardPlay('u2', 'peasant', cardInstanceId: 'peasant-u2', shouldReact: true));

        self::assertSame('peasant_reaction_safe', $resolved->currentRound?->lastAction?->type);
        self::assertNull($resolved->currentRound?->pendingDecision);
        self::assertSame('u2', $resolved->currentRound?->activePlayerId);
        self::assertFalse($resolved->currentRound?->getPlayerState('u2')->eliminated);
        self::assertCount(1, $resolved->currentRound?->getPlayerState('u2')->discard ?? []);
        self::assertSame('peasant', $resolved->currentRound?->getPlayerState('u2')->discard[0]->code ?? null);
        self::assertSame('queen', $resolved->currentRound?->getPlayerState('u2')->peekFirstCardInHand()?->code);
    }

    public function testGuardGuessMissWithPeasantSkipDoesNotRevealPeasant(): void
    {
        $engine = $this->createEngine();
        $now = gmdate(DATE_ATOM);

        $match = new MatchState(
            id: 'match-guard-peasant-skip',
            roomId: 'room-1',
            ownerUserId: 'u1',
            status: MatchStatus::ACTIVE,
            players: [
                new MatchPlayer('u1', 'owner', 0, 0),
                new MatchPlayer('u2', 'player2', 0, 1),
            ],
            roundNumber: 1,
            winnerUserId: null,
            currentRound: new RoundState(
                status: RoundStatus::ACTIVE,
                activePlayerId: 'u1',
                setAsideCard: new Card('set_aside', 'Отложенная', 0),
                deck: [new Card('queen', 'Королева', 8, 'queen-deck')],
                revealedCards: [],
                players: [
                    'u1' => new RoundPlayerState(false, [
                        new Card('guard', 'Стражник', 1, 'guard-u1'),
                        new Card('scout', 'Разведчик', 2, 'scout-u1'),
                    ], []),
                    'u2' => new RoundPlayerState(false, [new Card('peasant', 'Крестьянин', 0, 'peasant-u2')], []),
                ],
                lastAction: new RoundAction('card_played', 'u2', 'scout', 'Разведчик', $now),
                finishedReason: null,
                roundWinners: [],
            ),
            lastRoundSummary: null,
            createdAt: $now,
            updatedAt: $now,
        );

        $pending = $engine->playCard($match, new CardPlay('u1', 'guard', 'u2', 'king', 'guard-u1'));
        $resolved = $engine->playCard($pending, new CardPlay('u2', 'peasant', shouldReact: false));

        self::assertSame('guard_miss_resolved', $resolved->currentRound?->lastAction?->type);
        self::assertNull($resolved->currentRound?->pendingDecision);
        self::assertSame('u2', $resolved->currentRound?->activePlayerId);
        self::assertFalse($resolved->currentRound?->getPlayerState('u2')->eliminated);
        self::assertCount(2, $resolved->currentRound?->getPlayerState('u2')->hand ?? []);
        self::assertSame('peasant', $resolved->currentRound?->getPlayerState('u2')->hand[0]->code ?? null);
        self::assertSame('queen', $resolved->currentRound?->getPlayerState('u2')->hand[1]->code ?? null);
        self::assertCount(0, $resolved->currentRound?->getPlayerState('u2')->discard ?? []);
    }

    public function testGuardGuessMissWithPeasantCanReactAndBeEliminated(): void
    {
        $engine = $this->createEngine();
        $now = gmdate(DATE_ATOM);

        $match = new MatchState(
            id: 'match-guard-peasant-death',
            roomId: 'room-1',
            ownerUserId: 'u1',
            status: MatchStatus::ACTIVE,
            players: [
                new MatchPlayer('u1', 'owner', 0, 0),
                new MatchPlayer('u2', 'player2', 0, 1),
            ],
            roundNumber: 1,
            winnerUserId: null,
            currentRound: new RoundState(
                status: RoundStatus::ACTIVE,
                activePlayerId: 'u1',
                setAsideCard: new Card('set_aside', 'Отложенная', 0),
                deck: [new Card('queen', 'Королева', 8, 'queen-deck')],
                revealedCards: [],
                players: [
                    'u1' => new RoundPlayerState(false, [
                        new Card('guard', 'Стражник', 1, 'guard-u1'),
                        new Card('scout', 'Разведчик', 2, 'scout-u1'),
                    ], []),
                    'u2' => new RoundPlayerState(false, [new Card('peasant', 'Крестьянин', 0, 'peasant-u2')], []),
                ],
                lastAction: new RoundAction('card_played', 'u2', 'scout', 'Разведчик', $now),
                finishedReason: null,
                roundWinners: [],
            ),
            lastRoundSummary: null,
            createdAt: $now,
            updatedAt: $now,
        );

        $pending = $engine->playCard($match, new CardPlay('u1', 'guard', 'u2', 'queen', 'guard-u1'));
        $resolved = $engine->playCard($pending, new CardPlay('u2', 'peasant', cardInstanceId: 'peasant-u2', shouldReact: true));

        self::assertSame('peasant_reaction_eliminated', $resolved->currentRound?->lastAction?->type);
        self::assertTrue($resolved->currentRound?->getPlayerState('u2')->eliminated ?? false);
        self::assertSame(RoundStatus::FINISHED, $resolved->currentRound?->status);
        self::assertSame(['u1'], $resolved->currentRound?->roundWinners);
        self::assertCount(2, $resolved->currentRound?->getPlayerState('u2')->discard ?? []);
        self::assertSame('peasant', $resolved->currentRound?->getPlayerState('u2')->discard[0]->code ?? null);
        self::assertSame('queen', $resolved->currentRound?->getPlayerState('u2')->discard[1]->code ?? null);
    }

    public function testPeasantCanBePlayedOnOwnTurnWithoutEffect(): void
    {
        $engine = $this->createEngine();
        $now = gmdate(DATE_ATOM);

        $match = new MatchState(
            id: 'match-peasant-regular-play',
            roomId: 'room-1',
            ownerUserId: 'u1',
            status: MatchStatus::ACTIVE,
            players: [
                new MatchPlayer('u1', 'owner', 0, 0),
                new MatchPlayer('u2', 'player2', 0, 1),
            ],
            roundNumber: 1,
            winnerUserId: null,
            currentRound: new RoundState(
                status: RoundStatus::ACTIVE,
                activePlayerId: 'u1',
                setAsideCard: new Card('set_aside', 'Отложенная', 0),
                deck: [new Card('bishop', 'Епископ', 7, 'bishop-deck')],
                revealedCards: [],
                players: [
                    'u1' => new RoundPlayerState(false, [
                        new Card('peasant', 'Крестьянин', 0, 'peasant-u1'),
                        new Card('queen', 'Королева', 8, 'queen-u1'),
                    ], []),
                    'u2' => new RoundPlayerState(false, [new Card('guard', 'Стражник', 1, 'guard-u2')], []),
                ],
                lastAction: new RoundAction('card_played', 'u2', 'guard', 'Стражник', $now),
                finishedReason: null,
                roundWinners: [],
            ),
            lastRoundSummary: null,
            createdAt: $now,
            updatedAt: $now,
        );

        $updated = $engine->playCard($match, new CardPlay('u1', 'peasant', cardInstanceId: 'peasant-u1'));

        self::assertSame('card_played', $updated->currentRound?->lastAction?->type);
        self::assertSame('u2', $updated->currentRound?->activePlayerId);
        self::assertCount(1, $updated->currentRound?->getPlayerState('u1')->discard ?? []);
        self::assertSame('peasant', $updated->currentRound?->getPlayerState('u1')->discard[0]->code ?? null);
        self::assertSame('queen', $updated->currentRound?->getPlayerState('u1')->peekFirstCardInHand()?->code);
    }

    public function testScoutBlocksCurrentCardUntilTargetsNextTurn(): void
    {
        $engine = $this->createEngine();
        $now = gmdate(DATE_ATOM);

        $match = new MatchState(
            id: 'match-scout-lock',
            roomId: 'room-1',
            ownerUserId: 'u1',
            status: MatchStatus::ACTIVE,
            players: [
                new MatchPlayer('u1', 'owner', 0, 0),
                new MatchPlayer('u2', 'player2', 0, 1),
            ],
            roundNumber: 1,
            winnerUserId: null,
            currentRound: new RoundState(
                status: RoundStatus::ACTIVE,
                activePlayerId: 'u1',
                setAsideCard: new Card('set_aside', 'Отложенная', 0),
                deck: [new Card('queen', 'Королева', 8, 'queen-deck')],
                revealedCards: [],
                players: [
                    'u1' => new RoundPlayerState(false, [
                        new Card('scout', 'Разведчик', 2, 'scout-u1'),
                        new Card('lady', 'Дворянка', 4, 'lady-u1'),
                    ], []),
                    'u2' => new RoundPlayerState(false, [new Card('king', 'Король', 9, 'king-u2')], []),
                ],
                lastAction: new RoundAction('card_played', 'u2', 'lady', 'Дворянка', $now),
                finishedReason: null,
                roundWinners: [],
            ),
            lastRoundSummary: null,
            createdAt: $now,
            updatedAt: $now,
        );

        $afterScout = $engine->playCard($match, new CardPlay('u1', 'scout', 'u2', null, 'scout-u1'));

        self::assertSame('active', $afterScout->status->value);
        self::assertSame('scout_lock_applied', $afterScout->currentRound?->lastAction?->type);
        self::assertSame('u2', $afterScout->currentRound?->activePlayerId);
        self::assertSame('king-u2', $afterScout->currentRound?->getPlayerState('u2')->lockedCardInstanceId);
        self::assertCount(2, $afterScout->currentRound?->getPlayerState('u2')->hand ?? []);

        try {
            $engine->playCard($afterScout, new CardPlay('u2', 'king', null, null, 'king-u2'));
            self::fail('Expected ApiException was not thrown');
        } catch (ApiException $exception) {
            self::assertSame(ApiErrorCode::CARD_PLAY_BLOCKED, $exception->errorCode);
        }

        $afterAllowedPlay = $engine->playCard($afterScout, new CardPlay('u2', 'queen', null, null, 'queen-deck'));
        self::assertNull($afterAllowedPlay->currentRound?->getPlayerState('u2')->lockedCardInstanceId);
        self::assertSame('finished', $afterAllowedPlay->currentRound?->status->value);
        self::assertSame(['u2'], $afterAllowedPlay->currentRound?->roundWinners);
    }

    public function testExecutionerEliminatesTargetWithCardValueUpToFour(): void
    {
        $engine = $this->createEngine();
        $now = gmdate(DATE_ATOM);

        $match = new MatchState(
            id: 'match-executioner-hit',
            roomId: 'room-1',
            ownerUserId: 'u1',
            status: MatchStatus::ACTIVE,
            players: [
                new MatchPlayer('u1', 'owner', 0, 0),
                new MatchPlayer('u2', 'player2', 0, 1),
            ],
            roundNumber: 1,
            winnerUserId: null,
            currentRound: new RoundState(
                status: RoundStatus::ACTIVE,
                activePlayerId: 'u1',
                setAsideCard: new Card('set_aside', 'Отложенная', 0),
                deck: [new Card('queen', 'Королева', 8, 'queen-deck')],
                revealedCards: [],
                players: [
                    'u1' => new RoundPlayerState(false, [
                        new Card('executioner', 'Палач', 3, 'executioner-u1'),
                        new Card('lady', 'Дворянка', 4, 'lady-u1'),
                    ], []),
                    'u2' => new RoundPlayerState(false, [new Card('lady', 'Дворянка', 4, 'lady-u2')], []),
                ],
                lastAction: new RoundAction('card_played', 'u2', 'guard', 'Стражник', $now),
                finishedReason: null,
                roundWinners: [],
            ),
            lastRoundSummary: null,
            createdAt: $now,
            updatedAt: $now,
        );

        $updated = $engine->playCard($match, new CardPlay('u1', 'executioner', 'u2', null, 'executioner-u1'));

        self::assertSame('pending', $updated->status->value);
        self::assertSame('executioner_eliminate', $updated->currentRound?->lastAction?->type);
        self::assertSame(['u1'], $updated->currentRound?->roundWinners);
        self::assertTrue($updated->currentRound?->getPlayerState('u2')->eliminated);
    }

    public function testExecutionerDoesNotEliminateTargetAboveFour(): void
    {
        $engine = $this->createEngine();
        $now = gmdate(DATE_ATOM);

        $match = new MatchState(
            id: 'match-executioner-miss',
            roomId: 'room-1',
            ownerUserId: 'u1',
            status: MatchStatus::ACTIVE,
            players: [
                new MatchPlayer('u1', 'owner', 0, 0),
                new MatchPlayer('u2', 'player2', 0, 1),
            ],
            roundNumber: 1,
            winnerUserId: null,
            currentRound: new RoundState(
                status: RoundStatus::ACTIVE,
                activePlayerId: 'u1',
                setAsideCard: new Card('set_aside', 'Отложенная', 0),
                deck: [new Card('queen', 'Королева', 8, 'queen-deck')],
                revealedCards: [],
                players: [
                    'u1' => new RoundPlayerState(false, [
                        new Card('executioner', 'Палач', 3, 'executioner-u1'),
                        new Card('lady', 'Дворянка', 4, 'lady-u1'),
                    ], []),
                    'u2' => new RoundPlayerState(false, [new Card('rebel', 'Мятежник', 5, 'rebel-u2')], []),
                ],
                lastAction: new RoundAction('card_played', 'u2', 'guard', 'Стражник', $now),
                finishedReason: null,
                roundWinners: [],
            ),
            lastRoundSummary: null,
            createdAt: $now,
            updatedAt: $now,
        );

        $updated = $engine->playCard($match, new CardPlay('u1', 'executioner', 'u2', null, 'executioner-u1'));

        self::assertSame('active', $updated->status->value);
        self::assertSame('executioner_survive', $updated->currentRound?->lastAction?->type);
        self::assertSame('u2', $updated->currentRound?->activePlayerId);
        self::assertFalse($updated->currentRound?->getPlayerState('u2')->eliminated);
    }

    public function testLadyProtectsUntilOwnersNextTurn(): void
    {
        $engine = $this->createEngine();
        $now = gmdate(DATE_ATOM);

        $match = new MatchState(
            id: 'match-lady-protection',
            roomId: 'room-1',
            ownerUserId: 'u1',
            status: MatchStatus::ACTIVE,
            players: [
                new MatchPlayer('u1', 'owner', 0, 0),
                new MatchPlayer('u2', 'player2', 0, 1),
            ],
            roundNumber: 1,
            winnerUserId: null,
            currentRound: new RoundState(
                status: RoundStatus::ACTIVE,
                activePlayerId: 'u1',
                setAsideCard: new Card('set_aside', 'Отложенная', 0),
                deck: [
                    new Card('queen', 'Королева', 8, 'queen-deck'),
                    new Card('king', 'Король', 9, 'king-deck'),
                ],
                revealedCards: [],
                players: [
                    'u1' => new RoundPlayerState(false, [
                        new Card('lady', 'Дворянка', 4, 'lady-u1'),
                        new Card('rebel', 'Мятежник', 5, 'rebel-u1'),
                    ], []),
                    'u2' => new RoundPlayerState(false, [new Card('guard', 'Стражник', 1, 'guard-u2')], []),
                ],
                lastAction: new RoundAction('card_played', 'u2', 'guard', 'Стражник', $now),
                finishedReason: null,
                roundWinners: [],
            ),
            lastRoundSummary: null,
            createdAt: $now,
            updatedAt: $now,
        );

        $afterLady = $engine->playCard($match, new CardPlay('u1', 'lady', null, null, 'lady-u1'));

        self::assertTrue($afterLady->currentRound?->getPlayerState('u1')->protectedFromEffects);
        self::assertSame('u2', $afterLady->currentRound?->activePlayerId);
        self::assertSame('lady_protection_applied', $afterLady->currentRound?->lastAction?->type);

        $afterBlockedTargetPlay = $engine->playCard($afterLady, new CardPlay('u2', 'guard', 'u1', 'king', 'guard-u2'));
        self::assertSame('guard_no_target', $afterBlockedTargetPlay->currentRound?->lastAction?->type);
        self::assertSame('u1', $afterBlockedTargetPlay->currentRound?->activePlayerId);
        self::assertFalse($afterBlockedTargetPlay->currentRound?->getPlayerState('u1')->protectedFromEffects);
    }

    public function testRebelCanTargetSelfToDiscardAndDraw(): void
    {
        $engine = $this->createEngine();
        $now = gmdate(DATE_ATOM);

        $match = new MatchState(
            id: 'match-rebel-self',
            roomId: 'room-1',
            ownerUserId: 'u1',
            status: MatchStatus::ACTIVE,
            players: [
                new MatchPlayer('u1', 'owner', 0, 0),
                new MatchPlayer('u2', 'player2', 0, 1),
            ],
            roundNumber: 1,
            winnerUserId: null,
            currentRound: new RoundState(
                status: RoundStatus::ACTIVE,
                activePlayerId: 'u1',
                setAsideCard: new Card('set_aside', 'Отложенная', 0),
                deck: [new Card('queen', 'Королева', 8, 'queen-deck')],
                revealedCards: [],
                players: [
                    'u1' => new RoundPlayerState(false, [
                        new Card('rebel', 'Мятежник', 5, 'rebel-u1'),
                        new Card('guard', 'Стражник', 1, 'guard-u1'),
                    ], []),
                    'u2' => new RoundPlayerState(false, [new Card('king', 'Король', 9, 'king-u2')], []),
                ],
                lastAction: new RoundAction('card_played', 'u2', 'guard', 'Стражник', $now),
                finishedReason: null,
                roundWinners: [],
            ),
            lastRoundSummary: null,
            createdAt: $now,
            updatedAt: $now,
        );

        $updated = $engine->playCard($match, new CardPlay('u1', 'rebel', 'u1', null, 'rebel-u1'));
        $playerState = $updated->currentRound?->getPlayerState('u1');

        self::assertSame('rebel_redraw', $updated->currentRound?->lastAction?->type);
        self::assertSame('u1', $updated->currentRound?->lastAction?->targetUserId);
        self::assertSame('guard', $updated->currentRound?->lastAction?->targetCardCode);
        self::assertCount(1, $playerState?->hand ?? []);
        self::assertSame('queen', $playerState?->hand[0]->code ?? null);
        self::assertCount(2, $playerState?->discard ?? []);
    }

    public function testRebelCannotTargetProtectedOpponentButCanStillTargetSelf(): void
    {
        $engine = $this->createEngine();
        $now = gmdate(DATE_ATOM);

        $match = new MatchState(
            id: 'match-rebel-protection',
            roomId: 'room-1',
            ownerUserId: 'u1',
            status: MatchStatus::ACTIVE,
            players: [
                new MatchPlayer('u1', 'owner', 0, 0),
                new MatchPlayer('u2', 'player2', 0, 1),
            ],
            roundNumber: 1,
            winnerUserId: null,
            currentRound: new RoundState(
                status: RoundStatus::ACTIVE,
                activePlayerId: 'u1',
                setAsideCard: new Card('set_aside', 'Отложенная', 0),
                deck: [new Card('queen', 'Королева', 8, 'queen-deck')],
                revealedCards: [],
                players: [
                    'u1' => new RoundPlayerState(false, [
                        new Card('rebel', 'Мятежник', 5, 'rebel-u1'),
                        new Card('guard', 'Стражник', 1, 'guard-u1'),
                    ], []),
                    'u2' => new RoundPlayerState(false, [new Card('king', 'Король', 9, 'king-u2')], [], false, null, null, true),
                ],
                lastAction: new RoundAction('card_played', 'u2', 'lady', 'Дворянка', $now),
                finishedReason: null,
                roundWinners: [],
            ),
            lastRoundSummary: null,
            createdAt: $now,
            updatedAt: $now,
        );

        try {
            $engine->playCard($match, new CardPlay('u1', 'rebel', 'u2', null, 'rebel-u1'));
            self::fail('Expected ApiException was not thrown');
        } catch (ApiException $exception) {
            self::assertSame(ApiErrorCode::TARGET_PLAYER_PROTECTED, $exception->errorCode);
        }
    }

    public function testGuardCanBeDiscardedWithoutEffectWhenNoAvailableTargetExists(): void
    {
        $engine = $this->createEngine();
        $now = gmdate(DATE_ATOM);

        $match = new MatchState(
            id: 'match-guard-no-target',
            roomId: 'room-1',
            ownerUserId: 'u1',
            status: MatchStatus::ACTIVE,
            players: [
                new MatchPlayer('u1', 'owner', 0, 0),
                new MatchPlayer('u2', 'player2', 0, 1),
            ],
            roundNumber: 1,
            winnerUserId: null,
            currentRound: new RoundState(
                status: RoundStatus::ACTIVE,
                activePlayerId: 'u1',
                setAsideCard: new Card('set_aside', 'Отложенная', 0),
                deck: [new Card('queen', 'Королева', 8, 'queen-deck')],
                revealedCards: [],
                players: [
                    'u1' => new RoundPlayerState(false, [
                        new Card('guard', 'Стражник', 1, 'guard-u1'),
                        new Card('lady', 'Дворянка', 4, 'lady-u1'),
                    ], []),
                    'u2' => new RoundPlayerState(false, [new Card('king', 'Король', 9, 'king-u2')], [], false, null, null, true),
                ],
                lastAction: new RoundAction('card_played', 'u2', 'lady', 'Дворянка', $now),
                finishedReason: null,
                roundWinners: [],
            ),
            lastRoundSummary: null,
            createdAt: $now,
            updatedAt: $now,
        );

        $updated = $engine->playCard($match, new CardPlay('u1', 'guard', null, null, 'guard-u1'));

        self::assertSame('active', $updated->status->value);
        self::assertSame('guard_no_target', $updated->currentRound?->lastAction?->type);
        self::assertSame('u2', $updated->currentRound?->activePlayerId);
        self::assertCount(1, $updated->currentRound?->getPlayerState('u1')->hand ?? []);
        self::assertCount(1, $updated->currentRound?->getPlayerState('u1')->discard ?? []);
    }

    public function testExecutionerCanBeDiscardedWithoutEffectWhenNoAvailableTargetExists(): void
    {
        $engine = $this->createEngine();
        $now = gmdate(DATE_ATOM);

        $match = new MatchState(
            id: 'match-executioner-no-target',
            roomId: 'room-1',
            ownerUserId: 'u1',
            status: MatchStatus::ACTIVE,
            players: [
                new MatchPlayer('u1', 'owner', 0, 0),
                new MatchPlayer('u2', 'player2', 0, 1),
            ],
            roundNumber: 1,
            winnerUserId: null,
            currentRound: new RoundState(
                status: RoundStatus::ACTIVE,
                activePlayerId: 'u1',
                setAsideCard: new Card('set_aside', 'Отложенная', 0),
                deck: [new Card('queen', 'Королева', 8, 'queen-deck')],
                revealedCards: [],
                players: [
                    'u1' => new RoundPlayerState(false, [
                        new Card('executioner', 'Палач', 3, 'executioner-u1'),
                        new Card('lady', 'Дворянка', 4, 'lady-u1'),
                    ], []),
                    'u2' => new RoundPlayerState(false, [new Card('king', 'Король', 9, 'king-u2')], [], false, null, null, true),
                ],
                lastAction: new RoundAction('card_played', 'u2', 'lady', 'Дворянка', $now),
                finishedReason: null,
                roundWinners: [],
            ),
            lastRoundSummary: null,
            createdAt: $now,
            updatedAt: $now,
        );

        $updated = $engine->playCard($match, new CardPlay('u1', 'executioner', null, null, 'executioner-u1'));

        self::assertSame('active', $updated->status->value);
        self::assertSame('executioner_no_target', $updated->currentRound?->lastAction?->type);
        self::assertSame('u2', $updated->currentRound?->activePlayerId);
        self::assertCount(1, $updated->currentRound?->getPlayerState('u1')->discard ?? []);
    }

    public function testFeudalLordCreatesPendingDecisionAndCanSwapCards(): void
    {
        $engine = $this->createEngine();
        $now = gmdate(DATE_ATOM);

        $match = new MatchState(
            id: 'match-feudal-swap',
            roomId: 'room-1',
            ownerUserId: 'u1',
            status: MatchStatus::ACTIVE,
            players: [
                new MatchPlayer('u1', 'owner', 0, 0),
                new MatchPlayer('u2', 'player2', 0, 1),
                new MatchPlayer('u3', 'player3', 0, 2),
            ],
            roundNumber: 1,
            winnerUserId: null,
            currentRound: new RoundState(
                status: RoundStatus::ACTIVE,
                activePlayerId: 'u1',
                setAsideCard: new Card('set_aside', 'Отложенная', 0),
                deck: [new Card('queen', 'Королева', 8, 'queen-deck')],
                revealedCards: [],
                players: [
                    'u1' => new RoundPlayerState(false, [
                        new Card('feudal_lord', 'Феодал', 6, 'feudal-u1'),
                        new Card('lady', 'Дворянка', 4, 'lady-u1'),
                    ], []),
                    'u2' => new RoundPlayerState(false, [new Card('guard', 'Стражник', 1, 'guard-u2')], []),
                    'u3' => new RoundPlayerState(false, [new Card('king', 'Король', 9, 'king-u3')], []),
                ],
                lastAction: new RoundAction('card_played', 'u3', 'guard', 'Стражник', $now),
                finishedReason: null,
                roundWinners: [],
            ),
            lastRoundSummary: null,
            createdAt: $now,
            updatedAt: $now,
        );

        $pending = $engine->playCard($match, new CardPlay('u1', 'feudal_lord', 'u2', null, 'feudal-u1', 'u3'));

        self::assertSame('feudal_inspect', $pending->currentRound?->lastAction?->type);
        self::assertNotNull($pending->currentRound?->pendingDecision);
        self::assertSame('u1', $pending->currentRound?->activePlayerId);
        self::assertSame('guard', $pending->currentRound?->pendingDecision?->targetCard->code);
        self::assertSame('king', $pending->currentRound?->pendingDecision?->secondTargetCard->code);

        $resolved = $engine->playCard($pending, new CardPlay('u1', 'feudal_lord', null, null, null, null, null, true));

        self::assertNull($resolved->currentRound?->pendingDecision);
        self::assertSame('feudal_swap', $resolved->currentRound?->lastAction?->type);
        self::assertSame('u2', $resolved->currentRound?->activePlayerId);
        self::assertSame('king', $resolved->currentRound?->getPlayerState('u2')->peekFirstCardInHand()?->code);
        self::assertSame('guard', $resolved->currentRound?->getPlayerState('u3')->peekFirstCardInHand()?->code);
    }

    public function testFeudalLordCanBeDiscardedWithoutEffectWhenTwoTargetsAreUnavailable(): void
    {
        $engine = $this->createEngine();
        $now = gmdate(DATE_ATOM);

        $match = new MatchState(
            id: 'match-feudal-no-target',
            roomId: 'room-1',
            ownerUserId: 'u1',
            status: MatchStatus::ACTIVE,
            players: [
                new MatchPlayer('u1', 'owner', 0, 0),
                new MatchPlayer('u2', 'player2', 0, 1),
            ],
            roundNumber: 1,
            winnerUserId: null,
            currentRound: new RoundState(
                status: RoundStatus::ACTIVE,
                activePlayerId: 'u1',
                setAsideCard: new Card('set_aside', 'Отложенная', 0),
                deck: [new Card('queen', 'Королева', 8, 'queen-deck')],
                revealedCards: [],
                players: [
                    'u1' => new RoundPlayerState(false, [
                        new Card('feudal_lord', 'Феодал', 6, 'feudal-u1'),
                        new Card('lady', 'Дворянка', 4, 'lady-u1'),
                    ], []),
                    'u2' => new RoundPlayerState(false, [new Card('king', 'Король', 9, 'king-u2')], [], false, null, null, true),
                ],
                lastAction: new RoundAction('card_played', 'u2', 'lady', 'Дворянка', $now),
                finishedReason: null,
                roundWinners: [],
            ),
            lastRoundSummary: null,
            createdAt: $now,
            updatedAt: $now,
        );

        $updated = $engine->playCard($match, new CardPlay('u1', 'feudal_lord', null, null, 'feudal-u1'));

        self::assertSame('feudal_no_target', $updated->currentRound?->lastAction?->type);
        self::assertNull($updated->currentRound?->pendingDecision);
        self::assertSame('u2', $updated->currentRound?->activePlayerId);
        self::assertCount(1, $updated->currentRound?->getPlayerState('u1')->discard ?? []);
    }

    public function testBishopAppliesBlackRoseAndPreventsForcedDiscardFromOtherPlayer(): void
    {
        $engine = $this->createEngine();
        $now = gmdate(DATE_ATOM);

        $afterBishop = $engine->playCard(
            new MatchState(
                id: 'match-bishop-token',
                roomId: 'room-1',
                ownerUserId: 'u1',
                status: MatchStatus::ACTIVE,
                players: [
                    new MatchPlayer('u1', 'owner', 0, 0),
                    new MatchPlayer('u2', 'player2', 0, 1),
                ],
                roundNumber: 1,
                winnerUserId: null,
                currentRound: new RoundState(
                    status: RoundStatus::ACTIVE,
                    activePlayerId: 'u1',
                    setAsideCard: new Card('set_aside', 'Отложенная', 0),
                    deck: [new Card('guard', 'Стражник', 1, 'guard-deck')],
                    revealedCards: [],
                    players: [
                    'u1' => new RoundPlayerState(false, [
                        new Card('bishop', 'Епископ', 7, 'bishop-u1'),
                        new Card('king', 'Король', 9, 'king-u1'),
                    ], []),
                        'u2' => new RoundPlayerState(false, [new Card('rebel', 'Мятежник', 5, 'rebel-u2')], []),
                    ],
                    lastAction: new RoundAction('card_played', 'u2', 'guard', 'Стражник', $now),
                    finishedReason: null,
                    roundWinners: [],
                ),
                lastRoundSummary: null,
                createdAt: $now,
                updatedAt: $now,
            ),
            new CardPlay('u1', 'bishop', null, null, 'bishop-u1')
        );

        self::assertTrue($afterBishop->currentRound?->getPlayerState('u1')->hasBlackRoseToken);
        self::assertSame('bishop_token_applied', $afterBishop->currentRound?->lastAction?->type);
        self::assertSame('u2', $afterBishop->currentRound?->activePlayerId);

        $afterRebel = $engine->playCard($afterBishop, new CardPlay('u2', 'rebel', 'u1', null, 'rebel-u2'));

        self::assertSame('black_rose_saved', $afterRebel->currentRound?->lastAction?->type);
        self::assertFalse($afterRebel->currentRound?->getPlayerState('u1')->hasBlackRoseToken);
        self::assertSame('king', $afterRebel->currentRound?->getPlayerState('u1')->peekFirstCardInHand()?->code);
        self::assertCount(1, $afterRebel->currentRound?->getPlayerState('u1')->discard ?? []);
        self::assertSame('bishop', $afterRebel->currentRound?->getPlayerState('u1')->discard[0]->code ?? null);

        $view = (new MatchViewFormatter())->format($afterRebel, 'u2');
        $lastAction = (array) (($view['currentRound'] ?? [])['lastAction'] ?? []);
        self::assertArrayHasKey('targetCardCode', $lastAction);
        self::assertNull($lastAction['targetCardCode'] ?? null);
        self::assertNull($lastAction['targetCardName'] ?? null);
    }

    public function testBlackRoseDoesNotPreventSelfDiscard(): void
    {
        $engine = $this->createEngine();
        $now = gmdate(DATE_ATOM);

        $match = new MatchState(
            id: 'match-bishop-self-rebel',
            roomId: 'room-1',
            ownerUserId: 'u1',
            status: MatchStatus::ACTIVE,
            players: [
                new MatchPlayer('u1', 'owner', 0, 0),
                new MatchPlayer('u2', 'player2', 0, 1),
            ],
            roundNumber: 1,
            winnerUserId: null,
            currentRound: new RoundState(
                status: RoundStatus::ACTIVE,
                activePlayerId: 'u1',
                setAsideCard: new Card('set_aside', 'Отложенная', 0),
                deck: [new Card('guard', 'Стражник', 1, 'guard-deck')],
                revealedCards: [],
                players: [
                    'u1' => new RoundPlayerState(false, [
                        new Card('rebel', 'Мятежник', 5, 'rebel-u1'),
                        new Card('king', 'Король', 9, 'king-u1'),
                    ], [new Card('bishop', 'Епископ', 7, 'bishop-discard')], false, null, null, false, true),
                    'u2' => new RoundPlayerState(false, [new Card('guard', 'Стражник', 1, 'guard-u2')], []),
                ],
                lastAction: new RoundAction('card_played', 'u2', 'guard', 'Стражник', $now),
                finishedReason: null,
                roundWinners: [],
            ),
            lastRoundSummary: null,
            createdAt: $now,
            updatedAt: $now,
        );

        $updated = $engine->playCard($match, new CardPlay('u1', 'rebel', 'u1', null, 'rebel-u1'));

        self::assertSame('king_discard_elimination', $updated->currentRound?->lastAction?->type);
        self::assertFalse($updated->currentRound?->getPlayerState('u1')->hasBlackRoseToken);
        self::assertTrue($updated->currentRound?->getPlayerState('u1')->eliminated ?? false);
        self::assertSame(RoundStatus::FINISHED, $updated->currentRound?->status);
        self::assertSame(['u2'], $updated->currentRound?->roundWinners);
        self::assertCount(3, $updated->currentRound?->getPlayerState('u1')->discard ?? []);
        self::assertSame('bishop', $updated->currentRound?->getPlayerState('u1')->discard[0]->code ?? null);
        self::assertSame('rebel', $updated->currentRound?->getPlayerState('u1')->discard[1]->code ?? null);
        self::assertSame('king', $updated->currentRound?->getPlayerState('u1')->discard[2]->code ?? null);
    }

    public function testQueenIsDiscardedWithoutEffectWhenNoDecreesExist(): void
    {
        $engine = $this->createEngine();
        $now = gmdate(DATE_ATOM);

        $match = new MatchState(
            id: 'match-queen-no-decree',
            roomId: 'room-1',
            ownerUserId: 'u1',
            status: MatchStatus::ACTIVE,
            players: [
                new MatchPlayer('u1', 'owner', 0, 0),
                new MatchPlayer('u2', 'player2', 0, 1),
            ],
            roundNumber: 1,
            winnerUserId: null,
            currentRound: new RoundState(
                status: RoundStatus::ACTIVE,
                activePlayerId: 'u1',
                setAsideCard: new Card('set_aside', 'Отложенная', 0),
                deck: [new Card('guard', 'Стражник', 1, 'guard-deck')],
                revealedCards: [],
                players: [
                    'u1' => new RoundPlayerState(false, [new Card('queen', 'Королева', 8, 'queen-u1')], []),
                    'u2' => new RoundPlayerState(false, [new Card('bishop', 'Епископ', 7, 'bishop-u2')], []),
                ],
                lastAction: new RoundAction('card_played', 'u2', 'bishop', 'Епископ', $now),
                finishedReason: null,
                roundWinners: [],
            ),
            lastRoundSummary: null,
            createdAt: $now,
            updatedAt: $now,
        );

        $updated = $engine->playCard($match, new CardPlay('u1', 'queen', null, null, 'queen-u1'));

        self::assertSame('queen_no_decree', $updated->currentRound?->lastAction?->type);
        self::assertSame('u2', $updated->currentRound?->activePlayerId);
        self::assertCount(1, $updated->currentRound?->getPlayerState('u1')->discard ?? []);
        self::assertSame('queen', $updated->currentRound?->getPlayerState('u1')->discard[0]->code ?? null);
    }

    public function testKingDiscardEliminatesActorWhenPlayedVoluntarily(): void
    {
        $engine = $this->createEngine();
        $now = gmdate(DATE_ATOM);

        $match = new MatchState(
            id: 'match-king-self-discard',
            roomId: 'room-1',
            ownerUserId: 'u1',
            status: MatchStatus::ACTIVE,
            players: [
                new MatchPlayer('u1', 'owner', 0, 0),
                new MatchPlayer('u2', 'player2', 0, 1),
            ],
            roundNumber: 1,
            winnerUserId: null,
            currentRound: new RoundState(
                status: RoundStatus::ACTIVE,
                activePlayerId: 'u1',
                setAsideCard: new Card('set_aside', 'Отложенная', 0),
                deck: [new Card('guard', 'Стражник', 1, 'guard-deck')],
                revealedCards: [],
                players: [
                    'u1' => new RoundPlayerState(false, [
                        new Card('king', 'Король', 9, 'king-u1'),
                        new Card('bishop', 'Епископ', 7, 'bishop-u1'),
                    ], []),
                    'u2' => new RoundPlayerState(false, [new Card('guard', 'Стражник', 1, 'guard-u2')], []),
                ],
                lastAction: new RoundAction('card_played', 'u2', 'guard', 'Стражник', $now),
                finishedReason: null,
                roundWinners: [],
            ),
            lastRoundSummary: null,
            createdAt: $now,
            updatedAt: $now,
        );

        $updated = $engine->playCard($match, new CardPlay('u1', 'king', null, null, 'king-u1'));

        self::assertSame('king_discard_elimination', $updated->currentRound?->lastAction?->type);
        self::assertTrue($updated->currentRound?->getPlayerState('u1')->eliminated ?? false);
        self::assertSame(RoundStatus::FINISHED, $updated->currentRound?->status);
        self::assertSame(['u2'], $updated->currentRound?->roundWinners);
        self::assertCount(2, $updated->currentRound?->getPlayerState('u1')->discard ?? []);
        self::assertSame('king', $updated->currentRound?->getPlayerState('u1')->discard[0]->code ?? null);
        self::assertSame('bishop', $updated->currentRound?->getPlayerState('u1')->discard[1]->code ?? null);
    }

    public function testRebelForcesKingDiscardAndEliminatesTarget(): void
    {
        $engine = $this->createEngine();
        $now = gmdate(DATE_ATOM);

        $match = new MatchState(
            id: 'match-rebel-king-discard',
            roomId: 'room-1',
            ownerUserId: 'u1',
            status: MatchStatus::ACTIVE,
            players: [
                new MatchPlayer('u1', 'owner', 0, 0),
                new MatchPlayer('u2', 'player2', 0, 1),
            ],
            roundNumber: 1,
            winnerUserId: null,
            currentRound: new RoundState(
                status: RoundStatus::ACTIVE,
                activePlayerId: 'u1',
                setAsideCard: new Card('set_aside', 'Отложенная', 0),
                deck: [new Card('guard', 'Стражник', 1, 'guard-deck')],
                revealedCards: [],
                players: [
                    'u1' => new RoundPlayerState(false, [new Card('rebel', 'Мятежник', 5, 'rebel-u1')], []),
                    'u2' => new RoundPlayerState(false, [new Card('king', 'Король', 9, 'king-u2')], []),
                ],
                lastAction: new RoundAction('card_played', 'u2', 'guard', 'Стражник', $now),
                finishedReason: null,
                roundWinners: [],
            ),
            lastRoundSummary: null,
            createdAt: $now,
            updatedAt: $now,
        );

        $updated = $engine->playCard($match, new CardPlay('u1', 'rebel', 'u2', null, 'rebel-u1'));

        self::assertSame('king_discard_elimination', $updated->currentRound?->lastAction?->type);
        self::assertTrue($updated->currentRound?->getPlayerState('u2')->eliminated ?? false);
        self::assertSame(RoundStatus::FINISHED, $updated->currentRound?->status);
        self::assertSame(['u1'], $updated->currentRound?->roundWinners);
        self::assertCount(1, $updated->currentRound?->getPlayerState('u2')->discard ?? []);
        self::assertSame('king', $updated->currentRound?->getPlayerState('u2')->discard[0]->code ?? null);
        self::assertSame([], $updated->currentRound?->getPlayerState('u2')->hand ?? []);
    }

    /**
     * @param list<array<string,mixed>> $players
     * @return array<string,mixed>
     */
    private function findPlayerRow(array $players, string $userId): array
    {
        foreach ($players as $player) {
            if ((string) ($player['userId'] ?? '') === $userId) {
                return $player;
            }
        }

        self::fail('Player row not found');
    }

    private function createEngine(): MatchEngine
    {
        $cards = new CharacterCardRegistry();
        $deckFactory = new CharacterDeckFactory($cards);
        $eliminations = new PlayerEliminationService();
        $effectResolver = new CardEffectResolver($cards, $eliminations);

        return new MatchEngine(
            new RoundSetupFactory($deckFactory),
            new TurnResolver($effectResolver, $eliminations),
            new RoundFinisher(),
        );
    }

    private function seedRoomWithTwoPlayers(\Doctrine\DBAL\Connection $db): void
    {
        $db->insert('users', [
            'id' => 'u1',
            'username' => 'owner',
            'password_hash' => 'x',
            'role' => 'player',
            'created_at' => gmdate(DATE_ATOM),
        ]);
        $db->insert('users', [
            'id' => 'u2',
            'username' => 'player2',
            'password_hash' => 'x',
            'role' => 'player',
            'created_at' => gmdate(DATE_ATOM),
        ]);
        $db->insert('rooms', [
            'id' => 'room-1',
            'invite_code' => 'ABC123',
            'name' => 'Room',
            'owner_user_id' => 'u1',
            'status' => 'lobby',
            'is_public' => true,
            'max_players' => 6,
            'password_hash' => null,
            'invite_code_regenerated_at' => null,
            'created_at' => gmdate(DATE_ATOM),
        ]);
        $db->insert('room_participants', [
            'room_id' => 'room-1',
            'user_id' => 'u1',
            'role' => 'owner',
            'ready' => true,
            'joined_at' => gmdate(DATE_ATOM),
        ]);
        $db->insert('room_participants', [
            'room_id' => 'room-1',
            'user_id' => 'u2',
            'role' => 'player',
            'ready' => true,
            'joined_at' => gmdate(DATE_ATOM),
        ]);
    }
}
