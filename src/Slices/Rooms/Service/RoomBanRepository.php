<?php

declare(strict_types=1);

namespace Stories\Slices\Rooms\Service;

use Doctrine\DBAL\Connection;

final class RoomBanRepository
{
    public function __construct(private readonly Connection $db)
    {
    }

    public function isBanned(string $roomId, string $userId): bool
    {
        $exists = $this->db->createQueryBuilder()
            ->select('1')
            ->from('room_bans', 'rb')
            ->where('rb.room_id = :roomId')
            ->andWhere('rb.user_id = :userId')
            ->setParameter('roomId', $roomId)
            ->setParameter('userId', $userId)
            ->fetchOne();

        return $exists !== false;
    }

    public function ban(string $roomId, string $userId, string $blockedByUserId): void
    {
        $builder = $this->db->createQueryBuilder();
        $builder
            ->insert('room_bans')
            ->values([
                'room_id' => ':roomId',
                'user_id' => ':userId',
                'blocked_by_user_id' => ':blockedByUserId',
                'blocked_at' => ':blockedAt',
            ])
            ->setParameter('roomId', $roomId)
            ->setParameter('userId', $userId)
            ->setParameter('blockedByUserId', $blockedByUserId)
            ->setParameter('blockedAt', gmdate(DATE_ATOM));

        $sql = $builder->getSQL() . ' ON CONFLICT(room_id, user_id) DO UPDATE SET blocked_at = excluded.blocked_at, blocked_by_user_id = excluded.blocked_by_user_id';
        $this->db->executeStatement($sql, $builder->getParameters());
    }
}
