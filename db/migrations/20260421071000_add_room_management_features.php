<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class AddRoomManagementFeatures extends AbstractMigration
{
    public function change(): void
    {
        $this->table('rooms')
            ->addColumn('invite_code_regenerated_at', 'string', ['limit' => 64, 'null' => true, 'default' => null])
            ->update();

        $this->table('room_bans', ['id' => false, 'primary_key' => ['room_id', 'user_id']])
            ->addColumn('room_id', 'string', ['limit' => 64])
            ->addColumn('user_id', 'string', ['limit' => 64])
            ->addColumn('blocked_by_user_id', 'string', ['limit' => 64])
            ->addColumn('blocked_at', 'string', ['limit' => 64])
            ->addForeignKey('room_id', 'rooms', 'id', ['delete' => 'CASCADE'])
            ->addForeignKey('user_id', 'users', 'id', ['delete' => 'CASCADE'])
            ->addForeignKey('blocked_by_user_id', 'users', 'id', ['delete' => 'CASCADE'])
            ->create();
    }
}
