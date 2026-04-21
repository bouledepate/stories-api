<?php

declare(strict_types=1);

namespace Stories\Slices\Rooms\Service;

use Doctrine\DBAL\ArrayParameterType;
use Doctrine\DBAL\Connection;
use Doctrine\DBAL\ParameterType;

final class ParticipantRepository
{
    public function __construct(private readonly Connection $db)
    {
    }

    public function addOwner(string $roomId, string $userId): void
    {
        $builder = $this->db->createQueryBuilder();
        $builder
            ->insert('room_participants')
            ->values([
                'room_id' => ':roomId',
                'user_id' => ':userId',
                'role' => ':role',
                'ready' => ':ready',
                'joined_at' => ':joinedAt',
            ])
            ->setParameter('roomId', $roomId)
            ->setParameter('userId', $userId)
            ->setParameter('role', 'owner')
            ->setParameter('ready', false, ParameterType::BOOLEAN)
            ->setParameter('joinedAt', gmdate(DATE_ATOM));

        $this->db->executeStatement($builder->getSQL(), $builder->getParameters(), [
            'roomId' => ParameterType::STRING,
            'userId' => ParameterType::STRING,
            'role' => ParameterType::STRING,
            'ready' => ParameterType::BOOLEAN,
            'joinedAt' => ParameterType::STRING,
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
                'ready' => ':ready',
                'joined_at' => ':joinedAt',
            ])
            ->setParameter('roomId', $roomId)
            ->setParameter('userId', $userId)
            ->setParameter('role', $role)
            ->setParameter('ready', false)
            ->setParameter('joinedAt', gmdate(DATE_ATOM));

        $sql = $builder->getSQL() . ' ON CONFLICT(room_id, user_id) DO UPDATE SET role = excluded.role';
        $this->db->executeStatement($sql, $builder->getParameters(), [
            'roomId' => ParameterType::STRING,
            'userId' => ParameterType::STRING,
            'role' => ParameterType::STRING,
            'ready' => ParameterType::BOOLEAN,
            'joinedAt' => ParameterType::STRING,
        ]);
    }

    public function remove(string $roomId, string $userId): void
    {
        $this->db->delete('room_participants', ['room_id' => $roomId, 'user_id' => $userId]);
    }

    public function setReady(string $roomId, string $userId, bool $ready): void
    {
        $this->db->update('room_participants', ['ready' => $ready], ['room_id' => $roomId, 'user_id' => $userId]);
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

    public function roleForUser(string $roomId, string $userId): ?string
    {
        $role = $this->db->createQueryBuilder()
            ->select('p.role')
            ->from('room_participants', 'p')
            ->where('p.room_id = :roomId')
            ->andWhere('p.user_id = :userId')
            ->setParameter('roomId', $roomId)
            ->setParameter('userId', $userId)
            ->fetchOne();

        return $role === false ? null : (string) $role;
    }

    /** @return list<string> */
    public function fetchReadyPlayerIds(string $roomId): array
    {
        $rows = $this->db->createQueryBuilder()
            ->select('p.user_id')
            ->from('room_participants', 'p')
            ->where('p.room_id = :roomId')
            ->andWhere('p.role IN (:roles)')
            ->andWhere('p.ready = true')
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
                'ready' => filter_var($row['ready'], FILTER_VALIDATE_BOOLEAN),
            ],
            $rows
        );
    }
}
