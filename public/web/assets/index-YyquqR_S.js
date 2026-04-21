(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const b of i.addedNodes)b.tagName==="LINK"&&b.rel==="modulepreload"&&r(b)}).observe(document,{childList:!0,subtree:!0});function s(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(n){if(n.ep)return;n.ep=!0;const i=s(n);fetch(n.href,i)}})();const U=window.location.hostname==="0.0.0.0"||window.location.hostname===""?"localhost":window.location.hostname,q=window.location.protocol==="https:"?"wss":"ws",e={apiBase:window.location.origin,wsUrl:`${q}://${U}:8081`,token:localStorage.getItem("stories_token")||"",user:null,activeRoom:null,activeTab:"home",homeLobbies:[],lobbyCatalog:[],lobbyFilters:{visibility:"all",password:"all",limit:20},socket:null,lang:localStorage.getItem("stories_lang")||"ru",authOpen:!1,authMode:"login",roomModalOpen:!1,roomModalMode:"create",joinLobbyModalOpen:!1,joinLobbyRoomId:"",joinLobbyOwnerUserId:"",joinLobbyNeedsPassword:!1,joinLobbyPassword:"",roomChatMessages:[],homeStatusMessage:"",myRooms:[],roomNoticeMessage:""},P={ru:{appTag:"Stories",title:"Control Center",subtitle:"Комнаты, профиль, админка и live debug в одном месте.",login:"Вход",register:"Регистрация",logout:"Выйти",notAuthorized:"Не авторизованы",signedAs:"Вы вошли как",navHome:"Комнаты",navProfile:"Профиль",navLobbies:"Лобби",navAdmin:"Админ",navDebug:"Debug",openAuth:"Войти / Регистрация",close:"Закрыть",authTitle:"Авторизация",authHint:"Откройте аккаунт или войдите в существующий.",username:"Имя пользователя",password:"Пароль",createAccount:"Создать аккаунт",loginSuccess:"Успешный вход.",registerSuccess:"Аккаунт создан и выполнен вход.",homeNeedAuth:"Выполните вход для доступа к комнатам.",roomsTitle:"Комнаты",createRoom:"Создать комнату",roomName:"Название комнаты",connectCode:"Войти по invite-коду",connect:"Подключиться",spectator:"Зайти как spectator",ready:"",roomCreated:"Комната создана. Invite code:",roomJoinSuccess:"Подключение успешно. Room:",profileTitle:"Профиль пользователя",profileEdit:"Редактирование",newPassword:"Новый пароль (опционально)",saveProfile:"Сохранить профиль",stats:"Статистика",needAuthProfile:"Сначала авторизуйтесь.",profileUpdated:"Профиль обновлен.",passwordChanged:"Пароль успешно изменён.",currentPassword:"Текущий пароль",nextPassword:"Новый пароль",changePassword:"Сменить пароль",wins:"Победы",losses:"Поражения",vt:"Victory tokens",elim3:"Eliminated with 3",adminTitle:"Админ-панель (RBAC)",deckLoad:"Загрузка колоды",loadCards:"Показать cards",loadEffects:"Показать effects",patchCard:"Patch card",cardCode:"cardCode",newName:"Новое имя",newText:"Новый текст",valueOrEmpty:"value (или пусто)",effectKey:"effectKey",enabled:"enabled",applyPatch:"Применить PATCH",cardsLoaded:"Cards для {deck} загружены.",effectsLoaded:"Effects загружены.",cardUpdated:"Карта обновлена.",debugTitle:"Debug",oldInterface:"Техпанель для API и WebSocket.",checkHealth:"Проверить /health",waitingRequest:"Ожидание запроса…",websocket:"WebSocket",connectWs:"Подключиться",subscribe:"Подписаться",sendPing:"Ping",sendEvent:"Отправить room_event",wsNotConnected:"Не подключено",wsConnected:"WebSocket подключен",wsClosed:"WebSocket закрыт",wsError:"WebSocket ошибка",connectSocketFirst:"Сначала подключите сокет",healthError:"Ошибка",unknownError:"Неизвестная ошибка",httpError:"Ошибка HTTP {status}",invalidCredentials:"Неверный логин или пароль.",currentPasswordInvalid:"Текущий пароль указан неверно.",userExists:"Такой username уже занят.",unauthorized:"Требуется авторизация.",forbidden:"Недостаточно прав.",roomNotFound:"Комната не найдена.",inviteInvalid:"Некорректный invite-код.",validationFailed:"Проверьте корректность введенных данных.",serverUnavailable:"Сервер временно недоступен. Повторите позже.",invalidUrl:"Некорректный URL.",roomPasswordRequired:"Для входа в это лобби нужен пароль.",roomPasswordInvalid:"Неверный пароль лобби.",ownerAlreadyHasRoom:"У вас уже есть активная комната. Закройте её перед созданием новой.",navControl:"Control Panel",heroTitle:"Stories: project-visual landing",heroSubtitle:"Создавайте комнаты и подключайтесь к игре за секунды.",heroCreate:"Создать комнату",heroJoin:"Присоединиться",roomDetails:"Текущая комната",roomCode:"Код приглашения",roomOwner:"Владелец",roomOwnerName:"Ник владельца",roomParticipants:"Участники",roomSpectators:"Зрители",roomActions:"Действия с комнатой",leaveRoom:"Покинуть комнату",closeOwnedRoom:"Закрыть комнату",refreshRoom:"Обновить состояние",markReady:"Я готов",markNotReady:"Не готов",noFieldsToUpdate:"Нет полей для обновления.",userNotFound:"Пользователь не найден.",onlyOwnerCanStartGame:"Запустить игру может только владелец комнаты.",needReadyPlayers:"Нужно минимум 2 готовых игрока.",userNotInRoom:"Пользователь не находится в комнате.",gameNotStarted:"Игра ещё не началась.",notYourTurn:"Сейчас не ваш ход.",cardCodeRequired:"Нужно указать карту для действия.",cardNotInHand:"Карты нет в руке.",inviteCodeGenerationFailed:"Не удалось сгенерировать invite-код.",deckNotFound:"Колода не найдена.",cardNotFound:"Карта не найдена.",adminRoleRequired:"Требуется роль администратора.",onlyOwnerCanManageRoom:"Только владелец может управлять комнатой.",ownerCannotBeRemoved:"Владельца нельзя кикнуть или заблокировать.",onlyPlayersCanBeKicked:"Кик доступен только для игроков.",inviteRotateCooldown:"Invite-код можно пересоздавать не чаще одного раза в минуту.",startGame:"Запустить игру",youLabel:"вы",authRequiredAction:"Для этого действия войдите в аккаунт.",switchToLogin:"Уже есть аккаунт? Войти",switchToRegister:"Нет аккаунта? Регистрация",themeDark:"Тёмная",themeLight:"Светлая",controlPanelTitle:"Control Panel",controlPanelHint:"Только для администраторов: управление данными и live debug.",lobbyTitle:"Список лобби",lobbyHint:"Фильтруйте публичные и закрытые лобби.",visibilityAll:"Все",visibilityPublic:"Публичные",visibilityPrivate:"Закрытые",passwordAll:"Любые",passwordWith:"С паролем",passwordWithout:"Без пароля",loadLobbies:"Обновить список",lobbyNoItems:"Лобби не найдены",lobbyHasPassword:"Пароль",lobbyNoPassword:"Без пароля",joinLobby:"Войти в лобби",roomPassword:"Пароль лобби (если нужен)",availableRooms:"Доступные комнаты",myRooms:"Мои комнаты",openRoom:"Открыть",joinHint:"Введите код приглашения и присоединитесь к комнате.",statusReady:"Статус: готов.",statusNotReady:"Статус: не готов.",joinPasswordHint:"Введите пароль лобби для входа.",joinWithoutPasswordHint:"Это лобби без пароля. Подтвердите вход.",requiredField:"Заполните обязательное поле.",inviteCodeInvalid:"Введите корректный invite-код (6 символов).",roomManage:"Управление комнатой",roomManageTitle:"Настройки комнаты",saveRoomSettings:"Сохранить настройки",regenerateInvite:"Пересоздать код приглашения",kickPlayer:"Кик",banPlayer:"Блок",roomChat:"Чат комнаты",chatPlaceholder:"Введите сообщение...",send:"Отправить",roomSettingsSaved:"Настройки комнаты обновлены.",inviteRegenerated:"Invite-код обновлён.",blockedNotice:"Вы заблокированы в этой комнате.",kickedFromRoomNotice:"Вы были исключены из комнаты.",roleOwner:"Владелец",rolePlayer:"Игрок",roleSpectator:"Зритель",roleSystem:"Система",roomClosedNotice:"Комната была закрыта владельцем.",roomManageReadonly:"Только владелец может менять настройки комнаты."},en:{appTag:"Stories",title:"Control Center",subtitle:"Rooms, profile, admin panel and live debug in one place.",login:"Sign in",register:"Sign up",logout:"Logout",notAuthorized:"Not authorized",signedAs:"Signed in as",navHome:"Rooms",navProfile:"Profile",navLobbies:"Lobbies",navAdmin:"Admin",navDebug:"Debug",openAuth:"Login / Register",close:"Close",authTitle:"Authentication",authHint:"Create an account or sign in.",username:"Username",password:"Password",createAccount:"Create account",loginSuccess:"Signed in successfully.",registerSuccess:"Account created and signed in.",homeNeedAuth:"Sign in to access rooms.",roomsTitle:"Rooms",createRoom:"Create room",roomName:"Room name",connectCode:"Join by invite code",connect:"Connect",spectator:"Join as spectator",ready:"",roomCreated:"Room created. Invite code:",roomJoinSuccess:"Connected successfully. Room:",profileTitle:"User profile",profileEdit:"Edit profile",newPassword:"New password (optional)",saveProfile:"Save profile",stats:"Stats",needAuthProfile:"Sign in first.",profileUpdated:"Profile updated.",passwordChanged:"Password changed successfully.",currentPassword:"Current password",nextPassword:"New password",changePassword:"Change password",wins:"Wins",losses:"Losses",vt:"Victory tokens",elim3:"Eliminated with 3",adminTitle:"Admin panel (RBAC)",deckLoad:"Load deck",loadCards:"Show cards",loadEffects:"Show effects",patchCard:"Patch card",cardCode:"cardCode",newName:"New name",newText:"New text",valueOrEmpty:"value (or empty)",effectKey:"effectKey",enabled:"enabled",applyPatch:"Apply PATCH",cardsLoaded:"Cards for {deck} loaded.",effectsLoaded:"Effects loaded.",cardUpdated:"Card updated.",debugTitle:"Debug",oldInterface:"Technical panel for API and WebSocket.",checkHealth:"Check /health",waitingRequest:"Waiting for request…",websocket:"WebSocket",connectWs:"Connect",subscribe:"Subscribe",sendPing:"Ping",sendEvent:"Send room_event",wsNotConnected:"Not connected",wsConnected:"WebSocket connected",wsClosed:"WebSocket closed",wsError:"WebSocket error",connectSocketFirst:"Connect socket first",healthError:"Error",unknownError:"Unknown error",httpError:"HTTP error {status}",invalidCredentials:"Invalid username or password.",currentPasswordInvalid:"Current password is invalid.",userExists:"This username is already taken.",unauthorized:"Authorization required.",forbidden:"Not enough permissions.",roomNotFound:"Room not found.",inviteInvalid:"Invalid invite code.",validationFailed:"Please check input values.",serverUnavailable:"Server is temporarily unavailable. Try again later.",invalidUrl:"Invalid URL.",roomPasswordRequired:"Lobby password is required.",roomPasswordInvalid:"Invalid lobby password.",ownerAlreadyHasRoom:"You already have an active room. Close it before creating a new one.",navControl:"Control Panel",heroTitle:"Stories: project visual landing",heroSubtitle:"Create rooms and join matches in seconds.",heroCreate:"Create room",heroJoin:"Join room",roomDetails:"Current room",roomCode:"Invite code",roomOwner:"Owner",roomOwnerName:"Owner name",roomParticipants:"Participants",roomSpectators:"Spectators",roomActions:"Room actions",leaveRoom:"Leave room",closeOwnedRoom:"Close room",refreshRoom:"Refresh state",markReady:"Mark ready",markNotReady:"Mark not ready",noFieldsToUpdate:"No fields to update.",userNotFound:"User not found.",onlyOwnerCanStartGame:"Only owner can start game.",needReadyPlayers:"Need at least 2 ready players.",userNotInRoom:"User is not in room.",gameNotStarted:"Game not started.",notYourTurn:"Not your turn.",cardCodeRequired:"Card code is required for this action.",cardNotInHand:"Card not in hand.",inviteCodeGenerationFailed:"Failed to generate invite code.",deckNotFound:"Deck not found.",cardNotFound:"Card not found.",adminRoleRequired:"Admin role required.",onlyOwnerCanManageRoom:"Only room owner can manage room.",ownerCannotBeRemoved:"Owner cannot be kicked or blocked.",onlyPlayersCanBeKicked:"Only players can be kicked.",inviteRotateCooldown:"Invite code can be regenerated only once per minute.",startGame:"Start game",youLabel:"you",authRequiredAction:"Please sign in to continue.",switchToLogin:"Already have an account? Sign in",switchToRegister:"No account yet? Sign up",themeDark:"Dark",themeLight:"Light",controlPanelTitle:"Control Panel",controlPanelHint:"Admin-only area for content management and live debug.",lobbyTitle:"Lobby list",lobbyHint:"Filter public and private lobbies.",visibilityAll:"All",visibilityPublic:"Public",visibilityPrivate:"Private",passwordAll:"Any",passwordWith:"With password",passwordWithout:"Without password",loadLobbies:"Refresh list",lobbyNoItems:"No lobbies found",lobbyHasPassword:"Password",lobbyNoPassword:"No password",joinLobby:"Join lobby",roomPassword:"Lobby password (if required)",availableRooms:"Available rooms",myRooms:"My rooms",openRoom:"Open",joinHint:"Enter invite code and join a room.",statusReady:"Status: ready.",statusNotReady:"Status: not ready.",joinPasswordHint:"Enter lobby password to join.",joinWithoutPasswordHint:"This lobby has no password. Confirm join.",requiredField:"Please fill in the required field.",inviteCodeInvalid:"Enter a valid invite code (6 characters).",roomManage:"Room management",roomManageTitle:"Room settings",saveRoomSettings:"Save settings",regenerateInvite:"Regenerate invite code",kickPlayer:"Kick",banPlayer:"Block",roomChat:"Room chat",chatPlaceholder:"Type a message...",send:"Send",roomSettingsSaved:"Room settings updated.",inviteRegenerated:"Invite code regenerated.",blockedNotice:"You are blocked in this room.",kickedFromRoomNotice:"You were kicked from the room.",roleOwner:"Owner",rolePlayer:"Player",roleSpectator:"Spectator",roleSystem:"System",roomClosedNotice:"The room was closed by the owner.",roomManageReadonly:"Only the owner can change room settings."}},t=(a,o={})=>{const s=P[e.lang]?.[a]??P.ru[a]??a;return Object.entries(o).reduce((r,[n,i])=>r.replaceAll(`{${n}}`,String(i)),s)},D=()=>e.token?{Authorization:`Bearer ${e.token}`}:{},j=(a,o)=>{const s=String(a||"").toUpperCase(),r={INVALID_CREDENTIALS:"invalidCredentials",USER_EXISTS:"userExists",CURRENT_PASSWORD_INVALID:"currentPasswordInvalid",PASSWORD_CHANGED:"passwordChanged",NO_FIELDS_TO_UPDATE:"noFieldsToUpdate",USER_NOT_FOUND:"userNotFound",MISSING_BEARER_TOKEN:"unauthorized",INVALID_TOKEN_FORMAT:"unauthorized",INVALID_TOKEN_SIGNATURE:"unauthorized",INVALID_TOKEN_PAYLOAD:"unauthorized",INVALID_TOKEN_CLAIMS:"unauthorized",TOKEN_EXPIRED:"unauthorized",UNAUTHORIZED:"unauthorized",FORBIDDEN:"forbidden",INVITE_CODE_NOT_FOUND:"inviteInvalid",INVALID_INVITE_CODE:"inviteInvalid",OWNER_ALREADY_HAS_ROOM:"ownerAlreadyHasRoom",ROOM_PASSWORD_REQUIRED:"roomPasswordRequired",ROOM_PASSWORD_INVALID:"roomPasswordInvalid",ONLY_OWNER_CAN_START_GAME:"onlyOwnerCanStartGame",NEED_READY_PLAYERS:"needReadyPlayers",USER_NOT_IN_ROOM:"userNotInRoom",ROOM_NOT_FOUND:"roomNotFound",GAME_NOT_STARTED:"gameNotStarted",NOT_YOUR_TURN:"notYourTurn",CARD_CODE_REQUIRED:"cardCodeRequired",CARD_NOT_IN_HAND:"cardNotInHand",INVITE_CODE_GENERATION_FAILED:"inviteCodeGenerationFailed",DECK_NOT_FOUND:"deckNotFound",CARD_NOT_FOUND:"cardNotFound",ADMIN_ROLE_REQUIRED:"adminRoleRequired",ONLY_OWNER_CAN_MANAGE_ROOM:"onlyOwnerCanManageRoom",OWNER_CANNOT_BE_REMOVED:"ownerCannotBeRemoved",ONLY_PLAYERS_CAN_BE_KICKED:"onlyPlayersCanBeKicked",USER_BLOCKED_IN_ROOM:"blockedNotice",INVITE_CODE_ROTATE_COOLDOWN:"inviteRotateCooldown",VALIDATION_ERROR:"validationFailed",UNKNOWN_ERROR:"unknownError"};return r[s]?r[s]:o===401?"unauthorized":o===403?"forbidden":o>=500?"serverUnavailable":null},F=(a,o,s)=>{const r=o?.message||o?.errorMessage||o?.error||s||"";if(String(o?.errorCode||o?.code||"").toUpperCase()==="UNKNOWN_ERROR"&&/must|invalid|required|password|username/i.test(String(r)))return{key:"validationFailed",message:String(r)};const n=j(o?.code||o?.errorCode,a);return n?{key:n,message:t(n)}:{key:null,message:r||t("httpError",{status:a})}},c=async(a,o={})=>{let s;try{s=await fetch(`${e.apiBase.replace(/\/$/,"")}${a}`,{...o,headers:{"Content-Type":"application/json",...o.headers||{},...D(),Locale:e.lang}})}catch{throw new Error(t("serverUnavailable"))}const r=await s.text();let n={};try{n=r?JSON.parse(r):{}}catch{n={}}if(!s.ok){const i=F(s.status,n,r),b=new Error(i.message||t("unknownError"));throw b.code=i.key,b.status=s.status,b}return n},l=a=>{const o=document.createElement("div");return o.textContent=String(a??""),o.innerHTML},d=(a,o=256)=>{const s=document.querySelector(a);return s?String(s.value??"").trim().slice(0,o):""},N=(a,o)=>{let s;try{s=new URL(String(a||"").trim())}catch{throw new Error(t("invalidUrl"))}if(!o.includes(s.protocol))throw new Error(t("invalidUrl"));return s.toString().replace(/\/$/,"")},v="__lobbies__",u=(a,o,s=!1)=>{const r=document.querySelector(`#${a}`);r&&(r.textContent=o,r.classList.toggle("ok",s))},y=a=>{const o=document.querySelector("#debugLog");if(!o)return;const s=document.createElement("div");s.textContent=`[${new Date().toLocaleTimeString()}] ${typeof a=="string"?a:JSON.stringify(a)}`,o.prepend(s)},h=(a,o="error")=>{const s=document.querySelector("#toastContainer");if(!s||!a)return;const r=document.createElement("div");r.className=`toast ${o}`,r.textContent=a,s.prepend(r),window.setTimeout(()=>r.remove(),4200)},m=(a,o)=>{const s=o?.message||t("unknownError");u(a,s),h(s)},$=a=>{const o=document.querySelector(a);o&&(o.classList.remove("input-error"),o.removeAttribute("aria-invalid"))},I=(a,o)=>{const s=document.querySelector(a);s&&(s.classList.add("input-error"),s.setAttribute("aria-invalid","true"),s.focus(),h(o))},g=a=>{!e.socket||e.socket.readyState!==WebSocket.OPEN||e.socket.send(JSON.stringify({...a,token:e.token||void 0}))},p=(a,o={})=>{g({type:"lobbies_event",event:a,data:o})},f=a=>{a&&g({type:"subscribe_room",roomId:a})},A=(a,o)=>{e.socket?.readyState===WebSocket.OPEN||e.socket?.readyState===WebSocket.CONNECTING||(e.socket=new WebSocket(e.wsUrl),e.socket.onopen=()=>{g({type:"subscribe_lobbies"}),e.activeRoom?.roomId&&f(e.activeRoom.roomId)},e.socket.onmessage=async s=>{let r;try{r=JSON.parse(s.data)}catch{return}if(r?.type==="lobbies_event"){await a();const n=r?.data?.roomId,i=r?.data?.userId;if(n&&e.activeRoom?.roomId===n&&i&&e.user?.id===i&&(r?.event==="room_participant_kicked"||r?.event==="room_participant_banned")){e.activeRoom=null,e.activeTab="home";const b=r?.event==="room_participant_banned"?t("blockedNotice"):t("kickedFromRoomNotice");e.roomNoticeMessage=b,h(b),o();return}if(n&&e.activeRoom?.roomId===n)try{e.activeRoom=await c(`/rooms/${encodeURIComponent(n)}`)}catch{e.activeRoom=null,e.activeTab="home",e.roomNoticeMessage=t("roomClosedNotice"),h(t("roomClosedNotice"))}(e.activeTab==="home"||e.activeTab==="lobbies"||e.activeTab==="profile"||e.activeTab==="roomManage")&&o();return}if(r?.type==="room_event"&&r?.roomId&&e.activeRoom?.roomId===r.roomId){if(r?.event==="access_denied"){e.activeRoom=null,e.activeTab="home";const n=r?.data?.reason==="banned"?t("blockedNotice"):t("kickedFromRoomNotice");e.roomNoticeMessage=n,h(n),o();return}if(r?.event==="chat_message"&&r?.data?.text){e.roomChatMessages=[...e.roomChatMessages,{username:r?.data?.username||"user",role:r?.data?.role||"player",text:r?.data?.text||""}].slice(-100),e.activeTab==="roomManage"&&o();return}try{e.activeRoom=await c(`/rooms/${encodeURIComponent(r.roomId)}`),o()}catch{e.activeRoom=null,e.activeTab="home",e.roomNoticeMessage=t("roomClosedNotice"),h(t("roomClosedNotice")),o()}return}r?.type==="presence"&&r?.roomId&&e.activeRoom?.roomId===r.roomId&&(e.roomChatMessages=[...e.roomChatMessages,{username:t("roleSystem"),role:"system",text:r?.message||""}].slice(-100),e.activeTab==="roomManage"&&o())},e.socket.onclose=()=>{e.socket=null,window.setTimeout(()=>A(a,o),3e3)})},R=(a,o="login")=>{e.authOpen=!0,e.authMode=o,a()},E=(a,o="create")=>{e.roomModalOpen=!0,e.roomModalMode=o,e.homeStatusMessage="",a()},H=a=>{e.roomModalOpen=!1,a()},O=a=>{e.joinLobbyModalOpen=!1,e.joinLobbyRoomId="",e.joinLobbyOwnerUserId="",e.joinLobbyNeedsPassword=!1,e.joinLobbyPassword="",a()},C=async(a,o,s,r="")=>{try{if(e.user?.id&&s===e.user.id)e.activeRoom=await c(`/rooms/${encodeURIComponent(o)}`);else{const n={spectator:!1};r.trim()!==""&&(n.password=r.trim()),e.activeRoom=await c(`/rooms/${encodeURIComponent(o)}/join`,{method:"POST",body:JSON.stringify(n)})}return f(e.activeRoom.roomId),p("room_joined",{roomId:e.activeRoom.roomId,topic:v}),e.activeTab="roomManage",u("homeStatus",`${t("roomJoinSuccess")} ${e.activeRoom.roomId}`,!0),e.roomChatMessages=[],e.roomNoticeMessage="",h(t("roomJoinSuccess"),"ok"),a(),!0}catch(n){return m("homeStatus",n),!1}},W=a=>{document.querySelector('[data-act="createRoom"]')?.addEventListener("click",async()=>{if(!e.user)return R(a,"login");$("#roomName");try{const o=d("#roomName",64);if(o===""){I("#roomName",t("requiredField"));return}const s=d("#roomPassword",128),r={name:o,isPublic:!!document.querySelector("#roomIsPublic")?.checked};s!==""&&(r.password=s),e.activeRoom=await c("/rooms",{method:"POST",body:JSON.stringify(r)}),f(e.activeRoom.roomId),e.roomChatMessages=[],e.roomNoticeMessage="",p("room_created",{roomId:e.activeRoom.roomId,topic:v}),e.roomModalOpen=!1,e.activeTab="roomManage",e.homeStatusMessage=`${t("roomCreated")} ${e.activeRoom.inviteCode}`,a()}catch(o){e.homeStatusMessage=o.message,m("homeStatus",o)}}),document.querySelector('[data-act="joinByCode"]')?.addEventListener("click",async()=>{if(!e.user)return R(a,"login");$("#inviteCode");try{const o=d("#inviteCode",6).toUpperCase();if(o.length!==6){I("#inviteCode",t("inviteCodeInvalid"));return}const s=d("#joinPassword",128),r={inviteCode:o,spectator:!!document.querySelector("#joinAsSpectator")?.checked};s!==""&&(r.password=s),e.activeRoom=await c("/rooms/join-by-code",{method:"POST",body:JSON.stringify(r)}),f(e.activeRoom.roomId),e.roomChatMessages=[],e.roomNoticeMessage="",p("room_joined",{roomId:e.activeRoom.roomId,topic:v}),e.roomModalOpen=!1,e.activeTab="roomManage",e.homeStatusMessage=`${t("roomJoinSuccess")} ${e.activeRoom.roomId}`,a()}catch(o){e.homeStatusMessage=o.message,m("homeStatus",o)}})},J=a=>{document.querySelectorAll("[data-tab]").forEach(o=>{o.addEventListener("click",()=>{e.activeTab=o.dataset.tab,a()})}),document.querySelectorAll("[data-lang]").forEach(o=>{o.addEventListener("click",()=>{e.lang=o.dataset.lang,localStorage.setItem("stories_lang",e.lang),a()})}),document.querySelector('[data-act="toggleAuth"]')?.addEventListener("click",()=>R(a,"login")),document.querySelectorAll('[data-act="heroCreate"]').forEach(o=>{o.addEventListener("click",()=>{if(!e.user)return R(a,"login");E(a,"create")})}),document.querySelectorAll('[data-act="heroJoin"]').forEach(o=>{o.addEventListener("click",()=>{if(!e.user)return R(a,"login");E(a,"join")})}),document.querySelectorAll('[data-act="closeAuth"]').forEach(o=>{o.addEventListener("click",()=>{e.authOpen=!1,a()})}),document.querySelector('[data-act="closeRoomNotice"]')?.addEventListener("click",()=>{e.roomNoticeMessage="",a()}),document.querySelector('[data-act="logout"]')?.addEventListener("click",()=>{e.token="",e.user=null,e.activeRoom=null,e.authOpen=!1,e.roomNoticeMessage="",e.socket?.readyState===WebSocket.OPEN&&e.socket.close(),localStorage.removeItem("stories_token"),a()}),document.querySelectorAll('[data-act="closeRoomModal"]').forEach(o=>{o.addEventListener("click",()=>H(a))}),document.querySelectorAll('[data-act="closeJoinLobbyModal"]').forEach(o=>{o.addEventListener("click",()=>O(a))}),document.querySelector('[data-act="confirmJoinLobby"]')?.addEventListener("click",async()=>{if(!e.joinLobbyRoomId)return;$("#lobbyJoinPassword");const o=d("#lobbyJoinPassword",128);if(e.joinLobbyNeedsPassword&&o===""){I("#lobbyJoinPassword",t("requiredField")),u("joinLobbyStatus",t("requiredField"));return}await C(a,e.joinLobbyRoomId,e.joinLobbyOwnerUserId,o)&&O(a)}),e.roomModalOpen&&e.user&&W(a)},x=async(a,o)=>{document.querySelector('[data-act="switchAuthMode"]')?.addEventListener("click",()=>{e.authMode=e.authMode==="login"?"register":"login",a()}),document.querySelector('[data-act="authSubmit"]')?.addEventListener("click",async()=>{const s=e.authMode==="login"?"/auth/login":"/auth/register",r=e.authMode==="login"?t("loginSuccess"):t("registerSuccess");try{const n=await c(s,{method:"POST",body:JSON.stringify({username:d("#authUsername",64),password:d("#authPassword",128)})});e.token=n.accessToken,localStorage.setItem("stories_token",e.token),await o(),u("authStatus",r,!0),e.authOpen=!1,a()}catch(n){m("authStatus",n)}})},M=a=>{(async()=>{if(e.activeRoom?.roomId&&!(e.activeRoom.ownerId&&e.activeRoom.inviteCode))try{e.activeRoom=await c(`/rooms/${encodeURIComponent(e.activeRoom.roomId)}`),a()}catch(r){m("homeStatus",r)}})();const s=()=>e.activeRoom?.roomId?!0:(u("homeStatus",t("roomNotFound")),!1);document.querySelector('[data-act="refreshRoom"]')?.addEventListener("click",async()=>{if(s())try{e.activeRoom=await c(`/rooms/${encodeURIComponent(e.activeRoom.roomId)}`),u("homeStatus",t("ready"),!0),a()}catch(r){m("homeStatus",r)}}),document.querySelector('[data-act="readyRoom"]')?.addEventListener("click",async()=>{if(s())try{const n=!((e.activeRoom.participants||[]).find(i=>i.userId===e.user?.id)?.ready??!1);e.activeRoom=await c(`/rooms/${encodeURIComponent(e.activeRoom.roomId)}/ready`,{method:"POST",body:JSON.stringify({ready:n})}),p("room_ready_changed",{roomId:e.activeRoom.roomId,topic:v}),u("homeStatus",t(n?"statusReady":"statusNotReady"),!0),a()}catch(r){m("homeStatus",r)}}),document.querySelector('[data-act="startGame"]')?.addEventListener("click",async()=>{if(s())try{e.activeRoom=await c(`/rooms/${encodeURIComponent(e.activeRoom.roomId)}/start`,{method:"POST"}),p("room_started",{roomId:e.activeRoom.roomId,topic:v}),u("homeStatus",t("ready"),!0),a()}catch(r){m("homeStatus",r)}}),document.querySelector('[data-act="leaveRoom"]')?.addEventListener("click",async()=>{if(s())try{const r=e.activeRoom.roomId;await c(`/rooms/${encodeURIComponent(e.activeRoom.roomId)}/leave`,{method:"POST"}),e.activeRoom=null,e.activeTab="home",e.roomNoticeMessage="",p("room_left",{roomId:r,topic:v}),u("homeStatus",t("ready"),!0),a()}catch(r){m("homeStatus",r)}}),document.querySelectorAll('[data-act="joinLobby"]').forEach(r=>{r.addEventListener("click",async()=>{if(!e.user)return R(a,"login");const n=r.dataset.roomId;if(!n)return;const i=r.dataset.roomOwnerId||"",b=r.dataset.roomHasPassword==="1";if(e.user?.id&&i===e.user.id){await C(a,n,i);return}e.joinLobbyModalOpen=!0,e.joinLobbyRoomId=n,e.joinLobbyOwnerUserId=i,e.joinLobbyNeedsPassword=b,a()})})},B=a=>{document.querySelector('[data-act="saveRoomSettings"]')?.addEventListener("click",async()=>{if(e.activeRoom?.roomId)try{const o=!!document.querySelector("#manageIsPublic")?.checked,s=d("#managePassword",128);e.activeRoom=await c(`/rooms/${encodeURIComponent(e.activeRoom.roomId)}/settings`,{method:"PATCH",body:JSON.stringify({isPublic:o,password:s})}),p("room_settings_updated",{roomId:e.activeRoom.roomId,topic:v}),u("roomManageStatus",t("roomSettingsSaved"),!0),h(t("roomSettingsSaved"),"ok"),a()}catch(o){m("roomManageStatus",o)}}),document.querySelector('[data-act="regenInvite"]')?.addEventListener("click",async()=>{if(e.activeRoom?.roomId)try{e.activeRoom=await c(`/rooms/${encodeURIComponent(e.activeRoom.roomId)}/invite-code/regenerate`,{method:"POST"}),p("room_invite_regenerated",{roomId:e.activeRoom.roomId,topic:v}),u("roomManageStatus",t("inviteRegenerated"),!0),h(t("inviteRegenerated"),"ok"),a()}catch(o){m("roomManageStatus",o)}}),document.querySelectorAll('[data-act="kickParticipant"]').forEach(o=>{o.addEventListener("click",async()=>{if(!e.activeRoom?.roomId)return;const s=o.dataset.userId;if(s)try{e.activeRoom=await c(`/rooms/${encodeURIComponent(e.activeRoom.roomId)}/participants/${encodeURIComponent(s)}/kick`,{method:"POST"}),p("room_participant_kicked",{roomId:e.activeRoom.roomId,userId:s,topic:v}),a()}catch(r){m("roomManageStatus",r)}})}),document.querySelectorAll('[data-act="banParticipant"]').forEach(o=>{o.addEventListener("click",async()=>{if(!e.activeRoom?.roomId)return;const s=o.dataset.userId;if(s)try{e.activeRoom=await c(`/rooms/${encodeURIComponent(e.activeRoom.roomId)}/participants/${encodeURIComponent(s)}/ban`,{method:"POST"}),p("room_participant_banned",{roomId:e.activeRoom.roomId,userId:s,topic:v}),a()}catch(r){m("roomManageStatus",r)}})}),document.querySelector('[data-act="sendRoomChat"]')?.addEventListener("click",()=>{const o=d("#roomChatInput",512);if(!e.activeRoom?.roomId||o==="")return;g({type:"room_event",roomId:e.activeRoom.roomId,event:"chat_message",data:{text:o,username:e.user?.username||"user",role:(e.activeRoom.participants||[]).find(r=>r.userId===e.user?.id)?.role||"player"}});const s=document.querySelector("#roomChatInput");s&&(s.value="")})},K=a=>{const o=async()=>{try{e.lobbyCatalog=(await c(`/lobbies?visibility=${encodeURIComponent(e.lobbyFilters.visibility)}&password=${encodeURIComponent(e.lobbyFilters.password)}&limit=${e.lobbyFilters.limit}`)).items||[],u("lobbyStatus",t("ready"),!0),a()}catch(s){m("lobbyStatus",s)}};document.querySelector('[data-act="loadLobbies"]')?.addEventListener("click",async()=>{e.lobbyFilters.visibility=d("#lobbyVisibility",16)||"all",e.lobbyFilters.password=d("#lobbyPasswordFilter",20)||"all",e.lobbyFilters.limit=Number(d("#lobbyLimit",3)||"20"),await o()}),document.querySelectorAll('[data-act="joinLobby"]').forEach(s=>{s.addEventListener("click",async()=>{if(!e.user)return R(a,"login");const r=s.dataset.roomId;if(!r)return;const n=s.dataset.roomOwnerId||"",i=s.dataset.roomHasPassword==="1";if(e.user?.id&&n===e.user.id){await C(a,r,n);return}e.joinLobbyModalOpen=!0,e.joinLobbyRoomId=r,e.joinLobbyOwnerUserId=n,e.joinLobbyNeedsPassword=i,a()})})},V=a=>{document.querySelectorAll('[data-act="openOwnedRoom"]').forEach(o=>{o.addEventListener("click",async()=>{try{const s=o.dataset.roomId;if(!s)return;e.activeRoom=await c(`/rooms/${encodeURIComponent(s)}`),e.activeTab="roomManage",e.roomNoticeMessage="",a()}catch(s){m("profileStatus",s)}})}),document.querySelector('[data-act="saveProfile"]')?.addEventListener("click",async()=>{try{const s={username:d("#profileUsername",64)};e.user=await c("/auth/me",{method:"PATCH",body:JSON.stringify(s)}),u("profileStatus",t("profileUpdated"),!0),a()}catch(o){m("profileStatus",o)}}),document.querySelector('[data-act="changePassword"]')?.addEventListener("click",async()=>{try{await c("/auth/change-password",{method:"POST",body:JSON.stringify({currentPassword:d("#currentPassword",128),newPassword:d("#nextPassword",128)})});const o=document.querySelector("#currentPassword"),s=document.querySelector("#nextPassword");o&&(o.value=""),s&&(s.value=""),u("profileStatus",t("passwordChanged"),!0)}catch(o){m("profileStatus",o)}})},G=a=>{M(a),B(a)},Y=()=>{const a=document.querySelector("#adminOutput");a&&(document.querySelector('[data-act="loadCards"]')?.addEventListener("click",async()=>{try{const o=d("#adminDeck",16),s=await c(`/admin/cards?deck=${encodeURIComponent(o)}`);a.textContent=JSON.stringify(s,null,2),u("adminStatus",t("cardsLoaded",{deck:o}),!0)}catch(o){m("adminStatus",o)}}),document.querySelector('[data-act="loadEffects"]')?.addEventListener("click",async()=>{try{const o=await c("/admin/effects");a.textContent=JSON.stringify(o,null,2),u("adminStatus",t("effectsLoaded"),!0)}catch(o){m("adminStatus",o)}}),document.querySelector('[data-act="patchCard"]')?.addEventListener("click",async()=>{try{const o=d("#adminDeck",16),s=d("#adminCardCode",64),r={name:d("#adminCardName",64),text:d("#adminCardText",512),enabled:!!document.querySelector("#adminEnabled")?.checked},n=d("#adminCardValue",16),i=d("#adminEffectKey",64);n!==""&&(r.value=Number(n)),i!==""&&(r.effectKey=i);const b=await c(`/admin/cards/${encodeURIComponent(o)}/${encodeURIComponent(s)}`,{method:"PATCH",body:JSON.stringify(r)});a.textContent=JSON.stringify(b,null,2),u("adminStatus",t("cardUpdated"),!0)}catch(o){m("adminStatus",o)}}))},z=()=>{const a={apiBase:document.querySelector("#apiBase"),checkHealth:document.querySelector("#checkHealth"),wsUrl:document.querySelector("#wsUrl"),wsConnect:document.querySelector("#wsConnect"),roomId:document.querySelector("#roomId"),subscribeRoom:document.querySelector("#subscribeRoom"),sendPing:document.querySelector("#sendPing"),sendEvent:document.querySelector("#sendEvent"),eventName:document.querySelector("#eventName")};!a.apiBase||!a.wsUrl||!a.checkHealth||!a.wsConnect||(a.checkHealth.addEventListener("click",async()=>{try{e.apiBase=N(a.apiBase.value,["http:","https:"]);const o=await c("/health");u("healthStatus",`OK: ${JSON.stringify(o)}`,!0)}catch(o){u("healthStatus",`${t("healthError")}: ${o.message}`)}}),a.wsConnect.addEventListener("click",()=>{try{e.wsUrl=N(a.wsUrl.value,["ws:","wss:"])}catch(o){u("wsStatus",o.message);return}e.socket?.close(),e.socket=new WebSocket(e.wsUrl),e.socket.onopen=()=>{u("wsStatus",t("wsConnected"),!0),y("socket open"),g({type:"subscribe_lobbies"})},e.socket.onmessage=o=>{try{y(JSON.parse(o.data))}catch{y(o.data)}},e.socket.onclose=()=>{u("wsStatus",t("wsClosed")),y("socket close")},e.socket.onerror=()=>{u("wsStatus",t("wsError")),y("socket error")}}),a.subscribeRoom?.addEventListener("click",()=>{if(!e.socket||e.socket.readyState!==WebSocket.OPEN)return y(t("connectSocketFirst"));g({type:"subscribe_room",roomId:d("#roomId",64)})}),a.sendPing?.addEventListener("click",()=>{if(!e.socket||e.socket.readyState!==WebSocket.OPEN)return y(t("connectSocketFirst"));g({type:"ping"})}),a.sendEvent?.addEventListener("click",()=>{if(!e.socket||e.socket.readyState!==WebSocket.OPEN)return y(t("connectSocketFirst"));g({type:"room_event",roomId:d("#roomId",64),event:d("#eventName",128),data:{source:"frontend"}})}))},Q=()=>{if(!e.authOpen||e.user)return"";const a=e.authMode==="login";return`
    <div class="modal-overlay" data-act="closeAuth"></div>
    <section class="modal auth-modal">
      <div class="modal-head">
        <div>
          <h2>${t(a?"login":"register")}</h2>
          <p>${t("authHint")}</p>
        </div>
        <button class="chip" data-act="closeAuth">${t("close")}</button>
      </div>

      <article class="auth-card">
        <div class="stack">
          <input id="authUsername" placeholder="${t("username")}" />
          <input id="authPassword" placeholder="${t("password")}" type="password" />
          <button class="primary" data-act="authSubmit">${t(a?"login":"createAccount")}</button>
          <button class="chip" data-act="switchAuthMode">${t(a?"switchToRegister":"switchToLogin")}</button>
        </div>
      </article>

      <div id="authStatus" class="status"></div>
    </section>
  `},X=()=>{if(!e.roomModalOpen||!e.user)return"";const a=e.roomModalMode==="create";return`
    <div class="modal-overlay" data-act="closeRoomModal"></div>
    <section class="modal room-modal">
      <div class="modal-head">
        <div>
          <h2>${t(a?"createRoom":"connectCode")}</h2>
          <p>${t(a?"heroSubtitle":"joinHint")}</p>
        </div>
        <button class="chip" data-act="closeRoomModal">${t("close")}</button>
      </div>

      <article class="auth-card">
        ${a?`
        <div class="stack">
          <input id="roomName" placeholder="${t("roomName")}" />
          <label><input id="roomIsPublic" type="checkbox" checked /> ${t("visibilityPublic")}</label>
          <input id="roomPassword" placeholder="${t("roomPassword")}" type="password" />
          <button class="primary" data-act="createRoom">${t("createRoom")}</button>
        </div>`:`
        <div class="stack">
          <input id="inviteCode" placeholder="AB12CD" maxlength="6" />
          <input id="joinPassword" placeholder="${t("roomPassword")}" type="password" />
          <label><input id="joinAsSpectator" type="checkbox" /> ${t("spectator")}</label>
          <button class="secondary" data-act="joinByCode">${t("connect")}</button>
        </div>`}
      </article>

      <div id="homeStatus" class="status">${l(e.homeStatusMessage||"")}</div>
    </section>
  `},Z=()=>`
  <section class="hero">
    <div class="hero-mist" aria-hidden="true"></div>
    <div class="hero-copy">
      <span class="hero-kicker">${t("appTag")}</span>
      <h1>LETTERS:<br/>NO MERCY</h1>
      <p class="hero-subline">DARK MEDIEVAL STORIES</p>
      <p>${t("heroSubtitle")}</p>
      <div class="hero-actions">
        <button class="primary" data-act="heroCreate">＋ ${t("heroCreate")}</button>
        <button class="secondary" data-act="heroJoin">${t("heroJoin")}</button>
      </div>
    </div>
    <div class="hero-art" aria-hidden="true">
      <div class="castle-silhouette"></div>
      <div class="letter-token"></div>
    </div>
  </section>
`,ee=()=>{const a=e.homeLobbies;return`
    <section class="lobby-card">
      <div class="lobby-head">
        <h3>${t("availableRooms")}</h3>
        <button class="chip" data-tab="lobbies">${t("navLobbies")}</button>
      </div>
      <div class="lobby-list">
        ${a.length===0?`<p>${t("lobbyNoItems")}</p>`:a.map(o=>`
          <article class="lobby-item">
            <div class="lobby-icon">${o.isPublic?"☀":"☾"}</div>
            <div class="lobby-meta">
              <h4>${l(o.name)} ${o.hasPassword?'<span class="inline-tag">🔒</span>':""}</h4>
              <p>${o.isPublic?t("visibilityPublic"):t("visibilityPrivate")} • ${o.hasPassword?t("lobbyHasPassword"):t("lobbyNoPassword")}</p>
            </div>
            <div class="lobby-count">👥 ${o.playersCount} / 8</div>
            <button class="secondary" data-act="joinLobby" data-room-id="${l(o.roomId)}" data-room-owner-id="${l(o.ownerUserId||"")}" data-room-has-password="${o.hasPassword?"1":"0"}">${t("joinLobby")}</button>
          </article>
        `).join("")}
      </div>
    </section>
  `},L=a=>{const o=e.user?.id===a.userId,s=e.user?.id&&e.activeRoom?.ownerId===e.user.id,r=s&&a.role==="player"&&a.userId!==e.activeRoom?.ownerId,n=s&&a.userId!==e.activeRoom?.ownerId;return`
    <li class="participant-item">
      <div>
        <b class="role-${l(a.role)}">${l(a.username)}</b> ${o?`<span class="inline-note">(${t("youLabel")})</span>`:""}
      </div>
      <div class="participant-meta">${l(a.role)} · ${a.ready?"ready":"not ready"}</div>
      ${r||n?`<div class="participant-actions">
        ${r?`<button class="chip" data-act="kickParticipant" data-user-id="${l(a.userId)}">${t("kickPlayer")}</button>`:""}
        ${n?`<button class="chip" data-act="banParticipant" data-user-id="${l(a.userId)}">${t("banPlayer")}</button>`:""}
      </div>`:""}
    </li>
  `},oe=()=>{if(!e.activeRoom)return"";const a=Array.isArray(e.activeRoom.participants)?e.activeRoom.participants:[],o=a.filter(n=>n.role!=="spectator"),s=a.filter(n=>n.role==="spectator"),r=!!e.user?.id&&e.user.id===e.activeRoom.ownerId;return`
    <article class="room-panel">
      <h3>${t("roomDetails")}</h3>
      <div class="room-meta">
        <div class="room-code-row"><span>${t("roomCode")}:</span> <b>${l(e.activeRoom.inviteCode||"—")}</b> ${r?`<button class="chip room-code-action" data-act="regenInvite">${t("regenerateInvite")}</button>`:""}</div>
        <div><span>${t("roomOwnerName")}:</span> <b>${l(e.activeRoom.ownerUsername||e.activeRoom.ownerId||"—")}</b></div>
      </div>
      <div class="room-lists">
        <div>
          <h4>${t("roomParticipants")} (${o.length})</h4>
          <ul class="participant-list">${o.map(L).join("")}</ul>
        </div>
        <div>
          <h4>${t("roomSpectators")} (${s.length})</h4>
          <ul class="participant-list">${s.map(L).join("")}</ul>
        </div>
      </div>
      <div class="stack">
        <h4>${t("roomActions")}</h4>
        <div class="room-actions">
          <button class="secondary" data-act="refreshRoom">${t("refreshRoom")}</button>
          <button class="secondary" data-act="readyRoom">${a.find(n=>n.userId===e.user?.id)?.ready?t("markNotReady"):t("markReady")}</button>
          <button class="primary" data-act="startGame">${t("startGame")}</button>
          <button class="chip" data-act="leaveRoom">${t(r?"closeOwnedRoom":"leaveRoom")}</button>
        </div>
      </div>
    </article>
  `},te=()=>{if(!e.activeRoom)return"";const a=e.activeRoom.ownerId===e.user?.id;return`
    <div class="room-manage-layout">
      <article class="room-manage-main">
        <h3>${t("roomManageTitle")}</h3>
        ${a?`<div class="stack">
          <label><input id="manageIsPublic" type="checkbox" ${e.activeRoom.isPublic?"checked":""} /> ${t("visibilityPublic")}</label>
          <input id="managePassword" type="password" placeholder="${t("roomPassword")}" />
          <div class="row">
            <button class="primary" data-act="saveRoomSettings">${t("saveRoomSettings")}</button>
          </div>
        </div>`:`<p class="status">${t("roomManageReadonly")}</p>`}
      </article>

      <article class="room-chat-sidebar">
        <h3>${t("roomChat")}</h3>
        <div class="chat-log">
          ${(e.roomChatMessages||[]).map(o=>`<div class="chat-line role-${l(o.role||"system")}">
            <b>${l(o.username||t("roleSystem"))}</b>: ${l(o.text||"")}
          </div>`).join("")}
        </div>
        <div class="row topgap">
          <input id="roomChatInput" placeholder="${t("chatPlaceholder")}" />
          <button class="primary" data-act="sendRoomChat">${t("send")}</button>
        </div>
      </article>
    </div>
    <div id="roomManageStatus" class="status"></div>
  `},ae=()=>`
    ${Z()}
    ${ee()}
  `,se=()=>`
  <h2>${t("lobbyTitle")}</h2>
  <p>${t("lobbyHint")}</p>
  <article>
    <div class="row">
      <select id="lobbyVisibility">
        <option value="all" ${e.lobbyFilters.visibility==="all"?"selected":""}>${t("visibilityAll")}</option>
        <option value="public" ${e.lobbyFilters.visibility==="public"?"selected":""}>${t("visibilityPublic")}</option>
        <option value="private" ${e.lobbyFilters.visibility==="private"?"selected":""}>${t("visibilityPrivate")}</option>
      </select>
      <select id="lobbyPasswordFilter">
        <option value="all" ${e.lobbyFilters.password==="all"?"selected":""}>${t("passwordAll")}</option>
        <option value="with_password" ${e.lobbyFilters.password==="with_password"?"selected":""}>${t("passwordWith")}</option>
        <option value="without_password" ${e.lobbyFilters.password==="without_password"?"selected":""}>${t("passwordWithout")}</option>
      </select>
      <input id="lobbyLimit" type="number" min="1" max="100" value="${e.lobbyFilters.limit}" />
      <button class="secondary" data-act="loadLobbies">${t("loadLobbies")}</button>
    </div>
  </article>
  <div class="lobby-list topgap">
    ${e.lobbyCatalog.length===0?`<article><p>${t("lobbyNoItems")}</p></article>`:e.lobbyCatalog.map(a=>`
      <article class="lobby-item">
        <div class="lobby-icon">${a.isPublic?"☀":"☾"}</div>
        <div class="lobby-meta">
          <h4>${l(a.name)}</h4>
          <p>${a.status} • ${a.hasPassword?t("lobbyHasPassword"):t("lobbyNoPassword")}</p>
        </div>
        <div class="lobby-count">👥 ${a.playersCount} / 8</div>
        <button class="secondary" data-act="joinLobby" data-room-id="${l(a.roomId)}" data-room-owner-id="${l(a.ownerUserId||"")}" data-room-has-password="${a.hasPassword?"1":"0"}">${t("joinLobby")}</button>
      </article>
    `).join("")}
  </div>
`,re=()=>e.joinLobbyModalOpen?`
    <div class="modal-overlay" data-act="closeJoinLobbyModal"></div>
    <section class="modal room-modal">
      <div class="modal-head">
        <div>
          <h2>${t("joinLobby")}</h2>
          <p>${e.joinLobbyNeedsPassword?t("joinPasswordHint"):t("joinWithoutPasswordHint")}</p>
        </div>
        <button class="chip" data-act="closeJoinLobbyModal">${t("close")}</button>
      </div>
      <article class="auth-card">
        <div class="stack">
          ${e.joinLobbyNeedsPassword?`<input id="lobbyJoinPassword" placeholder="${t("roomPassword")}" type="password" />`:""}
          <button class="primary" data-act="confirmJoinLobby">${t("connect")}</button>
        </div>
      </article>
      <div id="joinLobbyStatus" class="status"></div>
    </section>
  `:"",ne=()=>{if(!e.user)return"";const a=e.myRooms||[];return`
    <article>
      <h3>${t("myRooms")}</h3>
      <div class="stack">
        ${a.length===0?`<p>${t("lobbyNoItems")}</p>`:a.map(o=>`
          <div class="row my-room-row">
            <span>${l(o.name)} (${l(o.inviteCode)})</span>
            <button class="chip" data-act="openOwnedRoom" data-room-id="${l(o.roomId)}">${t("openRoom")}</button>
          </div>
        `).join("")}
      </div>
    </article>
  `},ie=()=>e.user?`
    <h2>${t("profileTitle")}</h2>
    <div class="grid">
      <article>
        <h3>${t("profileEdit")}</h3>
        <div class="stack">
          <input id="profileUsername" value="${l(e.user.username)}" />
          <button class="primary" data-act="saveProfile">${t("saveProfile")}</button>
        </div>
      </article>
      ${ne()}
      <article>
        <h3>${t("changePassword")}</h3>
        <div class="stack">
          <input id="currentPassword" placeholder="${t("currentPassword")}" type="password" />
          <input id="nextPassword" placeholder="${t("nextPassword")}" type="password" />
          <button class="secondary" data-act="changePassword">${t("changePassword")}</button>
        </div>
      </article>
      <article>
        <h3>${t("stats")}</h3>
        <ul>
          <li>${t("wins")}: <b>${e.user.wins}</b></li>
          <li>${t("losses")}: <b>${e.user.losses}</b></li>
          <li>${t("vt")}: <b>${e.user.victoryTokens}</b></li>
          <li>${t("elim3")}: <b>${e.user.eliminatedWith3}</b></li>
        </ul>
      </article>
    </div>
    <div id="profileStatus" class="status"></div>
  `:`<h2>${t("profileTitle")}</h2><div class="status">${t("needAuthProfile")}</div>`,ce=()=>`
  <article>
    <h3>${t("deckLoad")}</h3>
    <div class="stack">
      <select id="adminDeck">
        <option value="character">character</option>
        <option value="decree">decree</option>
        <option value="event">event</option>
      </select>
      <button class="primary" data-act="loadCards">${t("loadCards")}</button>
      <button class="secondary" data-act="loadEffects">${t("loadEffects")}</button>
    </div>
  </article>
  <article>
    <h3>${t("patchCard")}</h3>
    <div class="stack">
      <input id="adminCardCode" placeholder="${t("cardCode")}" />
      <input id="adminCardName" placeholder="${t("newName")}" />
      <input id="adminCardText" placeholder="${t("newText")}" />
      <input id="adminCardValue" placeholder="${t("valueOrEmpty")}" />
      <input id="adminEffectKey" placeholder="${t("effectKey")}" />
      <label><input id="adminEnabled" type="checkbox" checked /> ${t("enabled")}</label>
      <button class="primary" data-act="patchCard">${t("applyPatch")}</button>
    </div>
  </article>
`,de=()=>`
  <article>
    <h3>API / WebSocket Debug</h3>
    <div class="row">
      <input id="apiBase" value="${l(e.apiBase)}" />
      <button id="checkHealth" class="secondary">${t("checkHealth")}</button>
    </div>
    <div id="healthStatus" class="status">${t("waitingRequest")}</div>
    <div class="row topgap">
      <input id="wsUrl" value="${l(e.wsUrl)}" />
      <button id="wsConnect" class="secondary">${t("connectWs")}</button>
    </div>
    <div class="row topgap">
      <input id="roomId" placeholder="roomId" />
      <button id="subscribeRoom">${t("subscribe")}</button>
      <button id="sendPing">${t("sendPing")}</button>
    </div>
    <div class="row topgap">
      <input id="eventName" value="frontend_debug" />
      <button id="sendEvent">${t("sendEvent")}</button>
    </div>
    <div id="wsStatus" class="status">${t("wsNotConnected")}</div>
    <div id="debugLog" class="log"></div>
  </article>
`,le=()=>`
  <h2>${t("controlPanelTitle")}</h2>
  <p>${t("controlPanelHint")}</p>
  <div class="grid">
    ${ce()}
    ${de()}
  </div>
  <div id="adminStatus" class="status"></div>
  <pre id="adminOutput" class="json"></pre>
`,ue=()=>e.roomNoticeMessage?`<div class="room-notice">
    <span>${l(e.roomNoticeMessage)}</span>
    <button class="chip" data-act="closeRoomNotice">${t("close")}</button>
  </div>`:"",me=()=>{const a=e.user?`<div class="profile-actions"><button class="avatar-btn" data-tab="profile">${l((e.user.username||"U").slice(0,1).toUpperCase())}</button><button class="chip" data-act="logout">${t("logout")}</button></div>`:`<button class="primary" data-act="toggleAuth">${t("openAuth")}</button>`;return`
  <main class="layout dark">
    <header class="topbar">
      <div class="brand-mini">
        <h2>LETTERS: NO MERCY</h2>
        <p class="brand-sub">Dark Medieval Stories</p>
      </div>
      <nav class="main-nav">
        <button class="tab ${e.activeTab==="home"?"active":""}" data-tab="home">${t("navHome")}</button>
        <button class="tab ${e.activeTab==="lobbies"?"active":""}" data-tab="lobbies">${t("navLobbies")}</button>
        ${e.activeRoom?`<button class="tab ${e.activeTab==="roomManage"?"active":""}" data-tab="roomManage">${t("roomManage")}</button>`:""}
        <button class="tab ${e.activeTab==="profile"?"active":""}" data-tab="profile">${t("navProfile")}</button>
      </nav>
      <div class="topbar-actions">
        <button class="primary" data-act="heroCreate">＋ ${t("heroCreate")}</button>
        <div class="lang-switch compact">
          <button class="chip ${e.lang==="ru"?"active":""}" data-lang="ru">RU</button>
          <button class="chip ${e.lang==="en"?"active":""}" data-lang="en">EN</button>
        </div>
        ${a}
      </div>
    </header>

    ${ue()}

    <section class="panel ${e.activeTab==="home"?"":"hidden"} cinematic-panel">${ae()}</section>
    <section class="panel ${e.activeTab==="lobbies"?"":"hidden"} cinematic-panel">${se()}</section>
    <section class="panel ${e.activeTab==="roomManage"?"":"hidden"} cinematic-panel">${oe()}${te()}</section>
    <section class="panel ${e.activeTab==="profile"?"":"hidden"} cinematic-panel">${ie()}</section>
    ${e.user?.role==="admin"?`<section class="panel ${e.activeTab==="control"?"":"hidden"}">${le()}</section>`:""}

    ${Q()}
    ${X()}
    ${re()}
    <div id="toastContainer" class="toast-container"></div>
  </main>`},T=document.querySelector("#app"),_=async()=>{if(e.token)try{e.user=await c("/auth/me")}catch{e.user=null,e.token="",localStorage.removeItem("stories_token")}},w=()=>{T&&(k(),T.innerHTML=me(),J(w),e.activeTab==="home"&&M(w),e.activeTab==="lobbies"&&K(w),e.activeTab==="profile"&&V(w),e.activeTab==="roomManage"&&G(w),e.activeTab==="control"&&e.user?.role==="admin"&&(Y(),z()),e.authOpen&&!e.user&&x(w,_))},S=async(a="public",o=4)=>{try{const s=await c(`/lobbies?visibility=${encodeURIComponent(a)}&limit=${o}`);a==="public"&&(e.homeLobbies=s.items||[]),a==="all"&&(e.lobbyCatalog=s.items||[])}catch{a==="public"&&(e.homeLobbies=[]),a==="all"&&(e.lobbyCatalog=[])}},k=()=>{if(!e.user){e.myRooms=[];return}const a=[...e.homeLobbies,...e.lobbyCatalog],o=new Map;a.filter(s=>s.ownerUserId===e.user.id).forEach(s=>o.set(s.roomId,s)),e.myRooms=[...o.values()]};await _();await S("public",4);await S("all",e.lobbyFilters.limit);k();A(async()=>{await S("public",4),await S("all",e.lobbyFilters.limit),k()},w);w();
//# sourceMappingURL=index-YyquqR_S.js.map
