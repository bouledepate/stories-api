<?php

declare(strict_types=1);

namespace Stories\Slices\Rooms\Service;

use Doctrine\DBAL\ArrayParameterType;
use Doctrine\DBAL\Connection;

final class ParticipantRepository
{
    public function __construct(private readonly Connection $db)
    {
    }

    public function addOwner(string $roomId, string $userId): void
    {
        $this->db->insert('room_participants', [
            'room_id' => $roomId,
            'user_id' => $userId,
            'role' => 'owner',
            'ready' => 0,
            'joined_at' => gmdate(DATE_ATOM),
        ]);
    }

    public function upsertParticipant(string $roomId, string $userId, string $role): void
    {
        $builder = $this->db->createQueryBuilder();
        $builder
            ->insert('room_participants')
            ->values([
                'room_id' => ':roomId',
                'user_id' => ':userId',
                'role' => ':role',
                'ready' => '0',
                'joined_at' => ':joinedAt',
            ])
            ->setParameter('roomId', $roomId)
            ->setParameter('userId', $userId)
            ->setParameter('role', $role)
            ->setParameter('joinedAt', gmdate(DATE_ATOM));

        $sql = $builder->getSQL() . ' ON CONFLICT(room_id, user_id) DO UPDATE SET role = excluded.role';
        $this->db->executeStatement($sql, $builder->getParameters());
    }

    public function remove(string $roomId, string $userId): void
    {
        $this->db->delete('room_participants', ['room_id' => $roomId, 'user_id' => $userId]);
    }

    public function setReady(string $roomId, string $userId, bool $ready): void
    {
        $this->db->update('room_participants', ['ready' => $ready ? 1 : 0], ['room_id' => $roomId, 'user_id' => $userId]);
    }

    public function exists(string $roomId, string $userId): bool
    {
        $exists = $this->db->createQueryBuilder()
            ->select('1')
            ->from('room_participants', 'p')
            ->where('p.room_id = :roomId')
            ->andWhere('p.user_id = :userId')
            ->setParameter('roomId', $roomId)
            ->setParameter('userId', $userId)
            ->fetchOne();

        return $exists !== false;
    }

    /** @return list<string> */
    public function fetchReadyPlayerIds(string $roomId): array
    {
        $rows = $this->db->createQueryBuilder()
            ->select('p.user_id')
            ->from('room_participants', 'p')
            ->where('p.room_id = :roomId')
            ->andWhere('p.role IN (:roles)')
            ->andWhere('p.ready = 1')
            ->orderBy('p.joined_at')
            ->setParameter('roomId', $roomId)
            ->setParameter('roles', ['owner', 'player'], ArrayParameterType::STRING)
            ->fetchAllAssociative();

        return array_map(static fn (array $row): string => (string) $row['user_id'], $rows);
    }

    /** @return list<array{userId:string,username:string,role:string,ready:bool}> */
    public function fetchSnapshotParticipants(string $roomId): array
    {
        $rows = $this->db->createQueryBuilder()
            ->select('p.user_id', 'u.username', 'p.role', 'p.ready')
            ->from('room_participants', 'p')
            ->innerJoin('p', 'users', 'u', 'u.id = p.user_id')
            ->where('p.room_id = :roomId')
            ->orderBy('p.joined_at')
            ->setParameter('roomId', $roomId)
            ->fetchAllAssociative();

        return array_map(
            static fn (array $row): array => [
                'userId' => (string) $row['user_id'],
                'username' => (string) $row['username'],
                'role' => (string) $row['role'],
                'ready' => ((int) $row['ready']) === 1,
            ],
            $rows
        );
    }
}
