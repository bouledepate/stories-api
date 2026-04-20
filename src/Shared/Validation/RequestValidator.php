<?php

declare(strict_types=1);

namespace Stories\Shared\Validation;

use Yiisoft\Validator\Rule\BooleanValue;
use Yiisoft\Validator\Rule\In;
use Yiisoft\Validator\Rule\Length;
use Yiisoft\Validator\Rule\Regex;
use Yiisoft\Validator\Rule\Required;
use Yiisoft\Validator\Rule\StringValue;
use Yiisoft\Validator\Validator;

final class RequestValidator
{
    public function __construct(private readonly Validator $validator)
    {
    }

    /** @param array<string, mixed> $payload */
    /** @return array<string, list<string>> */
    public function validate(string $key, array $payload): array
    {
        return match ($key) {
            'POST /auth/register' => $this->validateRegister($payload),
            'POST /auth/login' => $this->validateLogin($payload),
            'PATCH /auth/me' => $this->validateUpdateProfile($payload),
            'POST /rooms' => $this->validateCreateRoom($payload),
            'POST /rooms/join-by-code' => $this->validateJoinByCode($payload),
            'POST /rooms/{roomId}/ready' => $this->validateReady($payload),
            'POST /rooms/{roomId}/actions' => $this->validateAction($payload),
            default => [],
        };
    }

    /** @param array<string, mixed> $payload */
    /** @return array<string, list<string>> */
    private function validateRegister(array $payload): array
    {
        return $this->collect([
            'username' => [$payload['username'] ?? null, [new Required(), new StringValue(), new Length(min: 3, max: 32)]],
            'password' => [$payload['password'] ?? null, [new Required(), new StringValue(), new Length(min: 6)]],
        ]);
    }

    /** @param array<string, mixed> $payload */
    /** @return array<string, list<string>> */
    private function validateLogin(array $payload): array
    {
        return $this->collect([
            'username' => [$payload['username'] ?? null, [new Required(), new StringValue(), new Length(min: 1)]],
            'password' => [$payload['password'] ?? null, [new Required(), new StringValue(), new Length(min: 1)]],
        ]);
    }

    /** @param array<string, mixed> $payload */
    /** @return array<string, list<string>> */
    private function validateUpdateProfile(array $payload): array
    {
        $errors = [];

        $hasUsername = array_key_exists('username', $payload);
        $hasPassword = array_key_exists('password', $payload);
        if (!$hasUsername && !$hasPassword) {
            $errors['_schema'][] = 'At least one field is required: username or password.';

            return $errors;
        }

        if ($hasUsername) {
            $messages = $this->validator->validate(
                $payload['username'],
                [new StringValue(), new Length(min: 3, max: 32)]
            )->getErrorMessages();

            if ($messages !== []) {
                $errors['username'] = $messages;
            }
        }

        if ($hasPassword) {
            $messages = $this->validator->validate(
                $payload['password'],
                [new StringValue(), new Length(min: 6)]
            )->getErrorMessages();

            if ($messages !== []) {
                $errors['password'] = $messages;
            }
        }

        return $errors;
    }

    /** @param array<string, mixed> $payload */
    /** @return array<string, list<string>> */
    private function validateCreateRoom(array $payload): array
    {
        return $this->collect([
            'name' => [$payload['name'] ?? null, [new Required(), new StringValue(), new Length(min: 3, max: 64)]],
        ]);
    }

    /** @param array<string, mixed> $payload */
    /** @return array<string, list<string>> */
    private function validateJoinByCode(array $payload): array
    {
        $errors = $this->collect([
            'inviteCode' => [
                $payload['inviteCode'] ?? null,
                [new Required(), new StringValue(), new Regex('/^[A-Za-z0-9]{6}$/')],
            ],
        ]);

        if (array_key_exists('spectator', $payload)) {
            $messages = $this->validator->validate($payload['spectator'], [new BooleanValue()])->getErrorMessages();
            if ($messages !== []) {
                $errors['spectator'] = $messages;
            }
        }

        return $errors;
    }

    /** @param array<string, mixed> $payload */
    /** @return array<string, list<string>> */
    private function validateReady(array $payload): array
    {
        return $this->collect([
            'ready' => [$payload['ready'] ?? null, [new Required(), new BooleanValue()]],
        ]);
    }

    /** @param array<string, mixed> $payload */
    /** @return array<string, list<string>> */
    private function validateAction(array $payload): array
    {
        $errors = $this->collect([
            'actionType' => [
                $payload['actionType'] ?? null,
                [new Required(), new StringValue(), new In(['draw_character', 'play_character', 'pass_turn'])],
            ],
        ]);

        if (array_key_exists('cardCode', $payload) && $payload['cardCode'] !== null) {
            $messages = $this->validator->validate($payload['cardCode'], [new StringValue(), new Length(min: 1, max: 64)])->getErrorMessages();
            if ($messages !== []) {
                $errors['cardCode'] = $messages;
            }
        }

        return $errors;
    }

    /** @param array<string, array{0:mixed,1:list<object>}> $rulesByField */
    /** @return array<string, list<string>> */
    private function collect(array $rulesByField): array
    {
        $errors = [];
        foreach ($rulesByField as $field => [$value, $rules]) {
            $messages = $this->validator->validate($value, $rules)->getErrorMessages();
            if ($messages !== []) {
                $errors[$field] = $messages;
            }
        }

        return $errors;
    }
}
