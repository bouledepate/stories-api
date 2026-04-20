<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateInitialSchema extends AbstractMigration
{
    public function change(): void
    {
        $this->table('users', ['id' => false, 'primary_key' => ['id']])
            ->addColumn('id', 'string', ['limit' => 64])
            ->addColumn('username', 'string', ['limit' => 64])
            ->addColumn('password_hash', 'string', ['limit' => 255])
            ->addColumn('role', 'string', ['limit' => 32])
            ->addColumn('created_at', 'string', ['limit' => 64])
            ->addIndex(['username'], ['unique' => true])
            ->create();

        $this->table('user_stats', ['id' => false, 'primary_key' => ['user_id']])
            ->addColumn('user_id', 'string', ['limit' => 64])
            ->addColumn('wins', 'integer', ['default' => 0])
            ->addColumn('losses', 'integer', ['default' => 0])
            ->addColumn('victory_tokens', 'integer', ['default' => 0])
            ->addColumn('eliminated_with_3', 'integer', ['default' => 0])
            ->addForeignKey('user_id', 'users', 'id', ['delete' => 'CASCADE'])
            ->create();

        $this->table('cards')
            ->addColumn('deck', 'string', ['limit' => 32])
            ->addColumn('code', 'string', ['limit' => 64])
            ->addColumn('name', 'string', ['limit' => 128])
            ->addColumn('text', 'text')
            ->addColumn('value', 'integer', ['null' => true])
            ->addColumn('effect_key', 'string', ['limit' => 128])
            ->addColumn('enabled', 'boolean', ['default' => true])
            ->addColumn('version', 'integer', ['default' => 1])
            ->addIndex(['deck', 'code'], ['unique' => true])
            ->create();

        $this->table('rooms', ['id' => false, 'primary_key' => ['id']])
            ->addColumn('id', 'string', ['limit' => 64])
            ->addColumn('invite_code', 'string', ['limit' => 32])
            ->addColumn('name', 'string', ['limit' => 128])
            ->addColumn('owner_user_id', 'string', ['limit' => 64])
            ->addColumn('status', 'string', ['limit' => 32])
            ->addColumn('created_at', 'string', ['limit' => 64])
            ->addIndex(['invite_code'], ['unique' => true])
            ->addForeignKey('owner_user_id', 'users', 'id')
            ->create();

        $this->table('room_participants', ['id' => false, 'primary_key' => ['room_id', 'user_id']])
            ->addColumn('room_id', 'string', ['limit' => 64])
            ->addColumn('user_id', 'string', ['limit' => 64])
            ->addColumn('role', 'string', ['limit' => 32])
            ->addColumn('ready', 'boolean', ['default' => false])
            ->addColumn('joined_at', 'string', ['limit' => 64])
            ->addForeignKey('room_id', 'rooms', 'id', ['delete' => 'CASCADE'])
            ->addForeignKey('user_id', 'users', 'id', ['delete' => 'CASCADE'])
            ->create();

        $this->table('games', ['id' => false, 'primary_key' => ['id']])
            ->addColumn('id', 'string', ['limit' => 64])
            ->addColumn('room_id', 'string', ['limit' => 64])
            ->addColumn('status', 'string', ['limit' => 32])
            ->addColumn('decree_rounds_used', 'integer', ['default' => 0])
            ->addColumn('state_json', 'text')
            ->addColumn('created_at', 'string', ['limit' => 64])
            ->addIndex(['room_id'], ['unique' => true])
            ->addForeignKey('room_id', 'rooms', 'id', ['delete' => 'CASCADE'])
            ->create();
    }
}
