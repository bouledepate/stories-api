<?php

declare(strict_types=1);

namespace Stories\Slices\Rooms\Service;

use Doctrine\DBAL\Connection;
use Doctrine\DBAL\ParameterType;
use Stories\Shared\Validation\BooleanNormalizer;

final class RoomRepository
{
    public function __construct(private readonly Connection $db)
    {
    }

    public function create(string $roomId, string $inviteCode, string $name, string $ownerUserId, bool $isPublic, ?string $passwordHash): void
    {
        $this->db->insert(
            'rooms',
            [
                'id' => $roomId,
                'invite_code' => $inviteCode,
                'name' => $name,
                'owner_user_id' => $ownerUserId,
                'status' => 'lobby',
                'is_public' => $isPublic,
                'password_hash' => $passwordHash,
                'invite_code_regenerated_at' => null,
                'created_at' => gmdate(DATE_ATOM),
            ],
            [
                'id' => ParameterType::STRING,
                'invite_code' => ParameterType::STRING,
                'name' => ParameterType::STRING,
                'owner_user_id' => ParameterType::STRING,
                'status' => ParameterType::STRING,
                'is_public' => ParameterType::BOOLEAN,
                'password_hash' => ParameterType::STRING,
                'invite_code_regenerated_at' => ParameterType::STRING,
                'created_at' => ParameterType::STRING,
            ]
        );
    }

    public function updateStatus(string $roomId, string $status): void
    {
        $this->db->update('rooms', ['status' => $status], ['id' => $roomId]);
    }

    public function ownerHasRoom(string $ownerUserId): bool
    {
        $exists = $this->db->createQueryBuilder()
            ->select('1')
            ->from('rooms', 'r')
            ->where('r.owner_user_id = :ownerUserId')
            ->setParameter('ownerUserId', $ownerUserId)
            ->setMaxResults(1)
            ->fetchOne();

        return $exists !== false;
    }

    public function delete(string $roomId): void
    {
        $this->db->delete('rooms', ['id' => $roomId]);
    }

    public function findById(string $roomId): ?RoomRecord
    {
        $row = $this->db->createQueryBuilder()
            ->select('r.id', 'r.invite_code', 'r.name', 'r.owner_user_id', 'owner.username AS owner_username', 'r.status', 'r.is_public', 'r.password_hash', 'r.invite_code_regenerated_at')
            ->from('rooms', 'r')
            ->innerJoin('r', 'users', 'owner', 'owner.id = r.owner_user_id')
            ->where('r.id = :roomId')
            ->setParameter('roomId', $roomId)
            ->fetchAssociative();

        return $row === false ? null : RoomRecord::fromRow($row);
    }

    public function findRoomIdByInviteCode(string $inviteCode): ?string
    {
        $roomId = $this->db->createQueryBuilder()
            ->select('r.id')
            ->from('rooms', 'r')
            ->where('r.invite_code = :inviteCode')
            ->setParameter('inviteCode', $inviteCode)
            ->fetchOne();

        return $roomId === false ? null : (string) $roomId;
    }

    public function inviteCodeExists(string $inviteCode): bool
    {
        $exists = $this->db->createQueryBuilder()
            ->select('1')
            ->from('rooms', 'r')
            ->where('r.invite_code = :inviteCode')
            ->setParameter('inviteCode', $inviteCode)
            ->fetchOne();

        return $exists !== false;
    }

    public function updateSettings(string $roomId, bool $isPublic, ?string $passwordHash): void
    {
        $this->db->update(
            'rooms',
            [
                'is_public' => $isPublic,
                'password_hash' => $passwordHash,
            ],
            ['id' => $roomId],
            ['is_public' => ParameterType::BOOLEAN, 'password_hash' => ParameterType::STRING, 'id' => ParameterType::STRING]
        );
    }

    public function rotateInviteCode(string $roomId, string $inviteCode): void
    {
        $this->db->update('rooms', [
            'invite_code' => $inviteCode,
            'invite_code_regenerated_at' => gmdate(DATE_ATOM),
        ], ['id' => $roomId]);
    }

    /**
     * @return list<array<string, mixed>>
     */
    public function listLobbies(string $visibility, string $passwordFilter, int $limit, int $offset): array
    {
        $qb = $this->db->createQueryBuilder()
            ->select(
                'r.id',
                'r.name',
                'r.status',
                'r.is_public',
                'r.owner_user_id',
                'r.invite_code',
                'r.created_at',
                'r.password_hash',
                "COALESCE(SUM(CASE WHEN rp.role <> 'spectator' THEN 1 ELSE 0 END), 0) AS players_count"
            )
            ->from('rooms', 'r')
            ->leftJoin('r', 'room_participants', 'rp', 'rp.room_id = r.id')
            ->groupBy('r.id', 'r.name', 'r.status', 'r.is_public', 'r.owner_user_id', 'r.invite_code', 'r.created_at', 'r.password_hash')
            ->orderBy('r.created_at', 'DESC')
            ->setMaxResults($limit)
            ->setFirstResult($offset);

        if ($visibility === 'public') {
            $qb->andWhere('r.is_public = true');
        } elseif ($visibility === 'private') {
            $qb->andWhere('r.is_public = false');
        }

        if ($passwordFilter === 'with_password') {
            $qb->andWhere('r.password_hash IS NOT NULL');
        } elseif ($passwordFilter === 'without_password') {
            $qb->andWhere('r.password_hash IS NULL');
        }

        $rows = $qb->fetchAllAssociative();

        return array_map(static fn (array $row): array => [
            'roomId' => (string) $row['id'],
            'name' => (string) $row['name'],
            'status' => (string) $row['status'],
            'isPublic' => BooleanNormalizer::fromMixed($row['is_public'] ?? null, true),
            'ownerUserId' => (string) $row['owner_user_id'],
            'hasPassword' => !empty($row['password_hash']),
            'playersCount' => (int) $row['players_count'],
            'inviteCode' => (string) $row['invite_code'],
            'createdAt' => (string) $row['created_at'],
        ], $rows);
    }
}
