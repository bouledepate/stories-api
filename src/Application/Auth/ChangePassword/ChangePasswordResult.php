<?php

declare(strict_types=1);

namespace Stories\Application\Auth\ChangePassword;

final class ChangePasswordResult
{
    public function __construct(public readonly string $message)
    {
    }

    /** @return array{message:string} */
    public function toArray(): array
    {
        return ['message' => $this->message];
    }
}
