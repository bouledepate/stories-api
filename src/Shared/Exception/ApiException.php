<?php

declare(strict_types=1);

namespace Stories\Shared\Exception;

use RuntimeException;
use Stories\Shared\Http\ApiErrorCode;

final class ApiException extends RuntimeException
{
    public function __construct(
        public readonly ApiErrorCode $errorCode,
        ?string $message = null
    ) {
        parent::__construct($message ?? $errorCode->value);
    }
}
