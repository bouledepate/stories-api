(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const c of n)if(c.type==="childList")for(const d of c.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function r(n){const c={};return n.integrity&&(c.integrity=n.integrity),n.referrerPolicy&&(c.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?c.credentials="include":n.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(n){if(n.ep)return;n.ep=!0;const c=r(n);fetch(n.href,c)}})();const _e={ru:{appTag:"Stories",title:"Control Center",subtitle:"Комнаты и профиль в одном месте.",login:"Вход",register:"Регистрация",logout:"Выйти",notAuthorized:"Не авторизованы",signedAs:"Вы вошли как",navHome:"Комнаты",navProfile:"Профиль",navLobbies:"Лобби",openAuth:"Войти / Регистрация",close:"Закрыть",authTitle:"Авторизация",authHint:"Откройте аккаунт или войдите в существующий.",username:"Имя пользователя",password:"Пароль",createAccount:"Создать аккаунт",loginSuccess:"Успешный вход.",registerSuccess:"Аккаунт создан и выполнен вход.",homeNeedAuth:"Выполните вход для доступа к комнатам.",roomsTitle:"Комнаты",createRoom:"Создать комнату",roomName:"Название комнаты",connectCode:"Войти по invite-коду",connect:"Подключиться",spectator:"Зайти как spectator",ready:"",roomCreated:"Комната создана. Invite code:",roomJoinSuccess:"Подключение успешно. Room:",profileTitle:"Профиль пользователя",profileEdit:"Редактирование",newPassword:"Новый пароль (опционально)",saveProfile:"Сохранить профиль",stats:"Статистика",needAuthProfile:"Сначала авторизуйтесь.",profileUpdated:"Профиль обновлен.",passwordChanged:"Пароль успешно изменён.",currentPassword:"Текущий пароль",nextPassword:"Новый пароль",changePassword:"Сменить пароль",wins:"Победы",losses:"Поражения",vt:"Victory tokens",elim3:"Eliminated with 3",healthError:"Ошибка",unknownError:"Неизвестная ошибка",httpError:"Ошибка HTTP {status}",invalidCredentials:"Неверный логин или пароль.",currentPasswordInvalid:"Текущий пароль указан неверно.",userExists:"Такой username уже занят.",unauthorized:"Требуется авторизация.",forbidden:"Недостаточно прав.",roomNotFound:"Комната не найдена.",inviteInvalid:"Некорректный invite-код.",validationFailed:"Проверьте корректность введенных данных.",serverUnavailable:"Сервер временно недоступен. Повторите позже.",invalidUrl:"Некорректный URL.",roomPasswordRequired:"Для входа в это лобби нужен пароль.",roomPasswordInvalid:"Неверный пароль лобби.",roomIsFull:"Комната заполнена. Войти можно только как зритель.",ownerAlreadyHasRoom:"У вас уже есть активная комната. Закройте её перед созданием новой.",userAlreadyHasActiveRoom:"Сначала выйдите из текущей комнаты, чтобы войти в другую.",heroTitle:"Stories: project-visual landing",heroSubtitle:"Создавайте публичные комнаты для каталога или приватные комнаты по invite-коду.",heroCreate:"Создать комнату",heroJoin:"Присоединиться",roomDetails:"Текущая комната",roomCode:"Код приглашения",roomOwner:"Владелец",roomOwnerName:"Ник владельца",roomParticipants:"Участники",roomSpectators:"Зрители",roomActions:"Действия с комнатой",leaveRoom:"Покинуть комнату",closeOwnedRoom:"Закрыть комнату",markReady:"Я готов",markNotReady:"Не готов",noFieldsToUpdate:"Нет полей для обновления.",userNotFound:"Пользователь не найден.",userNotInRoom:"Пользователь не находится в комнате.",inviteCodeGenerationFailed:"Не удалось сгенерировать invite-код.",onlyOwnerCanManageRoom:"Только владелец может управлять комнатой.",ownerCannotBeRemoved:"Владельца нельзя кикнуть или заблокировать.",cannotTransferOwnershipToSelf:"Нельзя передать владение самому себе.",onlyPlayersCanBeKicked:"Кик доступен только для игроков.",inviteRotateCooldown:"Invite-код можно пересоздавать не чаще одного раза в минуту.",youLabel:"вы",authRequiredAction:"Для этого действия войдите в аккаунт.",switchToLogin:"Уже есть аккаунт? Войти",switchToRegister:"Нет аккаунта? Регистрация",themeDark:"Тёмная",themeLight:"Светлая",lobbyTitle:"Список лобби",lobbyHint:"Фильтруйте публичные и закрытые лобби.",visibilityAll:"Все",visibilityPublic:"Публичные",visibilityPrivate:"Приватная",passwordAll:"Любые",passwordWith:"С паролем",passwordWithout:"Без пароля",loadLobbies:"Обновить список",lobbyNoItems:"Лобби не найдены",lobbyHasPassword:"Пароль",lobbyNoPassword:"Без пароля",joinLobby:"Войти в лобби",roomPassword:"Пароль комнаты",roomPasswordOptional:"Пароль комнаты (необязательно)",availableRooms:"Доступные комнаты",myRooms:"Мои комнаты",openRoom:"Открыть",joinHint:"Введите invite-код. Приватные комнаты доступны только так.",statusReady:"Статус: готов.",statusNotReady:"Статус: не готов.",joinPasswordHint:"Для этой комнаты нужен пароль. Invite-код сам по себе не заменяет пароль.",joinWithoutPasswordHint:"Это лобби без пароля. Подтвердите вход.",joinPublicLobbyHint:"Публичная комната без пароля. Подтвердите вход.",requiredField:"Заполните обязательное поле.",inviteCodeInvalid:"Введите корректный invite-код (6 символов).",roomManage:"Управление комнатой",roomManageTitle:"Настройки комнаты",saveRoomSettings:"Сохранить настройки",regenerateInvite:"Пересоздать код приглашения",kickPlayer:"Кик",banPlayer:"Блок",roomChat:"Чат комнаты",chatPlaceholder:"Введите сообщение...",send:"Отправить",roomSettingsSaved:"Настройки комнаты обновлены.",inviteRegenerated:"Invite-код обновлён.",blockedNotice:"Вы заблокированы в этой комнате.",kickedFromRoomNotice:"Вы были исключены из комнаты.",roleOwner:"Владелец",rolePlayer:"Игрок",roleSpectator:"Зритель",roleSystem:"Система",roomClosedNotice:"Комната была закрыта владельцем.",roomManageReadonly:"Только владелец может менять настройки комнаты.",appName:"Letters: No Mercy",appGenre:"Dark Medieval Stories",navRoomActive:"Комната",quickCreateRoom:"Новая комната",roleOwnerShort:"Владелец",rolePlayerShort:"Игрок",roleSpectatorShort:"Зритель",readyShort:"готов",notReadyShort:"не готов",systemJoinedRoom:"{username} вошёл в комнату.",systemLeftRoom:"{username} вышел из комнаты.",systemUnknownUser:"Игрок",transferOwnership:"Передать владельца",ownershipTransferred:"Владелец комнаты изменён.",joinCurrentRoom:"Вернуться в комнату",closeAndJoinRoom:"Закрыть и войти",leaveAndJoinRoom:"Выйти и войти",roomSwitchTitle:"Переход в другую комнату",roomSwitchLeaveHint:"Вы уже состоите в комнате. Сначала выйдите из неё, чтобы открыть «{target}».",roomSwitchCloseHint:"Вы владелец текущей комнаты. Сначала закройте её, чтобы открыть «{target}».",participantRemovedNotice:"Доступ к комнате был отозван.",kickSymbolLabel:"Кикнуть игрока",banSymbolLabel:"Заблокировать игрока",transferOwnershipSymbolLabel:"Передать владение",roomLiveSync:"Комната активна",roomVisibilityLabel:"Видимость",roomAccessLabel:"Доступ",roomStatsLabel:"Состав",roomSizeLabel:"Размер",roomProtected:"С паролем",roomOpenAccess:"Без пароля",roomVisibilityPublicToggle:"Показывать комнату в публичном каталоге",roomCreateAccessHint:"Публичные комнаты видны на главной и во вкладке лобби. Приватные комнаты не показываются в каталогах и открываются только по invite-коду.",roomPasswordHint:"Пароль добавляет дополнительную защиту поверх выбранного режима доступа.",roomSettingsHint:"Настройте публикацию комнаты, пароль и лимит игроков.",roomAccessPublicOpen:"Публичная, вход без пароля",roomAccessPublicProtected:"Публичная, вход по паролю",roomAccessPrivateCodeOnly:"Приватная, вход только по invite-коду",roomAccessPrivateProtected:"Приватная, invite-код и пароль",lobbyCatalogHint:"Здесь показываются только публичные комнаты. Приватные комнаты доступны только по invite-коду.",roomChatHint:"Здесь остаются системные события и сообщения игроков.",roomChatEmpty:"Чат пуст. Первое сообщение задаст тон партии.",selfMessageLabel:"Вы",participantOwnerBadge:"owner",participantReadyBadge:"ГОТОВ",participantNotReadyBadge:"НЕ ГОТОВ",roomSwitchAccent:"Сначала завершите текущую сессию комнаты.",roomSize:"Размер комнаты",roomSizeHelp:"От 2 до 6 игроков. Если мест нет, зайти можно только как зритель.",regenerateInviteShort:"♻",openRoomSettings:"Настройки комнаты",roomSettingsModalTitle:"Параметры комнаты",roomUpdatedSystem:"Параметры комнаты обновлены.",ownershipTransferredSystem:"{username} стал новым владельцем комнаты.",participantKickedSystem:"{username} исключён из комнаты.",participantBannedSystem:"{username} заблокирован в комнате.",startGame:"Начать игру",openActiveGame:"Перейти в игру",gameStarted:"Игра запущена.",leftGame:"Вы вышли из игры.",gameExitConfirm:"Выйти из игры и покинуть комнату?",gamePlayAgain:"Играть снова",gamePlayAgainOwnerOnly:"Новый матч может запустить только владелец комнаты.",gameFinalTitle:"Матч завершён",gameFinalStatsRounds:"Раундов сыграно",gameFinalStatsTarget:"Победных очков",gameFinalLeave:"Выйти",gameReturnToRoom:"Вернуться в комнату",gameFinalCardLabel:"Финальная карта",openMatchResults:"Итоги матча",gameNoActiveMatch:"Активный матч не найден.",gameLeaderboard:"Лидерборд",gameEvents:"Лог событий",gameNoEvents:"Событий пока нет.",gameHandCount:"Карт в руке",gameDiscardCount:"Сброс",gameYourTurn:"Ваш ход",gameWaitTurn:"Ожидайте свой ход",gameMyTable:"Мой стол",gameNoCardsOnTable:"Пока пусто",gameStartRound:"Начать раунд",playedCardEvent:"разыграл карту {card}",autoPlayedOnLeaveEvent:"{actor} вышел из игры и автоматически разыграл карту: {card}.",autoDiscardOnTurnEvent:"{actor} вышел из игры и автоматически сбросил карту: {card}.",roundWinnerSummary:"Раунд {round}: победитель(и) {winners}",matchWinner:"Победитель матча: {winner}",gameDeck:"Колода",setAsideCardLabel:"Отложенная",setAsideHiddenHint:"Отложенная карта скрыта до конца раунда.",matchNotFound:"Матч не найден.",matchAlreadyExists:"Для этой комнаты уже есть активный матч.",matchAlreadyFinished:"Матч уже завершён.",notEnoughPlayersToStartMatch:"Для старта матча нужно минимум два игрока.",roundNotActive:"Раунд не активен.",roundAlreadyActive:"Раунд уже запущен.",notPlayerTurn:"Сейчас ход другого игрока.",playerNotInMatch:"Вы не участвуете в матче.",playerEliminated:"Вы выбыли из раунда.",cardNotInHand:"Этой карты нет в вашей руке.",targetPlayerRequired:"Сначала выберите цель.",targetPlayerInvalid:"Эту цель нельзя выбрать.",cardGuessRequired:"Нужно выбрать карту для угадывания.",cardGuessInvalid:"Указана недопустимая карта для угадывания.",guardCannotGuessGuard:"Стражника нельзя называть картой для угадывания.",cardPlayBlocked:"Эту карту нельзя разыграть до вашего следующего хода.",targetPlayerProtected:"Этого игрока сейчас защищает Дворянка.",matchStateInvalid:"Состояние матча повреждено.",playersNotReady:"Перед стартом игры все игроки должны нажать готовность.",allPlayersMustReadyHint:"Чтобы начать игру, в лобби должно быть минимум 2 игрока и все должны быть готовы.",waitingNextRound:"Ожидаем старт следующего раунда…",nextRoundIn:"Следующий раунд начнётся через {seconds}с…",newChatMessageNotice:"Новое сообщение в чате.",guardPromptTitle:"Стражник",guardPromptHint:"Выберите другого игрока и попробуйте угадать его карту.",guardPromptTarget:"Цель",guardPromptGuess:"Предполагаемая карта",guardPromptConfirm:"Разыграть Стражника",guardPromptSummary:"Вы выбрали карту: {card}.",guardPromptSummaryEmpty:"Выберите карту для догадки.",guardTargetUnavailable:"Сейчас нет доступной цели для Стражника.",guardGuessRequired:"Выберите карту, которую хотите угадать.",guardHitEvent:"{actor} угадал карту {card} у {target}. Игрок выбывает.",guardMissEvent:"{actor} не угадал карту {card} у {target}.",guardNoTargetEvent:"{actor} разыграл Стражника, но подходящей цели не было.",scoutPromptTitle:"Разведчик",scoutPromptHint:"Выберите игрока. Он не сможет разыграть текущую карту до своего следующего хода.",scoutPromptSummary:"Цель получит временный запрет на текущую карту в руке.",scoutPromptConfirm:"Разыграть Разведчика",scoutTargetUnavailable:"Сейчас нет доступной цели для Разведчика.",scoutLockEvent:"{actor} запретил {target} разыгрывать текущую карту до следующего хода.",scoutNoTargetEvent:"{actor} разыграл Разведчика, но подходящей цели не было.",cardLockedBadge:"запрет",executionerPromptTitle:"Палач",executionerPromptHint:"Выберите игрока. Он выбывает, если значение его карты меньше или равно 4.",executionerPromptSummary:"Цель выбывает только если её карта не старше 4.",executionerPromptConfirm:"Разыграть Палача",executionerTargetUnavailable:"Сейчас нет доступной цели для Палача.",executionerEliminateEvent:"{actor} казнил {target}: карта цели была не выше 4.",executionerSurviveEvent:"{actor} не смог казнить {target}: карта цели оказалась выше 4.",executionerNoTargetEvent:"{actor} разыграл Палача, но подходящей цели не было.",protectedBadge:"защита",ladyProtectionEvent:"{actor} получил защиту от эффектов других игроков до своего следующего хода.",rebelPromptTitle:"Мятежник",rebelPromptHint:"Выберите игрока. Он сбросит карту и доберёт новую. Можно выбрать и себя.",rebelPromptSummary:"Цель сбросит текущую карту и возьмёт новую из колоды, если она есть.",rebelPromptConfirm:"Разыграть Мятежника",rebelTargetUnavailable:"Сейчас нет доступной цели для Мятежника.",rebelRedrawEvent:"{actor} заставил {target} сбросить карту {card} и взять новую.",feudalPromptTitle:"Феодал",feudalPromptHint:"Выберите двух игроков. После этого вы увидите их карты и решите, менять их местами или нет.",feudalPromptTargets:"Две цели",feudalPromptSummary:"Для Феодала нужно выбрать двух разных игроков.",feudalPromptConfirm:"Посмотреть карты",feudalPromptNeedTwoTargets:"Для Феодала нужно выбрать двух разных игроков.",feudalResolveTitle:"Феодал: выбор обмена",feudalResolveHint:"Вы посмотрели обе карты. Теперь можно обменять их местами или оставить как есть.",feudalResolveSummary:"Это решение завершит эффект Феодала.",feudalSwapConfirm:"Поменять местами",feudalKeepConfirm:"Оставить как есть",feudalNoTargetEvent:"{actor} разыграл Феодала, но двух доступных целей не было.",feudalInspectEvent:"{actor} посмотрел карты {firstTarget} и {secondTarget}.",feudalSwapEvent:"{actor} поменял местами карты {firstTarget} и {secondTarget}.",feudalKeepEvent:"{actor} решил не менять карты {firstTarget} и {secondTarget}."},en:{appTag:"Stories",title:"Control Center",subtitle:"Rooms and profile in one place.",login:"Sign in",register:"Sign up",logout:"Logout",notAuthorized:"Not authorized",signedAs:"Signed in as",navHome:"Rooms",navProfile:"Profile",navLobbies:"Lobbies",openAuth:"Login / Register",close:"Close",authTitle:"Authentication",authHint:"Create an account or sign in.",username:"Username",password:"Password",createAccount:"Create account",loginSuccess:"Signed in successfully.",registerSuccess:"Account created and signed in.",homeNeedAuth:"Sign in to access rooms.",roomsTitle:"Rooms",createRoom:"Create room",roomName:"Room name",connectCode:"Join by invite code",connect:"Connect",spectator:"Join as spectator",ready:"",roomCreated:"Room created. Invite code:",roomJoinSuccess:"Connected successfully. Room:",profileTitle:"User profile",profileEdit:"Edit profile",newPassword:"New password (optional)",saveProfile:"Save profile",stats:"Stats",needAuthProfile:"Sign in first.",profileUpdated:"Profile updated.",passwordChanged:"Password changed successfully.",currentPassword:"Current password",nextPassword:"New password",changePassword:"Change password",wins:"Wins",losses:"Losses",vt:"Victory tokens",elim3:"Eliminated with 3",healthError:"Error",unknownError:"Unknown error",httpError:"HTTP error {status}",invalidCredentials:"Invalid username or password.",currentPasswordInvalid:"Current password is invalid.",userExists:"This username is already taken.",unauthorized:"Authorization required.",forbidden:"Not enough permissions.",roomNotFound:"Room not found.",inviteInvalid:"Invalid invite code.",validationFailed:"Please check input values.",serverUnavailable:"Server is temporarily unavailable. Try again later.",invalidUrl:"Invalid URL.",roomPasswordRequired:"Lobby password is required.",roomPasswordInvalid:"Invalid lobby password.",roomIsFull:"Room is full. You can join only as spectator.",ownerAlreadyHasRoom:"You already have an active room. Close it before creating a new one.",userAlreadyHasActiveRoom:"Leave your current room before joining another one.",heroTitle:"Stories: project visual landing",heroSubtitle:"Create public rooms for the catalog or private rooms that open only by invite code.",heroCreate:"Create room",heroJoin:"Join room",roomDetails:"Current room",roomCode:"Invite code",roomOwner:"Owner",roomOwnerName:"Owner name",roomParticipants:"Participants",roomSpectators:"Spectators",roomActions:"Room actions",leaveRoom:"Leave room",closeOwnedRoom:"Close room",markReady:"Mark ready",markNotReady:"Mark not ready",noFieldsToUpdate:"No fields to update.",userNotFound:"User not found.",userNotInRoom:"User is not in room.",inviteCodeGenerationFailed:"Failed to generate invite code.",onlyOwnerCanManageRoom:"Only room owner can manage room.",ownerCannotBeRemoved:"Owner cannot be kicked or blocked.",cannotTransferOwnershipToSelf:"You cannot transfer ownership to yourself.",onlyPlayersCanBeKicked:"Only players can be kicked.",inviteRotateCooldown:"Invite code can be regenerated only once per minute.",youLabel:"you",authRequiredAction:"Please sign in to continue.",switchToLogin:"Already have an account? Sign in",switchToRegister:"No account yet? Sign up",themeDark:"Dark",themeLight:"Light",lobbyTitle:"Lobby list",lobbyHint:"Filter public and private lobbies.",visibilityAll:"All",visibilityPublic:"Public",visibilityPrivate:"Private",passwordAll:"Any",passwordWith:"With password",passwordWithout:"Without password",loadLobbies:"Refresh list",lobbyNoItems:"No lobbies found",lobbyHasPassword:"Password",lobbyNoPassword:"No password",joinLobby:"Join lobby",roomPassword:"Room password",roomPasswordOptional:"Room password (optional)",availableRooms:"Available rooms",myRooms:"My rooms",openRoom:"Open",joinHint:"Enter an invite code. Private rooms are available only this way.",statusReady:"Status: ready.",statusNotReady:"Status: not ready.",joinPasswordHint:"This room requires a password. Invite code does not replace it.",joinWithoutPasswordHint:"This lobby has no password. Confirm join.",joinPublicLobbyHint:"This public room has no password. Confirm join.",requiredField:"Please fill in the required field.",inviteCodeInvalid:"Enter a valid invite code (6 characters).",roomManage:"Room management",roomManageTitle:"Room settings",saveRoomSettings:"Save settings",regenerateInvite:"Regenerate invite code",kickPlayer:"Kick",banPlayer:"Block",roomChat:"Room chat",chatPlaceholder:"Type a message...",send:"Send",roomSettingsSaved:"Room settings updated.",inviteRegenerated:"Invite code regenerated.",blockedNotice:"You are blocked in this room.",kickedFromRoomNotice:"You were kicked from the room.",roleOwner:"Owner",rolePlayer:"Player",roleSpectator:"Spectator",roleSystem:"System",roomClosedNotice:"The room was closed by the owner.",roomManageReadonly:"Only the owner can change room settings.",appName:"Letters: No Mercy",appGenre:"Dark Medieval Stories",navRoomActive:"Room",quickCreateRoom:"New room",roleOwnerShort:"Owner",rolePlayerShort:"Player",roleSpectatorShort:"Spectator",readyShort:"ready",notReadyShort:"not ready",systemJoinedRoom:"{username} joined the room.",systemLeftRoom:"{username} left the room.",systemUnknownUser:"Player",transferOwnership:"Transfer ownership",ownershipTransferred:"Room ownership transferred.",joinCurrentRoom:"Return to room",closeAndJoinRoom:"Close and join",leaveAndJoinRoom:"Leave and join",roomSwitchTitle:"Join another room",roomSwitchLeaveHint:'You are already in a room. Leave it first to open "{target}".',roomSwitchCloseHint:'You own the current room. Close it first to open "{target}".',participantRemovedNotice:"Your access to the room was revoked.",kickSymbolLabel:"Kick player",banSymbolLabel:"Block player",transferOwnershipSymbolLabel:"Transfer ownership",roomLiveSync:"Room is active",roomVisibilityLabel:"Visibility",roomAccessLabel:"Access",roomStatsLabel:"Roster",roomSizeLabel:"Capacity",roomProtected:"Password protected",roomOpenAccess:"Open access",roomVisibilityPublicToggle:"Show room in the public catalog",roomCreateAccessHint:"Public rooms are visible on the home screen and in the lobby tab. Private rooms are hidden from catalogs and open only by invite code.",roomPasswordHint:"Password adds an extra lock on top of the selected access mode.",roomSettingsHint:"Tune room publication, password and player cap for the current session.",roomAccessPublicOpen:"Public, no password required",roomAccessPublicProtected:"Public, password required",roomAccessPrivateCodeOnly:"Private, invite code only",roomAccessPrivateProtected:"Private, invite code and password",lobbyCatalogHint:"Only public rooms are shown here. Private rooms are available only by invite code.",roomChatHint:"System events and player messages stay here.",roomChatEmpty:"Chat is empty. The first message sets the tone.",selfMessageLabel:"You",participantOwnerBadge:"owner",participantReadyBadge:"READY",participantNotReadyBadge:"WAITING",roomSwitchAccent:"Finish your current room session first.",roomSize:"Room size",roomSizeHelp:"From 2 to 6 players. When full, users can join only as spectators.",regenerateInviteShort:"♻",openRoomSettings:"Room settings",roomSettingsModalTitle:"Room settings",roomUpdatedSystem:"Room settings updated.",ownershipTransferredSystem:"{username} is now the room owner.",participantKickedSystem:"{username} was kicked from the room.",participantBannedSystem:"{username} was blocked in the room.",startGame:"Start game",openActiveGame:"Open game",gameStarted:"Game started.",leftGame:"You left the game.",gameExitConfirm:"Leave game and room?",gamePlayAgain:"Play again",gamePlayAgainOwnerOnly:"Only the room owner can start a new match.",gameFinalTitle:"Match finished",gameFinalStatsRounds:"Rounds played",gameFinalStatsTarget:"Victory points",gameFinalLeave:"Leave",gameReturnToRoom:"Return to room",gameFinalCardLabel:"Final card",openMatchResults:"Match results",gameNoActiveMatch:"No active match found.",gameLeaderboard:"Leaderboard",gameEvents:"Event log",gameNoEvents:"No events yet.",gameHandCount:"Hand",gameDiscardCount:"Discard",gameYourTurn:"Your turn",gameWaitTurn:"Waiting for your turn",gameMyTable:"My table",gameNoCardsOnTable:"No cards yet",gameStartRound:"Start round",playedCardEvent:"played {card}",autoPlayedOnLeaveEvent:"{actor} left the game and auto-played a card: {card}.",autoDiscardOnTurnEvent:"{actor} left the game and auto-discarded a card: {card}.",roundWinnerSummary:"Round {round}: winner(s) {winners}",matchWinner:"Match winner: {winner}",gameDeck:"Deck",setAsideCardLabel:"Set Aside",setAsideHiddenHint:"Set-aside card is hidden until round end.",matchNotFound:"Match not found.",matchAlreadyExists:"An active match already exists for this room.",matchAlreadyFinished:"Match is already finished.",notEnoughPlayersToStartMatch:"At least two players are required to start a match.",roundNotActive:"Round is not active.",roundAlreadyActive:"Round is already active.",notPlayerTurn:"It is not your turn.",playerNotInMatch:"You are not in this match.",playerEliminated:"You are eliminated from this round.",cardNotInHand:"This card is not in your hand.",matchStateInvalid:"Match state is invalid.",playersNotReady:"All players must be ready before starting the game.",allPlayersMustReadyHint:"To start the game, lobby must have at least 2 players and all must be ready.",waitingNextRound:"Waiting for the next round to start…",nextRoundIn:"Next round starts in {seconds}s…",newChatMessageNotice:"New chat message.",feudalPromptTitle:"Feudal Lord",feudalPromptHint:"Choose two players. After that you will see their cards and decide whether to swap them.",feudalPromptTargets:"Two targets",feudalPromptSummary:"Feudal Lord requires two different players.",feudalPromptConfirm:"Reveal cards",feudalPromptNeedTwoTargets:"Feudal Lord requires two different players.",feudalResolveTitle:"Feudal Lord: swap decision",feudalResolveHint:"You have seen both cards. Now you may swap them or keep them as they are.",feudalResolveSummary:"This choice will finish the Feudal Lord effect.",feudalSwapConfirm:"Swap cards",feudalKeepConfirm:"Keep as is",feudalNoTargetEvent:"{actor} played Feudal Lord, but there were not enough available targets.",feudalInspectEvent:"{actor} looked at the cards of {firstTarget} and {secondTarget}.",feudalSwapEvent:"{actor} swapped the cards of {firstTarget} and {secondTarget}.",feudalKeepEvent:"{actor} decided not to swap the cards of {firstTarget} and {secondTarget}."}},ae=(e,t="")=>{try{return localStorage.getItem(e)||t}catch{return t}},oe=(e,t)=>{try{localStorage.setItem(e,t)}catch{}},G=e=>{try{localStorage.removeItem(e)}catch{}},Oe=(e,t)=>{try{const r=localStorage.getItem(e);return r?JSON.parse(r)??t:t}catch{return t}},Ue=(e,t)=>{try{localStorage.setItem(e,JSON.stringify(t))}catch{}},b={readToken:()=>ae("stories_token"),writeToken:e=>oe("stories_token",e),removeToken:()=>G("stories_token"),readLanguage:()=>ae("stories_lang","ru"),writeLanguage:e=>oe("stories_lang",e),readActiveRoomId:()=>ae("stories_active_room_id"),writeActiveRoomId:e=>oe("stories_active_room_id",e),removeActiveRoomId:()=>G("stories_active_room_id"),readActiveMatchId:()=>ae("stories_active_match_id"),writeActiveMatchId:e=>oe("stories_active_match_id",e),removeActiveMatchId:()=>G("stories_active_match_id"),readRoomChatMessages:e=>e?Oe(`stories_room_chat_${e}`,[]):[],writeRoomChatMessages:(e,t)=>{e&&Ue(`stories_room_chat_${e}`,t)},removeRoomChatMessages:e=>{e&&G(`stories_room_chat_${e}`)},readGameEventLog:e=>e?Oe(`stories_game_event_log_${e}`,[]):[],writeGameEventLog:(e,t)=>{e&&Ue(`stories_game_event_log_${e}`,t)},removeGameEventLog:e=>{e&&G(`stories_game_event_log_${e}`)}},yt=window.location.hostname==="0.0.0.0"||window.location.hostname===""?"localhost":window.location.hostname,bt=window.location.protocol==="https:"?"wss":"ws",re=b.readActiveRoomId(),he=b.readActiveMatchId(),a={apiBase:window.location.origin,wsUrl:`${bt}://${yt}:8081`,token:b.readToken(),user:null,activeRoom:re?{roomId:re}:null,activeMatch:he?{matchId:he}:null,activeTab:"home",homeLobbies:[],lobbyCatalog:[],lobbyFilters:{password:"all",limit:20},socket:null,lang:b.readLanguage(),authOpen:!1,authMode:"login",roomModalOpen:!1,roomModalMode:"create",roomSettingsOpen:!1,joinLobbyModalOpen:!1,joinLobbyRoomId:"",joinLobbyOwnerUserId:"",joinLobbyRoomName:"",joinLobbyNeedsPassword:!1,joinLobbyPassword:"",joinLobbySpectator:!1,roomSwitchPromptOpen:!1,roomSwitchPromptMode:"leave",roomSwitchTargetLabel:"",pendingJoinAction:null,suppressOwnJoinPresence:!!re,roomChatMessages:b.readRoomChatMessages(re),roomChatInputShouldFocus:!1,gameEventLog:b.readGameEventLog(he),gameChatOpen:!1,gameChatUnreadCount:0,gameCardPreview:null,gameCardPlayPrompt:null,gameStatusMessage:"",homeStatusMessage:"",myRooms:[],roomNoticeMessage:"",roomStatusMessage:""},o=(e,t={})=>{const r=_e[a.lang]?.[e]??_e.ru[e]??e;return Object.entries(t).reduce((s,[n,c])=>s.replaceAll(`{${n}}`,String(c)),r)},i=e=>{const t=document.createElement("div");return t.textContent=String(e??""),t.innerHTML},f=(e,t=256)=>{const r=document.querySelector(e);return r?String(r.value??"").trim().slice(0,t):""},C=(e,t,r=!1)=>{const s=document.querySelector(`#${e}`);s&&(s.textContent=t,s.classList.toggle("ok",r))},v=(e,t="error")=>{const r=document.querySelector("#toastContainer");if(!r||!e)return;const s=document.createElement("div");s.className=`toast ${t}`,s.textContent=e,r.prepend(s),window.setTimeout(()=>s.remove(),4200)},y=(e,t)=>{const r=t?.message||o("unknownError");C(e,r),v(r)},ye=e=>{const t=document.querySelector(e);t&&(t.classList.remove("input-error"),t.removeAttribute("aria-invalid"))},be=(e,t)=>{const r=document.querySelector(e);r&&(r.classList.add("input-error"),r.setAttribute("aria-invalid","true"),r.focus(),v(t))},Ve=()=>{b.removeActiveRoomId()},ft=e=>{if(e){b.writeActiveRoomId(e);return}Ve()},We=()=>{b.removeActiveMatchId()},wt=e=>{if(e){b.writeActiveMatchId(e);return}We()},pe=e=>{a.token=e||"",a.token?b.writeToken(a.token):b.removeToken()},J=e=>{a.user=e||null},It=e=>{a.lang=e,b.writeLanguage(e)},h=e=>{a.activeTab=e},Fe=e=>{a.homeLobbies=Array.isArray(e)?e:[]},fe=e=>{a.lobbyCatalog=Array.isArray(e)?e:[]},Rt=({password:e,limit:t})=>{e!==void 0&&(a.lobbyFilters.password=e),t!==void 0&&(a.lobbyFilters.limit=t)},qe=e=>{a.myRooms=Array.isArray(e)?e:[]},we=e=>{a.socket=e},V=({open:e,mode:t}={})=>{e!==void 0&&(a.authOpen=!!e),t!==void 0&&(a.authMode=t)},Q=({open:e,mode:t}={})=>{e!==void 0&&(a.roomModalOpen=!!e),t!==void 0&&(a.roomModalMode=t)},ve=e=>{a.roomSettingsOpen=!!e},Ye=e=>{a.roomStatusMessage=""},x=e=>{a.homeStatusMessage=e||""},T=e=>{a.roomNoticeMessage=e||""},$e=e=>{a.suppressOwnJoinPresence=!!e},Ke=e=>{a.roomChatInputShouldFocus=!!e},M=e=>{a.gameStatusMessage=e||""},W=e=>{a.gameChatOpen=!!e},X=e=>{a.gameChatUnreadCount=Math.max(0,0)},se=e=>{a.gameCardPreview=e||null},ne=e=>{a.gameCardPlayPrompt=e||null},F=e=>{a.gameCardPlayPrompt&&(a.gameCardPlayPrompt={...a.gameCardPlayPrompt,...e||{}})},He=()=>{a.gameChatUnreadCount=Math.max(0,Number(a.gameChatUnreadCount||0)+1)},ze=e=>{a.gameEventLog=[...a.gameEventLog,{timestamp:Date.now(),...e}].slice(-120),b.writeGameEventLog(a.activeMatch?.matchId||"",a.gameEventLog)},Qe=()=>{b.removeGameEventLog(a.activeMatch?.matchId||""),a.gameEventLog=[]},Ie=e=>{a.roomChatMessages=[...a.roomChatMessages,{timestamp:Date.now(),...e}].slice(-100),b.writeRoomChatMessages(a.activeRoom?.roomId||"",a.roomChatMessages)},St=e=>{a.roomChatMessages=Array.isArray(e)?e.slice(-100):[],b.writeRoomChatMessages(a.activeRoom?.roomId||"",a.roomChatMessages)},Ct=()=>{b.removeRoomChatMessages(a.activeRoom?.roomId||""),a.roomChatMessages=[]},S=(e,{persist:t=!0}={})=>{a.activeRoom=e||null,a.roomChatMessages=b.readRoomChatMessages(e?.roomId||""),t&&ft(e?.roomId||"")},L=()=>{a.activeRoom=null,a.roomChatMessages=[],Ve()},le=(e,{persist:t=!0}={})=>{a.activeMatch=e||null,a.gameEventLog=b.readGameEventLog(e?.matchId||""),t&&wt(e?.matchId||"")},I=()=>{a.activeMatch=null,a.gameEventLog=[],We()},Xe=({open:e,roomId:t,ownerUserId:r,roomName:s,needsPassword:n,password:c,spectator:d}={})=>{e!==void 0&&(a.joinLobbyModalOpen=!!e),t!==void 0&&(a.joinLobbyRoomId=t),r!==void 0&&(a.joinLobbyOwnerUserId=r),s!==void 0&&(a.joinLobbyRoomName=s),n!==void 0&&(a.joinLobbyNeedsPassword=!!n),c!==void 0&&(a.joinLobbyPassword=c),d!==void 0&&(a.joinLobbySpectator=!!d)},Te=()=>{Xe({open:!1,roomId:"",ownerUserId:"",roomName:"",needsPassword:!1,password:"",spectator:!1})},Ze=({open:e,mode:t,targetLabel:r,pendingJoinAction:s}={})=>{e!==void 0&&(a.roomSwitchPromptOpen=!!e),t!==void 0&&(a.roomSwitchPromptMode=t),r!==void 0&&(a.roomSwitchTargetLabel=r),s!==void 0&&(a.pendingJoinAction=s)},Ae=()=>{Ze({open:!1,mode:"leave",targetLabel:"",pendingJoinAction:null})},Pt=()=>{pe(""),J(null),L(),I(),V({open:!1}),T(""),W(!1),X(),se(null),Qe(),M(""),Ae()},U=(e,t="login")=>{V({open:!0,mode:t}),e()},$t=()=>a.token?{Authorization:`Bearer ${a.token}`}:{},Tt=(e,t)=>{const r=String(e||"").toUpperCase(),s={INVALID_CREDENTIALS:"invalidCredentials",USER_EXISTS:"userExists",CURRENT_PASSWORD_INVALID:"currentPasswordInvalid",PASSWORD_CHANGED:"passwordChanged",NO_FIELDS_TO_UPDATE:"noFieldsToUpdate",USER_NOT_FOUND:"userNotFound",MISSING_BEARER_TOKEN:"unauthorized",INVALID_TOKEN_FORMAT:"unauthorized",INVALID_TOKEN_SIGNATURE:"unauthorized",INVALID_TOKEN_PAYLOAD:"unauthorized",INVALID_TOKEN_CLAIMS:"unauthorized",TOKEN_EXPIRED:"unauthorized",UNAUTHORIZED:"unauthorized",FORBIDDEN:"forbidden",INVITE_CODE_NOT_FOUND:"inviteInvalid",INVALID_INVITE_CODE:"inviteInvalid",OWNER_ALREADY_HAS_ROOM:"ownerAlreadyHasRoom",USER_ALREADY_HAS_ACTIVE_ROOM:"userAlreadyHasActiveRoom",ROOM_PASSWORD_REQUIRED:"roomPasswordRequired",ROOM_PASSWORD_INVALID:"roomPasswordInvalid",ROOM_IS_FULL:"roomIsFull",USER_NOT_IN_ROOM:"userNotInRoom",ROOM_NOT_FOUND:"roomNotFound",INVITE_CODE_GENERATION_FAILED:"inviteCodeGenerationFailed",ONLY_OWNER_CAN_MANAGE_ROOM:"onlyOwnerCanManageRoom",OWNER_CANNOT_BE_REMOVED:"ownerCannotBeRemoved",CANNOT_TRANSFER_OWNERSHIP_TO_SELF:"cannotTransferOwnershipToSelf",ONLY_PLAYERS_CAN_BE_KICKED:"onlyPlayersCanBeKicked",USER_BLOCKED_IN_ROOM:"blockedNotice",INVITE_CODE_ROTATE_COOLDOWN:"inviteRotateCooldown",MATCH_NOT_FOUND:"matchNotFound",MATCH_ALREADY_EXISTS:"matchAlreadyExists",MATCH_ALREADY_FINISHED:"matchAlreadyFinished",NOT_ENOUGH_PLAYERS_TO_START_MATCH:"notEnoughPlayersToStartMatch",ROUND_NOT_ACTIVE:"roundNotActive",ROUND_ALREADY_ACTIVE:"roundAlreadyActive",NOT_PLAYER_TURN:"notPlayerTurn",PLAYER_NOT_IN_MATCH:"playerNotInMatch",PLAYER_ELIMINATED:"playerEliminated",CARD_NOT_IN_HAND:"cardNotInHand",TARGET_PLAYER_REQUIRED:"targetPlayerRequired",TARGET_PLAYER_INVALID:"targetPlayerInvalid",CARD_GUESS_REQUIRED:"cardGuessRequired",CARD_GUESS_INVALID:"cardGuessInvalid",GUARD_CANNOT_GUESS_GUARD:"guardCannotGuessGuard",CARD_PLAY_BLOCKED:"cardPlayBlocked",TARGET_PLAYER_PROTECTED:"targetPlayerProtected",MATCH_STATE_INVALID:"matchStateInvalid",PLAYERS_NOT_READY:"playersNotReady",VALIDATION_ERROR:"validationFailed",UNKNOWN_ERROR:"unknownError"};return s[r]?s[r]:t===401?"unauthorized":t===403?"forbidden":t>=500?"serverUnavailable":null},At=(e,t,r)=>{const s=t?.message||t?.errorMessage||t?.error||r||"";if(String(t?.errorCode||t?.code||"").toUpperCase()==="UNKNOWN_ERROR"&&/must|invalid|required|password|username/i.test(String(s)))return{key:"validationFailed",message:String(s)};const n=Tt(t?.code||t?.errorCode,e);return n?{key:n,message:o(n)}:{key:null,message:s||o("httpError",{status:e})}},m=async(e,t={})=>{let r;try{r=await fetch(`${a.apiBase.replace(/\/$/,"")}${e}`,{...t,headers:{"Content-Type":"application/json",...t.headers||{},...$t(),Locale:a.lang}})}catch{throw new Error(o("serverUnavailable"))}const s=await r.text();let n={};try{n=s?JSON.parse(s):{}}catch{n={}}if(!r.ok){r.status===401&&(a.socket&&a.socket.readyState<=1&&a.socket.close(),pe(""),J(null),I(),L(),h("home"));const c=At(r.status,n,s),d=new Error(c.message||o("unknownError"));throw d.code=c.key,d.status=r.status,d}return n},P=e=>{!a.socket||a.socket.readyState!==WebSocket.OPEN||a.socket.send(JSON.stringify({...e,token:a.token||void 0}))},R=(e,t={})=>{P({type:"lobbies_event",event:e,data:t})},et=e=>{e&&P({type:"subscribe_room",roomId:e})},Nt=()=>{const e=a.activeRoom?.participants;return Array.isArray(e)?e:[]},tt=()=>Nt().find(e=>e.userId===a.user?.id)||null,Et=()=>!!a.user?.id&&a.activeRoom?.ownerId===a.user.id,Z=e=>!!(e&&a.activeRoom?.roomId===e),Ne=(e=a.activeMatch,t=a.user?.id)=>t?(Array.isArray(e?.players)?e.players:[]).some(s=>s.userId===t):!1,_=()=>a.activeMatch?.currentRound||null,at=()=>!!a.user?.id&&_()?.activePlayerId===a.user.id,Re=()=>{const e=_();return!e||!Array.isArray(e.players)?null:e.players.find(t=>t.userId===a.user?.id)||null},Ee=({includeSelf:e=!1}={})=>{const t=_();return(Array.isArray(t?.players)?t.players:[]).filter(s=>s.eliminated?!1:s.userId===a.user?.id?e:!s.protectedFromEffects)},ot=()=>Ee();let ie=null,ce=null,Se="";const Y=e=>e?.status!=="finished"&&Ne(e,a.user?.id),me=()=>tt()?.role==="spectator",Lt=e=>!!e?.matchId&&(Ne(e,a.user?.id)||me()),xe=(e,t="")=>!!e?.matchId&&e?.status==="finished"&&t!==""&&e.matchId===t&&Ne(e,a.user?.id),Mt=e=>{const t=e?.currentRound?.lastAction;!t?.at||(a.gameEventLog||[]).some(s=>s.actionAt===t.at)||ze({type:t.type||"card_played",actorUserId:t.actorUserId,cardCode:t.cardCode,cardName:t.cardName,targetUserId:t.targetUserId,secondTargetUserId:t.secondTargetUserId,guessedCardCode:t.guessedCardCode,guessedCardName:t.guessedCardName,targetCardCode:t.targetCardCode,targetCardName:t.targetCardName,actionAt:t.at})},kt=e=>{const t=e?.lastRoundSummary;if(!t?.roundNumber||(a.gameEventLog||[]).some(n=>n.type==="round_summary"&&n.roundNumber===t.roundNumber))return;const s=Array.isArray(t.winnerNames)&&t.winnerNames.length?t.winnerNames.join(", "):(t.winnerUserIds||[]).join(", ");ze({type:"round_summary",roundNumber:t.roundNumber,text:o("roundWinnerSummary",{round:t.roundNumber,winners:s})}),v(o("roundWinnerSummary",{round:t.roundNumber,winners:s}),"ok")},D=()=>{ie&&(window.clearTimeout(ie),ie=null),ce&&(window.clearInterval(ce),ce=null),Se=""},_t=async e=>{if(a.activeMatch?.matchId)try{const t=await m(`/matches/${encodeURIComponent(a.activeMatch.matchId)}/start-round`,{method:"POST"});k(t,{withTab:!0}),P({type:"room_event",roomId:a.activeRoom?.roomId,event:"match_state_updated",data:{matchId:t.matchId}}),e()}catch(t){y("gameStatus",t)}},rt=(e,t)=>{if(!(e?.status==="pending"&&e?.currentRound?.status==="finished")||!a.activeRoom?.ownerId||!a.user?.id){D();return}const s=`${e.matchId}:${e.roundNumber}`;if(Se===s)return;if(D(),Se=s,a.activeRoom.ownerId!==a.user.id){M(o("waitingNextRound"));return}let n=8;M(o("nextRoundIn",{seconds:n})),ce=window.setInterval(()=>{n-=1,!(n<=0)&&M(o("nextRoundIn",{seconds:n}))},1e3),ie=window.setTimeout(async()=>{D(),await _t(t)},8e3)},k=(e,{withTab:t=!0,forceViewTab:r=!1,keepViewTab:s=!1}={})=>{if(e?.matchId){if(le(e),Mt(e),kt(e),e.status==="finished"&&e.winnerUserId){const n=(e.players||[]).find(c=>c.userId===e.winnerUserId)?.username||e.winnerUserId;M(o("matchWinner",{winner:n})),D()}t&&(Y(e)||r||s&&Lt(e))&&h("game")}},de=async(e,t,r={})=>{try{const s=me()&&a.activeRoom?.roomId?await K(a.activeRoom.roomId):await m(`/matches/${encodeURIComponent(e)}`);return s?.matchId?(k(s,r),!(s.status==="finished"&&s.winnerUserId)&&!(s.status==="pending"&&s.currentRound?.status==="finished")&&M(""),rt(s,t),t(),s):null}catch(s){return y("gameStatus",s),null}},K=async e=>(await m(`/rooms/${encodeURIComponent(e)}/match`))?.match||null,st=async e=>{if(a.activeRoom?.roomId)try{const t=await m("/matches",{method:"POST",body:JSON.stringify({roomId:a.activeRoom.roomId})}),r=await m(`/matches/${encodeURIComponent(t.matchId)}/start-round`,{method:"POST"});Qe(),X(0),k(r),R("room_match_started",{roomId:a.activeRoom.roomId,matchId:r.matchId,actorUserId:a.user?.id}),P({type:"room_event",roomId:a.activeRoom.roomId,event:"match_state_updated",data:{matchId:r.matchId}}),v(o("gameStarted"),"ok"),e()}catch(t){y("roomStatus",t)}},E=async(e,t,r={})=>{if(!(!a.activeMatch?.matchId||!t))try{const s=await m(`/matches/${encodeURIComponent(a.activeMatch.matchId)}/play-card`,{method:"POST",body:JSON.stringify({cardCode:t,targetUserId:r.targetUserId||null,secondTargetUserId:r.secondTargetUserId||null,guessedCardCode:r.guessedCardCode||null,cardInstanceId:r.cardInstanceId||null,shouldSwap:typeof r.shouldSwap=="boolean"?r.shouldSwap:null})});ne(null),k(s,{withTab:!0,keepViewTab:a.activeTab==="game"}),rt(s,e),P({type:"room_event",roomId:a.activeRoom?.roomId,event:"match_state_updated",data:{matchId:s.matchId}}),s.status==="pending"&&s.currentRound?.status==="finished"||M(""),e()}catch(s){M(s?.message||o("unknownError")),y("gameStatus",s)}},De=e=>{const t=f("#gameChatInput",512);if(!a.activeRoom?.roomId||t==="")return;P({type:"room_event",roomId:a.activeRoom.roomId,event:"chat_message",data:{text:t,username:a.user?.username||"user",role:(a.activeRoom.participants||[]).find(s=>s.userId===a.user?.id)?.role||"player"}});const r=document.querySelector("#gameChatInput");r instanceof HTMLInputElement&&(r.value=""),e(),window.requestAnimationFrame(()=>{const s=document.querySelector("#gameChatInput");s instanceof HTMLInputElement&&s.focus()})},Ot=async e=>{if(!a.activeRoom?.roomId)return;const t=a.activeRoom.roomId,r=a.activeMatch?.matchId||null;try{await m(`/rooms/${encodeURIComponent(t)}/leave`,{method:"POST"})}catch{}r&&P({type:"room_event",roomId:t,event:"match_state_updated",data:{matchId:r}}),R("room_left",{roomId:t,...r?{matchId:r}:{}}),await A("home",4,a.lobbyFilters.password),await A("catalog",a.lobbyFilters.limit,a.lobbyFilters.password),I(),L(),D(),W(!1),X(),T(""),h("home"),v(o("leftGame"),"ok"),e()},Ut=()=>{const t=(Array.isArray(a.activeRoom?.participants)?a.activeRoom.participants:[]).filter(r=>r.userId!==a.user?.id&&(r.role==="owner"||r.role==="player"));return t.length===0?null:t[Math.floor(Math.random()*t.length)]||null},Ft=async e=>{if(!a.activeRoom?.roomId)return;const t=a.activeRoom.roomId,r=a.activeMatch?.matchId||null;try{if(a.activeRoom.ownerId===a.user?.id){const s=Ut();s?.userId&&(await m(`/rooms/${encodeURIComponent(t)}/participants/${encodeURIComponent(s.userId)}/transfer-ownership`,{method:"POST"}),R("room_ownership_transferred",{roomId:t,userId:s.userId,username:s.username||"",actorUserId:a.user?.id}))}await m(`/rooms/${encodeURIComponent(t)}/leave`,{method:"POST"})}catch{}r&&P({type:"room_event",roomId:t,event:"match_state_updated",data:{matchId:r}}),R("room_left",{roomId:t,...r?{matchId:r}:{}}),await A("home",4,a.lobbyFilters.password),await A("catalog",a.lobbyFilters.limit,a.lobbyFilters.password),I(),L(),D(),W(!1),X(),T(""),h("home"),v(o("leftGame"),"ok"),e()},B=()=>{const e=document.querySelector("#gameChatLog");e&&window.requestAnimationFrame(()=>{e.scrollTop=e.scrollHeight})},qt=e=>e?.status==="lobby"&&Number(e?.playersCount||0)<Number(e?.maxPlayers||6),je=async()=>{if(a.token)try{J(await m("/auth/me"))}catch{J(null),pe("")}},A=async(e="home",t=4,r="all")=>{try{const s=await m(`/lobbies?visibility=public&password=${encodeURIComponent(r)}&limit=${t}`);e==="home"&&Fe((s.items||[]).filter(qt)),e==="catalog"&&fe(s.items||[])}catch{e==="home"&&Fe([]),e==="catalog"&&fe([])}},Ht=async()=>{if(!a.user){L(),I();return}const e=a.activeRoom?.roomId,t=a.activeMatch?.matchId||"";if(e)try{S(await m(`/rooms/${encodeURIComponent(e)}`));try{const r=await m(`/rooms/${encodeURIComponent(e)}/match`);if(r?.match?.matchId){le(r.match),h(Y(r.match)||xe(r.match,t)?"game":"roomManage");return}}catch{}I(),h("roomManage");return}catch{L(),I()}try{const r=await m("/rooms/current");if(r?.roomId){S(r);try{const s=await m(`/rooms/${encodeURIComponent(r.roomId)}/match`);if(s?.match?.matchId){le(s.match),h(Y(s.match)||xe(s.match,t)?"game":"roomManage");return}}catch{}I(),h("roomManage")}else L(),I()}catch{L(),I()}},ge=()=>{if(!a.user){qe([]);return}const e=[...a.homeLobbies,...a.lobbyCatalog],t=new Map;e.filter(r=>r.ownerUserId===a.user.id).forEach(r=>t.set(r.roomId,r)),a.activeRoom?.ownerId===a.user.id&&t.set(a.activeRoom.roomId,{roomId:a.activeRoom.roomId,name:a.activeRoom.name,inviteCode:a.activeRoom.inviteCode,ownerUserId:a.activeRoom.ownerId}),qe([...t.values()])},xt=(e,t,r)=>{const s=Array.isArray(a.roomChatMessages)?a.roomChatMessages:[],n=s[s.length-1]||null;if(!n||n.role!=="system"||r.role!=="system"||typeof n.text!="string"||typeof r.text!="string"||Math.abs(Number(r.timestamp||0)-Number(n.timestamp||0))>8e3){Ie(r);return}const c=t?.username||o("systemUnknownUser"),d=o("systemJoinedRoom",{username:c}),l=o("systemLeftRoom",{username:c});if(n.text===d&&r.text===l||n.text===l&&r.text===d){St(s.slice(0,-1));return}Ie(r)},Ge=()=>{const e=document.querySelector("#roomChatLog");e&&window.requestAnimationFrame(()=>{e.scrollTop=e.scrollHeight})},Dt=e=>{const t=e?.username||o("systemUnknownUser");return e?.event==="room_settings_updated"?o("roomUpdatedSystem"):e?.event==="room_ownership_transferred"?o("ownershipTransferredSystem",{username:t}):e?.event==="room_participant_kicked"?o("participantKickedSystem",{username:t}):e?.event==="room_participant_banned"?o("participantBannedSystem",{username:t}):e?.event==="joined"?o("systemJoinedRoom",{username:t}):e?.event==="left"?o("systemLeftRoom",{username:t}):e?.message||""},H=(e,t={})=>{const r={username:o("roleSystem"),role:"system",text:Dt({event:e,...t}),timestamp:t?.timestamp||Date.now()};if(e==="joined"||e==="left"){xt(e,t,r);return}Ie(r)},O=()=>{L(),I(),Ye(),ve(!1)},z=(e,{resetChat:t=!0}={})=>{I(),S(e),et(e.roomId),t&&Ct(),T(""),Ye(),h("roomManage")},ee=e=>{Q({open:!1}),Te(),Ae(),h("roomManage"),e()},nt=(e,t=!0)=>{Ae(),t&&e()},ue=(e,t)=>{Ze({pendingJoinAction:t,mode:Et()?"close":"leave",targetLabel:t.targetLabel||"",open:!0}),e()},Ce=(e,t="create")=>{Q({open:!0,mode:t}),x(""),e()},jt=e=>{Q({open:!1}),e()},it=(e,{roomId:t,roomName:r,ownerUserId:s,needsPassword:n})=>{Xe({open:!0,roomId:t,roomName:r,ownerUserId:s,needsPassword:n,spectator:!1}),e()},Be=e=>{Te(),e()},ct=async()=>{if(!a.activeRoom?.roomId)return;const e=a.activeRoom.roomId,t=a.activeMatch?.matchId||null;await m(`/rooms/${encodeURIComponent(e)}/leave`,{method:"POST"}),t&&P({type:"room_event",roomId:e,event:"match_state_updated",data:{matchId:t}}),O(),R("room_left",{roomId:e,...t?{matchId:t}:{}}),await A("home",4,a.lobbyFilters.password),await A("catalog",a.lobbyFilters.limit,a.lobbyFilters.password)},dt=async(e,t,r,s="",n=!1,c="homeStatus")=>{try{if(Z(t))return ee(e),!0;if(a.user?.id&&r===a.user.id){const l=await m(`/rooms/${encodeURIComponent(t)}`);z(l,{resetChat:!1})}else{const l={spectator:!!n};s.trim()!==""&&(l.password=s.trim());const g=await m(`/rooms/${encodeURIComponent(t)}/join`,{method:"POST",body:JSON.stringify(l)});z(g)}const d=await K(a.activeRoom.roomId).catch(()=>null);return d?.matchId?(k(d,{withTab:!0}),Y(d)||h("roomManage")):(I(),h("roomManage")),R("room_joined",{roomId:a.activeRoom.roomId}),C(c,`${o("roomJoinSuccess")} ${a.activeRoom.roomId}`,!0),v(o("roomJoinSuccess"),"ok"),e(),!0}catch(d){return y(c,d),!1}},lt=async(e,t,r,s=!1,n="homeStatus")=>{try{const c={inviteCode:t,spectator:s};r!==""&&(c.password=r);const d=await m("/rooms/join-by-code",{method:"POST",body:JSON.stringify(c)});z(d);const l=await K(a.activeRoom.roomId).catch(()=>null);return l?.matchId?(k(l,{withTab:!0}),Y(l)||h("roomManage")):(I(),h("roomManage")),R("room_joined",{roomId:a.activeRoom.roomId}),Q({open:!1}),x(`${o("roomJoinSuccess")} ${a.activeRoom.roomId}`),e(),!0}catch(c){return x(c.message),y(n,c),!1}},Gt=async e=>{const t=a.pendingJoinAction;if(t){if(nt(e,!1),t.kind==="lobby"){await dt(e,t.roomId,t.ownerUserId,t.password||"",!!t.spectator,"joinLobbyStatus")&&Te();return}if(t.kind==="invite"){await lt(e,t.inviteCode,t.password||"",!!t.spectator,"homeStatus");return}t.kind==="open_create_modal"&&Ce(e,"create")}},Bt=e=>{document.querySelector('[data-act="createRoom"]')?.addEventListener("click",async()=>{if(!a.user)return U(e,"login");ye("#roomName");try{const t=f("#roomName",64);if(t===""){be("#roomName",o("requiredField"));return}const r=f("#roomPassword",128),s={name:t,isPublic:!!document.querySelector("#roomIsPublic")?.checked,maxPlayers:Number(f("#roomMaxPlayers",1)||"6")};if(r!==""&&(s.password=r),a.activeRoom?.roomId){ue(e,{kind:"open_create_modal",targetLabel:o("createRoom")});return}const n=await m("/rooms",{method:"POST",body:JSON.stringify(s)});z(n),R("room_created",{roomId:a.activeRoom.roomId}),Q({open:!1}),x(`${o("roomCreated")} ${a.activeRoom.inviteCode}`),e()}catch(t){x(t.message),y("homeStatus",t)}}),document.querySelector('[data-act="joinByCode"]')?.addEventListener("click",async()=>{if(!a.user)return U(e,"login");ye("#inviteCode");try{const t=f("#inviteCode",6).toUpperCase();if(t.length!==6){be("#inviteCode",o("inviteCodeInvalid"));return}const r=f("#joinPassword",128),s=!!document.querySelector("#joinAsSpectator")?.checked;if(a.activeRoom?.inviteCode===t){ee(e);return}if(a.activeRoom?.roomId){ue(e,{kind:"invite",inviteCode:t,password:r,spectator:s,targetLabel:t});return}await lt(e,t,r,s,"homeStatus")}catch(t){x(t.message),y("homeStatus",t)}})},mt=e=>{(async()=>{if(a.activeRoom?.roomId&&!(a.activeRoom.ownerId&&a.activeRoom.inviteCode&&a.activeMatch?.matchId))try{(!a.activeRoom.ownerId||!a.activeRoom.inviteCode)&&(S(await m(`/rooms/${encodeURIComponent(a.activeRoom.roomId)}`)),$e(!0));const s=await K(a.activeRoom.roomId).catch(()=>null);if(s?.matchId){k(s,{withTab:!0,keepViewTab:a.activeTab==="game"}),e();return}I()}catch(s){y("homeStatus",s)}})();const r=()=>a.activeRoom?.roomId?!0:(C("roomStatus",o("roomNotFound")),!1);document.querySelector('[data-act="readyRoom"]')?.addEventListener("click",async()=>{if(r())try{const n=!(tt()?.ready??!1);S(await m(`/rooms/${encodeURIComponent(a.activeRoom.roomId)}/ready`,{method:"POST",body:JSON.stringify({ready:n})})),R("room_ready_changed",{roomId:a.activeRoom.roomId}),e()}catch(s){y("roomStatus",s)}}),document.querySelector('[data-act="leaveRoom"]')?.addEventListener("click",async()=>{if(r())try{await ct(),h("home"),T(""),C("homeStatus",o("ready"),!0),e()}catch(s){y("roomStatus",s)}}),document.querySelectorAll('[data-act="joinLobby"]').forEach(s=>{s.addEventListener("click",async()=>{if(!a.user)return U(e,"login");const n=s.dataset.roomId;if(n){if(Z(n)){ee(e);return}it(e,{roomId:n,roomName:s.dataset.roomName||n,ownerUserId:s.dataset.roomOwnerId||"",needsPassword:s.dataset.roomHasPassword==="1"})}})}),document.querySelector('[data-act="openRoomSettings"]')?.addEventListener("click",()=>{ve(!0),e()}),document.querySelector('[data-act="startGame"]')?.addEventListener("click",async()=>{if(a.activeMatch?.matchId&&a.activeMatch.status!=="finished"){await de(a.activeMatch.matchId,e,{withTab:!0,forceViewTab:!0});return}const n=(Array.isArray(a.activeRoom?.participants)?a.activeRoom.participants:[]).filter(d=>d.role!=="spectator");if(!(n.length>=2&&n.every(d=>d.ready===!0))){v(o("allPlayersMustReadyHint"));return}await st(e)}),document.querySelector('[data-act="openGame"]')?.addEventListener("click",async()=>{const s=await K(a.activeRoom?.roomId||"").catch(()=>null);s?.matchId&&(k(s,{withTab:!0,forceViewTab:!0,keepViewTab:!0}),e())})},Jt=e=>{document.querySelector('[data-act="saveRoomSettings"]')?.addEventListener("click",async()=>{if(a.activeRoom?.roomId)try{const t=!!document.querySelector("#manageIsPublic")?.checked,r=Number(f("#manageMaxPlayers",1)||"6"),s=f("#managePassword",128);S(await m(`/rooms/${encodeURIComponent(a.activeRoom.roomId)}/settings`,{method:"PATCH",body:JSON.stringify({isPublic:t,maxPlayers:r,password:s})})),R("room_settings_updated",{roomId:a.activeRoom.roomId,actorUserId:a.user?.id}),H("room_settings_updated"),C("roomManageStatus",o("roomSettingsSaved"),!0),v(o("roomSettingsSaved"),"ok"),ve(!1),e()}catch(t){y("roomManageStatus",t)}}),document.querySelector('[data-act="regenInvite"]')?.addEventListener("click",async()=>{if(a.activeRoom?.roomId)try{S(await m(`/rooms/${encodeURIComponent(a.activeRoom.roomId)}/invite-code/regenerate`,{method:"POST"})),R("room_invite_regenerated",{roomId:a.activeRoom.roomId}),C("roomManageStatus",""),v(o("inviteRegenerated"),"ok"),e()}catch(t){C("roomManageStatus",""),v(t?.message||o("unknownError"))}}),document.querySelectorAll('[data-act="kickParticipant"]').forEach(t=>{t.addEventListener("click",async()=>{if(!a.activeRoom?.roomId)return;const r=t.dataset.userId;if(!r)return;const s=(a.activeRoom.participants||[]).find(n=>n.userId===r);try{S(await m(`/rooms/${encodeURIComponent(a.activeRoom.roomId)}/participants/${encodeURIComponent(r)}/kick`,{method:"POST"})),R("room_participant_kicked",{roomId:a.activeRoom.roomId,userId:r,username:s?.username||"",actorUserId:a.user?.id}),H("room_participant_kicked",{username:s?.username||o("systemUnknownUser")}),e()}catch(n){y("roomManageStatus",n)}})}),document.querySelectorAll('[data-act="banParticipant"]').forEach(t=>{t.addEventListener("click",async()=>{if(!a.activeRoom?.roomId)return;const r=t.dataset.userId;if(!r)return;const s=(a.activeRoom.participants||[]).find(n=>n.userId===r);try{S(await m(`/rooms/${encodeURIComponent(a.activeRoom.roomId)}/participants/${encodeURIComponent(r)}/ban`,{method:"POST"})),R("room_participant_banned",{roomId:a.activeRoom.roomId,userId:r,username:s?.username||"",actorUserId:a.user?.id}),H("room_participant_banned",{username:s?.username||o("systemUnknownUser")}),e()}catch(n){y("roomManageStatus",n)}})}),document.querySelectorAll('[data-act="transferOwnership"]').forEach(t=>{t.addEventListener("click",async()=>{if(!a.activeRoom?.roomId)return;const r=t.dataset.userId;if(!r)return;const s=(a.activeRoom.participants||[]).find(n=>n.userId===r);try{S(await m(`/rooms/${encodeURIComponent(a.activeRoom.roomId)}/participants/${encodeURIComponent(r)}/transfer-ownership`,{method:"POST"})),R("room_ownership_transferred",{roomId:a.activeRoom.roomId,userId:r,username:s?.username||"",actorUserId:a.user?.id}),H("room_ownership_transferred",{username:s?.username||o("systemUnknownUser")}),C("roomManageStatus",o("ownershipTransferred"),!0),v(o("ownershipTransferred"),"ok"),e()}catch(n){y("roomManageStatus",n)}})}),document.querySelector('[data-act="sendRoomChat"]')?.addEventListener("click",()=>{const t=f("#roomChatInput",512);if(!a.activeRoom?.roomId||t==="")return;Ke(!0),P({type:"room_event",roomId:a.activeRoom.roomId,event:"chat_message",data:{text:t,username:a.user?.username||"user",role:(a.activeRoom.participants||[]).find(s=>s.userId===a.user?.id)?.role||"player"}});const r=document.querySelector("#roomChatInput");r&&(r.value="",r.focus())}),document.querySelector("#roomChatInput")?.addEventListener("keydown",t=>{t.key!=="Enter"||t.shiftKey||(t.preventDefault(),document.querySelector('[data-act="sendRoomChat"]')?.click())})},Vt=e=>{mt(e),Jt(e)},Wt=e=>{document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{h(t.dataset.tab),e()})}),document.querySelectorAll("[data-lang]").forEach(t=>{t.addEventListener("click",()=>{It(t.dataset.lang),e()})}),document.querySelector('[data-act="toggleAuth"]')?.addEventListener("click",()=>U(e,"login")),document.querySelectorAll('[data-act="heroCreate"]').forEach(t=>{t.addEventListener("click",()=>{if(!a.user)return U(e,"login");if(a.activeRoom?.roomId){ue(e,{kind:"open_create_modal",targetLabel:o("createRoom")});return}Ce(e,"create")})}),document.querySelectorAll('[data-act="heroJoin"]').forEach(t=>{t.addEventListener("click",()=>{if(!a.user)return U(e,"login");Ce(e,"join")})}),document.querySelectorAll('[data-act="closeAuth"]').forEach(t=>{t.addEventListener("click",()=>{V({open:!1}),e()})}),document.querySelector('[data-act="closeRoomNotice"]')?.addEventListener("click",()=>{T(""),e()}),document.querySelector('[data-act="logout"]')?.addEventListener("click",()=>{Pt(),a.socket?.readyState===WebSocket.OPEN&&a.socket.close(),we(null),e()}),document.querySelectorAll('[data-act="closeRoomModal"]').forEach(t=>{t.addEventListener("click",()=>jt(e))}),document.querySelectorAll('[data-act="closeRoomSettings"]').forEach(t=>{t.addEventListener("click",()=>{ve(!1),e()})}),document.querySelectorAll('[data-act="closeJoinLobbyModal"]').forEach(t=>{t.addEventListener("click",()=>Be(e))}),document.querySelectorAll('[data-act="closeRoomSwitchModal"], [data-act="cancelRoomSwitch"]').forEach(t=>{t.addEventListener("click",()=>nt(e))}),document.querySelector('[data-act="confirmJoinLobby"]')?.addEventListener("click",async()=>{if(!a.joinLobbyRoomId)return;ye("#lobbyJoinPassword");const t=f("#lobbyJoinPassword",128),r=!!document.querySelector("#lobbyJoinAsSpectator")?.checked;if(a.joinLobbyNeedsPassword&&t===""){be("#lobbyJoinPassword",o("requiredField")),C("joinLobbyStatus",o("requiredField"));return}if(a.activeRoom?.roomId&&!Z(a.joinLobbyRoomId)){ue(e,{kind:"lobby",roomId:a.joinLobbyRoomId,ownerUserId:a.joinLobbyOwnerUserId,password:t,spectator:r,targetLabel:a.joinLobbyRoomName||a.joinLobbyRoomId});return}await dt(e,a.joinLobbyRoomId,a.joinLobbyOwnerUserId,t,r,"joinLobbyStatus")&&Be(e)}),document.querySelector('[data-act="confirmRoomSwitch"]')?.addEventListener("click",async()=>{try{await ct(),await Gt(e)}catch(t){y("roomSwitchStatus",t)}}),a.roomModalOpen&&a.user&&Bt(e)},Yt=async(e,t)=>{document.querySelector('[data-act="switchAuthMode"]')?.addEventListener("click",()=>{V({mode:a.authMode==="login"?"register":"login"}),e()}),document.querySelector('[data-act="authSubmit"]')?.addEventListener("click",async()=>{const r=a.authMode==="login"?"/auth/login":"/auth/register",s=a.authMode==="login"?o("loginSuccess"):o("registerSuccess");try{const n=await m(r,{method:"POST",body:JSON.stringify({username:f("#authUsername",64),password:f("#authPassword",128)})});pe(n.accessToken),await t();try{const c=await m("/rooms/current");c?.roomId?(S(c),h("roomManage"),$e(!0)):O()}catch{O()}C("authStatus",s,!0),V({open:!1}),e()}catch(n){y("authStatus",n)}})},Kt=e=>{const t=async()=>{try{fe((await m(`/lobbies?visibility=public&password=${encodeURIComponent(a.lobbyFilters.password)}&limit=${a.lobbyFilters.limit}`)).items||[]),C("lobbyStatus",o("ready"),!0),e()}catch(r){y("lobbyStatus",r)}};document.querySelector('[data-act="loadLobbies"]')?.addEventListener("click",async()=>{Rt({password:f("#lobbyPasswordFilter",20)||"all",limit:Number(f("#lobbyLimit",3)||"20")}),await t()}),document.querySelectorAll('[data-act="joinLobby"]').forEach(r=>{r.addEventListener("click",async()=>{if(!a.user)return U(e,"login");const s=r.dataset.roomId;if(s){if(Z(s)){ee(e);return}it(e,{roomId:s,roomName:r.dataset.roomName||s,ownerUserId:r.dataset.roomOwnerId||"",needsPassword:r.dataset.roomHasPassword==="1"})}})})},zt=e=>{document.querySelectorAll('[data-act="openOwnedRoom"]').forEach(t=>{t.addEventListener("click",async()=>{try{const r=t.dataset.roomId;if(!r)return;if(Z(r)){ee(e);return}const s=await m(`/rooms/${encodeURIComponent(r)}`);z(s,{resetChat:!1}),e()}catch(r){y("profileStatus",r)}})}),document.querySelector('[data-act="saveProfile"]')?.addEventListener("click",async()=>{try{const t=f("#profileUsername",64);J(await m("/auth/me",{method:"PATCH",body:JSON.stringify({username:t})})),C("profileStatus",o("profileUpdated"),!0),e()}catch(t){y("profileStatus",t)}}),document.querySelector('[data-act="changePassword"]')?.addEventListener("click",async()=>{try{await m("/auth/change-password",{method:"POST",body:JSON.stringify({currentPassword:f("#currentPassword",128),newPassword:f("#nextPassword",128)})});const t=document.querySelector("#currentPassword"),r=document.querySelector("#nextPassword");t&&(t.value=""),r&&(r.value=""),C("profileStatus",o("passwordChanged"),!0)}catch(t){y("profileStatus",t)}})},Le=[{code:"peasant",name:"Крестьянин",value:0,copies:2},{code:"guard",name:"Стражник",value:1,copies:5},{code:"scout",name:"Разведчик",value:2,copies:2},{code:"executioner",name:"Палач",value:3,copies:2},{code:"lady",name:"Дворянка",value:4,copies:2},{code:"rebel",name:"Мятежник",value:5,copies:2},{code:"feudal_lord",name:"Феодал",value:6,copies:2},{code:"bishop",name:"Епископ",value:7,copies:1},{code:"queen",name:"Королева",value:8,copies:1},{code:"king",name:"Король",value:9,copies:1}],Qt=e=>Le.find(t=>t.code===e)||null,Xt=e=>{document.querySelector('[data-act="toggleGameChat"]')?.addEventListener("click",()=>{const t=!a.gameChatOpen;W(t),t&&X(),e(),t&&B()}),document.querySelector('[data-act="closeGameChatBackdrop"]')?.addEventListener("click",()=>{W(!1),e()}),document.querySelector('[data-act="closeGameCardPreview"]')?.addEventListener("click",()=>{se(null),e()}),document.querySelector('[data-act="closeGameCardPlayPrompt"]')?.addEventListener("click",()=>{ne(null),e()}),document.querySelector(".game-card-preview-shell")?.addEventListener("click",t=>{t.target===t.currentTarget&&(se(null),e())}),document.querySelector(".game-card-play-prompt-shell")?.addEventListener("click",t=>{t.target===t.currentTarget&&(ne(null),e())}),document.querySelector('[data-act="exitGame"]')?.addEventListener("click",async()=>{window.confirm(o("gameExitConfirm"))&&await Ot(e)}),document.querySelector('[data-act="leaveFinishedMatch"]')?.addEventListener("click",async()=>{await Ft(e)}),document.querySelector('[data-act="playAgainMatch"]')?.addEventListener("click",async()=>{if(a.activeRoom?.ownerId!==a.user?.id){v(o("gamePlayAgainOwnerOnly"));return}await st(e)}),document.querySelector('[data-act="returnToRoomAfterMatch"]')?.addEventListener("click",()=>{h("roomManage"),e()}),document.querySelectorAll('[data-act="playCard"]').forEach(t=>{t.addEventListener("click",async()=>{if(!at()){v(o("notPlayerTurn"));return}if(t.dataset.cardLocked==="true"){v(o("cardPlayBlocked"));return}const r=t.dataset.cardCode||"",s=t.dataset.cardInstanceId||"";if(r!=="guard"&&r!=="scout"&&r!=="executioner"&&r!=="rebel"&&r!=="feudal_lord"){await E(e,r,{cardInstanceId:s});return}const n=r==="rebel"||r==="feudal_lord"?Ee({includeSelf:!0}):ot();if(n.length===0||r==="feudal_lord"&&n.length<2){if(r==="guard"||r==="scout"||r==="executioner"||r==="feudal_lord"){await E(e,r,{cardInstanceId:s});return}v(o("rebelTargetUnavailable"));return}ne({cardCode:r,cardInstanceId:s,targetUserId:n[0]?.userId||"",secondTargetUserId:r==="feudal_lord"&&n[1]?.userId||"",guessedCardCode:""}),e()})}),document.querySelectorAll('[data-act="selectGuardTarget"]').forEach(t=>{t.addEventListener("click",()=>{F({targetUserId:t.dataset.userId||""}),e()})}),document.querySelectorAll('[data-act="selectGuardGuess"]').forEach(t=>{t.addEventListener("click",()=>{F({guessedCardCode:t.dataset.cardCode||""}),e()})}),document.querySelector('[data-act="confirmGuardPlay"]')?.addEventListener("click",async()=>{const t=a.gameCardPlayPrompt;if(!t?.targetUserId){v(o("targetPlayerRequired"));return}if(!t?.guessedCardCode||!Le.some(r=>r.code===t.guessedCardCode&&r.code!=="guard")){v(o("guardGuessRequired"));return}await E(e,t.cardCode||"guard",{targetUserId:t.targetUserId,guessedCardCode:t.guessedCardCode,cardInstanceId:t.cardInstanceId})}),document.querySelector('[data-act="confirmScoutPlay"]')?.addEventListener("click",async()=>{const t=a.gameCardPlayPrompt;if(!t?.targetUserId){v(o("targetPlayerRequired"));return}await E(e,t.cardCode||"scout",{targetUserId:t.targetUserId,cardInstanceId:t.cardInstanceId})}),document.querySelector('[data-act="confirmExecutionerPlay"]')?.addEventListener("click",async()=>{const t=a.gameCardPlayPrompt;if(!t?.targetUserId){v(o("targetPlayerRequired"));return}await E(e,t.cardCode||"executioner",{targetUserId:t.targetUserId,cardInstanceId:t.cardInstanceId})}),document.querySelector('[data-act="confirmRebelPlay"]')?.addEventListener("click",async()=>{const t=a.gameCardPlayPrompt;if(!t?.targetUserId){v(o("targetPlayerRequired"));return}await E(e,t.cardCode||"rebel",{targetUserId:t.targetUserId,cardInstanceId:t.cardInstanceId})}),document.querySelectorAll('[data-act="selectFeudalTarget"]').forEach(t=>{t.addEventListener("click",()=>{const r=t.dataset.userId||"",s=a.gameCardPlayPrompt;if(!(!s||r==="")){if(s.targetUserId===r){F({targetUserId:s.secondTargetUserId||"",secondTargetUserId:""}),e();return}if(s.secondTargetUserId===r){F({secondTargetUserId:""}),e();return}if(!s.targetUserId){F({targetUserId:r}),e();return}F({secondTargetUserId:r}),e()}})}),document.querySelector('[data-act="confirmFeudalPlay"]')?.addEventListener("click",async()=>{const t=a.gameCardPlayPrompt;if(!t?.targetUserId||!t?.secondTargetUserId||t.targetUserId===t.secondTargetUserId){v(o("feudalPromptNeedTwoTargets"));return}await E(e,t.cardCode||"feudal_lord",{targetUserId:t.targetUserId,secondTargetUserId:t.secondTargetUserId,cardInstanceId:t.cardInstanceId})}),document.querySelector('[data-act="confirmFeudalSwap"]')?.addEventListener("click",async()=>{await E(e,"feudal_lord",{shouldSwap:!0})}),document.querySelector('[data-act="confirmFeudalKeep"]')?.addEventListener("click",async()=>{await E(e,"feudal_lord",{shouldSwap:!1})}),document.querySelectorAll('[data-act="previewDiscardCard"]').forEach(t=>{t.addEventListener("click",()=>{se({ownerName:t.dataset.ownerName||"",cardName:t.dataset.cardName||"",cardCode:t.dataset.cardCode||"",cardValue:Number(t.dataset.cardValue||0)}),e()})}),document.querySelector('[data-act="sendGameChat"]')?.addEventListener("click",()=>{De(e),B()}),document.querySelector("#gameChatInput")?.addEventListener("keydown",t=>{t.key!=="Enter"||t.shiftKey||(t.preventDefault(),De(e),B())})},ut=(e,t)=>{a.socket?.readyState===WebSocket.OPEN||a.socket?.readyState===WebSocket.CONNECTING||(we(new WebSocket(a.wsUrl)),a.socket.onopen=()=>{P({type:"subscribe_lobbies"}),a.activeRoom?.roomId&&et(a.activeRoom.roomId)},a.socket.onmessage=async r=>{let s;try{s=JSON.parse(r.data)}catch{return}if(s?.type==="lobbies_event"){await e();const n=s?.data?.roomId,c=s?.data?.matchId,d=s?.data?.userId,l=s?.data?.username||s?.username||o("systemUnknownUser");if(n&&a.activeRoom?.roomId===n&&d&&a.user?.id===d&&(s?.event==="room_participant_kicked"||s?.event==="room_participant_banned")){O(),h("home");const g=s?.event==="room_participant_banned"?o("blockedNotice"):o("kickedFromRoomNotice");T(g),v(g),t();return}if(n&&a.activeRoom?.roomId===n){if(s?.event==="room_left"&&a.activeMatch?.matchId&&await de(a.activeMatch.matchId,t,{withTab:a.activeTab==="game",forceViewTab:a.activeTab==="game"&&me(),keepViewTab:a.activeTab==="game"}),s?.event==="room_match_started"&&c){const g=await de(c,t,{withTab:!0});g?.matchId&&a.activeTab==="game"&&g.status==="finished"&&h("roomManage");return}(s?.event==="room_settings_updated"||s?.event==="room_ownership_transferred"||s?.event==="room_participant_kicked"||s?.event==="room_participant_banned")&&(s?.data?.actorUserId&&s.data.actorUserId===a.user?.id||H(s.event,{username:l,timestamp:s?.timestamp}));try{S(await m(`/rooms/${encodeURIComponent(n)}`))}catch{O(),h("home"),T(o("roomClosedNotice")),v(o("roomClosedNotice"))}}(a.activeTab==="home"||a.activeTab==="lobbies"||a.activeTab==="profile"||a.activeTab==="roomManage"||a.activeTab==="game")&&t();return}if(s?.type==="room_event"&&s?.roomId&&a.activeRoom?.roomId===s.roomId){if(s?.event==="match_state_updated"){const n=s?.data?.matchId||a.activeMatch?.matchId;if(n){const c=await de(n,t,{withTab:a.activeTab==="game",forceViewTab:a.activeTab==="game"&&me(),keepViewTab:a.activeTab==="game"});c?.matchId&&le(c)}return}if(s?.event==="access_denied"){O(),h("home");const n=s?.data?.reason==="banned"?o("blockedNotice"):o("kickedFromRoomNotice");T(n),v(n),t();return}if(s?.event==="chat_message"&&s?.data?.text){const n=!!(s?.userId&&a.user?.id&&s.userId===a.user.id);pushRoomChatMessage({username:s?.data?.username||s?.username||"user",role:s?.data?.role||"player",userId:s?.userId||null,text:s?.data?.text||"",timestamp:s?.timestamp}),(a.activeTab==="roomManage"||a.activeTab==="game")&&(t(),a.activeTab==="roomManage"&&Ge(),a.activeTab==="game"&&(a.gameChatOpen?B():n||(He(),v(o("newChatMessageNotice"),"ok"))));return}try{S(await m(`/rooms/${encodeURIComponent(s.roomId)}`)),t()}catch{O(),h("home"),T(o("roomClosedNotice")),v(o("roomClosedNotice")),t()}return}if(s?.type==="presence"&&s?.roomId&&a.activeRoom?.roomId===s.roomId){if(s?.event==="joined"&&a.suppressOwnJoinPresence&&s?.username===a.user?.username){$e(!1);return}H(s?.event||"",{username:s?.username||o("systemUnknownUser"),timestamp:s?.timestamp}),(a.activeTab==="roomManage"||a.activeTab==="game")&&(t(),a.activeTab==="roomManage"&&Ge(),a.activeTab==="game"&&(a.gameChatOpen?B():He()))}},a.socket.onclose=()=>{we(null),window.setTimeout(()=>ut(e,t),3e3)})},Zt=()=>{if(!a.authOpen||a.user)return"";const e=a.authMode==="login";return`
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
  `},ea=()=>{if(!a.roomModalOpen||!a.user)return"";const e=a.roomModalMode==="create";return`
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
  `},ta=()=>!a.roomSettingsOpen||!a.activeRoom||a.activeRoom.ownerId!==a.user?.id?"":`
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
  `,aa=()=>a.joinLobbyModalOpen?`
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
  `:"",oa=()=>{if(!a.roomSwitchPromptOpen)return"";const e=a.roomSwitchPromptMode==="close"?o("closeAndJoinRoom"):o("leaveAndJoinRoom"),t=a.roomSwitchPromptMode==="close"?o("roomSwitchCloseHint",{target:a.roomSwitchTargetLabel||"room"}):o("roomSwitchLeaveHint",{target:a.roomSwitchTargetLabel||"room"});return`
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
  `},ra=()=>a.roomNoticeMessage?`<div class="room-notice">
    <span>${i(a.roomNoticeMessage)}</span>
    <button class="chip" data-act="closeRoomNotice">${o("close")}</button>
  </div>`:"",p=e=>`<span class="event-actor">${i(e)}</span>`,q=e=>`<span class="event-card">${i(e)}</span>`,u=e=>(Array.isArray(a.activeMatch?.players)?a.activeMatch.players:[]).find(r=>r.userId===e)?.username||e||o("systemUnknownUser"),Me=(e,t,r)=>`
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
`,Pe=(e,t,r="showdown-card")=>`
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
`,sa=()=>{const e=_(),t=new Map,r=d=>{const l=d?.code||"";l&&t.set(l,Number(t.get(l)||0)+1)};return(Array.isArray(e?.revealedCards)?e.revealedCards:[]).forEach(r),(Array.isArray(e?.players)?e.players:[]).forEach(d=>{(Array.isArray(d?.discard)?d.discard:[]).forEach(r)}),(Array.isArray(Re()?.hand)?Re().hand:[]).forEach(r),t},na=()=>{const e=sa();return Le.filter(t=>t.code==="guard"?!1:Number(e.get(t.code)||0)<Number(t.copies||0))},pt=e=>e<=2?7:e===3?6:e===4?5:4,ia=e=>{if(e.type==="system"||e.type==="round_summary")return i(e.text||"");if(e.type==="card_played"){const t=u(e.actorUserId);return`${p(t)}: ${o("playedCardEvent",{card:q(e.cardName||e.cardCode||"card")})}`}if(e.type==="guard_guess_hit"){const t=u(e.actorUserId),r=u(e.targetUserId);return o("guardHitEvent",{actor:p(t),target:p(r),card:q(e.guessedCardName||e.guessedCardCode||"card")})}if(e.type==="guard_guess_miss"){const t=u(e.actorUserId),r=u(e.targetUserId);return o("guardMissEvent",{actor:p(t),target:p(r),card:q(e.guessedCardName||e.guessedCardCode||"card")})}if(e.type==="guard_no_target"){const t=u(e.actorUserId);return o("guardNoTargetEvent",{actor:p(t)})}if(e.type==="scout_lock_applied"){const t=u(e.actorUserId),r=u(e.targetUserId);return o("scoutLockEvent",{actor:p(t),target:p(r)})}if(e.type==="scout_no_target"){const t=u(e.actorUserId);return o("scoutNoTargetEvent",{actor:p(t)})}if(e.type==="executioner_eliminate"){const t=u(e.actorUserId),r=u(e.targetUserId);return o("executionerEliminateEvent",{actor:p(t),target:p(r)})}if(e.type==="executioner_survive"){const t=u(e.actorUserId),r=u(e.targetUserId);return o("executionerSurviveEvent",{actor:p(t),target:p(r)})}if(e.type==="executioner_no_target"){const t=u(e.actorUserId);return o("executionerNoTargetEvent",{actor:p(t)})}if(e.type==="lady_protection_applied"){const t=u(e.actorUserId);return o("ladyProtectionEvent",{actor:p(t)})}if(e.type==="rebel_redraw"){const t=u(e.actorUserId),r=u(e.targetUserId);return o("rebelRedrawEvent",{actor:p(t),target:p(r),card:q(e.targetCardName||e.targetCardCode||o("systemUnknownUser"))})}if(e.type==="feudal_no_target"){const t=u(e.actorUserId);return o("feudalNoTargetEvent",{actor:p(t)})}if(e.type==="feudal_inspect"){const t=u(e.actorUserId),r=u(e.targetUserId),s=u(e.secondTargetUserId);return o("feudalInspectEvent",{actor:p(t),firstTarget:p(r),secondTarget:p(s)})}if(e.type==="feudal_swap"){const t=u(e.actorUserId),r=u(e.targetUserId),s=u(e.secondTargetUserId);return o("feudalSwapEvent",{actor:p(t),firstTarget:p(r),secondTarget:p(s)})}if(e.type==="feudal_keep"){const t=u(e.actorUserId),r=u(e.targetUserId),s=u(e.secondTargetUserId);return o("feudalKeepEvent",{actor:p(t),firstTarget:p(r),secondTarget:p(s)})}if(e.type==="auto_played_on_leave"){const t=u(e.actorUserId);return o("autoPlayedOnLeaveEvent",{actor:p(t),card:q(e.cardName||e.cardCode||"card")})}if(e.type==="auto_discard_on_turn"){const t=u(e.actorUserId);return o("autoDiscardOnTurnEvent",{actor:p(t),card:q(e.cardName||e.cardCode||"card")})}return i(e.text||o("unknownError"))},ca=()=>{const e=(Array.isArray(a.activeMatch?.players)?a.activeMatch.players:[]).slice().sort((r,s)=>Number(s.points??0)-Number(r.points??0)),t=pt(e.length);return`
    <div class="game-card">
      <h4>${o("gameLeaderboard")}</h4>
      <ul class="game-leaderboard">
        ${e.map(r=>`<li class="${r.userId===a.user?.id?"is-self":""}">
          <span>${i(r.username||r.userId)}${r.userId===a.user?.id?` <em>${i(o("youLabel"))}</em>`:""}</span>
          <b>${i(`${String(r.points??0)}/${String(t)}`)}</b>
        </li>`).join("")}
      </ul>
    </div>
  `},da=()=>{const t=[...Array.isArray(a.gameEventLog)?a.gameEventLog:[]].reverse();return`
    <div class="game-card">
      <h4>${o("gameEvents")}</h4>
      <div class="game-events">
        ${t.length?t.map(r=>`<div class="game-event-line ${r.type==="system"||r.type==="round_summary"?"system":""}">${ia(r)}</div>`).join(""):`<div class="game-muted">${o("gameNoEvents")}</div>`}
      </div>
    </div>
  `},la=()=>{const e=Array.isArray(a.roomChatMessages)?a.roomChatMessages:[];return`
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
  `},ma=()=>{if(!a.gameCardPreview)return"";const e=a.gameCardPreview;return`
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
  `},ua=()=>{const e=a.gameCardPlayPrompt;if(!e||e.cardCode!=="guard"&&e.cardCode!=="scout"&&e.cardCode!=="executioner"&&e.cardCode!=="rebel"&&e.cardCode!=="feudal_lord")return"";const t=Qt(e.guessedCardCode),r=e.cardCode==="rebel"?Ee({includeSelf:!0}):ot(),s=e.cardCode==="guard",n=e.cardCode==="scout",c=e.cardCode==="executioner",d=e.cardCode==="feudal_lord",l=na(),g=o(s?"guardPromptTitle":n?"scoutPromptTitle":c?"executionerPromptTitle":d?"feudalPromptTitle":"rebelPromptTitle"),N=o(s?"guardPromptHint":n?"scoutPromptHint":c?"executionerPromptHint":d?"feudalPromptHint":"rebelPromptHint");return`
    <div class="game-card-play-prompt-shell">
      <div class="game-card-play-prompt">
        <div class="game-card-play-prompt-head">
          <div>
            <h3>${g}</h3>
            <p>${N}</p>
          </div>
          <button class="chip" data-act="closeGameCardPlayPrompt">${o("close")}</button>
        </div>
        <div class="game-card-play-prompt-section">
          <span class="game-card-play-prompt-label">${o(d?"feudalPromptTargets":"guardPromptTarget")}</span>
          <div class="game-card-play-prompt-grid">
            ${r.map(w=>`
              <button
                class="game-prompt-option ${e.targetUserId===w.userId||e.secondTargetUserId===w.userId?"selected":""}"
                data-act="${d?"selectFeudalTarget":"selectGuardTarget"}"
                data-user-id="${i(w.userId)}"
              >
                <strong>
                  ${i(w.username||w.userId)}
                  ${w.userId===a.user?.id?` <em>${i(o("youLabel"))}</em>`:""}
                </strong>
                <span>${o("gameDiscardCount")}: ${i(String((w.discard||[]).length))}</span>
              </button>
            `).join("")}
          </div>
        </div>
        ${s?`<div class="game-card-play-prompt-section">
          <span class="game-card-play-prompt-label">${o("guardPromptGuess")}</span>
          <div class="game-card-play-prompt-grid cards">
            ${l.map(w=>`
              <button
                class="game-prompt-option card ${e.guessedCardCode===w.code?"selected":""}"
                data-act="selectGuardGuess"
                data-card-code="${i(w.code)}"
              >
                <b>${i(String(w.value))}</b>
                <span>${i(w.name)}</span>
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
  `},pa=()=>{const e=_()?.pendingDecision||null;if(!e||e.type!=="feudal_lord_swap")return"";const t=u(e.targetUserId),r=u(e.secondTargetUserId);return`
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
            ${Pe(e.targetCard,t,"showdown-card prompt-showdown-card")}
          </div>
          <div class="game-prompt-option card reveal-card">
            <strong>${i(r)}</strong>
            ${Pe(e.secondTargetCard,r,"showdown-card prompt-showdown-card")}
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
  `},va=()=>{const e=_(),t=Array.isArray(e?.revealedCards)?e.revealedCards:[];return t.length===0?"":`
    <aside class="game-revealed-rail" aria-label="revealed-cards">
      ${t.map((r,s)=>Me(r,"",s)).join("")}
    </aside>
  `},ha=()=>{const e=Array.isArray(a.activeMatch?.players)?a.activeMatch.players:[],t=_(),r=Array.isArray(t?.players)?t.players:[],s=e.filter(l=>l.userId!==a.user?.id),n=Math.max(2,e.length||2),c={2:["seat-top"],3:["seat-top-left","seat-top-right"],4:["seat-left-mid","seat-top","seat-right-mid"],5:["seat-left-top","seat-top","seat-right-top","seat-right-bottom"],6:["seat-left-top","seat-left-bottom","seat-top","seat-right-top","seat-right-bottom"]},d=c[n]||c[6];return s.map((l,g)=>{const N=r.find(j=>j.userId===l.userId),w=t?.activePlayerId===l.userId,te=Array.isArray(N?.discard)?N.discard:[],$=Array.isArray(N?.hand)?N.hand:[],vt=!!N?.protectedFromEffects,ht=t?.status==="finished"&&$.length>0;return`
      <article class="table-player ${d[g]||"seat-top"} ${w?"active":""}">
        <div class="table-player-name">
          ${i(l.username||l.userId)}
          ${vt?`<span class="table-player-status protection">${i(o("protectedBadge"))}</span>`:""}
        </div>
        <div class="table-player-meta">
          <span class="table-player-discard-count">${o("gameDiscardCount")}: ${i(String(te.length))}</span>
          <div class="table-player-discard discard-stack">
            ${te.map((j,gt)=>Me(j,l.username||l.userId,gt)).join("")}
          </div>
          ${ht?`
            <div class="table-player-showdown">
              <div class="table-player-showdown-cards">
                ${$.map(j=>Pe(j,l.username||l.userId)).join("")}
              </div>
            </div>
          `:""}
        </div>
      </article>
    `}).join("")},ga=()=>{if(a.activeMatch?.status!=="finished")return"";const e=(Array.isArray(a.activeMatch?.players)?a.activeMatch.players:[]).slice().sort((c,d)=>Number(d.points??0)-Number(c.points??0)),t=e.find(c=>c.userId===a.activeMatch?.winnerUserId)||null,r=pt(e.length),s=a.activeRoom?.ownerId===a.user?.id,n=s&&Number(a.activeRoom?.participants?.length||0)===1;return`
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
  `},ya=()=>{const e=Re(),t=Array.isArray(e?.hand)?e.hand:[],r=Array.isArray(e?.discard)?e.discard:[],s=at(),n=e?.lockedCardInstanceId||null,c=e?.lockedCardCode||null,d=!!e?.protectedFromEffects;return`
    <section class="game-hand-dock">
      <div class="game-my-table">
        <div class="game-my-table-head">
          <span class="game-my-table-label">
            ${o("gameMyTable")}
            ${d?`<span class="table-player-status protection">${i(o("protectedBadge"))}</span>`:""}
          </span>
          <span class="game-turn-badge ${s?"turn":"wait"}">${o(s?"gameYourTurn":"gameWaitTurn")}</span>
        </div>
        <div class="game-my-table-cards discard-stack discard-stack-centered">
          ${r.length?r.map((l,g)=>Me(l,o("gameMyTable"),g)).join(""):`<span class="game-muted">${o("gameNoCardsOnTable")}</span>`}
        </div>
      </div>
      <div class="game-hand-cards">
        ${t.map(l=>{const g=n&&l.instanceId===n||!n&&c&&l.code===c;return`
          <button
            class="game-card-button ${s?"":"muted"} ${g?"locked":""}"
            data-act="playCard"
            data-card-code="${i(l.code)}"
            data-card-instance-id="${i(l.instanceId||"")}"
            data-card-locked="${i(String(!!g))}"
          >
            <span class="game-card-value">${i(String(l.value??0))}</span>
            <span class="game-card-name">${i(l.name||l.code)}</span>
            ${g?`<span class="game-card-lock-badge">${i(o("cardLockedBadge"))}</span>`:""}
          </button>
        `}).join("")}
      </div>
    </section>
  `},ba=()=>{if(!a.activeMatch?.matchId)return`<section class="game-empty">${o("gameNoActiveMatch")}</section>`;const e=_(),t=Math.max(2,Array.isArray(a.activeMatch?.players)?a.activeMatch.players.length:2),r=a.activeMatch?.lastRoundSummary,n=!!r?.winnerNames?.length&&a.activeMatch?.status==="pending"&&e?.status==="finished"?o("roundWinnerSummary",{round:r.roundNumber,winners:r.winnerNames.join(", ")}):"";return`
    <section class="game-layout">
      <main class="game-table-wrap">
        ${n?`<div class="game-summary-banner round-summary-temp">${i(n)}</div>`:""}
        <div class="game-table table-layout-${i(String(t))}">
          ${va()}
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
          ${ha()}
        </div>
        ${ya()}
      </main>
      <aside class="game-sidebar">
        ${ca()}
        ${da()}
      </aside>
      ${la()}
      ${ga()}
      ${ma()}
      ${ua()}
      ${pa()}
    </section>
  `},fa=e=>{const t=Number(e||Date.now()),r=Number.isFinite(t)?new Date(t*(t<1e10?1e3:1)):new Date;return new Intl.DateTimeFormat(a.lang==="en"?"en-US":"ru-RU",{hour:"2-digit",minute:"2-digit"}).format(r)},wa=(e,t="?")=>String(e||t).trim().charAt(0).toUpperCase()||t,ke=e=>e.isPublic&&e.hasPassword?o("roomAccessPublicProtected"):e.isPublic?o("roomAccessPublicOpen"):e.hasPassword?o("roomAccessPrivateProtected"):o("roomAccessPrivateCodeOnly"),Ia=()=>`
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
`,Ra=()=>{const e=a.homeLobbies;return`
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
              <p>${ke(t)}</p>
              <p>${o("roomOwnerName")}: ${i(t.ownerUsername||t.ownerUserId||"—")}</p>
            </div>
            <div class="lobby-count">👥 ${t.playersCount} / ${t.maxPlayers||6}</div>
            <button class="secondary" data-act="joinLobby" data-room-id="${i(t.roomId)}" data-room-name="${i(t.name)}" data-room-owner-id="${i(t.ownerUserId||"")}" data-room-has-password="${t.hasPassword?"1":"0"}">${o("joinLobby")}</button>
          </article>
        `).join("")}
      </div>
    </section>
  `},Sa=()=>`
  ${Ia()}
  ${Ra()}
`,Ca=()=>`
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
          <p>${ke(e)}</p>
          <p>${o("roomOwnerName")}: ${i(e.ownerUsername||e.ownerUserId||"—")}</p>
        </div>
        <div class="lobby-count">👥 ${e.playersCount} / ${e.maxPlayers||6}</div>
        <button class="secondary" data-act="joinLobby" data-room-id="${i(e.roomId)}" data-room-name="${i(e.name)}" data-room-owner-id="${i(e.ownerUserId||"")}" data-room-has-password="${e.hasPassword?"1":"0"}">${o("joinLobby")}</button>
      </article>
    `).join("")}
  </div>
`,Pa=()=>{if(!a.user)return"";const e=a.myRooms||[];return`
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
  `},$a=()=>a.user?`
    <h2>${o("profileTitle")}</h2>
    <div class="grid">
      <article>
        <h3>${o("profileEdit")}</h3>
        <div class="stack">
          <input id="profileUsername" value="${i(a.user.username)}" />
          <button class="primary" data-act="saveProfile">${o("saveProfile")}</button>
        </div>
      </article>
      ${Pa()}
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
  `:`<h2>${o("profileTitle")}</h2><div class="status">${o("needAuthProfile")}</div>`,Je=e=>{const t=a.user?.id===e.userId,r=a.user?.id&&a.activeRoom?.ownerId===a.user.id,s=r&&e.userId!==a.activeRoom?.ownerId,n=r&&e.role==="player"&&e.userId!==a.activeRoom?.ownerId,c=r&&e.role==="player"&&e.userId!==a.activeRoom?.ownerId,d={owner:o("roleOwnerShort"),player:o("rolePlayerShort"),spectator:o("roleSpectatorShort")};return`
    <li class="participant-item">
      <div class="participant-row">
        <div class="participant-main">
          <span class="participant-avatar role-${i(e.role)}">${i(wa(e.username,"U"))}</span>
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
  `},Ta=()=>{if(!a.activeRoom)return"";const e=Array.isArray(a.activeRoom.participants)?a.activeRoom.participants:[],t=e.filter($=>$.role!=="spectator"),r=e.filter($=>$.role==="spectator"),s=!!a.user?.id&&a.user.id===a.activeRoom.ownerId,n=e.find($=>$.userId===a.user?.id),c=n?.role==="owner"||n?.role==="player",d=!!a.activeMatch?.matchId,l=d&&a.activeMatch?.status!=="finished",g=d&&a.activeMatch?.status==="finished"&&(Array.isArray(a.activeMatch?.players)&&a.activeMatch.players.some($=>$.userId===a.user?.id)||n?.role==="spectator"),N=l||g,w=a.activeRoom.isPublic?o("visibilityPublic"):o("visibilityPrivate"),te=`${t.length} / ${a.activeRoom.maxPlayers||6}`;return`
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
          <div class="room-stat-main">${w}</div>
        </div>
        <div class="room-stat-card">
          <span>${o("roomAccessLabel")}</span>
          <div class="room-stat-main">${ke(a.activeRoom)}</div>
        </div>
        <div class="room-stat-card">
          <span>${o("roomStatsLabel")}</span>
          <div class="room-stat-main">${te}</div>
        </div>
      </div>
      <div class="room-lists">
        <div class="room-list-card">
          <h4>${o("roomParticipants")} (${t.length})</h4>
          <ul class="participant-list">${t.map(Je).join("")}</ul>
        </div>
        <div class="room-list-card">
          <h4>${o("roomSpectators")} (${r.length})</h4>
          <ul class="participant-list">${r.map(Je).join("")}</ul>
        </div>
      </div>
      <div class="stack">
        <h4>${o("roomActions")}</h4>
        <div class="room-actions">
          ${c?`<button class="secondary" data-act="readyRoom">${n?.ready?o("markNotReady"):o("markReady")}</button>`:""}
          ${s?`<button class="primary" data-act="startGame">${l?o("openActiveGame"):a.activeMatch?.status==="finished"?o("gamePlayAgain"):o("startGame")}</button>`:""}
          ${!s&&N?`<button class="secondary" data-act="openGame">${a.activeMatch?.status==="finished"?o("openMatchResults"):o("openActiveGame")}</button>`:""}
          ${s?`<button class="secondary" data-act="openRoomSettings">${o("openRoomSettings")}</button>`:""}
          <button class="chip" data-act="leaveRoom">${o(s?"closeOwnedRoom":"leaveRoom")}</button>
        </div>
      </div>
      <div id="roomStatus" class="status">${i(a.roomStatusMessage||"")}</div>
    </article>
  `},Aa=()=>a.activeRoom?`
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
                <span class="chat-time">${i(fa(e.timestamp))}</span>
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
  `:"",Na=()=>{if(a.activeTab==="game")return`
    <main class="layout dark game-mode">
      <header class="game-topbar">
        <div class="game-topbar-brand">${o("appName")}</div>
        <div class="game-topbar-actions">
          <button class="chip" data-act="exitGame">${o("logout")}</button>
        </div>
      </header>
      ${ba()}
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

    ${ra()}

    <section class="panel ${a.activeTab==="home"?"":"hidden"} cinematic-panel">${Sa()}</section>
    <section class="panel ${a.activeTab==="lobbies"?"":"hidden"} cinematic-panel">${Ca()}</section>
    <section class="panel ${a.activeTab==="roomManage"?"":"hidden"} cinematic-panel">${Ta()}${Aa()}</section>
    <section class="panel ${a.activeTab==="profile"?"":"hidden"} cinematic-panel">${$a()}</section>

    ${Zt()}
    ${ea()}
    ${ta()}
    ${aa()}
    ${oa()}
    <div id="toastContainer" class="toast-container"></div>
  </main>`},Ea=(e,t,r)=>{const s=()=>{e&&(r(),e.innerHTML=Na(),Wt(s),a.activeTab==="home"&&mt(s),a.activeTab==="lobbies"&&Kt(s),a.activeTab==="profile"&&zt(s),a.activeTab==="roomManage"&&Vt(s),a.activeTab==="game"&&Xt(s),a.authOpen&&!a.user&&Yt(s,t),a.roomChatInputShouldFocus&&a.activeTab==="roomManage"&&window.requestAnimationFrame(()=>{const n=document.querySelector("#roomChatInput");n instanceof HTMLInputElement&&(n.focus(),n.setSelectionRange(n.value.length,n.value.length)),Ke(!1)}))};return s},La=async()=>{const e=document.querySelector("#app"),t=Ea(e,je,ge);await je(),await Ht(),await A("home",4),await A("catalog",a.lobbyFilters.limit,a.lobbyFilters.password),ge(),ut(async()=>{await A("home",4),await A("catalog",a.lobbyFilters.limit,a.lobbyFilters.password),ge()},t),t()};await La();
//# sourceMappingURL=index-BD_fmzm6.js.map
