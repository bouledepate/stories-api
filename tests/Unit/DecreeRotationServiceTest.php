<?php

declare(strict_types=1);

namespace Stories\Tests\Unit;

use PHPUnit\Framework\TestCase;
use Stories\Domain\Matches\Decree\DecreeRegistry;
use Stories\Domain\Matches\Model\ActiveDecree;
use Stories\Domain\Matches\Model\MatchState;
use Stories\Domain\Matches\Model\MatchStatus;
use Stories\Domain\Matches\Service\DecreeRotationService;

final class DecreeRotationServiceTest extends TestCase
{
    public function testDrawPhaseDiscardsDuplicateCharacterDecreeAndDrawsReplacement(): void
    {
        $match = $this->createMatch(
            activeDecrees: [
                new ActiveDecree('free_interrogation', 'Свободный допрос', 'guard', 'x'),
            ],
            decreeDeckCodes: ['suspicion'],
        );

        $choice = (new DecreeRotationService(new DecreeRegistry()))->prepareChoiceForRound($match, 1, 'u1');

        self::assertCount(1, $match->activeDecrees);
        self::assertSame('free_interrogation', $match->activeDecrees[0]->code);
        self::assertSame(['suspicion'], $match->decreeDiscardCodes);
        self::assertNull($choice);
        self::assertSame([], $match->decreeDeckCodes);
    }

    public function testDrawPhaseCreatesChoiceAndApplyDiscardsSecondCandidate(): void
    {
        $match = $this->createMatch(decreeDeckCodes: ['free_interrogation', 'suspicion']);
        $rotation = new DecreeRotationService(new DecreeRegistry());

        $choice = $rotation->prepareChoiceForRound($match, 1, 'u1');
        self::assertNotNull($choice);
        self::assertSame(['free_interrogation', 'suspicion'], array_map(static fn (ActiveDecree $decree): string => $decree->code, $choice->candidates));

        $match->pendingDecreeChoice = $choice;
        $rotation->applyChoice($match, 'free_interrogation');
        self::assertCount(1, $match->activeDecrees);
        self::assertSame('free_interrogation', $match->activeDecrees[0]->code);
        self::assertSame(['suspicion'], $match->decreeDiscardCodes);
        self::assertNull($match->pendingDecreeChoice);
        self::assertSame(1, $match->decreeRotationRoundNumber);
        self::assertSame([], $match->decreeDeckCodes);
    }

    public function testMaintenancePhaseIsSkippedByDefaultWhenLimitReached(): void
    {
        $match = $this->createMatch(
            activeDecrees: [
                new ActiveDecree('a', 'A', 'peasant', 'x'),
                new ActiveDecree('b', 'B', 'guard', 'x'),
                new ActiveDecree('c', 'C', 'scout', 'x'),
            ],
            decreeDeckCodes: ['suspicion'],
        );

        $choice = (new DecreeRotationService(new DecreeRegistry()))->prepareChoiceForRound($match, 1, 'u1');

        self::assertNull($choice);
        self::assertSame(['a', 'b', 'c'], array_map(static fn (ActiveDecree $decree): string => $decree->code, $match->activeDecrees));
        self::assertSame(['suspicion'], $match->decreeDeckCodes);
        self::assertSame([], $match->decreeDiscardCodes);
        self::assertSame(1, $match->decreeRotationRoundNumber);
    }

    public function testMaintenancePhaseCanReplaceAnActiveDecreeWhenEnabled(): void
    {
        $match = $this->createMatch(
            activeDecrees: [
                new ActiveDecree('a', 'A', 'peasant', 'x'),
                new ActiveDecree('b', 'B', 'guard', 'x'),
                new ActiveDecree('c', 'C', 'scout', 'x'),
            ],
            decreeDeckCodes: ['suspicion', 'free_interrogation'],
        );

        $rotation = new DecreeRotationService(new DecreeRegistry(), maintenanceEnabled: true);
        $choice = $rotation->prepareChoiceForRound($match, 1, 'u1');
        self::assertNotNull($choice);

        $match->pendingDecreeChoice = $choice;
        $rotation->applyChoice($match, 'suspicion', 'a');
        self::assertSame(['suspicion', 'b', 'c'], array_map(static fn (ActiveDecree $decree): string => $decree->code, $match->activeDecrees));
        self::assertSame([], $match->decreeDeckCodes);
        self::assertSame(['free_interrogation', 'a'], $match->decreeDiscardCodes);
    }

    /**
     * @param list<ActiveDecree> $activeDecrees
     * @param list<string> $decreeDeckCodes
     */
    private function createMatch(array $activeDecrees = [], array $decreeDeckCodes = []): MatchState
    {
        return new MatchState(
            id: 'match-decree-rotation',
            roomId: 'room-1',
            ownerUserId: 'u1',
            status: MatchStatus::PENDING,
            players: [],
            roundNumber: 0,
            winnerUserId: null,
            currentRound: null,
            lastRoundSummary: null,
            createdAt: gmdate(DATE_ATOM),
            updatedAt: gmdate(DATE_ATOM),
            activeDecrees: $activeDecrees,
            decreeDeckCodes: $decreeDeckCodes,
        );
    }
}
