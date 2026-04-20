(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const l of c.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function n(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerPolicy&&(c.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?c.credentials="include":r.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(r){if(r.ep)return;r.ep=!0;const c=n(r);fetch(r.href,c)}})();const e={apiBase:window.location.origin,wsUrl:`ws://${window.location.hostname}:8081`,token:localStorage.getItem("stories_token")||"",user:null,activeRoom:null,activeTab:"home",socket:null,lang:localStorage.getItem("stories_lang")||"ru",theme:localStorage.getItem("stories_theme")||"dark",authOpen:!1,authMode:"login"},g={ru:{appTag:"Stories • Новый интерфейс",title:"Control Center",subtitle:"Комнаты, профиль, админка и live debug в одном месте.",login:"Вход",register:"Регистрация",logout:"Выйти",notAuthorized:"Не авторизованы",signedAs:"Вы вошли как",navHome:"Комнаты",navProfile:"Профиль",navAdmin:"Админ",navDebug:"Debug",openAuth:"Войти / Регистрация",close:"Закрыть",authTitle:"Авторизация",authHint:"Откройте аккаунт или войдите в существующий.",username:"username",password:"password",createAccount:"Создать аккаунт",loginSuccess:"Успешный вход.",registerSuccess:"Аккаунт создан и выполнен вход.",homeNeedAuth:"Выполните вход для доступа к комнатам.",roomsTitle:"Комнаты",createRoom:"Создать комнату",roomName:"Название комнаты",connectCode:"Войти по invite-коду",connect:"Подключиться",spectator:"Зайти как spectator",ready:"Готово.",roomCreated:"Комната создана. Invite code:",roomJoinSuccess:"Подключение успешно. Room:",profileTitle:"Профиль пользователя",profileEdit:"Редактирование",newPassword:"Новый пароль (опционально)",saveProfile:"Сохранить профиль",stats:"Статистика",needAuthProfile:"Сначала авторизуйтесь.",profileUpdated:"Профиль обновлен.",wins:"Победы",losses:"Поражения",vt:"Victory tokens",elim3:"Eliminated with 3",adminTitle:"Админ-панель (RBAC)",deckLoad:"Загрузка колоды",loadCards:"Показать cards",loadEffects:"Показать effects",patchCard:"Patch card",cardCode:"cardCode",newName:"Новое имя",newText:"Новый текст",valueOrEmpty:"value (или пусто)",effectKey:"effectKey",enabled:"enabled",applyPatch:"Применить PATCH",cardsLoaded:"Cards для {deck} загружены.",effectsLoaded:"Effects загружены.",cardUpdated:"Карта обновлена.",debugTitle:"Debug",oldInterface:"Техпанель для API и WebSocket.",checkHealth:"Проверить /health",waitingRequest:"Ожидание запроса…",websocket:"WebSocket",connectWs:"Подключиться",subscribe:"Подписаться",sendPing:"Ping",sendEvent:"Отправить room_event",wsNotConnected:"Не подключено",wsConnected:"WebSocket подключен",wsClosed:"WebSocket закрыт",wsError:"WebSocket ошибка",connectSocketFirst:"Сначала подключите сокет",healthError:"Ошибка",unknownError:"Неизвестная ошибка",httpError:"Ошибка HTTP {status}",invalidCredentials:"Неверный логин или пароль.",userExists:"Такой username уже занят.",unauthorized:"Требуется авторизация.",forbidden:"Недостаточно прав.",roomNotFound:"Комната не найдена.",inviteInvalid:"Некорректный invite-код.",validationFailed:"Проверьте корректность введенных данных.",serverUnavailable:"Сервер временно недоступен. Повторите позже.",invalidUrl:"Некорректный URL.",navControl:"Control Panel",heroTitle:"Stories: project-visual landing",heroSubtitle:"Создавайте комнаты и подключайтесь к игре за секунды.",heroCreate:"Создать комнату",heroJoin:"Присоединиться",authRequiredAction:"Для этого действия войдите в аккаунт.",switchToLogin:"Уже есть аккаунт? Войти",switchToRegister:"Нет аккаунта? Регистрация",themeDark:"Тёмная",themeLight:"Светлая",controlPanelTitle:"Control Panel",controlPanelHint:"Только для администраторов: управление данными и live debug."},en:{appTag:"Stories • New interface",title:"Control Center",subtitle:"Rooms, profile, admin panel and live debug in one place.",login:"Sign in",register:"Sign up",logout:"Logout",notAuthorized:"Not authorized",signedAs:"Signed in as",navHome:"Rooms",navProfile:"Profile",navAdmin:"Admin",navDebug:"Debug",openAuth:"Login / Register",close:"Close",authTitle:"Authentication",authHint:"Create an account or sign in.",username:"username",password:"password",createAccount:"Create account",loginSuccess:"Signed in successfully.",registerSuccess:"Account created and signed in.",homeNeedAuth:"Sign in to access rooms.",roomsTitle:"Rooms",createRoom:"Create room",roomName:"Room name",connectCode:"Join by invite code",connect:"Connect",spectator:"Join as spectator",ready:"Ready.",roomCreated:"Room created. Invite code:",roomJoinSuccess:"Connected successfully. Room:",profileTitle:"User profile",profileEdit:"Edit profile",newPassword:"New password (optional)",saveProfile:"Save profile",stats:"Stats",needAuthProfile:"Sign in first.",profileUpdated:"Profile updated.",wins:"Wins",losses:"Losses",vt:"Victory tokens",elim3:"Eliminated with 3",adminTitle:"Admin panel (RBAC)",deckLoad:"Load deck",loadCards:"Show cards",loadEffects:"Show effects",patchCard:"Patch card",cardCode:"cardCode",newName:"New name",newText:"New text",valueOrEmpty:"value (or empty)",effectKey:"effectKey",enabled:"enabled",applyPatch:"Apply PATCH",cardsLoaded:"Cards for {deck} loaded.",effectsLoaded:"Effects loaded.",cardUpdated:"Card updated.",debugTitle:"Debug",oldInterface:"Technical panel for API and WebSocket.",checkHealth:"Check /health",waitingRequest:"Waiting for request…",websocket:"WebSocket",connectWs:"Connect",subscribe:"Subscribe",sendPing:"Ping",sendEvent:"Send room_event",wsNotConnected:"Not connected",wsConnected:"WebSocket connected",wsClosed:"WebSocket closed",wsError:"WebSocket error",connectSocketFirst:"Connect socket first",healthError:"Error",unknownError:"Unknown error",httpError:"HTTP error {status}",invalidCredentials:"Invalid username or password.",userExists:"This username is already taken.",unauthorized:"Authorization required.",forbidden:"Not enough permissions.",roomNotFound:"Room not found.",inviteInvalid:"Invalid invite code.",validationFailed:"Please check input values.",serverUnavailable:"Server is temporarily unavailable. Try again later.",invalidUrl:"Invalid URL.",navControl:"Control Panel",heroTitle:"Stories: project visual landing",heroSubtitle:"Create rooms and join matches in seconds.",heroCreate:"Create room",heroJoin:"Join room",authRequiredAction:"Please sign in to continue.",switchToLogin:"Already have an account? Sign in",switchToRegister:"No account yet? Sign up",themeDark:"Dark",themeLight:"Light",controlPanelTitle:"Control Panel",controlPanelHint:"Admin-only area for content management and live debug."}},t=(a,o={})=>{const n=g[e.lang]?.[a]??g.ru[a]??a;return Object.entries(o).reduce((s,[r,c])=>s.replaceAll(`{${r}}`,String(c)),n)},y=()=>e.token?{Authorization:`Bearer ${e.token}`}:{},w=(a,o)=>{const n=String(a||"").toUpperCase(),s={INVALID_CREDENTIALS:"invalidCredentials",USER_EXISTS:"userExists",UNAUTHORIZED:"unauthorized",FORBIDDEN:"forbidden",ROOM_NOT_FOUND:"roomNotFound",INVALID_INVITE_CODE:"inviteInvalid",VALIDATION_ERROR:"validationFailed"};return s[n]?s[n]:o===401?"unauthorized":o===403?"forbidden":o>=500?"serverUnavailable":null},k=(a,o,n)=>{const s=w(o?.code||o?.errorCode,a);return s?{key:s,message:t(s)}:{key:null,message:o?.message||o?.error||n||t("httpError",{status:a})}},u=async(a,o={})=>{let n;try{n=await fetch(`${e.apiBase.replace(/\/$/,"")}${a}`,{...o,headers:{"Content-Type":"application/json",...o.headers||{},...y(),Locale:e.lang}})}catch{throw new Error(t("serverUnavailable"))}const s=await n.text();let r={};try{r=s?JSON.parse(s):{}}catch{r={}}if(!n.ok){const c=k(n.status,r,s),l=new Error(c.message||t("unknownError"));throw l.code=c.key,l.status=n.status,l}return r},h=a=>{const o=document.createElement("div");return o.textContent=String(a??""),o.innerHTML},d=(a,o=256)=>{const n=document.querySelector(a);return n?String(n.value??"").trim().slice(0,o):""},f=(a,o)=>{let n;try{n=new URL(String(a||"").trim())}catch{throw new Error(t("invalidUrl"))}if(!o.includes(n.protocol))throw new Error(t("invalidUrl"));return n.toString().replace(/\/$/,"")},i=(a,o,n=!1)=>{const s=document.querySelector(`#${a}`);s&&(s.textContent=o,s.classList.toggle("ok",n))},m=a=>{const o=document.querySelector("#debugLog");if(!o)return;const n=document.createElement("div");n.textContent=`[${new Date().toLocaleTimeString()}] ${typeof a=="string"?a:JSON.stringify(a)}`,o.prepend(n)},v=(a,o="login")=>{e.authOpen=!0,e.authMode=o,a()},$=a=>{document.querySelectorAll("[data-tab]").forEach(o=>{o.addEventListener("click",()=>{e.activeTab=o.dataset.tab,a()})}),document.querySelectorAll("[data-lang]").forEach(o=>{o.addEventListener("click",()=>{e.lang=o.dataset.lang,localStorage.setItem("stories_lang",e.lang),a()})}),document.querySelectorAll("[data-theme]").forEach(o=>{o.addEventListener("click",()=>{e.theme=o.dataset.theme,localStorage.setItem("stories_theme",e.theme),a()})}),document.querySelector('[data-act="toggleAuth"]')?.addEventListener("click",()=>v(a,"login")),document.querySelector('[data-act="heroCreate"]')?.addEventListener("click",()=>{if(!e.user)return v(a,"login");document.querySelector("#roomName")?.focus()}),document.querySelector('[data-act="heroJoin"]')?.addEventListener("click",()=>{if(!e.user)return v(a,"login");document.querySelector("#inviteCode")?.focus()}),document.querySelectorAll('[data-act="closeAuth"]').forEach(o=>{o.addEventListener("click",()=>{e.authOpen=!1,a()})}),document.querySelector('[data-act="logout"]')?.addEventListener("click",()=>{e.token="",e.user=null,e.activeRoom=null,e.authOpen=!1,localStorage.removeItem("stories_token"),a()})},C=async(a,o)=>{document.querySelector('[data-act="switchAuthMode"]')?.addEventListener("click",()=>{e.authMode=e.authMode==="login"?"register":"login",a()}),document.querySelector('[data-act="authSubmit"]')?.addEventListener("click",async()=>{const n=e.authMode==="login"?"/auth/login":"/auth/register",s=e.authMode==="login"?t("loginSuccess"):t("registerSuccess");try{const r=await u(n,{method:"POST",body:JSON.stringify({username:d("#authUsername",64),password:d("#authPassword",128)})});e.token=r.accessToken,localStorage.setItem("stories_token",e.token),await o(),i("authStatus",s,!0),e.authOpen=!1,a()}catch(r){i("authStatus",r.message)}})},E=a=>{document.querySelector('[data-act="createRoom"]')?.addEventListener("click",async()=>{if(!e.user)return v(a,"login");try{e.activeRoom=await u("/rooms",{method:"POST",body:JSON.stringify({name:d("#roomName",64)})}),i("homeStatus",`${t("roomCreated")} ${e.activeRoom.inviteCode}`,!0),a()}catch(o){i("homeStatus",o.message)}}),document.querySelector('[data-act="joinByCode"]')?.addEventListener("click",async()=>{if(!e.user)return v(a,"login");try{e.activeRoom=await u("/rooms/join-by-code",{method:"POST",body:JSON.stringify({inviteCode:d("#inviteCode",6).toUpperCase(),spectator:!!document.querySelector("#joinAsSpectator")?.checked})}),i("homeStatus",`${t("roomJoinSuccess")} ${e.activeRoom.roomId}`,!0),a()}catch(o){i("homeStatus",o.message)}})},T=a=>{document.querySelector('[data-act="saveProfile"]')?.addEventListener("click",async()=>{try{const o=d("#profileUsername",64),n=d("#profilePassword",128),s={username:o};n&&(s.password=n),e.user=await u("/auth/me",{method:"PATCH",body:JSON.stringify(s)}),i("profileStatus",t("profileUpdated"),!0),a()}catch(o){i("profileStatus",o.message)}})},A=()=>{const a=document.querySelector("#adminOutput");a&&(document.querySelector('[data-act="loadCards"]')?.addEventListener("click",async()=>{try{const o=d("#adminDeck",16),n=await u(`/admin/cards?deck=${encodeURIComponent(o)}`);a.textContent=JSON.stringify(n,null,2),i("adminStatus",t("cardsLoaded",{deck:o}),!0)}catch(o){i("adminStatus",o.message)}}),document.querySelector('[data-act="loadEffects"]')?.addEventListener("click",async()=>{try{const o=await u("/admin/effects");a.textContent=JSON.stringify(o,null,2),i("adminStatus",t("effectsLoaded"),!0)}catch(o){i("adminStatus",o.message)}}),document.querySelector('[data-act="patchCard"]')?.addEventListener("click",async()=>{try{const o=d("#adminDeck",16),n=d("#adminCardCode",64),s={name:d("#adminCardName",64),text:d("#adminCardText",512),enabled:!!document.querySelector("#adminEnabled")?.checked},r=d("#adminCardValue",16),c=d("#adminEffectKey",64);r!==""&&(s.value=Number(r)),c!==""&&(s.effectKey=c);const l=await u(`/admin/cards/${encodeURIComponent(o)}/${encodeURIComponent(n)}`,{method:"PATCH",body:JSON.stringify(s)});a.textContent=JSON.stringify(l,null,2),i("adminStatus",t("cardUpdated"),!0)}catch(o){i("adminStatus",o.message)}}))},P=()=>{const a={apiBase:document.querySelector("#apiBase"),checkHealth:document.querySelector("#checkHealth"),wsUrl:document.querySelector("#wsUrl"),wsConnect:document.querySelector("#wsConnect"),roomId:document.querySelector("#roomId"),subscribeRoom:document.querySelector("#subscribeRoom"),sendPing:document.querySelector("#sendPing"),sendEvent:document.querySelector("#sendEvent"),eventName:document.querySelector("#eventName")};!a.apiBase||!a.wsUrl||!a.checkHealth||!a.wsConnect||(a.checkHealth.addEventListener("click",async()=>{try{e.apiBase=f(a.apiBase.value,["http:","https:"]);const o=await u("/health");i("healthStatus",`OK: ${JSON.stringify(o)}`,!0)}catch(o){i("healthStatus",`${t("healthError")}: ${o.message}`)}}),a.wsConnect.addEventListener("click",()=>{try{e.wsUrl=f(a.wsUrl.value,["ws:","wss:"])}catch(o){i("wsStatus",o.message);return}e.socket?.close(),e.socket=new WebSocket(e.wsUrl),e.socket.onopen=()=>{i("wsStatus",t("wsConnected"),!0),m("socket open")},e.socket.onmessage=o=>{try{m(JSON.parse(o.data))}catch{m(o.data)}},e.socket.onclose=()=>{i("wsStatus",t("wsClosed")),m("socket close")},e.socket.onerror=()=>{i("wsStatus",t("wsError")),m("socket error")}}),a.subscribeRoom?.addEventListener("click",()=>{if(!e.socket||e.socket.readyState!==WebSocket.OPEN)return m(t("connectSocketFirst"));e.socket.send(JSON.stringify({type:"subscribe_room",roomId:d("#roomId",64)}))}),a.sendPing?.addEventListener("click",()=>{if(!e.socket||e.socket.readyState!==WebSocket.OPEN)return m(t("connectSocketFirst"));e.socket.send(JSON.stringify({type:"ping"}))}),a.sendEvent?.addEventListener("click",()=>{if(!e.socket||e.socket.readyState!==WebSocket.OPEN)return m(t("connectSocketFirst"));e.socket.send(JSON.stringify({type:"room_event",roomId:d("#roomId",64),event:d("#eventName",128),data:{source:"frontend"}}))}))},N=()=>{if(!e.authOpen||e.user)return"";const a=e.authMode==="login";return`
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

      <div id="authStatus" class="status">${t("ready")}</div>
    </section>
  `},L=()=>`
  <section class="hero">
    <div>
      <span class="badge">${t("appTag")}</span>
      <h1>${t("heroTitle")}</h1>
      <p>${t("heroSubtitle")}</p>
    </div>
    <div class="hero-actions">
      <button class="primary" data-act="heroCreate">${t("heroCreate")}</button>
      <button class="secondary" data-act="heroJoin">${t("heroJoin")}</button>
    </div>
  </section>
`,R=()=>{const a=e.user?`
      <div class="grid">
        <article>
          <h3>${t("createRoom")}</h3>
          <div class="stack">
            <input id="roomName" placeholder="${t("roomName")}" />
            <button class="primary" data-act="createRoom">${t("createRoom")}</button>
          </div>
        </article>
        <article>
          <h3>${t("connectCode")}</h3>
          <div class="stack">
            <input id="inviteCode" placeholder="AB12CD" maxlength="6" />
            <label><input id="joinAsSpectator" type="checkbox" /> ${t("spectator")}</label>
            <button class="secondary" data-act="joinByCode">${t("connect")}</button>
          </div>
        </article>
      </div>`:`<article><p>${t("authRequiredAction")}</p></article>`;return`
    ${L()}
    <div id="homeStatus" class="status">${t("ready")}</div>
    ${a}
    ${e.activeRoom?`<pre class="json">${h(JSON.stringify(e.activeRoom,null,2))}</pre>`:""}
  `},O=()=>e.user?`
    <h2>${t("profileTitle")}</h2>
    <div class="grid">
      <article>
        <h3>${t("profileEdit")}</h3>
        <div class="stack">
          <input id="profileUsername" value="${h(e.user.username)}" />
          <input id="profilePassword" placeholder="${t("newPassword")}" type="password" />
          <button class="primary" data-act="saveProfile">${t("saveProfile")}</button>
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
    <div id="profileStatus" class="status">${t("ready")}</div>
  `:`<h2>${t("profileTitle")}</h2><div class="status">${t("needAuthProfile")}</div>`,I=()=>`
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
`,q=()=>`
  <article>
    <h3>API / WebSocket Debug</h3>
    <div class="row">
      <input id="apiBase" value="${h(e.apiBase)}" />
      <button id="checkHealth" class="secondary">${t("checkHealth")}</button>
    </div>
    <div id="healthStatus" class="status">${t("waitingRequest")}</div>
    <div class="row topgap">
      <input id="wsUrl" value="${h(e.wsUrl)}" />
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
`,U=()=>`
  <h2>${t("controlPanelTitle")}</h2>
  <p>${t("controlPanelHint")}</p>
  <div class="grid">
    ${I()}
    ${q()}
  </div>
  <div id="adminStatus" class="status">${t("ready")}</div>
  <pre id="adminOutput" class="json"></pre>
`,H=()=>{const a=e.user?`<div class="session ok">${t("signedAs")} <b>${h(e.user.username)}</b> (${h(e.user.role)})</div>`:`<div class="session">${t("notAuthorized")}</div>`;return`
  <main class="layout ${e.theme}">
    <header class="topbar">
      <div class="brand">
        <h2>${t("title")}</h2>
        ${a}
      </div>
      <div class="topbar-actions">
        <div class="theme-switch">
          <button class="chip ${e.theme==="dark"?"active":""}" data-theme="dark">${t("themeDark")}</button>
          <button class="chip ${e.theme==="light"?"active":""}" data-theme="light">${t("themeLight")}</button>
        </div>
        <div class="lang-switch">
          <button class="chip ${e.lang==="ru"?"active":""}" data-lang="ru">RU</button>
          <button class="chip ${e.lang==="en"?"active":""}" data-lang="en">EN</button>
        </div>
        ${e.user?`<button class="primary ghost" data-act="logout">${t("logout")}</button>`:`<button class="primary" data-act="toggleAuth">${t("openAuth")}</button>`}
      </div>
    </header>

    <nav class="tabs">
      <button class="tab ${e.activeTab==="home"?"active":""}" data-tab="home">${t("navHome")}</button>
      <button class="tab ${e.activeTab==="profile"?"active":""}" data-tab="profile">${t("navProfile")}</button>
      ${e.user?.role==="admin"?`<button class="tab ${e.activeTab==="control"?"active":""}" data-tab="control">${t("navControl")}</button>`:""}
    </nav>

    <section class="panel ${e.activeTab==="home"?"":"hidden"}">${R()}</section>
    <section class="panel ${e.activeTab==="profile"?"":"hidden"}">${O()}</section>
    ${e.user?.role==="admin"?`<section class="panel ${e.activeTab==="control"?"":"hidden"}">${U()}</section>`:""}

    ${N()}
  </main>`},b=document.querySelector("#app"),S=async()=>{if(e.token)try{e.user=await u("/auth/me")}catch{e.user=null,e.token="",localStorage.removeItem("stories_token")}},p=()=>{b&&(b.innerHTML=H(),$(p),e.activeTab==="home"&&E(p),e.activeTab==="profile"&&T(p),e.activeTab==="control"&&e.user?.role==="admin"&&(A(),P()),e.authOpen&&!e.user&&C(p,S))};await S();p();
//# sourceMappingURL=index-CKNtXAFx.js.map
