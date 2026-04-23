<?php

declare(strict_types=1);

namespace Stories\Shared\Error;

use RuntimeException;
use Stories\Shared\Error\ApiErrorCode;

final class ApiException extends RuntimeException
{
    public function __construct(
        public readonly ApiErrorCode $errorCode,
        ?string $message = null
    ) {
        parent::__construct($message ?? $errorCode->value);
    }
}
