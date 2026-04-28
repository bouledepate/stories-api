<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Decree;

use Stories\Domain\Matches\Decree\Guard\GuardFreeInterrogationDecree;
use Stories\Domain\Matches\Decree\Guard\GuardSuspicionDecree;
use Stories\Domain\Matches\Decree\Peasant\PeasantBestFriendDecree;
use Stories\Domain\Matches\Decree\Peasant\PeasantDarkHorseDecree;
use Stories\Domain\Matches\Decree\Peasant\PeasantFamilyTiesDecree;
use Stories\Domain\Matches\Decree\Peasant\PeasantTwinDecree;
use Stories\Shared\Error\ApiErrorCode;
use Stories\Shared\Error\ApiException;

final class DecreeRegistry
{
    /** @var array<string,AbstractCharacterDecree>|null */
    private ?array $decreesByCode = null;

    /**
     * @return list<AbstractCharacterDecree>
     */
    public function all(): array
    {
        return array_values($this->decreesByCode());
    }

    /**
     * @return list<AbstractCharacterDecree>
     */
    public function openingSet(): array
    {
        return array_slice($this->all(), 0, 3);
    }

    public function require(string $code): AbstractCharacterDecree
    {
        $decree = $this->decreesByCode()[$code] ?? null;
        if ($decree instanceof AbstractCharacterDecree) {
            return $decree;
        }

        throw new ApiException(ApiErrorCode::MATCH_STATE_INVALID);
    }

    /**
     * @return array<string,AbstractCharacterDecree>
     */
    private function decreesByCode(): array
    {
        if (is_array($this->decreesByCode)) {
            return $this->decreesByCode;
        }

        $decrees = [
            new PeasantTwinDecree(),
            new PeasantDarkHorseDecree(),
            new PeasantFamilyTiesDecree(),
            new PeasantBestFriendDecree(),
            new GuardFreeInterrogationDecree(),
            new GuardSuspicionDecree(),
        ];

        $this->decreesByCode = [];
        foreach ($decrees as $decree) {
            $this->decreesByCode[$decree->code()] = $decree;
        }

        return $this->decreesByCode;
    }
}
