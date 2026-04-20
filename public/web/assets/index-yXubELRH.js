(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const c of i)if(c.type==="childList")for(const m of c.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&r(m)}).observe(document,{childList:!0,subtree:!0});function s(i){const c={};return i.integrity&&(c.integrity=i.integrity),i.referrerPolicy&&(c.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?c.credentials="include":i.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(i){if(i.ep)return;i.ep=!0;const c=s(i);fetch(i.href,c)}})();const e={apiBase:window.location.origin,wsUrl:`ws://${window.location.hostname}:8081`,token:localStorage.getItem("stories_token")||"",user:null,activeRoom:null,activeTab:"home",homeLobbies:[],lobbyCatalog:[],lobbyFilters:{visibility:"all",password:"all",limit:20},socket:null,lang:localStorage.getItem("stories_lang")||"ru",authOpen:!1,authMode:"login",roomModalOpen:!1,roomModalMode:"create",homeStatusMessage:"",myRooms:[]},w={ru:{appTag:"Stories",title:"Control Center",subtitle:"Комнаты, профиль, админка и live debug в одном месте.",login:"Вход",register:"Регистрация",logout:"Выйти",notAuthorized:"Не авторизованы",signedAs:"Вы вошли как",navHome:"Комнаты",navProfile:"Профиль",navLobbies:"Лобби",navAdmin:"Админ",navDebug:"Debug",openAuth:"Войти / Регистрация",close:"Закрыть",authTitle:"Авторизация",authHint:"Откройте аккаунт или войдите в существующий.",username:"Имя пользователя",password:"Пароль",createAccount:"Создать аккаунт",loginSuccess:"Успешный вход.",registerSuccess:"Аккаунт создан и выполнен вход.",homeNeedAuth:"Выполните вход для доступа к комнатам.",roomsTitle:"Комнаты",createRoom:"Создать комнату",roomName:"Название комнаты",connectCode:"Войти по invite-коду",connect:"Подключиться",spectator:"Зайти как spectator",ready:"",roomCreated:"Комната создана. Invite code:",roomJoinSuccess:"Подключение успешно. Room:",profileTitle:"Профиль пользователя",profileEdit:"Редактирование",newPassword:"Новый пароль (опционально)",saveProfile:"Сохранить профиль",stats:"Статистика",needAuthProfile:"Сначала авторизуйтесь.",profileUpdated:"Профиль обновлен.",passwordChanged:"Пароль успешно изменён.",currentPassword:"Текущий пароль",nextPassword:"Новый пароль",changePassword:"Сменить пароль",wins:"Победы",losses:"Поражения",vt:"Victory tokens",elim3:"Eliminated with 3",adminTitle:"Админ-панель (RBAC)",deckLoad:"Загрузка колоды",loadCards:"Показать cards",loadEffects:"Показать effects",patchCard:"Patch card",cardCode:"cardCode",newName:"Новое имя",newText:"Новый текст",valueOrEmpty:"value (или пусто)",effectKey:"effectKey",enabled:"enabled",applyPatch:"Применить PATCH",cardsLoaded:"Cards для {deck} загружены.",effectsLoaded:"Effects загружены.",cardUpdated:"Карта обновлена.",debugTitle:"Debug",oldInterface:"Техпанель для API и WebSocket.",checkHealth:"Проверить /health",waitingRequest:"Ожидание запроса…",websocket:"WebSocket",connectWs:"Подключиться",subscribe:"Подписаться",sendPing:"Ping",sendEvent:"Отправить room_event",wsNotConnected:"Не подключено",wsConnected:"WebSocket подключен",wsClosed:"WebSocket закрыт",wsError:"WebSocket ошибка",connectSocketFirst:"Сначала подключите сокет",healthError:"Ошибка",unknownError:"Неизвестная ошибка",httpError:"Ошибка HTTP {status}",invalidCredentials:"Неверный логин или пароль.",currentPasswordInvalid:"Текущий пароль указан неверно.",userExists:"Такой username уже занят.",unauthorized:"Требуется авторизация.",forbidden:"Недостаточно прав.",roomNotFound:"Комната не найдена.",inviteInvalid:"Некорректный invite-код.",validationFailed:"Проверьте корректность введенных данных.",serverUnavailable:"Сервер временно недоступен. Повторите позже.",invalidUrl:"Некорректный URL.",roomPasswordRequired:"Для входа в это лобби нужен пароль.",roomPasswordInvalid:"Неверный пароль лобби.",navControl:"Control Panel",heroTitle:"Stories: project-visual landing",heroSubtitle:"Создавайте комнаты и подключайтесь к игре за секунды.",heroCreate:"Создать комнату",heroJoin:"Присоединиться",roomDetails:"Текущая комната",roomCode:"Код приглашения",roomOwner:"Владелец",roomParticipants:"Участники",roomSpectators:"Зрители",roomActions:"Действия с комнатой",leaveRoom:"Покинуть комнату",refreshRoom:"Обновить состояние",markReady:"Я готов",startGame:"Запустить игру",youLabel:"вы",authRequiredAction:"Для этого действия войдите в аккаунт.",switchToLogin:"Уже есть аккаунт? Войти",switchToRegister:"Нет аккаунта? Регистрация",themeDark:"Тёмная",themeLight:"Светлая",controlPanelTitle:"Control Panel",controlPanelHint:"Только для администраторов: управление данными и live debug.",lobbyTitle:"Список лобби",lobbyHint:"Фильтруйте публичные и закрытые лобби.",visibilityAll:"Все",visibilityPublic:"Публичные",visibilityPrivate:"Закрытые",passwordAll:"Любые",passwordWith:"С паролем",passwordWithout:"Без пароля",loadLobbies:"Обновить список",lobbyNoItems:"Лобби не найдены",lobbyHasPassword:"Пароль",lobbyNoPassword:"Без пароля",joinLobby:"Войти в лобби",roomPassword:"Пароль лобби (если нужен)",availableRooms:"Доступные комнаты",myRooms:"Мои комнаты",openRoom:"Открыть",joinHint:"Введите код приглашения и присоединитесь к комнате."},en:{appTag:"Stories",title:"Control Center",subtitle:"Rooms, profile, admin panel and live debug in one place.",login:"Sign in",register:"Sign up",logout:"Logout",notAuthorized:"Not authorized",signedAs:"Signed in as",navHome:"Rooms",navProfile:"Profile",navLobbies:"Lobbies",navAdmin:"Admin",navDebug:"Debug",openAuth:"Login / Register",close:"Close",authTitle:"Authentication",authHint:"Create an account or sign in.",username:"Username",password:"Password",createAccount:"Create account",loginSuccess:"Signed in successfully.",registerSuccess:"Account created and signed in.",homeNeedAuth:"Sign in to access rooms.",roomsTitle:"Rooms",createRoom:"Create room",roomName:"Room name",connectCode:"Join by invite code",connect:"Connect",spectator:"Join as spectator",ready:"",roomCreated:"Room created. Invite code:",roomJoinSuccess:"Connected successfully. Room:",profileTitle:"User profile",profileEdit:"Edit profile",newPassword:"New password (optional)",saveProfile:"Save profile",stats:"Stats",needAuthProfile:"Sign in first.",profileUpdated:"Profile updated.",passwordChanged:"Password changed successfully.",currentPassword:"Current password",nextPassword:"New password",changePassword:"Change password",wins:"Wins",losses:"Losses",vt:"Victory tokens",elim3:"Eliminated with 3",adminTitle:"Admin panel (RBAC)",deckLoad:"Load deck",loadCards:"Show cards",loadEffects:"Show effects",patchCard:"Patch card",cardCode:"cardCode",newName:"New name",newText:"New text",valueOrEmpty:"value (or empty)",effectKey:"effectKey",enabled:"enabled",applyPatch:"Apply PATCH",cardsLoaded:"Cards for {deck} loaded.",effectsLoaded:"Effects loaded.",cardUpdated:"Card updated.",debugTitle:"Debug",oldInterface:"Technical panel for API and WebSocket.",checkHealth:"Check /health",waitingRequest:"Waiting for request…",websocket:"WebSocket",connectWs:"Connect",subscribe:"Subscribe",sendPing:"Ping",sendEvent:"Send room_event",wsNotConnected:"Not connected",wsConnected:"WebSocket connected",wsClosed:"WebSocket closed",wsError:"WebSocket error",connectSocketFirst:"Connect socket first",healthError:"Error",unknownError:"Unknown error",httpError:"HTTP error {status}",invalidCredentials:"Invalid username or password.",currentPasswordInvalid:"Current password is invalid.",userExists:"This username is already taken.",unauthorized:"Authorization required.",forbidden:"Not enough permissions.",roomNotFound:"Room not found.",inviteInvalid:"Invalid invite code.",validationFailed:"Please check input values.",serverUnavailable:"Server is temporarily unavailable. Try again later.",invalidUrl:"Invalid URL.",roomPasswordRequired:"Lobby password is required.",roomPasswordInvalid:"Invalid lobby password.",navControl:"Control Panel",heroTitle:"Stories: project visual landing",heroSubtitle:"Create rooms and join matches in seconds.",heroCreate:"Create room",heroJoin:"Join room",roomDetails:"Current room",roomCode:"Invite code",roomOwner:"Owner",roomParticipants:"Participants",roomSpectators:"Spectators",roomActions:"Room actions",leaveRoom:"Leave room",refreshRoom:"Refresh state",markReady:"Mark ready",startGame:"Start game",youLabel:"you",authRequiredAction:"Please sign in to continue.",switchToLogin:"Already have an account? Sign in",switchToRegister:"No account yet? Sign up",themeDark:"Dark",themeLight:"Light",controlPanelTitle:"Control Panel",controlPanelHint:"Admin-only area for content management and live debug.",lobbyTitle:"Lobby list",lobbyHint:"Filter public and private lobbies.",visibilityAll:"All",visibilityPublic:"Public",visibilityPrivate:"Private",passwordAll:"Any",passwordWith:"With password",passwordWithout:"Without password",loadLobbies:"Refresh list",lobbyNoItems:"No lobbies found",lobbyHasPassword:"Password",lobbyNoPassword:"No password",joinLobby:"Join lobby",roomPassword:"Lobby password (if required)",availableRooms:"Available rooms",myRooms:"My rooms",openRoom:"Open",joinHint:"Enter invite code and join a room."}},t=(o,a={})=>{const s=w[e.lang]?.[o]??w.ru[o]??o;return Object.entries(a).reduce((r,[i,c])=>r.replaceAll(`{${i}}`,String(c)),s)},P=()=>e.token?{Authorization:`Bearer ${e.token}`}:{},R=(o,a)=>{const s=String(o||"").toUpperCase(),r={INVALID_CREDENTIALS:"invalidCredentials",USER_EXISTS:"userExists",UNAUTHORIZED:"unauthorized",FORBIDDEN:"forbidden",ROOM_NOT_FOUND:"roomNotFound",INVALID_INVITE_CODE:"inviteInvalid",INVITE_CODE_NOT_FOUND:"inviteInvalid",ROOM_PASSWORD_REQUIRED:"roomPasswordRequired",ROOM_PASSWORD_INVALID:"roomPasswordInvalid",CURRENT_PASSWORD_INVALID:"currentPasswordInvalid",VALIDATION_ERROR:"validationFailed",UNKNOWN_ERROR:"unknownError"};return r[s]?r[s]:a===401?"unauthorized":a===403?"forbidden":a>=500?"serverUnavailable":null},k=(o,a,s)=>{const r=a?.message||a?.errorMessage||a?.error||s||"";if(String(a?.errorCode||a?.code||"").toUpperCase()==="UNKNOWN_ERROR"&&/must|invalid|required|password|username/i.test(String(r)))return{key:"validationFailed",message:String(r)};const i=R(a?.code||a?.errorCode,o);return i?{key:i,message:t(i)}:{key:null,message:r||t("httpError",{status:o})}},l=async(o,a={})=>{let s;try{s=await fetch(`${e.apiBase.replace(/\/$/,"")}${o}`,{...a,headers:{"Content-Type":"application/json",...a.headers||{},...P(),Locale:e.lang}})}catch{throw new Error(t("serverUnavailable"))}const r=await s.text();let i={};try{i=r?JSON.parse(r):{}}catch{i={}}if(!s.ok){const c=k(s.status,i,r),m=new Error(c.message||t("unknownError"));throw m.code=c.key,m.status=s.status,m}return i},u=o=>{const a=document.createElement("div");return a.textContent=String(o??""),a.innerHTML},d=(o,a=256)=>{const s=document.querySelector(o);return s?String(s.value??"").trim().slice(0,a):""},f=(o,a)=>{let s;try{s=new URL(String(o||"").trim())}catch{throw new Error(t("invalidUrl"))}if(!a.includes(s.protocol))throw new Error(t("invalidUrl"));return s.toString().replace(/\/$/,"")},n=(o,a,s=!1)=>{const r=document.querySelector(`#${o}`);r&&(r.textContent=a,r.classList.toggle("ok",s))},b=o=>{const a=document.querySelector("#debugLog");if(!a)return;const s=document.createElement("div");s.textContent=`[${new Date().toLocaleTimeString()}] ${typeof o=="string"?o:JSON.stringify(o)}`,a.prepend(s)},h=(o,a="login")=>{e.authOpen=!0,e.authMode=a,o()},g=(o,a="create")=>{e.roomModalOpen=!0,e.roomModalMode=a,e.homeStatusMessage="",o()},E=o=>{e.roomModalOpen=!1,o()},L=o=>{document.querySelectorAll("[data-tab]").forEach(a=>{a.addEventListener("click",()=>{e.activeTab=a.dataset.tab,o()})}),document.querySelectorAll("[data-lang]").forEach(a=>{a.addEventListener("click",()=>{e.lang=a.dataset.lang,localStorage.setItem("stories_lang",e.lang),o()})}),document.querySelector('[data-act="toggleAuth"]')?.addEventListener("click",()=>h(o,"login")),document.querySelector('[data-act="heroCreate"]')?.addEventListener("click",()=>{if(!e.user)return h(o,"login");g(o,"create")}),document.querySelector('[data-act="heroJoin"]')?.addEventListener("click",()=>{if(!e.user)return h(o,"login");g(o,"join")}),document.querySelectorAll('[data-act="closeAuth"]').forEach(a=>{a.addEventListener("click",()=>{e.authOpen=!1,o()})}),document.querySelector('[data-act="logout"]')?.addEventListener("click",()=>{e.token="",e.user=null,e.activeRoom=null,e.authOpen=!1,localStorage.removeItem("stories_token"),o()}),document.querySelectorAll('[data-act="closeRoomModal"]').forEach(a=>{a.addEventListener("click",()=>E(o))})},I=async(o,a)=>{document.querySelector('[data-act="switchAuthMode"]')?.addEventListener("click",()=>{e.authMode=e.authMode==="login"?"register":"login",o()}),document.querySelector('[data-act="authSubmit"]')?.addEventListener("click",async()=>{const s=e.authMode==="login"?"/auth/login":"/auth/register",r=e.authMode==="login"?t("loginSuccess"):t("registerSuccess");try{const i=await l(s,{method:"POST",body:JSON.stringify({username:d("#authUsername",64),password:d("#authPassword",128)})});e.token=i.accessToken,localStorage.setItem("stories_token",e.token),await a(),n("authStatus",r,!0),e.authOpen=!1,o()}catch(i){n("authStatus",i.message)}})},T=o=>{const a=()=>e.activeRoom?.roomId?!0:(n("homeStatus",t("roomNotFound")),!1);document.querySelector('[data-act="createRoom"]')?.addEventListener("click",async()=>{if(!e.user)return h(o,"login");try{const s=d("#roomPassword",128),r={name:d("#roomName",64),isPublic:!!document.querySelector("#roomIsPublic")?.checked};s!==""&&(r.password=s),e.activeRoom=await l("/rooms",{method:"POST",body:JSON.stringify(r)}),e.roomModalOpen=!1,e.activeTab="home",e.homeStatusMessage=`${t("roomCreated")} ${e.activeRoom.inviteCode}`,o()}catch(s){e.homeStatusMessage=s.message,n("homeStatus",s.message)}}),document.querySelector('[data-act="joinByCode"]')?.addEventListener("click",async()=>{if(!e.user)return h(o,"login");try{const s=d("#joinPassword",128),r={inviteCode:d("#inviteCode",6).toUpperCase(),spectator:!!document.querySelector("#joinAsSpectator")?.checked};s!==""&&(r.password=s),e.activeRoom=await l("/rooms/join-by-code",{method:"POST",body:JSON.stringify(r)}),e.roomModalOpen=!1,e.activeTab="home",e.homeStatusMessage=`${t("roomJoinSuccess")} ${e.activeRoom.roomId}`,o()}catch(s){e.homeStatusMessage=s.message,n("homeStatus",s.message)}}),document.querySelector('[data-act="refreshRoom"]')?.addEventListener("click",async()=>{if(a())try{e.activeRoom=await l(`/rooms/${encodeURIComponent(e.activeRoom.roomId)}`),n("homeStatus",t("ready"),!0),o()}catch(s){n("homeStatus",s.message)}}),document.querySelector('[data-act="readyRoom"]')?.addEventListener("click",async()=>{if(a())try{e.activeRoom=await l(`/rooms/${encodeURIComponent(e.activeRoom.roomId)}/ready`,{method:"POST"}),n("homeStatus",t("ready"),!0),o()}catch(s){n("homeStatus",s.message)}}),document.querySelector('[data-act="startGame"]')?.addEventListener("click",async()=>{if(a())try{e.activeRoom=await l(`/rooms/${encodeURIComponent(e.activeRoom.roomId)}/start`,{method:"POST"}),n("homeStatus",t("ready"),!0),o()}catch(s){n("homeStatus",s.message)}}),document.querySelector('[data-act="leaveRoom"]')?.addEventListener("click",async()=>{if(a())try{await l(`/rooms/${encodeURIComponent(e.activeRoom.roomId)}/leave`,{method:"POST"}),e.activeRoom=null,n("homeStatus",t("ready"),!0),o()}catch(s){n("homeStatus",s.message)}}),document.querySelectorAll('[data-act="joinLobby"]').forEach(s=>{s.addEventListener("click",async()=>{if(!e.user)return h(o,"login");const r=s.dataset.roomId;if(r)try{const i=s.dataset.roomOwnerId||"";if(e.user?.id&&i===e.user.id)e.activeRoom=await l(`/rooms/${encodeURIComponent(r)}`);else{const c=window.prompt(t("roomPassword"))||"",m={spectator:!1};c.trim()!==""&&(m.password=c.trim()),e.activeRoom=await l(`/rooms/${encodeURIComponent(r)}/join`,{method:"POST",body:JSON.stringify(m)})}e.activeTab="home",n("homeStatus",`${t("roomJoinSuccess")} ${e.activeRoom.roomId}`,!0),o()}catch(i){n("homeStatus",i.message)}})})},N=o=>{const a=async()=>{try{e.lobbyCatalog=(await l(`/lobbies?visibility=${encodeURIComponent(e.lobbyFilters.visibility)}&password=${encodeURIComponent(e.lobbyFilters.password)}&limit=${e.lobbyFilters.limit}`)).items||[],n("lobbyStatus",t("ready"),!0),o()}catch(s){n("lobbyStatus",s.message)}};document.querySelector('[data-act="loadLobbies"]')?.addEventListener("click",async()=>{e.lobbyFilters.visibility=d("#lobbyVisibility",16)||"all",e.lobbyFilters.password=d("#lobbyPasswordFilter",20)||"all",e.lobbyFilters.limit=Number(d("#lobbyLimit",3)||"20"),await a()}),document.querySelectorAll('[data-act="joinLobby"]').forEach(s=>{s.addEventListener("click",async()=>{if(!e.user)return h(o,"login");const r=s.dataset.roomId;if(r)try{const i=s.dataset.roomOwnerId||"";if(e.user?.id&&i===e.user.id)e.activeRoom=await l(`/rooms/${encodeURIComponent(r)}`);else{const c=window.prompt(t("roomPassword"))||"",m={spectator:!1};c.trim()!==""&&(m.password=c.trim()),e.activeRoom=await l(`/rooms/${encodeURIComponent(r)}/join`,{method:"POST",body:JSON.stringify(m)})}e.activeTab="home",n("homeStatus",`${t("roomJoinSuccess")} ${e.activeRoom.roomId}`,!0),o()}catch(i){n("lobbyStatus",i.message)}})})},A=o=>{document.querySelectorAll('[data-act="openOwnedRoom"]').forEach(a=>{a.addEventListener("click",async()=>{try{const s=a.dataset.roomId;if(!s)return;e.activeRoom=await l(`/rooms/${encodeURIComponent(s)}`),e.activeTab="home",o()}catch(s){n("profileStatus",s.message)}})}),document.querySelector('[data-act="saveProfile"]')?.addEventListener("click",async()=>{try{const s={username:d("#profileUsername",64)};e.user=await l("/auth/me",{method:"PATCH",body:JSON.stringify(s)}),n("profileStatus",t("profileUpdated"),!0),o()}catch(a){n("profileStatus",a.message)}}),document.querySelector('[data-act="changePassword"]')?.addEventListener("click",async()=>{try{await l("/auth/change-password",{method:"POST",body:JSON.stringify({currentPassword:d("#currentPassword",128),newPassword:d("#nextPassword",128)})});const a=document.querySelector("#currentPassword"),s=document.querySelector("#nextPassword");a&&(a.value=""),s&&(s.value=""),n("profileStatus",t("passwordChanged"),!0)}catch(a){n("profileStatus",a.message)}})},O=()=>{const o=document.querySelector("#adminOutput");o&&(document.querySelector('[data-act="loadCards"]')?.addEventListener("click",async()=>{try{const a=d("#adminDeck",16),s=await l(`/admin/cards?deck=${encodeURIComponent(a)}`);o.textContent=JSON.stringify(s,null,2),n("adminStatus",t("cardsLoaded",{deck:a}),!0)}catch(a){n("adminStatus",a.message)}}),document.querySelector('[data-act="loadEffects"]')?.addEventListener("click",async()=>{try{const a=await l("/admin/effects");o.textContent=JSON.stringify(a,null,2),n("adminStatus",t("effectsLoaded"),!0)}catch(a){n("adminStatus",a.message)}}),document.querySelector('[data-act="patchCard"]')?.addEventListener("click",async()=>{try{const a=d("#adminDeck",16),s=d("#adminCardCode",64),r={name:d("#adminCardName",64),text:d("#adminCardText",512),enabled:!!document.querySelector("#adminEnabled")?.checked},i=d("#adminCardValue",16),c=d("#adminEffectKey",64);i!==""&&(r.value=Number(i)),c!==""&&(r.effectKey=c);const m=await l(`/admin/cards/${encodeURIComponent(a)}/${encodeURIComponent(s)}`,{method:"PATCH",body:JSON.stringify(r)});o.textContent=JSON.stringify(m,null,2),n("adminStatus",t("cardUpdated"),!0)}catch(a){n("adminStatus",a.message)}}))},U=()=>{const o={apiBase:document.querySelector("#apiBase"),checkHealth:document.querySelector("#checkHealth"),wsUrl:document.querySelector("#wsUrl"),wsConnect:document.querySelector("#wsConnect"),roomId:document.querySelector("#roomId"),subscribeRoom:document.querySelector("#subscribeRoom"),sendPing:document.querySelector("#sendPing"),sendEvent:document.querySelector("#sendEvent"),eventName:document.querySelector("#eventName")};!o.apiBase||!o.wsUrl||!o.checkHealth||!o.wsConnect||(o.checkHealth.addEventListener("click",async()=>{try{e.apiBase=f(o.apiBase.value,["http:","https:"]);const a=await l("/health");n("healthStatus",`OK: ${JSON.stringify(a)}`,!0)}catch(a){n("healthStatus",`${t("healthError")}: ${a.message}`)}}),o.wsConnect.addEventListener("click",()=>{try{e.wsUrl=f(o.wsUrl.value,["ws:","wss:"])}catch(a){n("wsStatus",a.message);return}e.socket?.close(),e.socket=new WebSocket(e.wsUrl),e.socket.onopen=()=>{n("wsStatus",t("wsConnected"),!0),b("socket open")},e.socket.onmessage=a=>{try{b(JSON.parse(a.data))}catch{b(a.data)}},e.socket.onclose=()=>{n("wsStatus",t("wsClosed")),b("socket close")},e.socket.onerror=()=>{n("wsStatus",t("wsError")),b("socket error")}}),o.subscribeRoom?.addEventListener("click",()=>{if(!e.socket||e.socket.readyState!==WebSocket.OPEN)return b(t("connectSocketFirst"));e.socket.send(JSON.stringify({type:"subscribe_room",roomId:d("#roomId",64)}))}),o.sendPing?.addEventListener("click",()=>{if(!e.socket||e.socket.readyState!==WebSocket.OPEN)return b(t("connectSocketFirst"));e.socket.send(JSON.stringify({type:"ping"}))}),o.sendEvent?.addEventListener("click",()=>{if(!e.socket||e.socket.readyState!==WebSocket.OPEN)return b(t("connectSocketFirst"));e.socket.send(JSON.stringify({type:"room_event",roomId:d("#roomId",64),event:d("#eventName",128),data:{source:"frontend"}}))}))},q=()=>{if(!e.authOpen||e.user)return"";const o=e.authMode==="login";return`
    <div class="modal-overlay" data-act="closeAuth"></div>
    <section class="modal auth-modal">
      <div class="modal-head">
        <div>
          <h2>${t(o?"login":"register")}</h2>
          <p>${t("authHint")}</p>
        </div>
        <button class="chip" data-act="closeAuth">${t("close")}</button>
      </div>

      <article class="auth-card">
        <div class="stack">
          <input id="authUsername" placeholder="${t("username")}" />
          <input id="authPassword" placeholder="${t("password")}" type="password" />
          <button class="primary" data-act="authSubmit">${t(o?"login":"createAccount")}</button>
          <button class="chip" data-act="switchAuthMode">${t(o?"switchToRegister":"switchToLogin")}</button>
        </div>
      </article>

      <div id="authStatus" class="status"></div>
    </section>
  `},M=()=>{if(!e.roomModalOpen||!e.user)return"";const o=e.roomModalMode==="create";return`
    <div class="modal-overlay" data-act="closeRoomModal"></div>
    <section class="modal room-modal">
      <div class="modal-head">
        <div>
          <h2>${t(o?"createRoom":"connectCode")}</h2>
          <p>${t(o?"heroSubtitle":"joinHint")}</p>
        </div>
        <button class="chip" data-act="closeRoomModal">${t("close")}</button>
      </div>

      <article class="auth-card">
        <div class="stack ${o?"":"hidden"}">
          <input id="roomName" placeholder="${t("roomName")}" />
          <label><input id="roomIsPublic" type="checkbox" checked /> ${t("visibilityPublic")}</label>
          <input id="roomPassword" placeholder="${t("roomPassword")}" type="password" />
          <button class="primary" data-act="createRoom">${t("createRoom")}</button>
        </div>

        <div class="stack ${o?"hidden":""}">
          <input id="inviteCode" placeholder="AB12CD" maxlength="6" />
          <input id="joinPassword" placeholder="${t("roomPassword")}" type="password" />
          <label><input id="joinAsSpectator" type="checkbox" /> ${t("spectator")}</label>
          <button class="secondary" data-act="joinByCode">${t("connect")}</button>
        </div>
      </article>

      <div id="homeStatus" class="status">${u(e.homeStatusMessage||"")}</div>
    </section>
  `},D=()=>`
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
`,H=()=>{const o=e.homeLobbies;return`
    <section class="lobby-card">
      <div class="lobby-head">
        <h3>${t("availableRooms")}</h3>
        <button class="chip" data-tab="lobbies">${t("navLobbies")}</button>
      </div>
      <div class="lobby-list">
        ${o.length===0?`<p>${t("lobbyNoItems")}</p>`:o.map(a=>`
          <article class="lobby-item">
            <div class="lobby-icon">${a.isPublic?"☀":"☾"}</div>
            <div class="lobby-meta">
              <h4>${u(a.name)} ${a.hasPassword?'<span class="inline-tag">🔒</span>':""}</h4>
              <p>${a.isPublic?t("visibilityPublic"):t("visibilityPrivate")} • ${a.hasPassword?t("lobbyHasPassword"):t("lobbyNoPassword")}</p>
            </div>
            <div class="lobby-count">👥 ${a.playersCount} / 8</div>
            <button class="secondary" data-act="joinLobby" data-room-id="${u(a.roomId)}" data-room-owner-id="${u(a.ownerUserId||"")}">${t("joinLobby")}</button>
          </article>
        `).join("")}
      </div>
    </section>
  `},S=o=>{const a=e.user?.id===o.userId;return`
    <li class="participant-item">
      <div>
        <b>${u(o.username)}</b> ${a?`<span class="inline-note">(${t("youLabel")})</span>`:""}
      </div>
      <div class="participant-meta">${u(o.role)} · ${o.ready?"ready":"not ready"}</div>
    </li>
  `},F=()=>{if(!e.activeRoom)return"";const o=Array.isArray(e.activeRoom.participants)?e.activeRoom.participants:[],a=o.filter(r=>r.role!=="spectator"),s=o.filter(r=>r.role==="spectator");return`
    <article class="room-panel">
      <h3>${t("roomDetails")}</h3>
      <div class="room-meta">
        <div><span>${t("roomCode")}:</span> <b>${u(e.activeRoom.inviteCode||"—")}</b></div>
        <div><span>${t("roomOwner")}:</span> <b>${u(e.activeRoom.ownerId||"—")}</b></div>
      </div>
      <div class="room-lists">
        <div>
          <h4>${t("roomParticipants")} (${a.length})</h4>
          <ul class="participant-list">${a.map(S).join("")}</ul>
        </div>
        <div>
          <h4>${t("roomSpectators")} (${s.length})</h4>
          <ul class="participant-list">${s.map(S).join("")}</ul>
        </div>
      </div>
      <div class="stack">
        <h4>${t("roomActions")}</h4>
        <div class="room-actions">
          <button class="secondary" data-act="refreshRoom">${t("refreshRoom")}</button>
          <button class="secondary" data-act="readyRoom">${t("markReady")}</button>
          <button class="primary" data-act="startGame">${t("startGame")}</button>
          <button class="chip" data-act="leaveRoom">${t("leaveRoom")}</button>
        </div>
      </div>
    </article>
  `},W=()=>`
    ${D()}
    ${H()}
    ${F()}
  `,j=()=>`
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
    ${e.lobbyCatalog.length===0?`<article><p>${t("lobbyNoItems")}</p></article>`:e.lobbyCatalog.map(o=>`
      <article class="lobby-item">
        <div class="lobby-icon">${o.isPublic?"☀":"☾"}</div>
        <div class="lobby-meta">
          <h4>${u(o.name)}</h4>
          <p>${o.status} • ${o.hasPassword?t("lobbyHasPassword"):t("lobbyNoPassword")}</p>
        </div>
        <div class="lobby-count">👥 ${o.playersCount} / 8</div>
        <button class="secondary" data-act="joinLobby" data-room-id="${u(o.roomId)}" data-room-owner-id="${u(o.ownerUserId||"")}">${t("joinLobby")}</button>
      </article>
    `).join("")}
  </div>
`,_=()=>{if(!e.user)return"";const o=e.myRooms||[];return`
    <article>
      <h3>${t("myRooms")}</h3>
      <div class="stack">
        ${o.length===0?`<p>${t("lobbyNoItems")}</p>`:o.map(a=>`
          <div class="row my-room-row">
            <span>${u(a.name)} (${u(a.inviteCode)})</span>
            <button class="chip" data-act="openOwnedRoom" data-room-id="${u(a.roomId)}">${t("openRoom")}</button>
          </div>
        `).join("")}
      </div>
    </article>
  `},J=()=>e.user?`
    <h2>${t("profileTitle")}</h2>
    <div class="grid">
      <article>
        <h3>${t("profileEdit")}</h3>
        <div class="stack">
          <input id="profileUsername" value="${u(e.user.username)}" />
          <button class="primary" data-act="saveProfile">${t("saveProfile")}</button>
        </div>
      </article>
      ${_()}
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
  `:`<h2>${t("profileTitle")}</h2><div class="status">${t("needAuthProfile")}</div>`,x=()=>`
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
`,B=()=>`
  <article>
    <h3>API / WebSocket Debug</h3>
    <div class="row">
      <input id="apiBase" value="${u(e.apiBase)}" />
      <button id="checkHealth" class="secondary">${t("checkHealth")}</button>
    </div>
    <div id="healthStatus" class="status">${t("waitingRequest")}</div>
    <div class="row topgap">
      <input id="wsUrl" value="${u(e.wsUrl)}" />
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
`,V=()=>`
  <h2>${t("controlPanelTitle")}</h2>
  <p>${t("controlPanelHint")}</p>
  <div class="grid">
    ${x()}
    ${B()}
  </div>
  <div id="adminStatus" class="status"></div>
  <pre id="adminOutput" class="json"></pre>
`,K=()=>{const o=e.user?`<div class="profile-actions"><button class="avatar-btn" data-tab="profile">${u((e.user.username||"U").slice(0,1).toUpperCase())}</button><button class="chip" data-act="logout">${t("logout")}</button></div>`:`<button class="primary" data-act="toggleAuth">${t("openAuth")}</button>`;return`
  <main class="layout dark">
    <header class="topbar">
      <div class="brand-mini">
        <h2>LETTERS: NO MERCY</h2>
        <p class="brand-sub">Dark Medieval Stories</p>
      </div>
      <nav class="main-nav">
        <button class="tab ${e.activeTab==="home"?"active":""}" data-tab="home">${t("navHome")}</button>
        <button class="tab ${e.activeTab==="lobbies"?"active":""}" data-tab="lobbies">${t("navLobbies")}</button>
        <button class="tab ${e.activeTab==="profile"?"active":""}" data-tab="profile">${t("navProfile")}</button>
      </nav>
      <div class="topbar-actions">
        <button class="primary" data-act="heroCreate">＋ ${t("heroCreate")}</button>
        <div class="lang-switch compact">
          <button class="chip ${e.lang==="ru"?"active":""}" data-lang="ru">RU</button>
          <button class="chip ${e.lang==="en"?"active":""}" data-lang="en">EN</button>
        </div>
        ${o}
      </div>
    </header>

    <section class="panel ${e.activeTab==="home"?"":"hidden"} cinematic-panel">${W()}</section>
    <section class="panel ${e.activeTab==="lobbies"?"":"hidden"} cinematic-panel">${j()}</section>
    <section class="panel ${e.activeTab==="profile"?"":"hidden"} cinematic-panel">${J()}</section>
    ${e.user?.role==="admin"?`<section class="panel ${e.activeTab==="control"?"":"hidden"}">${V()}</section>`:""}

    ${q()}
    ${M()}
  </main>`},$=document.querySelector("#app"),C=async()=>{if(e.token)try{e.user=await l("/auth/me")}catch{e.user=null,e.token="",localStorage.removeItem("stories_token")}},p=()=>{$&&(y(),$.innerHTML=K(),L(p),e.activeTab==="home"&&T(p),e.activeTab==="lobbies"&&N(p),e.activeTab==="profile"&&A(p),e.activeTab==="control"&&e.user?.role==="admin"&&(O(),U()),e.authOpen&&!e.user&&I(p,C))},v=async(o="public",a=4)=>{try{const s=await l(`/lobbies?visibility=${encodeURIComponent(o)}&limit=${a}`);o==="public"&&(e.homeLobbies=s.items||[]),o==="all"&&(e.lobbyCatalog=s.items||[])}catch{o==="public"&&(e.homeLobbies=[]),o==="all"&&(e.lobbyCatalog=[])}},y=()=>{if(!e.user){e.myRooms=[];return}const o=[...e.homeLobbies,...e.lobbyCatalog],a=new Map;o.filter(s=>s.ownerUserId===e.user.id).forEach(s=>a.set(s.roomId,s)),e.myRooms=[...a.values()]};await C();await v("public",4);await v("all",e.lobbyFilters.limit);y();p();setInterval(async()=>{await v("public",4),await v("all",e.lobbyFilters.limit),y(),(e.activeTab==="home"||e.activeTab==="lobbies"||e.activeTab==="profile")&&p()},7e3);
//# sourceMappingURL=index-yXubELRH.js.map
