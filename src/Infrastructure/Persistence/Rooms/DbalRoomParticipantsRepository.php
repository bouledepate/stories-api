<?php

declare(strict_types=1);

namespace Stories\Infrastructure\Persistence\Rooms;

use Doctrine\DBAL\ArrayParameterType;
use Doctrine\DBAL\Connection;
use Doctrine\DBAL\ParameterType;
use Stories\Domain\Rooms\Repository\RoomParticipantsRepository;

final class DbalRoomParticipantsRepository implements RoomParticipantsRepository
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
        $this->db->update(
            'room_participants',
            ['ready' => $ready],
            ['room_id' => $roomId, 'user_id' => $userId],
            ['ready' => ParameterType::BOOLEAN, 'room_id' => ParameterType::STRING, 'user_id' => ParameterType::STRING]
        );
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

    public function findLatestRoomIdForUser(string $userId): ?string
    {
        $roomId = $this->db->createQueryBuilder()
            ->select('p.room_id')
            ->from('room_participants', 'p')
            ->innerJoin('p', 'rooms', 'r', 'r.id = p.room_id')
            ->where('p.user_id = :userId')
            ->orderBy('p.joined_at', 'DESC')
            ->addOrderBy('r.created_at', 'DESC')
            ->setParameter('userId', $userId)
            ->setMaxResults(1)
            ->fetchOne();

        return $roomId === false ? null : (string) $roomId;
    }

    public function countPlayers(string $roomId): int
    {
        $count = $this->db->createQueryBuilder()
            ->select('COUNT(*)')
            ->from('room_participants', 'p')
            ->where('p.room_id = :roomId')
            ->andWhere('p.role IN (:roles)')
            ->setParameter('roomId', $roomId)
            ->setParameter('roles', ['owner', 'player'], ArrayParameterType::STRING)
            ->fetchOne();

        return $count === false ? 0 : (int) $count;
    }

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
