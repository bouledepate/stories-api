<?php

declare(strict_types=1);

namespace Stories\Infrastructure\Persistence\Matches;

use Doctrine\DBAL\ArrayParameterType;
use Doctrine\DBAL\Connection;
use Stories\Domain\Matches\Repository\RoomMatchPlayersProvider;

final class DbalRoomMatchPlayersProvider implements RoomMatchPlayersProvider
{
    public function __construct(private readonly Connection $db)
    {
    }

    public function fetchPlayers(string $roomId): array
    {
        $rows = $this->db->createQueryBuilder()
            ->select('p.user_id', 'u.username')
            ->from('room_participants', 'p')
            ->innerJoin('p', 'users', 'u', 'u.id = p.user_id')
            ->where('p.room_id = :roomId')
            ->andWhere('p.role IN (:roles)')
            ->orderBy('p.joined_at')
            ->setParameter('roomId', $roomId)
            ->setParameter('roles', ['owner', 'player'], ArrayParameterType::STRING)
            ->fetchAllAssociative();

        return array_map(static fn (array $row): array => [
            'userId' => (string) $row['user_id'],
            'username' => (string) $row['username'],
        ], $rows);
    }
}

