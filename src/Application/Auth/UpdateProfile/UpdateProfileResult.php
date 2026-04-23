<?php

declare(strict_types=1);

namespace Stories\Application\Auth\UpdateProfile;

final class UpdateProfileResult
{
    public function __construct(
        public readonly string $id,
        public readonly string $username,
        public readonly string $role,
    ) {
    }

    /** @return array{id:string,username:string,role:string} */
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'username' => $this->username,
            'role' => $this->role,
        ];
    }
}
