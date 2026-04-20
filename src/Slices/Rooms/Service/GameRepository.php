<?php

declare(strict_types=1);

namespace Stories\Slices\Rooms\Service;

use Doctrine\DBAL\Connection;
use Stories\Slices\Rooms\Domain\GameState;

final class GameRepository
{
    public function __construct(private readonly Connection $db)
    {
    }

    public function upsert(string $gameId, string $roomId, GameState $state): void
    {
        $builder = $this->db->createQueryBuilder();
        $builder
            ->insert('games')
            ->values([
                'id' => ':id',
                'room_id' => ':roomId',
                'status' => ':status',
                'decree_rounds_used' => ':decreeRoundsUsed',
                'state_json' => ':stateJson',
                'created_at' => ':createdAt',
            ])
            ->setParameter('id', $gameId)
            ->setParameter('roomId', $roomId)
            ->setParameter('status', 'in_progress')
            ->setParameter('decreeRoundsUsed', 0)
            ->setParameter('stateJson', json_encode($state->toPayload(), JSON_UNESCAPED_UNICODE))
            ->setParameter('createdAt', gmdate(DATE_ATOM));

        $sql = $builder->getSQL() . ' ON CONFLICT(room_id) DO UPDATE SET id=excluded.id, status=excluded.status, decree_rounds_used=excluded.decree_rounds_used, state_json=excluded.state_json';
        $this->db->executeStatement($sql, $builder->getParameters());
    }

    public function findByRoomId(string $roomId): ?GameRecord
    {
        $row = $this->db->createQueryBuilder()
            ->select('g.id', 'g.room_id', 'g.status', 'g.decree_rounds_used', 'g.state_json')
            ->from('games', 'g')
            ->where('g.room_id = :roomId')
            ->setParameter('roomId', $roomId)
            ->fetchAssociative();

        return $row === false ? null : GameRecord::fromRow($row);
    }

    public function persistState(string $gameId, GameState $state): void
    {
        $this->db->update('games', ['state_json' => json_encode($state->toPayload(), JSON_UNESCAPED_UNICODE)], ['id' => $gameId]);
    }
}
