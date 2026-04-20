<?php

declare(strict_types=1);

namespace Stories\Shared\Http;

enum ApiErrorCode: string
{
    case INVALID_CREDENTIALS = 'INVALID_CREDENTIALS';
    case USER_EXISTS = 'USER_EXISTS';
    case NO_FIELDS_TO_UPDATE = 'NO_FIELDS_TO_UPDATE';
    case USER_NOT_FOUND = 'USER_NOT_FOUND';
    case MISSING_BEARER_TOKEN = 'MISSING_BEARER_TOKEN';
    case INVALID_TOKEN_FORMAT = 'INVALID_TOKEN_FORMAT';
    case INVALID_TOKEN_SIGNATURE = 'INVALID_TOKEN_SIGNATURE';
    case INVALID_TOKEN_PAYLOAD = 'INVALID_TOKEN_PAYLOAD';
    case TOKEN_EXPIRED = 'TOKEN_EXPIRED';
    case INVITE_CODE_NOT_FOUND = 'INVITE_CODE_NOT_FOUND';
    case ONLY_OWNER_CAN_START_GAME = 'ONLY_OWNER_CAN_START_GAME';
    case NEED_READY_PLAYERS = 'NEED_READY_PLAYERS';
    case USER_NOT_IN_ROOM = 'USER_NOT_IN_ROOM';
    case ROOM_NOT_FOUND = 'ROOM_NOT_FOUND';
    case GAME_NOT_STARTED = 'GAME_NOT_STARTED';
    case DECK_NOT_FOUND = 'DECK_NOT_FOUND';
    case CARD_NOT_FOUND = 'CARD_NOT_FOUND';
    case ADMIN_ROLE_REQUIRED = 'ADMIN_ROLE_REQUIRED';
    case VALIDATION_ERROR = 'VALIDATION_ERROR';
    case UNKNOWN_ERROR = 'UNKNOWN_ERROR';

    public static function fromMessage(string $message): self
    {
        return match (true) {
            $message === 'Invalid credentials',
            str_contains($message, 'Invalid credentials') => self::INVALID_CREDENTIALS,

            $message === 'Username already exists',
            str_contains($message, 'Username already exists') => self::USER_EXISTS,

            $message === 'No fields to update',
            str_contains($message, 'No fields to update') => self::NO_FIELDS_TO_UPDATE,

            $message === 'User not found',
            str_contains($message, 'User not found') => self::USER_NOT_FOUND,

            $message === 'Missing bearer token',
            str_contains($message, 'Missing bearer token') => self::MISSING_BEARER_TOKEN,

            $message === 'Invalid token format',
            str_contains($message, 'Invalid token format') => self::INVALID_TOKEN_FORMAT,

            $message === 'Invalid token signature',
            str_contains($message, 'Invalid token signature') => self::INVALID_TOKEN_SIGNATURE,

            $message === 'Invalid token payload',
            str_contains($message, 'Invalid token payload') => self::INVALID_TOKEN_PAYLOAD,

            $message === 'Token expired',
            str_contains($message, 'Token expired') => self::TOKEN_EXPIRED,

            $message === 'Invite code not found',
            str_contains($message, 'Invite code not found') => self::INVITE_CODE_NOT_FOUND,

            $message === 'Only owner can start game',
            str_contains($message, 'Only owner can start game') => self::ONLY_OWNER_CAN_START_GAME,

            $message === 'Need at least 2 ready players',
            str_contains($message, 'Need at least 2 ready players') => self::NEED_READY_PLAYERS,

            $message === 'User is not in room',
            str_contains($message, 'User is not in room') => self::USER_NOT_IN_ROOM,

            $message === 'Room not found',
            str_contains($message, 'Room not found') => self::ROOM_NOT_FOUND,

            $message === 'Game not started',
            str_contains($message, 'Game not started') => self::GAME_NOT_STARTED,

            $message === 'Deck not found',
            str_contains($message, 'Deck not found') => self::DECK_NOT_FOUND,

            $message === 'Card not found',
            str_contains($message, 'Card not found') => self::CARD_NOT_FOUND,

            $message === 'Admin role required',
            str_contains($message, 'Admin role required') => self::ADMIN_ROLE_REQUIRED,

            str_contains(strtolower($message), 'validation') => self::VALIDATION_ERROR,
            default => self::UNKNOWN_ERROR,
        };
    }
}
