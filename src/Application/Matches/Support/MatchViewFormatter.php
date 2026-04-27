<?php

declare(strict_types=1);

namespace Stories\Application\Matches\Support;

use Stories\Domain\Matches\Model\Card;
use Stories\Domain\Matches\Model\MatchPlayer;
use Stories\Domain\Matches\Model\MatchState;
use Stories\Domain\Matches\Model\RoundPlayerState;
use Stories\Domain\Matches\Model\RoundStatus;

final class MatchViewFormatter
{
    /**
     * @return array<string,mixed>
     */
    public function format(MatchState $match, string $viewerUserId): array
    {
        $round = $match->currentRound;
        $roundView = null;
        if ($round !== null) {
            $isShowdownVisible = $round->status === RoundStatus::FINISHED;
            $playersView = [];
            foreach ($match->players as $player) {
                $roundPlayer = $round->players[$player->userId] ?? new RoundPlayerState(false, [], []);
                $hand = $roundPlayer->hand;
                $discard = $roundPlayer->discard;
                $playersView[] = [
                    'userId' => $player->userId,
                    'username' => $player->username,
                    'points' => $player->points,
                    'eliminated' => $roundPlayer->eliminated,
                    'handCount' => count($hand),
                    'hand' => ($player->userId === $viewerUserId || $isShowdownVisible) ? $this->cardsToArray($hand) : [],
                    'discard' => $this->cardsToArray($discard),
                    'lockedCardInstanceId' => $player->userId === $viewerUserId ? $roundPlayer->lockedCardInstanceId : null,
                    'lockedCardCode' => $player->userId === $viewerUserId ? $roundPlayer->lockedCardCode : null,
                    'protectedFromEffects' => $roundPlayer->protectedFromEffects,
                    'hasBlackRoseToken' => $roundPlayer->hasBlackRoseToken,
                ];
            }

            $roundView = [
                'status' => $round->status->value,
                'activePlayerId' => $round->activePlayerId,
                'hasSetAsideCard' => true,
                'revealedCards' => $this->cardsToArray($round->revealedCards),
                'deckCount' => count($round->deck),
                'hasPendingDecision' => $round->hasPendingDecision(),
                'players' => $playersView,
                'pendingDecision' => $round->pendingDecision?->actorUserId === $viewerUserId
                    ? $round->pendingDecision->toArray()
                    : null,
                'lastAction' => $round->lastAction ? $this->formatLastAction($round->lastAction) : null,
                'finishedReason' => $round->finishedReason?->value,
                'roundWinners' => array_values($round->roundWinners),
            ];
        }

        return [
            'matchId' => $match->id,
            'roomId' => $match->roomId,
            'status' => $match->status->value,
            'roundNumber' => $match->roundNumber,
            'winnerUserId' => $match->winnerUserId,
            'players' => array_map(static fn (MatchPlayer $player): array => $player->toArray(), $match->players),
            'currentRound' => $roundView,
            'lastRoundSummary' => $match->lastRoundSummary ? [
                'roundNumber' => $match->lastRoundSummary->roundNumber,
                'finishedReason' => $match->lastRoundSummary->finishedReason->value,
                'winnerUserIds' => $match->lastRoundSummary->winnerUserIds,
                'winnerNames' => $this->resolveWinnerNames($match, $match->lastRoundSummary->winnerUserIds),
            ] : null,
            'updatedAt' => $match->updatedAt,
        ];
    }

    /**
     * @param list<Card> $cards
     * @return list<array{code:string,name:string,value:int,instanceId:?string}>
     */
    private function cardsToArray(array $cards): array
    {
        return array_map(static fn (Card $card): array => $card->toArray(), $cards);
    }

    /**
     * @param list<string> $winnerIds
     * @return list<string>
     */
    private function resolveWinnerNames(MatchState $match, array $winnerIds): array
    {
        $names = [];
        foreach ($winnerIds as $winnerId) {
            foreach ($match->players as $player) {
                if ($player->userId === $winnerId) {
                    $names[] = $player->username;
                    break;
                }
            }
        }

        return $names;
    }

    /**
     * @return array<string,string|null>
     */
    private function formatLastAction(\Stories\Domain\Matches\Model\RoundAction $action): array
    {
        $payload = $action->toArray();

        if ($action->type === 'black_rose_saved') {
            $payload['targetCardCode'] = null;
            $payload['targetCardName'] = null;
        }

        return $payload;
    }
}
