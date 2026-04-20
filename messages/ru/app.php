<?php

declare(strict_types=1);

return [
    'error.INVALID_CREDENTIALS' => 'Неверный логин или пароль.',
    'error.USER_EXISTS' => 'Имя пользователя уже занято.',
    'error.CURRENT_PASSWORD_INVALID' => 'Текущий пароль указан неверно.',
    'error.NO_FIELDS_TO_UPDATE' => 'Нет полей для обновления.',
    'error.USER_NOT_FOUND' => 'Пользователь не найден.',
    'error.MISSING_BEARER_TOKEN' => 'Отсутствует Bearer токен.',
    'error.INVALID_TOKEN_FORMAT' => 'Некорректный формат токена.',
    'error.INVALID_TOKEN_SIGNATURE' => 'Некорректная подпись токена.',
    'error.INVALID_TOKEN_PAYLOAD' => 'Некорректное содержимое токена.',
    'error.INVALID_TOKEN_CLAIMS' => 'Некорректные claims токена.',
    'error.TOKEN_EXPIRED' => 'Срок действия токена истёк.',
    'error.INVITE_CODE_NOT_FOUND' => 'Invite-код не найден.',
    'error.ROOM_PASSWORD_REQUIRED' => 'Для этого лобби требуется пароль.',
    'error.ROOM_PASSWORD_INVALID' => 'Неверный пароль лобби.',
    'error.ONLY_OWNER_CAN_START_GAME' => 'Запустить игру может только владелец комнаты.',
    'error.NEED_READY_PLAYERS' => 'Нужно минимум 2 готовых игрока.',
    'error.USER_NOT_IN_ROOM' => 'Пользователь не находится в комнате.',
    'error.ROOM_NOT_FOUND' => 'Комната не найдена.',
    'error.GAME_NOT_STARTED' => 'Игра ещё не началась.',
    'error.NOT_YOUR_TURN' => 'Сейчас не ваш ход.',
    'error.CARD_CODE_REQUIRED' => 'Для действия play_character нужен cardCode.',
    'error.CARD_NOT_IN_HAND' => 'Карты нет в руке.',
    'error.INVITE_CODE_GENERATION_FAILED' => 'Не удалось сгенерировать invite-код.',
    'error.DECK_NOT_FOUND' => 'Колода не найдена.',
    'error.CARD_NOT_FOUND' => 'Карта не найдена.',
    'error.ADMIN_ROLE_REQUIRED' => 'Требуется роль администратора.',
    'error.VALIDATION_ERROR' => 'Ошибка валидации.',
    'error.UNKNOWN_ERROR' => 'Неизвестная ошибка.',
];
