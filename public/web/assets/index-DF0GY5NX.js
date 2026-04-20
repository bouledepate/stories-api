(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const c of n)if(c.type==="childList")for(const u of c.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function r(n){const c={};return n.integrity&&(c.integrity=n.integrity),n.referrerPolicy&&(c.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?c.credentials="include":n.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function i(n){if(n.ep)return;n.ep=!0;const c=r(n);fetch(n.href,c)}})();const t={apiBase:window.location.origin,wsUrl:`ws://${window.location.hostname}:8081`,token:localStorage.getItem("stories_token")||"",user:null,activeRoom:null,activeTab:"home",socket:null,lang:localStorage.getItem("stories_lang")||"ru",theme:localStorage.getItem("stories_theme")||"dark",authOpen:!1,authMode:"login"},b={ru:{appTag:"Stories",title:"Control Center",subtitle:"Комнаты, профиль, админка и live debug в одном месте.",login:"Вход",register:"Регистрация",logout:"Выйти",notAuthorized:"Не авторизованы",signedAs:"Вы вошли как",navHome:"Комнаты",navProfile:"Профиль",navAdmin:"Админ",navDebug:"Debug",openAuth:"Войти / Регистрация",close:"Закрыть",authTitle:"Авторизация",authHint:"Откройте аккаунт или войдите в существующий.",username:"username",password:"password",createAccount:"Создать аккаунт",loginSuccess:"Успешный вход.",registerSuccess:"Аккаунт создан и выполнен вход.",homeNeedAuth:"Выполните вход для доступа к комнатам.",roomsTitle:"Комнаты",createRoom:"Создать комнату",roomName:"Название комнаты",connectCode:"Войти по invite-коду",connect:"Подключиться",spectator:"Зайти как spectator",ready:"Готово.",roomCreated:"Комната создана. Invite code:",roomJoinSuccess:"Подключение успешно. Room:",profileTitle:"Профиль пользователя",profileEdit:"Редактирование",newPassword:"Новый пароль (опционально)",saveProfile:"Сохранить профиль",stats:"Статистика",needAuthProfile:"Сначала авторизуйтесь.",profileUpdated:"Профиль обновлен.",passwordChanged:"Пароль успешно изменён.",currentPassword:"Текущий пароль",nextPassword:"Новый пароль",changePassword:"Сменить пароль",wins:"Победы",losses:"Поражения",vt:"Victory tokens",elim3:"Eliminated with 3",adminTitle:"Админ-панель (RBAC)",deckLoad:"Загрузка колоды",loadCards:"Показать cards",loadEffects:"Показать effects",patchCard:"Patch card",cardCode:"cardCode",newName:"Новое имя",newText:"Новый текст",valueOrEmpty:"value (или пусто)",effectKey:"effectKey",enabled:"enabled",applyPatch:"Применить PATCH",cardsLoaded:"Cards для {deck} загружены.",effectsLoaded:"Effects загружены.",cardUpdated:"Карта обновлена.",debugTitle:"Debug",oldInterface:"Техпанель для API и WebSocket.",checkHealth:"Проверить /health",waitingRequest:"Ожидание запроса…",websocket:"WebSocket",connectWs:"Подключиться",subscribe:"Подписаться",sendPing:"Ping",sendEvent:"Отправить room_event",wsNotConnected:"Не подключено",wsConnected:"WebSocket подключен",wsClosed:"WebSocket закрыт",wsError:"WebSocket ошибка",connectSocketFirst:"Сначала подключите сокет",healthError:"Ошибка",unknownError:"Неизвестная ошибка",httpError:"Ошибка HTTP {status}",invalidCredentials:"Неверный логин или пароль.",currentPasswordInvalid:"Текущий пароль указан неверно.",userExists:"Такой username уже занят.",unauthorized:"Требуется авторизация.",forbidden:"Недостаточно прав.",roomNotFound:"Комната не найдена.",inviteInvalid:"Некорректный invite-код.",validationFailed:"Проверьте корректность введенных данных.",serverUnavailable:"Сервер временно недоступен. Повторите позже.",invalidUrl:"Некорректный URL.",navControl:"Control Panel",heroTitle:"Stories: project-visual landing",heroSubtitle:"Создавайте комнаты и подключайтесь к игре за секунды.",heroCreate:"Создать комнату",heroJoin:"Присоединиться",roomDetails:"Текущая комната",roomCode:"Код приглашения",roomOwner:"Владелец",roomParticipants:"Участники",roomSpectators:"Зрители",roomActions:"Действия с комнатой",leaveRoom:"Покинуть комнату",refreshRoom:"Обновить состояние",markReady:"Я готов",startGame:"Запустить игру",youLabel:"вы",authRequiredAction:"Для этого действия войдите в аккаунт.",switchToLogin:"Уже есть аккаунт? Войти",switchToRegister:"Нет аккаунта? Регистрация",themeDark:"Тёмная",themeLight:"Светлая",controlPanelTitle:"Control Panel",controlPanelHint:"Только для администраторов: управление данными и live debug."},en:{appTag:"Stories",title:"Control Center",subtitle:"Rooms, profile, admin panel and live debug in one place.",login:"Sign in",register:"Sign up",logout:"Logout",notAuthorized:"Not authorized",signedAs:"Signed in as",navHome:"Rooms",navProfile:"Profile",navAdmin:"Admin",navDebug:"Debug",openAuth:"Login / Register",close:"Close",authTitle:"Authentication",authHint:"Create an account or sign in.",username:"username",password:"password",createAccount:"Create account",loginSuccess:"Signed in successfully.",registerSuccess:"Account created and signed in.",homeNeedAuth:"Sign in to access rooms.",roomsTitle:"Rooms",createRoom:"Create room",roomName:"Room name",connectCode:"Join by invite code",connect:"Connect",spectator:"Join as spectator",ready:"Ready.",roomCreated:"Room created. Invite code:",roomJoinSuccess:"Connected successfully. Room:",profileTitle:"User profile",profileEdit:"Edit profile",newPassword:"New password (optional)",saveProfile:"Save profile",stats:"Stats",needAuthProfile:"Sign in first.",profileUpdated:"Profile updated.",passwordChanged:"Password changed successfully.",currentPassword:"Current password",nextPassword:"New password",changePassword:"Change password",wins:"Wins",losses:"Losses",vt:"Victory tokens",elim3:"Eliminated with 3",adminTitle:"Admin panel (RBAC)",deckLoad:"Load deck",loadCards:"Show cards",loadEffects:"Show effects",patchCard:"Patch card",cardCode:"cardCode",newName:"New name",newText:"New text",valueOrEmpty:"value (or empty)",effectKey:"effectKey",enabled:"enabled",applyPatch:"Apply PATCH",cardsLoaded:"Cards for {deck} loaded.",effectsLoaded:"Effects loaded.",cardUpdated:"Card updated.",debugTitle:"Debug",oldInterface:"Technical panel for API and WebSocket.",checkHealth:"Check /health",waitingRequest:"Waiting for request…",websocket:"WebSocket",connectWs:"Connect",subscribe:"Subscribe",sendPing:"Ping",sendEvent:"Send room_event",wsNotConnected:"Not connected",wsConnected:"WebSocket connected",wsClosed:"WebSocket closed",wsError:"WebSocket error",connectSocketFirst:"Connect socket first",healthError:"Error",unknownError:"Unknown error",httpError:"HTTP error {status}",invalidCredentials:"Invalid username or password.",currentPasswordInvalid:"Current password is invalid.",userExists:"This username is already taken.",unauthorized:"Authorization required.",forbidden:"Not enough permissions.",roomNotFound:"Room not found.",inviteInvalid:"Invalid invite code.",validationFailed:"Please check input values.",serverUnavailable:"Server is temporarily unavailable. Try again later.",invalidUrl:"Invalid URL.",navControl:"Control Panel",heroTitle:"Stories: project visual landing",heroSubtitle:"Create rooms and join matches in seconds.",heroCreate:"Create room",heroJoin:"Join room",roomDetails:"Current room",roomCode:"Invite code",roomOwner:"Owner",roomParticipants:"Participants",roomSpectators:"Spectators",roomActions:"Room actions",leaveRoom:"Leave room",refreshRoom:"Refresh state",markReady:"Mark ready",startGame:"Start game",youLabel:"you",authRequiredAction:"Please sign in to continue.",switchToLogin:"Already have an account? Sign in",switchToRegister:"No account yet? Sign up",themeDark:"Dark",themeLight:"Light",controlPanelTitle:"Control Panel",controlPanelHint:"Admin-only area for content management and live debug."}},e=(a,o={})=>{const r=b[t.lang]?.[a]??b.ru[a]??a;return Object.entries(o).reduce((i,[n,c])=>i.replaceAll(`{${n}}`,String(c)),r)},w=()=>t.token?{Authorization:`Bearer ${t.token}`}:{},$=(a,o)=>{const r=String(a||"").toUpperCase(),i={INVALID_CREDENTIALS:"invalidCredentials",USER_EXISTS:"userExists",UNAUTHORIZED:"unauthorized",FORBIDDEN:"forbidden",ROOM_NOT_FOUND:"roomNotFound",INVALID_INVITE_CODE:"inviteInvalid",INVITE_CODE_NOT_FOUND:"inviteInvalid",CURRENT_PASSWORD_INVALID:"currentPasswordInvalid",VALIDATION_ERROR:"validationFailed"};return i[r]?i[r]:o===401?"unauthorized":o===403?"forbidden":o>=500?"serverUnavailable":null},k=(a,o,r)=>{const i=$(o?.code||o?.errorCode,a);return i?{key:i,message:e(i)}:{key:null,message:o?.message||o?.error||r||e("httpError",{status:a})}},l=async(a,o={})=>{let r;try{r=await fetch(`${t.apiBase.replace(/\/$/,"")}${a}`,{...o,headers:{"Content-Type":"application/json",...o.headers||{},...w(),Locale:t.lang}})}catch{throw new Error(e("serverUnavailable"))}const i=await r.text();let n={};try{n=i?JSON.parse(i):{}}catch{n={}}if(!r.ok){const c=k(r.status,n,i),u=new Error(c.message||e("unknownError"));throw u.code=c.key,u.status=r.status,u}return n},m=a=>{const o=document.createElement("div");return o.textContent=String(a??""),o.innerHTML},d=(a,o=256)=>{const r=document.querySelector(a);return r?String(r.value??"").trim().slice(0,o):""},g=(a,o)=>{let r;try{r=new URL(String(a||"").trim())}catch{throw new Error(e("invalidUrl"))}if(!o.includes(r.protocol))throw new Error(e("invalidUrl"));return r.toString().replace(/\/$/,"")},s=(a,o,r=!1)=>{const i=document.querySelector(`#${a}`);i&&(i.textContent=o,i.classList.toggle("ok",r))},h=a=>{const o=document.querySelector("#debugLog");if(!o)return;const r=document.createElement("div");r.textContent=`[${new Date().toLocaleTimeString()}] ${typeof a=="string"?a:JSON.stringify(a)}`,o.prepend(r)},v=(a,o="login")=>{t.authOpen=!0,t.authMode=o,a()},C=a=>{document.querySelectorAll("[data-tab]").forEach(o=>{o.addEventListener("click",()=>{t.activeTab=o.dataset.tab,a()})}),document.querySelectorAll("[data-lang]").forEach(o=>{o.addEventListener("click",()=>{t.lang=o.dataset.lang,localStorage.setItem("stories_lang",t.lang),a()})}),document.querySelectorAll("[data-theme]").forEach(o=>{o.addEventListener("click",()=>{t.theme=o.dataset.theme,localStorage.setItem("stories_theme",t.theme),a()})}),document.querySelector('[data-act="toggleAuth"]')?.addEventListener("click",()=>v(a,"login")),document.querySelector('[data-act="heroCreate"]')?.addEventListener("click",()=>{if(!t.user)return v(a,"login");document.querySelector("#roomName")?.focus()}),document.querySelector('[data-act="heroJoin"]')?.addEventListener("click",()=>{if(!t.user)return v(a,"login");document.querySelector("#inviteCode")?.focus()}),document.querySelectorAll('[data-act="closeAuth"]').forEach(o=>{o.addEventListener("click",()=>{t.authOpen=!1,a()})}),document.querySelector('[data-act="logout"]')?.addEventListener("click",()=>{t.token="",t.user=null,t.activeRoom=null,t.authOpen=!1,localStorage.removeItem("stories_token"),a()})},E=async(a,o)=>{document.querySelector('[data-act="switchAuthMode"]')?.addEventListener("click",()=>{t.authMode=t.authMode==="login"?"register":"login",a()}),document.querySelector('[data-act="authSubmit"]')?.addEventListener("click",async()=>{const r=t.authMode==="login"?"/auth/login":"/auth/register",i=t.authMode==="login"?e("loginSuccess"):e("registerSuccess");try{const n=await l(r,{method:"POST",body:JSON.stringify({username:d("#authUsername",64),password:d("#authPassword",128)})});t.token=n.accessToken,localStorage.setItem("stories_token",t.token),await o(),s("authStatus",i,!0),t.authOpen=!1,a()}catch(n){s("authStatus",n.message)}})},P=a=>{const o=()=>t.activeRoom?.roomId?!0:(s("homeStatus",e("roomNotFound")),!1);document.querySelector('[data-act="createRoom"]')?.addEventListener("click",async()=>{if(!t.user)return v(a,"login");try{t.activeRoom=await l("/rooms",{method:"POST",body:JSON.stringify({name:d("#roomName",64)})}),s("homeStatus",`${e("roomCreated")} ${t.activeRoom.inviteCode}`,!0),a()}catch(r){s("homeStatus",r.message)}}),document.querySelector('[data-act="joinByCode"]')?.addEventListener("click",async()=>{if(!t.user)return v(a,"login");try{t.activeRoom=await l("/rooms/join-by-code",{method:"POST",body:JSON.stringify({inviteCode:d("#inviteCode",6).toUpperCase(),spectator:!!document.querySelector("#joinAsSpectator")?.checked})}),s("homeStatus",`${e("roomJoinSuccess")} ${t.activeRoom.roomId}`,!0),a()}catch(r){s("homeStatus",r.message)}}),document.querySelector('[data-act="refreshRoom"]')?.addEventListener("click",async()=>{if(o())try{t.activeRoom=await l(`/rooms/${encodeURIComponent(t.activeRoom.roomId)}`),s("homeStatus",e("ready"),!0),a()}catch(r){s("homeStatus",r.message)}}),document.querySelector('[data-act="readyRoom"]')?.addEventListener("click",async()=>{if(o())try{t.activeRoom=await l(`/rooms/${encodeURIComponent(t.activeRoom.roomId)}/ready`,{method:"POST"}),s("homeStatus",e("ready"),!0),a()}catch(r){s("homeStatus",r.message)}}),document.querySelector('[data-act="startGame"]')?.addEventListener("click",async()=>{if(o())try{t.activeRoom=await l(`/rooms/${encodeURIComponent(t.activeRoom.roomId)}/start`,{method:"POST"}),s("homeStatus",e("ready"),!0),a()}catch(r){s("homeStatus",r.message)}}),document.querySelector('[data-act="leaveRoom"]')?.addEventListener("click",async()=>{if(o())try{await l(`/rooms/${encodeURIComponent(t.activeRoom.roomId)}/leave`,{method:"POST"}),t.activeRoom=null,s("homeStatus",e("ready"),!0),a()}catch(r){s("homeStatus",r.message)}})},R=a=>{document.querySelector('[data-act="saveProfile"]')?.addEventListener("click",async()=>{try{const r={username:d("#profileUsername",64)};t.user=await l("/auth/me",{method:"PATCH",body:JSON.stringify(r)}),s("profileStatus",e("profileUpdated"),!0),a()}catch(o){s("profileStatus",o.message)}}),document.querySelector('[data-act="changePassword"]')?.addEventListener("click",async()=>{try{await l("/auth/change-password",{method:"POST",body:JSON.stringify({currentPassword:d("#currentPassword",128),newPassword:d("#nextPassword",128)})});const o=document.querySelector("#currentPassword"),r=document.querySelector("#nextPassword");o&&(o.value=""),r&&(r.value=""),s("profileStatus",e("passwordChanged"),!0)}catch(o){s("profileStatus",o.message)}})},T=()=>{const a=document.querySelector("#adminOutput");a&&(document.querySelector('[data-act="loadCards"]')?.addEventListener("click",async()=>{try{const o=d("#adminDeck",16),r=await l(`/admin/cards?deck=${encodeURIComponent(o)}`);a.textContent=JSON.stringify(r,null,2),s("adminStatus",e("cardsLoaded",{deck:o}),!0)}catch(o){s("adminStatus",o.message)}}),document.querySelector('[data-act="loadEffects"]')?.addEventListener("click",async()=>{try{const o=await l("/admin/effects");a.textContent=JSON.stringify(o,null,2),s("adminStatus",e("effectsLoaded"),!0)}catch(o){s("adminStatus",o.message)}}),document.querySelector('[data-act="patchCard"]')?.addEventListener("click",async()=>{try{const o=d("#adminDeck",16),r=d("#adminCardCode",64),i={name:d("#adminCardName",64),text:d("#adminCardText",512),enabled:!!document.querySelector("#adminEnabled")?.checked},n=d("#adminCardValue",16),c=d("#adminEffectKey",64);n!==""&&(i.value=Number(n)),c!==""&&(i.effectKey=c);const u=await l(`/admin/cards/${encodeURIComponent(o)}/${encodeURIComponent(r)}`,{method:"PATCH",body:JSON.stringify(i)});a.textContent=JSON.stringify(u,null,2),s("adminStatus",e("cardUpdated"),!0)}catch(o){s("adminStatus",o.message)}}))},A=()=>{const a={apiBase:document.querySelector("#apiBase"),checkHealth:document.querySelector("#checkHealth"),wsUrl:document.querySelector("#wsUrl"),wsConnect:document.querySelector("#wsConnect"),roomId:document.querySelector("#roomId"),subscribeRoom:document.querySelector("#subscribeRoom"),sendPing:document.querySelector("#sendPing"),sendEvent:document.querySelector("#sendEvent"),eventName:document.querySelector("#eventName")};!a.apiBase||!a.wsUrl||!a.checkHealth||!a.wsConnect||(a.checkHealth.addEventListener("click",async()=>{try{t.apiBase=g(a.apiBase.value,["http:","https:"]);const o=await l("/health");s("healthStatus",`OK: ${JSON.stringify(o)}`,!0)}catch(o){s("healthStatus",`${e("healthError")}: ${o.message}`)}}),a.wsConnect.addEventListener("click",()=>{try{t.wsUrl=g(a.wsUrl.value,["ws:","wss:"])}catch(o){s("wsStatus",o.message);return}t.socket?.close(),t.socket=new WebSocket(t.wsUrl),t.socket.onopen=()=>{s("wsStatus",e("wsConnected"),!0),h("socket open")},t.socket.onmessage=o=>{try{h(JSON.parse(o.data))}catch{h(o.data)}},t.socket.onclose=()=>{s("wsStatus",e("wsClosed")),h("socket close")},t.socket.onerror=()=>{s("wsStatus",e("wsError")),h("socket error")}}),a.subscribeRoom?.addEventListener("click",()=>{if(!t.socket||t.socket.readyState!==WebSocket.OPEN)return h(e("connectSocketFirst"));t.socket.send(JSON.stringify({type:"subscribe_room",roomId:d("#roomId",64)}))}),a.sendPing?.addEventListener("click",()=>{if(!t.socket||t.socket.readyState!==WebSocket.OPEN)return h(e("connectSocketFirst"));t.socket.send(JSON.stringify({type:"ping"}))}),a.sendEvent?.addEventListener("click",()=>{if(!t.socket||t.socket.readyState!==WebSocket.OPEN)return h(e("connectSocketFirst"));t.socket.send(JSON.stringify({type:"room_event",roomId:d("#roomId",64),event:d("#eventName",128),data:{source:"frontend"}}))}))},L=()=>{if(!t.authOpen||t.user)return"";const a=t.authMode==="login";return`
    <div class="modal-overlay" data-act="closeAuth"></div>
    <section class="modal auth-modal">
      <div class="modal-head">
        <div>
          <h2>${e(a?"login":"register")}</h2>
          <p>${e("authHint")}</p>
        </div>
        <button class="chip" data-act="closeAuth">${e("close")}</button>
      </div>

      <article class="auth-card">
        <div class="stack">
          <input id="authUsername" placeholder="${e("username")}" />
          <input id="authPassword" placeholder="${e("password")}" type="password" />
          <button class="primary" data-act="authSubmit">${e(a?"login":"createAccount")}</button>
          <button class="chip" data-act="switchAuthMode">${e(a?"switchToRegister":"switchToLogin")}</button>
        </div>
      </article>

      <div id="authStatus" class="status">${e("ready")}</div>
    </section>
  `},N=()=>`
  <section class="hero">
    <div class="hero-copy">
      <span class="hero-kicker">${e("appTag")}</span>
      <h1>LETTERS:<br/>NO MERCY</h1>
      <p class="hero-subline">DARK MEDIEVAL STORIES</p>
      <p>${e("heroSubtitle")}</p>
      <div class="hero-actions">
        <button class="primary" data-act="heroCreate">＋ ${e("heroCreate")}</button>
        <button class="secondary" data-act="heroJoin">${e("heroJoin")}</button>
      </div>
    </div>
    <div class="hero-art" aria-hidden="true">
      <div class="castle-silhouette"></div>
      <div class="letter-token"></div>
    </div>
  </section>
`,I=()=>`
    <section class="lobby-card">
      <div class="lobby-head">
        <h3>ДОСТУПНЫЕ КОМНАТЫ</h3>
        <button class="chip">ФИЛЬТРЫ</button>
      </div>
      <div class="lobby-list">
        ${[{icon:"♛",name:"Трон под подозрением",mode:"Стандартные правила",players:"6 / 8",isNew:!0},{icon:"⚜",name:"Шёпот в темноте",mode:"Короткая партия",players:"4 / 8",isNew:!1},{icon:"⚔",name:"Заговор в крепости",mode:"Стандартные правила",players:"7 / 8",isNew:!1},{icon:"✉",name:"Письмо без отправителя",mode:"Короткая партия",players:"3 / 8",isNew:!1}].map(o=>`
          <article class="lobby-item">
            <div class="lobby-icon">${o.icon}</div>
            <div class="lobby-meta">
              <h4>${o.name} ${o.isNew?'<span class="inline-tag">НОВАЯ</span>':""}</h4>
              <p>5–8 игроков • ${o.mode}</p>
            </div>
            <div class="lobby-count">👥 ${o.players}</div>
            <button class="secondary" data-act="heroJoin">ПРИСОЕДИНИТЬСЯ</button>
          </article>
        `).join("")}
      </div>
    </section>
  `,O=()=>`
  <section class="feature-strip">
    <article>
      <h4>БЛЕФ И СТРАТЕГИЯ</h4>
      <p>Скрывайте свои намерения и читайте других.</p>
    </article>
    <article>
      <h4>УНИКАЛЬНЫЕ ПЕРСОНАЖИ</h4>
      <p>Каждый со своими способностями и тайными целями.</p>
    </article>
    <article>
      <h4>ТЁМНОЕ СРЕДНЕВЕКОВЬЕ</h4>
      <p>Атмосфера интриг, предательства и власти.</p>
    </article>
  </section>
`,y=a=>{const o=t.user?.id===a.userId;return`
    <li class="participant-item">
      <div>
        <b>${m(a.username)}</b> ${o?`<span class="inline-note">(${e("youLabel")})</span>`:""}
      </div>
      <div class="participant-meta">${m(a.role)} · ${a.ready?"ready":"not ready"}</div>
    </li>
  `},q=()=>{if(!t.activeRoom)return"";const a=Array.isArray(t.activeRoom.participants)?t.activeRoom.participants:[],o=a.filter(i=>i.role!=="spectator"),r=a.filter(i=>i.role==="spectator");return`
    <article class="room-panel">
      <h3>${e("roomDetails")}</h3>
      <div class="room-meta">
        <div><span>${e("roomCode")}:</span> <b>${m(t.activeRoom.inviteCode||"—")}</b></div>
        <div><span>${e("roomOwner")}:</span> <b>${m(t.activeRoom.ownerId||"—")}</b></div>
      </div>
      <div class="room-lists">
        <div>
          <h4>${e("roomParticipants")} (${o.length})</h4>
          <ul class="participant-list">${o.map(y).join("")}</ul>
        </div>
        <div>
          <h4>${e("roomSpectators")} (${r.length})</h4>
          <ul class="participant-list">${r.map(y).join("")}</ul>
        </div>
      </div>
      <div class="stack">
        <h4>${e("roomActions")}</h4>
        <div class="room-actions">
          <button class="secondary" data-act="refreshRoom">${e("refreshRoom")}</button>
          <button class="secondary" data-act="readyRoom">${e("markReady")}</button>
          <button class="primary" data-act="startGame">${e("startGame")}</button>
          <button class="chip" data-act="leaveRoom">${e("leaveRoom")}</button>
        </div>
      </div>
    </article>
  `},U=()=>{const a=t.user?`
      <div class="grid">
        <article>
          <h3>${e("createRoom")}</h3>
          <div class="stack">
            <input id="roomName" placeholder="${e("roomName")}" />
            <button class="primary" data-act="createRoom">${e("createRoom")}</button>
          </div>
        </article>
        <article>
          <h3>${e("connectCode")}</h3>
          <div class="stack">
            <input id="inviteCode" placeholder="AB12CD" maxlength="6" />
            <label><input id="joinAsSpectator" type="checkbox" /> ${e("spectator")}</label>
            <button class="secondary" data-act="joinByCode">${e("connect")}</button>
          </div>
        </article>
      </div>`:`<article><p>${e("authRequiredAction")}</p></article>`;return`
    ${N()}
    ${I()}
    ${O()}
    <div id="homeStatus" class="status">${e("ready")}</div>
    ${a}
    ${q()}
  `},D=()=>t.user?`
    <h2>${e("profileTitle")}</h2>
    <div class="grid">
      <article>
        <h3>${e("profileEdit")}</h3>
        <div class="stack">
          <input id="profileUsername" value="${m(t.user.username)}" />
          <button class="primary" data-act="saveProfile">${e("saveProfile")}</button>
        </div>
      </article>
      <article>
        <h3>${e("changePassword")}</h3>
        <div class="stack">
          <input id="currentPassword" placeholder="${e("currentPassword")}" type="password" />
          <input id="nextPassword" placeholder="${e("nextPassword")}" type="password" />
          <button class="secondary" data-act="changePassword">${e("changePassword")}</button>
        </div>
      </article>
      <article>
        <h3>${e("stats")}</h3>
        <ul>
          <li>${e("wins")}: <b>${t.user.wins}</b></li>
          <li>${e("losses")}: <b>${t.user.losses}</b></li>
          <li>${e("vt")}: <b>${t.user.victoryTokens}</b></li>
          <li>${e("elim3")}: <b>${t.user.eliminatedWith3}</b></li>
        </ul>
      </article>
    </div>
    <div id="profileStatus" class="status">${e("ready")}</div>
  `:`<h2>${e("profileTitle")}</h2><div class="status">${e("needAuthProfile")}</div>`,H=()=>`
  <article>
    <h3>${e("deckLoad")}</h3>
    <div class="stack">
      <select id="adminDeck">
        <option value="character">character</option>
        <option value="decree">decree</option>
        <option value="event">event</option>
      </select>
      <button class="primary" data-act="loadCards">${e("loadCards")}</button>
      <button class="secondary" data-act="loadEffects">${e("loadEffects")}</button>
    </div>
  </article>
  <article>
    <h3>${e("patchCard")}</h3>
    <div class="stack">
      <input id="adminCardCode" placeholder="${e("cardCode")}" />
      <input id="adminCardName" placeholder="${e("newName")}" />
      <input id="adminCardText" placeholder="${e("newText")}" />
      <input id="adminCardValue" placeholder="${e("valueOrEmpty")}" />
      <input id="adminEffectKey" placeholder="${e("effectKey")}" />
      <label><input id="adminEnabled" type="checkbox" checked /> ${e("enabled")}</label>
      <button class="primary" data-act="patchCard">${e("applyPatch")}</button>
    </div>
  </article>
`,x=()=>`
  <article>
    <h3>API / WebSocket Debug</h3>
    <div class="row">
      <input id="apiBase" value="${m(t.apiBase)}" />
      <button id="checkHealth" class="secondary">${e("checkHealth")}</button>
    </div>
    <div id="healthStatus" class="status">${e("waitingRequest")}</div>
    <div class="row topgap">
      <input id="wsUrl" value="${m(t.wsUrl)}" />
      <button id="wsConnect" class="secondary">${e("connectWs")}</button>
    </div>
    <div class="row topgap">
      <input id="roomId" placeholder="roomId" />
      <button id="subscribeRoom">${e("subscribe")}</button>
      <button id="sendPing">${e("sendPing")}</button>
    </div>
    <div class="row topgap">
      <input id="eventName" value="frontend_debug" />
      <button id="sendEvent">${e("sendEvent")}</button>
    </div>
    <div id="wsStatus" class="status">${e("wsNotConnected")}</div>
    <div id="debugLog" class="log"></div>
  </article>
`,J=()=>`
  <h2>${e("controlPanelTitle")}</h2>
  <p>${e("controlPanelHint")}</p>
  <div class="grid">
    ${H()}
    ${x()}
  </div>
  <div id="adminStatus" class="status">${e("ready")}</div>
  <pre id="adminOutput" class="json"></pre>
`,_=()=>{const a=t.user?`<div class="session ok">${e("signedAs")} <b>${m(t.user.username)}</b> (${m(t.user.role)})</div>`:`<div class="session">${e("notAuthorized")}</div>`;return`
  <main class="layout ${t.theme}">
    <header class="topbar">
      <div class="brand">
        <h2>LETTERS: NO MERCY</h2>
        <p class="brand-sub">Dark Medieval Stories</p>
        ${a}
      </div>
      <div class="topbar-actions">
        <div class="theme-switch">
          <button class="chip ${t.theme==="dark"?"active":""}" data-theme="dark">${e("themeDark")}</button>
          <button class="chip ${t.theme==="light"?"active":""}" data-theme="light">${e("themeLight")}</button>
        </div>
        <div class="lang-switch">
          <button class="chip ${t.lang==="ru"?"active":""}" data-lang="ru">RU</button>
          <button class="chip ${t.lang==="en"?"active":""}" data-lang="en">EN</button>
        </div>
        ${t.user?`<button class="primary ghost" data-act="logout">${e("logout")}</button>`:`<button class="primary" data-act="toggleAuth">${e("openAuth")}</button>`}
      </div>
    </header>

    <nav class="tabs">
      <button class="tab ${t.activeTab==="home"?"active":""}" data-tab="home">${e("navHome")}</button>
      <button class="tab ${t.activeTab==="profile"?"active":""}" data-tab="profile">${e("navProfile")}</button>
      ${t.user?.role==="admin"?`<button class="tab ${t.activeTab==="control"?"active":""}" data-tab="control">${e("navControl")}</button>`:""}
    </nav>

    <section class="panel ${t.activeTab==="home"?"":"hidden"}">${U()}</section>
    <section class="panel ${t.activeTab==="profile"?"":"hidden"}">${D()}</section>
    ${t.user?.role==="admin"?`<section class="panel ${t.activeTab==="control"?"":"hidden"}">${J()}</section>`:""}

    ${L()}
  </main>`},f=document.querySelector("#app"),S=async()=>{if(t.token)try{t.user=await l("/auth/me")}catch{t.user=null,t.token="",localStorage.removeItem("stories_token")}},p=()=>{f&&(f.innerHTML=_(),C(p),t.activeTab==="home"&&P(p),t.activeTab==="profile"&&R(p),t.activeTab==="control"&&t.user?.role==="admin"&&(T(),A()),t.authOpen&&!t.user&&E(p,S))};await S();p();
//# sourceMappingURL=index-DF0GY5NX.js.map
