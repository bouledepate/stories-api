(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const c of n)if(c.type==="childList")for(const d of c.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function r(n){const c={};return n.integrity&&(c.integrity=n.integrity),n.referrerPolicy&&(c.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?c.credentials="include":n.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(n){if(n.ep)return;n.ep=!0;const c=r(n);fetch(n.href,c)}})();const Ue={ru:{appTag:"Stories",title:"Control Center",subtitle:"Комнаты и профиль в одном месте.",login:"Вход",register:"Регистрация",logout:"Выйти",notAuthorized:"Не авторизованы",signedAs:"Вы вошли как",navHome:"Комнаты",navProfile:"Профиль",navLobbies:"Лобби",openAuth:"Войти / Регистрация",close:"Закрыть",cancel:"Отмена",authTitle:"Авторизация",authHint:"Откройте аккаунт или войдите в существующий.",username:"Имя пользователя",password:"Пароль",createAccount:"Создать аккаунт",loginSuccess:"Успешный вход.",registerSuccess:"Аккаунт создан и выполнен вход.",homeNeedAuth:"Выполните вход для доступа к комнатам.",roomsTitle:"Комнаты",createRoom:"Создать комнату",roomName:"Название комнаты",connectCode:"Войти по invite-коду",connect:"Подключиться",spectator:"Зайти как spectator",ready:"",roomCreated:"Комната создана. Invite code:",roomJoinSuccess:"Подключение успешно. Room:",profileTitle:"Профиль пользователя",profileEdit:"Редактирование",newPassword:"Новый пароль (опционально)",saveProfile:"Сохранить профиль",stats:"Статистика",needAuthProfile:"Сначала авторизуйтесь.",profileUpdated:"Профиль обновлен.",passwordChanged:"Пароль успешно изменён.",currentPassword:"Текущий пароль",nextPassword:"Новый пароль",changePassword:"Сменить пароль",wins:"Победы",losses:"Поражения",vt:"Victory tokens",elim3:"Eliminated with 3",healthError:"Ошибка",unknownError:"Неизвестная ошибка",httpError:"Ошибка HTTP {status}",invalidCredentials:"Неверный логин или пароль.",currentPasswordInvalid:"Текущий пароль указан неверно.",userExists:"Такой username уже занят.",unauthorized:"Требуется авторизация.",forbidden:"Недостаточно прав.",roomNotFound:"Комната не найдена.",inviteInvalid:"Некорректный invite-код.",validationFailed:"Проверьте корректность введенных данных.",serverUnavailable:"Сервер временно недоступен. Повторите позже.",invalidUrl:"Некорректный URL.",roomPasswordRequired:"Для входа в это лобби нужен пароль.",roomPasswordInvalid:"Неверный пароль лобби.",roomIsFull:"Комната заполнена. Войти можно только как зритель.",ownerAlreadyHasRoom:"У вас уже есть активная комната. Закройте её перед созданием новой.",userAlreadyHasActiveRoom:"Сначала выйдите из текущей комнаты, чтобы войти в другую.",heroTitle:"Stories: project-visual landing",heroSubtitle:"Создавайте публичные комнаты для каталога или приватные комнаты по invite-коду.",heroCreate:"Создать комнату",heroJoin:"Присоединиться",roomDetails:"Текущая комната",roomCode:"Код приглашения",roomOwner:"Владелец",roomOwnerName:"Ник владельца",roomParticipants:"Участники",roomSpectators:"Зрители",roomActions:"Действия с комнатой",leaveRoom:"Покинуть комнату",closeOwnedRoom:"Закрыть комнату",markReady:"Я готов",markNotReady:"Не готов",noFieldsToUpdate:"Нет полей для обновления.",userNotFound:"Пользователь не найден.",userNotInRoom:"Пользователь не находится в комнате.",inviteCodeGenerationFailed:"Не удалось сгенерировать invite-код.",onlyOwnerCanManageRoom:"Только владелец может управлять комнатой.",ownerCannotBeRemoved:"Владельца нельзя кикнуть или заблокировать.",cannotTransferOwnershipToSelf:"Нельзя передать владение самому себе.",onlyPlayersCanBeKicked:"Кик доступен только для игроков.",inviteRotateCooldown:"Invite-код можно пересоздавать не чаще одного раза в минуту.",youLabel:"вы",authRequiredAction:"Для этого действия войдите в аккаунт.",switchToLogin:"Уже есть аккаунт? Войти",switchToRegister:"Нет аккаунта? Регистрация",themeDark:"Тёмная",themeLight:"Светлая",lobbyTitle:"Список лобби",lobbyHint:"Фильтруйте публичные и закрытые лобби.",visibilityAll:"Все",visibilityPublic:"Публичные",visibilityPrivate:"Приватная",passwordAll:"Любые",passwordWith:"С паролем",passwordWithout:"Без пароля",loadLobbies:"Обновить список",lobbyNoItems:"Лобби не найдены",lobbyHasPassword:"Пароль",lobbyNoPassword:"Без пароля",joinLobby:"Войти в лобби",roomPassword:"Пароль комнаты",roomPasswordOptional:"Пароль комнаты (необязательно)",availableRooms:"Доступные комнаты",myRooms:"Мои комнаты",openRoom:"Открыть",joinHint:"Введите invite-код. Приватные комнаты доступны только так.",statusReady:"Статус: готов.",statusNotReady:"Статус: не готов.",joinPasswordHint:"Для этой комнаты нужен пароль. Invite-код сам по себе не заменяет пароль.",joinWithoutPasswordHint:"Это лобби без пароля. Подтвердите вход.",joinPublicLobbyHint:"Публичная комната без пароля. Подтвердите вход.",requiredField:"Заполните обязательное поле.",inviteCodeInvalid:"Введите корректный invite-код (6 символов).",roomManage:"Управление комнатой",roomManageTitle:"Настройки комнаты",saveRoomSettings:"Сохранить настройки",regenerateInvite:"Пересоздать код приглашения",kickPlayer:"Кик",banPlayer:"Блок",roomChat:"Чат комнаты",chatPlaceholder:"Введите сообщение...",send:"Отправить",roomSettingsSaved:"Настройки комнаты обновлены.",inviteRegenerated:"Invite-код обновлён.",blockedNotice:"Вы заблокированы в этой комнате.",kickedFromRoomNotice:"Вы были исключены из комнаты.",roleOwner:"Владелец",rolePlayer:"Игрок",roleSpectator:"Зритель",roleSystem:"Система",roomClosedNotice:"Комната была закрыта владельцем.",roomManageReadonly:"Только владелец может менять настройки комнаты.",appName:"Letters: No Mercy",appGenre:"Dark Medieval Stories",navRoomActive:"Комната",quickCreateRoom:"Новая комната",roleOwnerShort:"Владелец",rolePlayerShort:"Игрок",roleSpectatorShort:"Зритель",readyShort:"готов",notReadyShort:"не готов",systemJoinedRoom:"{username} вошёл в комнату.",systemLeftRoom:"{username} вышел из комнаты.",systemUnknownUser:"Игрок",transferOwnership:"Передать владельца",ownershipTransferred:"Владелец комнаты изменён.",joinCurrentRoom:"Вернуться в комнату",closeAndJoinRoom:"Закрыть и войти",leaveAndJoinRoom:"Выйти и войти",roomSwitchTitle:"Переход в другую комнату",roomSwitchLeaveHint:"Вы уже состоите в комнате. Сначала выйдите из неё, чтобы открыть «{target}».",roomSwitchCloseHint:"Вы владелец текущей комнаты. Сначала закройте её, чтобы открыть «{target}».",participantRemovedNotice:"Доступ к комнате был отозван.",kickSymbolLabel:"Кикнуть игрока",banSymbolLabel:"Заблокировать игрока",transferOwnershipSymbolLabel:"Передать владение",roomLiveSync:"Комната активна",roomVisibilityLabel:"Видимость",roomAccessLabel:"Доступ",roomStatsLabel:"Состав",roomSizeLabel:"Размер",roomProtected:"С паролем",roomOpenAccess:"Без пароля",roomVisibilityPublicToggle:"Показывать комнату в публичном каталоге",roomCreateAccessHint:"Публичные комнаты видны на главной и во вкладке лобби. Приватные комнаты не показываются в каталогах и открываются только по invite-коду.",roomPasswordHint:"Пароль добавляет дополнительную защиту поверх выбранного режима доступа.",roomSettingsHint:"Настройте публикацию комнаты, пароль и лимит игроков.",roomAccessPublicOpen:"Публичная, вход без пароля",roomAccessPublicProtected:"Публичная, вход по паролю",roomAccessPrivateCodeOnly:"Приватная, вход только по invite-коду",roomAccessPrivateProtected:"Приватная, invite-код и пароль",lobbyCatalogHint:"Здесь показываются только публичные комнаты. Приватные комнаты доступны только по invite-коду.",roomChatHint:"Здесь остаются системные события и сообщения игроков.",roomChatEmpty:"Чат пуст. Первое сообщение задаст тон партии.",selfMessageLabel:"Вы",participantOwnerBadge:"owner",participantReadyBadge:"ГОТОВ",participantNotReadyBadge:"НЕ ГОТОВ",roomSwitchAccent:"Сначала завершите текущую сессию комнаты.",roomSize:"Размер комнаты",roomSizeHelp:"От 2 до 6 игроков. Если мест нет, зайти можно только как зритель.",regenerateInviteShort:"♻",openRoomSettings:"Настройки комнаты",roomSettingsModalTitle:"Параметры комнаты",roomUpdatedSystem:"Параметры комнаты обновлены.",ownershipTransferredSystem:"{username} стал новым владельцем комнаты.",participantKickedSystem:"{username} исключён из комнаты.",participantBannedSystem:"{username} заблокирован в комнате.",startGame:"Начать игру",openActiveGame:"Перейти в игру",gameStarted:"Игра запущена.",leftGame:"Вы вышли из игры.",gameExitConfirm:"Выйти из игры и покинуть комнату?",gamePlayAgain:"Играть снова",gamePlayAgainOwnerOnly:"Новый матч может запустить только владелец комнаты.",gameFinalTitle:"Матч завершён",gameFinalStatsRounds:"Раундов сыграно",gameFinalStatsTarget:"Победных очков",gameFinalLeave:"Выйти",gameReturnToRoom:"Вернуться в комнату",gameFinalCardLabel:"Финальная карта",openMatchResults:"Итоги матча",gameNoActiveMatch:"Активный матч не найден.",gameLeaderboard:"Лидерборд",gameEvents:"Лог событий",gameNoEvents:"Событий пока нет.",gameExitConfirmTitle:"Покинуть игру",kingPromptTitle:"Король",kingPromptConfirm:"Да, сбросить Короля",gameHandCount:"Карт в руке",gameDiscardCount:"Сброс",gameYourTurn:"Ваш ход",gameWaitTurn:"Ожидайте свой ход",gameMyTable:"Мой стол",gameNoCardsOnTable:"Пока пусто",gameStartRound:"Начать раунд",playedCardEvent:"разыграл карту {card}",autoPlayedOnLeaveEvent:"{actor} вышел из игры и автоматически разыграл карту: {card}.",autoDiscardOnTurnEvent:"{actor} вышел из игры и автоматически сбросил карту: {card}.",roundWinnerSummary:"Раунд {round}: победитель(и) {winners}",matchWinner:"Победитель матча: {winner}",gameDeck:"Колода",setAsideCardLabel:"Отложенная",setAsideHiddenHint:"Отложенная карта скрыта до конца раунда.",matchNotFound:"Матч не найден.",matchAlreadyExists:"Для этой комнаты уже есть активный матч.",matchAlreadyFinished:"Матч уже завершён.",notEnoughPlayersToStartMatch:"Для старта матча нужно минимум два игрока.",roundNotActive:"Раунд не активен.",roundAlreadyActive:"Раунд уже запущен.",notPlayerTurn:"Сейчас ход другого игрока.",playerNotInMatch:"Вы не участвуете в матче.",playerEliminated:"Вы выбыли из раунда.",cardNotInHand:"Этой карты нет в вашей руке.",targetPlayerRequired:"Сначала выберите цель.",targetPlayerInvalid:"Эту цель нельзя выбрать.",cardGuessRequired:"Нужно выбрать карту для угадывания.",cardGuessInvalid:"Указана недопустимая карта для угадывания.",guardCannotGuessGuard:"Стражника нельзя называть картой для угадывания.",peasantReactionOnly:"Крестьянина нельзя разыграть обычным ходом. Он играется только как реакция после промаха Стражника.",cardPlayBlocked:"Эту карту нельзя разыграть до вашего следующего хода.",kingSelfEliminateConfirm:"Если вы сбросите Короля, то сразу выбываете из раунда. Продолжить?",targetPlayerProtected:"Этого игрока сейчас защищает Дворянка.",matchStateInvalid:"Состояние матча повреждено.",playersNotReady:"Перед стартом игры все игроки должны нажать готовность.",allPlayersMustReadyHint:"Чтобы начать игру, в лобби должно быть минимум 2 игрока и все должны быть готовы.",waitingNextRound:"Ожидаем старт следующего раунда…",nextRoundIn:"Следующий раунд начнётся через {seconds}с…",newChatMessageNotice:"Новое сообщение в чате.",guardResolutionPending:"Идёт разрешение эффекта...",guardResolutionTitle:"Разрешение эффекта",guardResolutionHint:"Эффект Стражника завершён. Можно продолжать игру.",guardResolutionSummary:"Скрытая фаза завершения эффекта перед передачей хода.",guardResolutionConfirm:"Продолжить",guardPromptTitle:"Стражник",guardPromptHint:"Выберите другого игрока и попробуйте угадать его карту.",guardPromptTarget:"Цель",guardPromptGuess:"Предполагаемая карта",guardPromptConfirm:"Разыграть Стражника",guardPromptSummary:"Вы выбрали карту: {card}.",guardPromptSummaryEmpty:"Выберите карту для догадки.",guardTargetUnavailable:"Сейчас нет доступной цели для Стражника.",guardGuessRequired:"Выберите карту, которую хотите угадать.",guardHitEvent:"{actor} угадал карту {card} у {target}. Игрок выбывает.",guardMissEvent:"{actor} не угадал карту {card} у {target}.",guardNoTargetEvent:"{actor} разыграл карту {card}, но подходящей цели не было.",peasantReactionTitle:"Крестьянин",peasantReactionHint:"Вы можете сыграть Крестьянина. Возьмите карту: если это будет {card}, вы выбываете.",peasantReactionSummary:"Эта реакция разыгрывается до передачи хода следующему игроку.",peasantReactionConfirm:"Сыграть Крестьянина",peasantReactionSkip:"Пропустить",peasantReactionSafeEvent:"{actor} сыграл карту {card} и пережил проверку.",peasantReactionEliminatedEvent:"{actor} сыграл карту {card}, взял загаданную карту и выбыл.",peasantReactionSkippedEvent:"{actor} решил не разыгрывать карту {card}.",guardMissResolvedEvent:"Эффект карты {card} завершён.",scoutPromptTitle:"Разведчик",scoutPromptHint:"Выберите игрока. Он не сможет разыграть текущую карту до своего следующего хода.",scoutPromptSummary:"Цель получит временный запрет на текущую карту в руке.",scoutPromptConfirm:"Разыграть Разведчика",scoutTargetUnavailable:"Сейчас нет доступной цели для Разведчика.",scoutLockEvent:"{actor} запретил {target} разыгрывать текущую карту до следующего хода.",scoutNoTargetEvent:"{actor} разыграл карту {card}, но подходящей цели не было.",cardLockedBadge:"запрет",executionerPromptTitle:"Палач",executionerPromptHint:"Выберите игрока. Он выбывает, если значение его карты меньше или равно 4.",executionerPromptSummary:"Цель выбывает только если её карта не старше 4.",executionerPromptConfirm:"Разыграть Палача",executionerTargetUnavailable:"Сейчас нет доступной цели для Палача.",executionerEliminateEvent:"{actor} казнил {target}: карта цели была не выше 4.",executionerSurviveEvent:"{actor} не смог казнить {target}: карта цели оказалась выше 4.",executionerNoTargetEvent:"{actor} разыграл карту {card}, но подходящей цели не было.",protectedBadge:"защита",ladyProtectionEvent:"{actor} разыграл карту {card} и получил защиту от эффектов других игроков до своего следующего хода.",blackRoseBadge:"чёрная роза",bishopTokenEvent:"{actor} разыграл карту {card} и положил на себя жетон Чёрная роза.",queenNoDecreeEvent:"{actor} разыграл карту {card}, но в этом раунде нет указов для Милости королевы.",kingSelfEliminationEvent:"{actor} сбросил карту {card} и выбыл из раунда.",kingForcedEliminationEvent:"{target} сбросил карту {card} из-за эффекта {actor} и выбыл из раунда.",blackRoseSavedEvent:"{target} сбросил жетон Чёрная роза вместо карты {card} из-за эффекта {actor}.",rebelPromptTitle:"Мятежник",rebelPromptHint:"Выберите игрока. Он сбросит карту и доберёт новую. Можно выбрать и себя.",rebelPromptSummary:"Цель сбросит текущую карту и возьмёт новую из колоды, если она есть.",rebelPromptConfirm:"Разыграть Мятежника",rebelTargetUnavailable:"Сейчас нет доступной цели для Мятежника.",rebelRedrawEvent:"{actor} заставил {target} сбросить карту {card} и взять новую.",feudalPromptTitle:"Феодал",feudalPromptHint:"Выберите двух игроков. После этого вы увидите их карты и решите, менять их местами или нет.",feudalPromptTargets:"Две цели",feudalPromptSummary:"Для Феодала нужно выбрать двух разных игроков.",feudalPromptConfirm:"Посмотреть карты",feudalPromptNeedTwoTargets:"Для Феодала нужно выбрать двух разных игроков.",feudalResolveTitle:"Феодал: выбор обмена",feudalResolveHint:"Вы посмотрели обе карты. Теперь можно обменять их местами или оставить как есть.",feudalResolveSummary:"Это решение завершит эффект Феодала.",feudalSwapConfirm:"Поменять местами",feudalKeepConfirm:"Оставить как есть",feudalNoTargetEvent:"{actor} разыграл карту {card}, но двух доступных целей не было.",feudalInspectEvent:"{actor} разыграл карту {card} и посмотрел карты {firstTarget} и {secondTarget}.",feudalSwapEvent:"{actor} разыграл карту {card} и поменял местами карты {firstTarget} и {secondTarget}.",feudalKeepEvent:"{actor} разыграл карту {card} и решил не менять карты {firstTarget} и {secondTarget}."},en:{appTag:"Stories",title:"Control Center",subtitle:"Rooms and profile in one place.",login:"Sign in",register:"Sign up",logout:"Logout",notAuthorized:"Not authorized",signedAs:"Signed in as",navHome:"Rooms",navProfile:"Profile",navLobbies:"Lobbies",openAuth:"Login / Register",close:"Close",cancel:"Cancel",authTitle:"Authentication",authHint:"Create an account or sign in.",username:"Username",password:"Password",createAccount:"Create account",loginSuccess:"Signed in successfully.",registerSuccess:"Account created and signed in.",homeNeedAuth:"Sign in to access rooms.",roomsTitle:"Rooms",createRoom:"Create room",roomName:"Room name",connectCode:"Join by invite code",connect:"Connect",spectator:"Join as spectator",ready:"",roomCreated:"Room created. Invite code:",roomJoinSuccess:"Connected successfully. Room:",profileTitle:"User profile",profileEdit:"Edit profile",newPassword:"New password (optional)",saveProfile:"Save profile",stats:"Stats",needAuthProfile:"Sign in first.",profileUpdated:"Profile updated.",passwordChanged:"Password changed successfully.",currentPassword:"Current password",nextPassword:"New password",changePassword:"Change password",wins:"Wins",losses:"Losses",vt:"Victory tokens",elim3:"Eliminated with 3",healthError:"Error",unknownError:"Unknown error",httpError:"HTTP error {status}",invalidCredentials:"Invalid username or password.",currentPasswordInvalid:"Current password is invalid.",userExists:"This username is already taken.",unauthorized:"Authorization required.",forbidden:"Not enough permissions.",roomNotFound:"Room not found.",inviteInvalid:"Invalid invite code.",validationFailed:"Please check input values.",serverUnavailable:"Server is temporarily unavailable. Try again later.",invalidUrl:"Invalid URL.",roomPasswordRequired:"Lobby password is required.",roomPasswordInvalid:"Invalid lobby password.",roomIsFull:"Room is full. You can join only as spectator.",ownerAlreadyHasRoom:"You already have an active room. Close it before creating a new one.",userAlreadyHasActiveRoom:"Leave your current room before joining another one.",heroTitle:"Stories: project visual landing",heroSubtitle:"Create public rooms for the catalog or private rooms that open only by invite code.",heroCreate:"Create room",heroJoin:"Join room",roomDetails:"Current room",roomCode:"Invite code",roomOwner:"Owner",roomOwnerName:"Owner name",roomParticipants:"Participants",roomSpectators:"Spectators",roomActions:"Room actions",leaveRoom:"Leave room",closeOwnedRoom:"Close room",markReady:"Mark ready",markNotReady:"Mark not ready",noFieldsToUpdate:"No fields to update.",userNotFound:"User not found.",userNotInRoom:"User is not in room.",inviteCodeGenerationFailed:"Failed to generate invite code.",onlyOwnerCanManageRoom:"Only room owner can manage room.",ownerCannotBeRemoved:"Owner cannot be kicked or blocked.",cannotTransferOwnershipToSelf:"You cannot transfer ownership to yourself.",onlyPlayersCanBeKicked:"Only players can be kicked.",inviteRotateCooldown:"Invite code can be regenerated only once per minute.",youLabel:"you",authRequiredAction:"Please sign in to continue.",switchToLogin:"Already have an account? Sign in",switchToRegister:"No account yet? Sign up",themeDark:"Dark",themeLight:"Light",lobbyTitle:"Lobby list",lobbyHint:"Filter public and private lobbies.",visibilityAll:"All",visibilityPublic:"Public",visibilityPrivate:"Private",passwordAll:"Any",passwordWith:"With password",passwordWithout:"Without password",loadLobbies:"Refresh list",lobbyNoItems:"No lobbies found",lobbyHasPassword:"Password",lobbyNoPassword:"No password",joinLobby:"Join lobby",roomPassword:"Room password",roomPasswordOptional:"Room password (optional)",availableRooms:"Available rooms",myRooms:"My rooms",openRoom:"Open",joinHint:"Enter an invite code. Private rooms are available only this way.",statusReady:"Status: ready.",statusNotReady:"Status: not ready.",joinPasswordHint:"This room requires a password. Invite code does not replace it.",joinWithoutPasswordHint:"This lobby has no password. Confirm join.",joinPublicLobbyHint:"This public room has no password. Confirm join.",requiredField:"Please fill in the required field.",inviteCodeInvalid:"Enter a valid invite code (6 characters).",roomManage:"Room management",roomManageTitle:"Room settings",saveRoomSettings:"Save settings",regenerateInvite:"Regenerate invite code",kickPlayer:"Kick",banPlayer:"Block",roomChat:"Room chat",chatPlaceholder:"Type a message...",send:"Send",roomSettingsSaved:"Room settings updated.",inviteRegenerated:"Invite code regenerated.",blockedNotice:"You are blocked in this room.",kickedFromRoomNotice:"You were kicked from the room.",roleOwner:"Owner",rolePlayer:"Player",roleSpectator:"Spectator",roleSystem:"System",roomClosedNotice:"The room was closed by the owner.",roomManageReadonly:"Only the owner can change room settings.",appName:"Letters: No Mercy",appGenre:"Dark Medieval Stories",navRoomActive:"Room",quickCreateRoom:"New room",roleOwnerShort:"Owner",rolePlayerShort:"Player",roleSpectatorShort:"Spectator",readyShort:"ready",notReadyShort:"not ready",systemJoinedRoom:"{username} joined the room.",systemLeftRoom:"{username} left the room.",systemUnknownUser:"Player",transferOwnership:"Transfer ownership",ownershipTransferred:"Room ownership transferred.",joinCurrentRoom:"Return to room",closeAndJoinRoom:"Close and join",leaveAndJoinRoom:"Leave and join",roomSwitchTitle:"Join another room",roomSwitchLeaveHint:'You are already in a room. Leave it first to open "{target}".',roomSwitchCloseHint:'You own the current room. Close it first to open "{target}".',participantRemovedNotice:"Your access to the room was revoked.",kickSymbolLabel:"Kick player",banSymbolLabel:"Block player",transferOwnershipSymbolLabel:"Transfer ownership",roomLiveSync:"Room is active",roomVisibilityLabel:"Visibility",roomAccessLabel:"Access",roomStatsLabel:"Roster",roomSizeLabel:"Capacity",roomProtected:"Password protected",roomOpenAccess:"Open access",roomVisibilityPublicToggle:"Show room in the public catalog",roomCreateAccessHint:"Public rooms are visible on the home screen and in the lobby tab. Private rooms are hidden from catalogs and open only by invite code.",roomPasswordHint:"Password adds an extra lock on top of the selected access mode.",roomSettingsHint:"Tune room publication, password and player cap for the current session.",roomAccessPublicOpen:"Public, no password required",roomAccessPublicProtected:"Public, password required",roomAccessPrivateCodeOnly:"Private, invite code only",roomAccessPrivateProtected:"Private, invite code and password",lobbyCatalogHint:"Only public rooms are shown here. Private rooms are available only by invite code.",roomChatHint:"System events and player messages stay here.",roomChatEmpty:"Chat is empty. The first message sets the tone.",selfMessageLabel:"You",participantOwnerBadge:"owner",participantReadyBadge:"READY",participantNotReadyBadge:"WAITING",roomSwitchAccent:"Finish your current room session first.",roomSize:"Room size",roomSizeHelp:"From 2 to 6 players. When full, users can join only as spectators.",regenerateInviteShort:"♻",openRoomSettings:"Room settings",roomSettingsModalTitle:"Room settings",roomUpdatedSystem:"Room settings updated.",ownershipTransferredSystem:"{username} is now the room owner.",participantKickedSystem:"{username} was kicked from the room.",participantBannedSystem:"{username} was blocked in the room.",startGame:"Start game",openActiveGame:"Open game",gameStarted:"Game started.",leftGame:"You left the game.",gameExitConfirm:"Leave game and room?",gamePlayAgain:"Play again",gamePlayAgainOwnerOnly:"Only the room owner can start a new match.",gameFinalTitle:"Match finished",gameFinalStatsRounds:"Rounds played",gameFinalStatsTarget:"Victory points",gameFinalLeave:"Leave",gameReturnToRoom:"Return to room",gameFinalCardLabel:"Final card",openMatchResults:"Match results",gameNoActiveMatch:"No active match found.",gameLeaderboard:"Leaderboard",gameEvents:"Event log",gameNoEvents:"No events yet.",gameExitConfirmTitle:"Leave the game",kingPromptTitle:"King",kingPromptConfirm:"Yes, discard the King",gameHandCount:"Hand",gameDiscardCount:"Discard",gameYourTurn:"Your turn",gameWaitTurn:"Waiting for your turn",gameMyTable:"My table",gameNoCardsOnTable:"No cards yet",gameStartRound:"Start round",playedCardEvent:"played {card}",autoPlayedOnLeaveEvent:"{actor} left the game and auto-played a card: {card}.",autoDiscardOnTurnEvent:"{actor} left the game and auto-discarded a card: {card}.",roundWinnerSummary:"Round {round}: winner(s) {winners}",matchWinner:"Match winner: {winner}",gameDeck:"Deck",setAsideCardLabel:"Set Aside",setAsideHiddenHint:"Set-aside card is hidden until round end.",matchNotFound:"Match not found.",matchAlreadyExists:"An active match already exists for this room.",matchAlreadyFinished:"Match is already finished.",notEnoughPlayersToStartMatch:"At least two players are required to start a match.",roundNotActive:"Round is not active.",roundAlreadyActive:"Round is already active.",notPlayerTurn:"It is not your turn.",playerNotInMatch:"You are not in this match.",playerEliminated:"You are eliminated from this round.",cardNotInHand:"This card is not in your hand.",targetPlayerRequired:"Choose a target first.",targetPlayerInvalid:"This target cannot be selected.",cardGuessRequired:"Choose a card to guess.",cardGuessInvalid:"The guessed card is invalid.",guardCannotGuessGuard:"Guard cannot be named as the guessed card.",peasantReactionOnly:"Peasant cannot be played as a regular turn card. It is only played as a reaction after a Guard miss.",cardPlayBlocked:"This card cannot be played until your next turn.",kingSelfEliminateConfirm:"If you discard the King, you will be eliminated from the round. Continue?",targetPlayerProtected:"This player is currently protected by the Lady.",matchStateInvalid:"Match state is invalid.",playersNotReady:"All players must be ready before starting the game.",allPlayersMustReadyHint:"To start the game, lobby must have at least 2 players and all must be ready.",waitingNextRound:"Waiting for the next round to start…",nextRoundIn:"Next round starts in {seconds}s…",newChatMessageNotice:"New chat message.",guardResolutionPending:"Resolving effect…",guardResolutionTitle:"Effect resolution",guardResolutionHint:"The Guard effect is complete. The game can continue.",guardResolutionSummary:"A hidden resolution phase is finishing before the turn passes on.",guardResolutionConfirm:"Continue",peasantReactionTitle:"Peasant",peasantReactionHint:"You may play the Peasant. Draw a card: if it is {card}, you are eliminated.",peasantReactionSummary:"This reaction resolves before the turn passes to the next player.",peasantReactionConfirm:"Play Peasant",peasantReactionSkip:"Skip",peasantReactionSafeEvent:"{actor} played {card} and survived the check.",peasantReactionEliminatedEvent:"{actor} played {card}, drew the guessed card, and was eliminated.",peasantReactionSkippedEvent:"{actor} chose not to play {card}.",guardMissResolvedEvent:"The effect of {card} has been resolved.",feudalPromptTitle:"Feudal Lord",feudalPromptHint:"Choose two players. After that you will see their cards and decide whether to swap them.",feudalPromptTargets:"Two targets",feudalPromptSummary:"Feudal Lord requires two different players.",feudalPromptConfirm:"Reveal cards",feudalPromptNeedTwoTargets:"Feudal Lord requires two different players.",feudalResolveTitle:"Feudal Lord: swap decision",feudalResolveHint:"You have seen both cards. Now you may swap them or keep them as they are.",feudalResolveSummary:"This choice will finish the Feudal Lord effect.",feudalSwapConfirm:"Swap cards",feudalKeepConfirm:"Keep as is",feudalNoTargetEvent:"{actor} played {card}, but there were not enough available targets.",feudalInspectEvent:"{actor} played {card} and looked at the cards of {firstTarget} and {secondTarget}.",feudalSwapEvent:"{actor} played {card} and swapped the cards of {firstTarget} and {secondTarget}.",feudalKeepEvent:"{actor} played {card} and decided not to swap the cards of {firstTarget} and {secondTarget}.",blackRoseBadge:"black rose",bishopTokenEvent:"{actor} played {card} and placed a Black Rose token on themselves.",queenNoDecreeEvent:"{actor} played {card}, but there is no decree to suppress this round.",kingSelfEliminationEvent:"{actor} discarded {card} and was eliminated from the round.",kingForcedEliminationEvent:"{target} discarded {card} because of {actor}'s effect and was eliminated from the round.",blackRoseSavedEvent:"{target} discarded a Black Rose token instead of card {card} because of {actor}'s effect."}},se=(e,a="")=>{try{return localStorage.getItem(e)||a}catch{return a}},ne=(e,a)=>{try{localStorage.setItem(e,a)}catch{}},W=e=>{try{localStorage.removeItem(e)}catch{}},qe=(e,a)=>{try{const r=localStorage.getItem(e);return r?JSON.parse(r)??a:a}catch{return a}},Fe=(e,a)=>{try{localStorage.setItem(e,JSON.stringify(a))}catch{}},f={readToken:()=>se("stories_token"),writeToken:e=>ne("stories_token",e),removeToken:()=>W("stories_token"),readLanguage:()=>se("stories_lang","ru"),writeLanguage:e=>ne("stories_lang",e),readActiveRoomId:()=>se("stories_active_room_id"),writeActiveRoomId:e=>ne("stories_active_room_id",e),removeActiveRoomId:()=>W("stories_active_room_id"),readActiveMatchId:()=>se("stories_active_match_id"),writeActiveMatchId:e=>ne("stories_active_match_id",e),removeActiveMatchId:()=>W("stories_active_match_id"),readRoomChatMessages:e=>e?qe(`stories_room_chat_${e}`,[]):[],writeRoomChatMessages:(e,a)=>{e&&Fe(`stories_room_chat_${e}`,a)},removeRoomChatMessages:e=>{e&&W(`stories_room_chat_${e}`)},readGameEventLog:e=>e?qe(`stories_game_event_log_${e}`,[]):[],writeGameEventLog:(e,a)=>{e&&Fe(`stories_game_event_log_${e}`,a)},removeGameEventLog:e=>{e&&W(`stories_game_event_log_${e}`)}},fa=window.location.hostname==="0.0.0.0"||window.location.hostname===""?"localhost":window.location.hostname,wa=window.location.protocol==="https:"?"wss":"ws",ie=f.readActiveRoomId(),ye=f.readActiveMatchId(),t={apiBase:window.location.origin,wsUrl:`${wa}://${fa}:8081`,token:f.readToken(),user:null,activeRoom:ie?{roomId:ie}:null,activeMatch:ye?{matchId:ye}:null,activeTab:"home",homeLobbies:[],lobbyCatalog:[],lobbyFilters:{password:"all",limit:20},socket:null,lang:f.readLanguage(),authOpen:!1,authMode:"login",roomModalOpen:!1,roomModalMode:"create",roomSettingsOpen:!1,joinLobbyModalOpen:!1,joinLobbyRoomId:"",joinLobbyOwnerUserId:"",joinLobbyRoomName:"",joinLobbyNeedsPassword:!1,joinLobbyPassword:"",joinLobbySpectator:!1,roomSwitchPromptOpen:!1,roomSwitchPromptMode:"leave",roomSwitchTargetLabel:"",pendingJoinAction:null,suppressOwnJoinPresence:!!ie,roomChatMessages:f.readRoomChatMessages(ie),roomChatInputShouldFocus:!1,gameEventLog:f.readGameEventLog(ye),gameChatOpen:!1,gameChatUnreadCount:0,gameCardPreview:null,gameCardPlayPrompt:null,gameConfirmPrompt:null,gameStatusMessage:"",homeStatusMessage:"",myRooms:[],roomNoticeMessage:"",roomStatusMessage:""},o=(e,a={})=>{const r=Ue[t.lang]?.[e]??Ue.ru[e]??e;return Object.entries(a).reduce((s,[n,c])=>s.replaceAll(`{${n}}`,String(c)),r)},i=e=>{const a=document.createElement("div");return a.textContent=String(e??""),a.innerHTML},w=(e,a=256)=>{const r=document.querySelector(e);return r?String(r.value??"").trim().slice(0,a):""},T=(e,a,r=!1)=>{const s=document.querySelector(`#${e}`);s&&(s.textContent=a,s.classList.toggle("ok",r))},v=(e,a="error")=>{const r=document.querySelector("#toastContainer");if(!r||!e)return;const s=document.createElement("div");s.className=`toast ${a}`,s.textContent=e,r.prepend(s),window.setTimeout(()=>s.remove(),4200)},b=(e,a)=>{const r=a?.message||o("unknownError");T(e,r),v(r)},fe=e=>{const a=document.querySelector(e);a&&(a.classList.remove("input-error"),a.removeAttribute("aria-invalid"))},we=(e,a)=>{const r=document.querySelector(e);r&&(r.classList.add("input-error"),r.setAttribute("aria-invalid","true"),r.focus(),v(a))},We=()=>{f.removeActiveRoomId()},Ra=e=>{if(e){f.writeActiveRoomId(e);return}We()},Ye=()=>{f.removeActiveMatchId()},Ia=e=>{if(e){f.writeActiveMatchId(e);return}Ye()},ge=e=>{t.token=e||"",t.token?f.writeToken(t.token):f.removeToken()},Y=e=>{t.user=e||null},Sa=e=>{t.lang=e,f.writeLanguage(e)},y=e=>{t.activeTab=e},He=e=>{t.homeLobbies=Array.isArray(e)?e:[]},Re=e=>{t.lobbyCatalog=Array.isArray(e)?e:[]},Ca=({password:e,limit:a})=>{e!==void 0&&(t.lobbyFilters.password=e),a!==void 0&&(t.lobbyFilters.limit=a)},xe=e=>{t.myRooms=Array.isArray(e)?e:[]},Ie=e=>{t.socket=e},K=({open:e,mode:a}={})=>{e!==void 0&&(t.authOpen=!!e),a!==void 0&&(t.authMode=a)},ee=({open:e,mode:a}={})=>{e!==void 0&&(t.roomModalOpen=!!e),a!==void 0&&(t.roomModalMode=a)},he=e=>{t.roomSettingsOpen=!!e},Ke=e=>{t.roomStatusMessage=""},G=e=>{t.homeStatusMessage=e||""},A=e=>{t.roomNoticeMessage=e||""},Ee=e=>{t.suppressOwnJoinPresence=!!e},ze=e=>{t.roomChatInputShouldFocus=!!e},M=e=>{t.gameStatusMessage=e||""},z=e=>{t.gameChatOpen=!!e},ae=e=>{t.gameChatUnreadCount=Math.max(0,0)},ce=e=>{t.gameCardPreview=e||null},de=e=>{t.gameCardPlayPrompt=e||null},U=e=>{t.gameConfirmPrompt=e||null},H=e=>{t.gameCardPlayPrompt&&(t.gameCardPlayPrompt={...t.gameCardPlayPrompt,...e||{}})},Ge=()=>{t.gameChatUnreadCount=Math.max(0,Number(t.gameChatUnreadCount||0)+1)},Qe=e=>{t.gameEventLog=[...t.gameEventLog,{timestamp:Date.now(),...e}].slice(-120),f.writeGameEventLog(t.activeMatch?.matchId||"",t.gameEventLog)},Xe=()=>{f.removeGameEventLog(t.activeMatch?.matchId||""),t.gameEventLog=[]},J=e=>{t.roomChatMessages=[...t.roomChatMessages,{timestamp:Date.now(),...e}].slice(-100),f.writeRoomChatMessages(t.activeRoom?.roomId||"",t.roomChatMessages)},Pa=e=>{t.roomChatMessages=Array.isArray(e)?e.slice(-100):[],f.writeRoomChatMessages(t.activeRoom?.roomId||"",t.roomChatMessages)},$a=()=>{f.removeRoomChatMessages(t.activeRoom?.roomId||""),t.roomChatMessages=[]},$=(e,{persist:a=!0}={})=>{t.activeRoom=e||null,t.roomChatMessages=f.readRoomChatMessages(e?.roomId||""),a&&Ra(e?.roomId||"")},L=()=>{t.activeRoom=null,t.roomChatMessages=[],We()},ue=(e,{persist:a=!0}={})=>{t.activeMatch=e||null,t.gameEventLog=f.readGameEventLog(e?.matchId||""),a&&Ia(e?.matchId||"")},S=()=>{t.activeMatch=null,t.gameEventLog=[],Ye()},Ze=({open:e,roomId:a,ownerUserId:r,roomName:s,needsPassword:n,password:c,spectator:d}={})=>{e!==void 0&&(t.joinLobbyModalOpen=!!e),a!==void 0&&(t.joinLobbyRoomId=a),r!==void 0&&(t.joinLobbyOwnerUserId=r),s!==void 0&&(t.joinLobbyRoomName=s),n!==void 0&&(t.joinLobbyNeedsPassword=!!n),c!==void 0&&(t.joinLobbyPassword=c),d!==void 0&&(t.joinLobbySpectator=!!d)},ke=()=>{Ze({open:!1,roomId:"",ownerUserId:"",roomName:"",needsPassword:!1,password:"",spectator:!1})},ea=({open:e,mode:a,targetLabel:r,pendingJoinAction:s}={})=>{e!==void 0&&(t.roomSwitchPromptOpen=!!e),a!==void 0&&(t.roomSwitchPromptMode=a),r!==void 0&&(t.roomSwitchTargetLabel=r),s!==void 0&&(t.pendingJoinAction=s)},Ae=()=>{ea({open:!1,mode:"leave",targetLabel:"",pendingJoinAction:null})},Ta=()=>{ge(""),Y(null),L(),S(),K({open:!1}),A(""),z(!1),ae(),ce(null),Xe(),M(""),Ae()},F=(e,a="login")=>{K({open:!0,mode:a}),e()},Ea=()=>t.token?{Authorization:`Bearer ${t.token}`}:{},ka=(e,a)=>{const r=String(e||"").toUpperCase(),s={INVALID_CREDENTIALS:"invalidCredentials",USER_EXISTS:"userExists",CURRENT_PASSWORD_INVALID:"currentPasswordInvalid",PASSWORD_CHANGED:"passwordChanged",NO_FIELDS_TO_UPDATE:"noFieldsToUpdate",USER_NOT_FOUND:"userNotFound",MISSING_BEARER_TOKEN:"unauthorized",INVALID_TOKEN_FORMAT:"unauthorized",INVALID_TOKEN_SIGNATURE:"unauthorized",INVALID_TOKEN_PAYLOAD:"unauthorized",INVALID_TOKEN_CLAIMS:"unauthorized",TOKEN_EXPIRED:"unauthorized",UNAUTHORIZED:"unauthorized",FORBIDDEN:"forbidden",INVITE_CODE_NOT_FOUND:"inviteInvalid",INVALID_INVITE_CODE:"inviteInvalid",OWNER_ALREADY_HAS_ROOM:"ownerAlreadyHasRoom",USER_ALREADY_HAS_ACTIVE_ROOM:"userAlreadyHasActiveRoom",ROOM_PASSWORD_REQUIRED:"roomPasswordRequired",ROOM_PASSWORD_INVALID:"roomPasswordInvalid",ROOM_IS_FULL:"roomIsFull",USER_NOT_IN_ROOM:"userNotInRoom",ROOM_NOT_FOUND:"roomNotFound",INVITE_CODE_GENERATION_FAILED:"inviteCodeGenerationFailed",ONLY_OWNER_CAN_MANAGE_ROOM:"onlyOwnerCanManageRoom",OWNER_CANNOT_BE_REMOVED:"ownerCannotBeRemoved",CANNOT_TRANSFER_OWNERSHIP_TO_SELF:"cannotTransferOwnershipToSelf",ONLY_PLAYERS_CAN_BE_KICKED:"onlyPlayersCanBeKicked",USER_BLOCKED_IN_ROOM:"blockedNotice",INVITE_CODE_ROTATE_COOLDOWN:"inviteRotateCooldown",MATCH_NOT_FOUND:"matchNotFound",MATCH_ALREADY_EXISTS:"matchAlreadyExists",MATCH_ALREADY_FINISHED:"matchAlreadyFinished",NOT_ENOUGH_PLAYERS_TO_START_MATCH:"notEnoughPlayersToStartMatch",ROUND_NOT_ACTIVE:"roundNotActive",ROUND_ALREADY_ACTIVE:"roundAlreadyActive",NOT_PLAYER_TURN:"notPlayerTurn",PLAYER_NOT_IN_MATCH:"playerNotInMatch",PLAYER_ELIMINATED:"playerEliminated",CARD_NOT_IN_HAND:"cardNotInHand",TARGET_PLAYER_REQUIRED:"targetPlayerRequired",TARGET_PLAYER_INVALID:"targetPlayerInvalid",CARD_GUESS_REQUIRED:"cardGuessRequired",CARD_GUESS_INVALID:"cardGuessInvalid",GUARD_CANNOT_GUESS_GUARD:"guardCannotGuessGuard",PEASANT_REACTION_ONLY:"peasantReactionOnly",CARD_PLAY_BLOCKED:"cardPlayBlocked",TARGET_PLAYER_PROTECTED:"targetPlayerProtected",MATCH_STATE_INVALID:"matchStateInvalid",PLAYERS_NOT_READY:"playersNotReady",VALIDATION_ERROR:"validationFailed",UNKNOWN_ERROR:"unknownError"};return s[r]?s[r]:a===401?"unauthorized":a===403?"forbidden":a>=500?"serverUnavailable":null},Aa=(e,a,r)=>{const s=a?.message||a?.errorMessage||a?.error||r||"";if(String(a?.errorCode||a?.code||"").toUpperCase()==="UNKNOWN_ERROR"&&/must|invalid|required|password|username/i.test(String(s)))return{key:"validationFailed",message:String(s)};const n=ka(a?.code||a?.errorCode,e);return n?{key:n,message:o(n)}:{key:null,message:s||o("httpError",{status:e})}},p=async(e,a={})=>{let r;try{r=await fetch(`${t.apiBase.replace(/\/$/,"")}${e}`,{...a,headers:{"Content-Type":"application/json",...a.headers||{},...Ea(),Locale:t.lang}})}catch{throw new Error(o("serverUnavailable"))}const s=await r.text();let n={};try{n=s?JSON.parse(s):{}}catch{n={}}if(!r.ok){r.status===401&&(t.socket&&t.socket.readyState<=1&&t.socket.close(),ge(""),Y(null),S(),L(),y("home"));const c=Aa(r.status,n,s),d=new Error(c.message||o("unknownError"));throw d.code=c.key,d.status=r.status,d}return n},E=e=>{!t.socket||t.socket.readyState!==WebSocket.OPEN||t.socket.send(JSON.stringify({...e,token:t.token||void 0}))},C=(e,a={})=>{E({type:"lobbies_event",event:e,data:a})},aa=e=>{e&&E({type:"subscribe_room",roomId:e})},Na=()=>{const e=t.activeRoom?.participants;return Array.isArray(e)?e:[]},ta=()=>Na().find(e=>e.userId===t.user?.id)||null,La=()=>!!t.user?.id&&t.activeRoom?.ownerId===t.user.id,te=e=>!!(e&&t.activeRoom?.roomId===e),Ne=(e=t.activeMatch,a=t.user?.id)=>a?(Array.isArray(e?.players)?e.players:[]).some(s=>s.userId===a):!1,O=()=>t.activeMatch?.currentRound||null,oa=()=>!!t.user?.id&&O()?.activePlayerId===t.user.id,Se=()=>{const e=O();return!e||!Array.isArray(e.players)?null:e.players.find(a=>a.userId===t.user?.id)||null},Le=({includeSelf:e=!1}={})=>{const a=O();return(Array.isArray(a?.players)?a.players:[]).filter(s=>s.eliminated?!1:s.userId===t.user?.id?e:!s.protectedFromEffects)},ra=()=>Le();let le=null,D=null,Ce="";const Q=e=>e?.status!=="finished"&&Ne(e,t.user?.id),pe=()=>ta()?.role==="spectator",Ma=e=>!!e?.matchId&&(Ne(e,t.user?.id)||pe()),De=(e,a="")=>!!e?.matchId&&e?.status==="finished"&&a!==""&&e.matchId===a&&Ne(e,t.user?.id),_a=e=>{const a=e?.currentRound?.lastAction;!a?.at||(t.gameEventLog||[]).some(s=>s.actionAt===a.at&&s.type===(a.type||"card_played")&&s.actorUserId===a.actorUserId)||Qe({type:a.type||"card_played",actorUserId:a.actorUserId,cardCode:a.cardCode,cardName:a.cardName,targetUserId:a.targetUserId,secondTargetUserId:a.secondTargetUserId,guessedCardCode:a.guessedCardCode,guessedCardName:a.guessedCardName,targetCardCode:a.targetCardCode,targetCardName:a.targetCardName,actionAt:a.at})},Oa=e=>{const a=e?.lastRoundSummary;if(!a?.roundNumber||(t.gameEventLog||[]).some(n=>n.type==="round_summary"&&n.roundNumber===a.roundNumber))return;const s=Array.isArray(a.winnerNames)&&a.winnerNames.length?a.winnerNames.join(", "):(a.winnerUserIds||[]).join(", ");Qe({type:"round_summary",roundNumber:a.roundNumber,text:o("roundWinnerSummary",{round:a.roundNumber,winners:s})}),v(o("roundWinnerSummary",{round:a.roundNumber,winners:s}),"ok")},j=()=>{le&&(window.clearTimeout(le),le=null),D&&(window.clearInterval(D),D=null),Ce=""},Ua=async e=>{if(t.activeMatch?.matchId)try{const a=await p(`/matches/${encodeURIComponent(t.activeMatch.matchId)}/start-round`,{method:"POST"});_(a,{withTab:!0}),E({type:"room_event",roomId:t.activeRoom?.roomId,event:"match_state_updated",data:{matchId:a.matchId}}),e()}catch(a){b("gameStatus",a)}},sa=(e,a)=>{if(!(e?.status==="pending"&&e?.currentRound?.status==="finished")||!t.activeRoom?.ownerId||!t.user?.id){j();return}const s=`${e.matchId}:${e.roundNumber}`;if(Ce===s)return;j(),Ce=s;let n=5;M(o("nextRoundIn",{seconds:n})),a(),D=window.setInterval(()=>{if(n-=1,n<=0){window.clearInterval(D),D=null,M(o("waitingNextRound")),a();return}M(o("nextRoundIn",{seconds:n})),a()},1e3),t.activeRoom.ownerId===t.user.id&&(le=window.setTimeout(async()=>{j(),await Ua(a)},5e3))},_=(e,{withTab:a=!0,forceViewTab:r=!1,keepViewTab:s=!1}={})=>{if(e?.matchId){if(ue(e),_a(e),Oa(e),e.status==="finished"&&e.winnerUserId){const n=(e.players||[]).find(c=>c.userId===e.winnerUserId)?.username||e.winnerUserId;M(o("matchWinner",{winner:n})),j()}a&&(Q(e)||r||s&&Ma(e))&&y("game")}},me=async(e,a,r={})=>{try{const s=pe()&&t.activeRoom?.roomId?await X(t.activeRoom.roomId):await p(`/matches/${encodeURIComponent(e)}`);return s?.matchId?(_(s,r),!(s.status==="finished"&&s.winnerUserId)&&!(s.status==="pending"&&s.currentRound?.status==="finished")&&M(""),sa(s,a),a(),s):null}catch(s){return b("gameStatus",s),null}},X=async e=>(await p(`/rooms/${encodeURIComponent(e)}/match`))?.match||null,na=async e=>{if(t.activeRoom?.roomId)try{const a=await p("/matches",{method:"POST",body:JSON.stringify({roomId:t.activeRoom.roomId})}),r=await p(`/matches/${encodeURIComponent(a.matchId)}/start-round`,{method:"POST"});Xe(),ae(0),_(r),C("room_match_started",{roomId:t.activeRoom.roomId,matchId:r.matchId,actorUserId:t.user?.id}),E({type:"room_event",roomId:t.activeRoom.roomId,event:"match_state_updated",data:{matchId:r.matchId}}),v(o("gameStarted"),"ok"),e()}catch(a){b("roomStatus",a)}},P=async(e,a,r={})=>{if(!(!t.activeMatch?.matchId||!a))try{const s=await p(`/matches/${encodeURIComponent(t.activeMatch.matchId)}/play-card`,{method:"POST",body:JSON.stringify({cardCode:a,targetUserId:r.targetUserId||null,secondTargetUserId:r.secondTargetUserId||null,guessedCardCode:r.guessedCardCode||null,cardInstanceId:r.cardInstanceId||null,shouldSwap:typeof r.shouldSwap=="boolean"?r.shouldSwap:null,shouldReact:typeof r.shouldReact=="boolean"?r.shouldReact:null})});de(null),_(s,{withTab:!0,keepViewTab:t.activeTab==="game"}),sa(s,e),E({type:"room_event",roomId:t.activeRoom?.roomId,event:"match_state_updated",data:{matchId:s.matchId}}),s.status==="pending"&&s.currentRound?.status==="finished"||M(""),e()}catch(s){M(s?.message||o("unknownError")),b("gameStatus",s)}},je=e=>{const a=w("#gameChatInput",512);if(!t.activeRoom?.roomId||a==="")return;J({username:t.user?.username||"user",role:(t.activeRoom.participants||[]).find(s=>s.userId===t.user?.id)?.role||"player",userId:t.user?.id||null,text:a,timestamp:Date.now()}),E({type:"room_event",roomId:t.activeRoom.roomId,event:"chat_message",data:{text:a,username:t.user?.username||"user",role:(t.activeRoom.participants||[]).find(s=>s.userId===t.user?.id)?.role||"player"}});const r=document.querySelector("#gameChatInput");r instanceof HTMLInputElement&&(r.value=""),e(),window.requestAnimationFrame(()=>{B();const s=document.querySelector("#gameChatInput");s instanceof HTMLInputElement&&s.focus()})},qa=async e=>{if(!t.activeRoom?.roomId)return;const a=t.activeRoom.roomId,r=t.activeMatch?.matchId||null;try{await p(`/rooms/${encodeURIComponent(a)}/leave`,{method:"POST"})}catch{}r&&E({type:"room_event",roomId:a,event:"match_state_updated",data:{matchId:r}}),C("room_left",{roomId:a,...r?{matchId:r}:{}}),await N("home",4,t.lobbyFilters.password),await N("catalog",t.lobbyFilters.limit,t.lobbyFilters.password),S(),L(),j(),z(!1),ae(),U(null),A(""),y("home"),v(o("leftGame"),"ok"),e()},Fa=()=>{const a=(Array.isArray(t.activeRoom?.participants)?t.activeRoom.participants:[]).filter(r=>r.userId!==t.user?.id&&(r.role==="owner"||r.role==="player"));return a.length===0?null:a[Math.floor(Math.random()*a.length)]||null},Ha=async e=>{if(!t.activeRoom?.roomId)return;const a=t.activeRoom.roomId,r=t.activeMatch?.matchId||null;try{if(t.activeRoom.ownerId===t.user?.id){const s=Fa();s?.userId&&(await p(`/rooms/${encodeURIComponent(a)}/participants/${encodeURIComponent(s.userId)}/transfer-ownership`,{method:"POST"}),C("room_ownership_transferred",{roomId:a,userId:s.userId,username:s.username||"",actorUserId:t.user?.id}))}await p(`/rooms/${encodeURIComponent(a)}/leave`,{method:"POST"})}catch{}r&&E({type:"room_event",roomId:a,event:"match_state_updated",data:{matchId:r}}),C("room_left",{roomId:a,...r?{matchId:r}:{}}),await N("home",4,t.lobbyFilters.password),await N("catalog",t.lobbyFilters.limit,t.lobbyFilters.password),S(),L(),j(),z(!1),ae(),U(null),A(""),y("home"),v(o("leftGame"),"ok"),e()},B=()=>{const e=document.querySelector("#gameChatLog");e&&window.requestAnimationFrame(()=>{e.scrollTop=e.scrollHeight})},xa=e=>e?.status==="lobby"&&Number(e?.playersCount||0)<Number(e?.maxPlayers||6),Be=async()=>{if(t.token)try{Y(await p("/auth/me"))}catch{Y(null),ge("")}},N=async(e="home",a=4,r="all")=>{try{const s=await p(`/lobbies?visibility=public&password=${encodeURIComponent(r)}&limit=${a}`);e==="home"&&He((s.items||[]).filter(xa)),e==="catalog"&&Re(s.items||[])}catch{e==="home"&&He([]),e==="catalog"&&Re([])}},Ga=async()=>{if(!t.user){L(),S();return}const e=t.activeRoom?.roomId,a=t.activeMatch?.matchId||"";if(e)try{$(await p(`/rooms/${encodeURIComponent(e)}`));try{const r=await p(`/rooms/${encodeURIComponent(e)}/match`);if(r?.match?.matchId){ue(r.match),y(Q(r.match)||De(r.match,a)?"game":"roomManage");return}}catch{}S(),y("roomManage");return}catch{L(),S()}try{const r=await p("/rooms/current");if(r?.roomId){$(r);try{const s=await p(`/rooms/${encodeURIComponent(r.roomId)}/match`);if(s?.match?.matchId){ue(s.match),y(Q(s.match)||De(s.match,a)?"game":"roomManage");return}}catch{}S(),y("roomManage")}else L(),S()}catch{L(),S()}},be=()=>{if(!t.user){xe([]);return}const e=[...t.homeLobbies,...t.lobbyCatalog],a=new Map;e.filter(r=>r.ownerUserId===t.user.id).forEach(r=>a.set(r.roomId,r)),t.activeRoom?.ownerId===t.user.id&&a.set(t.activeRoom.roomId,{roomId:t.activeRoom.roomId,name:t.activeRoom.name,inviteCode:t.activeRoom.inviteCode,ownerUserId:t.activeRoom.ownerId}),xe([...a.values()])},Da=e=>{J(e)},ja=(e,a,r)=>{const s=Array.isArray(t.roomChatMessages)?t.roomChatMessages:[],n=s[s.length-1]||null;if(!n||n.role!=="system"||r.role!=="system"||typeof n.text!="string"||typeof r.text!="string"||Math.abs(Number(r.timestamp||0)-Number(n.timestamp||0))>8e3){J(r);return}const c=a?.username||o("systemUnknownUser"),d=o("systemJoinedRoom",{username:c}),u=o("systemLeftRoom",{username:c});if(n.text===d&&r.text===u||n.text===u&&r.text===d){Pa(s.slice(0,-1));return}J(r)},Pe=()=>{const e=document.querySelector("#roomChatLog");e&&window.requestAnimationFrame(()=>{e.scrollTop=e.scrollHeight})},Ba=e=>{const a=e?.username||o("systemUnknownUser");return e?.event==="room_settings_updated"?o("roomUpdatedSystem"):e?.event==="room_ownership_transferred"?o("ownershipTransferredSystem",{username:a}):e?.event==="room_participant_kicked"?o("participantKickedSystem",{username:a}):e?.event==="room_participant_banned"?o("participantBannedSystem",{username:a}):e?.event==="joined"?o("systemJoinedRoom",{username:a}):e?.event==="left"?o("systemLeftRoom",{username:a}):e?.message||""},x=(e,a={})=>{const r={username:o("roleSystem"),role:"system",text:Ba({event:e,...a}),timestamp:a?.timestamp||Date.now()};if(e==="joined"||e==="left"){ja(e,a,r);return}J(r)},q=()=>{L(),S(),Ke(),he(!1)},Z=(e,{resetChat:a=!0}={})=>{S(),$(e),aa(e.roomId),a&&$a(),A(""),Ke(),y("roomManage")},oe=e=>{ee({open:!1}),ke(),Ae(),y("roomManage"),e()},ia=(e,a=!0)=>{Ae(),a&&e()},ve=(e,a)=>{ea({pendingJoinAction:a,mode:La()?"close":"leave",targetLabel:a.targetLabel||"",open:!0}),e()},$e=(e,a="create")=>{ee({open:!0,mode:a}),G(""),e()},Ja=e=>{ee({open:!1}),e()},ca=(e,{roomId:a,roomName:r,ownerUserId:s,needsPassword:n})=>{Ze({open:!0,roomId:a,roomName:r,ownerUserId:s,needsPassword:n,spectator:!1}),e()},Je=e=>{ke(),e()},da=async()=>{if(!t.activeRoom?.roomId)return;const e=t.activeRoom.roomId,a=t.activeMatch?.matchId||null;await p(`/rooms/${encodeURIComponent(e)}/leave`,{method:"POST"}),a&&E({type:"room_event",roomId:e,event:"match_state_updated",data:{matchId:a}}),q(),C("room_left",{roomId:e,...a?{matchId:a}:{}}),await N("home",4,t.lobbyFilters.password),await N("catalog",t.lobbyFilters.limit,t.lobbyFilters.password)},la=async(e,a,r,s="",n=!1,c="homeStatus")=>{try{if(te(a))return oe(e),!0;if(t.user?.id&&r===t.user.id){const u=await p(`/rooms/${encodeURIComponent(a)}`);Z(u,{resetChat:!1})}else{const u={spectator:!!n};s.trim()!==""&&(u.password=s.trim());const g=await p(`/rooms/${encodeURIComponent(a)}/join`,{method:"POST",body:JSON.stringify(u)});Z(g)}const d=await X(t.activeRoom.roomId).catch(()=>null);return d?.matchId?(_(d,{withTab:!0}),Q(d)||y("roomManage")):(S(),y("roomManage")),C("room_joined",{roomId:t.activeRoom.roomId}),T(c,`${o("roomJoinSuccess")} ${t.activeRoom.roomId}`,!0),v(o("roomJoinSuccess"),"ok"),e(),!0}catch(d){return b(c,d),!1}},ma=async(e,a,r,s=!1,n="homeStatus")=>{try{const c={inviteCode:a,spectator:s};r!==""&&(c.password=r);const d=await p("/rooms/join-by-code",{method:"POST",body:JSON.stringify(c)});Z(d);const u=await X(t.activeRoom.roomId).catch(()=>null);return u?.matchId?(_(u,{withTab:!0}),Q(u)||y("roomManage")):(S(),y("roomManage")),C("room_joined",{roomId:t.activeRoom.roomId}),ee({open:!1}),G(`${o("roomJoinSuccess")} ${t.activeRoom.roomId}`),e(),!0}catch(c){return G(c.message),b(n,c),!1}},Va=async e=>{const a=t.pendingJoinAction;if(a){if(ia(e,!1),a.kind==="lobby"){await la(e,a.roomId,a.ownerUserId,a.password||"",!!a.spectator,"joinLobbyStatus")&&ke();return}if(a.kind==="invite"){await ma(e,a.inviteCode,a.password||"",!!a.spectator,"homeStatus");return}a.kind==="open_create_modal"&&$e(e,"create")}},Wa=e=>{document.querySelector('[data-act="createRoom"]')?.addEventListener("click",async()=>{if(!t.user)return F(e,"login");fe("#roomName");try{const a=w("#roomName",64);if(a===""){we("#roomName",o("requiredField"));return}const r=w("#roomPassword",128),s={name:a,isPublic:!!document.querySelector("#roomIsPublic")?.checked,maxPlayers:Number(w("#roomMaxPlayers",1)||"6")};if(r!==""&&(s.password=r),t.activeRoom?.roomId){ve(e,{kind:"open_create_modal",targetLabel:o("createRoom")});return}const n=await p("/rooms",{method:"POST",body:JSON.stringify(s)});Z(n),C("room_created",{roomId:t.activeRoom.roomId}),ee({open:!1}),G(`${o("roomCreated")} ${t.activeRoom.inviteCode}`),e()}catch(a){G(a.message),b("homeStatus",a)}}),document.querySelector('[data-act="joinByCode"]')?.addEventListener("click",async()=>{if(!t.user)return F(e,"login");fe("#inviteCode");try{const a=w("#inviteCode",6).toUpperCase();if(a.length!==6){we("#inviteCode",o("inviteCodeInvalid"));return}const r=w("#joinPassword",128),s=!!document.querySelector("#joinAsSpectator")?.checked;if(t.activeRoom?.inviteCode===a){oe(e);return}if(t.activeRoom?.roomId){ve(e,{kind:"invite",inviteCode:a,password:r,spectator:s,targetLabel:a});return}await ma(e,a,r,s,"homeStatus")}catch(a){G(a.message),b("homeStatus",a)}})},ua=e=>{(async()=>{if(t.activeRoom?.roomId&&!(t.activeRoom.ownerId&&t.activeRoom.inviteCode&&t.activeMatch?.matchId))try{(!t.activeRoom.ownerId||!t.activeRoom.inviteCode)&&($(await p(`/rooms/${encodeURIComponent(t.activeRoom.roomId)}`)),Ee(!0));const s=await X(t.activeRoom.roomId).catch(()=>null);if(s?.matchId){_(s,{withTab:!0,keepViewTab:t.activeTab==="game"}),e();return}S()}catch(s){b("homeStatus",s)}})();const r=()=>t.activeRoom?.roomId?!0:(T("roomStatus",o("roomNotFound")),!1);document.querySelector('[data-act="readyRoom"]')?.addEventListener("click",async()=>{if(r())try{const n=!(ta()?.ready??!1);$(await p(`/rooms/${encodeURIComponent(t.activeRoom.roomId)}/ready`,{method:"POST",body:JSON.stringify({ready:n})})),C("room_ready_changed",{roomId:t.activeRoom.roomId}),e()}catch(s){b("roomStatus",s)}}),document.querySelector('[data-act="leaveRoom"]')?.addEventListener("click",async()=>{if(r())try{await da(),y("home"),A(""),T("homeStatus",o("ready"),!0),e()}catch(s){b("roomStatus",s)}}),document.querySelectorAll('[data-act="joinLobby"]').forEach(s=>{s.addEventListener("click",async()=>{if(!t.user)return F(e,"login");const n=s.dataset.roomId;if(n){if(te(n)){oe(e);return}ca(e,{roomId:n,roomName:s.dataset.roomName||n,ownerUserId:s.dataset.roomOwnerId||"",needsPassword:s.dataset.roomHasPassword==="1"})}})}),document.querySelector('[data-act="openRoomSettings"]')?.addEventListener("click",()=>{he(!0),e()}),document.querySelector('[data-act="startGame"]')?.addEventListener("click",async()=>{if(t.activeMatch?.matchId&&t.activeMatch.status!=="finished"){await me(t.activeMatch.matchId,e,{withTab:!0,forceViewTab:!0});return}const n=(Array.isArray(t.activeRoom?.participants)?t.activeRoom.participants:[]).filter(d=>d.role!=="spectator");if(!(n.length>=2&&n.every(d=>d.ready===!0))){v(o("allPlayersMustReadyHint"));return}await na(e)}),document.querySelector('[data-act="openGame"]')?.addEventListener("click",async()=>{const s=await X(t.activeRoom?.roomId||"").catch(()=>null);s?.matchId&&(_(s,{withTab:!0,forceViewTab:!0,keepViewTab:!0}),e())})},Ya=e=>{document.querySelector('[data-act="saveRoomSettings"]')?.addEventListener("click",async()=>{if(t.activeRoom?.roomId)try{const a=!!document.querySelector("#manageIsPublic")?.checked,r=Number(w("#manageMaxPlayers",1)||"6"),s=w("#managePassword",128);$(await p(`/rooms/${encodeURIComponent(t.activeRoom.roomId)}/settings`,{method:"PATCH",body:JSON.stringify({isPublic:a,maxPlayers:r,password:s})})),C("room_settings_updated",{roomId:t.activeRoom.roomId,actorUserId:t.user?.id}),x("room_settings_updated"),T("roomManageStatus",o("roomSettingsSaved"),!0),v(o("roomSettingsSaved"),"ok"),he(!1),e()}catch(a){b("roomManageStatus",a)}}),document.querySelector('[data-act="regenInvite"]')?.addEventListener("click",async()=>{if(t.activeRoom?.roomId)try{$(await p(`/rooms/${encodeURIComponent(t.activeRoom.roomId)}/invite-code/regenerate`,{method:"POST"})),C("room_invite_regenerated",{roomId:t.activeRoom.roomId}),T("roomManageStatus",""),v(o("inviteRegenerated"),"ok"),e()}catch(a){T("roomManageStatus",""),v(a?.message||o("unknownError"))}}),document.querySelectorAll('[data-act="kickParticipant"]').forEach(a=>{a.addEventListener("click",async()=>{if(!t.activeRoom?.roomId)return;const r=a.dataset.userId;if(!r)return;const s=(t.activeRoom.participants||[]).find(n=>n.userId===r);try{$(await p(`/rooms/${encodeURIComponent(t.activeRoom.roomId)}/participants/${encodeURIComponent(r)}/kick`,{method:"POST"})),C("room_participant_kicked",{roomId:t.activeRoom.roomId,userId:r,username:s?.username||"",actorUserId:t.user?.id}),x("room_participant_kicked",{username:s?.username||o("systemUnknownUser")}),e()}catch(n){b("roomManageStatus",n)}})}),document.querySelectorAll('[data-act="banParticipant"]').forEach(a=>{a.addEventListener("click",async()=>{if(!t.activeRoom?.roomId)return;const r=a.dataset.userId;if(!r)return;const s=(t.activeRoom.participants||[]).find(n=>n.userId===r);try{$(await p(`/rooms/${encodeURIComponent(t.activeRoom.roomId)}/participants/${encodeURIComponent(r)}/ban`,{method:"POST"})),C("room_participant_banned",{roomId:t.activeRoom.roomId,userId:r,username:s?.username||"",actorUserId:t.user?.id}),x("room_participant_banned",{username:s?.username||o("systemUnknownUser")}),e()}catch(n){b("roomManageStatus",n)}})}),document.querySelectorAll('[data-act="transferOwnership"]').forEach(a=>{a.addEventListener("click",async()=>{if(!t.activeRoom?.roomId)return;const r=a.dataset.userId;if(!r)return;const s=(t.activeRoom.participants||[]).find(n=>n.userId===r);try{$(await p(`/rooms/${encodeURIComponent(t.activeRoom.roomId)}/participants/${encodeURIComponent(r)}/transfer-ownership`,{method:"POST"})),C("room_ownership_transferred",{roomId:t.activeRoom.roomId,userId:r,username:s?.username||"",actorUserId:t.user?.id}),x("room_ownership_transferred",{username:s?.username||o("systemUnknownUser")}),T("roomManageStatus",o("ownershipTransferred"),!0),v(o("ownershipTransferred"),"ok"),e()}catch(n){b("roomManageStatus",n)}})}),document.querySelector('[data-act="sendRoomChat"]')?.addEventListener("click",()=>{const a=w("#roomChatInput",512);if(!t.activeRoom?.roomId||a==="")return;ze(!0),J({username:t.user?.username||"user",role:(t.activeRoom.participants||[]).find(s=>s.userId===t.user?.id)?.role||"player",userId:t.user?.id||null,text:a,timestamp:Date.now()}),E({type:"room_event",roomId:t.activeRoom.roomId,event:"chat_message",data:{text:a,username:t.user?.username||"user",role:(t.activeRoom.participants||[]).find(s=>s.userId===t.user?.id)?.role||"player"}});const r=document.querySelector("#roomChatInput");r&&(r.value="",r.focus()),e(),Pe()}),document.querySelector("#roomChatInput")?.addEventListener("keydown",a=>{a.key!=="Enter"||a.shiftKey||(a.preventDefault(),document.querySelector('[data-act="sendRoomChat"]')?.click())})},Ka=e=>{ua(e),Ya(e)},za=e=>{document.querySelectorAll("[data-tab]").forEach(a=>{a.addEventListener("click",()=>{y(a.dataset.tab),e()})}),document.querySelectorAll("[data-lang]").forEach(a=>{a.addEventListener("click",()=>{Sa(a.dataset.lang),e()})}),document.querySelector('[data-act="toggleAuth"]')?.addEventListener("click",()=>F(e,"login")),document.querySelectorAll('[data-act="heroCreate"]').forEach(a=>{a.addEventListener("click",()=>{if(!t.user)return F(e,"login");if(t.activeRoom?.roomId){ve(e,{kind:"open_create_modal",targetLabel:o("createRoom")});return}$e(e,"create")})}),document.querySelectorAll('[data-act="heroJoin"]').forEach(a=>{a.addEventListener("click",()=>{if(!t.user)return F(e,"login");$e(e,"join")})}),document.querySelectorAll('[data-act="closeAuth"]').forEach(a=>{a.addEventListener("click",()=>{K({open:!1}),e()})}),document.querySelector('[data-act="closeRoomNotice"]')?.addEventListener("click",()=>{A(""),e()}),document.querySelector('[data-act="logout"]')?.addEventListener("click",()=>{Ta(),t.socket?.readyState===WebSocket.OPEN&&t.socket.close(),Ie(null),e()}),document.querySelectorAll('[data-act="closeRoomModal"]').forEach(a=>{a.addEventListener("click",()=>Ja(e))}),document.querySelectorAll('[data-act="closeRoomSettings"]').forEach(a=>{a.addEventListener("click",()=>{he(!1),e()})}),document.querySelectorAll('[data-act="closeJoinLobbyModal"]').forEach(a=>{a.addEventListener("click",()=>Je(e))}),document.querySelectorAll('[data-act="closeRoomSwitchModal"], [data-act="cancelRoomSwitch"]').forEach(a=>{a.addEventListener("click",()=>ia(e))}),document.querySelector('[data-act="confirmJoinLobby"]')?.addEventListener("click",async()=>{if(!t.joinLobbyRoomId)return;fe("#lobbyJoinPassword");const a=w("#lobbyJoinPassword",128),r=!!document.querySelector("#lobbyJoinAsSpectator")?.checked;if(t.joinLobbyNeedsPassword&&a===""){we("#lobbyJoinPassword",o("requiredField")),T("joinLobbyStatus",o("requiredField"));return}if(t.activeRoom?.roomId&&!te(t.joinLobbyRoomId)){ve(e,{kind:"lobby",roomId:t.joinLobbyRoomId,ownerUserId:t.joinLobbyOwnerUserId,password:a,spectator:r,targetLabel:t.joinLobbyRoomName||t.joinLobbyRoomId});return}await la(e,t.joinLobbyRoomId,t.joinLobbyOwnerUserId,a,r,"joinLobbyStatus")&&Je(e)}),document.querySelector('[data-act="confirmRoomSwitch"]')?.addEventListener("click",async()=>{try{await da(),await Va(e)}catch(a){b("roomSwitchStatus",a)}}),t.roomModalOpen&&t.user&&Wa(e)},Qa=async(e,a)=>{document.querySelector('[data-act="switchAuthMode"]')?.addEventListener("click",()=>{K({mode:t.authMode==="login"?"register":"login"}),e()}),document.querySelector('[data-act="authSubmit"]')?.addEventListener("click",async()=>{const r=t.authMode==="login"?"/auth/login":"/auth/register",s=t.authMode==="login"?o("loginSuccess"):o("registerSuccess");try{const n=await p(r,{method:"POST",body:JSON.stringify({username:w("#authUsername",64),password:w("#authPassword",128)})});ge(n.accessToken),await a();try{const c=await p("/rooms/current");c?.roomId?($(c),y("roomManage"),Ee(!0)):q()}catch{q()}T("authStatus",s,!0),K({open:!1}),e()}catch(n){b("authStatus",n)}})},Xa=e=>{const a=async()=>{try{Re((await p(`/lobbies?visibility=public&password=${encodeURIComponent(t.lobbyFilters.password)}&limit=${t.lobbyFilters.limit}`)).items||[]),T("lobbyStatus",o("ready"),!0),e()}catch(r){b("lobbyStatus",r)}};document.querySelector('[data-act="loadLobbies"]')?.addEventListener("click",async()=>{Ca({password:w("#lobbyPasswordFilter",20)||"all",limit:Number(w("#lobbyLimit",3)||"20")}),await a()}),document.querySelectorAll('[data-act="joinLobby"]').forEach(r=>{r.addEventListener("click",async()=>{if(!t.user)return F(e,"login");const s=r.dataset.roomId;if(s){if(te(s)){oe(e);return}ca(e,{roomId:s,roomName:r.dataset.roomName||s,ownerUserId:r.dataset.roomOwnerId||"",needsPassword:r.dataset.roomHasPassword==="1"})}})})},Za=e=>{document.querySelectorAll('[data-act="openOwnedRoom"]').forEach(a=>{a.addEventListener("click",async()=>{try{const r=a.dataset.roomId;if(!r)return;if(te(r)){oe(e);return}const s=await p(`/rooms/${encodeURIComponent(r)}`);Z(s,{resetChat:!1}),e()}catch(r){b("profileStatus",r)}})}),document.querySelector('[data-act="saveProfile"]')?.addEventListener("click",async()=>{try{const a=w("#profileUsername",64);Y(await p("/auth/me",{method:"PATCH",body:JSON.stringify({username:a})})),T("profileStatus",o("profileUpdated"),!0),e()}catch(a){b("profileStatus",a)}}),document.querySelector('[data-act="changePassword"]')?.addEventListener("click",async()=>{try{await p("/auth/change-password",{method:"POST",body:JSON.stringify({currentPassword:w("#currentPassword",128),newPassword:w("#nextPassword",128)})});const a=document.querySelector("#currentPassword"),r=document.querySelector("#nextPassword");a&&(a.value=""),r&&(r.value=""),T("profileStatus",o("passwordChanged"),!0)}catch(a){b("profileStatus",a)}})},Me=[{code:"peasant",name:"Крестьянин",value:0,copies:2},{code:"guard",name:"Стражник",value:1,copies:5},{code:"scout",name:"Разведчик",value:2,copies:2},{code:"executioner",name:"Палач",value:3,copies:2},{code:"lady",name:"Дворянка",value:4,copies:2},{code:"rebel",name:"Мятежник",value:5,copies:2},{code:"feudal_lord",name:"Феодал",value:6,copies:2},{code:"bishop",name:"Епископ",value:7,copies:1},{code:"queen",name:"Королева",value:8,copies:1},{code:"king",name:"Король",value:9,copies:1}],et=e=>Me.find(a=>a.code===e)||null,at=e=>{document.querySelector('[data-act="toggleGameChat"]')?.addEventListener("click",()=>{const a=!t.gameChatOpen;z(a),a&&ae(),e(),a&&(B(),window.requestAnimationFrame(()=>{document.querySelector("#gameChatInput")?.focus()}))}),document.querySelector('[data-act="closeGameChatBackdrop"]')?.addEventListener("click",()=>{z(!1),e()}),document.querySelector('[data-act="closeGameCardPreview"]')?.addEventListener("click",()=>{ce(null),e()}),document.querySelector('[data-act="closeGameCardPlayPrompt"]')?.addEventListener("click",()=>{de(null),e()}),document.querySelector('[data-act="closeGameConfirmPrompt"]')?.addEventListener("click",()=>{U(null),e()}),document.querySelector(".game-card-preview-shell")?.addEventListener("click",a=>{a.target===a.currentTarget&&(ce(null),e())}),document.querySelector(".game-card-play-prompt-shell")?.addEventListener("click",a=>{a.target===a.currentTarget&&(de(null),e())}),document.querySelector(".game-confirm-prompt-shell")?.addEventListener("click",a=>{a.target===a.currentTarget&&(U(null),e())}),document.querySelector('[data-act="exitGame"]')?.addEventListener("click",async()=>{U({type:"leave_game",title:o("gameExitConfirmTitle"),message:o("gameExitConfirm"),confirmLabel:o("leaveRoom"),cancelLabel:o("cancel")}),e()}),document.querySelector('[data-act="leaveFinishedMatch"]')?.addEventListener("click",async()=>{await Ha(e)}),document.querySelector('[data-act="playAgainMatch"]')?.addEventListener("click",async()=>{if(t.activeRoom?.ownerId!==t.user?.id){v(o("gamePlayAgainOwnerOnly"));return}await na(e)}),document.querySelector('[data-act="returnToRoomAfterMatch"]')?.addEventListener("click",()=>{y("roomManage"),e()}),document.querySelectorAll('[data-act="playCard"]').forEach(a=>{a.addEventListener("click",async()=>{if(!oa()){v(o("notPlayerTurn"));return}if(a.dataset.cardLocked==="true"){v(o("cardPlayBlocked"));return}const r=a.dataset.cardCode||"",s=a.dataset.cardInstanceId||"";if(r==="king"){U({type:"play_king",title:o("kingPromptTitle"),message:o("kingSelfEliminateConfirm"),confirmLabel:o("kingPromptConfirm"),cancelLabel:o("cancel"),payload:{cardCode:r,cardInstanceId:s}}),e();return}if(r!=="guard"&&r!=="scout"&&r!=="executioner"&&r!=="rebel"&&r!=="feudal_lord"){await P(e,r,{cardInstanceId:s});return}const n=r==="rebel"||r==="feudal_lord"?Le({includeSelf:!0}):ra();if(n.length===0||r==="feudal_lord"&&n.length<2){if(r==="guard"||r==="scout"||r==="executioner"||r==="feudal_lord"){await P(e,r,{cardInstanceId:s});return}v(o("rebelTargetUnavailable"));return}de({cardCode:r,cardInstanceId:s,targetUserId:n[0]?.userId||"",secondTargetUserId:r==="feudal_lord"&&n[1]?.userId||"",guessedCardCode:""}),e()})}),document.querySelectorAll('[data-act="selectGuardTarget"]').forEach(a=>{a.addEventListener("click",()=>{H({targetUserId:a.dataset.userId||""}),e()})}),document.querySelectorAll('[data-act="selectGuardGuess"]').forEach(a=>{a.addEventListener("click",()=>{H({guessedCardCode:a.dataset.cardCode||""}),e()})}),document.querySelector('[data-act="confirmGuardPlay"]')?.addEventListener("click",async()=>{const a=t.gameCardPlayPrompt;if(!a?.targetUserId){v(o("targetPlayerRequired"));return}if(!a?.guessedCardCode||!Me.some(r=>r.code===a.guessedCardCode&&r.code!=="guard")){v(o("guardGuessRequired"));return}await P(e,a.cardCode||"guard",{targetUserId:a.targetUserId,guessedCardCode:a.guessedCardCode,cardInstanceId:a.cardInstanceId})}),document.querySelector('[data-act="confirmScoutPlay"]')?.addEventListener("click",async()=>{const a=t.gameCardPlayPrompt;if(!a?.targetUserId){v(o("targetPlayerRequired"));return}await P(e,a.cardCode||"scout",{targetUserId:a.targetUserId,cardInstanceId:a.cardInstanceId})}),document.querySelector('[data-act="confirmExecutionerPlay"]')?.addEventListener("click",async()=>{const a=t.gameCardPlayPrompt;if(!a?.targetUserId){v(o("targetPlayerRequired"));return}await P(e,a.cardCode||"executioner",{targetUserId:a.targetUserId,cardInstanceId:a.cardInstanceId})}),document.querySelector('[data-act="confirmRebelPlay"]')?.addEventListener("click",async()=>{const a=t.gameCardPlayPrompt;if(!a?.targetUserId){v(o("targetPlayerRequired"));return}await P(e,a.cardCode||"rebel",{targetUserId:a.targetUserId,cardInstanceId:a.cardInstanceId})}),document.querySelectorAll('[data-act="selectFeudalTarget"]').forEach(a=>{a.addEventListener("click",()=>{const r=a.dataset.userId||"",s=t.gameCardPlayPrompt;if(!(!s||r==="")){if(s.targetUserId===r){H({targetUserId:s.secondTargetUserId||"",secondTargetUserId:""}),e();return}if(s.secondTargetUserId===r){H({secondTargetUserId:""}),e();return}if(!s.targetUserId){H({targetUserId:r}),e();return}H({secondTargetUserId:r}),e()}})}),document.querySelector('[data-act="confirmFeudalPlay"]')?.addEventListener("click",async()=>{const a=t.gameCardPlayPrompt;if(!a?.targetUserId||!a?.secondTargetUserId||a.targetUserId===a.secondTargetUserId){v(o("feudalPromptNeedTwoTargets"));return}await P(e,a.cardCode||"feudal_lord",{targetUserId:a.targetUserId,secondTargetUserId:a.secondTargetUserId,cardInstanceId:a.cardInstanceId})}),document.querySelector('[data-act="confirmFeudalSwap"]')?.addEventListener("click",async()=>{await P(e,"feudal_lord",{shouldSwap:!0})}),document.querySelector('[data-act="confirmFeudalKeep"]')?.addEventListener("click",async()=>{await P(e,"feudal_lord",{shouldSwap:!1})}),document.querySelector('[data-act="confirmPeasantReact"]')?.addEventListener("click",async()=>{await P(e,"peasant",{shouldReact:!0})}),document.querySelector('[data-act="skipPeasantReact"]')?.addEventListener("click",async()=>{await P(e,"peasant",{shouldReact:!1})}),document.querySelector('[data-act="resolveGuardMiss"]')?.addEventListener("click",async()=>{await P(e,"peasant",{shouldReact:!1})}),document.querySelector('[data-act="confirmGamePrompt"]')?.addEventListener("click",async()=>{const a=t.gameConfirmPrompt;if(a){if(U(null),e(),a.type==="leave_game"){await qa(e);return}a.type==="play_king"&&await P(e,a.payload?.cardCode||"king",{cardInstanceId:a.payload?.cardInstanceId||null})}}),document.querySelectorAll('[data-act="previewDiscardCard"]').forEach(a=>{a.addEventListener("click",()=>{ce({ownerName:a.dataset.ownerName||"",cardName:a.dataset.cardName||"",cardCode:a.dataset.cardCode||"",cardValue:Number(a.dataset.cardValue||0)}),e()})}),document.querySelector('[data-act="sendGameChat"]')?.addEventListener("click",()=>{je(e),B()}),document.querySelector("#gameChatInput")?.addEventListener("keydown",a=>{a.key!=="Enter"||a.shiftKey||(a.preventDefault(),je(e),B())})},pa=(e,a)=>{t.socket?.readyState===WebSocket.OPEN||t.socket?.readyState===WebSocket.CONNECTING||(Ie(new WebSocket(t.wsUrl)),t.socket.onopen=()=>{E({type:"subscribe_lobbies"}),t.activeRoom?.roomId&&aa(t.activeRoom.roomId)},t.socket.onmessage=async r=>{let s;try{s=JSON.parse(r.data)}catch{return}if(s?.type==="lobbies_event"){await e();const n=s?.data?.roomId,c=s?.data?.matchId,d=s?.data?.userId,u=s?.data?.username||s?.username||o("systemUnknownUser");if(n&&t.activeRoom?.roomId===n&&d&&t.user?.id===d&&(s?.event==="room_participant_kicked"||s?.event==="room_participant_banned")){q(),y("home");const g=s?.event==="room_participant_banned"?o("blockedNotice"):o("kickedFromRoomNotice");A(g),v(g),a();return}if(n&&t.activeRoom?.roomId===n){if(s?.event==="room_left"&&t.activeMatch?.matchId&&await me(t.activeMatch.matchId,a,{withTab:t.activeTab==="game",forceViewTab:t.activeTab==="game"&&pe(),keepViewTab:t.activeTab==="game"}),s?.event==="room_match_started"&&c){const g=await me(c,a,{withTab:!0});g?.matchId&&t.activeTab==="game"&&g.status==="finished"&&y("roomManage");return}(s?.event==="room_settings_updated"||s?.event==="room_ownership_transferred"||s?.event==="room_participant_kicked"||s?.event==="room_participant_banned")&&(s?.data?.actorUserId&&s.data.actorUserId===t.user?.id||x(s.event,{username:u,timestamp:s?.timestamp}));try{$(await p(`/rooms/${encodeURIComponent(n)}`))}catch{q(),y("home"),A(o("roomClosedNotice")),v(o("roomClosedNotice"))}}(t.activeTab==="home"||t.activeTab==="lobbies"||t.activeTab==="profile"||t.activeTab==="roomManage"||t.activeTab==="game")&&a();return}if(s?.type==="room_event"&&s?.roomId&&t.activeRoom?.roomId===s.roomId){if(s?.event==="match_state_updated"){const n=s?.data?.matchId||t.activeMatch?.matchId;if(n){const c=await me(n,a,{withTab:t.activeTab==="game",forceViewTab:t.activeTab==="game"&&pe(),keepViewTab:t.activeTab==="game"});c?.matchId&&ue(c)}return}if(s?.event==="access_denied"){q(),y("home");const n=s?.data?.reason==="banned"?o("blockedNotice"):o("kickedFromRoomNotice");A(n),v(n),a();return}if(s?.event==="chat_message"&&s?.data?.text){const n=!!(s?.userId&&t.user?.id&&s.userId===t.user.id),c=Array.isArray(t.roomChatMessages)?t.roomChatMessages:[],d=c[c.length-1]||null;n&&d&&d.userId===s?.userId&&d.text===(s?.data?.text||"")&&Math.abs(Number(s?.timestamp||0)*1e3-Number(d.timestamp||0))<15e3||Da({username:s?.data?.username||s?.username||"user",role:s?.data?.role||"player",userId:s?.userId||null,text:s?.data?.text||"",timestamp:s?.timestamp}),(t.activeTab==="roomManage"||t.activeTab==="game")&&(a(),t.activeTab==="roomManage"&&Pe(),t.activeTab==="game"&&(t.gameChatOpen?B():n||(Ge(),v(o("newChatMessageNotice"),"ok"))));return}try{$(await p(`/rooms/${encodeURIComponent(s.roomId)}`)),a()}catch{q(),y("home"),A(o("roomClosedNotice")),v(o("roomClosedNotice")),a()}return}if(s?.type==="presence"&&s?.roomId&&t.activeRoom?.roomId===s.roomId){if(s?.event==="joined"&&t.suppressOwnJoinPresence&&s?.username===t.user?.username){Ee(!1);return}x(s?.event||"",{username:s?.username||o("systemUnknownUser"),timestamp:s?.timestamp}),(t.activeTab==="roomManage"||t.activeTab==="game")&&(a(),t.activeTab==="roomManage"&&Pe(),t.activeTab==="game"&&(t.gameChatOpen?B():Ge()))}},t.socket.onclose=()=>{Ie(null),window.setTimeout(()=>pa(e,a),3e3)})},tt=()=>{if(!t.authOpen||t.user)return"";const e=t.authMode==="login";return`
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
  `},ot=()=>{if(!t.roomModalOpen||!t.user)return"";const e=t.roomModalMode==="create";return`
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

      <div id="homeStatus" class="status">${i(t.homeStatusMessage||"")}</div>
    </section>
  `},rt=()=>!t.roomSettingsOpen||!t.activeRoom||t.activeRoom.ownerId!==t.user?.id?"":`
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
            <label class="toggle-row"><input id="manageIsPublic" type="checkbox" ${t.activeRoom.isPublic?"checked":""} /> ${o("roomVisibilityPublicToggle")}</label>
            <p class="field-help">${o("roomCreateAccessHint")}</p>
            <label class="field-stack">
              <span>${o("roomSize")}</span>
              <select id="manageMaxPlayers">
                ${[2,3,4,5,6].map(e=>`<option value="${e}" ${Number(t.activeRoom.maxPlayers||6)===e?"selected":""}>${e}</option>`).join("")}
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
  `,st=()=>t.joinLobbyModalOpen?`
    <div class="modal-overlay" data-act="closeJoinLobbyModal"></div>
    <section class="modal room-modal">
      <div class="modal-head">
        <div>
          <h2>${o("joinLobby")}</h2>
          <p>${t.joinLobbyNeedsPassword?o("joinPasswordHint"):o("joinPublicLobbyHint")}</p>
        </div>
        <button class="chip" data-act="closeJoinLobbyModal">${o("close")}</button>
      </div>
      <article class="auth-card">
        <div class="stack">
          ${t.joinLobbyNeedsPassword?`<input id="lobbyJoinPassword" placeholder="${o("roomPasswordOptional")}" type="password" />`:""}
          <label><input id="lobbyJoinAsSpectator" type="checkbox" ${t.joinLobbySpectator?"checked":""} /> ${o("spectator")}</label>
          <button class="primary" data-act="confirmJoinLobby">${o("connect")}</button>
        </div>
      </article>
      <div id="joinLobbyStatus" class="status"></div>
    </section>
  `:"",nt=()=>{if(!t.roomSwitchPromptOpen)return"";const e=t.roomSwitchPromptMode==="close"?o("closeAndJoinRoom"):o("leaveAndJoinRoom"),a=t.roomSwitchPromptMode==="close"?o("roomSwitchCloseHint",{target:t.roomSwitchTargetLabel||"room"}):o("roomSwitchLeaveHint",{target:t.roomSwitchTargetLabel||"room"});return`
    <div class="modal-overlay" data-act="closeRoomSwitchModal"></div>
    <section class="modal room-modal">
      <div class="modal-head">
        <div>
          <h2>${o("roomSwitchTitle")}</h2>
          <p>${a}</p>
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
  `},it=()=>t.roomNoticeMessage?`<div class="room-notice">
    <span>${i(t.roomNoticeMessage)}</span>
    <button class="chip" data-act="closeRoomNotice">${o("close")}</button>
  </div>`:"",m=e=>`<span class="event-actor">${i(e)}</span>`,h=e=>`<span class="event-card">${i(e)}</span>`,l=e=>(Array.isArray(t.activeMatch?.players)?t.activeMatch.players:[]).find(r=>r.userId===e)?.username||e||o("systemUnknownUser"),_e=(e,a,r)=>`
  <button
    class="discard-stack-card"
    data-act="previewDiscardCard"
    data-card-code="${i(e.code||"")}"
    data-card-name="${i(e.name||e.code||"")}"
    data-card-value="${i(String(e.value??0))}"
    data-owner-name="${i(a||"")}"
    style="--stack-index:${i(String(r))}"
    title="${i(e.name||e.code||"")}"
  >
    <span class="discard-stack-card-value">${i(String(e.value??0))}</span>
    <span class="discard-stack-card-name">${i(e.name||e.code||"")}</span>
  </button>
`,Te=(e,a,r="showdown-card")=>`
  <button
    class="${r}"
    data-act="previewDiscardCard"
    data-card-code="${i(e.code||"")}"
    data-card-name="${i(e.name||e.code||"")}"
    data-card-value="${i(String(e.value??0))}"
    data-owner-name="${i(a||"")}"
    title="${i(e.name||e.code||"")}"
  >
    <span class="${r}-value">${i(String(e.value??0))}</span>
    <span class="${r}-name">${i(e.name||e.code||"")}</span>
  </button>
`,ct=()=>{const e=O(),a=new Map,r=d=>{const u=d?.code||"";u&&a.set(u,Number(a.get(u)||0)+1)};return(Array.isArray(e?.revealedCards)?e.revealedCards:[]).forEach(r),(Array.isArray(e?.players)?e.players:[]).forEach(d=>{(Array.isArray(d?.discard)?d.discard:[]).forEach(r)}),(Array.isArray(Se()?.hand)?Se().hand:[]).forEach(r),a},dt=()=>{const e=ct();return Me.filter(a=>a.code==="guard"?!1:Number(e.get(a.code)||0)<Number(a.copies||0))},va=e=>e<=2?7:e===3?6:e===4?5:4,lt=e=>{if(e.type==="system"||e.type==="round_summary")return i(e.text||"");if(e.type==="card_played"){const a=l(e.actorUserId);return`${m(a)}: ${o("playedCardEvent",{card:h(e.cardName||e.cardCode||"card")})}`}if(e.type==="guard_guess_hit"){const a=l(e.actorUserId),r=l(e.targetUserId);return o("guardHitEvent",{actor:m(a),target:m(r),card:h(e.guessedCardName||e.guessedCardCode||"card")})}if(e.type==="guard_guess_miss"){const a=l(e.actorUserId),r=l(e.targetUserId);return o("guardMissEvent",{actor:m(a),target:m(r),card:h(e.guessedCardName||e.guessedCardCode||"card")})}if(e.type==="guard_no_target"){const a=l(e.actorUserId);return o("guardNoTargetEvent",{actor:m(a),card:h("Стражник")})}if(e.type==="guard_miss_resolved")return o("guardMissResolvedEvent",{card:h("Стражник")});if(e.type==="peasant_reaction_safe"){const a=l(e.actorUserId);return o("peasantReactionSafeEvent",{actor:m(a),card:h("Крестьянин")})}if(e.type==="peasant_reaction_eliminated"){const a=l(e.actorUserId);return o("peasantReactionEliminatedEvent",{actor:m(a),card:h("Крестьянин")})}if(e.type==="peasant_reaction_skipped"){const a=l(e.actorUserId);return o("peasantReactionSkippedEvent",{actor:m(a),card:h("Крестьянин")})}if(e.type==="scout_lock_applied"){const a=l(e.actorUserId),r=l(e.targetUserId);return o("scoutLockEvent",{actor:m(a),target:m(r)})}if(e.type==="scout_no_target"){const a=l(e.actorUserId);return o("scoutNoTargetEvent",{actor:m(a),card:h("Разведчик")})}if(e.type==="executioner_eliminate"){const a=l(e.actorUserId),r=l(e.targetUserId);return o("executionerEliminateEvent",{actor:m(a),target:m(r)})}if(e.type==="executioner_survive"){const a=l(e.actorUserId),r=l(e.targetUserId);return o("executionerSurviveEvent",{actor:m(a),target:m(r)})}if(e.type==="executioner_no_target"){const a=l(e.actorUserId);return o("executionerNoTargetEvent",{actor:m(a),card:h("Палач")})}if(e.type==="lady_protection_applied"){const a=l(e.actorUserId);return o("ladyProtectionEvent",{actor:m(a),card:h("Дворянка")})}if(e.type==="bishop_token_applied"){const a=l(e.actorUserId);return o("bishopTokenEvent",{actor:m(a),card:h("Епископ")})}if(e.type==="queen_no_decree"){const a=l(e.actorUserId);return o("queenNoDecreeEvent",{actor:m(a),card:h("Королева")})}if(e.type==="king_discard_elimination"){const a=l(e.actorUserId),r=l(e.targetUserId);return e.actorUserId===e.targetUserId?o("kingSelfEliminationEvent",{actor:m(a),card:h("Король")}):o("kingForcedEliminationEvent",{actor:m(a),target:m(r),card:h(e.targetCardName||e.targetCardCode||"card")})}if(e.type==="rebel_redraw"){const a=l(e.actorUserId),r=l(e.targetUserId);return o("rebelRedrawEvent",{actor:m(a),target:m(r),card:h(e.targetCardName||e.targetCardCode||o("systemUnknownUser"))})}if(e.type==="black_rose_saved"){const a=l(e.actorUserId),r=l(e.targetUserId);return o("blackRoseSavedEvent",{actor:m(a),target:m(r),card:h(e.targetCardName||e.targetCardCode||"card")})}if(e.type==="feudal_no_target"){const a=l(e.actorUserId);return o("feudalNoTargetEvent",{actor:m(a),card:h("Феодал")})}if(e.type==="feudal_inspect"){const a=l(e.actorUserId),r=l(e.targetUserId),s=l(e.secondTargetUserId);return o("feudalInspectEvent",{actor:m(a),card:h("Феодал"),firstTarget:m(r),secondTarget:m(s)})}if(e.type==="feudal_swap"){const a=l(e.actorUserId),r=l(e.targetUserId),s=l(e.secondTargetUserId);return o("feudalSwapEvent",{actor:m(a),card:h("Феодал"),firstTarget:m(r),secondTarget:m(s)})}if(e.type==="feudal_keep"){const a=l(e.actorUserId),r=l(e.targetUserId),s=l(e.secondTargetUserId);return o("feudalKeepEvent",{actor:m(a),card:h("Феодал"),firstTarget:m(r),secondTarget:m(s)})}if(e.type==="auto_played_on_leave"){const a=l(e.actorUserId);return o("autoPlayedOnLeaveEvent",{actor:m(a),card:h(e.cardName||e.cardCode||"card")})}if(e.type==="auto_discard_on_turn"){const a=l(e.actorUserId);return o("autoDiscardOnTurnEvent",{actor:m(a),card:h(e.cardName||e.cardCode||"card")})}return i(e.text||o("unknownError"))},mt=()=>{const e=(Array.isArray(t.activeMatch?.players)?t.activeMatch.players:[]).slice().sort((r,s)=>Number(s.points??0)-Number(r.points??0)),a=va(e.length);return`
    <div class="game-card">
      <h4>${o("gameLeaderboard")}</h4>
      <ul class="game-leaderboard">
        ${e.map(r=>`<li class="${r.userId===t.user?.id?"is-self":""}">
          <span>${i(r.username||r.userId)}${r.userId===t.user?.id?` <em>${i(o("youLabel"))}</em>`:""}</span>
          <b>${i(`${String(r.points??0)}/${String(a)}`)}</b>
        </li>`).join("")}
      </ul>
    </div>
  `},ut=()=>{const a=[...Array.isArray(t.gameEventLog)?t.gameEventLog:[]].reverse();return`
    <div class="game-card">
      <h4>${o("gameEvents")}</h4>
      <div class="game-events">
        ${a.length?a.map(r=>`<div class="game-event-line ${r.type==="system"||r.type==="round_summary"?"system":""}">${lt(r)}</div>`).join(""):`<div class="game-muted">${o("gameNoEvents")}</div>`}
      </div>
    </div>
  `},pt=()=>{const e=Array.isArray(t.roomChatMessages)?t.roomChatMessages:[];return`
    <div class="game-chat-widget ${t.gameChatOpen?"open":""}">
      ${t.gameChatOpen?`<button class="game-chat-backdrop" data-act="closeGameChatBackdrop" aria-label="${o("close")}"></button>`:""}
      ${t.gameChatOpen?`
        <div class="game-chat-card">
          <div class="game-chat-toggle-row">
            <h4>${o("roomChat")}</h4>
            <button class="chip" data-act="toggleGameChat">${o("close")}</button>
          </div>
          <div class="game-chat-popover" id="gameChatLog">
            ${(e||[]).length===0?`<div class="game-muted">${o("roomChatEmpty")}</div>`:e.map(a=>`
              <div class="game-chat-line ${a.role==="system"?"system":""}">
                <b>${i(a.username||o("roleSystem"))}</b>
                <span>${i(a.text||"")}</span>
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
        ${Number(t.gameChatUnreadCount||0)>0?`<span class="chat-unread-badge">${i(String(t.gameChatUnreadCount))}</span>`:""}
      </button>
    </div>
  `},vt=()=>{if(!t.gameCardPreview)return"";const e=t.gameCardPreview;return`
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
  `},gt=()=>{const e=t.gameConfirmPrompt;return e?`
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
  `:""},ht=()=>{const e=t.gameCardPlayPrompt;if(!e||e.cardCode!=="guard"&&e.cardCode!=="scout"&&e.cardCode!=="executioner"&&e.cardCode!=="rebel"&&e.cardCode!=="feudal_lord")return"";const a=et(e.guessedCardCode),r=e.cardCode==="rebel"?Le({includeSelf:!0}):ra(),s=e.cardCode==="guard",n=e.cardCode==="scout",c=e.cardCode==="executioner",d=e.cardCode==="feudal_lord",u=dt(),g=o(s?"guardPromptTitle":n?"scoutPromptTitle":c?"executionerPromptTitle":d?"feudalPromptTitle":"rebelPromptTitle"),R=o(s?"guardPromptHint":n?"scoutPromptHint":c?"executionerPromptHint":d?"feudalPromptHint":"rebelPromptHint");return`
    <div class="game-card-play-prompt-shell">
      <div class="game-card-play-prompt">
        <div class="game-card-play-prompt-head">
          <div>
            <h3>${g}</h3>
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
                  ${I.userId===t.user?.id?` <em>${i(o("youLabel"))}</em>`:""}
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
            ${s?a?o("guardPromptSummary",{card:a.name}):o("guardPromptSummaryEmpty"):o(n?"scoutPromptSummary":c?"executionerPromptSummary":d?"feudalPromptSummary":"rebelPromptSummary")}
          </div>
          <button
            class="primary"
            data-act="${s?"confirmGuardPlay":n?"confirmScoutPlay":c?"confirmExecutionerPlay":d?"confirmFeudalPlay":"confirmRebelPlay"}"
            ${!e.targetUserId||s&&!e.guessedCardCode||d&&(!e.secondTargetUserId||e.secondTargetUserId===e.targetUserId)?"disabled":""}
          >${o(s?"guardPromptConfirm":n?"scoutPromptConfirm":c?"executionerPromptConfirm":d?"feudalPromptConfirm":"rebelPromptConfirm")}</button>
        </div>
      </div>
    </div>
  `},yt=()=>{const e=O()?.pendingDecision||null;if(!e)return"";if(e.type==="guard_miss_peasant_reaction")return e.canReact?`
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
    `;if(e.type!=="feudal_lord_swap")return"";const a=l(e.targetUserId),r=l(e.secondTargetUserId);return`
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
            <strong>${i(a)}</strong>
            ${Te(e.targetCard,a,"showdown-card prompt-showdown-card")}
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
  `},bt=()=>{const e=O(),a=Array.isArray(e?.revealedCards)?e.revealedCards:[];return a.length===0?"":`
    <aside class="game-revealed-rail" aria-label="revealed-cards">
      ${a.map((r,s)=>_e(r,"",s)).join("")}
    </aside>
  `},ft=()=>{const e=Array.isArray(t.activeMatch?.players)?t.activeMatch.players:[],a=O(),r=Array.isArray(a?.players)?a.players:[],s=e.filter(u=>u.userId!==t.user?.id),n=Math.max(2,e.length||2),c={2:["seat-top"],3:["seat-top-left","seat-top-right"],4:["seat-left-mid","seat-top","seat-right-mid"],5:["seat-left-top","seat-top","seat-right-top","seat-right-bottom"],6:["seat-left-top","seat-left-bottom","seat-top","seat-right-top","seat-right-bottom"]},d=c[n]||c[6];return s.map((u,g)=>{const R=r.find(V=>V.userId===u.userId),I=a?.activePlayerId===u.userId,re=Array.isArray(R?.discard)?R.discard:[],k=Array.isArray(R?.hand)?R.hand:[],ga=!!R?.protectedFromEffects,ha=!!R?.hasBlackRoseToken,ya=a?.status==="finished"&&k.length>0;return`
      <article class="table-player ${d[g]||"seat-top"} ${I?"active":""}">
        <div class="table-player-name">
          ${i(u.username||u.userId)}
          ${ga?`<span class="table-player-status protection">${i(o("protectedBadge"))}</span>`:""}
          ${ha?`<span class="table-player-status rose">${i(o("blackRoseBadge"))}</span>`:""}
        </div>
        <div class="table-player-meta">
          <span class="table-player-discard-count">${o("gameDiscardCount")}: ${i(String(re.length))}</span>
          <div class="table-player-discard discard-stack">
            ${re.map((V,ba)=>_e(V,u.username||u.userId,ba)).join("")}
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
    `}).join("")},wt=()=>{if(t.activeMatch?.status!=="finished")return"";const e=(Array.isArray(t.activeMatch?.players)?t.activeMatch.players:[]).slice().sort((c,d)=>Number(d.points??0)-Number(c.points??0)),a=e.find(c=>c.userId===t.activeMatch?.winnerUserId)||null,r=va(e.length),s=t.activeRoom?.ownerId===t.user?.id,n=s&&Number(t.activeRoom?.participants?.length||0)===1;return`
    <div class="game-finish-shell">
      <div class="game-finish-panel">
        <div class="game-finish-kicker">${o("gameFinalTitle")}</div>
        <h2>${i(o("matchWinner",{winner:a?.username||t.activeMatch?.winnerUserId||o("systemUnknownUser")}))}</h2>
        <div class="game-finish-stats">
          <div class="game-finish-stat">
            <span>${o("gameFinalStatsRounds")}</span>
            <strong>${i(String(t.activeMatch?.roundNumber||0))}</strong>
          </div>
          <div class="game-finish-stat">
            <span>${o("gameFinalStatsTarget")}</span>
            <strong>${i(String(r))}</strong>
          </div>
        </div>
        <div class="game-finish-scoreboard">
          ${e.map(c=>`
            <div class="game-finish-score-row ${c.userId===t.activeMatch?.winnerUserId?"winner":""}">
              <span>${i(c.username||c.userId)}${c.userId===t.user?.id?` <em>${i(o("youLabel"))}</em>`:""}</span>
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
  `},Rt=()=>{const e=Se(),a=Array.isArray(e?.hand)?e.hand:[],r=Array.isArray(e?.discard)?e.discard:[],s=oa(),n=e?.lockedCardInstanceId||null,c=e?.lockedCardCode||null,d=!!e?.protectedFromEffects,u=!!e?.hasBlackRoseToken;return`
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
          ${r.length?r.map((g,R)=>_e(g,o("gameMyTable"),R)).join(""):`<span class="game-muted">${o("gameNoCardsOnTable")}</span>`}
        </div>
      </div>
      <div class="game-hand-cards">
        ${a.map(g=>{const R=n&&g.instanceId===n||!n&&c&&g.code===c;return`
          <button
            class="game-card-button ${s?"":"muted"} ${R?"locked":""}"
            data-act="playCard"
            data-card-code="${i(g.code)}"
            data-card-instance-id="${i(g.instanceId||"")}"
            data-card-locked="${i(String(!!R))}"
          >
            <span class="game-card-value">${i(String(g.value??0))}</span>
            <span class="game-card-name">${i(g.name||g.code)}</span>
            ${R?`<span class="game-card-lock-badge">${i(o("cardLockedBadge"))}</span>`:""}
          </button>
        `}).join("")}
      </div>
    </section>
  `},It=()=>{if(!t.activeMatch?.matchId)return`<section class="game-empty">${o("gameNoActiveMatch")}</section>`;const e=O(),a=Math.max(2,Array.isArray(t.activeMatch?.players)?t.activeMatch.players.length:2),r=t.activeMatch?.lastRoundSummary,n=!!r?.winnerNames?.length&&t.activeMatch?.status==="pending"&&e?.status==="finished"?o("roundWinnerSummary",{round:r.roundNumber,winners:r.winnerNames.join(", ")}):"",c=t.gameStatusMessage?`<div class="game-summary-banner winner">${i(t.gameStatusMessage)}</div>`:e?.hasPendingDecision?`<div class="game-summary-banner">${i(o("guardResolutionPending"))}</div>`:"";return`
    <section class="game-layout">
      <main class="game-table-wrap">
        ${n?`<div class="game-summary-banner round-summary-temp">${i(n)}</div>`:""}
        ${c}
        <div class="game-table table-layout-${i(String(a))}">
          ${bt()}
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
          ${ft()}
        </div>
        ${Rt()}
      </main>
      <aside class="game-sidebar">
        ${mt()}
        ${ut()}
      </aside>
      ${pt()}
      ${wt()}
      ${vt()}
      ${gt()}
      ${ht()}
      ${yt()}
    </section>
  `},St=e=>{const a=Number(e||Date.now()),r=Number.isFinite(a)?new Date(a*(a<1e10?1e3:1)):new Date;return new Intl.DateTimeFormat(t.lang==="en"?"en-US":"ru-RU",{hour:"2-digit",minute:"2-digit"}).format(r)},Ct=(e,a="?")=>String(e||a).trim().charAt(0).toUpperCase()||a,Oe=e=>e.isPublic&&e.hasPassword?o("roomAccessPublicProtected"):e.isPublic?o("roomAccessPublicOpen"):e.hasPassword?o("roomAccessPrivateProtected"):o("roomAccessPrivateCodeOnly"),Pt=()=>`
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
`,$t=()=>{const e=t.homeLobbies;return`
    <section class="lobby-card">
      <div class="lobby-head">
        <h3>${o("availableRooms")}</h3>
        <button class="chip" data-tab="lobbies">${o("navLobbies")}</button>
      </div>
      <div class="lobby-list">
        ${e.length===0?`<p>${o("lobbyNoItems")}</p>`:e.map(a=>`
          <article class="lobby-item">
            <div class="lobby-icon">${a.isPublic?"☀":"☾"}</div>
            <div class="lobby-meta">
              <h4>${i(a.name)} ${a.hasPassword?'<span class="inline-tag">🔒</span>':""}</h4>
              <p>${Oe(a)}</p>
              <p>${o("roomOwnerName")}: ${i(a.ownerUsername||a.ownerUserId||"—")}</p>
            </div>
            <div class="lobby-count">👥 ${a.playersCount} / ${a.maxPlayers||6}</div>
            <button class="secondary" data-act="joinLobby" data-room-id="${i(a.roomId)}" data-room-name="${i(a.name)}" data-room-owner-id="${i(a.ownerUserId||"")}" data-room-has-password="${a.hasPassword?"1":"0"}">${o("joinLobby")}</button>
          </article>
        `).join("")}
      </div>
    </section>
  `},Tt=()=>`
  ${Pt()}
  ${$t()}
`,Et=()=>`
  <h2>${o("lobbyTitle")}</h2>
  <p>${o("lobbyHint")}</p>
  <article>
    <div class="row">
      <select id="lobbyPasswordFilter">
        <option value="all" ${t.lobbyFilters.password==="all"?"selected":""}>${o("passwordAll")}</option>
        <option value="with_password" ${t.lobbyFilters.password==="with_password"?"selected":""}>${o("passwordWith")}</option>
        <option value="without_password" ${t.lobbyFilters.password==="without_password"?"selected":""}>${o("passwordWithout")}</option>
      </select>
      <input id="lobbyLimit" type="number" min="1" max="100" value="${t.lobbyFilters.limit}" />
      <button class="secondary" data-act="loadLobbies">${o("loadLobbies")}</button>
      <button class="chip" data-act="heroJoin">${o("connectCode")}</button>
    </div>
    <p class="room-section-hint">${o("lobbyCatalogHint")}</p>
  </article>
  <div class="lobby-list topgap">
    ${t.lobbyCatalog.length===0?`<article><p>${o("lobbyNoItems")}</p></article>`:t.lobbyCatalog.map(e=>`
      <article class="lobby-item">
        <div class="lobby-icon">${e.isPublic?"☀":"☾"}</div>
        <div class="lobby-meta">
          <h4>${i(e.name)}</h4>
          <p>${Oe(e)}</p>
          <p>${o("roomOwnerName")}: ${i(e.ownerUsername||e.ownerUserId||"—")}</p>
        </div>
        <div class="lobby-count">👥 ${e.playersCount} / ${e.maxPlayers||6}</div>
        <button class="secondary" data-act="joinLobby" data-room-id="${i(e.roomId)}" data-room-name="${i(e.name)}" data-room-owner-id="${i(e.ownerUserId||"")}" data-room-has-password="${e.hasPassword?"1":"0"}">${o("joinLobby")}</button>
      </article>
    `).join("")}
  </div>
`,kt=()=>{if(!t.user)return"";const e=t.myRooms||[];return`
    <article>
      <h3>${o("myRooms")}</h3>
      <div class="stack">
        ${e.length===0?`<p>${o("lobbyNoItems")}</p>`:e.map(a=>`
          <div class="row my-room-row">
            <span>${i(a.name)} (${i(a.inviteCode)})</span>
            <button class="chip" data-act="openOwnedRoom" data-room-id="${i(a.roomId)}">${o("openRoom")}</button>
          </div>
        `).join("")}
      </div>
    </article>
  `},At=()=>t.user?`
    <h2>${o("profileTitle")}</h2>
    <div class="grid">
      <article>
        <h3>${o("profileEdit")}</h3>
        <div class="stack">
          <input id="profileUsername" value="${i(t.user.username)}" />
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
  `:`<h2>${o("profileTitle")}</h2><div class="status">${o("needAuthProfile")}</div>`,Ve=e=>{const a=t.user?.id===e.userId,r=t.user?.id&&t.activeRoom?.ownerId===t.user.id,s=r&&e.userId!==t.activeRoom?.ownerId,n=r&&e.role==="player"&&e.userId!==t.activeRoom?.ownerId,c=r&&e.role==="player"&&e.userId!==t.activeRoom?.ownerId,d={owner:o("roleOwnerShort"),player:o("rolePlayerShort"),spectator:o("roleSpectatorShort")};return`
    <li class="participant-item">
      <div class="participant-row">
        <div class="participant-main">
          <span class="participant-avatar role-${i(e.role)}">${i(Ct(e.username,"U"))}</span>
          <div class="participant-identity">
            <div class="participant-name-row">
              <b class="role-${i(e.role)}">${i(e.username)}</b>
              ${a?`<span class="inline-note">(${o("youLabel")})</span>`:""}
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
  `},Nt=()=>{if(!t.activeRoom)return"";const e=Array.isArray(t.activeRoom.participants)?t.activeRoom.participants:[],a=e.filter(k=>k.role!=="spectator"),r=e.filter(k=>k.role==="spectator"),s=!!t.user?.id&&t.user.id===t.activeRoom.ownerId,n=e.find(k=>k.userId===t.user?.id),c=n?.role==="owner"||n?.role==="player",d=!!t.activeMatch?.matchId,u=d&&t.activeMatch?.status!=="finished",g=d&&t.activeMatch?.status==="finished"&&(Array.isArray(t.activeMatch?.players)&&t.activeMatch.players.some(k=>k.userId===t.user?.id)||n?.role==="spectator"),R=u||g,I=t.activeRoom.isPublic?o("visibilityPublic"):o("visibilityPrivate"),re=`${a.length} / ${t.activeRoom.maxPlayers||6}`;return`
    <article class="room-panel">
      <div class="room-panel-head">
        <div>
          <div class="hero-kicker">${o("roomDetails")}</div>
          <h3 class="room-title">${i(t.activeRoom.name||o("roomDetails"))}</h3>
        </div>
        <div class="room-live-pill">${o("roomLiveSync")}</div>
      </div>
      <div class="room-meta room-meta-cards">
        <div class="room-stat-card room-stat-code">
          <span>${o("roomCode")}</span>
          <div class="room-stat-main room-code-row"><b>${i(t.activeRoom.inviteCode||"—")}</b> ${s?`<button class="chip room-code-action icon-chip" title="${o("regenerateInvite")}" aria-label="${o("regenerateInvite")}" data-act="regenInvite">${o("regenerateInviteShort")}</button>`:""}</div>
        </div>
        <div class="room-stat-card">
          <span>${o("roomOwnerName")}</span>
          <div class="room-stat-main">${i(t.activeRoom.ownerUsername||t.activeRoom.ownerId||"—")}</div>
        </div>
        <div class="room-stat-card">
          <span>${o("roomVisibilityLabel")}</span>
          <div class="room-stat-main">${I}</div>
        </div>
        <div class="room-stat-card">
          <span>${o("roomAccessLabel")}</span>
          <div class="room-stat-main">${Oe(t.activeRoom)}</div>
        </div>
        <div class="room-stat-card">
          <span>${o("roomStatsLabel")}</span>
          <div class="room-stat-main">${re}</div>
        </div>
      </div>
      <div class="room-lists">
        <div class="room-list-card">
          <h4>${o("roomParticipants")} (${a.length})</h4>
          <ul class="participant-list">${a.map(Ve).join("")}</ul>
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
          ${s?`<button class="primary" data-act="startGame">${u?o("openActiveGame"):t.activeMatch?.status==="finished"?o("gamePlayAgain"):o("startGame")}</button>`:""}
          ${!s&&R?`<button class="secondary" data-act="openGame">${t.activeMatch?.status==="finished"?o("openMatchResults"):o("openActiveGame")}</button>`:""}
          ${s?`<button class="secondary" data-act="openRoomSettings">${o("openRoomSettings")}</button>`:""}
          <button class="chip" data-act="leaveRoom">${o(s?"closeOwnedRoom":"leaveRoom")}</button>
        </div>
      </div>
      <div id="roomStatus" class="status">${i(t.roomStatusMessage||"")}</div>
    </article>
  `},Lt=()=>t.activeRoom?`
    <div class="room-manage-layout">
      <article class="room-chat-wide">
        <div class="room-chat-head">
          <div>
            <h3>${o("roomChat")}</h3>
            <p class="room-section-hint">${o("roomChatHint")}</p>
          </div>
        </div>
        <div class="chat-log" id="roomChatLog">
          ${(t.roomChatMessages||[]).length===0?`<div class="chat-empty">${o("roomChatEmpty")}</div>`:(t.roomChatMessages||[]).map(e=>{const a=e.userId&&t.user?.id&&e.userId===t.user.id,r=e.role==="system"?"system":a?"self":"remote",s=a?o("selfMessageLabel"):e.username||o("roleSystem");return`<div class="chat-line ${r}">
              <div class="chat-meta-row">
                <span class="chat-author">${i(s)}</span>
                <span class="chat-time">${i(St(e.timestamp))}</span>
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
  `:"",Mt=()=>{if(t.activeTab==="game")return`
    <main class="layout dark game-mode">
      <header class="game-topbar">
        <div class="game-topbar-brand">${o("appName")}</div>
        <div class="game-topbar-actions">
          <button class="chip" data-act="exitGame">${o("logout")}</button>
        </div>
      </header>
      ${It()}
      <div id="toastContainer" class="toast-container"></div>
    </main>`;const e=t.user?`<div class="profile-actions"><button class="avatar-btn" data-tab="profile">${i((t.user.username||"U").slice(0,1).toUpperCase())}</button><button class="chip" data-act="logout">${o("logout")}</button></div>`:`<button class="primary" data-act="toggleAuth">${o("openAuth")}</button>`;return`
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
          <button class="tab ${t.activeTab==="home"?"active":""}" data-tab="home">${o("navHome")}</button>
          <button class="tab ${t.activeTab==="lobbies"?"active":""}" data-tab="lobbies">${o("navLobbies")}</button>
          ${t.activeRoom?`<button class="tab ${t.activeTab==="roomManage"?"active":""}" data-tab="roomManage">${o("navRoomActive")}</button>`:""}
          <button class="tab ${t.activeTab==="profile"?"active":""}" data-tab="profile">${o("navProfile")}</button>
        </nav>
        <div class="topbar-actions">
          <button class="primary topbar-create" data-act="heroCreate">＋ ${o("quickCreateRoom")}</button>
          <div class="lang-switch compact">
            <button class="chip ${t.lang==="ru"?"active":""}" data-lang="ru">RU</button>
            <button class="chip ${t.lang==="en"?"active":""}" data-lang="en">EN</button>
          </div>
          ${e}
        </div>
      </div>
    </header>

    ${it()}

    <section class="panel ${t.activeTab==="home"?"":"hidden"} cinematic-panel">${Tt()}</section>
    <section class="panel ${t.activeTab==="lobbies"?"":"hidden"} cinematic-panel">${Et()}</section>
    <section class="panel ${t.activeTab==="roomManage"?"":"hidden"} cinematic-panel">${Nt()}${Lt()}</section>
    <section class="panel ${t.activeTab==="profile"?"":"hidden"} cinematic-panel">${At()}</section>

    ${tt()}
    ${ot()}
    ${rt()}
    ${st()}
    ${nt()}
    <div id="toastContainer" class="toast-container"></div>
  </main>`},_t=(e,a,r)=>{const s=()=>{e&&(r(),e.innerHTML=Mt(),za(s),t.activeTab==="home"&&ua(s),t.activeTab==="lobbies"&&Xa(s),t.activeTab==="profile"&&Za(s),t.activeTab==="roomManage"&&Ka(s),t.activeTab==="game"&&at(s),t.authOpen&&!t.user&&Qa(s,a),t.roomChatInputShouldFocus&&t.activeTab==="roomManage"&&window.requestAnimationFrame(()=>{const n=document.querySelector("#roomChatInput");n instanceof HTMLInputElement&&(n.focus(),n.setSelectionRange(n.value.length,n.value.length)),ze(!1)}))};return s},Ot=async()=>{const e=document.querySelector("#app"),a=_t(e,Be,be);await Be(),await Ga(),await N("home",4),await N("catalog",t.lobbyFilters.limit,t.lobbyFilters.password),be(),pa(async()=>{await N("home",4),await N("catalog",t.lobbyFilters.limit,t.lobbyFilters.password),be()},a),a()};await Ot();
//# sourceMappingURL=index-pyC3ezOB.js.map
