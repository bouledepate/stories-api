<?php

declare(strict_types=1);

namespace Stories\Application\Auth\Register;

final class RegisterResult
{
    public function __construct(
        public readonly string $accessToken,
        public readonly string $tokenType = 'bearer',
    ) {
    }

    /** @return array{accessToken:string,tokenType:string} */
    public function toArray(): array
    {
        return [
            'accessToken' => $this->accessToken,
            'tokenType' => $this->tokenType,
        ];
    }
}
