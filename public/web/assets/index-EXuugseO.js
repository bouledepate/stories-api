(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const c of n)if(c.type==="childList")for(const d of c.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function r(n){const c={};return n.integrity&&(c.integrity=n.integrity),n.referrerPolicy&&(c.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?c.credentials="include":n.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(n){if(n.ep)return;n.ep=!0;const c=r(n);fetch(n.href,c)}})();const Oe={ru:{appTag:"Stories",title:"Control Center",subtitle:"Комнаты и профиль в одном месте.",login:"Вход",register:"Регистрация",logout:"Выйти",notAuthorized:"Не авторизованы",signedAs:"Вы вошли как",navHome:"Комнаты",navProfile:"Профиль",navLobbies:"Лобби",openAuth:"Войти / Регистрация",close:"Закрыть",cancel:"Отмена",authTitle:"Авторизация",authHint:"Откройте аккаунт или войдите в существующий.",username:"Имя пользователя",password:"Пароль",createAccount:"Создать аккаунт",loginSuccess:"Успешный вход.",registerSuccess:"Аккаунт создан и выполнен вход.",homeNeedAuth:"Выполните вход для доступа к комнатам.",roomsTitle:"Комнаты",createRoom:"Создать комнату",roomName:"Название комнаты",connectCode:"Войти по invite-коду",connect:"Подключиться",spectator:"Зайти как spectator",ready:"",roomCreated:"Комната создана. Invite code:",roomJoinSuccess:"Подключение успешно. Room:",profileTitle:"Профиль пользователя",profileEdit:"Редактирование",newPassword:"Новый пароль (опционально)",saveProfile:"Сохранить профиль",stats:"Статистика",needAuthProfile:"Сначала авторизуйтесь.",profileUpdated:"Профиль обновлен.",passwordChanged:"Пароль успешно изменён.",currentPassword:"Текущий пароль",nextPassword:"Новый пароль",changePassword:"Сменить пароль",wins:"Победы",losses:"Поражения",vt:"Victory tokens",elim3:"Eliminated with 3",healthError:"Ошибка",unknownError:"Неизвестная ошибка",httpError:"Ошибка HTTP {status}",invalidCredentials:"Неверный логин или пароль.",currentPasswordInvalid:"Текущий пароль указан неверно.",userExists:"Такой username уже занят.",unauthorized:"Требуется авторизация.",forbidden:"Недостаточно прав.",roomNotFound:"Комната не найдена.",inviteInvalid:"Некорректный invite-код.",validationFailed:"Проверьте корректность введенных данных.",serverUnavailable:"Сервер временно недоступен. Повторите позже.",invalidUrl:"Некорректный URL.",roomPasswordRequired:"Для входа в это лобби нужен пароль.",roomPasswordInvalid:"Неверный пароль лобби.",roomIsFull:"Комната заполнена. Войти можно только как зритель.",ownerAlreadyHasRoom:"У вас уже есть активная комната. Закройте её перед созданием новой.",userAlreadyHasActiveRoom:"Сначала выйдите из текущей комнаты, чтобы войти в другую.",heroTitle:"Stories: project-visual landing",heroSubtitle:"Создавайте публичные комнаты для каталога или приватные комнаты по invite-коду.",heroCreate:"Создать комнату",heroJoin:"Присоединиться",roomDetails:"Текущая комната",roomCode:"Код приглашения",roomOwner:"Владелец",roomOwnerName:"Ник владельца",roomParticipants:"Участники",roomSpectators:"Зрители",roomActions:"Действия с комнатой",leaveRoom:"Покинуть комнату",closeOwnedRoom:"Закрыть комнату",markReady:"Я готов",markNotReady:"Не готов",noFieldsToUpdate:"Нет полей для обновления.",userNotFound:"Пользователь не найден.",userNotInRoom:"Пользователь не находится в комнате.",inviteCodeGenerationFailed:"Не удалось сгенерировать invite-код.",onlyOwnerCanManageRoom:"Только владелец может управлять комнатой.",ownerCannotBeRemoved:"Владельца нельзя кикнуть или заблокировать.",cannotTransferOwnershipToSelf:"Нельзя передать владение самому себе.",onlyPlayersCanBeKicked:"Кик доступен только для игроков.",inviteRotateCooldown:"Invite-код можно пересоздавать не чаще одного раза в минуту.",youLabel:"вы",authRequiredAction:"Для этого действия войдите в аккаунт.",switchToLogin:"Уже есть аккаунт? Войти",switchToRegister:"Нет аккаунта? Регистрация",themeDark:"Тёмная",themeLight:"Светлая",lobbyTitle:"Список лобби",lobbyHint:"Фильтруйте публичные и закрытые лобби.",visibilityAll:"Все",visibilityPublic:"Публичные",visibilityPrivate:"Приватная",passwordAll:"Любые",passwordWith:"С паролем",passwordWithout:"Без пароля",loadLobbies:"Обновить список",lobbyNoItems:"Лобби не найдены",lobbyHasPassword:"Пароль",lobbyNoPassword:"Без пароля",joinLobby:"Войти в лобби",roomPassword:"Пароль комнаты",roomPasswordOptional:"Пароль комнаты (необязательно)",availableRooms:"Доступные комнаты",myRooms:"Мои комнаты",openRoom:"Открыть",joinHint:"Введите invite-код. Приватные комнаты доступны только так.",statusReady:"Статус: готов.",statusNotReady:"Статус: не готов.",joinPasswordHint:"Для этой комнаты нужен пароль. Invite-код сам по себе не заменяет пароль.",joinWithoutPasswordHint:"Это лобби без пароля. Подтвердите вход.",joinPublicLobbyHint:"Публичная комната без пароля. Подтвердите вход.",requiredField:"Заполните обязательное поле.",inviteCodeInvalid:"Введите корректный invite-код (6 символов).",roomManage:"Управление комнатой",roomManageTitle:"Настройки комнаты",saveRoomSettings:"Сохранить настройки",regenerateInvite:"Пересоздать код приглашения",kickPlayer:"Кик",banPlayer:"Блок",roomChat:"Чат комнаты",chatPlaceholder:"Введите сообщение...",send:"Отправить",roomSettingsSaved:"Настройки комнаты обновлены.",inviteRegenerated:"Invite-код обновлён.",blockedNotice:"Вы заблокированы в этой комнате.",kickedFromRoomNotice:"Вы были исключены из комнаты.",roleOwner:"Владелец",rolePlayer:"Игрок",roleSpectator:"Зритель",roleSystem:"Система",roomClosedNotice:"Комната была закрыта владельцем.",roomManageReadonly:"Только владелец может менять настройки комнаты.",appName:"Letters: No Mercy",appGenre:"Dark Medieval Stories",navRoomActive:"Комната",quickCreateRoom:"Новая комната",roleOwnerShort:"Владелец",rolePlayerShort:"Игрок",roleSpectatorShort:"Зритель",readyShort:"готов",notReadyShort:"не готов",systemJoinedRoom:"{username} вошёл в комнату.",systemLeftRoom:"{username} вышел из комнаты.",systemUnknownUser:"Игрок",transferOwnership:"Передать владельца",ownershipTransferred:"Владелец комнаты изменён.",joinCurrentRoom:"Вернуться в комнату",closeAndJoinRoom:"Закрыть и войти",leaveAndJoinRoom:"Выйти и войти",roomSwitchTitle:"Переход в другую комнату",roomSwitchLeaveHint:"Вы уже состоите в комнате. Сначала выйдите из неё, чтобы открыть «{target}».",roomSwitchCloseHint:"Вы владелец текущей комнаты. Сначала закройте её, чтобы открыть «{target}».",participantRemovedNotice:"Доступ к комнате был отозван.",kickSymbolLabel:"Кикнуть игрока",banSymbolLabel:"Заблокировать игрока",transferOwnershipSymbolLabel:"Передать владение",roomLiveSync:"Комната активна",roomVisibilityLabel:"Видимость",roomAccessLabel:"Доступ",roomStatsLabel:"Состав",roomSizeLabel:"Размер",roomProtected:"С паролем",roomOpenAccess:"Без пароля",roomVisibilityPublicToggle:"Показывать комнату в публичном каталоге",roomCreateAccessHint:"Публичные комнаты видны на главной и во вкладке лобби. Приватные комнаты не показываются в каталогах и открываются только по invite-коду.",roomPasswordHint:"Пароль добавляет дополнительную защиту поверх выбранного режима доступа.",roomSettingsHint:"Настройте публикацию комнаты, пароль и лимит игроков.",roomAccessPublicOpen:"Публичная, вход без пароля",roomAccessPublicProtected:"Публичная, вход по паролю",roomAccessPrivateCodeOnly:"Приватная, вход только по invite-коду",roomAccessPrivateProtected:"Приватная, invite-код и пароль",lobbyCatalogHint:"Здесь показываются только публичные комнаты. Приватные комнаты доступны только по invite-коду.",roomChatHint:"Здесь остаются системные события и сообщения игроков.",roomChatEmpty:"Чат пуст. Первое сообщение задаст тон партии.",selfMessageLabel:"Вы",participantOwnerBadge:"owner",participantReadyBadge:"ГОТОВ",participantNotReadyBadge:"НЕ ГОТОВ",roomSwitchAccent:"Сначала завершите текущую сессию комнаты.",roomSize:"Размер комнаты",roomSizeHelp:"От 2 до 6 игроков. Если мест нет, зайти можно только как зритель.",regenerateInviteShort:"♻",openRoomSettings:"Настройки комнаты",roomSettingsModalTitle:"Параметры комнаты",roomUpdatedSystem:"Параметры комнаты обновлены.",ownershipTransferredSystem:"{username} стал новым владельцем комнаты.",participantKickedSystem:"{username} исключён из комнаты.",participantBannedSystem:"{username} заблокирован в комнате.",startGame:"Начать игру",openActiveGame:"Перейти в игру",gameStarted:"Игра запущена.",leftGame:"Вы вышли из игры.",gameExitConfirm:"Выйти из игры и покинуть комнату?",gamePlayAgain:"Играть снова",gamePlayAgainOwnerOnly:"Новый матч может запустить только владелец комнаты.",gameFinalTitle:"Матч завершён",gameFinalStatsRounds:"Раундов сыграно",gameFinalStatsTarget:"Победных очков",gameFinalLeave:"Выйти",gameReturnToRoom:"Вернуться в комнату",gameFinalCardLabel:"Финальная карта",openMatchResults:"Итоги матча",gameNoActiveMatch:"Активный матч не найден.",gameLeaderboard:"Лидерборд",gameEvents:"Лог событий",activeDecrees:"Указы",noActiveDecrees:"Активных указов нет.",gameNoEvents:"Событий пока нет.",gameExitConfirmTitle:"Покинуть игру",kingPromptTitle:"Король",kingPromptConfirm:"Да, сбросить Короля",gameHandCount:"Карт в руке",gameDiscardCount:"Сброс",gameYourTurn:"Ваш ход",gameWaitTurn:"Ожидайте свой ход",gameMyTable:"Мой стол",gameNoCardsOnTable:"Пока пусто",gameStartRound:"Начать раунд",playedCardEvent:"разыграл карту {card}",autoPlayedOnLeaveEvent:"{actor} вышел из игры и автоматически разыграл карту: {card}.",autoDiscardOnTurnEvent:"{actor} вышел из игры и автоматически сбросил карту: {card}.",roundWinnerSummary:"Раунд {round}: победитель(и) {winners}",matchWinner:"Победитель матча: {winner}",gameDeck:"Колода",setAsideCardLabel:"Отложенная",setAsideHiddenHint:"Отложенная карта скрыта до конца раунда.",matchNotFound:"Матч не найден.",matchAlreadyExists:"Для этой комнаты уже есть активный матч.",matchAlreadyFinished:"Матч уже завершён.",notEnoughPlayersToStartMatch:"Для старта матча нужно минимум два игрока.",roundNotActive:"Раунд не активен.",roundAlreadyActive:"Раунд уже запущен.",notPlayerTurn:"Сейчас ход другого игрока.",playerNotInMatch:"Вы не участвуете в матче.",playerEliminated:"Вы выбыли из раунда.",cardNotInHand:"Этой карты нет в вашей руке.",targetPlayerRequired:"Сначала выберите цель.",targetPlayerInvalid:"Эту цель нельзя выбрать.",cardGuessRequired:"Нужно выбрать карту для угадывания.",cardGuessInvalid:"Указана недопустимая карта для угадывания.",guardCannotGuessGuard:"Стражника нельзя называть картой для угадывания.",peasantReactionOnly:"Крестьянина нельзя разыграть обычным ходом. Он играется только как реакция после промаха Стражника.",cardPlayBlocked:"Эту карту нельзя разыграть до вашего следующего хода.",kingSelfEliminateConfirm:"Если вы сбросите Короля, то сразу выбываете из раунда. Продолжить?",targetPlayerProtected:"Этого игрока сейчас защищает Дворянка.",matchStateInvalid:"Состояние матча повреждено.",playersNotReady:"Перед стартом игры все игроки должны нажать готовность.",allPlayersMustReadyHint:"Чтобы начать игру, в лобби должно быть минимум 2 игрока и все должны быть готовы.",waitingNextRound:"Ожидаем старт следующего раунда…",nextRoundIn:"Следующий раунд начнётся через {seconds}с…",newChatMessageNotice:"Новое сообщение в чате.",guardResolutionPending:"Идёт разрешение эффекта...",guardResolutionTitle:"Разрешение эффекта",guardResolutionHint:"Эффект Стражника завершён. Можно продолжать игру.",guardResolutionSummary:"Скрытая фаза завершения эффекта перед передачей хода.",guardResolutionConfirm:"Продолжить",guardPromptTitle:"Стражник",guardPromptHint:"Выберите другого игрока и попробуйте угадать его карту.",guardPromptTarget:"Цель",guardPromptGuess:"Предполагаемая карта",guardPromptConfirm:"Разыграть Стражника",guardPromptSummary:"Вы выбрали карту: {card}.",guardPromptSummaryEmpty:"Выберите карту для догадки.",guardTargetUnavailable:"Сейчас нет доступной цели для Стражника.",guardGuessRequired:"Выберите карту, которую хотите угадать.",guardHitEvent:"{actor} угадал карту {card} у {target}. Игрок выбывает.",guardMissEvent:"{actor} не угадал карту {card} у {target}.",decreeGuardHitEvent:"{actor} по указу угадал карту {card} у {target}. Игрок выбывает.",decreeGuardMissEvent:"{actor} по указу не угадал карту {card} у {target}.",decreeNoTargetEvent:"{actor} разыграл карту {card} по указу, но подходящей цели не было.",guardNoTargetEvent:"{actor} разыграл карту {card}, но подходящей цели не было.",peasantReactionTitle:"Крестьянин",peasantReactionHint:"Вы можете сыграть Крестьянина. Возьмите карту: если это будет {card}, вы выбываете.",peasantReactionSummary:"Эта реакция разыгрывается до передачи хода следующему игроку.",peasantReactionConfirm:"Сыграть Крестьянина",peasantReactionSkip:"Пропустить",peasantReactionSafeEvent:"{actor} сыграл карту {card} и пережил проверку.",peasantReactionEliminatedEvent:"{actor} сыграл карту {card}, взял загаданную карту и выбыл.",peasantReactionSkippedEvent:"{actor} решил не разыгрывать карту {card}.",guardMissResolvedEvent:"Эффект карты {card} завершён.",scoutPromptTitle:"Разведчик",scoutPromptHint:"Выберите игрока. Он не сможет разыграть текущую карту до своего следующего хода.",scoutPromptSummary:"Цель получит временный запрет на текущую карту в руке.",scoutPromptConfirm:"Разыграть Разведчика",scoutTargetUnavailable:"Сейчас нет доступной цели для Разведчика.",scoutLockEvent:"{actor} запретил {target} разыгрывать текущую карту до следующего хода.",scoutNoTargetEvent:"{actor} разыграл карту {card}, но подходящей цели не было.",cardLockedBadge:"запрет",executionerPromptTitle:"Палач",executionerPromptHint:"Выберите игрока. Он выбывает, если значение его карты меньше или равно 4.",executionerPromptSummary:"Цель выбывает только если её карта не старше 4.",executionerPromptConfirm:"Разыграть Палача",executionerTargetUnavailable:"Сейчас нет доступной цели для Палача.",executionerEliminateEvent:"{actor} казнил {target}: карта цели была не выше 4.",executionerSurviveEvent:"{actor} не смог казнить {target}: карта цели оказалась выше 4.",executionerNoTargetEvent:"{actor} разыграл карту {card}, но подходящей цели не было.",protectedBadge:"защита",ladyProtectionEvent:"{actor} разыграл карту {card} и получил защиту от эффектов других игроков до своего следующего хода.",blackRoseBadge:"чёрная роза",bishopTokenEvent:"{actor} разыграл карту {card} и положил на себя жетон Чёрная роза.",queenNoDecreeEvent:"{actor} разыграл карту {card}, но в этом раунде нет указов для Милости королевы.",queenDecreeSuppressedEvent:"{actor} разыграл карту {card} и заблокировал указ {decree} до конца раунда.",queenDecreePromptTitle:"Милость королевы",queenDecreePromptHint:"Выберите указ, который не будет действовать до конца раунда.",queenDecreePromptSummary:"Блокировка действует только в текущем раунде.",kingSelfEliminationEvent:"{actor} сбросил карту {card} и выбыл из раунда.",kingForcedEliminationEvent:"{target} сбросил карту {card} из-за эффекта {actor} и выбыл из раунда.",blackRoseSavedEvent:"{target} сбросил жетон Чёрная роза вместо карты {card} из-за эффекта {actor}.",rebelPromptTitle:"Мятежник",rebelPromptHint:"Выберите игрока. Он сбросит карту и доберёт новую. Можно выбрать и себя.",rebelPromptSummary:"Цель сбросит текущую карту и возьмёт новую из колоды, если она есть.",rebelPromptConfirm:"Разыграть Мятежника",rebelTargetUnavailable:"Сейчас нет доступной цели для Мятежника.",rebelRedrawEvent:"{actor} заставил {target} сбросить карту {card} и взять новую.",feudalPromptTitle:"Феодал",feudalPromptHint:"Выберите двух игроков. После этого вы увидите их карты и решите, менять их местами или нет.",feudalPromptTargets:"Две цели",feudalPromptSummary:"Для Феодала нужно выбрать двух разных игроков.",feudalPromptConfirm:"Посмотреть карты",feudalPromptNeedTwoTargets:"Для Феодала нужно выбрать двух разных игроков.",feudalResolveTitle:"Феодал: выбор обмена",feudalResolveHint:"Вы посмотрели обе карты. Теперь можно обменять их местами или оставить как есть.",feudalResolveSummary:"Это решение завершит эффект Феодала.",feudalSwapConfirm:"Поменять местами",feudalKeepConfirm:"Оставить как есть",feudalNoTargetEvent:"{actor} разыграл карту {card}, но двух доступных целей не было.",feudalInspectEvent:"{actor} разыграл карту {card} и посмотрел карты {firstTarget} и {secondTarget}.",feudalSwapEvent:"{actor} разыграл карту {card} и поменял местами карты {firstTarget} и {secondTarget}.",feudalKeepEvent:"{actor} разыграл карту {card} и решил не менять карты {firstTarget} и {secondTarget}."},en:{appTag:"Stories",title:"Control Center",subtitle:"Rooms and profile in one place.",login:"Sign in",register:"Sign up",logout:"Logout",notAuthorized:"Not authorized",signedAs:"Signed in as",navHome:"Rooms",navProfile:"Profile",navLobbies:"Lobbies",openAuth:"Login / Register",close:"Close",cancel:"Cancel",authTitle:"Authentication",authHint:"Create an account or sign in.",username:"Username",password:"Password",createAccount:"Create account",loginSuccess:"Signed in successfully.",registerSuccess:"Account created and signed in.",homeNeedAuth:"Sign in to access rooms.",roomsTitle:"Rooms",createRoom:"Create room",roomName:"Room name",connectCode:"Join by invite code",connect:"Connect",spectator:"Join as spectator",ready:"",roomCreated:"Room created. Invite code:",roomJoinSuccess:"Connected successfully. Room:",profileTitle:"User profile",profileEdit:"Edit profile",newPassword:"New password (optional)",saveProfile:"Save profile",stats:"Stats",needAuthProfile:"Sign in first.",profileUpdated:"Profile updated.",passwordChanged:"Password changed successfully.",currentPassword:"Current password",nextPassword:"New password",changePassword:"Change password",wins:"Wins",losses:"Losses",vt:"Victory tokens",elim3:"Eliminated with 3",healthError:"Error",unknownError:"Unknown error",httpError:"HTTP error {status}",invalidCredentials:"Invalid username or password.",currentPasswordInvalid:"Current password is invalid.",userExists:"This username is already taken.",unauthorized:"Authorization required.",forbidden:"Not enough permissions.",roomNotFound:"Room not found.",inviteInvalid:"Invalid invite code.",validationFailed:"Please check input values.",serverUnavailable:"Server is temporarily unavailable. Try again later.",invalidUrl:"Invalid URL.",roomPasswordRequired:"Lobby password is required.",roomPasswordInvalid:"Invalid lobby password.",roomIsFull:"Room is full. You can join only as spectator.",ownerAlreadyHasRoom:"You already have an active room. Close it before creating a new one.",userAlreadyHasActiveRoom:"Leave your current room before joining another one.",heroTitle:"Stories: project visual landing",heroSubtitle:"Create public rooms for the catalog or private rooms that open only by invite code.",heroCreate:"Create room",heroJoin:"Join room",roomDetails:"Current room",roomCode:"Invite code",roomOwner:"Owner",roomOwnerName:"Owner name",roomParticipants:"Participants",roomSpectators:"Spectators",roomActions:"Room actions",leaveRoom:"Leave room",closeOwnedRoom:"Close room",markReady:"Mark ready",markNotReady:"Mark not ready",noFieldsToUpdate:"No fields to update.",userNotFound:"User not found.",userNotInRoom:"User is not in room.",inviteCodeGenerationFailed:"Failed to generate invite code.",onlyOwnerCanManageRoom:"Only room owner can manage room.",ownerCannotBeRemoved:"Owner cannot be kicked or blocked.",cannotTransferOwnershipToSelf:"You cannot transfer ownership to yourself.",onlyPlayersCanBeKicked:"Only players can be kicked.",inviteRotateCooldown:"Invite code can be regenerated only once per minute.",youLabel:"you",authRequiredAction:"Please sign in to continue.",switchToLogin:"Already have an account? Sign in",switchToRegister:"No account yet? Sign up",themeDark:"Dark",themeLight:"Light",lobbyTitle:"Lobby list",lobbyHint:"Filter public and private lobbies.",visibilityAll:"All",visibilityPublic:"Public",visibilityPrivate:"Private",passwordAll:"Any",passwordWith:"With password",passwordWithout:"Without password",loadLobbies:"Refresh list",lobbyNoItems:"No lobbies found",lobbyHasPassword:"Password",lobbyNoPassword:"No password",joinLobby:"Join lobby",roomPassword:"Room password",roomPasswordOptional:"Room password (optional)",availableRooms:"Available rooms",myRooms:"My rooms",openRoom:"Open",joinHint:"Enter an invite code. Private rooms are available only this way.",statusReady:"Status: ready.",statusNotReady:"Status: not ready.",joinPasswordHint:"This room requires a password. Invite code does not replace it.",joinWithoutPasswordHint:"This lobby has no password. Confirm join.",joinPublicLobbyHint:"This public room has no password. Confirm join.",requiredField:"Please fill in the required field.",inviteCodeInvalid:"Enter a valid invite code (6 characters).",roomManage:"Room management",roomManageTitle:"Room settings",saveRoomSettings:"Save settings",regenerateInvite:"Regenerate invite code",kickPlayer:"Kick",banPlayer:"Block",roomChat:"Room chat",chatPlaceholder:"Type a message...",send:"Send",roomSettingsSaved:"Room settings updated.",inviteRegenerated:"Invite code regenerated.",blockedNotice:"You are blocked in this room.",kickedFromRoomNotice:"You were kicked from the room.",roleOwner:"Owner",rolePlayer:"Player",roleSpectator:"Spectator",roleSystem:"System",roomClosedNotice:"The room was closed by the owner.",roomManageReadonly:"Only the owner can change room settings.",appName:"Letters: No Mercy",appGenre:"Dark Medieval Stories",navRoomActive:"Room",quickCreateRoom:"New room",roleOwnerShort:"Owner",rolePlayerShort:"Player",roleSpectatorShort:"Spectator",readyShort:"ready",notReadyShort:"not ready",systemJoinedRoom:"{username} joined the room.",systemLeftRoom:"{username} left the room.",systemUnknownUser:"Player",transferOwnership:"Transfer ownership",ownershipTransferred:"Room ownership transferred.",joinCurrentRoom:"Return to room",closeAndJoinRoom:"Close and join",leaveAndJoinRoom:"Leave and join",roomSwitchTitle:"Join another room",roomSwitchLeaveHint:'You are already in a room. Leave it first to open "{target}".',roomSwitchCloseHint:'You own the current room. Close it first to open "{target}".',participantRemovedNotice:"Your access to the room was revoked.",kickSymbolLabel:"Kick player",banSymbolLabel:"Block player",transferOwnershipSymbolLabel:"Transfer ownership",roomLiveSync:"Room is active",roomVisibilityLabel:"Visibility",roomAccessLabel:"Access",roomStatsLabel:"Roster",roomSizeLabel:"Capacity",roomProtected:"Password protected",roomOpenAccess:"Open access",roomVisibilityPublicToggle:"Show room in the public catalog",roomCreateAccessHint:"Public rooms are visible on the home screen and in the lobby tab. Private rooms are hidden from catalogs and open only by invite code.",roomPasswordHint:"Password adds an extra lock on top of the selected access mode.",roomSettingsHint:"Tune room publication, password and player cap for the current session.",roomAccessPublicOpen:"Public, no password required",roomAccessPublicProtected:"Public, password required",roomAccessPrivateCodeOnly:"Private, invite code only",roomAccessPrivateProtected:"Private, invite code and password",lobbyCatalogHint:"Only public rooms are shown here. Private rooms are available only by invite code.",roomChatHint:"System events and player messages stay here.",roomChatEmpty:"Chat is empty. The first message sets the tone.",selfMessageLabel:"You",participantOwnerBadge:"owner",participantReadyBadge:"READY",participantNotReadyBadge:"WAITING",roomSwitchAccent:"Finish your current room session first.",roomSize:"Room size",roomSizeHelp:"From 2 to 6 players. When full, users can join only as spectators.",regenerateInviteShort:"♻",openRoomSettings:"Room settings",roomSettingsModalTitle:"Room settings",roomUpdatedSystem:"Room settings updated.",ownershipTransferredSystem:"{username} is now the room owner.",participantKickedSystem:"{username} was kicked from the room.",participantBannedSystem:"{username} was blocked in the room.",startGame:"Start game",openActiveGame:"Open game",gameStarted:"Game started.",leftGame:"You left the game.",gameExitConfirm:"Leave game and room?",gamePlayAgain:"Play again",gamePlayAgainOwnerOnly:"Only the room owner can start a new match.",gameFinalTitle:"Match finished",gameFinalStatsRounds:"Rounds played",gameFinalStatsTarget:"Victory points",gameFinalLeave:"Leave",gameReturnToRoom:"Return to room",gameFinalCardLabel:"Final card",openMatchResults:"Match results",gameNoActiveMatch:"No active match found.",gameLeaderboard:"Leaderboard",gameEvents:"Event log",activeDecrees:"Decrees",noActiveDecrees:"No active decrees.",gameNoEvents:"No events yet.",gameExitConfirmTitle:"Leave the game",kingPromptTitle:"King",kingPromptConfirm:"Yes, discard the King",gameHandCount:"Hand",gameDiscardCount:"Discard",gameYourTurn:"Your turn",gameWaitTurn:"Waiting for your turn",gameMyTable:"My table",gameNoCardsOnTable:"No cards yet",gameStartRound:"Start round",playedCardEvent:"played {card}",autoPlayedOnLeaveEvent:"{actor} left the game and auto-played a card: {card}.",autoDiscardOnTurnEvent:"{actor} left the game and auto-discarded a card: {card}.",roundWinnerSummary:"Round {round}: winner(s) {winners}",matchWinner:"Match winner: {winner}",gameDeck:"Deck",setAsideCardLabel:"Set Aside",setAsideHiddenHint:"Set-aside card is hidden until round end.",matchNotFound:"Match not found.",matchAlreadyExists:"An active match already exists for this room.",matchAlreadyFinished:"Match is already finished.",notEnoughPlayersToStartMatch:"At least two players are required to start a match.",roundNotActive:"Round is not active.",roundAlreadyActive:"Round is already active.",notPlayerTurn:"It is not your turn.",playerNotInMatch:"You are not in this match.",playerEliminated:"You are eliminated from this round.",cardNotInHand:"This card is not in your hand.",targetPlayerRequired:"Choose a target first.",targetPlayerInvalid:"This target cannot be selected.",cardGuessRequired:"Choose a card to guess.",cardGuessInvalid:"The guessed card is invalid.",guardCannotGuessGuard:"Guard cannot be named as the guessed card.",peasantReactionOnly:"Peasant cannot be played as a regular turn card. It is only played as a reaction after a Guard miss.",cardPlayBlocked:"This card cannot be played until your next turn.",kingSelfEliminateConfirm:"If you discard the King, you will be eliminated from the round. Continue?",targetPlayerProtected:"This player is currently protected by the Lady.",matchStateInvalid:"Match state is invalid.",playersNotReady:"All players must be ready before starting the game.",allPlayersMustReadyHint:"To start the game, lobby must have at least 2 players and all must be ready.",waitingNextRound:"Waiting for the next round to start…",nextRoundIn:"Next round starts in {seconds}s…",newChatMessageNotice:"New chat message.",guardResolutionPending:"Resolving effect…",guardResolutionTitle:"Effect resolution",guardResolutionHint:"The Guard effect is complete. The game can continue.",guardResolutionSummary:"A hidden resolution phase is finishing before the turn passes on.",guardResolutionConfirm:"Continue",peasantReactionTitle:"Peasant",peasantReactionHint:"You may play the Peasant. Draw a card: if it is {card}, you are eliminated.",peasantReactionSummary:"This reaction resolves before the turn passes to the next player.",peasantReactionConfirm:"Play Peasant",peasantReactionSkip:"Skip",peasantReactionSafeEvent:"{actor} played {card} and survived the check.",peasantReactionEliminatedEvent:"{actor} played {card}, drew the guessed card, and was eliminated.",peasantReactionSkippedEvent:"{actor} chose not to play {card}.",guardMissResolvedEvent:"The effect of {card} has been resolved.",decreeGuardHitEvent:"{actor} guessed {card} on {target} through a decree. The player is eliminated.",decreeGuardMissEvent:"{actor} failed to guess {card} on {target} through a decree.",decreeNoTargetEvent:"{actor} played {card} through a decree, but there was no available target.",feudalPromptTitle:"Feudal Lord",feudalPromptHint:"Choose two players. After that you will see their cards and decide whether to swap them.",feudalPromptTargets:"Two targets",feudalPromptSummary:"Feudal Lord requires two different players.",feudalPromptConfirm:"Reveal cards",feudalPromptNeedTwoTargets:"Feudal Lord requires two different players.",feudalResolveTitle:"Feudal Lord: swap decision",feudalResolveHint:"You have seen both cards. Now you may swap them or keep them as they are.",feudalResolveSummary:"This choice will finish the Feudal Lord effect.",feudalSwapConfirm:"Swap cards",feudalKeepConfirm:"Keep as is",feudalNoTargetEvent:"{actor} played {card}, but there were not enough available targets.",feudalInspectEvent:"{actor} played {card} and looked at the cards of {firstTarget} and {secondTarget}.",feudalSwapEvent:"{actor} played {card} and swapped the cards of {firstTarget} and {secondTarget}.",feudalKeepEvent:"{actor} played {card} and decided not to swap the cards of {firstTarget} and {secondTarget}.",blackRoseBadge:"black rose",bishopTokenEvent:"{actor} played {card} and placed a Black Rose token on themselves.",queenNoDecreeEvent:"{actor} played {card}, but there is no decree to suppress this round.",queenDecreeSuppressedEvent:"{actor} played {card} and suppressed decree {decree} until the end of the round.",queenDecreePromptTitle:"Queen Mercy",queenDecreePromptHint:"Choose a decree to suppress until the end of the round.",queenDecreePromptSummary:"The suppression only lasts for the current round.",kingSelfEliminationEvent:"{actor} discarded {card} and was eliminated from the round.",kingForcedEliminationEvent:"{target} discarded {card} because of {actor}'s effect and was eliminated from the round.",blackRoseSavedEvent:"{target} discarded a Black Rose token instead of card {card} because of {actor}'s effect."}},se=(e,t="")=>{try{return localStorage.getItem(e)||t}catch{return t}},ne=(e,t)=>{try{localStorage.setItem(e,t)}catch{}},W=e=>{try{localStorage.removeItem(e)}catch{}},qe=(e,t)=>{try{const r=localStorage.getItem(e);return r?JSON.parse(r)??t:t}catch{return t}},De=(e,t)=>{try{localStorage.setItem(e,JSON.stringify(t))}catch{}},f={readToken:()=>se("stories_token"),writeToken:e=>ne("stories_token",e),removeToken:()=>W("stories_token"),readLanguage:()=>se("stories_lang","ru"),writeLanguage:e=>ne("stories_lang",e),readActiveRoomId:()=>se("stories_active_room_id"),writeActiveRoomId:e=>ne("stories_active_room_id",e),removeActiveRoomId:()=>W("stories_active_room_id"),readActiveMatchId:()=>se("stories_active_match_id"),writeActiveMatchId:e=>ne("stories_active_match_id",e),removeActiveMatchId:()=>W("stories_active_match_id"),readRoomChatMessages:e=>e?qe(`stories_room_chat_${e}`,[]):[],writeRoomChatMessages:(e,t)=>{e&&De(`stories_room_chat_${e}`,t)},removeRoomChatMessages:e=>{e&&W(`stories_room_chat_${e}`)},readGameEventLog:e=>e?qe(`stories_game_event_log_${e}`,[]):[],writeGameEventLog:(e,t)=>{e&&De(`stories_game_event_log_${e}`,t)},removeGameEventLog:e=>{e&&W(`stories_game_event_log_${e}`)}},fa=window.location.hostname==="0.0.0.0"||window.location.hostname===""?"localhost":window.location.hostname,wa=window.location.protocol==="https:"?"wss":"ws",ie=f.readActiveRoomId(),ye=f.readActiveMatchId(),a={apiBase:window.location.origin,wsUrl:`${wa}://${fa}:8081`,token:f.readToken(),user:null,activeRoom:ie?{roomId:ie}:null,activeMatch:ye?{matchId:ye}:null,activeTab:"home",homeLobbies:[],lobbyCatalog:[],lobbyFilters:{password:"all",limit:20},socket:null,lang:f.readLanguage(),authOpen:!1,authMode:"login",roomModalOpen:!1,roomModalMode:"create",roomSettingsOpen:!1,joinLobbyModalOpen:!1,joinLobbyRoomId:"",joinLobbyOwnerUserId:"",joinLobbyRoomName:"",joinLobbyNeedsPassword:!1,joinLobbyPassword:"",joinLobbySpectator:!1,roomSwitchPromptOpen:!1,roomSwitchPromptMode:"leave",roomSwitchTargetLabel:"",pendingJoinAction:null,suppressOwnJoinPresence:!!ie,roomChatMessages:f.readRoomChatMessages(ie),roomChatInputShouldFocus:!1,gameEventLog:f.readGameEventLog(ye),gameChatOpen:!1,gameChatUnreadCount:0,gameCardPreview:null,gameCardPlayPrompt:null,gameConfirmPrompt:null,gameStatusMessage:"",homeStatusMessage:"",myRooms:[],roomNoticeMessage:"",roomStatusMessage:""},o=(e,t={})=>{const r=Oe[a.lang]?.[e]??Oe.ru[e]??e;return Object.entries(t).reduce((s,[n,c])=>s.replaceAll(`{${n}}`,String(c)),r)},i=e=>{const t=document.createElement("div");return t.textContent=String(e??""),t.innerHTML},w=(e,t=256)=>{const r=document.querySelector(e);return r?String(r.value??"").trim().slice(0,t):""},T=(e,t,r=!1)=>{const s=document.querySelector(`#${e}`);s&&(s.textContent=t,s.classList.toggle("ok",r))},v=(e,t="error")=>{const r=document.querySelector("#toastContainer");if(!r||!e)return;const s=document.createElement("div");s.className=`toast ${t}`,s.textContent=e,r.prepend(s),window.setTimeout(()=>s.remove(),4200)},b=(e,t)=>{const r=t?.message||o("unknownError");T(e,r),v(r)},fe=e=>{const t=document.querySelector(e);t&&(t.classList.remove("input-error"),t.removeAttribute("aria-invalid"))},we=(e,t)=>{const r=document.querySelector(e);r&&(r.classList.add("input-error"),r.setAttribute("aria-invalid","true"),r.focus(),v(t))},We=()=>{f.removeActiveRoomId()},Ra=e=>{if(e){f.writeActiveRoomId(e);return}We()},Ye=()=>{f.removeActiveMatchId()},Ia=e=>{if(e){f.writeActiveMatchId(e);return}Ye()},ve=e=>{a.token=e||"",a.token?f.writeToken(a.token):f.removeToken()},Y=e=>{a.user=e||null},Sa=e=>{a.lang=e,f.writeLanguage(e)},y=e=>{a.activeTab=e},Fe=e=>{a.homeLobbies=Array.isArray(e)?e:[]},Re=e=>{a.lobbyCatalog=Array.isArray(e)?e:[]},Ca=({password:e,limit:t})=>{e!==void 0&&(a.lobbyFilters.password=e),t!==void 0&&(a.lobbyFilters.limit=t)},He=e=>{a.myRooms=Array.isArray(e)?e:[]},Ie=e=>{a.socket=e},K=({open:e,mode:t}={})=>{e!==void 0&&(a.authOpen=!!e),t!==void 0&&(a.authMode=t)},ee=({open:e,mode:t}={})=>{e!==void 0&&(a.roomModalOpen=!!e),t!==void 0&&(a.roomModalMode=t)},he=e=>{a.roomSettingsOpen=!!e},Ke=e=>{a.roomStatusMessage=""},x=e=>{a.homeStatusMessage=e||""},N=e=>{a.roomNoticeMessage=e||""},Ee=e=>{a.suppressOwnJoinPresence=!!e},ze=e=>{a.roomChatInputShouldFocus=!!e},M=e=>{a.gameStatusMessage=e||""},z=e=>{a.gameChatOpen=!!e},ae=e=>{a.gameChatUnreadCount=Math.max(0,0)},ce=e=>{a.gameCardPreview=e||null},de=e=>{a.gameCardPlayPrompt=e||null},O=e=>{a.gameConfirmPrompt=e||null},F=e=>{a.gameCardPlayPrompt&&(a.gameCardPlayPrompt={...a.gameCardPlayPrompt,...e||{}})},xe=()=>{a.gameChatUnreadCount=Math.max(0,Number(a.gameChatUnreadCount||0)+1)},Qe=e=>{a.gameEventLog=[...a.gameEventLog,{timestamp:Date.now(),...e}].slice(-120),f.writeGameEventLog(a.activeMatch?.matchId||"",a.gameEventLog)},Xe=()=>{f.removeGameEventLog(a.activeMatch?.matchId||""),a.gameEventLog=[]},J=e=>{a.roomChatMessages=[...a.roomChatMessages,{timestamp:Date.now(),...e}].slice(-100),f.writeRoomChatMessages(a.activeRoom?.roomId||"",a.roomChatMessages)},Pa=e=>{a.roomChatMessages=Array.isArray(e)?e.slice(-100):[],f.writeRoomChatMessages(a.activeRoom?.roomId||"",a.roomChatMessages)},$a=()=>{f.removeRoomChatMessages(a.activeRoom?.roomId||""),a.roomChatMessages=[]},$=(e,{persist:t=!0}={})=>{a.activeRoom=e||null,a.roomChatMessages=f.readRoomChatMessages(e?.roomId||""),t&&Ra(e?.roomId||"")},_=()=>{a.activeRoom=null,a.roomChatMessages=[],We()},ue=(e,{persist:t=!0}={})=>{a.activeMatch=e||null,a.gameEventLog=f.readGameEventLog(e?.matchId||""),t&&Ia(e?.matchId||"")},S=()=>{a.activeMatch=null,a.gameEventLog=[],Ye()},Ze=({open:e,roomId:t,ownerUserId:r,roomName:s,needsPassword:n,password:c,spectator:d}={})=>{e!==void 0&&(a.joinLobbyModalOpen=!!e),t!==void 0&&(a.joinLobbyRoomId=t),r!==void 0&&(a.joinLobbyOwnerUserId=r),s!==void 0&&(a.joinLobbyRoomName=s),n!==void 0&&(a.joinLobbyNeedsPassword=!!n),c!==void 0&&(a.joinLobbyPassword=c),d!==void 0&&(a.joinLobbySpectator=!!d)},Ae=()=>{Ze({open:!1,roomId:"",ownerUserId:"",roomName:"",needsPassword:!1,password:"",spectator:!1})},ea=({open:e,mode:t,targetLabel:r,pendingJoinAction:s}={})=>{e!==void 0&&(a.roomSwitchPromptOpen=!!e),t!==void 0&&(a.roomSwitchPromptMode=t),r!==void 0&&(a.roomSwitchTargetLabel=r),s!==void 0&&(a.pendingJoinAction=s)},ke=()=>{ea({open:!1,mode:"leave",targetLabel:"",pendingJoinAction:null})},Ta=()=>{ve(""),Y(null),_(),S(),K({open:!1}),N(""),z(!1),ae(),ce(null),Xe(),M(""),ke()},D=(e,t="login")=>{K({open:!0,mode:t}),e()},Ea=()=>a.token?{Authorization:`Bearer ${a.token}`}:{},Aa=(e,t)=>{const r=String(e||"").toUpperCase(),s={INVALID_CREDENTIALS:"invalidCredentials",USER_EXISTS:"userExists",CURRENT_PASSWORD_INVALID:"currentPasswordInvalid",PASSWORD_CHANGED:"passwordChanged",NO_FIELDS_TO_UPDATE:"noFieldsToUpdate",USER_NOT_FOUND:"userNotFound",MISSING_BEARER_TOKEN:"unauthorized",INVALID_TOKEN_FORMAT:"unauthorized",INVALID_TOKEN_SIGNATURE:"unauthorized",INVALID_TOKEN_PAYLOAD:"unauthorized",INVALID_TOKEN_CLAIMS:"unauthorized",TOKEN_EXPIRED:"unauthorized",UNAUTHORIZED:"unauthorized",FORBIDDEN:"forbidden",INVITE_CODE_NOT_FOUND:"inviteInvalid",INVALID_INVITE_CODE:"inviteInvalid",OWNER_ALREADY_HAS_ROOM:"ownerAlreadyHasRoom",USER_ALREADY_HAS_ACTIVE_ROOM:"userAlreadyHasActiveRoom",ROOM_PASSWORD_REQUIRED:"roomPasswordRequired",ROOM_PASSWORD_INVALID:"roomPasswordInvalid",ROOM_IS_FULL:"roomIsFull",USER_NOT_IN_ROOM:"userNotInRoom",ROOM_NOT_FOUND:"roomNotFound",INVITE_CODE_GENERATION_FAILED:"inviteCodeGenerationFailed",ONLY_OWNER_CAN_MANAGE_ROOM:"onlyOwnerCanManageRoom",OWNER_CANNOT_BE_REMOVED:"ownerCannotBeRemoved",CANNOT_TRANSFER_OWNERSHIP_TO_SELF:"cannotTransferOwnershipToSelf",ONLY_PLAYERS_CAN_BE_KICKED:"onlyPlayersCanBeKicked",USER_BLOCKED_IN_ROOM:"blockedNotice",INVITE_CODE_ROTATE_COOLDOWN:"inviteRotateCooldown",MATCH_NOT_FOUND:"matchNotFound",MATCH_ALREADY_EXISTS:"matchAlreadyExists",MATCH_ALREADY_FINISHED:"matchAlreadyFinished",NOT_ENOUGH_PLAYERS_TO_START_MATCH:"notEnoughPlayersToStartMatch",ROUND_NOT_ACTIVE:"roundNotActive",ROUND_ALREADY_ACTIVE:"roundAlreadyActive",NOT_PLAYER_TURN:"notPlayerTurn",PLAYER_NOT_IN_MATCH:"playerNotInMatch",PLAYER_ELIMINATED:"playerEliminated",CARD_NOT_IN_HAND:"cardNotInHand",TARGET_PLAYER_REQUIRED:"targetPlayerRequired",TARGET_PLAYER_INVALID:"targetPlayerInvalid",CARD_GUESS_REQUIRED:"cardGuessRequired",CARD_GUESS_INVALID:"cardGuessInvalid",GUARD_CANNOT_GUESS_GUARD:"guardCannotGuessGuard",PEASANT_REACTION_ONLY:"peasantReactionOnly",CARD_PLAY_BLOCKED:"cardPlayBlocked",TARGET_PLAYER_PROTECTED:"targetPlayerProtected",MATCH_STATE_INVALID:"matchStateInvalid",PLAYERS_NOT_READY:"playersNotReady",VALIDATION_ERROR:"validationFailed",UNKNOWN_ERROR:"unknownError"};return s[r]?s[r]:t===401?"unauthorized":t===403?"forbidden":t>=500?"serverUnavailable":null},ka=(e,t,r)=>{const s=t?.message||t?.errorMessage||t?.error||r||"";if(String(t?.errorCode||t?.code||"").toUpperCase()==="UNKNOWN_ERROR"&&/must|invalid|required|password|username/i.test(String(s)))return{key:"validationFailed",message:String(s)};const n=Aa(t?.code||t?.errorCode,e);return n?{key:n,message:o(n)}:{key:null,message:s||o("httpError",{status:e})}},p=async(e,t={})=>{let r;try{r=await fetch(`${a.apiBase.replace(/\/$/,"")}${e}`,{...t,headers:{"Content-Type":"application/json",...t.headers||{},...Ea(),Locale:a.lang}})}catch{throw new Error(o("serverUnavailable"))}const s=await r.text();let n={};try{n=s?JSON.parse(s):{}}catch{n={}}if(!r.ok){r.status===401&&(a.socket&&a.socket.readyState<=1&&a.socket.close(),ve(""),Y(null),S(),_(),y("home"));const c=ka(r.status,n,s),d=new Error(c.message||o("unknownError"));throw d.code=c.key,d.status=r.status,d}return n},A=e=>{!a.socket||a.socket.readyState!==WebSocket.OPEN||a.socket.send(JSON.stringify({...e,token:a.token||void 0}))},P=(e,t={})=>{A({type:"lobbies_event",event:e,data:t})},aa=e=>{e&&A({type:"subscribe_room",roomId:e})},Na=()=>{const e=a.activeRoom?.participants;return Array.isArray(e)?e:[]},ta=()=>Na().find(e=>e.userId===a.user?.id)||null,La=()=>!!a.user?.id&&a.activeRoom?.ownerId===a.user.id,te=e=>!!(e&&a.activeRoom?.roomId===e),Ne=(e=a.activeMatch,t=a.user?.id)=>t?(Array.isArray(e?.players)?e.players:[]).some(s=>s.userId===t):!1,E=()=>a.activeMatch?.currentRound||null,oa=()=>!!a.user?.id&&E()?.activePlayerId===a.user.id,Se=()=>{const e=E();return!e||!Array.isArray(e.players)?null:e.players.find(t=>t.userId===a.user?.id)||null},Le=({includeSelf:e=!1}={})=>{const t=E();return(Array.isArray(t?.players)?t.players:[]).filter(s=>s.eliminated?!1:s.userId===a.user?.id?e:!s.protectedFromEffects)},ra=()=>Le();let le=null,G=null,Ce="";const Q=e=>e?.status!=="finished"&&Ne(e,a.user?.id),pe=()=>ta()?.role==="spectator",_a=e=>!!e?.matchId&&(Ne(e,a.user?.id)||pe()),Ge=(e,t="")=>!!e?.matchId&&e?.status==="finished"&&t!==""&&e.matchId===t&&Ne(e,a.user?.id),Ma=e=>{const t=e?.currentRound?.lastAction;!t?.at||(a.gameEventLog||[]).some(s=>s.actionAt===t.at&&s.type===(t.type||"card_played")&&s.actorUserId===t.actorUserId)||Qe({type:t.type||"card_played",actorUserId:t.actorUserId,cardCode:t.cardCode,cardName:t.cardName,targetUserId:t.targetUserId,secondTargetUserId:t.secondTargetUserId,guessedCardCode:t.guessedCardCode,guessedCardName:t.guessedCardName,targetCardCode:t.targetCardCode,targetCardName:t.targetCardName,actionAt:t.at})},Ua=e=>{const t=e?.lastRoundSummary;if(!t?.roundNumber||(a.gameEventLog||[]).some(n=>n.type==="round_summary"&&n.roundNumber===t.roundNumber))return;const s=Array.isArray(t.winnerNames)&&t.winnerNames.length?t.winnerNames.join(", "):(t.winnerUserIds||[]).join(", ");Qe({type:"round_summary",roundNumber:t.roundNumber,text:o("roundWinnerSummary",{round:t.roundNumber,winners:s})}),v(o("roundWinnerSummary",{round:t.roundNumber,winners:s}),"ok")},j=()=>{le&&(window.clearTimeout(le),le=null),G&&(window.clearInterval(G),G=null),Ce=""},Oa=async e=>{if(a.activeMatch?.matchId)try{const t=await p(`/matches/${encodeURIComponent(a.activeMatch.matchId)}/start-round`,{method:"POST"});U(t,{withTab:!0}),A({type:"room_event",roomId:a.activeRoom?.roomId,event:"match_state_updated",data:{matchId:t.matchId}}),e()}catch(t){b("gameStatus",t)}},sa=(e,t)=>{if(!(e?.status==="pending"&&e?.currentRound?.status==="finished")||!a.activeRoom?.ownerId||!a.user?.id){j();return}const s=`${e.matchId}:${e.roundNumber}`;if(Ce===s)return;j(),Ce=s;let n=5;M(o("nextRoundIn",{seconds:n})),t(),G=window.setInterval(()=>{if(n-=1,n<=0){window.clearInterval(G),G=null,M(o("waitingNextRound")),t();return}M(o("nextRoundIn",{seconds:n})),t()},1e3),a.activeRoom.ownerId===a.user.id&&(le=window.setTimeout(async()=>{j(),await Oa(t)},5e3))},U=(e,{withTab:t=!0,forceViewTab:r=!1,keepViewTab:s=!1}={})=>{if(e?.matchId){if(ue(e),Ma(e),Ua(e),e.status==="finished"&&e.winnerUserId){const n=(e.players||[]).find(c=>c.userId===e.winnerUserId)?.username||e.winnerUserId;M(o("matchWinner",{winner:n})),j()}t&&(Q(e)||r||s&&_a(e))&&y("game")}},me=async(e,t,r={})=>{try{const s=pe()&&a.activeRoom?.roomId?await X(a.activeRoom.roomId):await p(`/matches/${encodeURIComponent(e)}`);return s?.matchId?(U(s,r),!(s.status==="finished"&&s.winnerUserId)&&!(s.status==="pending"&&s.currentRound?.status==="finished")&&M(""),sa(s,t),t(),s):null}catch(s){return b("gameStatus",s),null}},X=async e=>(await p(`/rooms/${encodeURIComponent(e)}/match`))?.match||null,na=async e=>{if(a.activeRoom?.roomId)try{const t=await p("/matches",{method:"POST",body:JSON.stringify({roomId:a.activeRoom.roomId})}),r=await p(`/matches/${encodeURIComponent(t.matchId)}/start-round`,{method:"POST"});Xe(),ae(0),U(r),P("room_match_started",{roomId:a.activeRoom.roomId,matchId:r.matchId,actorUserId:a.user?.id}),A({type:"room_event",roomId:a.activeRoom.roomId,event:"match_state_updated",data:{matchId:r.matchId}}),v(o("gameStarted"),"ok"),e()}catch(t){b("roomStatus",t)}},C=async(e,t,r={})=>{if(!(!a.activeMatch?.matchId||!t))try{const s=await p(`/matches/${encodeURIComponent(a.activeMatch.matchId)}/play-card`,{method:"POST",body:JSON.stringify({cardCode:t,targetUserId:r.targetUserId||null,secondTargetUserId:r.secondTargetUserId||null,guessedCardCode:r.guessedCardCode||null,cardInstanceId:r.cardInstanceId||null,shouldSwap:typeof r.shouldSwap=="boolean"?r.shouldSwap:null,shouldReact:typeof r.shouldReact=="boolean"?r.shouldReact:null,targetDecreeCode:r.targetDecreeCode||null})});de(null),U(s,{withTab:!0,keepViewTab:a.activeTab==="game"}),sa(s,e),A({type:"room_event",roomId:a.activeRoom?.roomId,event:"match_state_updated",data:{matchId:s.matchId}}),s.status==="pending"&&s.currentRound?.status==="finished"||M(""),e()}catch(s){M(s?.message||o("unknownError")),b("gameStatus",s)}},je=e=>{const t=w("#gameChatInput",512);if(!a.activeRoom?.roomId||t==="")return;J({username:a.user?.username||"user",role:(a.activeRoom.participants||[]).find(s=>s.userId===a.user?.id)?.role||"player",userId:a.user?.id||null,text:t,timestamp:Date.now()}),A({type:"room_event",roomId:a.activeRoom.roomId,event:"chat_message",data:{text:t,username:a.user?.username||"user",role:(a.activeRoom.participants||[]).find(s=>s.userId===a.user?.id)?.role||"player"}});const r=document.querySelector("#gameChatInput");r instanceof HTMLInputElement&&(r.value=""),e(),window.requestAnimationFrame(()=>{B();const s=document.querySelector("#gameChatInput");s instanceof HTMLInputElement&&s.focus()})},qa=async e=>{if(!a.activeRoom?.roomId)return;const t=a.activeRoom.roomId,r=a.activeMatch?.matchId||null;try{await p(`/rooms/${encodeURIComponent(t)}/leave`,{method:"POST"})}catch{}r&&A({type:"room_event",roomId:t,event:"match_state_updated",data:{matchId:r}}),P("room_left",{roomId:t,...r?{matchId:r}:{}}),await L("home",4,a.lobbyFilters.password),await L("catalog",a.lobbyFilters.limit,a.lobbyFilters.password),S(),_(),j(),z(!1),ae(),O(null),N(""),y("home"),v(o("leftGame"),"ok"),e()},Da=()=>{const t=(Array.isArray(a.activeRoom?.participants)?a.activeRoom.participants:[]).filter(r=>r.userId!==a.user?.id&&(r.role==="owner"||r.role==="player"));return t.length===0?null:t[Math.floor(Math.random()*t.length)]||null},Fa=async e=>{if(!a.activeRoom?.roomId)return;const t=a.activeRoom.roomId,r=a.activeMatch?.matchId||null;try{if(a.activeRoom.ownerId===a.user?.id){const s=Da();s?.userId&&(await p(`/rooms/${encodeURIComponent(t)}/participants/${encodeURIComponent(s.userId)}/transfer-ownership`,{method:"POST"}),P("room_ownership_transferred",{roomId:t,userId:s.userId,username:s.username||"",actorUserId:a.user?.id}))}await p(`/rooms/${encodeURIComponent(t)}/leave`,{method:"POST"})}catch{}r&&A({type:"room_event",roomId:t,event:"match_state_updated",data:{matchId:r}}),P("room_left",{roomId:t,...r?{matchId:r}:{}}),await L("home",4,a.lobbyFilters.password),await L("catalog",a.lobbyFilters.limit,a.lobbyFilters.password),S(),_(),j(),z(!1),ae(),O(null),N(""),y("home"),v(o("leftGame"),"ok"),e()},B=()=>{const e=document.querySelector("#gameChatLog");e&&window.requestAnimationFrame(()=>{e.scrollTop=e.scrollHeight})},Ha=e=>e?.status==="lobby"&&Number(e?.playersCount||0)<Number(e?.maxPlayers||6),Be=async()=>{if(a.token)try{Y(await p("/auth/me"))}catch{Y(null),ve("")}},L=async(e="home",t=4,r="all")=>{try{const s=await p(`/lobbies?visibility=public&password=${encodeURIComponent(r)}&limit=${t}`);e==="home"&&Fe((s.items||[]).filter(Ha)),e==="catalog"&&Re(s.items||[])}catch{e==="home"&&Fe([]),e==="catalog"&&Re([])}},xa=async()=>{if(!a.user){_(),S();return}const e=a.activeRoom?.roomId,t=a.activeMatch?.matchId||"";if(e)try{$(await p(`/rooms/${encodeURIComponent(e)}`));try{const r=await p(`/rooms/${encodeURIComponent(e)}/match`);if(r?.match?.matchId){ue(r.match),y(Q(r.match)||Ge(r.match,t)?"game":"roomManage");return}}catch{}S(),y("roomManage");return}catch{_(),S()}try{const r=await p("/rooms/current");if(r?.roomId){$(r);try{const s=await p(`/rooms/${encodeURIComponent(r.roomId)}/match`);if(s?.match?.matchId){ue(s.match),y(Q(s.match)||Ge(s.match,t)?"game":"roomManage");return}}catch{}S(),y("roomManage")}else _(),S()}catch{_(),S()}},be=()=>{if(!a.user){He([]);return}const e=[...a.homeLobbies,...a.lobbyCatalog],t=new Map;e.filter(r=>r.ownerUserId===a.user.id).forEach(r=>t.set(r.roomId,r)),a.activeRoom?.ownerId===a.user.id&&t.set(a.activeRoom.roomId,{roomId:a.activeRoom.roomId,name:a.activeRoom.name,inviteCode:a.activeRoom.inviteCode,ownerUserId:a.activeRoom.ownerId}),He([...t.values()])},Ga=e=>{J(e)},ja=(e,t,r)=>{const s=Array.isArray(a.roomChatMessages)?a.roomChatMessages:[],n=s[s.length-1]||null;if(!n||n.role!=="system"||r.role!=="system"||typeof n.text!="string"||typeof r.text!="string"||Math.abs(Number(r.timestamp||0)-Number(n.timestamp||0))>8e3){J(r);return}const c=t?.username||o("systemUnknownUser"),d=o("systemJoinedRoom",{username:c}),u=o("systemLeftRoom",{username:c});if(n.text===d&&r.text===u||n.text===u&&r.text===d){Pa(s.slice(0,-1));return}J(r)},Pe=()=>{const e=document.querySelector("#roomChatLog");e&&window.requestAnimationFrame(()=>{e.scrollTop=e.scrollHeight})},Ba=e=>{const t=e?.username||o("systemUnknownUser");return e?.event==="room_settings_updated"?o("roomUpdatedSystem"):e?.event==="room_ownership_transferred"?o("ownershipTransferredSystem",{username:t}):e?.event==="room_participant_kicked"?o("participantKickedSystem",{username:t}):e?.event==="room_participant_banned"?o("participantBannedSystem",{username:t}):e?.event==="joined"?o("systemJoinedRoom",{username:t}):e?.event==="left"?o("systemLeftRoom",{username:t}):e?.message||""},H=(e,t={})=>{const r={username:o("roleSystem"),role:"system",text:Ba({event:e,...t}),timestamp:t?.timestamp||Date.now()};if(e==="joined"||e==="left"){ja(e,t,r);return}J(r)},q=()=>{_(),S(),Ke(),he(!1)},Z=(e,{resetChat:t=!0}={})=>{S(),$(e),aa(e.roomId),t&&$a(),N(""),Ke(),y("roomManage")},oe=e=>{ee({open:!1}),Ae(),ke(),y("roomManage"),e()},ia=(e,t=!0)=>{ke(),t&&e()},ge=(e,t)=>{ea({pendingJoinAction:t,mode:La()?"close":"leave",targetLabel:t.targetLabel||"",open:!0}),e()},$e=(e,t="create")=>{ee({open:!0,mode:t}),x(""),e()},Ja=e=>{ee({open:!1}),e()},ca=(e,{roomId:t,roomName:r,ownerUserId:s,needsPassword:n})=>{Ze({open:!0,roomId:t,roomName:r,ownerUserId:s,needsPassword:n,spectator:!1}),e()},Je=e=>{Ae(),e()},da=async()=>{if(!a.activeRoom?.roomId)return;const e=a.activeRoom.roomId,t=a.activeMatch?.matchId||null;await p(`/rooms/${encodeURIComponent(e)}/leave`,{method:"POST"}),t&&A({type:"room_event",roomId:e,event:"match_state_updated",data:{matchId:t}}),q(),P("room_left",{roomId:e,...t?{matchId:t}:{}}),await L("home",4,a.lobbyFilters.password),await L("catalog",a.lobbyFilters.limit,a.lobbyFilters.password)},la=async(e,t,r,s="",n=!1,c="homeStatus")=>{try{if(te(t))return oe(e),!0;if(a.user?.id&&r===a.user.id){const u=await p(`/rooms/${encodeURIComponent(t)}`);Z(u,{resetChat:!1})}else{const u={spectator:!!n};s.trim()!==""&&(u.password=s.trim());const h=await p(`/rooms/${encodeURIComponent(t)}/join`,{method:"POST",body:JSON.stringify(u)});Z(h)}const d=await X(a.activeRoom.roomId).catch(()=>null);return d?.matchId?(U(d,{withTab:!0}),Q(d)||y("roomManage")):(S(),y("roomManage")),P("room_joined",{roomId:a.activeRoom.roomId}),T(c,`${o("roomJoinSuccess")} ${a.activeRoom.roomId}`,!0),v(o("roomJoinSuccess"),"ok"),e(),!0}catch(d){return b(c,d),!1}},ma=async(e,t,r,s=!1,n="homeStatus")=>{try{const c={inviteCode:t,spectator:s};r!==""&&(c.password=r);const d=await p("/rooms/join-by-code",{method:"POST",body:JSON.stringify(c)});Z(d);const u=await X(a.activeRoom.roomId).catch(()=>null);return u?.matchId?(U(u,{withTab:!0}),Q(u)||y("roomManage")):(S(),y("roomManage")),P("room_joined",{roomId:a.activeRoom.roomId}),ee({open:!1}),x(`${o("roomJoinSuccess")} ${a.activeRoom.roomId}`),e(),!0}catch(c){return x(c.message),b(n,c),!1}},Va=async e=>{const t=a.pendingJoinAction;if(t){if(ia(e,!1),t.kind==="lobby"){await la(e,t.roomId,t.ownerUserId,t.password||"",!!t.spectator,"joinLobbyStatus")&&Ae();return}if(t.kind==="invite"){await ma(e,t.inviteCode,t.password||"",!!t.spectator,"homeStatus");return}t.kind==="open_create_modal"&&$e(e,"create")}},Wa=e=>{document.querySelector('[data-act="createRoom"]')?.addEventListener("click",async()=>{if(!a.user)return D(e,"login");fe("#roomName");try{const t=w("#roomName",64);if(t===""){we("#roomName",o("requiredField"));return}const r=w("#roomPassword",128),s={name:t,isPublic:!!document.querySelector("#roomIsPublic")?.checked,maxPlayers:Number(w("#roomMaxPlayers",1)||"6")};if(r!==""&&(s.password=r),a.activeRoom?.roomId){ge(e,{kind:"open_create_modal",targetLabel:o("createRoom")});return}const n=await p("/rooms",{method:"POST",body:JSON.stringify(s)});Z(n),P("room_created",{roomId:a.activeRoom.roomId}),ee({open:!1}),x(`${o("roomCreated")} ${a.activeRoom.inviteCode}`),e()}catch(t){x(t.message),b("homeStatus",t)}}),document.querySelector('[data-act="joinByCode"]')?.addEventListener("click",async()=>{if(!a.user)return D(e,"login");fe("#inviteCode");try{const t=w("#inviteCode",6).toUpperCase();if(t.length!==6){we("#inviteCode",o("inviteCodeInvalid"));return}const r=w("#joinPassword",128),s=!!document.querySelector("#joinAsSpectator")?.checked;if(a.activeRoom?.inviteCode===t){oe(e);return}if(a.activeRoom?.roomId){ge(e,{kind:"invite",inviteCode:t,password:r,spectator:s,targetLabel:t});return}await ma(e,t,r,s,"homeStatus")}catch(t){x(t.message),b("homeStatus",t)}})},ua=e=>{(async()=>{if(a.activeRoom?.roomId&&!(a.activeRoom.ownerId&&a.activeRoom.inviteCode&&a.activeMatch?.matchId))try{(!a.activeRoom.ownerId||!a.activeRoom.inviteCode)&&($(await p(`/rooms/${encodeURIComponent(a.activeRoom.roomId)}`)),Ee(!0));const s=await X(a.activeRoom.roomId).catch(()=>null);if(s?.matchId){U(s,{withTab:!0,keepViewTab:a.activeTab==="game"}),e();return}S()}catch(s){b("homeStatus",s)}})();const r=()=>a.activeRoom?.roomId?!0:(T("roomStatus",o("roomNotFound")),!1);document.querySelector('[data-act="readyRoom"]')?.addEventListener("click",async()=>{if(r())try{const n=!(ta()?.ready??!1);$(await p(`/rooms/${encodeURIComponent(a.activeRoom.roomId)}/ready`,{method:"POST",body:JSON.stringify({ready:n})})),P("room_ready_changed",{roomId:a.activeRoom.roomId}),e()}catch(s){b("roomStatus",s)}}),document.querySelector('[data-act="leaveRoom"]')?.addEventListener("click",async()=>{if(r())try{await da(),y("home"),N(""),T("homeStatus",o("ready"),!0),e()}catch(s){b("roomStatus",s)}}),document.querySelectorAll('[data-act="joinLobby"]').forEach(s=>{s.addEventListener("click",async()=>{if(!a.user)return D(e,"login");const n=s.dataset.roomId;if(n){if(te(n)){oe(e);return}ca(e,{roomId:n,roomName:s.dataset.roomName||n,ownerUserId:s.dataset.roomOwnerId||"",needsPassword:s.dataset.roomHasPassword==="1"})}})}),document.querySelector('[data-act="openRoomSettings"]')?.addEventListener("click",()=>{he(!0),e()}),document.querySelector('[data-act="startGame"]')?.addEventListener("click",async()=>{if(a.activeMatch?.matchId&&a.activeMatch.status!=="finished"){await me(a.activeMatch.matchId,e,{withTab:!0,forceViewTab:!0});return}const n=(Array.isArray(a.activeRoom?.participants)?a.activeRoom.participants:[]).filter(d=>d.role!=="spectator");if(!(n.length>=2&&n.every(d=>d.ready===!0))){v(o("allPlayersMustReadyHint"));return}await na(e)}),document.querySelector('[data-act="openGame"]')?.addEventListener("click",async()=>{const s=await X(a.activeRoom?.roomId||"").catch(()=>null);s?.matchId&&(U(s,{withTab:!0,forceViewTab:!0,keepViewTab:!0}),e())})},Ya=e=>{document.querySelector('[data-act="saveRoomSettings"]')?.addEventListener("click",async()=>{if(a.activeRoom?.roomId)try{const t=!!document.querySelector("#manageIsPublic")?.checked,r=Number(w("#manageMaxPlayers",1)||"6"),s=w("#managePassword",128);$(await p(`/rooms/${encodeURIComponent(a.activeRoom.roomId)}/settings`,{method:"PATCH",body:JSON.stringify({isPublic:t,maxPlayers:r,password:s})})),P("room_settings_updated",{roomId:a.activeRoom.roomId,actorUserId:a.user?.id}),H("room_settings_updated"),T("roomManageStatus",o("roomSettingsSaved"),!0),v(o("roomSettingsSaved"),"ok"),he(!1),e()}catch(t){b("roomManageStatus",t)}}),document.querySelector('[data-act="regenInvite"]')?.addEventListener("click",async()=>{if(a.activeRoom?.roomId)try{$(await p(`/rooms/${encodeURIComponent(a.activeRoom.roomId)}/invite-code/regenerate`,{method:"POST"})),P("room_invite_regenerated",{roomId:a.activeRoom.roomId}),T("roomManageStatus",""),v(o("inviteRegenerated"),"ok"),e()}catch(t){T("roomManageStatus",""),v(t?.message||o("unknownError"))}}),document.querySelectorAll('[data-act="kickParticipant"]').forEach(t=>{t.addEventListener("click",async()=>{if(!a.activeRoom?.roomId)return;const r=t.dataset.userId;if(!r)return;const s=(a.activeRoom.participants||[]).find(n=>n.userId===r);try{$(await p(`/rooms/${encodeURIComponent(a.activeRoom.roomId)}/participants/${encodeURIComponent(r)}/kick`,{method:"POST"})),P("room_participant_kicked",{roomId:a.activeRoom.roomId,userId:r,username:s?.username||"",actorUserId:a.user?.id}),H("room_participant_kicked",{username:s?.username||o("systemUnknownUser")}),e()}catch(n){b("roomManageStatus",n)}})}),document.querySelectorAll('[data-act="banParticipant"]').forEach(t=>{t.addEventListener("click",async()=>{if(!a.activeRoom?.roomId)return;const r=t.dataset.userId;if(!r)return;const s=(a.activeRoom.participants||[]).find(n=>n.userId===r);try{$(await p(`/rooms/${encodeURIComponent(a.activeRoom.roomId)}/participants/${encodeURIComponent(r)}/ban`,{method:"POST"})),P("room_participant_banned",{roomId:a.activeRoom.roomId,userId:r,username:s?.username||"",actorUserId:a.user?.id}),H("room_participant_banned",{username:s?.username||o("systemUnknownUser")}),e()}catch(n){b("roomManageStatus",n)}})}),document.querySelectorAll('[data-act="transferOwnership"]').forEach(t=>{t.addEventListener("click",async()=>{if(!a.activeRoom?.roomId)return;const r=t.dataset.userId;if(!r)return;const s=(a.activeRoom.participants||[]).find(n=>n.userId===r);try{$(await p(`/rooms/${encodeURIComponent(a.activeRoom.roomId)}/participants/${encodeURIComponent(r)}/transfer-ownership`,{method:"POST"})),P("room_ownership_transferred",{roomId:a.activeRoom.roomId,userId:r,username:s?.username||"",actorUserId:a.user?.id}),H("room_ownership_transferred",{username:s?.username||o("systemUnknownUser")}),T("roomManageStatus",o("ownershipTransferred"),!0),v(o("ownershipTransferred"),"ok"),e()}catch(n){b("roomManageStatus",n)}})}),document.querySelector('[data-act="sendRoomChat"]')?.addEventListener("click",()=>{const t=w("#roomChatInput",512);if(!a.activeRoom?.roomId||t==="")return;ze(!0),J({username:a.user?.username||"user",role:(a.activeRoom.participants||[]).find(s=>s.userId===a.user?.id)?.role||"player",userId:a.user?.id||null,text:t,timestamp:Date.now()}),A({type:"room_event",roomId:a.activeRoom.roomId,event:"chat_message",data:{text:t,username:a.user?.username||"user",role:(a.activeRoom.participants||[]).find(s=>s.userId===a.user?.id)?.role||"player"}});const r=document.querySelector("#roomChatInput");r&&(r.value="",r.focus()),e(),Pe()}),document.querySelector("#roomChatInput")?.addEventListener("keydown",t=>{t.key!=="Enter"||t.shiftKey||(t.preventDefault(),document.querySelector('[data-act="sendRoomChat"]')?.click())})},Ka=e=>{ua(e),Ya(e)},za=e=>{document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{y(t.dataset.tab),e()})}),document.querySelectorAll("[data-lang]").forEach(t=>{t.addEventListener("click",()=>{Sa(t.dataset.lang),e()})}),document.querySelector('[data-act="toggleAuth"]')?.addEventListener("click",()=>D(e,"login")),document.querySelectorAll('[data-act="heroCreate"]').forEach(t=>{t.addEventListener("click",()=>{if(!a.user)return D(e,"login");if(a.activeRoom?.roomId){ge(e,{kind:"open_create_modal",targetLabel:o("createRoom")});return}$e(e,"create")})}),document.querySelectorAll('[data-act="heroJoin"]').forEach(t=>{t.addEventListener("click",()=>{if(!a.user)return D(e,"login");$e(e,"join")})}),document.querySelectorAll('[data-act="closeAuth"]').forEach(t=>{t.addEventListener("click",()=>{K({open:!1}),e()})}),document.querySelector('[data-act="closeRoomNotice"]')?.addEventListener("click",()=>{N(""),e()}),document.querySelector('[data-act="logout"]')?.addEventListener("click",()=>{Ta(),a.socket?.readyState===WebSocket.OPEN&&a.socket.close(),Ie(null),e()}),document.querySelectorAll('[data-act="closeRoomModal"]').forEach(t=>{t.addEventListener("click",()=>Ja(e))}),document.querySelectorAll('[data-act="closeRoomSettings"]').forEach(t=>{t.addEventListener("click",()=>{he(!1),e()})}),document.querySelectorAll('[data-act="closeJoinLobbyModal"]').forEach(t=>{t.addEventListener("click",()=>Je(e))}),document.querySelectorAll('[data-act="closeRoomSwitchModal"], [data-act="cancelRoomSwitch"]').forEach(t=>{t.addEventListener("click",()=>ia(e))}),document.querySelector('[data-act="confirmJoinLobby"]')?.addEventListener("click",async()=>{if(!a.joinLobbyRoomId)return;fe("#lobbyJoinPassword");const t=w("#lobbyJoinPassword",128),r=!!document.querySelector("#lobbyJoinAsSpectator")?.checked;if(a.joinLobbyNeedsPassword&&t===""){we("#lobbyJoinPassword",o("requiredField")),T("joinLobbyStatus",o("requiredField"));return}if(a.activeRoom?.roomId&&!te(a.joinLobbyRoomId)){ge(e,{kind:"lobby",roomId:a.joinLobbyRoomId,ownerUserId:a.joinLobbyOwnerUserId,password:t,spectator:r,targetLabel:a.joinLobbyRoomName||a.joinLobbyRoomId});return}await la(e,a.joinLobbyRoomId,a.joinLobbyOwnerUserId,t,r,"joinLobbyStatus")&&Je(e)}),document.querySelector('[data-act="confirmRoomSwitch"]')?.addEventListener("click",async()=>{try{await da(),await Va(e)}catch(t){b("roomSwitchStatus",t)}}),a.roomModalOpen&&a.user&&Wa(e)},Qa=async(e,t)=>{document.querySelector('[data-act="switchAuthMode"]')?.addEventListener("click",()=>{K({mode:a.authMode==="login"?"register":"login"}),e()}),document.querySelector('[data-act="authSubmit"]')?.addEventListener("click",async()=>{const r=a.authMode==="login"?"/auth/login":"/auth/register",s=a.authMode==="login"?o("loginSuccess"):o("registerSuccess");try{const n=await p(r,{method:"POST",body:JSON.stringify({username:w("#authUsername",64),password:w("#authPassword",128)})});ve(n.accessToken),await t();try{const c=await p("/rooms/current");c?.roomId?($(c),y("roomManage"),Ee(!0)):q()}catch{q()}T("authStatus",s,!0),K({open:!1}),e()}catch(n){b("authStatus",n)}})},Xa=e=>{const t=async()=>{try{Re((await p(`/lobbies?visibility=public&password=${encodeURIComponent(a.lobbyFilters.password)}&limit=${a.lobbyFilters.limit}`)).items||[]),T("lobbyStatus",o("ready"),!0),e()}catch(r){b("lobbyStatus",r)}};document.querySelector('[data-act="loadLobbies"]')?.addEventListener("click",async()=>{Ca({password:w("#lobbyPasswordFilter",20)||"all",limit:Number(w("#lobbyLimit",3)||"20")}),await t()}),document.querySelectorAll('[data-act="joinLobby"]').forEach(r=>{r.addEventListener("click",async()=>{if(!a.user)return D(e,"login");const s=r.dataset.roomId;if(s){if(te(s)){oe(e);return}ca(e,{roomId:s,roomName:r.dataset.roomName||s,ownerUserId:r.dataset.roomOwnerId||"",needsPassword:r.dataset.roomHasPassword==="1"})}})})},Za=e=>{document.querySelectorAll('[data-act="openOwnedRoom"]').forEach(t=>{t.addEventListener("click",async()=>{try{const r=t.dataset.roomId;if(!r)return;if(te(r)){oe(e);return}const s=await p(`/rooms/${encodeURIComponent(r)}`);Z(s,{resetChat:!1}),e()}catch(r){b("profileStatus",r)}})}),document.querySelector('[data-act="saveProfile"]')?.addEventListener("click",async()=>{try{const t=w("#profileUsername",64);Y(await p("/auth/me",{method:"PATCH",body:JSON.stringify({username:t})})),T("profileStatus",o("profileUpdated"),!0),e()}catch(t){b("profileStatus",t)}}),document.querySelector('[data-act="changePassword"]')?.addEventListener("click",async()=>{try{await p("/auth/change-password",{method:"POST",body:JSON.stringify({currentPassword:w("#currentPassword",128),newPassword:w("#nextPassword",128)})});const t=document.querySelector("#currentPassword"),r=document.querySelector("#nextPassword");t&&(t.value=""),r&&(r.value=""),T("profileStatus",o("passwordChanged"),!0)}catch(t){b("profileStatus",t)}})},_e=[{code:"peasant",name:"Крестьянин",value:0,copies:2},{code:"guard",name:"Стражник",value:1,copies:5},{code:"scout",name:"Разведчик",value:2,copies:2},{code:"executioner",name:"Палач",value:3,copies:2},{code:"lady",name:"Дворянка",value:4,copies:2},{code:"rebel",name:"Мятежник",value:5,copies:2},{code:"feudal_lord",name:"Феодал",value:6,copies:2},{code:"bishop",name:"Епископ",value:7,copies:1},{code:"queen",name:"Королева",value:8,copies:1},{code:"king",name:"Король",value:9,copies:1}],et=e=>_e.find(t=>t.code===e)||null,at=e=>{const t=r=>r!=="guard"?_e.some(s=>s.code===r):(E()?.activeDecrees||[]).some(s=>s?.code==="free_interrogation"&&!s?.suppressedByQueen);document.querySelector('[data-act="toggleGameChat"]')?.addEventListener("click",()=>{const r=!a.gameChatOpen;z(r),r&&ae(),e(),r&&(B(),window.requestAnimationFrame(()=>{document.querySelector("#gameChatInput")?.focus()}))}),document.querySelector('[data-act="closeGameChatBackdrop"]')?.addEventListener("click",()=>{z(!1),e()}),document.querySelector('[data-act="closeGameCardPreview"]')?.addEventListener("click",()=>{ce(null),e()}),document.querySelector('[data-act="closeGameCardPlayPrompt"]')?.addEventListener("click",()=>{de(null),e()}),document.querySelector('[data-act="closeGameConfirmPrompt"]')?.addEventListener("click",()=>{O(null),e()}),document.querySelector(".game-card-preview-shell")?.addEventListener("click",r=>{r.target===r.currentTarget&&(ce(null),e())}),document.querySelector(".game-card-play-prompt-shell")?.addEventListener("click",r=>{r.target===r.currentTarget&&(de(null),e())}),document.querySelector(".game-confirm-prompt-shell")?.addEventListener("click",r=>{r.target===r.currentTarget&&(O(null),e())}),document.querySelector('[data-act="exitGame"]')?.addEventListener("click",async()=>{O({type:"leave_game",title:o("gameExitConfirmTitle"),message:o("gameExitConfirm"),confirmLabel:o("leaveRoom"),cancelLabel:o("cancel")}),e()}),document.querySelector('[data-act="leaveFinishedMatch"]')?.addEventListener("click",async()=>{await Fa(e)}),document.querySelector('[data-act="playAgainMatch"]')?.addEventListener("click",async()=>{if(a.activeRoom?.ownerId!==a.user?.id){v(o("gamePlayAgainOwnerOnly"));return}await na(e)}),document.querySelector('[data-act="returnToRoomAfterMatch"]')?.addEventListener("click",()=>{y("roomManage"),e()}),document.querySelectorAll('[data-act="playCard"]').forEach(r=>{r.addEventListener("click",async()=>{if(!oa()){v(o("notPlayerTurn"));return}if(r.dataset.cardLocked==="true"){v(o("cardPlayBlocked"));return}const s=r.dataset.cardCode||"",n=r.dataset.cardInstanceId||"";if(s==="king"){O({type:"play_king",title:o("kingPromptTitle"),message:o("kingSelfEliminateConfirm"),confirmLabel:o("kingPromptConfirm"),cancelLabel:o("cancel"),payload:{cardCode:s,cardInstanceId:n}}),e();return}if(s!=="guard"&&s!=="scout"&&s!=="executioner"&&s!=="rebel"&&s!=="feudal_lord"){await C(e,s,{cardInstanceId:n});return}const c=s==="rebel"||s==="feudal_lord"?Le({includeSelf:!0}):ra();if(c.length===0||s==="feudal_lord"&&c.length<2){if(s==="guard"||s==="scout"||s==="executioner"||s==="feudal_lord"){await C(e,s,{cardInstanceId:n});return}v(o("rebelTargetUnavailable"));return}de({cardCode:s,cardInstanceId:n,targetUserId:c[0]?.userId||"",secondTargetUserId:s==="feudal_lord"&&c[1]?.userId||"",guessedCardCode:""}),e()})}),document.querySelectorAll('[data-act="selectGuardTarget"]').forEach(r=>{r.addEventListener("click",()=>{F({targetUserId:r.dataset.userId||""}),e()})}),document.querySelectorAll('[data-act="selectGuardGuess"]').forEach(r=>{r.addEventListener("click",()=>{F({guessedCardCode:r.dataset.cardCode||""}),e()})}),document.querySelector('[data-act="confirmGuardPlay"]')?.addEventListener("click",async()=>{const r=a.gameCardPlayPrompt;if(!r?.targetUserId){v(o("targetPlayerRequired"));return}if(!r?.guessedCardCode||!t(r.guessedCardCode)){v(o("guardGuessRequired"));return}await C(e,r.cardCode||"guard",{targetUserId:r.targetUserId,guessedCardCode:r.guessedCardCode,cardInstanceId:r.cardInstanceId})}),document.querySelector('[data-act="confirmScoutPlay"]')?.addEventListener("click",async()=>{const r=a.gameCardPlayPrompt;if(!r?.targetUserId){v(o("targetPlayerRequired"));return}await C(e,r.cardCode||"scout",{targetUserId:r.targetUserId,cardInstanceId:r.cardInstanceId})}),document.querySelector('[data-act="confirmExecutionerPlay"]')?.addEventListener("click",async()=>{const r=a.gameCardPlayPrompt;if(!r?.targetUserId){v(o("targetPlayerRequired"));return}await C(e,r.cardCode||"executioner",{targetUserId:r.targetUserId,cardInstanceId:r.cardInstanceId})}),document.querySelector('[data-act="confirmRebelPlay"]')?.addEventListener("click",async()=>{const r=a.gameCardPlayPrompt;if(!r?.targetUserId){v(o("targetPlayerRequired"));return}await C(e,r.cardCode||"rebel",{targetUserId:r.targetUserId,cardInstanceId:r.cardInstanceId})}),document.querySelectorAll('[data-act="selectFeudalTarget"]').forEach(r=>{r.addEventListener("click",()=>{const s=r.dataset.userId||"",n=a.gameCardPlayPrompt;if(!(!n||s==="")){if(n.targetUserId===s){F({targetUserId:n.secondTargetUserId||"",secondTargetUserId:""}),e();return}if(n.secondTargetUserId===s){F({secondTargetUserId:""}),e();return}if(!n.targetUserId){F({targetUserId:s}),e();return}F({secondTargetUserId:s}),e()}})}),document.querySelector('[data-act="confirmFeudalPlay"]')?.addEventListener("click",async()=>{const r=a.gameCardPlayPrompt;if(!r?.targetUserId||!r?.secondTargetUserId||r.targetUserId===r.secondTargetUserId){v(o("feudalPromptNeedTwoTargets"));return}await C(e,r.cardCode||"feudal_lord",{targetUserId:r.targetUserId,secondTargetUserId:r.secondTargetUserId,cardInstanceId:r.cardInstanceId})}),document.querySelector('[data-act="confirmFeudalSwap"]')?.addEventListener("click",async()=>{await C(e,"feudal_lord",{shouldSwap:!0})}),document.querySelector('[data-act="confirmFeudalKeep"]')?.addEventListener("click",async()=>{await C(e,"feudal_lord",{shouldSwap:!1})}),document.querySelector('[data-act="confirmPeasantReact"]')?.addEventListener("click",async()=>{await C(e,"peasant",{shouldReact:!0})}),document.querySelector('[data-act="skipPeasantReact"]')?.addEventListener("click",async()=>{await C(e,"peasant",{shouldReact:!1})}),document.querySelector('[data-act="resolveGuardMiss"]')?.addEventListener("click",async()=>{await C(e,"peasant",{shouldReact:!1})}),document.querySelectorAll('[data-act="confirmQueenDecreeSuppression"]').forEach(r=>{r.addEventListener("click",async()=>{await C(e,"queen",{targetDecreeCode:r.dataset.decreeCode||""})})}),document.querySelector('[data-act="confirmGamePrompt"]')?.addEventListener("click",async()=>{const r=a.gameConfirmPrompt;if(r){if(O(null),e(),r.type==="leave_game"){await qa(e);return}r.type==="play_king"&&await C(e,r.payload?.cardCode||"king",{cardInstanceId:r.payload?.cardInstanceId||null})}}),document.querySelectorAll('[data-act="previewDiscardCard"]').forEach(r=>{r.addEventListener("click",()=>{ce({ownerName:r.dataset.ownerName||"",cardName:r.dataset.cardName||"",cardCode:r.dataset.cardCode||"",cardValue:Number(r.dataset.cardValue||0)}),e()})}),document.querySelector('[data-act="sendGameChat"]')?.addEventListener("click",()=>{je(e),B()}),document.querySelector("#gameChatInput")?.addEventListener("keydown",r=>{r.key!=="Enter"||r.shiftKey||(r.preventDefault(),je(e),B())})},pa=(e,t)=>{a.socket?.readyState===WebSocket.OPEN||a.socket?.readyState===WebSocket.CONNECTING||(Ie(new WebSocket(a.wsUrl)),a.socket.onopen=()=>{A({type:"subscribe_lobbies"}),a.activeRoom?.roomId&&aa(a.activeRoom.roomId)},a.socket.onmessage=async r=>{let s;try{s=JSON.parse(r.data)}catch{return}if(s?.type==="lobbies_event"){await e();const n=s?.data?.roomId,c=s?.data?.matchId,d=s?.data?.userId,u=s?.data?.username||s?.username||o("systemUnknownUser");if(n&&a.activeRoom?.roomId===n&&d&&a.user?.id===d&&(s?.event==="room_participant_kicked"||s?.event==="room_participant_banned")){q(),y("home");const h=s?.event==="room_participant_banned"?o("blockedNotice"):o("kickedFromRoomNotice");N(h),v(h),t();return}if(n&&a.activeRoom?.roomId===n){if(s?.event==="room_left"&&a.activeMatch?.matchId&&await me(a.activeMatch.matchId,t,{withTab:a.activeTab==="game",forceViewTab:a.activeTab==="game"&&pe(),keepViewTab:a.activeTab==="game"}),s?.event==="room_match_started"&&c){const h=await me(c,t,{withTab:!0});h?.matchId&&a.activeTab==="game"&&h.status==="finished"&&y("roomManage");return}(s?.event==="room_settings_updated"||s?.event==="room_ownership_transferred"||s?.event==="room_participant_kicked"||s?.event==="room_participant_banned")&&(s?.data?.actorUserId&&s.data.actorUserId===a.user?.id||H(s.event,{username:u,timestamp:s?.timestamp}));try{$(await p(`/rooms/${encodeURIComponent(n)}`))}catch{q(),y("home"),N(o("roomClosedNotice")),v(o("roomClosedNotice"))}}(a.activeTab==="home"||a.activeTab==="lobbies"||a.activeTab==="profile"||a.activeTab==="roomManage"||a.activeTab==="game")&&t();return}if(s?.type==="room_event"&&s?.roomId&&a.activeRoom?.roomId===s.roomId){if(s?.event==="match_state_updated"){const n=s?.data?.matchId||a.activeMatch?.matchId;if(n){const c=await me(n,t,{withTab:a.activeTab==="game",forceViewTab:a.activeTab==="game"&&pe(),keepViewTab:a.activeTab==="game"});c?.matchId&&ue(c)}return}if(s?.event==="access_denied"){q(),y("home");const n=s?.data?.reason==="banned"?o("blockedNotice"):o("kickedFromRoomNotice");N(n),v(n),t();return}if(s?.event==="chat_message"&&s?.data?.text){const n=!!(s?.userId&&a.user?.id&&s.userId===a.user.id),c=Array.isArray(a.roomChatMessages)?a.roomChatMessages:[],d=c[c.length-1]||null;n&&d&&d.userId===s?.userId&&d.text===(s?.data?.text||"")&&Math.abs(Number(s?.timestamp||0)*1e3-Number(d.timestamp||0))<15e3||Ga({username:s?.data?.username||s?.username||"user",role:s?.data?.role||"player",userId:s?.userId||null,text:s?.data?.text||"",timestamp:s?.timestamp}),(a.activeTab==="roomManage"||a.activeTab==="game")&&(t(),a.activeTab==="roomManage"&&Pe(),a.activeTab==="game"&&(a.gameChatOpen?B():n||(xe(),v(o("newChatMessageNotice"),"ok"))));return}try{$(await p(`/rooms/${encodeURIComponent(s.roomId)}`)),t()}catch{q(),y("home"),N(o("roomClosedNotice")),v(o("roomClosedNotice")),t()}return}if(s?.type==="presence"&&s?.roomId&&a.activeRoom?.roomId===s.roomId){if(s?.event==="joined"&&a.suppressOwnJoinPresence&&s?.username===a.user?.username){Ee(!1);return}H(s?.event||"",{username:s?.username||o("systemUnknownUser"),timestamp:s?.timestamp}),(a.activeTab==="roomManage"||a.activeTab==="game")&&(t(),a.activeTab==="roomManage"&&Pe(),a.activeTab==="game"&&(a.gameChatOpen?B():xe()))}},a.socket.onclose=()=>{Ie(null),window.setTimeout(()=>pa(e,t),3e3)})},tt=()=>{if(!a.authOpen||a.user)return"";const e=a.authMode==="login";return`
    <div class="modal-overlay" data-act="closeAuth"></div>
    <section class="modal auth-modal">
      <div class="modal-head">
        <div>
          <h2>${o(e?"login":"register")}</h2>
          <p>${o("authHint")}</p>
        </div>
        <button class="chip" data-act="closeAuth">${o("close")}</button>
      </div>

      <article class="auth-card">
        <div class="stack">
          <input id="authUsername" placeholder="${o("username")}" />
          <input id="authPassword" placeholder="${o("password")}" type="password" />
          <button class="primary" data-act="authSubmit">${o(e?"login":"createAccount")}</button>
          <button class="chip" data-act="switchAuthMode">${o(e?"switchToRegister":"switchToLogin")}</button>
        </div>
      </article>

      <div id="authStatus" class="status"></div>
    </section>
  `},ot=()=>{if(!a.roomModalOpen||!a.user)return"";const e=a.roomModalMode==="create";return`
    <div class="modal-overlay" data-act="closeRoomModal"></div>
    <section class="modal room-modal">
      <div class="modal-head">
        <div>
          <h2>${o(e?"createRoom":"connectCode")}</h2>
          <p>${o(e?"heroSubtitle":"joinHint")}</p>
        </div>
        <button class="chip" data-act="closeRoomModal">${o("close")}</button>
      </div>

      <article class="auth-card">
        ${e?`
        <div class="stack">
          <input id="roomName" placeholder="${o("roomName")}" />
          <label class="toggle-row"><input id="roomIsPublic" type="checkbox" checked /> ${o("roomVisibilityPublicToggle")}</label>
          <p class="field-help">${o("roomCreateAccessHint")}</p>
          <label class="field-stack">
            <span>${o("roomSize")}</span>
            <select id="roomMaxPlayers">
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6" selected>6</option>
            </select>
          </label>
          <input id="roomPassword" placeholder="${o("roomPasswordOptional")}" type="password" />
          <p class="field-help">${o("roomPasswordHint")}</p>
          <button class="primary" data-act="createRoom">${o("createRoom")}</button>
        </div>`:`
        <div class="stack">
          <input id="inviteCode" placeholder="AB12CD" maxlength="6" />
          <input id="joinPassword" placeholder="${o("roomPasswordOptional")}" type="password" />
          <label><input id="joinAsSpectator" type="checkbox" /> ${o("spectator")}</label>
          <button class="secondary" data-act="joinByCode">${o("connect")}</button>
        </div>`}
      </article>

      <div id="homeStatus" class="status">${i(a.homeStatusMessage||"")}</div>
    </section>
  `},rt=()=>!a.roomSettingsOpen||!a.activeRoom||a.activeRoom.ownerId!==a.user?.id?"":`
    <div class="modal-overlay" data-act="closeRoomSettings"></div>
    <section class="modal room-modal">
      <div class="modal-head">
        <div>
          <h2>${o("roomSettingsModalTitle")}</h2>
          <p>${o("roomSettingsHint")}</p>
        </div>
        <button class="chip" data-act="closeRoomSettings">${o("close")}</button>
      </div>
      <article class="auth-card">
        <div class="stack">
          <div class="settings-card">
            <label class="toggle-row"><input id="manageIsPublic" type="checkbox" ${a.activeRoom.isPublic?"checked":""} /> ${o("roomVisibilityPublicToggle")}</label>
            <p class="field-help">${o("roomCreateAccessHint")}</p>
            <label class="field-stack">
              <span>${o("roomSize")}</span>
              <select id="manageMaxPlayers">
                ${[2,3,4,5,6].map(e=>`<option value="${e}" ${Number(a.activeRoom.maxPlayers||6)===e?"selected":""}>${e}</option>`).join("")}
              </select>
            </label>
            <p class="field-help">${o("roomSizeHelp")}</p>
          </div>
          <input id="managePassword" type="password" placeholder="${o("roomPasswordOptional")}" />
          <p class="field-help">${o("roomPasswordHint")}</p>
          <div class="row">
            <button class="primary" data-act="saveRoomSettings">${o("saveRoomSettings")}</button>
          </div>
        </div>
      </article>
      <div id="roomManageStatus" class="status"></div>
    </section>
  `,st=()=>a.joinLobbyModalOpen?`
    <div class="modal-overlay" data-act="closeJoinLobbyModal"></div>
    <section class="modal room-modal">
      <div class="modal-head">
        <div>
          <h2>${o("joinLobby")}</h2>
          <p>${a.joinLobbyNeedsPassword?o("joinPasswordHint"):o("joinPublicLobbyHint")}</p>
        </div>
        <button class="chip" data-act="closeJoinLobbyModal">${o("close")}</button>
      </div>
      <article class="auth-card">
        <div class="stack">
          ${a.joinLobbyNeedsPassword?`<input id="lobbyJoinPassword" placeholder="${o("roomPasswordOptional")}" type="password" />`:""}
          <label><input id="lobbyJoinAsSpectator" type="checkbox" ${a.joinLobbySpectator?"checked":""} /> ${o("spectator")}</label>
          <button class="primary" data-act="confirmJoinLobby">${o("connect")}</button>
        </div>
      </article>
      <div id="joinLobbyStatus" class="status"></div>
    </section>
  `:"",nt=()=>{if(!a.roomSwitchPromptOpen)return"";const e=a.roomSwitchPromptMode==="close"?o("closeAndJoinRoom"):o("leaveAndJoinRoom"),t=a.roomSwitchPromptMode==="close"?o("roomSwitchCloseHint",{target:a.roomSwitchTargetLabel||"room"}):o("roomSwitchLeaveHint",{target:a.roomSwitchTargetLabel||"room"});return`
    <div class="modal-overlay" data-act="closeRoomSwitchModal"></div>
    <section class="modal room-modal">
      <div class="modal-head">
        <div>
          <h2>${o("roomSwitchTitle")}</h2>
          <p>${t}</p>
        </div>
        <button class="chip" data-act="closeRoomSwitchModal">${o("close")}</button>
      </div>
      <div class="room-switch-accent">${o("roomSwitchAccent")}</div>
      <article class="auth-card">
        <div class="row">
          <button class="primary" data-act="confirmRoomSwitch">${e}</button>
          <button class="secondary" data-act="cancelRoomSwitch">${o("close")}</button>
        </div>
      </article>
      <div id="roomSwitchStatus" class="status"></div>
    </section>
  `},it=()=>a.roomNoticeMessage?`<div class="room-notice">
    <span>${i(a.roomNoticeMessage)}</span>
    <button class="chip" data-act="closeRoomNotice">${o("close")}</button>
  </div>`:"",m=e=>`<span class="event-actor">${i(e)}</span>`,g=e=>`<span class="event-card">${i(e)}</span>`,l=e=>(Array.isArray(a.activeMatch?.players)?a.activeMatch.players:[]).find(r=>r.userId===e)?.username||e||o("systemUnknownUser"),Me=(e,t,r)=>`
  <button
    class="discard-stack-card"
    data-act="previewDiscardCard"
    data-card-code="${i(e.code||"")}"
    data-card-name="${i(e.name||e.code||"")}"
    data-card-value="${i(String(e.value??0))}"
    data-owner-name="${i(t||"")}"
    style="--stack-index:${i(String(r))}"
    title="${i(e.name||e.code||"")}"
  >
    <span class="discard-stack-card-value">${i(String(e.value??0))}</span>
    <span class="discard-stack-card-name">${i(e.name||e.code||"")}</span>
  </button>
`,Te=(e,t,r="showdown-card")=>`
  <button
    class="${r}"
    data-act="previewDiscardCard"
    data-card-code="${i(e.code||"")}"
    data-card-name="${i(e.name||e.code||"")}"
    data-card-value="${i(String(e.value??0))}"
    data-owner-name="${i(t||"")}"
    title="${i(e.name||e.code||"")}"
  >
    <span class="${r}-value">${i(String(e.value??0))}</span>
    <span class="${r}-name">${i(e.name||e.code||"")}</span>
  </button>
`,ct=()=>{const e=E(),t=new Map,r=d=>{const u=d?.code||"";u&&t.set(u,Number(t.get(u)||0)+1)};return(Array.isArray(e?.revealedCards)?e.revealedCards:[]).forEach(r),(Array.isArray(e?.players)?e.players:[]).forEach(d=>{(Array.isArray(d?.discard)?d.discard:[]).forEach(r)}),(Array.isArray(Se()?.hand)?Se().hand:[]).forEach(r),t},dt=()=>{const e=ct(),t=(E()?.activeDecrees||[]).some(r=>r?.code==="free_interrogation"&&!r?.suppressedByQueen);return _e.filter(r=>r.code==="guard"&&!t?!1:Number(e.get(r.code)||0)<Number(r.copies||0))},ga=e=>e<=2?7:e===3?6:e===4?5:4,lt=e=>{if(e.type==="system"||e.type==="round_summary")return i(e.text||"");if(e.type==="card_played"){const t=l(e.actorUserId);return`${m(t)}: ${o("playedCardEvent",{card:g(e.cardName||e.cardCode||"card")})}`}if(e.type==="guard_guess_hit"){const t=l(e.actorUserId),r=l(e.targetUserId);return o("guardHitEvent",{actor:m(t),target:m(r),card:g(e.guessedCardName||e.guessedCardCode||"card")})}if(e.type==="decree_guard_guess_hit"){const t=l(e.actorUserId),r=l(e.targetUserId);return o("decreeGuardHitEvent",{actor:m(t),target:m(r),card:g(e.guessedCardName||e.guessedCardCode||"card")})}if(e.type==="decree_guard_guess_miss"){const t=l(e.actorUserId),r=l(e.targetUserId);return o("decreeGuardMissEvent",{actor:m(t),target:m(r),card:g(e.guessedCardName||e.guessedCardCode||"card")})}if(e.type==="decree_no_target"){const t=l(e.actorUserId);return o("decreeNoTargetEvent",{actor:m(t),card:g(e.cardName||e.cardCode||"card")})}if(e.type==="guard_guess_miss"){const t=l(e.actorUserId),r=l(e.targetUserId);return o("guardMissEvent",{actor:m(t),target:m(r),card:g(e.guessedCardName||e.guessedCardCode||"card")})}if(e.type==="guard_no_target"){const t=l(e.actorUserId);return o("guardNoTargetEvent",{actor:m(t),card:g("Стражник")})}if(e.type==="guard_miss_resolved")return o("guardMissResolvedEvent",{card:g("Стражник")});if(e.type==="peasant_reaction_safe"){const t=l(e.actorUserId);return o("peasantReactionSafeEvent",{actor:m(t),card:g("Крестьянин")})}if(e.type==="peasant_reaction_eliminated"){const t=l(e.actorUserId);return o("peasantReactionEliminatedEvent",{actor:m(t),card:g("Крестьянин")})}if(e.type==="peasant_reaction_skipped"){const t=l(e.actorUserId);return o("peasantReactionSkippedEvent",{actor:m(t),card:g("Крестьянин")})}if(e.type==="scout_lock_applied"){const t=l(e.actorUserId),r=l(e.targetUserId);return o("scoutLockEvent",{actor:m(t),target:m(r)})}if(e.type==="scout_no_target"){const t=l(e.actorUserId);return o("scoutNoTargetEvent",{actor:m(t),card:g("Разведчик")})}if(e.type==="executioner_eliminate"){const t=l(e.actorUserId),r=l(e.targetUserId);return o("executionerEliminateEvent",{actor:m(t),target:m(r)})}if(e.type==="executioner_survive"){const t=l(e.actorUserId),r=l(e.targetUserId);return o("executionerSurviveEvent",{actor:m(t),target:m(r)})}if(e.type==="executioner_no_target"){const t=l(e.actorUserId);return o("executionerNoTargetEvent",{actor:m(t),card:g("Палач")})}if(e.type==="lady_protection_applied"){const t=l(e.actorUserId);return o("ladyProtectionEvent",{actor:m(t),card:g("Дворянка")})}if(e.type==="bishop_token_applied"){const t=l(e.actorUserId);return o("bishopTokenEvent",{actor:m(t),card:g("Епископ")})}if(e.type==="queen_no_decree"){const t=l(e.actorUserId);return o("queenNoDecreeEvent",{actor:m(t),card:g("Королева")})}if(e.type==="queen_decree_suppressed"){const t=l(e.actorUserId);return o("queenDecreeSuppressedEvent",{actor:m(t),card:g("Королева"),decree:g(e.targetCardName||e.targetCardCode||"decree")})}if(e.type==="king_discard_elimination"){const t=l(e.actorUserId),r=l(e.targetUserId);return e.actorUserId===e.targetUserId?o("kingSelfEliminationEvent",{actor:m(t),card:g("Король")}):o("kingForcedEliminationEvent",{actor:m(t),target:m(r),card:g(e.targetCardName||e.targetCardCode||"card")})}if(e.type==="rebel_redraw"){const t=l(e.actorUserId),r=l(e.targetUserId);return o("rebelRedrawEvent",{actor:m(t),target:m(r),card:g(e.targetCardName||e.targetCardCode||o("systemUnknownUser"))})}if(e.type==="black_rose_saved"){const t=l(e.actorUserId),r=l(e.targetUserId);return o("blackRoseSavedEvent",{actor:m(t),target:m(r),card:g(e.targetCardName||e.targetCardCode||"card")})}if(e.type==="feudal_no_target"){const t=l(e.actorUserId);return o("feudalNoTargetEvent",{actor:m(t),card:g("Феодал")})}if(e.type==="feudal_inspect"){const t=l(e.actorUserId),r=l(e.targetUserId),s=l(e.secondTargetUserId);return o("feudalInspectEvent",{actor:m(t),card:g("Феодал"),firstTarget:m(r),secondTarget:m(s)})}if(e.type==="feudal_swap"){const t=l(e.actorUserId),r=l(e.targetUserId),s=l(e.secondTargetUserId);return o("feudalSwapEvent",{actor:m(t),card:g("Феодал"),firstTarget:m(r),secondTarget:m(s)})}if(e.type==="feudal_keep"){const t=l(e.actorUserId),r=l(e.targetUserId),s=l(e.secondTargetUserId);return o("feudalKeepEvent",{actor:m(t),card:g("Феодал"),firstTarget:m(r),secondTarget:m(s)})}if(e.type==="auto_played_on_leave"){const t=l(e.actorUserId);return o("autoPlayedOnLeaveEvent",{actor:m(t),card:g(e.cardName||e.cardCode||"card")})}if(e.type==="auto_discard_on_turn"){const t=l(e.actorUserId);return o("autoDiscardOnTurnEvent",{actor:m(t),card:g(e.cardName||e.cardCode||"card")})}return i(e.text||o("unknownError"))},mt=()=>{const e=(Array.isArray(a.activeMatch?.players)?a.activeMatch.players:[]).slice().sort((r,s)=>Number(s.points??0)-Number(r.points??0)),t=ga(e.length);return`
    <div class="game-card">
      <h4>${o("gameLeaderboard")}</h4>
      <ul class="game-leaderboard">
        ${e.map(r=>`<li class="${r.userId===a.user?.id?"is-self":""}">
          <span>${i(r.username||r.userId)}${r.userId===a.user?.id?` <em>${i(o("youLabel"))}</em>`:""}</span>
          <b>${i(`${String(r.points??0)}/${String(t)}`)}</b>
        </li>`).join("")}
      </ul>
    </div>
  `},ut=()=>{const t=[...Array.isArray(a.gameEventLog)?a.gameEventLog:[]].reverse();return`
    <div class="game-card">
      <h4>${o("gameEvents")}</h4>
      <div class="game-events">
        ${t.length?t.map(r=>`<div class="game-event-line ${r.type==="system"||r.type==="round_summary"?"system":""}">${lt(r)}</div>`).join(""):`<div class="game-muted">${o("gameNoEvents")}</div>`}
      </div>
    </div>
  `},pt=()=>{const e=Array.isArray(E()?.activeDecrees)?E().activeDecrees:Array.isArray(a.activeMatch?.activeDecrees)?a.activeMatch.activeDecrees:[];return`
    <div class="game-card">
      <h4>${o("activeDecrees")}</h4>
      <div class="game-decrees">
        ${e.length?e.map(t=>`
          <div class="game-decree ${t.suppressedByQueen?"suppressed":""}">
            <strong>${g(t.title||t.code)}</strong>
            <span>${i(t.effectText||"")}</span>
          </div>
        `).join(""):`<div class="game-muted">${o("noActiveDecrees")}</div>`}
      </div>
    </div>
  `},gt=()=>{const e=Array.isArray(a.roomChatMessages)?a.roomChatMessages:[];return`
    <div class="game-chat-widget ${a.gameChatOpen?"open":""}">
      ${a.gameChatOpen?`<button class="game-chat-backdrop" data-act="closeGameChatBackdrop" aria-label="${o("close")}"></button>`:""}
      ${a.gameChatOpen?`
        <div class="game-chat-card">
          <div class="game-chat-toggle-row">
            <h4>${o("roomChat")}</h4>
            <button class="chip" data-act="toggleGameChat">${o("close")}</button>
          </div>
          <div class="game-chat-popover" id="gameChatLog">
            ${(e||[]).length===0?`<div class="game-muted">${o("roomChatEmpty")}</div>`:e.map(t=>`
              <div class="game-chat-line ${t.role==="system"?"system":""}">
                <b>${i(t.username||o("roleSystem"))}</b>
                <span>${i(t.text||"")}</span>
              </div>
            `).join("")}
          </div>
          <div class="row topgap game-chat-composer">
            <input id="gameChatInput" placeholder="${o("chatPlaceholder")}" />
            <button class="primary" data-act="sendGameChat">${o("send")}</button>
          </div>
        </div>
      `:""}
      <button class="chip game-chat-fab" data-act="toggleGameChat">
        ${o("roomChat")}
        ${Number(a.gameChatUnreadCount||0)>0?`<span class="chat-unread-badge">${i(String(a.gameChatUnreadCount))}</span>`:""}
      </button>
    </div>
  `},vt=()=>{if(!a.gameCardPreview)return"";const e=a.gameCardPreview;return`
    <div class="game-card-preview-shell">
      <div class="game-card-preview">
        <button class="game-card-preview-close" data-act="closeGameCardPreview" aria-label="${o("close")}">×</button>
        <div class="game-card-preview-owner">${i(e.ownerName||"")}</div>
        <div class="game-card-preview-face">
          <span class="game-card-preview-value">${i(String(e.cardValue??0))}</span>
          <span class="game-card-preview-name">${i(e.cardName||e.cardCode||"")}</span>
        </div>
      </div>
    </div>
  `},ht=()=>{const e=a.gameConfirmPrompt;return e?`
    <div class="game-card-play-prompt-shell game-confirm-prompt-shell">
      <div class="game-card-play-prompt game-confirm-prompt">
        <div class="game-card-play-prompt-head">
          <div>
            <h3>${i(e.title||"")}</h3>
            <p>${i(e.message||"")}</p>
          </div>
          <button class="chip" data-act="closeGameConfirmPrompt" aria-label="${o("close")}">×</button>
        </div>
        <div class="game-card-play-prompt-footer">
          <div class="row">
            <button class="secondary" data-act="closeGameConfirmPrompt">${i(e.cancelLabel||o("cancel"))}</button>
            <button class="primary" data-act="confirmGamePrompt">${i(e.confirmLabel||o("send"))}</button>
          </div>
        </div>
      </div>
    </div>
  `:""},yt=()=>{const e=a.gameCardPlayPrompt;if(!e||e.cardCode!=="guard"&&e.cardCode!=="scout"&&e.cardCode!=="executioner"&&e.cardCode!=="rebel"&&e.cardCode!=="feudal_lord")return"";const t=et(e.guessedCardCode),r=e.cardCode==="rebel"?Le({includeSelf:!0}):ra(),s=e.cardCode==="guard",n=e.cardCode==="scout",c=e.cardCode==="executioner",d=e.cardCode==="feudal_lord",u=dt(),h=o(s?"guardPromptTitle":n?"scoutPromptTitle":c?"executionerPromptTitle":d?"feudalPromptTitle":"rebelPromptTitle"),R=o(s?"guardPromptHint":n?"scoutPromptHint":c?"executionerPromptHint":d?"feudalPromptHint":"rebelPromptHint");return`
    <div class="game-card-play-prompt-shell">
      <div class="game-card-play-prompt">
        <div class="game-card-play-prompt-head">
          <div>
            <h3>${h}</h3>
            <p>${R}</p>
          </div>
          <button class="chip" data-act="closeGameCardPlayPrompt">${o("close")}</button>
        </div>
        <div class="game-card-play-prompt-section">
          <span class="game-card-play-prompt-label">${o(d?"feudalPromptTargets":"guardPromptTarget")}</span>
          <div class="game-card-play-prompt-grid">
            ${r.map(I=>`
              <button
                class="game-prompt-option ${e.targetUserId===I.userId||e.secondTargetUserId===I.userId?"selected":""}"
                data-act="${d?"selectFeudalTarget":"selectGuardTarget"}"
                data-user-id="${i(I.userId)}"
              >
                <strong>
                  ${i(I.username||I.userId)}
                  ${I.userId===a.user?.id?` <em>${i(o("youLabel"))}</em>`:""}
                </strong>
                <span>${o("gameDiscardCount")}: ${i(String((I.discard||[]).length))}</span>
              </button>
            `).join("")}
          </div>
        </div>
        ${s?`<div class="game-card-play-prompt-section">
          <span class="game-card-play-prompt-label">${o("guardPromptGuess")}</span>
          <div class="game-card-play-prompt-grid cards">
            ${u.map(I=>`
              <button
                class="game-prompt-option card ${e.guessedCardCode===I.code?"selected":""}"
                data-act="selectGuardGuess"
                data-card-code="${i(I.code)}"
              >
                <b>${i(String(I.value))}</b>
                <span>${i(I.name)}</span>
              </button>
            `).join("")}
          </div>
        </div>`:""}
        <div class="game-card-play-prompt-footer">
          <div class="game-card-play-prompt-summary">
            ${s?t?o("guardPromptSummary",{card:t.name}):o("guardPromptSummaryEmpty"):o(n?"scoutPromptSummary":c?"executionerPromptSummary":d?"feudalPromptSummary":"rebelPromptSummary")}
          </div>
          <button
            class="primary"
            data-act="${s?"confirmGuardPlay":n?"confirmScoutPlay":c?"confirmExecutionerPlay":d?"confirmFeudalPlay":"confirmRebelPlay"}"
            ${!e.targetUserId||s&&!e.guessedCardCode||d&&(!e.secondTargetUserId||e.secondTargetUserId===e.targetUserId)?"disabled":""}
          >${o(s?"guardPromptConfirm":n?"scoutPromptConfirm":c?"executionerPromptConfirm":d?"feudalPromptConfirm":"rebelPromptConfirm")}</button>
        </div>
      </div>
    </div>
  `},bt=()=>{const e=E()?.pendingDecision||null;if(!e)return"";if(e.type==="guard_miss_peasant_reaction")return e.canReact?`
        <div class="game-card-play-prompt-shell">
          <div class="game-card-play-prompt">
            <div class="game-card-play-prompt-head">
              <div>
                <h3>${o("peasantReactionTitle")}</h3>
                <p>${o("peasantReactionHint",{card:e.guessedCardName||e.guessedCardCode||"card"})}</p>
              </div>
            </div>
            <div class="game-card-play-prompt-footer">
              <div class="game-card-play-prompt-summary">${o("peasantReactionSummary")}</div>
              <div class="row">
                <button class="secondary" data-act="skipPeasantReact">${o("peasantReactionSkip")}</button>
                <button class="primary" data-act="confirmPeasantReact">${o("peasantReactionConfirm")}</button>
              </div>
            </div>
          </div>
        </div>
      `:`
      <div class="game-card-play-prompt-shell">
        <div class="game-card-play-prompt">
          <div class="game-card-play-prompt-head">
            <div>
              <h3>${o("guardResolutionTitle")}</h3>
              <p>${o("guardResolutionHint")}</p>
            </div>
          </div>
          <div class="game-card-play-prompt-footer">
            <div class="game-card-play-prompt-summary">${o("guardResolutionSummary")}</div>
            <div class="row">
              <button class="primary" data-act="resolveGuardMiss">${o("guardResolutionConfirm")}</button>
            </div>
          </div>
        </div>
      </div>
    `;if(e.type==="queen_decree_suppression"){const s=Array.isArray(e.availableDecrees)?e.availableDecrees:[];return`
      <div class="game-card-play-prompt-shell">
        <div class="game-card-play-prompt">
          <div class="game-card-play-prompt-head">
            <div>
              <h3>${o("queenDecreePromptTitle")}</h3>
              <p>${o("queenDecreePromptHint")}</p>
            </div>
          </div>
          <div class="game-card-play-prompt-grid">
            ${s.map(n=>`
              <button class="game-prompt-option" data-act="confirmQueenDecreeSuppression" data-decree-code="${i(n.code||"")}">
                <strong>${i(n.title||n.code||"")}</strong>
                <span>${i(n.effectText||"")}</span>
              </button>
            `).join("")}
          </div>
          <div class="game-card-play-prompt-footer">
            <div class="game-card-play-prompt-summary">${o("queenDecreePromptSummary")}</div>
          </div>
        </div>
      </div>
    `}if(e.type!=="feudal_lord_swap")return"";const t=l(e.targetUserId),r=l(e.secondTargetUserId);return`
    <div class="game-card-play-prompt-shell">
      <div class="game-card-play-prompt">
        <div class="game-card-play-prompt-head">
          <div>
            <h3>${o("feudalResolveTitle")}</h3>
            <p>${o("feudalResolveHint")}</p>
          </div>
        </div>
        <div class="game-card-play-prompt-grid">
          <div class="game-prompt-option card reveal-card">
            <strong>${i(t)}</strong>
            ${Te(e.targetCard,t,"showdown-card prompt-showdown-card")}
          </div>
          <div class="game-prompt-option card reveal-card">
            <strong>${i(r)}</strong>
            ${Te(e.secondTargetCard,r,"showdown-card prompt-showdown-card")}
          </div>
        </div>
        <div class="game-card-play-prompt-footer">
          <div class="game-card-play-prompt-summary">${o("feudalResolveSummary")}</div>
          <div class="row">
            <button class="secondary" data-act="confirmFeudalKeep">${o("feudalKeepConfirm")}</button>
            <button class="primary" data-act="confirmFeudalSwap">${o("feudalSwapConfirm")}</button>
          </div>
        </div>
      </div>
    </div>
  `},ft=()=>{const e=E(),t=Array.isArray(e?.revealedCards)?e.revealedCards:[];return t.length===0?"":`
    <aside class="game-revealed-rail" aria-label="revealed-cards">
      ${t.map((r,s)=>Me(r,"",s)).join("")}
    </aside>
  `},wt=()=>{const e=Array.isArray(a.activeMatch?.players)?a.activeMatch.players:[],t=E(),r=Array.isArray(t?.players)?t.players:[],s=e.filter(u=>u.userId!==a.user?.id),n=Math.max(2,e.length||2),c={2:["seat-top"],3:["seat-top-left","seat-top-right"],4:["seat-left-mid","seat-top","seat-right-mid"],5:["seat-left-top","seat-top","seat-right-top","seat-right-bottom"],6:["seat-left-top","seat-left-bottom","seat-top","seat-right-top","seat-right-bottom"]},d=c[n]||c[6];return s.map((u,h)=>{const R=r.find(V=>V.userId===u.userId),I=t?.activePlayerId===u.userId,re=Array.isArray(R?.discard)?R.discard:[],k=Array.isArray(R?.hand)?R.hand:[],va=!!R?.protectedFromEffects,ha=!!R?.hasBlackRoseToken,ya=t?.status==="finished"&&k.length>0;return`
      <article class="table-player ${d[h]||"seat-top"} ${I?"active":""}">
        <div class="table-player-name">
          ${i(u.username||u.userId)}
          ${va?`<span class="table-player-status protection">${i(o("protectedBadge"))}</span>`:""}
          ${ha?`<span class="table-player-status rose">${i(o("blackRoseBadge"))}</span>`:""}
        </div>
        <div class="table-player-meta">
          <span class="table-player-discard-count">${o("gameDiscardCount")}: ${i(String(re.length))}</span>
          <div class="table-player-discard discard-stack">
            ${re.map((V,ba)=>Me(V,u.username||u.userId,ba)).join("")}
          </div>
          ${ya?`
            <div class="table-player-showdown">
              <div class="table-player-showdown-cards">
                ${k.map(V=>Te(V,u.username||u.userId)).join("")}
              </div>
            </div>
          `:""}
        </div>
      </article>
    `}).join("")},Rt=()=>{if(a.activeMatch?.status!=="finished")return"";const e=(Array.isArray(a.activeMatch?.players)?a.activeMatch.players:[]).slice().sort((c,d)=>Number(d.points??0)-Number(c.points??0)),t=e.find(c=>c.userId===a.activeMatch?.winnerUserId)||null,r=ga(e.length),s=a.activeRoom?.ownerId===a.user?.id,n=s&&Number(a.activeRoom?.participants?.length||0)===1;return`
    <div class="game-finish-shell">
      <div class="game-finish-panel">
        <div class="game-finish-kicker">${o("gameFinalTitle")}</div>
        <h2>${i(o("matchWinner",{winner:t?.username||a.activeMatch?.winnerUserId||o("systemUnknownUser")}))}</h2>
        <div class="game-finish-stats">
          <div class="game-finish-stat">
            <span>${o("gameFinalStatsRounds")}</span>
            <strong>${i(String(a.activeMatch?.roundNumber||0))}</strong>
          </div>
          <div class="game-finish-stat">
            <span>${o("gameFinalStatsTarget")}</span>
            <strong>${i(String(r))}</strong>
          </div>
        </div>
        <div class="game-finish-scoreboard">
          ${e.map(c=>`
            <div class="game-finish-score-row ${c.userId===a.activeMatch?.winnerUserId?"winner":""}">
              <span>${i(c.username||c.userId)}${c.userId===a.user?.id?` <em>${i(o("youLabel"))}</em>`:""}</span>
              <b>${i(`${String(c.points??0)}/${String(r)}`)}</b>
            </div>
          `).join("")}
        </div>
        <div class="game-finish-actions">
          ${n?`<button class="chip" data-act="returnToRoomAfterMatch">${o("gameReturnToRoom")}</button>`:""}
          <button class="secondary" data-act="leaveFinishedMatch">${o("gameFinalLeave")}</button>
          <button class="primary" data-act="playAgainMatch" ${s?"":"disabled"}>${o("gamePlayAgain")}</button>
        </div>
        ${s?"":`<p class="game-finish-hint">${i(o("gamePlayAgainOwnerOnly"))}</p>`}
      </div>
    </div>
  `},It=()=>{const e=Se(),t=Array.isArray(e?.hand)?e.hand:[],r=Array.isArray(e?.discard)?e.discard:[],s=oa(),n=e?.lockedCardInstanceId||null,c=e?.lockedCardCode||null,d=!!e?.protectedFromEffects,u=!!e?.hasBlackRoseToken;return`
    <section class="game-hand-dock">
      <div class="game-my-table">
        <div class="game-my-table-head">
          <span class="game-my-table-label">
            ${o("gameMyTable")}
            ${d?`<span class="table-player-status protection">${i(o("protectedBadge"))}</span>`:""}
            ${u?`<span class="table-player-status rose">${i(o("blackRoseBadge"))}</span>`:""}
          </span>
          <span class="game-turn-badge ${s?"turn":"wait"}">${o(s?"gameYourTurn":"gameWaitTurn")}</span>
        </div>
        <div class="game-my-table-cards discard-stack discard-stack-centered">
          ${r.length?r.map((h,R)=>Me(h,o("gameMyTable"),R)).join(""):`<span class="game-muted">${o("gameNoCardsOnTable")}</span>`}
        </div>
      </div>
      <div class="game-hand-cards">
        ${t.map(h=>{const R=n&&h.instanceId===n||!n&&c&&h.code===c;return`
          <button
            class="game-card-button ${s?"":"muted"} ${R?"locked":""}"
            data-act="playCard"
            data-card-code="${i(h.code)}"
            data-card-instance-id="${i(h.instanceId||"")}"
            data-card-locked="${i(String(!!R))}"
          >
            <span class="game-card-value">${i(String(h.value??0))}</span>
            <span class="game-card-name">${i(h.name||h.code)}</span>
            ${R?`<span class="game-card-lock-badge">${i(o("cardLockedBadge"))}</span>`:""}
          </button>
        `}).join("")}
      </div>
    </section>
  `},St=()=>{if(!a.activeMatch?.matchId)return`<section class="game-empty">${o("gameNoActiveMatch")}</section>`;const e=E(),t=Math.max(2,Array.isArray(a.activeMatch?.players)?a.activeMatch.players.length:2),r=a.activeMatch?.lastRoundSummary,n=!!r?.winnerNames?.length&&a.activeMatch?.status==="pending"&&e?.status==="finished"?o("roundWinnerSummary",{round:r.roundNumber,winners:r.winnerNames.join(", ")}):"",c=a.gameStatusMessage?`<div class="game-summary-banner winner">${i(a.gameStatusMessage)}</div>`:e?.hasPendingDecision?`<div class="game-summary-banner">${i(o("guardResolutionPending"))}</div>`:"";return`
    <section class="game-layout">
      <main class="game-table-wrap">
        ${n?`<div class="game-summary-banner round-summary-temp">${i(n)}</div>`:""}
        ${c}
        <div class="game-table table-layout-${i(String(t))}">
          ${ft()}
          <div class="game-center-stack">
            <div class="game-set-aside">
              <div class="game-deck-title">${o("setAsideCardLabel")}</div>
              <div class="game-set-aside-card hidden-card" title="${o("setAsideHiddenHint")}">
                <span class="game-set-aside-hidden-mark">?</span>
              </div>
            </div>
            <div class="game-main-deck">
              <div class="game-deck-title">${o("gameDeck")}</div>
              <div class="game-deck">
                <div class="game-deck-count">${i(String(e?.deckCount??0))}</div>
              </div>
            </div>
          </div>
          ${wt()}
        </div>
        ${It()}
      </main>
      <aside class="game-sidebar">
        ${mt()}
        ${pt()}
        ${ut()}
      </aside>
      ${gt()}
      ${Rt()}
      ${vt()}
      ${ht()}
      ${yt()}
      ${bt()}
    </section>
  `},Ct=e=>{const t=Number(e||Date.now()),r=Number.isFinite(t)?new Date(t*(t<1e10?1e3:1)):new Date;return new Intl.DateTimeFormat(a.lang==="en"?"en-US":"ru-RU",{hour:"2-digit",minute:"2-digit"}).format(r)},Pt=(e,t="?")=>String(e||t).trim().charAt(0).toUpperCase()||t,Ue=e=>e.isPublic&&e.hasPassword?o("roomAccessPublicProtected"):e.isPublic?o("roomAccessPublicOpen"):e.hasPassword?o("roomAccessPrivateProtected"):o("roomAccessPrivateCodeOnly"),$t=()=>`
  <section class="hero">
    <div class="hero-mist" aria-hidden="true"></div>
    <div class="hero-copy">
      <span class="hero-kicker">${o("appTag")}</span>
      <h1>LETTERS:<br/>NO MERCY</h1>
      <p class="hero-subline">DARK MEDIEVAL STORIES</p>
      <p>${o("heroSubtitle")}</p>
      <div class="hero-actions">
        <button class="primary" data-act="heroCreate">＋ ${o("heroCreate")}</button>
        <button class="secondary" data-act="heroJoin">${o("heroJoin")}</button>
      </div>
    </div>
    <div class="hero-art" aria-hidden="true">
      <div class="castle-silhouette"></div>
      <div class="letter-token"></div>
    </div>
  </section>
`,Tt=()=>{const e=a.homeLobbies;return`
    <section class="lobby-card">
      <div class="lobby-head">
        <h3>${o("availableRooms")}</h3>
        <button class="chip" data-tab="lobbies">${o("navLobbies")}</button>
      </div>
      <div class="lobby-list">
        ${e.length===0?`<p>${o("lobbyNoItems")}</p>`:e.map(t=>`
          <article class="lobby-item">
            <div class="lobby-icon">${t.isPublic?"☀":"☾"}</div>
            <div class="lobby-meta">
              <h4>${i(t.name)} ${t.hasPassword?'<span class="inline-tag">🔒</span>':""}</h4>
              <p>${Ue(t)}</p>
              <p>${o("roomOwnerName")}: ${i(t.ownerUsername||t.ownerUserId||"—")}</p>
            </div>
            <div class="lobby-count">👥 ${t.playersCount} / ${t.maxPlayers||6}</div>
            <button class="secondary" data-act="joinLobby" data-room-id="${i(t.roomId)}" data-room-name="${i(t.name)}" data-room-owner-id="${i(t.ownerUserId||"")}" data-room-has-password="${t.hasPassword?"1":"0"}">${o("joinLobby")}</button>
          </article>
        `).join("")}
      </div>
    </section>
  `},Et=()=>`
  ${$t()}
  ${Tt()}
`,At=()=>`
  <h2>${o("lobbyTitle")}</h2>
  <p>${o("lobbyHint")}</p>
  <article>
    <div class="row">
      <select id="lobbyPasswordFilter">
        <option value="all" ${a.lobbyFilters.password==="all"?"selected":""}>${o("passwordAll")}</option>
        <option value="with_password" ${a.lobbyFilters.password==="with_password"?"selected":""}>${o("passwordWith")}</option>
        <option value="without_password" ${a.lobbyFilters.password==="without_password"?"selected":""}>${o("passwordWithout")}</option>
      </select>
      <input id="lobbyLimit" type="number" min="1" max="100" value="${a.lobbyFilters.limit}" />
      <button class="secondary" data-act="loadLobbies">${o("loadLobbies")}</button>
      <button class="chip" data-act="heroJoin">${o("connectCode")}</button>
    </div>
    <p class="room-section-hint">${o("lobbyCatalogHint")}</p>
  </article>
  <div class="lobby-list topgap">
    ${a.lobbyCatalog.length===0?`<article><p>${o("lobbyNoItems")}</p></article>`:a.lobbyCatalog.map(e=>`
      <article class="lobby-item">
        <div class="lobby-icon">${e.isPublic?"☀":"☾"}</div>
        <div class="lobby-meta">
          <h4>${i(e.name)}</h4>
          <p>${Ue(e)}</p>
          <p>${o("roomOwnerName")}: ${i(e.ownerUsername||e.ownerUserId||"—")}</p>
        </div>
        <div class="lobby-count">👥 ${e.playersCount} / ${e.maxPlayers||6}</div>
        <button class="secondary" data-act="joinLobby" data-room-id="${i(e.roomId)}" data-room-name="${i(e.name)}" data-room-owner-id="${i(e.ownerUserId||"")}" data-room-has-password="${e.hasPassword?"1":"0"}">${o("joinLobby")}</button>
      </article>
    `).join("")}
  </div>
`,kt=()=>{if(!a.user)return"";const e=a.myRooms||[];return`
    <article>
      <h3>${o("myRooms")}</h3>
      <div class="stack">
        ${e.length===0?`<p>${o("lobbyNoItems")}</p>`:e.map(t=>`
          <div class="row my-room-row">
            <span>${i(t.name)} (${i(t.inviteCode)})</span>
            <button class="chip" data-act="openOwnedRoom" data-room-id="${i(t.roomId)}">${o("openRoom")}</button>
          </div>
        `).join("")}
      </div>
    </article>
  `},Nt=()=>a.user?`
    <h2>${o("profileTitle")}</h2>
    <div class="grid">
      <article>
        <h3>${o("profileEdit")}</h3>
        <div class="stack">
          <input id="profileUsername" value="${i(a.user.username)}" />
          <button class="primary" data-act="saveProfile">${o("saveProfile")}</button>
        </div>
      </article>
      ${kt()}
      <article>
        <h3>${o("changePassword")}</h3>
        <div class="stack">
          <input id="currentPassword" placeholder="${o("currentPassword")}" type="password" />
          <input id="nextPassword" placeholder="${o("nextPassword")}" type="password" />
          <button class="secondary" data-act="changePassword">${o("changePassword")}</button>
        </div>
      </article>
    </div>
    <div id="profileStatus" class="status"></div>
  `:`<h2>${o("profileTitle")}</h2><div class="status">${o("needAuthProfile")}</div>`,Ve=e=>{const t=a.user?.id===e.userId,r=a.user?.id&&a.activeRoom?.ownerId===a.user.id,s=r&&e.userId!==a.activeRoom?.ownerId,n=r&&e.role==="player"&&e.userId!==a.activeRoom?.ownerId,c=r&&e.role==="player"&&e.userId!==a.activeRoom?.ownerId,d={owner:o("roleOwnerShort"),player:o("rolePlayerShort"),spectator:o("roleSpectatorShort")};return`
    <li class="participant-item">
      <div class="participant-row">
        <div class="participant-main">
          <span class="participant-avatar role-${i(e.role)}">${i(Pt(e.username,"U"))}</span>
          <div class="participant-identity">
            <div class="participant-name-row">
              <b class="role-${i(e.role)}">${i(e.username)}</b>
              ${t?`<span class="inline-note">(${o("youLabel")})</span>`:""}
              ${e.role==="owner"?`<span class="badge-chip owner-badge">${o("participantOwnerBadge")}</span>`:""}
            </div>
            <div class="participant-meta">
              ${i(d[e.role]||e.role)}
              <span class="status-dot ${e.ready?"ready":"idle"}"></span>
              <span class="ready-state ${e.ready?"ready":"idle"}">${e.ready?o("participantReadyBadge"):o("participantNotReadyBadge")}</span>
            </div>
          </div>
        </div>
        ${s||n||c?`<div class="participant-actions participant-actions-inline">
          ${c?`<button class="chip icon-chip" title="${o("transferOwnershipSymbolLabel")}" aria-label="${o("transferOwnership")}" data-act="transferOwnership" data-user-id="${i(e.userId)}">♔</button>`:""}
          ${s?`<button class="chip icon-chip" title="${o("kickSymbolLabel")}" aria-label="${o("kickPlayer")}" data-act="kickParticipant" data-user-id="${i(e.userId)}">×</button>`:""}
          ${n?`<button class="chip icon-chip" title="${o("banSymbolLabel")}" aria-label="${o("banPlayer")}" data-act="banParticipant" data-user-id="${i(e.userId)}">⛔</button>`:""}
        </div>`:""}
      </div>
    </li>
  `},Lt=()=>{if(!a.activeRoom)return"";const e=Array.isArray(a.activeRoom.participants)?a.activeRoom.participants:[],t=e.filter(k=>k.role!=="spectator"),r=e.filter(k=>k.role==="spectator"),s=!!a.user?.id&&a.user.id===a.activeRoom.ownerId,n=e.find(k=>k.userId===a.user?.id),c=n?.role==="owner"||n?.role==="player",d=!!a.activeMatch?.matchId,u=d&&a.activeMatch?.status!=="finished",h=d&&a.activeMatch?.status==="finished"&&(Array.isArray(a.activeMatch?.players)&&a.activeMatch.players.some(k=>k.userId===a.user?.id)||n?.role==="spectator"),R=u||h,I=a.activeRoom.isPublic?o("visibilityPublic"):o("visibilityPrivate"),re=`${t.length} / ${a.activeRoom.maxPlayers||6}`;return`
    <article class="room-panel">
      <div class="room-panel-head">
        <div>
          <div class="hero-kicker">${o("roomDetails")}</div>
          <h3 class="room-title">${i(a.activeRoom.name||o("roomDetails"))}</h3>
        </div>
        <div class="room-live-pill">${o("roomLiveSync")}</div>
      </div>
      <div class="room-meta room-meta-cards">
        <div class="room-stat-card room-stat-code">
          <span>${o("roomCode")}</span>
          <div class="room-stat-main room-code-row"><b>${i(a.activeRoom.inviteCode||"—")}</b> ${s?`<button class="chip room-code-action icon-chip" title="${o("regenerateInvite")}" aria-label="${o("regenerateInvite")}" data-act="regenInvite">${o("regenerateInviteShort")}</button>`:""}</div>
        </div>
        <div class="room-stat-card">
          <span>${o("roomOwnerName")}</span>
          <div class="room-stat-main">${i(a.activeRoom.ownerUsername||a.activeRoom.ownerId||"—")}</div>
        </div>
        <div class="room-stat-card">
          <span>${o("roomVisibilityLabel")}</span>
          <div class="room-stat-main">${I}</div>
        </div>
        <div class="room-stat-card">
          <span>${o("roomAccessLabel")}</span>
          <div class="room-stat-main">${Ue(a.activeRoom)}</div>
        </div>
        <div class="room-stat-card">
          <span>${o("roomStatsLabel")}</span>
          <div class="room-stat-main">${re}</div>
        </div>
      </div>
      <div class="room-lists">
        <div class="room-list-card">
          <h4>${o("roomParticipants")} (${t.length})</h4>
          <ul class="participant-list">${t.map(Ve).join("")}</ul>
        </div>
        <div class="room-list-card">
          <h4>${o("roomSpectators")} (${r.length})</h4>
          <ul class="participant-list">${r.map(Ve).join("")}</ul>
        </div>
      </div>
      <div class="stack">
        <h4>${o("roomActions")}</h4>
        <div class="room-actions">
          ${c?`<button class="secondary" data-act="readyRoom">${n?.ready?o("markNotReady"):o("markReady")}</button>`:""}
          ${s?`<button class="primary" data-act="startGame">${u?o("openActiveGame"):a.activeMatch?.status==="finished"?o("gamePlayAgain"):o("startGame")}</button>`:""}
          ${!s&&R?`<button class="secondary" data-act="openGame">${a.activeMatch?.status==="finished"?o("openMatchResults"):o("openActiveGame")}</button>`:""}
          ${s?`<button class="secondary" data-act="openRoomSettings">${o("openRoomSettings")}</button>`:""}
          <button class="chip" data-act="leaveRoom">${o(s?"closeOwnedRoom":"leaveRoom")}</button>
        </div>
      </div>
      <div id="roomStatus" class="status">${i(a.roomStatusMessage||"")}</div>
    </article>
  `},_t=()=>a.activeRoom?`
    <div class="room-manage-layout">
      <article class="room-chat-wide">
        <div class="room-chat-head">
          <div>
            <h3>${o("roomChat")}</h3>
            <p class="room-section-hint">${o("roomChatHint")}</p>
          </div>
        </div>
        <div class="chat-log" id="roomChatLog">
          ${(a.roomChatMessages||[]).length===0?`<div class="chat-empty">${o("roomChatEmpty")}</div>`:(a.roomChatMessages||[]).map(e=>{const t=e.userId&&a.user?.id&&e.userId===a.user.id,r=e.role==="system"?"system":t?"self":"remote",s=t?o("selfMessageLabel"):e.username||o("roleSystem");return`<div class="chat-line ${r}">
              <div class="chat-meta-row">
                <span class="chat-author">${i(s)}</span>
                <span class="chat-time">${i(Ct(e.timestamp))}</span>
              </div>
              <div class="chat-bubble">${i(e.text||"")}</div>
            </div>`}).join("")}
        </div>
        <div class="row topgap">
          <input id="roomChatInput" placeholder="${o("chatPlaceholder")}" />
          <button class="primary" data-act="sendRoomChat">${o("send")}</button>
        </div>
      </article>
    </div>
    <div id="roomManageStatus" class="status"></div>
  `:"",Mt=()=>{if(a.activeTab==="game")return`
    <main class="layout dark game-mode">
      <header class="game-topbar">
        <div class="game-topbar-brand">${o("appName")}</div>
        <div class="game-topbar-actions">
          <button class="chip" data-act="exitGame">${o("logout")}</button>
        </div>
      </header>
      ${St()}
      <div id="toastContainer" class="toast-container"></div>
    </main>`;const e=a.user?`<div class="profile-actions"><button class="avatar-btn" data-tab="profile">${i((a.user.username||"U").slice(0,1).toUpperCase())}</button><button class="chip" data-act="logout">${o("logout")}</button></div>`:`<button class="primary" data-act="toggleAuth">${o("openAuth")}</button>`;return`
  <main class="layout dark">
    <header class="topbar">
      <div class="topbar-brand">
        <div class="brand-mini">
          <h2>${o("appName")}</h2>
          <p class="brand-sub">${o("appGenre")}</p>
        </div>
      </div>
      <div class="topbar-content">
        <nav class="main-nav">
          <button class="tab ${a.activeTab==="home"?"active":""}" data-tab="home">${o("navHome")}</button>
          <button class="tab ${a.activeTab==="lobbies"?"active":""}" data-tab="lobbies">${o("navLobbies")}</button>
          ${a.activeRoom?`<button class="tab ${a.activeTab==="roomManage"?"active":""}" data-tab="roomManage">${o("navRoomActive")}</button>`:""}
          <button class="tab ${a.activeTab==="profile"?"active":""}" data-tab="profile">${o("navProfile")}</button>
        </nav>
        <div class="topbar-actions">
          <button class="primary topbar-create" data-act="heroCreate">＋ ${o("quickCreateRoom")}</button>
          <div class="lang-switch compact">
            <button class="chip ${a.lang==="ru"?"active":""}" data-lang="ru">RU</button>
            <button class="chip ${a.lang==="en"?"active":""}" data-lang="en">EN</button>
          </div>
          ${e}
        </div>
      </div>
    </header>

    ${it()}

    <section class="panel ${a.activeTab==="home"?"":"hidden"} cinematic-panel">${Et()}</section>
    <section class="panel ${a.activeTab==="lobbies"?"":"hidden"} cinematic-panel">${At()}</section>
    <section class="panel ${a.activeTab==="roomManage"?"":"hidden"} cinematic-panel">${Lt()}${_t()}</section>
    <section class="panel ${a.activeTab==="profile"?"":"hidden"} cinematic-panel">${Nt()}</section>

    ${tt()}
    ${ot()}
    ${rt()}
    ${st()}
    ${nt()}
    <div id="toastContainer" class="toast-container"></div>
  </main>`},Ut=(e,t,r)=>{const s=()=>{e&&(r(),e.innerHTML=Mt(),za(s),a.activeTab==="home"&&ua(s),a.activeTab==="lobbies"&&Xa(s),a.activeTab==="profile"&&Za(s),a.activeTab==="roomManage"&&Ka(s),a.activeTab==="game"&&at(s),a.authOpen&&!a.user&&Qa(s,t),a.roomChatInputShouldFocus&&a.activeTab==="roomManage"&&window.requestAnimationFrame(()=>{const n=document.querySelector("#roomChatInput");n instanceof HTMLInputElement&&(n.focus(),n.setSelectionRange(n.value.length,n.value.length)),ze(!1)}))};return s},Ot=async()=>{const e=document.querySelector("#app"),t=Ut(e,Be,be);await Be(),await xa(),await L("home",4),await L("catalog",a.lobbyFilters.limit,a.lobbyFilters.password),be(),pa(async()=>{await L("home",4),await L("catalog",a.lobbyFilters.limit,a.lobbyFilters.password),be()},t),t()};await Ot();
//# sourceMappingURL=index-EXuugseO.js.map
