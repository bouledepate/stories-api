<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class AddLobbyVisibilityAndPassword extends AbstractMigration
{
    public function change(): void
    {
        $table = $this->table('rooms');

        if (!$table->hasColumn('is_public')) {
            $table->addColumn('is_public', 'boolean', ['default' => true]);
        }

        if (!$table->hasColumn('password_hash')) {
            $table->addColumn('password_hash', 'string', ['limit' => 255, 'null' => true]);
        }

        $table->update();
    }
}
