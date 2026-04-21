(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const c of i)if(c.type==="childList")for(const m of c.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&r(m)}).observe(document,{childList:!0,subtree:!0});function s(i){const c={};return i.integrity&&(c.integrity=i.integrity),i.referrerPolicy&&(c.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?c.credentials="include":i.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(i){if(i.ep)return;i.ep=!0;const c=s(i);fetch(i.href,c)}})();const M=window.location.hostname==="0.0.0.0"||window.location.hostname===""?"localhost":window.location.hostname,U=window.location.protocol==="https:"?"wss":"ws",e={apiBase:window.location.origin,wsUrl:`${U}://${M}:8081`,token:localStorage.getItem("stories_token")||"",user:null,activeRoom:null,activeTab:"home",homeLobbies:[],lobbyCatalog:[],lobbyFilters:{visibility:"all",password:"all",limit:20},socket:null,lang:localStorage.getItem("stories_lang")||"ru",authOpen:!1,authMode:"login",roomModalOpen:!1,roomModalMode:"create",joinLobbyModalOpen:!1,joinLobbyRoomId:"",joinLobbyOwnerUserId:"",joinLobbyNeedsPassword:!1,joinLobbyPassword:"",roomChatMessages:[],homeStatusMessage:"",myRooms:[]},k={ru:{appTag:"Stories",title:"Control Center",subtitle:"Комнаты, профиль, админка и live debug в одном месте.",login:"Вход",register:"Регистрация",logout:"Выйти",notAuthorized:"Не авторизованы",signedAs:"Вы вошли как",navHome:"Комнаты",navProfile:"Профиль",navLobbies:"Лобби",navAdmin:"Админ",navDebug:"Debug",openAuth:"Войти / Регистрация",close:"Закрыть",authTitle:"Авторизация",authHint:"Откройте аккаунт или войдите в существующий.",username:"Имя пользователя",password:"Пароль",createAccount:"Создать аккаунт",loginSuccess:"Успешный вход.",registerSuccess:"Аккаунт создан и выполнен вход.",homeNeedAuth:"Выполните вход для доступа к комнатам.",roomsTitle:"Комнаты",createRoom:"Создать комнату",roomName:"Название комнаты",connectCode:"Войти по invite-коду",connect:"Подключиться",spectator:"Зайти как spectator",ready:"",roomCreated:"Комната создана. Invite code:",roomJoinSuccess:"Подключение успешно. Room:",profileTitle:"Профиль пользователя",profileEdit:"Редактирование",newPassword:"Новый пароль (опционально)",saveProfile:"Сохранить профиль",stats:"Статистика",needAuthProfile:"Сначала авторизуйтесь.",profileUpdated:"Профиль обновлен.",passwordChanged:"Пароль успешно изменён.",currentPassword:"Текущий пароль",nextPassword:"Новый пароль",changePassword:"Сменить пароль",wins:"Победы",losses:"Поражения",vt:"Victory tokens",elim3:"Eliminated with 3",adminTitle:"Админ-панель (RBAC)",deckLoad:"Загрузка колоды",loadCards:"Показать cards",loadEffects:"Показать effects",patchCard:"Patch card",cardCode:"cardCode",newName:"Новое имя",newText:"Новый текст",valueOrEmpty:"value (или пусто)",effectKey:"effectKey",enabled:"enabled",applyPatch:"Применить PATCH",cardsLoaded:"Cards для {deck} загружены.",effectsLoaded:"Effects загружены.",cardUpdated:"Карта обновлена.",debugTitle:"Debug",oldInterface:"Техпанель для API и WebSocket.",checkHealth:"Проверить /health",waitingRequest:"Ожидание запроса…",websocket:"WebSocket",connectWs:"Подключиться",subscribe:"Подписаться",sendPing:"Ping",sendEvent:"Отправить room_event",wsNotConnected:"Не подключено",wsConnected:"WebSocket подключен",wsClosed:"WebSocket закрыт",wsError:"WebSocket ошибка",connectSocketFirst:"Сначала подключите сокет",healthError:"Ошибка",unknownError:"Неизвестная ошибка",httpError:"Ошибка HTTP {status}",invalidCredentials:"Неверный логин или пароль.",currentPasswordInvalid:"Текущий пароль указан неверно.",userExists:"Такой username уже занят.",unauthorized:"Требуется авторизация.",forbidden:"Недостаточно прав.",roomNotFound:"Комната не найдена.",inviteInvalid:"Некорректный invite-код.",validationFailed:"Проверьте корректность введенных данных.",serverUnavailable:"Сервер временно недоступен. Повторите позже.",invalidUrl:"Некорректный URL.",roomPasswordRequired:"Для входа в это лобби нужен пароль.",roomPasswordInvalid:"Неверный пароль лобби.",ownerAlreadyHasRoom:"У вас уже есть активная комната. Закройте её перед созданием новой.",navControl:"Control Panel",heroTitle:"Stories: project-visual landing",heroSubtitle:"Создавайте комнаты и подключайтесь к игре за секунды.",heroCreate:"Создать комнату",heroJoin:"Присоединиться",roomDetails:"Текущая комната",roomCode:"Код приглашения",roomOwner:"Владелец",roomOwnerName:"Ник владельца",roomParticipants:"Участники",roomSpectators:"Зрители",roomActions:"Действия с комнатой",leaveRoom:"Покинуть комнату",closeOwnedRoom:"Закрыть комнату",refreshRoom:"Обновить состояние",markReady:"Я готов",startGame:"Запустить игру",youLabel:"вы",authRequiredAction:"Для этого действия войдите в аккаунт.",switchToLogin:"Уже есть аккаунт? Войти",switchToRegister:"Нет аккаунта? Регистрация",themeDark:"Тёмная",themeLight:"Светлая",controlPanelTitle:"Control Panel",controlPanelHint:"Только для администраторов: управление данными и live debug.",lobbyTitle:"Список лобби",lobbyHint:"Фильтруйте публичные и закрытые лобби.",visibilityAll:"Все",visibilityPublic:"Публичные",visibilityPrivate:"Закрытые",passwordAll:"Любые",passwordWith:"С паролем",passwordWithout:"Без пароля",loadLobbies:"Обновить список",lobbyNoItems:"Лобби не найдены",lobbyHasPassword:"Пароль",lobbyNoPassword:"Без пароля",joinLobby:"Войти в лобби",roomPassword:"Пароль лобби (если нужен)",availableRooms:"Доступные комнаты",myRooms:"Мои комнаты",openRoom:"Открыть",joinHint:"Введите код приглашения и присоединитесь к комнате.",statusReady:"Статус: готов.",statusNotReady:"Статус: не готов.",joinPasswordHint:"Введите пароль лобби для входа.",joinWithoutPasswordHint:"Это лобби без пароля. Подтвердите вход.",requiredField:"Заполните обязательное поле.",inviteCodeInvalid:"Введите корректный invite-код (6 символов).",roomManage:"Управление комнатой",roomManageTitle:"Настройки комнаты",saveRoomSettings:"Сохранить настройки",regenerateInvite:"Пересоздать код приглашения",kickPlayer:"Кик",banPlayer:"Блок",roomChat:"Чат комнаты",chatPlaceholder:"Введите сообщение...",send:"Отправить",roomSettingsSaved:"Настройки комнаты обновлены.",inviteRegenerated:"Invite-код обновлён.",blockedNotice:"Вы заблокированы в этой комнате.",roleOwner:"Владелец",rolePlayer:"Игрок",roleSpectator:"Зритель",roleSystem:"Система"},en:{appTag:"Stories",title:"Control Center",subtitle:"Rooms, profile, admin panel and live debug in one place.",login:"Sign in",register:"Sign up",logout:"Logout",notAuthorized:"Not authorized",signedAs:"Signed in as",navHome:"Rooms",navProfile:"Profile",navLobbies:"Lobbies",navAdmin:"Admin",navDebug:"Debug",openAuth:"Login / Register",close:"Close",authTitle:"Authentication",authHint:"Create an account or sign in.",username:"Username",password:"Password",createAccount:"Create account",loginSuccess:"Signed in successfully.",registerSuccess:"Account created and signed in.",homeNeedAuth:"Sign in to access rooms.",roomsTitle:"Rooms",createRoom:"Create room",roomName:"Room name",connectCode:"Join by invite code",connect:"Connect",spectator:"Join as spectator",ready:"",roomCreated:"Room created. Invite code:",roomJoinSuccess:"Connected successfully. Room:",profileTitle:"User profile",profileEdit:"Edit profile",newPassword:"New password (optional)",saveProfile:"Save profile",stats:"Stats",needAuthProfile:"Sign in first.",profileUpdated:"Profile updated.",passwordChanged:"Password changed successfully.",currentPassword:"Current password",nextPassword:"New password",changePassword:"Change password",wins:"Wins",losses:"Losses",vt:"Victory tokens",elim3:"Eliminated with 3",adminTitle:"Admin panel (RBAC)",deckLoad:"Load deck",loadCards:"Show cards",loadEffects:"Show effects",patchCard:"Patch card",cardCode:"cardCode",newName:"New name",newText:"New text",valueOrEmpty:"value (or empty)",effectKey:"effectKey",enabled:"enabled",applyPatch:"Apply PATCH",cardsLoaded:"Cards for {deck} loaded.",effectsLoaded:"Effects loaded.",cardUpdated:"Card updated.",debugTitle:"Debug",oldInterface:"Technical panel for API and WebSocket.",checkHealth:"Check /health",waitingRequest:"Waiting for request…",websocket:"WebSocket",connectWs:"Connect",subscribe:"Subscribe",sendPing:"Ping",sendEvent:"Send room_event",wsNotConnected:"Not connected",wsConnected:"WebSocket connected",wsClosed:"WebSocket closed",wsError:"WebSocket error",connectSocketFirst:"Connect socket first",healthError:"Error",unknownError:"Unknown error",httpError:"HTTP error {status}",invalidCredentials:"Invalid username or password.",currentPasswordInvalid:"Current password is invalid.",userExists:"This username is already taken.",unauthorized:"Authorization required.",forbidden:"Not enough permissions.",roomNotFound:"Room not found.",inviteInvalid:"Invalid invite code.",validationFailed:"Please check input values.",serverUnavailable:"Server is temporarily unavailable. Try again later.",invalidUrl:"Invalid URL.",roomPasswordRequired:"Lobby password is required.",roomPasswordInvalid:"Invalid lobby password.",ownerAlreadyHasRoom:"You already have an active room. Close it before creating a new one.",navControl:"Control Panel",heroTitle:"Stories: project visual landing",heroSubtitle:"Create rooms and join matches in seconds.",heroCreate:"Create room",heroJoin:"Join room",roomDetails:"Current room",roomCode:"Invite code",roomOwner:"Owner",roomOwnerName:"Owner name",roomParticipants:"Participants",roomSpectators:"Spectators",roomActions:"Room actions",leaveRoom:"Leave room",closeOwnedRoom:"Close room",refreshRoom:"Refresh state",markReady:"Mark ready",startGame:"Start game",youLabel:"you",authRequiredAction:"Please sign in to continue.",switchToLogin:"Already have an account? Sign in",switchToRegister:"No account yet? Sign up",themeDark:"Dark",themeLight:"Light",controlPanelTitle:"Control Panel",controlPanelHint:"Admin-only area for content management and live debug.",lobbyTitle:"Lobby list",lobbyHint:"Filter public and private lobbies.",visibilityAll:"All",visibilityPublic:"Public",visibilityPrivate:"Private",passwordAll:"Any",passwordWith:"With password",passwordWithout:"Without password",loadLobbies:"Refresh list",lobbyNoItems:"No lobbies found",lobbyHasPassword:"Password",lobbyNoPassword:"No password",joinLobby:"Join lobby",roomPassword:"Lobby password (if required)",availableRooms:"Available rooms",myRooms:"My rooms",openRoom:"Open",joinHint:"Enter invite code and join a room.",statusReady:"Status: ready.",statusNotReady:"Status: not ready.",joinPasswordHint:"Enter lobby password to join.",joinWithoutPasswordHint:"This lobby has no password. Confirm join.",requiredField:"Please fill in the required field.",inviteCodeInvalid:"Enter a valid invite code (6 characters).",roomManage:"Room management",roomManageTitle:"Room settings",saveRoomSettings:"Save settings",regenerateInvite:"Regenerate invite code",kickPlayer:"Kick",banPlayer:"Block",roomChat:"Room chat",chatPlaceholder:"Type a message...",send:"Send",roomSettingsSaved:"Room settings updated.",inviteRegenerated:"Invite code regenerated.",blockedNotice:"You are blocked in this room.",roleOwner:"Owner",rolePlayer:"Player",roleSpectator:"Spectator",roleSystem:"System"}},a=(o,t={})=>{const s=k[e.lang]?.[o]??k.ru[o]??o;return Object.entries(t).reduce((r,[i,c])=>r.replaceAll(`{${i}}`,String(c)),s)},q=()=>e.token?{Authorization:`Bearer ${e.token}`}:{},j=(o,t)=>{const s=String(o||"").toUpperCase(),r={INVALID_CREDENTIALS:"invalidCredentials",USER_EXISTS:"userExists",UNAUTHORIZED:"unauthorized",FORBIDDEN:"forbidden",ROOM_NOT_FOUND:"roomNotFound",INVALID_INVITE_CODE:"inviteInvalid",INVITE_CODE_NOT_FOUND:"inviteInvalid",ROOM_PASSWORD_REQUIRED:"roomPasswordRequired",ROOM_PASSWORD_INVALID:"roomPasswordInvalid",OWNER_ALREADY_HAS_ROOM:"ownerAlreadyHasRoom",CURRENT_PASSWORD_INVALID:"currentPasswordInvalid",USER_BLOCKED_IN_ROOM:"blockedNotice",VALIDATION_ERROR:"validationFailed",UNKNOWN_ERROR:"unknownError"};return r[s]?r[s]:t===401?"unauthorized":t===403?"forbidden":t>=500?"serverUnavailable":null},_=(o,t,s)=>{const r=t?.message||t?.errorMessage||t?.error||s||"";if(String(t?.errorCode||t?.code||"").toUpperCase()==="UNKNOWN_ERROR"&&/must|invalid|required|password|username/i.test(String(r)))return{key:"validationFailed",message:String(r)};const i=j(t?.code||t?.errorCode,o);return i?{key:i,message:a(i)}:{key:null,message:r||a("httpError",{status:o})}},l=async(o,t={})=>{let s;try{s=await fetch(`${e.apiBase.replace(/\/$/,"")}${o}`,{...t,headers:{"Content-Type":"application/json",...t.headers||{},...q(),Locale:e.lang}})}catch{throw new Error(a("serverUnavailable"))}const r=await s.text();let i={};try{i=r?JSON.parse(r):{}}catch{i={}}if(!s.ok){const c=_(s.status,i,r),m=new Error(c.message||a("unknownError"));throw m.code=c.key,m.status=s.status,m}return i},u=o=>{const t=document.createElement("div");return t.textContent=String(o??""),t.innerHTML},d=(o,t=256)=>{const s=document.querySelector(o);return s?String(s.value??"").trim().slice(0,t):""},C=(o,t)=>{let s;try{s=new URL(String(o||"").trim())}catch{throw new Error(a("invalidUrl"))}if(!t.includes(s.protocol))throw new Error(a("invalidUrl"));return s.toString().replace(/\/$/,"")},v="__lobbies__",n=(o,t,s=!1)=>{const r=document.querySelector(`#${o}`);r&&(r.textContent=t,r.classList.toggle("ok",s))},h=o=>{const t=document.querySelector("#debugLog");if(!t)return;const s=document.createElement("div");s.textContent=`[${new Date().toLocaleTimeString()}] ${typeof o=="string"?o:JSON.stringify(o)}`,t.prepend(s)},b=(o,t="error")=>{const s=document.querySelector("#toastContainer");if(!s||!o)return;const r=document.createElement("div");r.className=`toast ${t}`,r.textContent=o,s.append(r),window.setTimeout(()=>r.remove(),3500)},R=o=>{const t=document.querySelector(o);t&&(t.classList.remove("input-error"),t.removeAttribute("aria-invalid"))},$=(o,t)=>{const s=document.querySelector(o);s&&(s.classList.add("input-error"),s.setAttribute("aria-invalid","true"),s.focus(),b(t))},g=o=>{!e.socket||e.socket.readyState!==WebSocket.OPEN||e.socket.send(JSON.stringify(o))},p=(o,t={})=>{g({type:"lobbies_event",event:o,data:t})},f=o=>{o&&g({type:"subscribe_room",roomId:o})},T=(o,t)=>{e.socket?.readyState===WebSocket.OPEN||e.socket?.readyState===WebSocket.CONNECTING||(e.socket=new WebSocket(e.wsUrl),e.socket.onopen=()=>{g({type:"subscribe_lobbies"}),e.activeRoom?.roomId&&f(e.activeRoom.roomId)},e.socket.onmessage=async s=>{let r;try{r=JSON.parse(s.data)}catch{return}if(r?.type==="lobbies_event"){await o(),(e.activeTab==="home"||e.activeTab==="lobbies"||e.activeTab==="profile")&&t();return}if(r?.type==="room_event"&&r?.roomId&&e.activeRoom?.roomId===r.roomId){if(r?.event==="chat_message"&&r?.data?.text){e.roomChatMessages=[...e.roomChatMessages,{username:r?.data?.username||"user",role:r?.data?.role||"player",text:r?.data?.text||""}].slice(-100),e.activeTab==="roomManage"&&t();return}try{e.activeRoom=await l(`/rooms/${encodeURIComponent(r.roomId)}`),t()}catch{}return}r?.type==="presence"&&r?.roomId&&e.activeRoom?.roomId===r.roomId&&(e.roomChatMessages=[...e.roomChatMessages,{username:a("roleSystem"),role:"system",text:r?.message||""}].slice(-100),e.activeTab==="roomManage"&&t())},e.socket.onclose=()=>{e.socket=null,window.setTimeout(()=>T(o,t),3e3)})},w=(o,t="login")=>{e.authOpen=!0,e.authMode=t,o()},L=(o,t="create")=>{e.roomModalOpen=!0,e.roomModalMode=t,e.homeStatusMessage="",o()},H=o=>{e.roomModalOpen=!1,o()},E=o=>{e.joinLobbyModalOpen=!1,e.joinLobbyRoomId="",e.joinLobbyOwnerUserId="",e.joinLobbyNeedsPassword=!1,e.joinLobbyPassword="",o()},P=async(o,t,s,r="")=>{try{if(e.user?.id&&s===e.user.id)e.activeRoom=await l(`/rooms/${encodeURIComponent(t)}`);else{const i={spectator:!1};r.trim()!==""&&(i.password=r.trim()),e.activeRoom=await l(`/rooms/${encodeURIComponent(t)}/join`,{method:"POST",body:JSON.stringify(i)})}return f(e.activeRoom.roomId),p("room_joined",{roomId:e.activeRoom.roomId,topic:v}),e.activeTab="home",n("homeStatus",`${a("roomJoinSuccess")} ${e.activeRoom.roomId}`,!0),e.roomChatMessages=[],b(a("roomJoinSuccess"),"ok"),o(),!0}catch(i){return n("homeStatus",i.message),b(i.message),!1}},J=o=>{document.querySelector('[data-act="createRoom"]')?.addEventListener("click",async()=>{if(!e.user)return w(o,"login");R("#roomName");try{const t=d("#roomName",64);if(t===""){$("#roomName",a("requiredField"));return}const s=d("#roomPassword",128),r={name:t,isPublic:!!document.querySelector("#roomIsPublic")?.checked};s!==""&&(r.password=s),e.activeRoom=await l("/rooms",{method:"POST",body:JSON.stringify(r)}),f(e.activeRoom.roomId),e.roomChatMessages=[],p("room_created",{roomId:e.activeRoom.roomId,topic:v}),e.roomModalOpen=!1,e.activeTab="home",e.homeStatusMessage=`${a("roomCreated")} ${e.activeRoom.inviteCode}`,o()}catch(t){e.homeStatusMessage=t.message,n("homeStatus",t.message),b(t.message)}}),document.querySelector('[data-act="joinByCode"]')?.addEventListener("click",async()=>{if(!e.user)return w(o,"login");R("#inviteCode");try{const t=d("#inviteCode",6).toUpperCase();if(t.length!==6){$("#inviteCode",a("inviteCodeInvalid"));return}const s=d("#joinPassword",128),r={inviteCode:t,spectator:!!document.querySelector("#joinAsSpectator")?.checked};s!==""&&(r.password=s),e.activeRoom=await l("/rooms/join-by-code",{method:"POST",body:JSON.stringify(r)}),f(e.activeRoom.roomId),e.roomChatMessages=[],p("room_joined",{roomId:e.activeRoom.roomId,topic:v}),e.roomModalOpen=!1,e.activeTab="home",e.homeStatusMessage=`${a("roomJoinSuccess")} ${e.activeRoom.roomId}`,o()}catch(t){e.homeStatusMessage=t.message,n("homeStatus",t.message),b(t.message)}})},F=o=>{document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{e.activeTab=t.dataset.tab,o()})}),document.querySelectorAll("[data-lang]").forEach(t=>{t.addEventListener("click",()=>{e.lang=t.dataset.lang,localStorage.setItem("stories_lang",e.lang),o()})}),document.querySelector('[data-act="toggleAuth"]')?.addEventListener("click",()=>w(o,"login")),document.querySelector('[data-act="heroCreate"]')?.addEventListener("click",()=>{if(!e.user)return w(o,"login");L(o,"create")}),document.querySelector('[data-act="heroJoin"]')?.addEventListener("click",()=>{if(!e.user)return w(o,"login");L(o,"join")}),document.querySelectorAll('[data-act="closeAuth"]').forEach(t=>{t.addEventListener("click",()=>{e.authOpen=!1,o()})}),document.querySelector('[data-act="logout"]')?.addEventListener("click",()=>{e.token="",e.user=null,e.activeRoom=null,e.authOpen=!1,localStorage.removeItem("stories_token"),o()}),document.querySelectorAll('[data-act="closeRoomModal"]').forEach(t=>{t.addEventListener("click",()=>H(o))}),document.querySelectorAll('[data-act="closeJoinLobbyModal"]').forEach(t=>{t.addEventListener("click",()=>E(o))}),document.querySelector('[data-act="confirmJoinLobby"]')?.addEventListener("click",async()=>{if(!e.joinLobbyRoomId)return;R("#lobbyJoinPassword");const t=d("#lobbyJoinPassword",128);if(e.joinLobbyNeedsPassword&&t===""){$("#lobbyJoinPassword",a("requiredField")),n("joinLobbyStatus",a("requiredField"));return}await P(o,e.joinLobbyRoomId,e.joinLobbyOwnerUserId,t)&&E(o)}),e.roomModalOpen&&e.user&&J(o)},D=async(o,t)=>{document.querySelector('[data-act="switchAuthMode"]')?.addEventListener("click",()=>{e.authMode=e.authMode==="login"?"register":"login",o()}),document.querySelector('[data-act="authSubmit"]')?.addEventListener("click",async()=>{const s=e.authMode==="login"?"/auth/login":"/auth/register",r=e.authMode==="login"?a("loginSuccess"):a("registerSuccess");try{const i=await l(s,{method:"POST",body:JSON.stringify({username:d("#authUsername",64),password:d("#authPassword",128)})});e.token=i.accessToken,localStorage.setItem("stories_token",e.token),await t(),n("authStatus",r,!0),e.authOpen=!1,o()}catch(i){n("authStatus",i.message)}})},W=o=>{(async()=>{if(e.activeRoom?.roomId&&!(e.activeRoom.ownerId&&e.activeRoom.inviteCode))try{e.activeRoom=await l(`/rooms/${encodeURIComponent(e.activeRoom.roomId)}`),o()}catch(r){n("homeStatus",r.message)}})();const s=()=>e.activeRoom?.roomId?!0:(n("homeStatus",a("roomNotFound")),!1);document.querySelector('[data-act="refreshRoom"]')?.addEventListener("click",async()=>{if(s())try{e.activeRoom=await l(`/rooms/${encodeURIComponent(e.activeRoom.roomId)}`),n("homeStatus",a("ready"),!0),o()}catch(r){n("homeStatus",r.message)}}),document.querySelector('[data-act="readyRoom"]')?.addEventListener("click",async()=>{if(s())try{const i=!((e.activeRoom.participants||[]).find(c=>c.userId===e.user?.id)?.ready??!1);e.activeRoom=await l(`/rooms/${encodeURIComponent(e.activeRoom.roomId)}/ready`,{method:"POST",body:JSON.stringify({ready:i})}),p("room_ready_changed",{roomId:e.activeRoom.roomId,topic:v}),n("homeStatus",a(i?"statusReady":"statusNotReady"),!0),o()}catch(r){n("homeStatus",r.message)}}),document.querySelector('[data-act="startGame"]')?.addEventListener("click",async()=>{if(s())try{e.activeRoom=await l(`/rooms/${encodeURIComponent(e.activeRoom.roomId)}/start`,{method:"POST"}),p("room_started",{roomId:e.activeRoom.roomId,topic:v}),n("homeStatus",a("ready"),!0),o()}catch(r){n("homeStatus",r.message)}}),document.querySelector('[data-act="leaveRoom"]')?.addEventListener("click",async()=>{if(s())try{const r=e.activeRoom.roomId;await l(`/rooms/${encodeURIComponent(e.activeRoom.roomId)}/leave`,{method:"POST"}),e.activeRoom=null,e.activeTab="home",p("room_left",{roomId:r,topic:v}),n("homeStatus",a("ready"),!0),o()}catch(r){n("homeStatus",r.message)}}),document.querySelectorAll('[data-act="joinLobby"]').forEach(r=>{r.addEventListener("click",async()=>{if(!e.user)return w(o,"login");const i=r.dataset.roomId;if(!i)return;const c=r.dataset.roomOwnerId||"",m=r.dataset.roomHasPassword==="1";if(e.user?.id&&c===e.user.id){await P(o,i,c);return}e.joinLobbyModalOpen=!0,e.joinLobbyRoomId=i,e.joinLobbyOwnerUserId=c,e.joinLobbyNeedsPassword=m,o()})})},x=o=>{document.querySelector('[data-act="saveRoomSettings"]')?.addEventListener("click",async()=>{if(e.activeRoom?.roomId)try{const t=!!document.querySelector("#manageIsPublic")?.checked,s=d("#managePassword",128);e.activeRoom=await l(`/rooms/${encodeURIComponent(e.activeRoom.roomId)}/settings`,{method:"PATCH",body:JSON.stringify({isPublic:t,password:s})}),p("room_settings_updated",{roomId:e.activeRoom.roomId,topic:v}),n("roomManageStatus",a("roomSettingsSaved"),!0),b(a("roomSettingsSaved"),"ok"),o()}catch(t){n("roomManageStatus",t.message),b(t.message)}}),document.querySelector('[data-act="regenInvite"]')?.addEventListener("click",async()=>{if(e.activeRoom?.roomId)try{e.activeRoom=await l(`/rooms/${encodeURIComponent(e.activeRoom.roomId)}/invite-code/regenerate`,{method:"POST"}),p("room_invite_regenerated",{roomId:e.activeRoom.roomId,topic:v}),n("roomManageStatus",a("inviteRegenerated"),!0),b(a("inviteRegenerated"),"ok"),o()}catch(t){n("roomManageStatus",t.message),b(t.message)}}),document.querySelectorAll('[data-act="kickParticipant"]').forEach(t=>{t.addEventListener("click",async()=>{if(!e.activeRoom?.roomId)return;const s=t.dataset.userId;if(s)try{e.activeRoom=await l(`/rooms/${encodeURIComponent(e.activeRoom.roomId)}/participants/${encodeURIComponent(s)}/kick`,{method:"POST"}),p("room_participant_kicked",{roomId:e.activeRoom.roomId,userId:s,topic:v}),o()}catch(r){n("roomManageStatus",r.message),b(r.message)}})}),document.querySelectorAll('[data-act="banParticipant"]').forEach(t=>{t.addEventListener("click",async()=>{if(!e.activeRoom?.roomId)return;const s=t.dataset.userId;if(s)try{e.activeRoom=await l(`/rooms/${encodeURIComponent(e.activeRoom.roomId)}/participants/${encodeURIComponent(s)}/ban`,{method:"POST"}),p("room_participant_banned",{roomId:e.activeRoom.roomId,userId:s,topic:v}),o()}catch(r){n("roomManageStatus",r.message),b(r.message)}})}),document.querySelector('[data-act="sendRoomChat"]')?.addEventListener("click",()=>{const t=d("#roomChatInput",512);if(!e.activeRoom?.roomId||t==="")return;g({type:"room_event",roomId:e.activeRoom.roomId,event:"chat_message",data:{text:t,username:e.user?.username||"user",role:(e.activeRoom.participants||[]).find(r=>r.userId===e.user?.id)?.role||"player"}});const s=document.querySelector("#roomChatInput");s&&(s.value="")})},B=o=>{const t=async()=>{try{e.lobbyCatalog=(await l(`/lobbies?visibility=${encodeURIComponent(e.lobbyFilters.visibility)}&password=${encodeURIComponent(e.lobbyFilters.password)}&limit=${e.lobbyFilters.limit}`)).items||[],n("lobbyStatus",a("ready"),!0),o()}catch(s){n("lobbyStatus",s.message)}};document.querySelector('[data-act="loadLobbies"]')?.addEventListener("click",async()=>{e.lobbyFilters.visibility=d("#lobbyVisibility",16)||"all",e.lobbyFilters.password=d("#lobbyPasswordFilter",20)||"all",e.lobbyFilters.limit=Number(d("#lobbyLimit",3)||"20"),await t()}),document.querySelectorAll('[data-act="joinLobby"]').forEach(s=>{s.addEventListener("click",async()=>{if(!e.user)return w(o,"login");const r=s.dataset.roomId;if(!r)return;const i=s.dataset.roomOwnerId||"",c=s.dataset.roomHasPassword==="1";if(e.user?.id&&i===e.user.id){await P(o,r,i);return}e.joinLobbyModalOpen=!0,e.joinLobbyRoomId=r,e.joinLobbyOwnerUserId=i,e.joinLobbyNeedsPassword=c,o()})})},K=o=>{document.querySelectorAll('[data-act="openOwnedRoom"]').forEach(t=>{t.addEventListener("click",async()=>{try{const s=t.dataset.roomId;if(!s)return;e.activeRoom=await l(`/rooms/${encodeURIComponent(s)}`),e.activeTab="home",o()}catch(s){n("profileStatus",s.message)}})}),document.querySelector('[data-act="saveProfile"]')?.addEventListener("click",async()=>{try{const s={username:d("#profileUsername",64)};e.user=await l("/auth/me",{method:"PATCH",body:JSON.stringify(s)}),n("profileStatus",a("profileUpdated"),!0),o()}catch(t){n("profileStatus",t.message)}}),document.querySelector('[data-act="changePassword"]')?.addEventListener("click",async()=>{try{await l("/auth/change-password",{method:"POST",body:JSON.stringify({currentPassword:d("#currentPassword",128),newPassword:d("#nextPassword",128)})});const t=document.querySelector("#currentPassword"),s=document.querySelector("#nextPassword");t&&(t.value=""),s&&(s.value=""),n("profileStatus",a("passwordChanged"),!0)}catch(t){n("profileStatus",t.message)}})},V=o=>{x(o)},z=()=>{const o=document.querySelector("#adminOutput");o&&(document.querySelector('[data-act="loadCards"]')?.addEventListener("click",async()=>{try{const t=d("#adminDeck",16),s=await l(`/admin/cards?deck=${encodeURIComponent(t)}`);o.textContent=JSON.stringify(s,null,2),n("adminStatus",a("cardsLoaded",{deck:t}),!0)}catch(t){n("adminStatus",t.message)}}),document.querySelector('[data-act="loadEffects"]')?.addEventListener("click",async()=>{try{const t=await l("/admin/effects");o.textContent=JSON.stringify(t,null,2),n("adminStatus",a("effectsLoaded"),!0)}catch(t){n("adminStatus",t.message)}}),document.querySelector('[data-act="patchCard"]')?.addEventListener("click",async()=>{try{const t=d("#adminDeck",16),s=d("#adminCardCode",64),r={name:d("#adminCardName",64),text:d("#adminCardText",512),enabled:!!document.querySelector("#adminEnabled")?.checked},i=d("#adminCardValue",16),c=d("#adminEffectKey",64);i!==""&&(r.value=Number(i)),c!==""&&(r.effectKey=c);const m=await l(`/admin/cards/${encodeURIComponent(t)}/${encodeURIComponent(s)}`,{method:"PATCH",body:JSON.stringify(r)});o.textContent=JSON.stringify(m,null,2),n("adminStatus",a("cardUpdated"),!0)}catch(t){n("adminStatus",t.message)}}))},G=()=>{const o={apiBase:document.querySelector("#apiBase"),checkHealth:document.querySelector("#checkHealth"),wsUrl:document.querySelector("#wsUrl"),wsConnect:document.querySelector("#wsConnect"),roomId:document.querySelector("#roomId"),subscribeRoom:document.querySelector("#subscribeRoom"),sendPing:document.querySelector("#sendPing"),sendEvent:document.querySelector("#sendEvent"),eventName:document.querySelector("#eventName")};!o.apiBase||!o.wsUrl||!o.checkHealth||!o.wsConnect||(o.checkHealth.addEventListener("click",async()=>{try{e.apiBase=C(o.apiBase.value,["http:","https:"]);const t=await l("/health");n("healthStatus",`OK: ${JSON.stringify(t)}`,!0)}catch(t){n("healthStatus",`${a("healthError")}: ${t.message}`)}}),o.wsConnect.addEventListener("click",()=>{try{e.wsUrl=C(o.wsUrl.value,["ws:","wss:"])}catch(t){n("wsStatus",t.message);return}e.socket?.close(),e.socket=new WebSocket(e.wsUrl),e.socket.onopen=()=>{n("wsStatus",a("wsConnected"),!0),h("socket open"),g({type:"subscribe_lobbies"})},e.socket.onmessage=t=>{try{h(JSON.parse(t.data))}catch{h(t.data)}},e.socket.onclose=()=>{n("wsStatus",a("wsClosed")),h("socket close")},e.socket.onerror=()=>{n("wsStatus",a("wsError")),h("socket error")}}),o.subscribeRoom?.addEventListener("click",()=>{if(!e.socket||e.socket.readyState!==WebSocket.OPEN)return h(a("connectSocketFirst"));e.socket.send(JSON.stringify({type:"subscribe_room",roomId:d("#roomId",64)}))}),o.sendPing?.addEventListener("click",()=>{if(!e.socket||e.socket.readyState!==WebSocket.OPEN)return h(a("connectSocketFirst"));e.socket.send(JSON.stringify({type:"ping"}))}),o.sendEvent?.addEventListener("click",()=>{if(!e.socket||e.socket.readyState!==WebSocket.OPEN)return h(a("connectSocketFirst"));e.socket.send(JSON.stringify({type:"room_event",roomId:d("#roomId",64),event:d("#eventName",128),data:{source:"frontend"}}))}))},Y=()=>{if(!e.authOpen||e.user)return"";const o=e.authMode==="login";return`
    <div class="modal-overlay" data-act="closeAuth"></div>
    <section class="modal auth-modal">
      <div class="modal-head">
        <div>
          <h2>${a(o?"login":"register")}</h2>
          <p>${a("authHint")}</p>
        </div>
        <button class="chip" data-act="closeAuth">${a("close")}</button>
      </div>

      <article class="auth-card">
        <div class="stack">
          <input id="authUsername" placeholder="${a("username")}" />
          <input id="authPassword" placeholder="${a("password")}" type="password" />
          <button class="primary" data-act="authSubmit">${a(o?"login":"createAccount")}</button>
          <button class="chip" data-act="switchAuthMode">${a(o?"switchToRegister":"switchToLogin")}</button>
        </div>
      </article>

      <div id="authStatus" class="status"></div>
    </section>
  `},Q=()=>{if(!e.roomModalOpen||!e.user)return"";const o=e.roomModalMode==="create";return`
    <div class="modal-overlay" data-act="closeRoomModal"></div>
    <section class="modal room-modal">
      <div class="modal-head">
        <div>
          <h2>${a(o?"createRoom":"connectCode")}</h2>
          <p>${a(o?"heroSubtitle":"joinHint")}</p>
        </div>
        <button class="chip" data-act="closeRoomModal">${a("close")}</button>
      </div>

      <article class="auth-card">
        ${o?`
        <div class="stack">
          <input id="roomName" placeholder="${a("roomName")}" />
          <label><input id="roomIsPublic" type="checkbox" checked /> ${a("visibilityPublic")}</label>
          <input id="roomPassword" placeholder="${a("roomPassword")}" type="password" />
          <button class="primary" data-act="createRoom">${a("createRoom")}</button>
        </div>`:`
        <div class="stack">
          <input id="inviteCode" placeholder="AB12CD" maxlength="6" />
          <input id="joinPassword" placeholder="${a("roomPassword")}" type="password" />
          <label><input id="joinAsSpectator" type="checkbox" /> ${a("spectator")}</label>
          <button class="secondary" data-act="joinByCode">${a("connect")}</button>
        </div>`}
      </article>

      <div id="homeStatus" class="status">${u(e.homeStatusMessage||"")}</div>
    </section>
  `},X=()=>`
  <section class="hero">
    <div class="hero-mist" aria-hidden="true"></div>
    <div class="hero-copy">
      <span class="hero-kicker">${a("appTag")}</span>
      <h1>LETTERS:<br/>NO MERCY</h1>
      <p class="hero-subline">DARK MEDIEVAL STORIES</p>
      <p>${a("heroSubtitle")}</p>
      <div class="hero-actions">
        <button class="primary" data-act="heroCreate">＋ ${a("heroCreate")}</button>
        <button class="secondary" data-act="heroJoin">${a("heroJoin")}</button>
      </div>
    </div>
    <div class="hero-art" aria-hidden="true">
      <div class="castle-silhouette"></div>
      <div class="letter-token"></div>
    </div>
  </section>
`,Z=()=>{const o=e.homeLobbies;return`
    <section class="lobby-card">
      <div class="lobby-head">
        <h3>${a("availableRooms")}</h3>
        <button class="chip" data-tab="lobbies">${a("navLobbies")}</button>
      </div>
      <div class="lobby-list">
        ${o.length===0?`<p>${a("lobbyNoItems")}</p>`:o.map(t=>`
          <article class="lobby-item">
            <div class="lobby-icon">${t.isPublic?"☀":"☾"}</div>
            <div class="lobby-meta">
              <h4>${u(t.name)} ${t.hasPassword?'<span class="inline-tag">🔒</span>':""}</h4>
              <p>${t.isPublic?a("visibilityPublic"):a("visibilityPrivate")} • ${t.hasPassword?a("lobbyHasPassword"):a("lobbyNoPassword")}</p>
            </div>
            <div class="lobby-count">👥 ${t.playersCount} / 8</div>
            <button class="secondary" data-act="joinLobby" data-room-id="${u(t.roomId)}" data-room-owner-id="${u(t.ownerUserId||"")}" data-room-has-password="${t.hasPassword?"1":"0"}">${a("joinLobby")}</button>
          </article>
        `).join("")}
      </div>
    </section>
  `},O=o=>{const t=e.user?.id===o.userId,s=e.user?.id&&e.activeRoom?.ownerId===e.user.id,r=s&&o.role==="player"&&o.userId!==e.activeRoom?.ownerId,i=s&&o.userId!==e.activeRoom?.ownerId;return`
    <li class="participant-item">
      <div>
        <b class="role-${u(o.role)}">${u(o.username)}</b> ${t?`<span class="inline-note">(${a("youLabel")})</span>`:""}
      </div>
      <div class="participant-meta">${u(o.role)} · ${o.ready?"ready":"not ready"}</div>
      ${r||i?`<div class="participant-actions">
        ${r?`<button class="chip" data-act="kickParticipant" data-user-id="${u(o.userId)}">${a("kickPlayer")}</button>`:""}
        ${i?`<button class="chip" data-act="banParticipant" data-user-id="${u(o.userId)}">${a("banPlayer")}</button>`:""}
      </div>`:""}
    </li>
  `},ee=()=>{if(!e.activeRoom)return"";const o=Array.isArray(e.activeRoom.participants)?e.activeRoom.participants:[],t=o.filter(i=>i.role!=="spectator"),s=o.filter(i=>i.role==="spectator"),r=!!e.user?.id&&e.user.id===e.activeRoom.ownerId;return`
    <article class="room-panel">
      <h3>${a("roomDetails")}</h3>
      <div class="room-meta">
        <div><span>${a("roomCode")}:</span> <b>${u(e.activeRoom.inviteCode||"—")}</b></div>
        <div><span>${a("roomOwnerName")}:</span> <b>${u(e.activeRoom.ownerUsername||e.activeRoom.ownerId||"—")}</b></div>
      </div>
      <div class="room-lists">
        <div>
          <h4>${a("roomParticipants")} (${t.length})</h4>
          <ul class="participant-list">${t.map(O).join("")}</ul>
        </div>
        <div>
          <h4>${a("roomSpectators")} (${s.length})</h4>
          <ul class="participant-list">${s.map(O).join("")}</ul>
        </div>
      </div>
      <div class="stack">
        <h4>${a("roomActions")}</h4>
        <div class="room-actions">
          <button class="secondary" data-act="refreshRoom">${a("refreshRoom")}</button>
          <button class="secondary" data-act="readyRoom">${a("markReady")}</button>
          <button class="primary" data-act="startGame">${a("startGame")}</button>
          ${r?`<button class="secondary" data-tab="roomManage">${a("roomManage")}</button>`:""}
          <button class="chip" data-act="leaveRoom">${a(r?"closeOwnedRoom":"leaveRoom")}</button>
        </div>
      </div>
    </article>
  `},oe=()=>!e.activeRoom||e.activeRoom.ownerId!==e.user?.id?`<article><h3>${a("roomManageTitle")}</h3><p>${a("forbidden")}</p></article>`:`
    <article>
      <h3>${a("roomManageTitle")}</h3>
      <div class="stack">
        <label><input id="manageIsPublic" type="checkbox" ${e.activeRoom.isPublic?"checked":""} /> ${a("visibilityPublic")}</label>
        <input id="managePassword" type="password" placeholder="${a("roomPassword")}" />
        <div class="row">
          <button class="primary" data-act="saveRoomSettings">${a("saveRoomSettings")}</button>
          <button class="secondary" data-act="regenInvite">${a("regenerateInvite")}</button>
        </div>
      </div>
    </article>
    <article>
      <h3>${a("roomChat")}</h3>
      <div class="chat-log">
        ${(e.roomChatMessages||[]).map(o=>`<div class="chat-line role-${u(o.role||"system")}">
          <b>${u(o.username||a("roleSystem"))}</b>: ${u(o.text||"")}
        </div>`).join("")}
      </div>
      <div class="row topgap">
        <input id="roomChatInput" placeholder="${a("chatPlaceholder")}" />
        <button class="primary" data-act="sendRoomChat">${a("send")}</button>
      </div>
    </article>
    <div id="roomManageStatus" class="status"></div>
  `,te=()=>`
    ${X()}
    ${Z()}
    ${ee()}
  `,ae=()=>`
  <h2>${a("lobbyTitle")}</h2>
  <p>${a("lobbyHint")}</p>
  <article>
    <div class="row">
      <select id="lobbyVisibility">
        <option value="all" ${e.lobbyFilters.visibility==="all"?"selected":""}>${a("visibilityAll")}</option>
        <option value="public" ${e.lobbyFilters.visibility==="public"?"selected":""}>${a("visibilityPublic")}</option>
        <option value="private" ${e.lobbyFilters.visibility==="private"?"selected":""}>${a("visibilityPrivate")}</option>
      </select>
      <select id="lobbyPasswordFilter">
        <option value="all" ${e.lobbyFilters.password==="all"?"selected":""}>${a("passwordAll")}</option>
        <option value="with_password" ${e.lobbyFilters.password==="with_password"?"selected":""}>${a("passwordWith")}</option>
        <option value="without_password" ${e.lobbyFilters.password==="without_password"?"selected":""}>${a("passwordWithout")}</option>
      </select>
      <input id="lobbyLimit" type="number" min="1" max="100" value="${e.lobbyFilters.limit}" />
      <button class="secondary" data-act="loadLobbies">${a("loadLobbies")}</button>
    </div>
  </article>
  <div class="lobby-list topgap">
    ${e.lobbyCatalog.length===0?`<article><p>${a("lobbyNoItems")}</p></article>`:e.lobbyCatalog.map(o=>`
      <article class="lobby-item">
        <div class="lobby-icon">${o.isPublic?"☀":"☾"}</div>
        <div class="lobby-meta">
          <h4>${u(o.name)}</h4>
          <p>${o.status} • ${o.hasPassword?a("lobbyHasPassword"):a("lobbyNoPassword")}</p>
        </div>
        <div class="lobby-count">👥 ${o.playersCount} / 8</div>
        <button class="secondary" data-act="joinLobby" data-room-id="${u(o.roomId)}" data-room-owner-id="${u(o.ownerUserId||"")}" data-room-has-password="${o.hasPassword?"1":"0"}">${a("joinLobby")}</button>
      </article>
    `).join("")}
  </div>
`,se=()=>e.joinLobbyModalOpen?`
    <div class="modal-overlay" data-act="closeJoinLobbyModal"></div>
    <section class="modal room-modal">
      <div class="modal-head">
        <div>
          <h2>${a("joinLobby")}</h2>
          <p>${e.joinLobbyNeedsPassword?a("joinPasswordHint"):a("joinWithoutPasswordHint")}</p>
        </div>
        <button class="chip" data-act="closeJoinLobbyModal">${a("close")}</button>
      </div>
      <article class="auth-card">
        <div class="stack">
          ${e.joinLobbyNeedsPassword?`<input id="lobbyJoinPassword" placeholder="${a("roomPassword")}" type="password" />`:""}
          <button class="primary" data-act="confirmJoinLobby">${a("connect")}</button>
        </div>
      </article>
      <div id="joinLobbyStatus" class="status"></div>
    </section>
  `:"",re=()=>{if(!e.user)return"";const o=e.myRooms||[];return`
    <article>
      <h3>${a("myRooms")}</h3>
      <div class="stack">
        ${o.length===0?`<p>${a("lobbyNoItems")}</p>`:o.map(t=>`
          <div class="row my-room-row">
            <span>${u(t.name)} (${u(t.inviteCode)})</span>
            <button class="chip" data-act="openOwnedRoom" data-room-id="${u(t.roomId)}">${a("openRoom")}</button>
          </div>
        `).join("")}
      </div>
    </article>
  `},ie=()=>e.user?`
    <h2>${a("profileTitle")}</h2>
    <div class="grid">
      <article>
        <h3>${a("profileEdit")}</h3>
        <div class="stack">
          <input id="profileUsername" value="${u(e.user.username)}" />
          <button class="primary" data-act="saveProfile">${a("saveProfile")}</button>
        </div>
      </article>
      ${re()}
      <article>
        <h3>${a("changePassword")}</h3>
        <div class="stack">
          <input id="currentPassword" placeholder="${a("currentPassword")}" type="password" />
          <input id="nextPassword" placeholder="${a("nextPassword")}" type="password" />
          <button class="secondary" data-act="changePassword">${a("changePassword")}</button>
        </div>
      </article>
      <article>
        <h3>${a("stats")}</h3>
        <ul>
          <li>${a("wins")}: <b>${e.user.wins}</b></li>
          <li>${a("losses")}: <b>${e.user.losses}</b></li>
          <li>${a("vt")}: <b>${e.user.victoryTokens}</b></li>
          <li>${a("elim3")}: <b>${e.user.eliminatedWith3}</b></li>
        </ul>
      </article>
    </div>
    <div id="profileStatus" class="status"></div>
  `:`<h2>${a("profileTitle")}</h2><div class="status">${a("needAuthProfile")}</div>`,ne=()=>`
  <article>
    <h3>${a("deckLoad")}</h3>
    <div class="stack">
      <select id="adminDeck">
        <option value="character">character</option>
        <option value="decree">decree</option>
        <option value="event">event</option>
      </select>
      <button class="primary" data-act="loadCards">${a("loadCards")}</button>
      <button class="secondary" data-act="loadEffects">${a("loadEffects")}</button>
    </div>
  </article>
  <article>
    <h3>${a("patchCard")}</h3>
    <div class="stack">
      <input id="adminCardCode" placeholder="${a("cardCode")}" />
      <input id="adminCardName" placeholder="${a("newName")}" />
      <input id="adminCardText" placeholder="${a("newText")}" />
      <input id="adminCardValue" placeholder="${a("valueOrEmpty")}" />
      <input id="adminEffectKey" placeholder="${a("effectKey")}" />
      <label><input id="adminEnabled" type="checkbox" checked /> ${a("enabled")}</label>
      <button class="primary" data-act="patchCard">${a("applyPatch")}</button>
    </div>
  </article>
`,ce=()=>`
  <article>
    <h3>API / WebSocket Debug</h3>
    <div class="row">
      <input id="apiBase" value="${u(e.apiBase)}" />
      <button id="checkHealth" class="secondary">${a("checkHealth")}</button>
    </div>
    <div id="healthStatus" class="status">${a("waitingRequest")}</div>
    <div class="row topgap">
      <input id="wsUrl" value="${u(e.wsUrl)}" />
      <button id="wsConnect" class="secondary">${a("connectWs")}</button>
    </div>
    <div class="row topgap">
      <input id="roomId" placeholder="roomId" />
      <button id="subscribeRoom">${a("subscribe")}</button>
      <button id="sendPing">${a("sendPing")}</button>
    </div>
    <div class="row topgap">
      <input id="eventName" value="frontend_debug" />
      <button id="sendEvent">${a("sendEvent")}</button>
    </div>
    <div id="wsStatus" class="status">${a("wsNotConnected")}</div>
    <div id="debugLog" class="log"></div>
  </article>
`,de=()=>`
  <h2>${a("controlPanelTitle")}</h2>
  <p>${a("controlPanelHint")}</p>
  <div class="grid">
    ${ne()}
    ${ce()}
  </div>
  <div id="adminStatus" class="status"></div>
  <pre id="adminOutput" class="json"></pre>
`,le=()=>{const o=e.user?`<div class="profile-actions"><button class="avatar-btn" data-tab="profile">${u((e.user.username||"U").slice(0,1).toUpperCase())}</button><button class="chip" data-act="logout">${a("logout")}</button></div>`:`<button class="primary" data-act="toggleAuth">${a("openAuth")}</button>`;return`
  <main class="layout dark">
    <header class="topbar">
      <div class="brand-mini">
        <h2>LETTERS: NO MERCY</h2>
        <p class="brand-sub">Dark Medieval Stories</p>
      </div>
      <nav class="main-nav">
        <button class="tab ${e.activeTab==="home"?"active":""}" data-tab="home">${a("navHome")}</button>
        <button class="tab ${e.activeTab==="lobbies"?"active":""}" data-tab="lobbies">${a("navLobbies")}</button>
        ${e.activeRoom&&e.activeRoom.ownerId===e.user?.id?`<button class="tab ${e.activeTab==="roomManage"?"active":""}" data-tab="roomManage">${a("roomManage")}</button>`:""}
        <button class="tab ${e.activeTab==="profile"?"active":""}" data-tab="profile">${a("navProfile")}</button>
      </nav>
      <div class="topbar-actions">
        <button class="primary" data-act="heroCreate">＋ ${a("heroCreate")}</button>
        <div class="lang-switch compact">
          <button class="chip ${e.lang==="ru"?"active":""}" data-lang="ru">RU</button>
          <button class="chip ${e.lang==="en"?"active":""}" data-lang="en">EN</button>
        </div>
        ${o}
      </div>
    </header>

    <section class="panel ${e.activeTab==="home"?"":"hidden"} cinematic-panel">${te()}</section>
    <section class="panel ${e.activeTab==="lobbies"?"":"hidden"} cinematic-panel">${ae()}</section>
    <section class="panel ${e.activeTab==="roomManage"?"":"hidden"} cinematic-panel">${oe()}</section>
    <section class="panel ${e.activeTab==="profile"?"":"hidden"} cinematic-panel">${ie()}</section>
    ${e.user?.role==="admin"?`<section class="panel ${e.activeTab==="control"?"":"hidden"}">${de()}</section>`:""}

    ${Y()}
    ${Q()}
    ${se()}
    <div id="toastContainer" class="toast-container"></div>
  </main>`},N=document.querySelector("#app"),A=async()=>{if(e.token)try{e.user=await l("/auth/me")}catch{e.user=null,e.token="",localStorage.removeItem("stories_token")}},y=()=>{N&&(I(),N.innerHTML=le(),F(y),e.activeTab==="home"&&W(y),e.activeTab==="lobbies"&&B(y),e.activeTab==="profile"&&K(y),e.activeTab==="roomManage"&&V(y),e.activeTab==="control"&&e.user?.role==="admin"&&(z(),G()),e.authOpen&&!e.user&&D(y,A))},S=async(o="public",t=4)=>{try{const s=await l(`/lobbies?visibility=${encodeURIComponent(o)}&limit=${t}`);o==="public"&&(e.homeLobbies=s.items||[]),o==="all"&&(e.lobbyCatalog=s.items||[])}catch{o==="public"&&(e.homeLobbies=[]),o==="all"&&(e.lobbyCatalog=[])}},I=()=>{if(!e.user){e.myRooms=[];return}const o=[...e.homeLobbies,...e.lobbyCatalog],t=new Map;o.filter(s=>s.ownerUserId===e.user.id).forEach(s=>t.set(s.roomId,s)),e.myRooms=[...t.values()]};await A();await S("public",4);await S("all",e.lobbyFilters.limit);I();T(async()=>{await S("public",4),await S("all",e.lobbyFilters.limit),I()},y);y();
//# sourceMappingURL=index-CnCYZ2Vk.js.map
