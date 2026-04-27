<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Card;

use Stories\Shared\Error\ApiErrorCode;
use Stories\Shared\Error\ApiException;

final class CharacterCardRegistry
{
    /** @var array<string,AbstractCharacterCard>|null */
    private ?array $cardsByCode = null;

    /**
     * @return list<AbstractCharacterCard>
     */
    public function all(): array
    {
        return array_values($this->cardsByCode());
    }

    public function require(string $code): AbstractCharacterCard
    {
        $card = $this->cardsByCode()[$code] ?? null;
        if ($card instanceof AbstractCharacterCard) {
            return $card;
        }

        throw new ApiException(ApiErrorCode::MATCH_STATE_INVALID);
    }

    /**
     * @return array<string,AbstractCharacterCard>
     */
    private function cardsByCode(): array
    {
        if (is_array($this->cardsByCode)) {
            return $this->cardsByCode;
        }

        $cards = [
            new PeasantCard(),
            new GuardCard(),
            new ScoutCard(),
            new ExecutionerCard(),
            new LadyCard(),
            new RebelCard(),
            new FeudalLordCard(),
            new BishopCard(),
            new QueenCard(),
            new KingCard(),
        ];

        $this->cardsByCode = [];
        foreach ($cards as $card) {
            $this->cardsByCode[$card->code()] = $card;
        }

        return $this->cardsByCode;
    }
}
