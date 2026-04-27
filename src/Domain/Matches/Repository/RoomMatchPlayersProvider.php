<?php

declare(strict_types=1);

namespace Stories\Domain\Matches\Repository;

interface RoomMatchPlayersProvider
{
    /**
     * @return list<array{userId:string,username:string}>
     */
    public function fetchPlayers(string $roomId): array;
}

