<?php

declare(strict_types=1);

namespace Stories\Infrastructure\Persistence\Matches;

use Doctrine\DBAL\Connection;
use Doctrine\DBAL\ParameterType;
use Stories\Domain\Matches\Model\MatchState;
use Stories\Domain\Matches\Repository\MatchesRepository;

final class DbalMatchesRepository implements MatchesRepository
{
    public function __construct(private readonly Connection $db)
    {
    }

    public function create(MatchState $state): void
    {
        $builder = $this->db->createQueryBuilder();
        $builder->insert('games')
            ->values([
                'id' => ':id',
                'room_id' => ':roomId',
                'status' => ':status',
                'decree_rounds_used' => ':decreeRoundsUsed',
                'state_json' => ':stateJson',
                'created_at' => ':createdAt',
            ])
            ->setParameter('id', $state->id)
            ->setParameter('roomId', $state->roomId)
            ->setParameter('status', $state->status->value)
            ->setParameter('decreeRoundsUsed', 0)
            ->setParameter('stateJson', (string) json_encode($state->toArray(), JSON_UNESCAPED_UNICODE))
            ->setParameter('createdAt', $state->createdAt);

        $sql = $builder->getSQL()
            . ' ON CONFLICT(room_id) DO UPDATE SET id = excluded.id, status = excluded.status, decree_rounds_used = excluded.decree_rounds_used, state_json = excluded.state_json, created_at = excluded.created_at';

        $this->db->executeStatement($sql, $builder->getParameters(), [
            'id' => ParameterType::STRING,
            'roomId' => ParameterType::STRING,
            'status' => ParameterType::STRING,
            'decreeRoundsUsed' => ParameterType::INTEGER,
            'stateJson' => ParameterType::STRING,
            'createdAt' => ParameterType::STRING,
        ]);
    }

    public function save(MatchState $state): void
    {
        $this->db->update('games', [
            'status' => $state->status->value,
            'state_json' => (string) json_encode($state->toArray(), JSON_UNESCAPED_UNICODE),
        ], [
            'id' => $state->id,
        ], [
            'status' => ParameterType::STRING,
            'state_json' => ParameterType::STRING,
            'id' => ParameterType::STRING,
        ]);
    }

    public function findById(string $matchId): ?MatchState
    {
        $row = $this->db->createQueryBuilder()
            ->select('g.state_json')
            ->from('games', 'g')
            ->where('g.id = :id')
            ->setParameter('id', $matchId)
            ->fetchAssociative();

        return $this->mapRowToState($row);
    }

    public function findByRoomId(string $roomId): ?MatchState
    {
        $row = $this->db->createQueryBuilder()
            ->select('g.state_json')
            ->from('games', 'g')
            ->where('g.room_id = :roomId')
            ->setParameter('roomId', $roomId)
            ->fetchAssociative();

        return $this->mapRowToState($row);
    }

    /**
     * @param array<string,mixed>|false $row
     */
    private function mapRowToState(array|false $row): ?MatchState
    {
        if ($row === false) {
            return null;
        }
        $decoded = json_decode((string) ($row['state_json'] ?? '{}'), true);
        if (!is_array($decoded)) {
            return null;
        }

        return MatchState::fromArray($decoded);
    }
}
