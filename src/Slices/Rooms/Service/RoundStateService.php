<?php

declare(strict_types=1);

namespace Stories\Slices\Rooms\Service;

use Stories\Shared\Security\AuthenticatedUser;
use Stories\Shared\Exception\ApiException;
use Stories\Shared\Http\ApiErrorCode;
use Stories\Slices\Rooms\Domain\GameState;
use Stories\Slices\Rooms\Dto\ActionRequest;

final class RoundStateService
{
    /** @return array<string, mixed> */
    public function applyAction(GameState $state, AuthenticatedUser $actor, ActionRequest $request): array
    {
        $round = $state->round;
        if ($round->currentPlayerId() !== $actor->id) {
            throw new ApiException(ApiErrorCode::NOT_YOUR_TURN);
        }

        if ($request->actionType === 'draw_character') {
            if (!$round->drawCharacter($actor->id)) {
                return ['result' => 'deck_empty'];
            }

            return ['result' => 'drawn', 'handSize' => $round->handSize($actor->id)];
        }

        if ($request->actionType === 'play_character') {
            if ($request->cardCode === null) {
                throw new ApiException(ApiErrorCode::CARD_CODE_REQUIRED);
            }

            $playedCard = $round->playCharacter($actor->id, $request->cardCode);
            $round->moveToNextAlivePlayer();

            return [
                'result' => 'played',
                'card' => $playedCard,
                'nextPlayerId' => $round->currentPlayerId(),
            ];
        }

        $round->moveToNextAlivePlayer();

        return ['result' => 'passed', 'nextPlayerId' => $round->currentPlayerId()];
    }

    public function resolveDisconnectTimeouts(GameState $state, int $now): bool
    {
        return $state->resolveDisconnectTimeouts($now);
    }
}
