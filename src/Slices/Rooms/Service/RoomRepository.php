<?php

declare(strict_types=1);

namespace Stories\Slices\Rooms\Service;

use Doctrine\DBAL\Connection;

final class RoomRepository
{
    public function __construct(private readonly Connection $db)
    {
    }

    public function create(string $roomId, string $inviteCode, string $name, string $ownerUserId): void
    {
        $this->db->insert('rooms', [
            'id' => $roomId,
            'invite_code' => $inviteCode,
            'name' => $name,
            'owner_user_id' => $ownerUserId,
            'status' => 'lobby',
            'created_at' => gmdate(DATE_ATOM),
        ]);
    }

    public function updateStatus(string $roomId, string $status): void
    {
        $this->db->update('rooms', ['status' => $status], ['id' => $roomId]);
    }

    public function findById(string $roomId): ?RoomRecord
    {
        $row = $this->db->createQueryBuilder()
            ->select('r.id', 'r.invite_code', 'r.name', 'r.owner_user_id', 'r.status')
            ->from('rooms', 'r')
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
}
