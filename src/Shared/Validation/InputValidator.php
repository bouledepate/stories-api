<?php

declare(strict_types=1);

namespace Stories\Shared\Validation;

use InvalidArgumentException;
use Yiisoft\Validator\Validator;

final class InputValidator
{
    public function __construct(private readonly Validator $validator)
    {
    }

    public function validate(object $input): void
    {
        $result = $this->validator->validate($input);
        if ($result->isValid()) {
            return;
        }

        $messagesByField = $result->getFirstErrorMessagesIndexedByProperty();
        $parts = [];
        foreach ($messagesByField as $field => $message) {
            $parts[] = sprintf('%s: %s', $field, $message);
        }

        throw new InvalidArgumentException($parts === [] ? 'Validation failed' : implode('; ', $parts));
    }
}
