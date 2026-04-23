<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class AddRoomCapacity extends AbstractMigration
{
    public function change(): void
    {
        $this->table('rooms')
            ->addColumn('max_players', 'integer', ['default' => 6, 'null' => false])
            ->update();
    }
}
