<?php

declare(strict_types=1);

namespace Stories\Shared\Http;

use Stories\Shared\Exception\ApiException;
use Throwable;

enum ApiErrorCode: string
{
    case INVALID_CREDENTIALS = 'INVALID_CREDENTIALS';
    case USER_EXISTS = 'USER_EXISTS';
    case CURRENT_PASSWORD_INVALID = 'CURRENT_PASSWORD_INVALID';
    case PASSWORD_CHANGED = 'PASSWORD_CHANGED';
    case NO_FIELDS_TO_UPDATE = 'NO_FIELDS_TO_UPDATE';
    case USER_NOT_FOUND = 'USER_NOT_FOUND';
    case MISSING_BEARER_TOKEN = 'MISSING_BEARER_TOKEN';
    case INVALID_TOKEN_FORMAT = 'INVALID_TOKEN_FORMAT';
    case INVALID_TOKEN_SIGNATURE = 'INVALID_TOKEN_SIGNATURE';
    case INVALID_TOKEN_PAYLOAD = 'INVALID_TOKEN_PAYLOAD';
    case INVALID_TOKEN_CLAIMS = 'INVALID_TOKEN_CLAIMS';
    case TOKEN_EXPIRED = 'TOKEN_EXPIRED';
    case INVITE_CODE_NOT_FOUND = 'INVITE_CODE_NOT_FOUND';
    case ONLY_OWNER_CAN_START_GAME = 'ONLY_OWNER_CAN_START_GAME';
    case NEED_READY_PLAYERS = 'NEED_READY_PLAYERS';
    case USER_NOT_IN_ROOM = 'USER_NOT_IN_ROOM';
    case ROOM_NOT_FOUND = 'ROOM_NOT_FOUND';
    case GAME_NOT_STARTED = 'GAME_NOT_STARTED';
    case NOT_YOUR_TURN = 'NOT_YOUR_TURN';
    case CARD_CODE_REQUIRED = 'CARD_CODE_REQUIRED';
    case CARD_NOT_IN_HAND = 'CARD_NOT_IN_HAND';
    case INVITE_CODE_GENERATION_FAILED = 'INVITE_CODE_GENERATION_FAILED';
    case DECK_NOT_FOUND = 'DECK_NOT_FOUND';
    case CARD_NOT_FOUND = 'CARD_NOT_FOUND';
    case ADMIN_ROLE_REQUIRED = 'ADMIN_ROLE_REQUIRED';
    case VALIDATION_ERROR = 'VALIDATION_ERROR';
    case UNKNOWN_ERROR = 'UNKNOWN_ERROR';

    public static function fromThrowable(Throwable $throwable): self
    {
        if ($throwable instanceof ApiException) {
            return $throwable->errorCode;
        }

        return self::UNKNOWN_ERROR;
    }
}
