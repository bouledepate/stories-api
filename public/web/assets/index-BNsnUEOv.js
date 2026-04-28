(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const c of n)if(c.type==="childList")for(const d of c.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function s(n){const c={};return n.integrity&&(c.integrity=n.integrity),n.referrerPolicy&&(c.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?c.credentials="include":n.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(n){if(n.ep)return;n.ep=!0;const c=s(n);fetch(n.href,c)}})();const Ge={ru:{appTag:"Stories",title:"Control Center",subtitle:"Комнаты и профиль в одном месте.",login:"Вход",register:"Регистрация",logout:"Выйти",notAuthorized:"Не авторизованы",signedAs:"Вы вошли как",navHome:"Комнаты",navProfile:"Профиль",navLobbies:"Лобби",openAuth:"Войти / Регистрация",close:"Закрыть",cancel:"Отмена",authTitle:"Авторизация",authHint:"Откройте аккаунт или войдите в существующий.",username:"Имя пользователя",password:"Пароль",createAccount:"Создать аккаунт",loginSuccess:"Успешный вход.",registerSuccess:"Аккаунт создан и выполнен вход.",homeNeedAuth:"Выполните вход для доступа к комнатам.",roomsTitle:"Комнаты",createRoom:"Создать комнату",roomName:"Название комнаты",connectCode:"Войти по invite-коду",connect:"Подключиться",spectator:"Зайти как spectator",ready:"",roomCreated:"Комната создана. Invite code:",roomJoinSuccess:"Подключение успешно. Room:",profileTitle:"Профиль пользователя",profileEdit:"Редактирование",newPassword:"Новый пароль (опционально)",saveProfile:"Сохранить профиль",stats:"Статистика",needAuthProfile:"Сначала авторизуйтесь.",profileUpdated:"Профиль обновлен.",passwordChanged:"Пароль успешно изменён.",currentPassword:"Текущий пароль",nextPassword:"Новый пароль",changePassword:"Сменить пароль",wins:"Победы",losses:"Поражения",vt:"Victory tokens",elim3:"Eliminated with 3",healthError:"Ошибка",unknownError:"Неизвестная ошибка",httpError:"Ошибка HTTP {status}",invalidCredentials:"Неверный логин или пароль.",currentPasswordInvalid:"Текущий пароль указан неверно.",userExists:"Такой username уже занят.",unauthorized:"Требуется авторизация.",forbidden:"Недостаточно прав.",roomNotFound:"Комната не найдена.",inviteInvalid:"Некорректный invite-код.",validationFailed:"Проверьте корректность введенных данных.",serverUnavailable:"Сервер временно недоступен. Повторите позже.",invalidUrl:"Некорректный URL.",roomPasswordRequired:"Для входа в это лобби нужен пароль.",roomPasswordInvalid:"Неверный пароль лобби.",roomIsFull:"Комната заполнена. Войти можно только как зритель.",ownerAlreadyHasRoom:"У вас уже есть активная комната. Закройте её перед созданием новой.",userAlreadyHasActiveRoom:"Сначала выйдите из текущей комнаты, чтобы войти в другую.",heroTitle:"Stories: project-visual landing",heroSubtitle:"Создавайте публичные комнаты для каталога или приватные комнаты по invite-коду.",heroCreate:"Создать комнату",heroJoin:"Присоединиться",roomDetails:"Текущая комната",roomCode:"Код приглашения",roomOwner:"Владелец",roomOwnerName:"Ник владельца",roomParticipants:"Участники",roomSpectators:"Зрители",roomActions:"Действия с комнатой",leaveRoom:"Покинуть комнату",closeOwnedRoom:"Закрыть комнату",markReady:"Я готов",markNotReady:"Не готов",noFieldsToUpdate:"Нет полей для обновления.",userNotFound:"Пользователь не найден.",userNotInRoom:"Пользователь не находится в комнате.",inviteCodeGenerationFailed:"Не удалось сгенерировать invite-код.",onlyOwnerCanManageRoom:"Только владелец может управлять комнатой.",ownerCannotBeRemoved:"Владельца нельзя кикнуть или заблокировать.",cannotTransferOwnershipToSelf:"Нельзя передать владение самому себе.",onlyPlayersCanBeKicked:"Кик доступен только для игроков.",inviteRotateCooldown:"Invite-код можно пересоздавать не чаще одного раза в минуту.",youLabel:"вы",authRequiredAction:"Для этого действия войдите в аккаунт.",switchToLogin:"Уже есть аккаунт? Войти",switchToRegister:"Нет аккаунта? Регистрация",themeDark:"Тёмная",themeLight:"Светлая",lobbyTitle:"Список лобби",lobbyHint:"Фильтруйте публичные и закрытые лобби.",visibilityAll:"Все",visibilityPublic:"Публичные",visibilityPrivate:"Приватная",passwordAll:"Любые",passwordWith:"С паролем",passwordWithout:"Без пароля",loadLobbies:"Обновить список",lobbyNoItems:"Лобби не найдены",lobbyHasPassword:"Пароль",lobbyNoPassword:"Без пароля",joinLobby:"Войти в лобби",roomPassword:"Пароль комнаты",roomPasswordOptional:"Пароль комнаты (необязательно)",availableRooms:"Доступные комнаты",myRooms:"Мои комнаты",openRoom:"Открыть",joinHint:"Введите invite-код. Приватные комнаты доступны только так.",statusReady:"Статус: готов.",statusNotReady:"Статус: не готов.",joinPasswordHint:"Для этой комнаты нужен пароль. Invite-код сам по себе не заменяет пароль.",joinWithoutPasswordHint:"Это лобби без пароля. Подтвердите вход.",joinPublicLobbyHint:"Публичная комната без пароля. Подтвердите вход.",requiredField:"Заполните обязательное поле.",inviteCodeInvalid:"Введите корректный invite-код (6 символов).",roomManage:"Управление комнатой",roomManageTitle:"Настройки комнаты",saveRoomSettings:"Сохранить настройки",regenerateInvite:"Пересоздать код приглашения",kickPlayer:"Кик",banPlayer:"Блок",roomChat:"Чат комнаты",chatPlaceholder:"Введите сообщение...",send:"Отправить",roomSettingsSaved:"Настройки комнаты обновлены.",inviteRegenerated:"Invite-код обновлён.",blockedNotice:"Вы заблокированы в этой комнате.",kickedFromRoomNotice:"Вы были исключены из комнаты.",roleOwner:"Владелец",rolePlayer:"Игрок",roleSpectator:"Зритель",roleSystem:"Система",roomClosedNotice:"Комната была закрыта владельцем.",roomManageReadonly:"Только владелец может менять настройки комнаты.",appName:"Letters: No Mercy",appGenre:"Dark Medieval Stories",navRoomActive:"Комната",quickCreateRoom:"Новая комната",roleOwnerShort:"Владелец",rolePlayerShort:"Игрок",roleSpectatorShort:"Зритель",readyShort:"готов",notReadyShort:"не готов",systemJoinedRoom:"{username} вошёл в комнату.",systemLeftRoom:"{username} вышел из комнаты.",systemUnknownUser:"Игрок",transferOwnership:"Передать владельца",ownershipTransferred:"Владелец комнаты изменён.",joinCurrentRoom:"Вернуться в комнату",closeAndJoinRoom:"Закрыть и войти",leaveAndJoinRoom:"Выйти и войти",roomSwitchTitle:"Переход в другую комнату",roomSwitchLeaveHint:"Вы уже состоите в комнате. Сначала выйдите из неё, чтобы открыть «{target}».",roomSwitchCloseHint:"Вы владелец текущей комнаты. Сначала закройте её, чтобы открыть «{target}».",participantRemovedNotice:"Доступ к комнате был отозван.",kickSymbolLabel:"Кикнуть игрока",banSymbolLabel:"Заблокировать игрока",transferOwnershipSymbolLabel:"Передать владение",roomLiveSync:"Комната активна",roomVisibilityLabel:"Видимость",roomAccessLabel:"Доступ",roomStatsLabel:"Состав",roomSizeLabel:"Размер",roomProtected:"С паролем",roomOpenAccess:"Без пароля",roomVisibilityPublicToggle:"Показывать комнату в публичном каталоге",roomCreateAccessHint:"Публичные комнаты видны на главной и во вкладке лобби. Приватные комнаты не показываются в каталогах и открываются только по invite-коду.",roomPasswordHint:"Пароль добавляет дополнительную защиту поверх выбранного режима доступа.",roomSettingsHint:"Настройте публикацию комнаты, пароль и лимит игроков.",roomAccessPublicOpen:"Публичная, вход без пароля",roomAccessPublicProtected:"Публичная, вход по паролю",roomAccessPrivateCodeOnly:"Приватная, вход только по invite-коду",roomAccessPrivateProtected:"Приватная, invite-код и пароль",lobbyCatalogHint:"Здесь показываются только публичные комнаты. Приватные комнаты доступны только по invite-коду.",roomChatHint:"Здесь остаются системные события и сообщения игроков.",roomChatEmpty:"Чат пуст. Первое сообщение задаст тон партии.",selfMessageLabel:"Вы",participantOwnerBadge:"owner",participantReadyBadge:"ГОТОВ",participantNotReadyBadge:"НЕ ГОТОВ",roomSwitchAccent:"Сначала завершите текущую сессию комнаты.",roomSize:"Размер комнаты",roomSizeHelp:"От 2 до 6 игроков. Если мест нет, зайти можно только как зритель.",regenerateInviteShort:"♻",openRoomSettings:"Настройки комнаты",roomSettingsModalTitle:"Параметры комнаты",roomUpdatedSystem:"Параметры комнаты обновлены.",ownershipTransferredSystem:"{username} стал новым владельцем комнаты.",participantKickedSystem:"{username} исключён из комнаты.",participantBannedSystem:"{username} заблокирован в комнате.",startGame:"Начать игру",openActiveGame:"Перейти в игру",gameStarted:"Игра запущена.",leftGame:"Вы вышли из игры.",gameExitConfirm:"Выйти из игры и покинуть комнату?",gamePlayAgain:"Играть снова",gamePlayAgainOwnerOnly:"Новый матч может запустить только владелец комнаты.",gameFinalTitle:"Матч завершён",gameFinalStatsRounds:"Раундов сыграно",gameFinalStatsTarget:"Победных очков",gameFinalLeave:"Выйти",gameReturnToRoom:"Вернуться в комнату",gameFinalCardLabel:"Финальная карта",openMatchResults:"Итоги матча",gameNoActiveMatch:"Активный матч не найден.",gameLeaderboard:"Лидерборд",gameEvents:"Лог событий",activeDecrees:"Указы",noActiveDecrees:"Активных указов нет.",gameNoEvents:"Событий пока нет.",gameExitConfirmTitle:"Покинуть игру",kingPromptTitle:"Король",kingPromptConfirm:"Да, сбросить Короля",gameHandCount:"Карт в руке",gameDiscardCount:"Сброс",gameYourTurn:"Ваш ход",gameWaitTurn:"Ожидайте свой ход",gameMyTable:"Мой стол",gameNoCardsOnTable:"Пока пусто",gameStartRound:"Начать раунд",playedCardEvent:"разыграл карту {card}",autoPlayedOnLeaveEvent:"{actor} вышел из игры и автоматически разыграл карту: {card}.",autoDiscardOnTurnEvent:"{actor} вышел из игры и автоматически сбросил карту: {card}.",roundWinnerSummary:"Раунд {round}: победитель(и) {winners}",matchWinner:"Победитель матча: {winner}",gameDeck:"Колода",setAsideCardLabel:"Отложенная",setAsideHiddenHint:"Отложенная карта скрыта до конца раунда.",matchNotFound:"Матч не найден.",matchAlreadyExists:"Для этой комнаты уже есть активный матч.",matchAlreadyFinished:"Матч уже завершён.",notEnoughPlayersToStartMatch:"Для старта матча нужно минимум два игрока.",roundNotActive:"Раунд не активен.",roundAlreadyActive:"Раунд уже запущен.",notPlayerTurn:"Сейчас ход другого игрока.",playerNotInMatch:"Вы не участвуете в матче.",playerEliminated:"Вы выбыли из раунда.",cardNotInHand:"Этой карты нет в вашей руке.",targetPlayerRequired:"Сначала выберите цель.",targetPlayerInvalid:"Эту цель нельзя выбрать.",cardGuessRequired:"Нужно выбрать карту для угадывания.",cardGuessInvalid:"Указана недопустимая карта для угадывания.",guardCannotGuessGuard:"Стражника нельзя называть картой для угадывания.",peasantReactionOnly:"Крестьянина нельзя разыграть обычным ходом. Он играется только как реакция после промаха Стражника.",cardPlayBlocked:"Эту карту нельзя разыграть до вашего следующего хода.",kingSelfEliminateConfirm:"Если вы сбросите Короля, то сразу выбываете из раунда. Продолжить?",targetPlayerProtected:"Этого игрока сейчас защищает Дворянка.",matchStateInvalid:"Состояние матча повреждено.",playersNotReady:"Перед стартом игры все игроки должны нажать готовность.",allPlayersMustReadyHint:"Чтобы начать игру, в лобби должно быть минимум 2 игрока и все должны быть готовы.",waitingNextRound:"Ожидаем старт следующего раунда…",nextRoundIn:"Следующий раунд начнётся через {seconds}с…",newChatMessageNotice:"Новое сообщение в чате.",guardResolutionPending:"Идёт разрешение эффекта...",guardResolutionTitle:"Разрешение эффекта",guardResolutionHint:"Эффект Стражника завершён. Можно продолжать игру.",guardResolutionSummary:"Скрытая фаза завершения эффекта перед передачей хода.",guardResolutionConfirm:"Продолжить",guardPromptTitle:"Стражник",guardPromptHint:"Выберите другого игрока и попробуйте угадать его карту.",guardPromptTarget:"Цель",guardPromptGuess:"Предполагаемая карта",guardPromptConfirm:"Разыграть Стражника",guardPromptSummary:"Вы выбрали карту: {card}.",guardPromptSummaryEmpty:"Выберите карту для догадки.",guardTargetUnavailable:"Сейчас нет доступной цели для Стражника.",guardGuessRequired:"Выберите карту, которую хотите угадать.",guardHitEvent:"{actor} угадал карту {card} у {target}. Игрок выбывает.",guardMissEvent:"{actor} не угадал карту {card} у {target}.",decreeGuardHitEvent:"{actor} по указу угадал карту {card} у {target}. Игрок выбывает.",decreeGuardMissEvent:"{actor} по указу не угадал карту {card} у {target}.",decreeGuardCounterHitEvent:"{actor} назвал в ответ карту {card} у {target}. Игрок выбывает.",decreeGuardCounterMissEvent:"{actor} назвал в ответ карту {card} у {target}, но не угадал.",decreeNoTargetEvent:"{actor} разыграл карту {card} по указу, но подходящей цели не было.",suspicionCounterTitle:"Подозрения",suspicionCounterHint:"{target} не угадал карту. Теперь назовите карту в ответ.",suspicionCounterSummary:"Если карта будет угадана, из раунда выбывает игрок, разыгравший Стражника.",guardNoTargetEvent:"{actor} разыграл карту {card}, но подходящей цели не было.",peasantReactionTitle:"Крестьянин",peasantReactionHint:"Вы можете сыграть Крестьянина. Возьмите карту: если это будет {card}, вы выбываете.",peasantReactionSummary:"Эта реакция разыгрывается до передачи хода следующему игроку.",peasantReactionConfirm:"Сыграть Крестьянина",peasantReactionSkip:"Пропустить",peasantReactionSafeEvent:"{actor} сыграл карту {card} и пережил проверку.",peasantReactionEliminatedEvent:"{actor} сыграл карту {card}, взял загаданную карту и выбыл.",peasantReactionSkippedEvent:"{actor} решил не разыгрывать карту {card}.",guardMissResolvedEvent:"Эффект карты {card} завершён.",scoutPromptTitle:"Разведчик",scoutPromptHint:"Выберите игрока. Он не сможет разыграть текущую карту до своего следующего хода.",scoutPromptSummary:"Цель получит временный запрет на текущую карту в руке.",scoutPromptConfirm:"Разыграть Разведчика",scoutTargetUnavailable:"Сейчас нет доступной цели для Разведчика.",scoutLockEvent:"{actor} запретил {target} разыгрывать текущую карту до следующего хода.",scoutNoTargetEvent:"{actor} разыграл карту {card}, но подходящей цели не было.",cardLockedBadge:"запрет",executionerPromptTitle:"Палач",executionerPromptHint:"Выберите игрока. Он выбывает, если значение его карты меньше или равно 4.",executionerPromptSummary:"Цель выбывает только если её карта не старше 4.",executionerPromptConfirm:"Разыграть Палача",executionerTargetUnavailable:"Сейчас нет доступной цели для Палача.",executionerEliminateEvent:"{actor} казнил {target}: карта цели была не выше 4.",executionerSurviveEvent:"{actor} не смог казнить {target}: карта цели оказалась выше 4.",executionerNoTargetEvent:"{actor} разыграл карту {card}, но подходящей цели не было.",protectedBadge:"защита",ladyProtectionEvent:"{actor} разыграл карту {card} и получил защиту от эффектов других игроков до своего следующего хода.",blackRoseBadge:"чёрная роза",bishopTokenEvent:"{actor} разыграл карту {card} и положил на себя жетон Чёрная роза.",queenNoDecreeEvent:"{actor} разыграл карту {card}, но в этом раунде нет указов для Милости королевы.",queenDecreeSuppressedEvent:"{actor} разыграл карту {card} и заблокировал указ {decree} до конца раунда.",queenDecreePromptTitle:"Милость королевы",queenDecreePromptHint:"Выберите указ, который не будет действовать до конца раунда.",queenDecreePromptSummary:"Блокировка действует только в текущем раунде.",kingSelfEliminationEvent:"{actor} сбросил карту {card} и выбыл из раунда.",kingForcedEliminationEvent:"{target} сбросил карту {card} из-за эффекта {actor} и выбыл из раунда.",blackRoseSavedEvent:"{target} сбросил жетон Чёрная роза вместо карты {card} из-за эффекта {actor}.",rebelPromptTitle:"Мятежник",rebelPromptHint:"Выберите игрока. Он сбросит карту и доберёт новую. Можно выбрать и себя.",rebelPromptSummary:"Цель сбросит текущую карту и возьмёт новую из колоды, если она есть.",rebelPromptConfirm:"Разыграть Мятежника",rebelTargetUnavailable:"Сейчас нет доступной цели для Мятежника.",rebelRedrawEvent:"{actor} заставил {target} сбросить карту {card} и взять новую.",feudalPromptTitle:"Феодал",feudalPromptHint:"Выберите двух игроков. После этого вы увидите их карты и решите, менять их местами или нет.",feudalPromptTargets:"Две цели",feudalPromptSummary:"Для Феодала нужно выбрать двух разных игроков.",feudalPromptConfirm:"Посмотреть карты",feudalPromptNeedTwoTargets:"Для Феодала нужно выбрать двух разных игроков.",feudalResolveTitle:"Феодал: выбор обмена",feudalResolveHint:"Вы посмотрели обе карты. Теперь можно обменять их местами или оставить как есть.",feudalResolveSummary:"Это решение завершит эффект Феодала.",feudalSwapConfirm:"Поменять местами",feudalKeepConfirm:"Оставить как есть",feudalNoTargetEvent:"{actor} разыграл карту {card}, но двух доступных целей не было.",feudalInspectEvent:"{actor} разыграл карту {card} и посмотрел карты {firstTarget} и {secondTarget}.",feudalSwapEvent:"{actor} разыграл карту {card} и поменял местами карты {firstTarget} и {secondTarget}.",feudalKeepEvent:"{actor} разыграл карту {card} и решил не менять карты {firstTarget} и {secondTarget}."},en:{appTag:"Stories",title:"Control Center",subtitle:"Rooms and profile in one place.",login:"Sign in",register:"Sign up",logout:"Logout",notAuthorized:"Not authorized",signedAs:"Signed in as",navHome:"Rooms",navProfile:"Profile",navLobbies:"Lobbies",openAuth:"Login / Register",close:"Close",cancel:"Cancel",authTitle:"Authentication",authHint:"Create an account or sign in.",username:"Username",password:"Password",createAccount:"Create account",loginSuccess:"Signed in successfully.",registerSuccess:"Account created and signed in.",homeNeedAuth:"Sign in to access rooms.",roomsTitle:"Rooms",createRoom:"Create room",roomName:"Room name",connectCode:"Join by invite code",connect:"Connect",spectator:"Join as spectator",ready:"",roomCreated:"Room created. Invite code:",roomJoinSuccess:"Connected successfully. Room:",profileTitle:"User profile",profileEdit:"Edit profile",newPassword:"New password (optional)",saveProfile:"Save profile",stats:"Stats",needAuthProfile:"Sign in first.",profileUpdated:"Profile updated.",passwordChanged:"Password changed successfully.",currentPassword:"Current password",nextPassword:"New password",changePassword:"Change password",wins:"Wins",losses:"Losses",vt:"Victory tokens",elim3:"Eliminated with 3",healthError:"Error",unknownError:"Unknown error",httpError:"HTTP error {status}",invalidCredentials:"Invalid username or password.",currentPasswordInvalid:"Current password is invalid.",userExists:"This username is already taken.",unauthorized:"Authorization required.",forbidden:"Not enough permissions.",roomNotFound:"Room not found.",inviteInvalid:"Invalid invite code.",validationFailed:"Please check input values.",serverUnavailable:"Server is temporarily unavailable. Try again later.",invalidUrl:"Invalid URL.",roomPasswordRequired:"Lobby password is required.",roomPasswordInvalid:"Invalid lobby password.",roomIsFull:"Room is full. You can join only as spectator.",ownerAlreadyHasRoom:"You already have an active room. Close it before creating a new one.",userAlreadyHasActiveRoom:"Leave your current room before joining another one.",heroTitle:"Stories: project visual landing",heroSubtitle:"Create public rooms for the catalog or private rooms that open only by invite code.",heroCreate:"Create room",heroJoin:"Join room",roomDetails:"Current room",roomCode:"Invite code",roomOwner:"Owner",roomOwnerName:"Owner name",roomParticipants:"Participants",roomSpectators:"Spectators",roomActions:"Room actions",leaveRoom:"Leave room",closeOwnedRoom:"Close room",markReady:"Mark ready",markNotReady:"Mark not ready",noFieldsToUpdate:"No fields to update.",userNotFound:"User not found.",userNotInRoom:"User is not in room.",inviteCodeGenerationFailed:"Failed to generate invite code.",onlyOwnerCanManageRoom:"Only room owner can manage room.",ownerCannotBeRemoved:"Owner cannot be kicked or blocked.",cannotTransferOwnershipToSelf:"You cannot transfer ownership to yourself.",onlyPlayersCanBeKicked:"Only players can be kicked.",inviteRotateCooldown:"Invite code can be regenerated only once per minute.",youLabel:"you",authRequiredAction:"Please sign in to continue.",switchToLogin:"Already have an account? Sign in",switchToRegister:"No account yet? Sign up",themeDark:"Dark",themeLight:"Light",lobbyTitle:"Lobby list",lobbyHint:"Filter public and private lobbies.",visibilityAll:"All",visibilityPublic:"Public",visibilityPrivate:"Private",passwordAll:"Any",passwordWith:"With password",passwordWithout:"Without password",loadLobbies:"Refresh list",lobbyNoItems:"No lobbies found",lobbyHasPassword:"Password",lobbyNoPassword:"No password",joinLobby:"Join lobby",roomPassword:"Room password",roomPasswordOptional:"Room password (optional)",availableRooms:"Available rooms",myRooms:"My rooms",openRoom:"Open",joinHint:"Enter an invite code. Private rooms are available only this way.",statusReady:"Status: ready.",statusNotReady:"Status: not ready.",joinPasswordHint:"This room requires a password. Invite code does not replace it.",joinWithoutPasswordHint:"This lobby has no password. Confirm join.",joinPublicLobbyHint:"This public room has no password. Confirm join.",requiredField:"Please fill in the required field.",inviteCodeInvalid:"Enter a valid invite code (6 characters).",roomManage:"Room management",roomManageTitle:"Room settings",saveRoomSettings:"Save settings",regenerateInvite:"Regenerate invite code",kickPlayer:"Kick",banPlayer:"Block",roomChat:"Room chat",chatPlaceholder:"Type a message...",send:"Send",roomSettingsSaved:"Room settings updated.",inviteRegenerated:"Invite code regenerated.",blockedNotice:"You are blocked in this room.",kickedFromRoomNotice:"You were kicked from the room.",roleOwner:"Owner",rolePlayer:"Player",roleSpectator:"Spectator",roleSystem:"System",roomClosedNotice:"The room was closed by the owner.",roomManageReadonly:"Only the owner can change room settings.",appName:"Letters: No Mercy",appGenre:"Dark Medieval Stories",navRoomActive:"Room",quickCreateRoom:"New room",roleOwnerShort:"Owner",rolePlayerShort:"Player",roleSpectatorShort:"Spectator",readyShort:"ready",notReadyShort:"not ready",systemJoinedRoom:"{username} joined the room.",systemLeftRoom:"{username} left the room.",systemUnknownUser:"Player",transferOwnership:"Transfer ownership",ownershipTransferred:"Room ownership transferred.",joinCurrentRoom:"Return to room",closeAndJoinRoom:"Close and join",leaveAndJoinRoom:"Leave and join",roomSwitchTitle:"Join another room",roomSwitchLeaveHint:'You are already in a room. Leave it first to open "{target}".',roomSwitchCloseHint:'You own the current room. Close it first to open "{target}".',participantRemovedNotice:"Your access to the room was revoked.",kickSymbolLabel:"Kick player",banSymbolLabel:"Block player",transferOwnershipSymbolLabel:"Transfer ownership",roomLiveSync:"Room is active",roomVisibilityLabel:"Visibility",roomAccessLabel:"Access",roomStatsLabel:"Roster",roomSizeLabel:"Capacity",roomProtected:"Password protected",roomOpenAccess:"Open access",roomVisibilityPublicToggle:"Show room in the public catalog",roomCreateAccessHint:"Public rooms are visible on the home screen and in the lobby tab. Private rooms are hidden from catalogs and open only by invite code.",roomPasswordHint:"Password adds an extra lock on top of the selected access mode.",roomSettingsHint:"Tune room publication, password and player cap for the current session.",roomAccessPublicOpen:"Public, no password required",roomAccessPublicProtected:"Public, password required",roomAccessPrivateCodeOnly:"Private, invite code only",roomAccessPrivateProtected:"Private, invite code and password",lobbyCatalogHint:"Only public rooms are shown here. Private rooms are available only by invite code.",roomChatHint:"System events and player messages stay here.",roomChatEmpty:"Chat is empty. The first message sets the tone.",selfMessageLabel:"You",participantOwnerBadge:"owner",participantReadyBadge:"READY",participantNotReadyBadge:"WAITING",roomSwitchAccent:"Finish your current room session first.",roomSize:"Room size",roomSizeHelp:"From 2 to 6 players. When full, users can join only as spectators.",regenerateInviteShort:"♻",openRoomSettings:"Room settings",roomSettingsModalTitle:"Room settings",roomUpdatedSystem:"Room settings updated.",ownershipTransferredSystem:"{username} is now the room owner.",participantKickedSystem:"{username} was kicked from the room.",participantBannedSystem:"{username} was blocked in the room.",startGame:"Start game",openActiveGame:"Open game",gameStarted:"Game started.",leftGame:"You left the game.",gameExitConfirm:"Leave game and room?",gamePlayAgain:"Play again",gamePlayAgainOwnerOnly:"Only the room owner can start a new match.",gameFinalTitle:"Match finished",gameFinalStatsRounds:"Rounds played",gameFinalStatsTarget:"Victory points",gameFinalLeave:"Leave",gameReturnToRoom:"Return to room",gameFinalCardLabel:"Final card",openMatchResults:"Match results",gameNoActiveMatch:"No active match found.",gameLeaderboard:"Leaderboard",gameEvents:"Event log",activeDecrees:"Decrees",noActiveDecrees:"No active decrees.",gameNoEvents:"No events yet.",gameExitConfirmTitle:"Leave the game",kingPromptTitle:"King",kingPromptConfirm:"Yes, discard the King",gameHandCount:"Hand",gameDiscardCount:"Discard",gameYourTurn:"Your turn",gameWaitTurn:"Waiting for your turn",gameMyTable:"My table",gameNoCardsOnTable:"No cards yet",gameStartRound:"Start round",playedCardEvent:"played {card}",autoPlayedOnLeaveEvent:"{actor} left the game and auto-played a card: {card}.",autoDiscardOnTurnEvent:"{actor} left the game and auto-discarded a card: {card}.",roundWinnerSummary:"Round {round}: winner(s) {winners}",matchWinner:"Match winner: {winner}",gameDeck:"Deck",setAsideCardLabel:"Set Aside",setAsideHiddenHint:"Set-aside card is hidden until round end.",matchNotFound:"Match not found.",matchAlreadyExists:"An active match already exists for this room.",matchAlreadyFinished:"Match is already finished.",notEnoughPlayersToStartMatch:"At least two players are required to start a match.",roundNotActive:"Round is not active.",roundAlreadyActive:"Round is already active.",notPlayerTurn:"It is not your turn.",playerNotInMatch:"You are not in this match.",playerEliminated:"You are eliminated from this round.",cardNotInHand:"This card is not in your hand.",targetPlayerRequired:"Choose a target first.",targetPlayerInvalid:"This target cannot be selected.",cardGuessRequired:"Choose a card to guess.",cardGuessInvalid:"The guessed card is invalid.",guardCannotGuessGuard:"Guard cannot be named as the guessed card.",peasantReactionOnly:"Peasant cannot be played as a regular turn card. It is only played as a reaction after a Guard miss.",cardPlayBlocked:"This card cannot be played until your next turn.",kingSelfEliminateConfirm:"If you discard the King, you will be eliminated from the round. Continue?",targetPlayerProtected:"This player is currently protected by the Lady.",matchStateInvalid:"Match state is invalid.",playersNotReady:"All players must be ready before starting the game.",allPlayersMustReadyHint:"To start the game, lobby must have at least 2 players and all must be ready.",waitingNextRound:"Waiting for the next round to start…",nextRoundIn:"Next round starts in {seconds}s…",newChatMessageNotice:"New chat message.",guardResolutionPending:"Resolving effect…",guardResolutionTitle:"Effect resolution",guardResolutionHint:"The Guard effect is complete. The game can continue.",guardResolutionSummary:"A hidden resolution phase is finishing before the turn passes on.",guardResolutionConfirm:"Continue",peasantReactionTitle:"Peasant",peasantReactionHint:"You may play the Peasant. Draw a card: if it is {card}, you are eliminated.",peasantReactionSummary:"This reaction resolves before the turn passes to the next player.",peasantReactionConfirm:"Play Peasant",peasantReactionSkip:"Skip",peasantReactionSafeEvent:"{actor} played {card} and survived the check.",peasantReactionEliminatedEvent:"{actor} played {card}, drew the guessed card, and was eliminated.",peasantReactionSkippedEvent:"{actor} chose not to play {card}.",guardMissResolvedEvent:"The effect of {card} has been resolved.",decreeGuardHitEvent:"{actor} guessed {card} on {target} through a decree. The player is eliminated.",decreeGuardMissEvent:"{actor} failed to guess {card} on {target} through a decree.",decreeGuardCounterHitEvent:"{actor} named {card} in response against {target}. The player is eliminated.",decreeGuardCounterMissEvent:"{actor} named {card} in response against {target}, but missed.",decreeNoTargetEvent:"{actor} played {card} through a decree, but there was no available target.",suspicionCounterTitle:"Suspicion",suspicionCounterHint:"{target} missed the guess. Now name a card in response.",suspicionCounterSummary:"If the guess is correct, the player who played the Guard is eliminated.",feudalPromptTitle:"Feudal Lord",feudalPromptHint:"Choose two players. After that you will see their cards and decide whether to swap them.",feudalPromptTargets:"Two targets",feudalPromptSummary:"Feudal Lord requires two different players.",feudalPromptConfirm:"Reveal cards",feudalPromptNeedTwoTargets:"Feudal Lord requires two different players.",feudalResolveTitle:"Feudal Lord: swap decision",feudalResolveHint:"You have seen both cards. Now you may swap them or keep them as they are.",feudalResolveSummary:"This choice will finish the Feudal Lord effect.",feudalSwapConfirm:"Swap cards",feudalKeepConfirm:"Keep as is",feudalNoTargetEvent:"{actor} played {card}, but there were not enough available targets.",feudalInspectEvent:"{actor} played {card} and looked at the cards of {firstTarget} and {secondTarget}.",feudalSwapEvent:"{actor} played {card} and swapped the cards of {firstTarget} and {secondTarget}.",feudalKeepEvent:"{actor} played {card} and decided not to swap the cards of {firstTarget} and {secondTarget}.",blackRoseBadge:"black rose",bishopTokenEvent:"{actor} played {card} and placed a Black Rose token on themselves.",queenNoDecreeEvent:"{actor} played {card}, but there is no decree to suppress this round.",queenDecreeSuppressedEvent:"{actor} played {card} and suppressed decree {decree} until the end of the round.",queenDecreePromptTitle:"Queen Mercy",queenDecreePromptHint:"Choose a decree to suppress until the end of the round.",queenDecreePromptSummary:"The suppression only lasts for the current round.",kingSelfEliminationEvent:"{actor} discarded {card} and was eliminated from the round.",kingForcedEliminationEvent:"{target} discarded {card} because of {actor}'s effect and was eliminated from the round.",blackRoseSavedEvent:"{target} discarded a Black Rose token instead of card {card} because of {actor}'s effect."}},ce=(e,a="")=>{try{return localStorage.getItem(e)||a}catch{return a}},de=(e,a)=>{try{localStorage.setItem(e,a)}catch{}},z=e=>{try{localStorage.removeItem(e)}catch{}},He=(e,a)=>{try{const s=localStorage.getItem(e);return s?JSON.parse(s)??a:a}catch{return a}},Fe=(e,a)=>{try{localStorage.setItem(e,JSON.stringify(a))}catch{}},f={readToken:()=>ce("stories_token"),writeToken:e=>de("stories_token",e),removeToken:()=>z("stories_token"),readLanguage:()=>ce("stories_lang","ru"),writeLanguage:e=>de("stories_lang",e),readActiveRoomId:()=>ce("stories_active_room_id"),writeActiveRoomId:e=>de("stories_active_room_id",e),removeActiveRoomId:()=>z("stories_active_room_id"),readActiveMatchId:()=>ce("stories_active_match_id"),writeActiveMatchId:e=>de("stories_active_match_id",e),removeActiveMatchId:()=>z("stories_active_match_id"),readRoomChatMessages:e=>e?He(`stories_room_chat_${e}`,[]):[],writeRoomChatMessages:(e,a)=>{e&&Fe(`stories_room_chat_${e}`,a)},removeRoomChatMessages:e=>{e&&z(`stories_room_chat_${e}`)},readGameEventLog:e=>e?He(`stories_game_event_log_${e}`,[]):[],writeGameEventLog:(e,a)=>{e&&Fe(`stories_game_event_log_${e}`,a)},removeGameEventLog:e=>{e&&z(`stories_game_event_log_${e}`)}},Ia=window.location.hostname==="0.0.0.0"||window.location.hostname===""?"localhost":window.location.hostname,Ra=window.location.protocol==="https:"?"wss":"ws",le=f.readActiveRoomId(),Re=f.readActiveMatchId(),t={apiBase:window.location.origin,wsUrl:`${Ra}://${Ia}:8081`,token:f.readToken(),user:null,activeRoom:le?{roomId:le}:null,activeMatch:Re?{matchId:Re}:null,activeTab:"home",homeLobbies:[],lobbyCatalog:[],lobbyFilters:{password:"all",limit:20},socket:null,lang:f.readLanguage(),authOpen:!1,authMode:"login",roomModalOpen:!1,roomModalMode:"create",roomSettingsOpen:!1,joinLobbyModalOpen:!1,joinLobbyRoomId:"",joinLobbyOwnerUserId:"",joinLobbyRoomName:"",joinLobbyNeedsPassword:!1,joinLobbyPassword:"",joinLobbySpectator:!1,roomSwitchPromptOpen:!1,roomSwitchPromptMode:"leave",roomSwitchTargetLabel:"",pendingJoinAction:null,suppressOwnJoinPresence:!!le,roomChatMessages:f.readRoomChatMessages(le),roomChatInputShouldFocus:!1,gameEventLog:f.readGameEventLog(Re),gameChatOpen:!1,gameChatUnreadCount:0,gameCardPreview:null,gameCardPlayPrompt:null,gameConfirmPrompt:null,gameStatusMessage:"",homeStatusMessage:"",myRooms:[],roomNoticeMessage:"",roomStatusMessage:""},r=(e,a={})=>{const s=Ge[t.lang]?.[e]??Ge.ru[e]??e;return Object.entries(a).reduce((o,[n,c])=>o.replaceAll(`{${n}}`,String(c)),s)},i=e=>{const a=document.createElement("div");return a.textContent=String(e??""),a.innerHTML},w=(e,a=256)=>{const s=document.querySelector(e);return s?String(s.value??"").trim().slice(0,a):""},E=(e,a,s=!1)=>{const o=document.querySelector(`#${e}`);o&&(o.textContent=a,o.classList.toggle("ok",s))},v=(e,a="error")=>{const s=document.querySelector("#toastContainer");if(!s||!e)return;const o=document.createElement("div");o.className=`toast ${a}`,o.textContent=e,s.prepend(o),window.setTimeout(()=>o.remove(),4200)},b=(e,a)=>{const s=a?.message||r("unknownError");E(e,s),v(s)},Ce=e=>{const a=document.querySelector(e);a&&(a.classList.remove("input-error"),a.removeAttribute("aria-invalid"))},Pe=(e,a)=>{const s=document.querySelector(e);s&&(s.classList.add("input-error"),s.setAttribute("aria-invalid","true"),s.focus(),v(a))},Qe=()=>{f.removeActiveRoomId()},Sa=e=>{if(e){f.writeActiveRoomId(e);return}Qe()},Xe=()=>{f.removeActiveMatchId()},Ca=e=>{if(e){f.writeActiveMatchId(e);return}Xe()},fe=e=>{t.token=e||"",t.token?f.writeToken(t.token):f.removeToken()},Q=e=>{t.user=e||null},Pa=e=>{t.lang=e,f.writeLanguage(e)},h=e=>{t.activeTab=e},xe=e=>{t.homeLobbies=Array.isArray(e)?e:[]},$e=e=>{t.lobbyCatalog=Array.isArray(e)?e:[]},$a=({password:e,limit:a})=>{e!==void 0&&(t.lobbyFilters.password=e),a!==void 0&&(t.lobbyFilters.limit=a)},je=e=>{t.myRooms=Array.isArray(e)?e:[]},Te=e=>{t.socket=e},X=({open:e,mode:a}={})=>{e!==void 0&&(t.authOpen=!!e),a!==void 0&&(t.authMode=a)},oe=({open:e,mode:a}={})=>{e!==void 0&&(t.roomModalOpen=!!e),a!==void 0&&(t.roomModalMode=a)},we=e=>{t.roomSettingsOpen=!!e},Ze=e=>{t.roomStatusMessage=""},B=e=>{t.homeStatusMessage=e||""},k=e=>{t.roomNoticeMessage=e||""},_e=e=>{t.suppressOwnJoinPresence=!!e},ea=e=>{t.roomChatInputShouldFocus=!!e},O=e=>{t.gameStatusMessage=e||""},Z=e=>{t.gameChatOpen=!!e},re=e=>{t.gameChatUnreadCount=Math.max(0,0)},me=e=>{t.gameCardPreview=e||null},ue=e=>{t.gameCardPlayPrompt=e||null},G=e=>{t.gameConfirmPrompt=e||null},x=e=>{t.gameCardPlayPrompt&&(t.gameCardPlayPrompt={...t.gameCardPlayPrompt,...e||{}})},Be=()=>{t.gameChatUnreadCount=Math.max(0,Number(t.gameChatUnreadCount||0)+1)},aa=e=>{t.gameEventLog=[...t.gameEventLog,{timestamp:Date.now(),...e}].slice(-120),f.writeGameEventLog(t.activeMatch?.matchId||"",t.gameEventLog)},ta=()=>{f.removeGameEventLog(t.activeMatch?.matchId||""),t.gameEventLog=[]},W=e=>{t.roomChatMessages=[...t.roomChatMessages,{timestamp:Date.now(),...e}].slice(-100),f.writeRoomChatMessages(t.activeRoom?.roomId||"",t.roomChatMessages)},Ta=e=>{t.roomChatMessages=Array.isArray(e)?e.slice(-100):[],f.writeRoomChatMessages(t.activeRoom?.roomId||"",t.roomChatMessages)},Ea=()=>{f.removeRoomChatMessages(t.activeRoom?.roomId||""),t.roomChatMessages=[]},T=(e,{persist:a=!0}={})=>{t.activeRoom=e||null,t.roomChatMessages=f.readRoomChatMessages(e?.roomId||""),a&&Sa(e?.roomId||"")},L=()=>{t.activeRoom=null,t.roomChatMessages=[],Qe()},ve=(e,{persist:a=!0}={})=>{t.activeMatch=e||null,t.gameEventLog=f.readGameEventLog(e?.matchId||""),a&&Ca(e?.matchId||"")},S=()=>{t.activeMatch=null,t.gameEventLog=[],Xe()},oa=({open:e,roomId:a,ownerUserId:s,roomName:o,needsPassword:n,password:c,spectator:d}={})=>{e!==void 0&&(t.joinLobbyModalOpen=!!e),a!==void 0&&(t.joinLobbyRoomId=a),s!==void 0&&(t.joinLobbyOwnerUserId=s),o!==void 0&&(t.joinLobbyRoomName=o),n!==void 0&&(t.joinLobbyNeedsPassword=!!n),c!==void 0&&(t.joinLobbyPassword=c),d!==void 0&&(t.joinLobbySpectator=!!d)},Le=()=>{oa({open:!1,roomId:"",ownerUserId:"",roomName:"",needsPassword:!1,password:"",spectator:!1})},ra=({open:e,mode:a,targetLabel:s,pendingJoinAction:o}={})=>{e!==void 0&&(t.roomSwitchPromptOpen=!!e),a!==void 0&&(t.roomSwitchPromptMode=a),s!==void 0&&(t.roomSwitchTargetLabel=s),o!==void 0&&(t.pendingJoinAction=o)},Me=()=>{ra({open:!1,mode:"leave",targetLabel:"",pendingJoinAction:null})},Aa=()=>{fe(""),Q(null),L(),S(),X({open:!1}),k(""),Z(!1),re(),me(null),ta(),O(""),Me()},F=(e,a="login")=>{X({open:!0,mode:a}),e()},Na=()=>t.token?{Authorization:`Bearer ${t.token}`}:{},ka=(e,a)=>{const s=String(e||"").toUpperCase(),o={INVALID_CREDENTIALS:"invalidCredentials",USER_EXISTS:"userExists",CURRENT_PASSWORD_INVALID:"currentPasswordInvalid",PASSWORD_CHANGED:"passwordChanged",NO_FIELDS_TO_UPDATE:"noFieldsToUpdate",USER_NOT_FOUND:"userNotFound",MISSING_BEARER_TOKEN:"unauthorized",INVALID_TOKEN_FORMAT:"unauthorized",INVALID_TOKEN_SIGNATURE:"unauthorized",INVALID_TOKEN_PAYLOAD:"unauthorized",INVALID_TOKEN_CLAIMS:"unauthorized",TOKEN_EXPIRED:"unauthorized",UNAUTHORIZED:"unauthorized",FORBIDDEN:"forbidden",INVITE_CODE_NOT_FOUND:"inviteInvalid",INVALID_INVITE_CODE:"inviteInvalid",OWNER_ALREADY_HAS_ROOM:"ownerAlreadyHasRoom",USER_ALREADY_HAS_ACTIVE_ROOM:"userAlreadyHasActiveRoom",ROOM_PASSWORD_REQUIRED:"roomPasswordRequired",ROOM_PASSWORD_INVALID:"roomPasswordInvalid",ROOM_IS_FULL:"roomIsFull",USER_NOT_IN_ROOM:"userNotInRoom",ROOM_NOT_FOUND:"roomNotFound",INVITE_CODE_GENERATION_FAILED:"inviteCodeGenerationFailed",ONLY_OWNER_CAN_MANAGE_ROOM:"onlyOwnerCanManageRoom",OWNER_CANNOT_BE_REMOVED:"ownerCannotBeRemoved",CANNOT_TRANSFER_OWNERSHIP_TO_SELF:"cannotTransferOwnershipToSelf",ONLY_PLAYERS_CAN_BE_KICKED:"onlyPlayersCanBeKicked",USER_BLOCKED_IN_ROOM:"blockedNotice",INVITE_CODE_ROTATE_COOLDOWN:"inviteRotateCooldown",MATCH_NOT_FOUND:"matchNotFound",MATCH_ALREADY_EXISTS:"matchAlreadyExists",MATCH_ALREADY_FINISHED:"matchAlreadyFinished",NOT_ENOUGH_PLAYERS_TO_START_MATCH:"notEnoughPlayersToStartMatch",ROUND_NOT_ACTIVE:"roundNotActive",ROUND_ALREADY_ACTIVE:"roundAlreadyActive",NOT_PLAYER_TURN:"notPlayerTurn",PLAYER_NOT_IN_MATCH:"playerNotInMatch",PLAYER_ELIMINATED:"playerEliminated",CARD_NOT_IN_HAND:"cardNotInHand",TARGET_PLAYER_REQUIRED:"targetPlayerRequired",TARGET_PLAYER_INVALID:"targetPlayerInvalid",CARD_GUESS_REQUIRED:"cardGuessRequired",CARD_GUESS_INVALID:"cardGuessInvalid",GUARD_CANNOT_GUESS_GUARD:"guardCannotGuessGuard",PEASANT_REACTION_ONLY:"peasantReactionOnly",CARD_PLAY_BLOCKED:"cardPlayBlocked",TARGET_PLAYER_PROTECTED:"targetPlayerProtected",MATCH_STATE_INVALID:"matchStateInvalid",PLAYERS_NOT_READY:"playersNotReady",VALIDATION_ERROR:"validationFailed",UNKNOWN_ERROR:"unknownError"};return o[s]?o[s]:a===401?"unauthorized":a===403?"forbidden":a>=500?"serverUnavailable":null},_a=(e,a,s)=>{const o=a?.message||a?.errorMessage||a?.error||s||"";if(String(a?.errorCode||a?.code||"").toUpperCase()==="UNKNOWN_ERROR"&&/must|invalid|required|password|username/i.test(String(o)))return{key:"validationFailed",message:String(o)};const n=ka(a?.code||a?.errorCode,e);return n?{key:n,message:r(n)}:{key:null,message:o||r("httpError",{status:e})}},p=async(e,a={})=>{let s;try{s=await fetch(`${t.apiBase.replace(/\/$/,"")}${e}`,{...a,headers:{"Content-Type":"application/json",...a.headers||{},...Na(),Locale:t.lang}})}catch{throw new Error(r("serverUnavailable"))}const o=await s.text();let n={};try{n=o?JSON.parse(o):{}}catch{n={}}if(!s.ok){s.status===401&&(t.socket&&t.socket.readyState<=1&&t.socket.close(),fe(""),Q(null),S(),L(),h("home"));const c=_a(s.status,n,o),d=new Error(c.message||r("unknownError"));throw d.code=c.key,d.status=s.status,d}return n},N=e=>{!t.socket||t.socket.readyState!==WebSocket.OPEN||t.socket.send(JSON.stringify({...e,token:t.token||void 0}))},C=(e,a={})=>{N({type:"lobbies_event",event:e,data:a})},sa=e=>{e&&N({type:"subscribe_room",roomId:e})},La=()=>{const e=t.activeRoom?.participants;return Array.isArray(e)?e:[]},na=()=>La().find(e=>e.userId===t.user?.id)||null,Ma=()=>!!t.user?.id&&t.activeRoom?.ownerId===t.user.id,se=e=>!!(e&&t.activeRoom?.roomId===e),Ue=(e=t.activeMatch,a=t.user?.id)=>a?(Array.isArray(e?.players)?e.players:[]).some(o=>o.userId===a):!1,A=()=>t.activeMatch?.currentRound||null,ia=()=>!!t.user?.id&&A()?.activePlayerId===t.user.id,Ee=()=>{const e=A();return!e||!Array.isArray(e.players)?null:e.players.find(a=>a.userId===t.user?.id)||null},ca=({includeSelf:e=!1}={})=>{const a=A();return(Array.isArray(a?.players)?a.players:[]).filter(o=>o.eliminated?!1:o.userId===t.user?.id?e:!o.protectedFromEffects)};let pe=null,J=null,Ae="";const ee=e=>e?.status!=="finished"&&Ue(e,t.user?.id),ye=()=>na()?.role==="spectator",Ua=e=>!!e?.matchId&&(Ue(e,t.user?.id)||ye()),Je=(e,a="")=>!!e?.matchId&&e?.status==="finished"&&a!==""&&e.matchId===a&&Ue(e,t.user?.id),Oa=e=>{const a=e?.currentRound?.lastAction;!a?.at||(t.gameEventLog||[]).some(o=>o.actionAt===a.at&&o.type===(a.type||"card_played")&&o.actorUserId===a.actorUserId)||aa({type:a.type||"card_played",actorUserId:a.actorUserId,cardCode:a.cardCode,cardName:a.cardName,targetUserId:a.targetUserId,secondTargetUserId:a.secondTargetUserId,guessedCardCode:a.guessedCardCode,guessedCardName:a.guessedCardName,targetCardCode:a.targetCardCode,targetCardName:a.targetCardName,actionAt:a.at})},qa=e=>{const a=e?.lastRoundSummary;if(!a?.roundNumber||(t.gameEventLog||[]).some(n=>n.type==="round_summary"&&n.roundNumber===a.roundNumber))return;const o=Array.isArray(a.winnerNames)&&a.winnerNames.length?a.winnerNames.join(", "):(a.winnerUserIds||[]).join(", ");aa({type:"round_summary",roundNumber:a.roundNumber,text:r("roundWinnerSummary",{round:a.roundNumber,winners:o})}),v(r("roundWinnerSummary",{round:a.roundNumber,winners:o}),"ok")},K=()=>{pe&&(window.clearTimeout(pe),pe=null),J&&(window.clearInterval(J),J=null),Ae=""},Da=async e=>{if(t.activeMatch?.matchId)try{const a=await p(`/matches/${encodeURIComponent(t.activeMatch.matchId)}/start-round`,{method:"POST"});q(a,{withTab:!0}),N({type:"room_event",roomId:t.activeRoom?.roomId,event:"match_state_updated",data:{matchId:a.matchId}}),e()}catch(a){b("gameStatus",a)}},da=(e,a)=>{if(!(e?.status==="pending"&&e?.currentRound?.status==="finished")||!t.activeRoom?.ownerId||!t.user?.id){K();return}const o=`${e.matchId}:${e.roundNumber}`;if(Ae===o)return;K(),Ae=o;let n=5;O(r("nextRoundIn",{seconds:n})),a(),J=window.setInterval(()=>{if(n-=1,n<=0){window.clearInterval(J),J=null,O(r("waitingNextRound")),a();return}O(r("nextRoundIn",{seconds:n})),a()},1e3),t.activeRoom.ownerId===t.user.id&&(pe=window.setTimeout(async()=>{K(),await Da(a)},5e3))},q=(e,{withTab:a=!0,forceViewTab:s=!1,keepViewTab:o=!1}={})=>{if(e?.matchId){if(ve(e),Oa(e),qa(e),e.status==="finished"&&e.winnerUserId){const n=(e.players||[]).find(c=>c.userId===e.winnerUserId)?.username||e.winnerUserId;O(r("matchWinner",{winner:n})),K()}a&&(ee(e)||s||o&&Ua(e))&&h("game")}},ge=async(e,a,s={})=>{try{const o=ye()&&t.activeRoom?.roomId?await ae(t.activeRoom.roomId):await p(`/matches/${encodeURIComponent(e)}`);return o?.matchId?(q(o,s),!(o.status==="finished"&&o.winnerUserId)&&!(o.status==="pending"&&o.currentRound?.status==="finished")&&O(""),da(o,a),a(),o):null}catch(o){return b("gameStatus",o),null}},ae=async e=>(await p(`/rooms/${encodeURIComponent(e)}/match`))?.match||null,la=async e=>{if(t.activeRoom?.roomId)try{const a=await p("/matches",{method:"POST",body:JSON.stringify({roomId:t.activeRoom.roomId})}),s=await p(`/matches/${encodeURIComponent(a.matchId)}/start-round`,{method:"POST"});ta(),re(0),q(s),C("room_match_started",{roomId:t.activeRoom.roomId,matchId:s.matchId,actorUserId:t.user?.id}),N({type:"room_event",roomId:t.activeRoom.roomId,event:"match_state_updated",data:{matchId:s.matchId}}),v(r("gameStarted"),"ok"),e()}catch(a){b("roomStatus",a)}},R=async(e,a,s={})=>{if(!(!t.activeMatch?.matchId||!a))try{const o=await p(`/matches/${encodeURIComponent(t.activeMatch.matchId)}/play-card`,{method:"POST",body:JSON.stringify({cardCode:a,targetUserId:s.targetUserId||null,secondTargetUserId:s.secondTargetUserId||null,guessedCardCode:s.guessedCardCode||null,cardInstanceId:s.cardInstanceId||null,shouldSwap:typeof s.shouldSwap=="boolean"?s.shouldSwap:null,shouldReact:typeof s.shouldReact=="boolean"?s.shouldReact:null,targetDecreeCode:s.targetDecreeCode||null})});ue(null),q(o,{withTab:!0,keepViewTab:t.activeTab==="game"}),da(o,e),N({type:"room_event",roomId:t.activeRoom?.roomId,event:"match_state_updated",data:{matchId:o.matchId}}),o.status==="pending"&&o.currentRound?.status==="finished"||O(""),e()}catch(o){O(o?.message||r("unknownError")),b("gameStatus",o)}},Ke=e=>{const a=w("#gameChatInput",512);if(!t.activeRoom?.roomId||a==="")return;W({username:t.user?.username||"user",role:(t.activeRoom.participants||[]).find(o=>o.userId===t.user?.id)?.role||"player",userId:t.user?.id||null,text:a,timestamp:Date.now()}),N({type:"room_event",roomId:t.activeRoom.roomId,event:"chat_message",data:{text:a,username:t.user?.username||"user",role:(t.activeRoom.participants||[]).find(o=>o.userId===t.user?.id)?.role||"player"}});const s=document.querySelector("#gameChatInput");s instanceof HTMLInputElement&&(s.value=""),e(),window.requestAnimationFrame(()=>{V();const o=document.querySelector("#gameChatInput");o instanceof HTMLInputElement&&o.focus()})},Ga=async e=>{if(!t.activeRoom?.roomId)return;const a=t.activeRoom.roomId,s=t.activeMatch?.matchId||null;try{await p(`/rooms/${encodeURIComponent(a)}/leave`,{method:"POST"})}catch{}s&&N({type:"room_event",roomId:a,event:"match_state_updated",data:{matchId:s}}),C("room_left",{roomId:a,...s?{matchId:s}:{}}),await _("home",4,t.lobbyFilters.password),await _("catalog",t.lobbyFilters.limit,t.lobbyFilters.password),S(),L(),K(),Z(!1),re(),G(null),k(""),h("home"),v(r("leftGame"),"ok"),e()},Ha=()=>{const a=(Array.isArray(t.activeRoom?.participants)?t.activeRoom.participants:[]).filter(s=>s.userId!==t.user?.id&&(s.role==="owner"||s.role==="player"));return a.length===0?null:a[Math.floor(Math.random()*a.length)]||null},Fa=async e=>{if(!t.activeRoom?.roomId)return;const a=t.activeRoom.roomId,s=t.activeMatch?.matchId||null;try{if(t.activeRoom.ownerId===t.user?.id){const o=Ha();o?.userId&&(await p(`/rooms/${encodeURIComponent(a)}/participants/${encodeURIComponent(o.userId)}/transfer-ownership`,{method:"POST"}),C("room_ownership_transferred",{roomId:a,userId:o.userId,username:o.username||"",actorUserId:t.user?.id}))}await p(`/rooms/${encodeURIComponent(a)}/leave`,{method:"POST"})}catch{}s&&N({type:"room_event",roomId:a,event:"match_state_updated",data:{matchId:s}}),C("room_left",{roomId:a,...s?{matchId:s}:{}}),await _("home",4,t.lobbyFilters.password),await _("catalog",t.lobbyFilters.limit,t.lobbyFilters.password),S(),L(),K(),Z(!1),re(),G(null),k(""),h("home"),v(r("leftGame"),"ok"),e()},V=()=>{const e=document.querySelector("#gameChatLog");e&&window.requestAnimationFrame(()=>{e.scrollTop=e.scrollHeight})},xa=e=>e?.status==="lobby"&&Number(e?.playersCount||0)<Number(e?.maxPlayers||6),Ve=async()=>{if(t.token)try{Q(await p("/auth/me"))}catch{Q(null),fe("")}},_=async(e="home",a=4,s="all")=>{try{const o=await p(`/lobbies?visibility=public&password=${encodeURIComponent(s)}&limit=${a}`);e==="home"&&xe((o.items||[]).filter(xa)),e==="catalog"&&$e(o.items||[])}catch{e==="home"&&xe([]),e==="catalog"&&$e([])}},ja=async()=>{if(!t.user){L(),S();return}const e=t.activeRoom?.roomId,a=t.activeMatch?.matchId||"";if(e)try{T(await p(`/rooms/${encodeURIComponent(e)}`));try{const s=await p(`/rooms/${encodeURIComponent(e)}/match`);if(s?.match?.matchId){ve(s.match),h(ee(s.match)||Je(s.match,a)?"game":"roomManage");return}}catch{}S(),h("roomManage");return}catch{L(),S()}try{const s=await p("/rooms/current");if(s?.roomId){T(s);try{const o=await p(`/rooms/${encodeURIComponent(s.roomId)}/match`);if(o?.match?.matchId){ve(o.match),h(ee(o.match)||Je(o.match,a)?"game":"roomManage");return}}catch{}S(),h("roomManage")}else L(),S()}catch{L(),S()}},Se=()=>{if(!t.user){je([]);return}const e=[...t.homeLobbies,...t.lobbyCatalog],a=new Map;e.filter(s=>s.ownerUserId===t.user.id).forEach(s=>a.set(s.roomId,s)),t.activeRoom?.ownerId===t.user.id&&a.set(t.activeRoom.roomId,{roomId:t.activeRoom.roomId,name:t.activeRoom.name,inviteCode:t.activeRoom.inviteCode,ownerUserId:t.activeRoom.ownerId}),je([...a.values()])},Ba=e=>{W(e)},Ja=(e,a,s)=>{const o=Array.isArray(t.roomChatMessages)?t.roomChatMessages:[],n=o[o.length-1]||null;if(!n||n.role!=="system"||s.role!=="system"||typeof n.text!="string"||typeof s.text!="string"||Math.abs(Number(s.timestamp||0)-Number(n.timestamp||0))>8e3){W(s);return}const c=a?.username||r("systemUnknownUser"),d=r("systemJoinedRoom",{username:c}),u=r("systemLeftRoom",{username:c});if(n.text===d&&s.text===u||n.text===u&&s.text===d){Ta(o.slice(0,-1));return}W(s)},Ne=()=>{const e=document.querySelector("#roomChatLog");e&&window.requestAnimationFrame(()=>{e.scrollTop=e.scrollHeight})},Ka=e=>{const a=e?.username||r("systemUnknownUser");return e?.event==="room_settings_updated"?r("roomUpdatedSystem"):e?.event==="room_ownership_transferred"?r("ownershipTransferredSystem",{username:a}):e?.event==="room_participant_kicked"?r("participantKickedSystem",{username:a}):e?.event==="room_participant_banned"?r("participantBannedSystem",{username:a}):e?.event==="joined"?r("systemJoinedRoom",{username:a}):e?.event==="left"?r("systemLeftRoom",{username:a}):e?.message||""},j=(e,a={})=>{const s={username:r("roleSystem"),role:"system",text:Ka({event:e,...a}),timestamp:a?.timestamp||Date.now()};if(e==="joined"||e==="left"){Ja(e,a,s);return}W(s)},H=()=>{L(),S(),Ze(),we(!1)},te=(e,{resetChat:a=!0}={})=>{S(),T(e),sa(e.roomId),a&&Ea(),k(""),Ze(),h("roomManage")},ne=e=>{oe({open:!1}),Le(),Me(),h("roomManage"),e()},ma=(e,a=!0)=>{Me(),a&&e()},he=(e,a)=>{ra({pendingJoinAction:a,mode:Ma()?"close":"leave",targetLabel:a.targetLabel||"",open:!0}),e()},ke=(e,a="create")=>{oe({open:!0,mode:a}),B(""),e()},Va=e=>{oe({open:!1}),e()},ua=(e,{roomId:a,roomName:s,ownerUserId:o,needsPassword:n})=>{oa({open:!0,roomId:a,roomName:s,ownerUserId:o,needsPassword:n,spectator:!1}),e()},We=e=>{Le(),e()},pa=async()=>{if(!t.activeRoom?.roomId)return;const e=t.activeRoom.roomId,a=t.activeMatch?.matchId||null;await p(`/rooms/${encodeURIComponent(e)}/leave`,{method:"POST"}),a&&N({type:"room_event",roomId:e,event:"match_state_updated",data:{matchId:a}}),H(),C("room_left",{roomId:e,...a?{matchId:a}:{}}),await _("home",4,t.lobbyFilters.password),await _("catalog",t.lobbyFilters.limit,t.lobbyFilters.password)},ga=async(e,a,s,o="",n=!1,c="homeStatus")=>{try{if(se(a))return ne(e),!0;if(t.user?.id&&s===t.user.id){const u=await p(`/rooms/${encodeURIComponent(a)}`);te(u,{resetChat:!1})}else{const u={spectator:!!n};o.trim()!==""&&(u.password=o.trim());const y=await p(`/rooms/${encodeURIComponent(a)}/join`,{method:"POST",body:JSON.stringify(u)});te(y)}const d=await ae(t.activeRoom.roomId).catch(()=>null);return d?.matchId?(q(d,{withTab:!0}),ee(d)||h("roomManage")):(S(),h("roomManage")),C("room_joined",{roomId:t.activeRoom.roomId}),E(c,`${r("roomJoinSuccess")} ${t.activeRoom.roomId}`,!0),v(r("roomJoinSuccess"),"ok"),e(),!0}catch(d){return b(c,d),!1}},va=async(e,a,s,o=!1,n="homeStatus")=>{try{const c={inviteCode:a,spectator:o};s!==""&&(c.password=s);const d=await p("/rooms/join-by-code",{method:"POST",body:JSON.stringify(c)});te(d);const u=await ae(t.activeRoom.roomId).catch(()=>null);return u?.matchId?(q(u,{withTab:!0}),ee(u)||h("roomManage")):(S(),h("roomManage")),C("room_joined",{roomId:t.activeRoom.roomId}),oe({open:!1}),B(`${r("roomJoinSuccess")} ${t.activeRoom.roomId}`),e(),!0}catch(c){return B(c.message),b(n,c),!1}},Wa=async e=>{const a=t.pendingJoinAction;if(a){if(ma(e,!1),a.kind==="lobby"){await ga(e,a.roomId,a.ownerUserId,a.password||"",!!a.spectator,"joinLobbyStatus")&&Le();return}if(a.kind==="invite"){await va(e,a.inviteCode,a.password||"",!!a.spectator,"homeStatus");return}a.kind==="open_create_modal"&&ke(e,"create")}},Ya=e=>{document.querySelector('[data-act="createRoom"]')?.addEventListener("click",async()=>{if(!t.user)return F(e,"login");Ce("#roomName");try{const a=w("#roomName",64);if(a===""){Pe("#roomName",r("requiredField"));return}const s=w("#roomPassword",128),o={name:a,isPublic:!!document.querySelector("#roomIsPublic")?.checked,maxPlayers:Number(w("#roomMaxPlayers",1)||"6")};if(s!==""&&(o.password=s),t.activeRoom?.roomId){he(e,{kind:"open_create_modal",targetLabel:r("createRoom")});return}const n=await p("/rooms",{method:"POST",body:JSON.stringify(o)});te(n),C("room_created",{roomId:t.activeRoom.roomId}),oe({open:!1}),B(`${r("roomCreated")} ${t.activeRoom.inviteCode}`),e()}catch(a){B(a.message),b("homeStatus",a)}}),document.querySelector('[data-act="joinByCode"]')?.addEventListener("click",async()=>{if(!t.user)return F(e,"login");Ce("#inviteCode");try{const a=w("#inviteCode",6).toUpperCase();if(a.length!==6){Pe("#inviteCode",r("inviteCodeInvalid"));return}const s=w("#joinPassword",128),o=!!document.querySelector("#joinAsSpectator")?.checked;if(t.activeRoom?.inviteCode===a){ne(e);return}if(t.activeRoom?.roomId){he(e,{kind:"invite",inviteCode:a,password:s,spectator:o,targetLabel:a});return}await va(e,a,s,o,"homeStatus")}catch(a){B(a.message),b("homeStatus",a)}})},ya=e=>{(async()=>{if(t.activeRoom?.roomId&&!(t.activeRoom.ownerId&&t.activeRoom.inviteCode&&t.activeMatch?.matchId))try{(!t.activeRoom.ownerId||!t.activeRoom.inviteCode)&&(T(await p(`/rooms/${encodeURIComponent(t.activeRoom.roomId)}`)),_e(!0));const o=await ae(t.activeRoom.roomId).catch(()=>null);if(o?.matchId){q(o,{withTab:!0,keepViewTab:t.activeTab==="game"}),e();return}S()}catch(o){b("homeStatus",o)}})();const s=()=>t.activeRoom?.roomId?!0:(E("roomStatus",r("roomNotFound")),!1);document.querySelector('[data-act="readyRoom"]')?.addEventListener("click",async()=>{if(s())try{const n=!(na()?.ready??!1);T(await p(`/rooms/${encodeURIComponent(t.activeRoom.roomId)}/ready`,{method:"POST",body:JSON.stringify({ready:n})})),C("room_ready_changed",{roomId:t.activeRoom.roomId}),e()}catch(o){b("roomStatus",o)}}),document.querySelector('[data-act="leaveRoom"]')?.addEventListener("click",async()=>{if(s())try{await pa(),h("home"),k(""),E("homeStatus",r("ready"),!0),e()}catch(o){b("roomStatus",o)}}),document.querySelectorAll('[data-act="joinLobby"]').forEach(o=>{o.addEventListener("click",async()=>{if(!t.user)return F(e,"login");const n=o.dataset.roomId;if(n){if(se(n)){ne(e);return}ua(e,{roomId:n,roomName:o.dataset.roomName||n,ownerUserId:o.dataset.roomOwnerId||"",needsPassword:o.dataset.roomHasPassword==="1"})}})}),document.querySelector('[data-act="openRoomSettings"]')?.addEventListener("click",()=>{we(!0),e()}),document.querySelector('[data-act="startGame"]')?.addEventListener("click",async()=>{if(t.activeMatch?.matchId&&t.activeMatch.status!=="finished"){await ge(t.activeMatch.matchId,e,{withTab:!0,forceViewTab:!0});return}const n=(Array.isArray(t.activeRoom?.participants)?t.activeRoom.participants:[]).filter(d=>d.role!=="spectator");if(!(n.length>=2&&n.every(d=>d.ready===!0))){v(r("allPlayersMustReadyHint"));return}await la(e)}),document.querySelector('[data-act="openGame"]')?.addEventListener("click",async()=>{const o=await ae(t.activeRoom?.roomId||"").catch(()=>null);o?.matchId&&(q(o,{withTab:!0,forceViewTab:!0,keepViewTab:!0}),e())})},za=e=>{document.querySelector('[data-act="saveRoomSettings"]')?.addEventListener("click",async()=>{if(t.activeRoom?.roomId)try{const a=!!document.querySelector("#manageIsPublic")?.checked,s=Number(w("#manageMaxPlayers",1)||"6"),o=w("#managePassword",128);T(await p(`/rooms/${encodeURIComponent(t.activeRoom.roomId)}/settings`,{method:"PATCH",body:JSON.stringify({isPublic:a,maxPlayers:s,password:o})})),C("room_settings_updated",{roomId:t.activeRoom.roomId,actorUserId:t.user?.id}),j("room_settings_updated"),E("roomManageStatus",r("roomSettingsSaved"),!0),v(r("roomSettingsSaved"),"ok"),we(!1),e()}catch(a){b("roomManageStatus",a)}}),document.querySelector('[data-act="regenInvite"]')?.addEventListener("click",async()=>{if(t.activeRoom?.roomId)try{T(await p(`/rooms/${encodeURIComponent(t.activeRoom.roomId)}/invite-code/regenerate`,{method:"POST"})),C("room_invite_regenerated",{roomId:t.activeRoom.roomId}),E("roomManageStatus",""),v(r("inviteRegenerated"),"ok"),e()}catch(a){E("roomManageStatus",""),v(a?.message||r("unknownError"))}}),document.querySelectorAll('[data-act="kickParticipant"]').forEach(a=>{a.addEventListener("click",async()=>{if(!t.activeRoom?.roomId)return;const s=a.dataset.userId;if(!s)return;const o=(t.activeRoom.participants||[]).find(n=>n.userId===s);try{T(await p(`/rooms/${encodeURIComponent(t.activeRoom.roomId)}/participants/${encodeURIComponent(s)}/kick`,{method:"POST"})),C("room_participant_kicked",{roomId:t.activeRoom.roomId,userId:s,username:o?.username||"",actorUserId:t.user?.id}),j("room_participant_kicked",{username:o?.username||r("systemUnknownUser")}),e()}catch(n){b("roomManageStatus",n)}})}),document.querySelectorAll('[data-act="banParticipant"]').forEach(a=>{a.addEventListener("click",async()=>{if(!t.activeRoom?.roomId)return;const s=a.dataset.userId;if(!s)return;const o=(t.activeRoom.participants||[]).find(n=>n.userId===s);try{T(await p(`/rooms/${encodeURIComponent(t.activeRoom.roomId)}/participants/${encodeURIComponent(s)}/ban`,{method:"POST"})),C("room_participant_banned",{roomId:t.activeRoom.roomId,userId:s,username:o?.username||"",actorUserId:t.user?.id}),j("room_participant_banned",{username:o?.username||r("systemUnknownUser")}),e()}catch(n){b("roomManageStatus",n)}})}),document.querySelectorAll('[data-act="transferOwnership"]').forEach(a=>{a.addEventListener("click",async()=>{if(!t.activeRoom?.roomId)return;const s=a.dataset.userId;if(!s)return;const o=(t.activeRoom.participants||[]).find(n=>n.userId===s);try{T(await p(`/rooms/${encodeURIComponent(t.activeRoom.roomId)}/participants/${encodeURIComponent(s)}/transfer-ownership`,{method:"POST"})),C("room_ownership_transferred",{roomId:t.activeRoom.roomId,userId:s,username:o?.username||"",actorUserId:t.user?.id}),j("room_ownership_transferred",{username:o?.username||r("systemUnknownUser")}),E("roomManageStatus",r("ownershipTransferred"),!0),v(r("ownershipTransferred"),"ok"),e()}catch(n){b("roomManageStatus",n)}})}),document.querySelector('[data-act="sendRoomChat"]')?.addEventListener("click",()=>{const a=w("#roomChatInput",512);if(!t.activeRoom?.roomId||a==="")return;ea(!0),W({username:t.user?.username||"user",role:(t.activeRoom.participants||[]).find(o=>o.userId===t.user?.id)?.role||"player",userId:t.user?.id||null,text:a,timestamp:Date.now()}),N({type:"room_event",roomId:t.activeRoom.roomId,event:"chat_message",data:{text:a,username:t.user?.username||"user",role:(t.activeRoom.participants||[]).find(o=>o.userId===t.user?.id)?.role||"player"}});const s=document.querySelector("#roomChatInput");s&&(s.value="",s.focus()),e(),Ne()}),document.querySelector("#roomChatInput")?.addEventListener("keydown",a=>{a.key!=="Enter"||a.shiftKey||(a.preventDefault(),document.querySelector('[data-act="sendRoomChat"]')?.click())})},Qa=e=>{ya(e),za(e)},Xa=e=>{document.querySelectorAll("[data-tab]").forEach(a=>{a.addEventListener("click",()=>{h(a.dataset.tab),e()})}),document.querySelectorAll("[data-lang]").forEach(a=>{a.addEventListener("click",()=>{Pa(a.dataset.lang),e()})}),document.querySelector('[data-act="toggleAuth"]')?.addEventListener("click",()=>F(e,"login")),document.querySelectorAll('[data-act="heroCreate"]').forEach(a=>{a.addEventListener("click",()=>{if(!t.user)return F(e,"login");if(t.activeRoom?.roomId){he(e,{kind:"open_create_modal",targetLabel:r("createRoom")});return}ke(e,"create")})}),document.querySelectorAll('[data-act="heroJoin"]').forEach(a=>{a.addEventListener("click",()=>{if(!t.user)return F(e,"login");ke(e,"join")})}),document.querySelectorAll('[data-act="closeAuth"]').forEach(a=>{a.addEventListener("click",()=>{X({open:!1}),e()})}),document.querySelector('[data-act="closeRoomNotice"]')?.addEventListener("click",()=>{k(""),e()}),document.querySelector('[data-act="logout"]')?.addEventListener("click",()=>{Aa(),t.socket?.readyState===WebSocket.OPEN&&t.socket.close(),Te(null),e()}),document.querySelectorAll('[data-act="closeRoomModal"]').forEach(a=>{a.addEventListener("click",()=>Va(e))}),document.querySelectorAll('[data-act="closeRoomSettings"]').forEach(a=>{a.addEventListener("click",()=>{we(!1),e()})}),document.querySelectorAll('[data-act="closeJoinLobbyModal"]').forEach(a=>{a.addEventListener("click",()=>We(e))}),document.querySelectorAll('[data-act="closeRoomSwitchModal"], [data-act="cancelRoomSwitch"]').forEach(a=>{a.addEventListener("click",()=>ma(e))}),document.querySelector('[data-act="confirmJoinLobby"]')?.addEventListener("click",async()=>{if(!t.joinLobbyRoomId)return;Ce("#lobbyJoinPassword");const a=w("#lobbyJoinPassword",128),s=!!document.querySelector("#lobbyJoinAsSpectator")?.checked;if(t.joinLobbyNeedsPassword&&a===""){Pe("#lobbyJoinPassword",r("requiredField")),E("joinLobbyStatus",r("requiredField"));return}if(t.activeRoom?.roomId&&!se(t.joinLobbyRoomId)){he(e,{kind:"lobby",roomId:t.joinLobbyRoomId,ownerUserId:t.joinLobbyOwnerUserId,password:a,spectator:s,targetLabel:t.joinLobbyRoomName||t.joinLobbyRoomId});return}await ga(e,t.joinLobbyRoomId,t.joinLobbyOwnerUserId,a,s,"joinLobbyStatus")&&We(e)}),document.querySelector('[data-act="confirmRoomSwitch"]')?.addEventListener("click",async()=>{try{await pa(),await Wa(e)}catch(a){b("roomSwitchStatus",a)}}),t.roomModalOpen&&t.user&&Ya(e)},Za=async(e,a)=>{document.querySelector('[data-act="switchAuthMode"]')?.addEventListener("click",()=>{X({mode:t.authMode==="login"?"register":"login"}),e()}),document.querySelector('[data-act="authSubmit"]')?.addEventListener("click",async()=>{const s=t.authMode==="login"?"/auth/login":"/auth/register",o=t.authMode==="login"?r("loginSuccess"):r("registerSuccess");try{const n=await p(s,{method:"POST",body:JSON.stringify({username:w("#authUsername",64),password:w("#authPassword",128)})});fe(n.accessToken),await a();try{const c=await p("/rooms/current");c?.roomId?(T(c),h("roomManage"),_e(!0)):H()}catch{H()}E("authStatus",o,!0),X({open:!1}),e()}catch(n){b("authStatus",n)}})},et=e=>{const a=async()=>{try{$e((await p(`/lobbies?visibility=public&password=${encodeURIComponent(t.lobbyFilters.password)}&limit=${t.lobbyFilters.limit}`)).items||[]),E("lobbyStatus",r("ready"),!0),e()}catch(s){b("lobbyStatus",s)}};document.querySelector('[data-act="loadLobbies"]')?.addEventListener("click",async()=>{$a({password:w("#lobbyPasswordFilter",20)||"all",limit:Number(w("#lobbyLimit",3)||"20")}),await a()}),document.querySelectorAll('[data-act="joinLobby"]').forEach(s=>{s.addEventListener("click",async()=>{if(!t.user)return F(e,"login");const o=s.dataset.roomId;if(o){if(se(o)){ne(e);return}ua(e,{roomId:o,roomName:s.dataset.roomName||o,ownerUserId:s.dataset.roomOwnerId||"",needsPassword:s.dataset.roomHasPassword==="1"})}})})},at=e=>{document.querySelectorAll('[data-act="openOwnedRoom"]').forEach(a=>{a.addEventListener("click",async()=>{try{const s=a.dataset.roomId;if(!s)return;if(se(s)){ne(e);return}const o=await p(`/rooms/${encodeURIComponent(s)}`);te(o,{resetChat:!1}),e()}catch(s){b("profileStatus",s)}})}),document.querySelector('[data-act="saveProfile"]')?.addEventListener("click",async()=>{try{const a=w("#profileUsername",64);Q(await p("/auth/me",{method:"PATCH",body:JSON.stringify({username:a})})),E("profileStatus",r("profileUpdated"),!0),e()}catch(a){b("profileStatus",a)}}),document.querySelector('[data-act="changePassword"]')?.addEventListener("click",async()=>{try{await p("/auth/change-password",{method:"POST",body:JSON.stringify({currentPassword:w("#currentPassword",128),newPassword:w("#nextPassword",128)})});const a=document.querySelector("#currentPassword"),s=document.querySelector("#nextPassword");a&&(a.value=""),s&&(s.value=""),E("profileStatus",r("passwordChanged"),!0)}catch(a){b("profileStatus",a)}})},Oe=[{code:"peasant",name:"Крестьянин",value:0,copies:2},{code:"guard",name:"Стражник",value:1,copies:5},{code:"scout",name:"Разведчик",value:2,copies:2},{code:"executioner",name:"Палач",value:3,copies:2},{code:"lady",name:"Дворянка",value:4,copies:2},{code:"rebel",name:"Мятежник",value:5,copies:2},{code:"feudal_lord",name:"Феодал",value:6,copies:2},{code:"bishop",name:"Епископ",value:7,copies:1},{code:"queen",name:"Королева",value:8,copies:1},{code:"king",name:"Король",value:9,copies:1}],tt=e=>Oe.find(a=>a.code===e)||null,ot={guard:{promptType:"target_and_guess",confirmAction:"confirmGuardPlay",targetAction:"selectGuardTarget",summaryKey:"guardPromptSummary",emptySummaryKey:"guardPromptSummaryEmpty",titleKey:"guardPromptTitle",hintKey:"guardPromptHint",confirmKey:"guardPromptConfirm"},scout:{promptType:"target_only",confirmAction:"confirmScoutPlay",targetAction:"selectGuardTarget",summaryKey:"scoutPromptSummary",titleKey:"scoutPromptTitle",hintKey:"scoutPromptHint",confirmKey:"scoutPromptConfirm"},executioner:{promptType:"target_only",confirmAction:"confirmExecutionerPlay",targetAction:"selectGuardTarget",summaryKey:"executionerPromptSummary",titleKey:"executionerPromptTitle",hintKey:"executionerPromptHint",confirmKey:"executionerPromptConfirm"},rebel:{promptType:"target_only",includeSelf:!0,confirmAction:"confirmRebelPlay",targetAction:"selectGuardTarget",summaryKey:"rebelPromptSummary",titleKey:"rebelPromptTitle",hintKey:"rebelPromptHint",confirmKey:"rebelPromptConfirm"},feudal_lord:{promptType:"double_target",includeSelf:!0,confirmAction:"confirmFeudalPlay",targetAction:"selectFeudalTarget",summaryKey:"feudalPromptSummary",titleKey:"feudalPromptTitle",hintKey:"feudalPromptHint",confirmKey:"feudalPromptConfirm"}},be=e=>ot[e]||null,rt=e=>!!be(e),st=()=>{const e=A(),a=new Map,s=d=>{const u=d?.code||"";u&&a.set(u,Number(a.get(u)||0)+1)};return(Array.isArray(e?.revealedCards)?e.revealedCards:[]).forEach(s),(Array.isArray(e?.players)?e.players:[]).forEach(d=>{(Array.isArray(d?.discard)?d.discard:[]).forEach(s)}),(Array.isArray(Ee()?.hand)?Ee().hand:[]).forEach(s),a},ha=()=>(A()?.activeDecrees||[]).some(e=>e?.code==="free_interrogation"&&!e?.suppressedByQueen),ba=({allowGuard:e=ha()}={})=>{const a=st();return Oe.filter(s=>s.code==="guard"&&!e?!1:Number(a.get(s.code)||0)<Number(s.copies||0))},nt=e=>{if(!e?.cardCode)return null;const a=be(e.cardCode);if(!a)return null;const s=ca({includeSelf:!!a.includeSelf}),o=a.promptType==="target_and_guess"?ba():[],n=a.promptType==="target_and_guess"?tt(e.guessedCardCode):null;return{...a,cardCode:e.cardCode,cardInstanceId:e.cardInstanceId||"",targetUserId:e.targetUserId||"",secondTargetUserId:e.secondTargetUserId||"",guessedCardCode:e.guessedCardCode||"",targets:s,availableGuesses:o,selectedGuess:n,requiresGuess:a.promptType==="target_and_guess",requiresSecondTarget:a.promptType==="double_target"}},it=e=>{const a=o=>o!=="guard"?Oe.some(n=>n.code===o):ha(),s=o=>{const n=be(o);return ca({includeSelf:!!n?.includeSelf})};document.querySelector('[data-act="toggleGameChat"]')?.addEventListener("click",()=>{const o=!t.gameChatOpen;Z(o),o&&re(),e(),o&&(V(),window.requestAnimationFrame(()=>{document.querySelector("#gameChatInput")?.focus()}))}),document.querySelector('[data-act="closeGameChatBackdrop"]')?.addEventListener("click",()=>{Z(!1),e()}),document.querySelector('[data-act="closeGameCardPreview"]')?.addEventListener("click",()=>{me(null),e()}),document.querySelector('[data-act="closeGameCardPlayPrompt"]')?.addEventListener("click",()=>{ue(null),e()}),document.querySelector('[data-act="closeGameConfirmPrompt"]')?.addEventListener("click",()=>{G(null),e()}),document.querySelector(".game-card-preview-shell")?.addEventListener("click",o=>{o.target===o.currentTarget&&(me(null),e())}),document.querySelector(".game-card-play-prompt-shell")?.addEventListener("click",o=>{o.target===o.currentTarget&&(ue(null),e())}),document.querySelector(".game-confirm-prompt-shell")?.addEventListener("click",o=>{o.target===o.currentTarget&&(G(null),e())}),document.querySelector('[data-act="exitGame"]')?.addEventListener("click",async()=>{G({type:"leave_game",title:r("gameExitConfirmTitle"),message:r("gameExitConfirm"),confirmLabel:r("leaveRoom"),cancelLabel:r("cancel")}),e()}),document.querySelector('[data-act="leaveFinishedMatch"]')?.addEventListener("click",async()=>{await Fa(e)}),document.querySelector('[data-act="playAgainMatch"]')?.addEventListener("click",async()=>{if(t.activeRoom?.ownerId!==t.user?.id){v(r("gamePlayAgainOwnerOnly"));return}await la(e)}),document.querySelector('[data-act="returnToRoomAfterMatch"]')?.addEventListener("click",()=>{h("roomManage"),e()}),document.querySelectorAll('[data-act="playCard"]').forEach(o=>{o.addEventListener("click",async()=>{if(!ia()){v(r("notPlayerTurn"));return}if(o.dataset.cardLocked==="true"){v(r("cardPlayBlocked"));return}const n=o.dataset.cardCode||"",c=o.dataset.cardInstanceId||"";if(n==="king"){G({type:"play_king",title:r("kingPromptTitle"),message:r("kingSelfEliminateConfirm"),confirmLabel:r("kingPromptConfirm"),cancelLabel:r("cancel"),payload:{cardCode:n,cardInstanceId:c}}),e();return}if(!rt(n)){await R(e,n,{cardInstanceId:c});return}const d=be(n),u=s(n);if(u.length===0||d?.promptType==="double_target"&&u.length<2){if(n!=="rebel"){await R(e,n,{cardInstanceId:c});return}v(r("rebelTargetUnavailable"));return}ue({cardCode:n,cardInstanceId:c,targetUserId:u[0]?.userId||"",secondTargetUserId:d?.promptType==="double_target"&&u[1]?.userId||"",guessedCardCode:""}),e()})}),document.querySelectorAll('[data-act="selectGuardTarget"]').forEach(o=>{o.addEventListener("click",()=>{x({targetUserId:o.dataset.userId||""}),e()})}),document.querySelectorAll('[data-act="selectGuardGuess"]').forEach(o=>{o.addEventListener("click",()=>{x({guessedCardCode:o.dataset.cardCode||""}),e()})}),document.querySelector('[data-act="confirmGuardPlay"]')?.addEventListener("click",async()=>{const o=t.gameCardPlayPrompt;if(!o?.targetUserId){v(r("targetPlayerRequired"));return}if(!o?.guessedCardCode||!a(o.guessedCardCode)){v(r("guardGuessRequired"));return}await R(e,o.cardCode||"guard",{targetUserId:o.targetUserId,guessedCardCode:o.guessedCardCode,cardInstanceId:o.cardInstanceId})}),document.querySelector('[data-act="confirmScoutPlay"]')?.addEventListener("click",async()=>{const o=t.gameCardPlayPrompt;if(!o?.targetUserId){v(r("targetPlayerRequired"));return}await R(e,o.cardCode||"scout",{targetUserId:o.targetUserId,cardInstanceId:o.cardInstanceId})}),document.querySelector('[data-act="confirmExecutionerPlay"]')?.addEventListener("click",async()=>{const o=t.gameCardPlayPrompt;if(!o?.targetUserId){v(r("targetPlayerRequired"));return}await R(e,o.cardCode||"executioner",{targetUserId:o.targetUserId,cardInstanceId:o.cardInstanceId})}),document.querySelector('[data-act="confirmRebelPlay"]')?.addEventListener("click",async()=>{const o=t.gameCardPlayPrompt;if(!o?.targetUserId){v(r("targetPlayerRequired"));return}await R(e,o.cardCode||"rebel",{targetUserId:o.targetUserId,cardInstanceId:o.cardInstanceId})}),document.querySelectorAll('[data-act="selectFeudalTarget"]').forEach(o=>{o.addEventListener("click",()=>{const n=o.dataset.userId||"",c=t.gameCardPlayPrompt;if(!(!c||n==="")){if(c.targetUserId===n){x({targetUserId:c.secondTargetUserId||"",secondTargetUserId:""}),e();return}if(c.secondTargetUserId===n){x({secondTargetUserId:""}),e();return}if(!c.targetUserId){x({targetUserId:n}),e();return}x({secondTargetUserId:n}),e()}})}),document.querySelector('[data-act="confirmFeudalPlay"]')?.addEventListener("click",async()=>{const o=t.gameCardPlayPrompt;if(!o?.targetUserId||!o?.secondTargetUserId||o.targetUserId===o.secondTargetUserId){v(r("feudalPromptNeedTwoTargets"));return}await R(e,o.cardCode||"feudal_lord",{targetUserId:o.targetUserId,secondTargetUserId:o.secondTargetUserId,cardInstanceId:o.cardInstanceId})}),document.querySelector('[data-act="confirmFeudalSwap"]')?.addEventListener("click",async()=>{await R(e,"feudal_lord",{shouldSwap:!0})}),document.querySelector('[data-act="confirmFeudalKeep"]')?.addEventListener("click",async()=>{await R(e,"feudal_lord",{shouldSwap:!1})}),document.querySelector('[data-act="confirmPeasantReact"]')?.addEventListener("click",async()=>{await R(e,"peasant",{shouldReact:!0})}),document.querySelector('[data-act="skipPeasantReact"]')?.addEventListener("click",async()=>{await R(e,"peasant",{shouldReact:!1})}),document.querySelector('[data-act="resolveGuardMiss"]')?.addEventListener("click",async()=>{await R(e,"peasant",{shouldReact:!1})}),document.querySelectorAll('[data-act="resolveSuspicionCounterGuess"]').forEach(o=>{o.addEventListener("click",async()=>{await R(e,"guard",{guessedCardCode:o.dataset.cardCode||""})})}),document.querySelectorAll('[data-act="confirmQueenDecreeSuppression"]').forEach(o=>{o.addEventListener("click",async()=>{await R(e,"queen",{targetDecreeCode:o.dataset.decreeCode||""})})}),document.querySelector('[data-act="confirmGamePrompt"]')?.addEventListener("click",async()=>{const o=t.gameConfirmPrompt;if(o){if(G(null),e(),o.type==="leave_game"){await Ga(e);return}o.type==="play_king"&&await R(e,o.payload?.cardCode||"king",{cardInstanceId:o.payload?.cardInstanceId||null})}}),document.querySelectorAll('[data-act="previewDiscardCard"]').forEach(o=>{o.addEventListener("click",()=>{me({ownerName:o.dataset.ownerName||"",cardName:o.dataset.cardName||"",cardCode:o.dataset.cardCode||"",cardValue:Number(o.dataset.cardValue||0)}),e()})}),document.querySelector('[data-act="sendGameChat"]')?.addEventListener("click",()=>{Ke(e),V()}),document.querySelector("#gameChatInput")?.addEventListener("keydown",o=>{o.key!=="Enter"||o.shiftKey||(o.preventDefault(),Ke(e),V())})},fa=(e,a)=>{t.socket?.readyState===WebSocket.OPEN||t.socket?.readyState===WebSocket.CONNECTING||(Te(new WebSocket(t.wsUrl)),t.socket.onopen=()=>{N({type:"subscribe_lobbies"}),t.activeRoom?.roomId&&sa(t.activeRoom.roomId)},t.socket.onmessage=async s=>{let o;try{o=JSON.parse(s.data)}catch{return}if(o?.type==="lobbies_event"){await e();const n=o?.data?.roomId,c=o?.data?.matchId,d=o?.data?.userId,u=o?.data?.username||o?.username||r("systemUnknownUser");if(n&&t.activeRoom?.roomId===n&&d&&t.user?.id===d&&(o?.event==="room_participant_kicked"||o?.event==="room_participant_banned")){H(),h("home");const y=o?.event==="room_participant_banned"?r("blockedNotice"):r("kickedFromRoomNotice");k(y),v(y),a();return}if(n&&t.activeRoom?.roomId===n){if(o?.event==="room_left"&&t.activeMatch?.matchId&&await ge(t.activeMatch.matchId,a,{withTab:t.activeTab==="game",forceViewTab:t.activeTab==="game"&&ye(),keepViewTab:t.activeTab==="game"}),o?.event==="room_match_started"&&c){const y=await ge(c,a,{withTab:!0});y?.matchId&&t.activeTab==="game"&&y.status==="finished"&&h("roomManage");return}(o?.event==="room_settings_updated"||o?.event==="room_ownership_transferred"||o?.event==="room_participant_kicked"||o?.event==="room_participant_banned")&&(o?.data?.actorUserId&&o.data.actorUserId===t.user?.id||j(o.event,{username:u,timestamp:o?.timestamp}));try{T(await p(`/rooms/${encodeURIComponent(n)}`))}catch{H(),h("home"),k(r("roomClosedNotice")),v(r("roomClosedNotice"))}}(t.activeTab==="home"||t.activeTab==="lobbies"||t.activeTab==="profile"||t.activeTab==="roomManage"||t.activeTab==="game")&&a();return}if(o?.type==="room_event"&&o?.roomId&&t.activeRoom?.roomId===o.roomId){if(o?.event==="match_state_updated"){const n=o?.data?.matchId||t.activeMatch?.matchId;if(n){const c=await ge(n,a,{withTab:t.activeTab==="game",forceViewTab:t.activeTab==="game"&&ye(),keepViewTab:t.activeTab==="game"});c?.matchId&&ve(c)}return}if(o?.event==="access_denied"){H(),h("home");const n=o?.data?.reason==="banned"?r("blockedNotice"):r("kickedFromRoomNotice");k(n),v(n),a();return}if(o?.event==="chat_message"&&o?.data?.text){const n=!!(o?.userId&&t.user?.id&&o.userId===t.user.id),c=Array.isArray(t.roomChatMessages)?t.roomChatMessages:[],d=c[c.length-1]||null;n&&d&&d.userId===o?.userId&&d.text===(o?.data?.text||"")&&Math.abs(Number(o?.timestamp||0)*1e3-Number(d.timestamp||0))<15e3||Ba({username:o?.data?.username||o?.username||"user",role:o?.data?.role||"player",userId:o?.userId||null,text:o?.data?.text||"",timestamp:o?.timestamp}),(t.activeTab==="roomManage"||t.activeTab==="game")&&(a(),t.activeTab==="roomManage"&&Ne(),t.activeTab==="game"&&(t.gameChatOpen?V():n||(Be(),v(r("newChatMessageNotice"),"ok"))));return}try{T(await p(`/rooms/${encodeURIComponent(o.roomId)}`)),a()}catch{H(),h("home"),k(r("roomClosedNotice")),v(r("roomClosedNotice")),a()}return}if(o?.type==="presence"&&o?.roomId&&t.activeRoom?.roomId===o.roomId){if(o?.event==="joined"&&t.suppressOwnJoinPresence&&o?.username===t.user?.username){_e(!1);return}j(o?.event||"",{username:o?.username||r("systemUnknownUser"),timestamp:o?.timestamp}),(t.activeTab==="roomManage"||t.activeTab==="game")&&(a(),t.activeTab==="roomManage"&&Ne(),t.activeTab==="game"&&(t.gameChatOpen?V():Be()))}},t.socket.onclose=()=>{Te(null),window.setTimeout(()=>fa(e,a),3e3)})},ct=()=>{if(!t.authOpen||t.user)return"";const e=t.authMode==="login";return`
    <div class="modal-overlay" data-act="closeAuth"></div>
    <section class="modal auth-modal">
      <div class="modal-head">
        <div>
          <h2>${r(e?"login":"register")}</h2>
          <p>${r("authHint")}</p>
        </div>
        <button class="chip" data-act="closeAuth">${r("close")}</button>
      </div>

      <article class="auth-card">
        <div class="stack">
          <input id="authUsername" placeholder="${r("username")}" />
          <input id="authPassword" placeholder="${r("password")}" type="password" />
          <button class="primary" data-act="authSubmit">${r(e?"login":"createAccount")}</button>
          <button class="chip" data-act="switchAuthMode">${r(e?"switchToRegister":"switchToLogin")}</button>
        </div>
      </article>

      <div id="authStatus" class="status"></div>
    </section>
  `},dt=()=>{if(!t.roomModalOpen||!t.user)return"";const e=t.roomModalMode==="create";return`
    <div class="modal-overlay" data-act="closeRoomModal"></div>
    <section class="modal room-modal">
      <div class="modal-head">
        <div>
          <h2>${r(e?"createRoom":"connectCode")}</h2>
          <p>${r(e?"heroSubtitle":"joinHint")}</p>
        </div>
        <button class="chip" data-act="closeRoomModal">${r("close")}</button>
      </div>

      <article class="auth-card">
        ${e?`
        <div class="stack">
          <input id="roomName" placeholder="${r("roomName")}" />
          <label class="toggle-row"><input id="roomIsPublic" type="checkbox" checked /> ${r("roomVisibilityPublicToggle")}</label>
          <p class="field-help">${r("roomCreateAccessHint")}</p>
          <label class="field-stack">
            <span>${r("roomSize")}</span>
            <select id="roomMaxPlayers">
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6" selected>6</option>
            </select>
          </label>
          <input id="roomPassword" placeholder="${r("roomPasswordOptional")}" type="password" />
          <p class="field-help">${r("roomPasswordHint")}</p>
          <button class="primary" data-act="createRoom">${r("createRoom")}</button>
        </div>`:`
        <div class="stack">
          <input id="inviteCode" placeholder="AB12CD" maxlength="6" />
          <input id="joinPassword" placeholder="${r("roomPasswordOptional")}" type="password" />
          <label><input id="joinAsSpectator" type="checkbox" /> ${r("spectator")}</label>
          <button class="secondary" data-act="joinByCode">${r("connect")}</button>
        </div>`}
      </article>

      <div id="homeStatus" class="status">${i(t.homeStatusMessage||"")}</div>
    </section>
  `},lt=()=>!t.roomSettingsOpen||!t.activeRoom||t.activeRoom.ownerId!==t.user?.id?"":`
    <div class="modal-overlay" data-act="closeRoomSettings"></div>
    <section class="modal room-modal">
      <div class="modal-head">
        <div>
          <h2>${r("roomSettingsModalTitle")}</h2>
          <p>${r("roomSettingsHint")}</p>
        </div>
        <button class="chip" data-act="closeRoomSettings">${r("close")}</button>
      </div>
      <article class="auth-card">
        <div class="stack">
          <div class="settings-card">
            <label class="toggle-row"><input id="manageIsPublic" type="checkbox" ${t.activeRoom.isPublic?"checked":""} /> ${r("roomVisibilityPublicToggle")}</label>
            <p class="field-help">${r("roomCreateAccessHint")}</p>
            <label class="field-stack">
              <span>${r("roomSize")}</span>
              <select id="manageMaxPlayers">
                ${[2,3,4,5,6].map(e=>`<option value="${e}" ${Number(t.activeRoom.maxPlayers||6)===e?"selected":""}>${e}</option>`).join("")}
              </select>
            </label>
            <p class="field-help">${r("roomSizeHelp")}</p>
          </div>
          <input id="managePassword" type="password" placeholder="${r("roomPasswordOptional")}" />
          <p class="field-help">${r("roomPasswordHint")}</p>
          <div class="row">
            <button class="primary" data-act="saveRoomSettings">${r("saveRoomSettings")}</button>
          </div>
        </div>
      </article>
      <div id="roomManageStatus" class="status"></div>
    </section>
  `,mt=()=>t.joinLobbyModalOpen?`
    <div class="modal-overlay" data-act="closeJoinLobbyModal"></div>
    <section class="modal room-modal">
      <div class="modal-head">
        <div>
          <h2>${r("joinLobby")}</h2>
          <p>${t.joinLobbyNeedsPassword?r("joinPasswordHint"):r("joinPublicLobbyHint")}</p>
        </div>
        <button class="chip" data-act="closeJoinLobbyModal">${r("close")}</button>
      </div>
      <article class="auth-card">
        <div class="stack">
          ${t.joinLobbyNeedsPassword?`<input id="lobbyJoinPassword" placeholder="${r("roomPasswordOptional")}" type="password" />`:""}
          <label><input id="lobbyJoinAsSpectator" type="checkbox" ${t.joinLobbySpectator?"checked":""} /> ${r("spectator")}</label>
          <button class="primary" data-act="confirmJoinLobby">${r("connect")}</button>
        </div>
      </article>
      <div id="joinLobbyStatus" class="status"></div>
    </section>
  `:"",ut=()=>{if(!t.roomSwitchPromptOpen)return"";const e=t.roomSwitchPromptMode==="close"?r("closeAndJoinRoom"):r("leaveAndJoinRoom"),a=t.roomSwitchPromptMode==="close"?r("roomSwitchCloseHint",{target:t.roomSwitchTargetLabel||"room"}):r("roomSwitchLeaveHint",{target:t.roomSwitchTargetLabel||"room"});return`
    <div class="modal-overlay" data-act="closeRoomSwitchModal"></div>
    <section class="modal room-modal">
      <div class="modal-head">
        <div>
          <h2>${r("roomSwitchTitle")}</h2>
          <p>${a}</p>
        </div>
        <button class="chip" data-act="closeRoomSwitchModal">${r("close")}</button>
      </div>
      <div class="room-switch-accent">${r("roomSwitchAccent")}</div>
      <article class="auth-card">
        <div class="row">
          <button class="primary" data-act="confirmRoomSwitch">${e}</button>
          <button class="secondary" data-act="cancelRoomSwitch">${r("close")}</button>
        </div>
      </article>
      <div id="roomSwitchStatus" class="status"></div>
    </section>
  `},pt=()=>t.roomNoticeMessage?`<div class="room-notice">
    <span>${i(t.roomNoticeMessage)}</span>
    <button class="chip" data-act="closeRoomNotice">${r("close")}</button>
  </div>`:"",m=e=>`<span class="event-actor">${i(e)}</span>`,g=e=>`<span class="event-card">${i(e)}</span>`,l=e=>(Array.isArray(t.activeMatch?.players)?t.activeMatch.players:[]).find(s=>s.userId===e)?.username||e||r("systemUnknownUser"),qe=(e,a,s)=>`
  <button
    class="discard-stack-card"
    data-act="previewDiscardCard"
    data-card-code="${i(e.code||"")}"
    data-card-name="${i(e.name||e.code||"")}"
    data-card-value="${i(String(e.value??0))}"
    data-owner-name="${i(a||"")}"
    style="--stack-index:${i(String(s))}"
    title="${i(e.name||e.code||"")}"
  >
    <span class="discard-stack-card-value">${i(String(e.value??0))}</span>
    <span class="discard-stack-card-name">${i(e.name||e.code||"")}</span>
  </button>
`,gt=(e,a,s="showdown-card")=>`
  <button
    class="${s}"
    data-act="previewDiscardCard"
    data-card-code="${i(e.code||"")}"
    data-card-name="${i(e.name||e.code||"")}"
    data-card-value="${i(String(e.value??0))}"
    data-owner-name="${i(a||"")}"
    title="${i(e.name||e.code||"")}"
  >
    <span class="${s}-value">${i(String(e.value??0))}</span>
    <span class="${s}-name">${i(e.name||e.code||"")}</span>
  </button>
`,Ye=(e,a="showdown-card",s="showdown-card-value",o="showdown-card-name")=>`
  <div class="${a} static-card" aria-hidden="true">
    <span class="${s}">${i(String(e?.value??0))}</span>
    <span class="${o}">${i(e?.name||e?.code||"")}</span>
  </div>
`,wa=e=>e<=2?7:e===3?6:e===4?5:4,vt=e=>{if(e.type==="system"||e.type==="round_summary")return i(e.text||"");if(e.type==="card_played"){const a=l(e.actorUserId);return`${m(a)}: ${r("playedCardEvent",{card:g(e.cardName||e.cardCode||"card")})}`}if(e.type==="guard_guess_hit"){const a=l(e.actorUserId),s=l(e.targetUserId);return r("guardHitEvent",{actor:m(a),target:m(s),card:g(e.guessedCardName||e.guessedCardCode||"card")})}if(e.type==="decree_guard_guess_hit"){const a=l(e.actorUserId),s=l(e.targetUserId);return r("decreeGuardHitEvent",{actor:m(a),target:m(s),card:g(e.guessedCardName||e.guessedCardCode||"card")})}if(e.type==="decree_guard_guess_miss"){const a=l(e.actorUserId),s=l(e.targetUserId);return r("decreeGuardMissEvent",{actor:m(a),target:m(s),card:g(e.guessedCardName||e.guessedCardCode||"card")})}if(e.type==="decree_guard_counter_guess_hit"){const a=l(e.actorUserId),s=l(e.targetUserId);return r("decreeGuardCounterHitEvent",{actor:m(a),target:m(s),card:g(e.guessedCardName||e.guessedCardCode||"card")})}if(e.type==="decree_guard_counter_guess_miss"){const a=l(e.actorUserId),s=l(e.targetUserId);return r("decreeGuardCounterMissEvent",{actor:m(a),target:m(s),card:g(e.guessedCardName||e.guessedCardCode||"card")})}if(e.type==="decree_no_target"){const a=l(e.actorUserId);return r("decreeNoTargetEvent",{actor:m(a),card:g(e.cardName||e.cardCode||"card")})}if(e.type==="guard_guess_miss"){const a=l(e.actorUserId),s=l(e.targetUserId);return r("guardMissEvent",{actor:m(a),target:m(s),card:g(e.guessedCardName||e.guessedCardCode||"card")})}if(e.type==="guard_no_target"){const a=l(e.actorUserId);return r("guardNoTargetEvent",{actor:m(a),card:g("Стражник")})}if(e.type==="guard_miss_resolved")return r("guardMissResolvedEvent",{card:g("Стражник")});if(e.type==="peasant_reaction_safe"){const a=l(e.actorUserId);return r("peasantReactionSafeEvent",{actor:m(a),card:g("Крестьянин")})}if(e.type==="peasant_reaction_eliminated"){const a=l(e.actorUserId);return r("peasantReactionEliminatedEvent",{actor:m(a),card:g("Крестьянин")})}if(e.type==="peasant_reaction_skipped"){const a=l(e.actorUserId);return r("peasantReactionSkippedEvent",{actor:m(a),card:g("Крестьянин")})}if(e.type==="scout_lock_applied"){const a=l(e.actorUserId),s=l(e.targetUserId);return r("scoutLockEvent",{actor:m(a),target:m(s)})}if(e.type==="scout_no_target"){const a=l(e.actorUserId);return r("scoutNoTargetEvent",{actor:m(a),card:g("Разведчик")})}if(e.type==="executioner_eliminate"){const a=l(e.actorUserId),s=l(e.targetUserId);return r("executionerEliminateEvent",{actor:m(a),target:m(s)})}if(e.type==="executioner_survive"){const a=l(e.actorUserId),s=l(e.targetUserId);return r("executionerSurviveEvent",{actor:m(a),target:m(s)})}if(e.type==="executioner_no_target"){const a=l(e.actorUserId);return r("executionerNoTargetEvent",{actor:m(a),card:g("Палач")})}if(e.type==="lady_protection_applied"){const a=l(e.actorUserId);return r("ladyProtectionEvent",{actor:m(a),card:g("Дворянка")})}if(e.type==="bishop_token_applied"){const a=l(e.actorUserId);return r("bishopTokenEvent",{actor:m(a),card:g("Епископ")})}if(e.type==="queen_no_decree"){const a=l(e.actorUserId);return r("queenNoDecreeEvent",{actor:m(a),card:g("Королева")})}if(e.type==="queen_decree_suppressed"){const a=l(e.actorUserId);return r("queenDecreeSuppressedEvent",{actor:m(a),card:g("Королева"),decree:g(e.targetCardName||e.targetCardCode||"decree")})}if(e.type==="king_discard_elimination"){const a=l(e.actorUserId),s=l(e.targetUserId);return e.actorUserId===e.targetUserId?r("kingSelfEliminationEvent",{actor:m(a),card:g("Король")}):r("kingForcedEliminationEvent",{actor:m(a),target:m(s),card:g(e.targetCardName||e.targetCardCode||"card")})}if(e.type==="rebel_redraw"){const a=l(e.actorUserId),s=l(e.targetUserId);return r("rebelRedrawEvent",{actor:m(a),target:m(s),card:g(e.targetCardName||e.targetCardCode||r("systemUnknownUser"))})}if(e.type==="black_rose_saved"){const a=l(e.actorUserId),s=l(e.targetUserId);return r("blackRoseSavedEvent",{actor:m(a),target:m(s),card:g(e.targetCardName||e.targetCardCode||"card")})}if(e.type==="feudal_no_target"){const a=l(e.actorUserId);return r("feudalNoTargetEvent",{actor:m(a),card:g("Феодал")})}if(e.type==="feudal_inspect"){const a=l(e.actorUserId),s=l(e.targetUserId),o=l(e.secondTargetUserId);return r("feudalInspectEvent",{actor:m(a),card:g("Феодал"),firstTarget:m(s),secondTarget:m(o)})}if(e.type==="feudal_swap"){const a=l(e.actorUserId),s=l(e.targetUserId),o=l(e.secondTargetUserId);return r("feudalSwapEvent",{actor:m(a),card:g("Феодал"),firstTarget:m(s),secondTarget:m(o)})}if(e.type==="feudal_keep"){const a=l(e.actorUserId),s=l(e.targetUserId),o=l(e.secondTargetUserId);return r("feudalKeepEvent",{actor:m(a),card:g("Феодал"),firstTarget:m(s),secondTarget:m(o)})}if(e.type==="auto_played_on_leave"){const a=l(e.actorUserId);return r("autoPlayedOnLeaveEvent",{actor:m(a),card:g(e.cardName||e.cardCode||"card")})}if(e.type==="auto_discard_on_turn"){const a=l(e.actorUserId);return r("autoDiscardOnTurnEvent",{actor:m(a),card:g(e.cardName||e.cardCode||"card")})}return i(e.text||r("unknownError"))},yt=()=>{const e=(Array.isArray(t.activeMatch?.players)?t.activeMatch.players:[]).slice().sort((s,o)=>Number(o.points??0)-Number(s.points??0)),a=wa(e.length);return`
    <div class="game-card">
      <h4>${r("gameLeaderboard")}</h4>
      <ul class="game-leaderboard">
        ${e.map(s=>`<li class="${s.userId===t.user?.id?"is-self":""}">
          <span>${i(s.username||s.userId)}${s.userId===t.user?.id?` <em>${i(r("youLabel"))}</em>`:""}</span>
          <b>${i(`${String(s.points??0)}/${String(a)}`)}</b>
        </li>`).join("")}
      </ul>
    </div>
  `},ht=()=>{const a=[...Array.isArray(t.gameEventLog)?t.gameEventLog:[]].reverse();return`
    <div class="game-card">
      <h4>${r("gameEvents")}</h4>
      <div class="game-events">
        ${a.length?a.map(s=>`<div class="game-event-line ${s.type==="system"||s.type==="round_summary"?"system":""}">${vt(s)}</div>`).join(""):`<div class="game-muted">${r("gameNoEvents")}</div>`}
      </div>
    </div>
  `},bt=()=>{const e=Array.isArray(A()?.activeDecrees)?A().activeDecrees:Array.isArray(t.activeMatch?.activeDecrees)?t.activeMatch.activeDecrees:[];return`
    <div class="game-card">
      <h4>${r("activeDecrees")}</h4>
      <div class="game-decrees">
        ${e.length?e.map(a=>`
          <div class="game-decree ${a.suppressedByQueen?"suppressed":""}">
            <strong>${g(a.title||a.code)}</strong>
            <span>${i(a.effectText||"")}</span>
          </div>
        `).join(""):`<div class="game-muted">${r("noActiveDecrees")}</div>`}
      </div>
    </div>
  `},ft=()=>{const e=Array.isArray(t.roomChatMessages)?t.roomChatMessages:[];return`
    <div class="game-chat-widget ${t.gameChatOpen?"open":""}">
      ${t.gameChatOpen?`<button class="game-chat-backdrop" data-act="closeGameChatBackdrop" aria-label="${r("close")}"></button>`:""}
      ${t.gameChatOpen?`
        <div class="game-chat-card">
          <div class="game-chat-toggle-row">
            <h4>${r("roomChat")}</h4>
            <button class="chip" data-act="toggleGameChat">${r("close")}</button>
          </div>
          <div class="game-chat-popover" id="gameChatLog">
            ${(e||[]).length===0?`<div class="game-muted">${r("roomChatEmpty")}</div>`:e.map(a=>`
              <div class="game-chat-line ${a.role==="system"?"system":""}">
                <b>${i(a.username||r("roleSystem"))}</b>
                <span>${i(a.text||"")}</span>
              </div>
            `).join("")}
          </div>
          <div class="row topgap game-chat-composer">
            <input id="gameChatInput" placeholder="${r("chatPlaceholder")}" />
            <button class="primary" data-act="sendGameChat">${r("send")}</button>
          </div>
        </div>
      `:""}
      <button class="chip game-chat-fab" data-act="toggleGameChat">
        ${r("roomChat")}
        ${Number(t.gameChatUnreadCount||0)>0?`<span class="chat-unread-badge">${i(String(t.gameChatUnreadCount))}</span>`:""}
      </button>
    </div>
  `},wt=()=>{if(!t.gameCardPreview)return"";const e=t.gameCardPreview;return`
    <div class="game-card-preview-shell">
      <div class="game-card-preview">
        <button class="game-card-preview-close" data-act="closeGameCardPreview" aria-label="${r("close")}">×</button>
        <div class="game-card-preview-owner">${i(e.ownerName||"")}</div>
        <div class="game-card-preview-face">
          <span class="game-card-preview-value">${i(String(e.cardValue??0))}</span>
          <span class="game-card-preview-name">${i(e.cardName||e.cardCode||"")}</span>
        </div>
      </div>
    </div>
  `},It=()=>{const e=t.gameConfirmPrompt;return e?`
    <div class="game-card-play-prompt-shell game-confirm-prompt-shell">
      <div class="game-card-play-prompt game-confirm-prompt">
        <div class="game-card-play-prompt-head">
          <div>
            <h3>${i(e.title||"")}</h3>
            <p>${i(e.message||"")}</p>
          </div>
          <button class="chip" data-act="closeGameConfirmPrompt" aria-label="${r("close")}">×</button>
        </div>
        <div class="game-card-play-prompt-footer">
          <div class="row">
            <button class="secondary" data-act="closeGameConfirmPrompt">${i(e.cancelLabel||r("cancel"))}</button>
            <button class="primary" data-act="confirmGamePrompt">${i(e.confirmLabel||r("send"))}</button>
          </div>
        </div>
      </div>
    </div>
  `:""},Rt=()=>{const e=t.gameCardPlayPrompt,a=nt(e);if(!a)return"";const{titleKey:s,hintKey:o,summaryKey:n,emptySummaryKey:c,confirmKey:d,confirmAction:u,targetAction:y,targets:I,targetUserId:D,secondTargetUserId:M,selectedGuess:P,guessedCardCode:ie,availableGuesses:Ie,requiresGuess:Y,requiresSecondTarget:U}=a;return`
    <div class="game-card-play-prompt-shell">
      <div class="game-card-play-prompt">
        <div class="game-card-play-prompt-head">
          <div>
            <h3>${r(s)}</h3>
            <p>${r(o)}</p>
          </div>
          <button class="chip" data-act="closeGameCardPlayPrompt">${r("close")}</button>
        </div>
        <div class="game-card-play-prompt-section">
          <span class="game-card-play-prompt-label">${r(U?"feudalPromptTargets":"guardPromptTarget")}</span>
          <div class="game-card-play-prompt-grid">
            ${I.map($=>`
              <button
                class="game-prompt-option ${D===$.userId||M===$.userId?"selected":""}"
                data-act="${y}"
                data-user-id="${i($.userId)}"
              >
                <strong>
                  ${i($.username||$.userId)}
                  ${$.userId===t.user?.id?` <em>${i(r("youLabel"))}</em>`:""}
                </strong>
              </button>
            `).join("")}
          </div>
        </div>
        ${Y?`<div class="game-card-play-prompt-section">
          <span class="game-card-play-prompt-label">${r("guardPromptGuess")}</span>
          <div class="game-card-play-prompt-grid cards">
            ${Ie.map($=>`
              <button
                class="game-prompt-option card ${ie===$.code?"selected":""}"
                data-act="selectGuardGuess"
                data-card-code="${i($.code)}"
              >
                <b>${i(String($.value))}</b>
                <span>${i($.name)}</span>
              </button>
            `).join("")}
          </div>
        </div>`:""}
        <div class="game-card-play-prompt-footer">
          <div class="game-card-play-prompt-summary">
            ${Y?P?r(n,{card:P.name}):r(c):r(n)}
          </div>
          <button
            class="primary"
            data-act="${u}"
            ${!D||Y&&!ie||U&&(!M||M===D)?"disabled":""}
          >${r(d)}</button>
        </div>
      </div>
    </div>
  `},St=()=>{const e=A()?.pendingDecision||null;if(!e)return"";if(e.type==="guard_miss_peasant_reaction")return e.canReact?`
        <div class="game-card-play-prompt-shell">
          <div class="game-card-play-prompt">
            <div class="game-card-play-prompt-head">
              <div>
                <h3>${r("peasantReactionTitle")}</h3>
                <p>${r("peasantReactionHint",{card:e.guessedCardName||e.guessedCardCode||"card"})}</p>
              </div>
            </div>
            <div class="game-card-play-prompt-footer">
              <div class="game-card-play-prompt-summary">${r("peasantReactionSummary")}</div>
              <div class="row">
                <button class="secondary" data-act="skipPeasantReact">${r("peasantReactionSkip")}</button>
                <button class="primary" data-act="confirmPeasantReact">${r("peasantReactionConfirm")}</button>
              </div>
            </div>
          </div>
        </div>
      `:`
      <div class="game-card-play-prompt-shell">
        <div class="game-card-play-prompt">
          <div class="game-card-play-prompt-head">
            <div>
              <h3>${r("guardResolutionTitle")}</h3>
              <p>${r("guardResolutionHint")}</p>
            </div>
          </div>
          <div class="game-card-play-prompt-footer">
            <div class="game-card-play-prompt-summary">${r("guardResolutionSummary")}</div>
            <div class="row">
              <button class="primary" data-act="resolveGuardMiss">${r("guardResolutionConfirm")}</button>
            </div>
          </div>
        </div>
      </div>
    `;if(e.type==="queen_decree_suppression"){const o=Array.isArray(e.availableDecrees)?e.availableDecrees:[];return`
      <div class="game-card-play-prompt-shell">
        <div class="game-card-play-prompt">
          <div class="game-card-play-prompt-head">
            <div>
              <h3>${r("queenDecreePromptTitle")}</h3>
              <p>${r("queenDecreePromptHint")}</p>
            </div>
          </div>
          <div class="game-card-play-prompt-grid">
            ${o.map(n=>`
              <button class="game-prompt-option" data-act="confirmQueenDecreeSuppression" data-decree-code="${i(n.code||"")}">
                <strong>${i(n.title||n.code||"")}</strong>
                <span>${i(n.effectText||"")}</span>
              </button>
            `).join("")}
          </div>
          <div class="game-card-play-prompt-footer">
            <div class="game-card-play-prompt-summary">${r("queenDecreePromptSummary")}</div>
          </div>
        </div>
      </div>
    `}if(e.type==="suspicion_counter_guess"){const o=ba({allowGuard:!1}),n=l(e.targetUserId);return`
      <div class="game-card-play-prompt-shell">
        <div class="game-card-play-prompt">
          <div class="game-card-play-prompt-head">
            <div>
              <h3>${r("suspicionCounterTitle")}</h3>
              <p>${r("suspicionCounterHint",{target:n})}</p>
            </div>
          </div>
          <div class="game-card-play-prompt-grid cards">
            ${o.map(c=>`
              <button
                class="game-prompt-option card"
                data-act="resolveSuspicionCounterGuess"
                data-card-code="${i(c.code)}"
              >
                <b>${i(String(c.value))}</b>
                <span>${i(c.name)}</span>
              </button>
            `).join("")}
          </div>
          <div class="game-card-play-prompt-footer">
            <div class="game-card-play-prompt-summary">${r("suspicionCounterSummary")}</div>
          </div>
        </div>
      </div>
    `}if(e.type!=="feudal_lord_swap")return"";const a=l(e.targetUserId),s=l(e.secondTargetUserId);return`
    <div class="game-card-play-prompt-shell">
      <div class="game-card-play-prompt">
        <div class="game-card-play-prompt-head">
          <div>
            <h3>${r("feudalResolveTitle")}</h3>
            <p>${r("feudalResolveHint")}</p>
          </div>
        </div>
        <div class="game-card-play-prompt-grid">
          <div class="game-prompt-option card reveal-card">
            <strong>${i(a)}</strong>
            ${Ye(e.targetCard,"showdown-card prompt-showdown-card","showdown-card-value prompt-showdown-card-value","showdown-card-name prompt-showdown-card-name")}
          </div>
          <div class="game-prompt-option card reveal-card">
            <strong>${i(s)}</strong>
            ${Ye(e.secondTargetCard,"showdown-card prompt-showdown-card","showdown-card-value prompt-showdown-card-value","showdown-card-name prompt-showdown-card-name")}
          </div>
        </div>
        <div class="game-card-play-prompt-footer">
          <div class="game-card-play-prompt-summary">${r("feudalResolveSummary")}</div>
          <div class="row">
            <button class="secondary" data-act="confirmFeudalKeep">${r("feudalKeepConfirm")}</button>
            <button class="primary" data-act="confirmFeudalSwap">${r("feudalSwapConfirm")}</button>
          </div>
        </div>
      </div>
    </div>
  `},Ct=()=>{const e=A(),a=Array.isArray(e?.revealedCards)?e.revealedCards:[];return a.length===0?"":`
    <aside class="game-revealed-rail" aria-label="revealed-cards">
      ${a.map((s,o)=>qe(s,"",o)).join("")}
    </aside>
  `},Pt=()=>{const e=Array.isArray(t.activeMatch?.players)?t.activeMatch.players:[],a=A(),s=Array.isArray(a?.players)?a.players:[],o=e.filter(u=>u.userId!==t.user?.id),n=Math.max(2,e.length||2),c={2:["seat-top"],3:["seat-top-left","seat-top-right"],4:["seat-left-mid","seat-top","seat-right-mid"],5:["seat-left-top","seat-top","seat-right-top","seat-right-bottom"],6:["seat-left-top","seat-left-bottom","seat-top","seat-right-top","seat-right-bottom"]},d=c[n]||c[6];return o.map((u,y)=>{const I=s.find(U=>U.userId===u.userId),D=a?.activePlayerId===u.userId,M=Array.isArray(I?.discard)?I.discard:[],P=Array.isArray(I?.hand)?I.hand:[],ie=!!I?.protectedFromEffects,Ie=!!I?.hasBlackRoseToken,Y=a?.status==="finished"&&P.length>0;return`
      <article class="table-player ${d[y]||"seat-top"} ${D?"active":""}">
        <div class="table-player-name">
          ${i(u.username||u.userId)}
          ${ie?`<span class="table-player-status protection">${i(r("protectedBadge"))}</span>`:""}
          ${Ie?`<span class="table-player-status rose">${i(r("blackRoseBadge"))}</span>`:""}
        </div>
        <div class="table-player-meta">
          <span class="table-player-discard-count">${r("gameDiscardCount")}: ${i(String(M.length))}</span>
          <div class="table-player-discard discard-stack">
            ${M.map((U,$)=>qe(U,u.username||u.userId,$)).join("")}
          </div>
          ${Y?`
            <div class="table-player-showdown">
              <div class="table-player-showdown-cards">
                ${P.map(U=>gt(U,u.username||u.userId)).join("")}
              </div>
            </div>
          `:""}
        </div>
      </article>
    `}).join("")},$t=()=>{if(t.activeMatch?.status!=="finished")return"";const e=(Array.isArray(t.activeMatch?.players)?t.activeMatch.players:[]).slice().sort((c,d)=>Number(d.points??0)-Number(c.points??0)),a=e.find(c=>c.userId===t.activeMatch?.winnerUserId)||null,s=wa(e.length),o=t.activeRoom?.ownerId===t.user?.id,n=o&&Number(t.activeRoom?.participants?.length||0)===1;return`
    <div class="game-finish-shell">
      <div class="game-finish-panel">
        <div class="game-finish-kicker">${r("gameFinalTitle")}</div>
        <h2>${i(r("matchWinner",{winner:a?.username||t.activeMatch?.winnerUserId||r("systemUnknownUser")}))}</h2>
        <div class="game-finish-stats">
          <div class="game-finish-stat">
            <span>${r("gameFinalStatsRounds")}</span>
            <strong>${i(String(t.activeMatch?.roundNumber||0))}</strong>
          </div>
          <div class="game-finish-stat">
            <span>${r("gameFinalStatsTarget")}</span>
            <strong>${i(String(s))}</strong>
          </div>
        </div>
        <div class="game-finish-scoreboard">
          ${e.map(c=>`
            <div class="game-finish-score-row ${c.userId===t.activeMatch?.winnerUserId?"winner":""}">
              <span>${i(c.username||c.userId)}${c.userId===t.user?.id?` <em>${i(r("youLabel"))}</em>`:""}</span>
              <b>${i(`${String(c.points??0)}/${String(s)}`)}</b>
            </div>
          `).join("")}
        </div>
        <div class="game-finish-actions">
          ${n?`<button class="chip" data-act="returnToRoomAfterMatch">${r("gameReturnToRoom")}</button>`:""}
          <button class="secondary" data-act="leaveFinishedMatch">${r("gameFinalLeave")}</button>
          <button class="primary" data-act="playAgainMatch" ${o?"":"disabled"}>${r("gamePlayAgain")}</button>
        </div>
        ${o?"":`<p class="game-finish-hint">${i(r("gamePlayAgainOwnerOnly"))}</p>`}
      </div>
    </div>
  `},Tt=()=>{const e=Ee(),a=Array.isArray(e?.hand)?e.hand:[],s=Array.isArray(e?.discard)?e.discard:[],o=ia(),n=e?.lockedCardInstanceId||null,c=e?.lockedCardCode||null,d=!!e?.protectedFromEffects,u=!!e?.hasBlackRoseToken;return`
    <section class="game-hand-dock">
      <div class="game-my-table">
        <div class="game-my-table-head">
          <span class="game-my-table-label">
            ${r("gameMyTable")}
            ${d?`<span class="table-player-status protection">${i(r("protectedBadge"))}</span>`:""}
            ${u?`<span class="table-player-status rose">${i(r("blackRoseBadge"))}</span>`:""}
          </span>
          <span class="game-turn-badge ${o?"turn":"wait"}">${r(o?"gameYourTurn":"gameWaitTurn")}</span>
        </div>
        <div class="game-my-table-cards discard-stack discard-stack-centered">
          ${s.length?s.map((y,I)=>qe(y,r("gameMyTable"),I)).join(""):`<span class="game-muted">${r("gameNoCardsOnTable")}</span>`}
        </div>
      </div>
      <div class="game-hand-cards">
        ${a.map(y=>{const I=n&&y.instanceId===n||!n&&c&&y.code===c;return`
          <button
            class="game-card-button ${o?"":"muted"} ${I?"locked":""}"
            data-act="playCard"
            data-card-code="${i(y.code)}"
            data-card-instance-id="${i(y.instanceId||"")}"
            data-card-locked="${i(String(!!I))}"
          >
            <span class="game-card-value">${i(String(y.value??0))}</span>
            <span class="game-card-name">${i(y.name||y.code)}</span>
            ${I?`<span class="game-card-lock-badge">${i(r("cardLockedBadge"))}</span>`:""}
          </button>
        `}).join("")}
      </div>
    </section>
  `},Et=()=>{if(!t.activeMatch?.matchId)return`<section class="game-empty">${r("gameNoActiveMatch")}</section>`;const e=A(),a=Math.max(2,Array.isArray(t.activeMatch?.players)?t.activeMatch.players.length:2),s=t.activeMatch?.lastRoundSummary,n=!!s?.winnerNames?.length&&t.activeMatch?.status==="pending"&&e?.status==="finished"?r("roundWinnerSummary",{round:s.roundNumber,winners:s.winnerNames.join(", ")}):"",c=t.gameStatusMessage?`<div class="game-summary-banner winner">${i(t.gameStatusMessage)}</div>`:e?.hasPendingDecision?`<div class="game-summary-banner">${i(r("guardResolutionPending"))}</div>`:"";return`
    <section class="game-layout">
      <main class="game-table-wrap">
        ${n?`<div class="game-summary-banner round-summary-temp">${i(n)}</div>`:""}
        ${c}
        <div class="game-table table-layout-${i(String(a))}">
          ${Ct()}
          <div class="game-center-stack">
            <div class="game-set-aside">
              <div class="game-deck-title">${r("setAsideCardLabel")}</div>
              <div class="game-set-aside-card hidden-card" title="${r("setAsideHiddenHint")}">
                <span class="game-set-aside-hidden-mark">?</span>
              </div>
            </div>
            <div class="game-main-deck">
              <div class="game-deck-title">${r("gameDeck")}</div>
              <div class="game-deck">
                <div class="game-deck-count">${i(String(e?.deckCount??0))}</div>
              </div>
            </div>
          </div>
          ${Pt()}
        </div>
        ${Tt()}
      </main>
      <aside class="game-sidebar">
        ${yt()}
        ${bt()}
        ${ht()}
      </aside>
      ${ft()}
      ${$t()}
      ${wt()}
      ${It()}
      ${Rt()}
      ${St()}
    </section>
  `},At=e=>{const a=Number(e||Date.now()),s=Number.isFinite(a)?new Date(a*(a<1e10?1e3:1)):new Date;return new Intl.DateTimeFormat(t.lang==="en"?"en-US":"ru-RU",{hour:"2-digit",minute:"2-digit"}).format(s)},Nt=(e,a="?")=>String(e||a).trim().charAt(0).toUpperCase()||a,De=e=>e.isPublic&&e.hasPassword?r("roomAccessPublicProtected"):e.isPublic?r("roomAccessPublicOpen"):e.hasPassword?r("roomAccessPrivateProtected"):r("roomAccessPrivateCodeOnly"),kt=()=>`
  <section class="hero">
    <div class="hero-mist" aria-hidden="true"></div>
    <div class="hero-copy">
      <span class="hero-kicker">${r("appTag")}</span>
      <h1>LETTERS:<br/>NO MERCY</h1>
      <p class="hero-subline">DARK MEDIEVAL STORIES</p>
      <p>${r("heroSubtitle")}</p>
      <div class="hero-actions">
        <button class="primary" data-act="heroCreate">＋ ${r("heroCreate")}</button>
        <button class="secondary" data-act="heroJoin">${r("heroJoin")}</button>
      </div>
    </div>
    <div class="hero-art" aria-hidden="true">
      <div class="castle-silhouette"></div>
      <div class="letter-token"></div>
    </div>
  </section>
`,_t=()=>{const e=t.homeLobbies;return`
    <section class="lobby-card">
      <div class="lobby-head">
        <h3>${r("availableRooms")}</h3>
        <button class="chip" data-tab="lobbies">${r("navLobbies")}</button>
      </div>
      <div class="lobby-list">
        ${e.length===0?`<p>${r("lobbyNoItems")}</p>`:e.map(a=>`
          <article class="lobby-item">
            <div class="lobby-icon">${a.isPublic?"☀":"☾"}</div>
            <div class="lobby-meta">
              <h4>${i(a.name)} ${a.hasPassword?'<span class="inline-tag">🔒</span>':""}</h4>
              <p>${De(a)}</p>
              <p>${r("roomOwnerName")}: ${i(a.ownerUsername||a.ownerUserId||"—")}</p>
            </div>
            <div class="lobby-count">👥 ${a.playersCount} / ${a.maxPlayers||6}</div>
            <button class="secondary" data-act="joinLobby" data-room-id="${i(a.roomId)}" data-room-name="${i(a.name)}" data-room-owner-id="${i(a.ownerUserId||"")}" data-room-has-password="${a.hasPassword?"1":"0"}">${r("joinLobby")}</button>
          </article>
        `).join("")}
      </div>
    </section>
  `},Lt=()=>`
  ${kt()}
  ${_t()}
`,Mt=()=>`
  <h2>${r("lobbyTitle")}</h2>
  <p>${r("lobbyHint")}</p>
  <article>
    <div class="row">
      <select id="lobbyPasswordFilter">
        <option value="all" ${t.lobbyFilters.password==="all"?"selected":""}>${r("passwordAll")}</option>
        <option value="with_password" ${t.lobbyFilters.password==="with_password"?"selected":""}>${r("passwordWith")}</option>
        <option value="without_password" ${t.lobbyFilters.password==="without_password"?"selected":""}>${r("passwordWithout")}</option>
      </select>
      <input id="lobbyLimit" type="number" min="1" max="100" value="${t.lobbyFilters.limit}" />
      <button class="secondary" data-act="loadLobbies">${r("loadLobbies")}</button>
      <button class="chip" data-act="heroJoin">${r("connectCode")}</button>
    </div>
    <p class="room-section-hint">${r("lobbyCatalogHint")}</p>
  </article>
  <div class="lobby-list topgap">
    ${t.lobbyCatalog.length===0?`<article><p>${r("lobbyNoItems")}</p></article>`:t.lobbyCatalog.map(e=>`
      <article class="lobby-item">
        <div class="lobby-icon">${e.isPublic?"☀":"☾"}</div>
        <div class="lobby-meta">
          <h4>${i(e.name)}</h4>
          <p>${De(e)}</p>
          <p>${r("roomOwnerName")}: ${i(e.ownerUsername||e.ownerUserId||"—")}</p>
        </div>
        <div class="lobby-count">👥 ${e.playersCount} / ${e.maxPlayers||6}</div>
        <button class="secondary" data-act="joinLobby" data-room-id="${i(e.roomId)}" data-room-name="${i(e.name)}" data-room-owner-id="${i(e.ownerUserId||"")}" data-room-has-password="${e.hasPassword?"1":"0"}">${r("joinLobby")}</button>
      </article>
    `).join("")}
  </div>
`,Ut=()=>{if(!t.user)return"";const e=t.myRooms||[];return`
    <article>
      <h3>${r("myRooms")}</h3>
      <div class="stack">
        ${e.length===0?`<p>${r("lobbyNoItems")}</p>`:e.map(a=>`
          <div class="row my-room-row">
            <span>${i(a.name)} (${i(a.inviteCode)})</span>
            <button class="chip" data-act="openOwnedRoom" data-room-id="${i(a.roomId)}">${r("openRoom")}</button>
          </div>
        `).join("")}
      </div>
    </article>
  `},Ot=()=>t.user?`
    <h2>${r("profileTitle")}</h2>
    <div class="grid">
      <article>
        <h3>${r("profileEdit")}</h3>
        <div class="stack">
          <input id="profileUsername" value="${i(t.user.username)}" />
          <button class="primary" data-act="saveProfile">${r("saveProfile")}</button>
        </div>
      </article>
      ${Ut()}
      <article>
        <h3>${r("changePassword")}</h3>
        <div class="stack">
          <input id="currentPassword" placeholder="${r("currentPassword")}" type="password" />
          <input id="nextPassword" placeholder="${r("nextPassword")}" type="password" />
          <button class="secondary" data-act="changePassword">${r("changePassword")}</button>
        </div>
      </article>
    </div>
    <div id="profileStatus" class="status"></div>
  `:`<h2>${r("profileTitle")}</h2><div class="status">${r("needAuthProfile")}</div>`,ze=e=>{const a=t.user?.id===e.userId,s=t.user?.id&&t.activeRoom?.ownerId===t.user.id,o=s&&e.userId!==t.activeRoom?.ownerId,n=s&&e.role==="player"&&e.userId!==t.activeRoom?.ownerId,c=s&&e.role==="player"&&e.userId!==t.activeRoom?.ownerId,d={owner:r("roleOwnerShort"),player:r("rolePlayerShort"),spectator:r("roleSpectatorShort")};return`
    <li class="participant-item">
      <div class="participant-row">
        <div class="participant-main">
          <span class="participant-avatar role-${i(e.role)}">${i(Nt(e.username,"U"))}</span>
          <div class="participant-identity">
            <div class="participant-name-row">
              <b class="role-${i(e.role)}">${i(e.username)}</b>
              ${a?`<span class="inline-note">(${r("youLabel")})</span>`:""}
              ${e.role==="owner"?`<span class="badge-chip owner-badge">${r("participantOwnerBadge")}</span>`:""}
            </div>
            <div class="participant-meta">
              ${i(d[e.role]||e.role)}
              <span class="status-dot ${e.ready?"ready":"idle"}"></span>
              <span class="ready-state ${e.ready?"ready":"idle"}">${e.ready?r("participantReadyBadge"):r("participantNotReadyBadge")}</span>
            </div>
          </div>
        </div>
        ${o||n||c?`<div class="participant-actions participant-actions-inline">
          ${c?`<button class="chip icon-chip" title="${r("transferOwnershipSymbolLabel")}" aria-label="${r("transferOwnership")}" data-act="transferOwnership" data-user-id="${i(e.userId)}">♔</button>`:""}
          ${o?`<button class="chip icon-chip" title="${r("kickSymbolLabel")}" aria-label="${r("kickPlayer")}" data-act="kickParticipant" data-user-id="${i(e.userId)}">×</button>`:""}
          ${n?`<button class="chip icon-chip" title="${r("banSymbolLabel")}" aria-label="${r("banPlayer")}" data-act="banParticipant" data-user-id="${i(e.userId)}">⛔</button>`:""}
        </div>`:""}
      </div>
    </li>
  `},qt=()=>{if(!t.activeRoom)return"";const e=Array.isArray(t.activeRoom.participants)?t.activeRoom.participants:[],a=e.filter(P=>P.role!=="spectator"),s=e.filter(P=>P.role==="spectator"),o=!!t.user?.id&&t.user.id===t.activeRoom.ownerId,n=e.find(P=>P.userId===t.user?.id),c=n?.role==="owner"||n?.role==="player",d=!!t.activeMatch?.matchId,u=d&&t.activeMatch?.status!=="finished",y=d&&t.activeMatch?.status==="finished"&&(Array.isArray(t.activeMatch?.players)&&t.activeMatch.players.some(P=>P.userId===t.user?.id)||n?.role==="spectator"),I=u||y,D=t.activeRoom.isPublic?r("visibilityPublic"):r("visibilityPrivate"),M=`${a.length} / ${t.activeRoom.maxPlayers||6}`;return`
    <article class="room-panel">
      <div class="room-panel-head">
        <div>
          <div class="hero-kicker">${r("roomDetails")}</div>
          <h3 class="room-title">${i(t.activeRoom.name||r("roomDetails"))}</h3>
        </div>
        <div class="room-live-pill">${r("roomLiveSync")}</div>
      </div>
      <div class="room-meta room-meta-cards">
        <div class="room-stat-card room-stat-code">
          <span>${r("roomCode")}</span>
          <div class="room-stat-main room-code-row"><b>${i(t.activeRoom.inviteCode||"—")}</b> ${o?`<button class="chip room-code-action icon-chip" title="${r("regenerateInvite")}" aria-label="${r("regenerateInvite")}" data-act="regenInvite">${r("regenerateInviteShort")}</button>`:""}</div>
        </div>
        <div class="room-stat-card">
          <span>${r("roomOwnerName")}</span>
          <div class="room-stat-main">${i(t.activeRoom.ownerUsername||t.activeRoom.ownerId||"—")}</div>
        </div>
        <div class="room-stat-card">
          <span>${r("roomVisibilityLabel")}</span>
          <div class="room-stat-main">${D}</div>
        </div>
        <div class="room-stat-card">
          <span>${r("roomAccessLabel")}</span>
          <div class="room-stat-main">${De(t.activeRoom)}</div>
        </div>
        <div class="room-stat-card">
          <span>${r("roomStatsLabel")}</span>
          <div class="room-stat-main">${M}</div>
        </div>
      </div>
      <div class="room-lists">
        <div class="room-list-card">
          <h4>${r("roomParticipants")} (${a.length})</h4>
          <ul class="participant-list">${a.map(ze).join("")}</ul>
        </div>
        <div class="room-list-card">
          <h4>${r("roomSpectators")} (${s.length})</h4>
          <ul class="participant-list">${s.map(ze).join("")}</ul>
        </div>
      </div>
      <div class="stack">
        <h4>${r("roomActions")}</h4>
        <div class="room-actions">
          ${c?`<button class="secondary" data-act="readyRoom">${n?.ready?r("markNotReady"):r("markReady")}</button>`:""}
          ${o?`<button class="primary" data-act="startGame">${u?r("openActiveGame"):t.activeMatch?.status==="finished"?r("gamePlayAgain"):r("startGame")}</button>`:""}
          ${!o&&I?`<button class="secondary" data-act="openGame">${t.activeMatch?.status==="finished"?r("openMatchResults"):r("openActiveGame")}</button>`:""}
          ${o?`<button class="secondary" data-act="openRoomSettings">${r("openRoomSettings")}</button>`:""}
          <button class="chip" data-act="leaveRoom">${r(o?"closeOwnedRoom":"leaveRoom")}</button>
        </div>
      </div>
      <div id="roomStatus" class="status">${i(t.roomStatusMessage||"")}</div>
    </article>
  `},Dt=()=>t.activeRoom?`
    <div class="room-manage-layout">
      <article class="room-chat-wide">
        <div class="room-chat-head">
          <div>
            <h3>${r("roomChat")}</h3>
            <p class="room-section-hint">${r("roomChatHint")}</p>
          </div>
        </div>
        <div class="chat-log" id="roomChatLog">
          ${(t.roomChatMessages||[]).length===0?`<div class="chat-empty">${r("roomChatEmpty")}</div>`:(t.roomChatMessages||[]).map(e=>{const a=e.userId&&t.user?.id&&e.userId===t.user.id,s=e.role==="system"?"system":a?"self":"remote",o=a?r("selfMessageLabel"):e.username||r("roleSystem");return`<div class="chat-line ${s}">
              <div class="chat-meta-row">
                <span class="chat-author">${i(o)}</span>
                <span class="chat-time">${i(At(e.timestamp))}</span>
              </div>
              <div class="chat-bubble">${i(e.text||"")}</div>
            </div>`}).join("")}
        </div>
        <div class="row topgap">
          <input id="roomChatInput" placeholder="${r("chatPlaceholder")}" />
          <button class="primary" data-act="sendRoomChat">${r("send")}</button>
        </div>
      </article>
    </div>
    <div id="roomManageStatus" class="status"></div>
  `:"",Gt=()=>{if(t.activeTab==="game")return`
    <main class="layout dark game-mode">
      <header class="game-topbar">
        <div class="game-topbar-brand">${r("appName")}</div>
        <div class="game-topbar-actions">
          <button class="chip" data-act="exitGame">${r("logout")}</button>
        </div>
      </header>
      ${Et()}
      <div id="toastContainer" class="toast-container"></div>
    </main>`;const e=t.user?`<div class="profile-actions"><button class="avatar-btn" data-tab="profile">${i((t.user.username||"U").slice(0,1).toUpperCase())}</button><button class="chip" data-act="logout">${r("logout")}</button></div>`:`<button class="primary" data-act="toggleAuth">${r("openAuth")}</button>`;return`
  <main class="layout dark">
    <header class="topbar">
      <div class="topbar-brand">
        <div class="brand-mini">
          <h2>${r("appName")}</h2>
          <p class="brand-sub">${r("appGenre")}</p>
        </div>
      </div>
      <div class="topbar-content">
        <nav class="main-nav">
          <button class="tab ${t.activeTab==="home"?"active":""}" data-tab="home">${r("navHome")}</button>
          <button class="tab ${t.activeTab==="lobbies"?"active":""}" data-tab="lobbies">${r("navLobbies")}</button>
          ${t.activeRoom?`<button class="tab ${t.activeTab==="roomManage"?"active":""}" data-tab="roomManage">${r("navRoomActive")}</button>`:""}
          <button class="tab ${t.activeTab==="profile"?"active":""}" data-tab="profile">${r("navProfile")}</button>
        </nav>
        <div class="topbar-actions">
          <button class="primary topbar-create" data-act="heroCreate">＋ ${r("quickCreateRoom")}</button>
          <div class="lang-switch compact">
            <button class="chip ${t.lang==="ru"?"active":""}" data-lang="ru">RU</button>
            <button class="chip ${t.lang==="en"?"active":""}" data-lang="en">EN</button>
          </div>
          ${e}
        </div>
      </div>
    </header>

    ${pt()}

    <section class="panel ${t.activeTab==="home"?"":"hidden"} cinematic-panel">${Lt()}</section>
    <section class="panel ${t.activeTab==="lobbies"?"":"hidden"} cinematic-panel">${Mt()}</section>
    <section class="panel ${t.activeTab==="roomManage"?"":"hidden"} cinematic-panel">${qt()}${Dt()}</section>
    <section class="panel ${t.activeTab==="profile"?"":"hidden"} cinematic-panel">${Ot()}</section>

    ${ct()}
    ${dt()}
    ${lt()}
    ${mt()}
    ${ut()}
    <div id="toastContainer" class="toast-container"></div>
  </main>`},Ht=(e,a,s)=>{const o=()=>{e&&(s(),e.innerHTML=Gt(),Xa(o),t.activeTab==="home"&&ya(o),t.activeTab==="lobbies"&&et(o),t.activeTab==="profile"&&at(o),t.activeTab==="roomManage"&&Qa(o),t.activeTab==="game"&&it(o),t.authOpen&&!t.user&&Za(o,a),t.roomChatInputShouldFocus&&t.activeTab==="roomManage"&&window.requestAnimationFrame(()=>{const n=document.querySelector("#roomChatInput");n instanceof HTMLInputElement&&(n.focus(),n.setSelectionRange(n.value.length,n.value.length)),ea(!1)}))};return o},Ft=async()=>{const e=document.querySelector("#app"),a=Ht(e,Ve,Se);await Ve(),await ja(),await _("home",4),await _("catalog",t.lobbyFilters.limit,t.lobbyFilters.password),Se(),fa(async()=>{await _("home",4),await _("catalog",t.lobbyFilters.limit,t.lobbyFilters.password),Se()},a),a()};await Ft();
//# sourceMappingURL=index-BNsnUEOv.js.map
