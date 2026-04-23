<?php

declare(strict_types=1);

namespace Stories\Application\Rooms\ListLobbies;

use Stories\Domain\Rooms\Repository\RoomsRepository;

final class ListLobbiesHandler
{
    public function __construct(private readonly RoomsRepository $rooms)
    {
    }

    public function handle(string $visibility, string $passwordFilter, int $limit, int $offset): ListLobbiesResult
    {
        return ListLobbiesResult::fromRows(
            $this->rooms->listLobbies($visibility, $passwordFilter, $limit, $offset),
            $limit,
            $offset,
        );
    }
}
