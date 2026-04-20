(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const u of i.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&s(u)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const h={ru:{appTag:"Stories • Новый интерфейс",title:"Control Center",subtitle:"Комнаты, профиль, админка и live debug в одном месте.",login:"Вход",register:"Регистрация",logout:"Выйти",notAuthorized:"Не авторизованы",signedAs:"Вы вошли как",navHome:"Комнаты",navProfile:"Профиль",navAdmin:"Админ",navDebug:"Debug",openAuth:"Войти / Регистрация",close:"Закрыть",authTitle:"Авторизация",authHint:"Откройте аккаунт или войдите в существующий.",username:"username",password:"password",createAccount:"Создать аккаунт",loginSuccess:"Успешный вход.",registerSuccess:"Аккаунт создан и выполнен вход.",homeNeedAuth:"Выполните вход для доступа к комнатам.",roomsTitle:"Комнаты",createRoom:"Создать комнату",roomName:"Название комнаты",connectCode:"Войти по invite-коду",connect:"Подключиться",spectator:"Зайти как spectator",ready:"Готово.",roomCreated:"Комната создана. Invite code:",roomJoinSuccess:"Подключение успешно. Room:",profileTitle:"Профиль пользователя",profileEdit:"Редактирование",newPassword:"Новый пароль (опционально)",saveProfile:"Сохранить профиль",stats:"Статистика",needAuthProfile:"Сначала авторизуйтесь.",profileUpdated:"Профиль обновлен.",wins:"Победы",losses:"Поражения",vt:"Victory tokens",elim3:"Eliminated with 3",adminTitle:"Админ-панель (RBAC)",deckLoad:"Загрузка колоды",loadCards:"Показать cards",loadEffects:"Показать effects",patchCard:"Patch card",cardCode:"cardCode",newName:"Новое имя",newText:"Новый текст",valueOrEmpty:"value (или пусто)",effectKey:"effectKey",enabled:"enabled",applyPatch:"Применить PATCH",cardsLoaded:"Cards для {deck} загружены.",effectsLoaded:"Effects загружены.",cardUpdated:"Карта обновлена.",debugTitle:"Debug",oldInterface:"Техпанель для API и WebSocket.",checkHealth:"Проверить /health",waitingRequest:"Ожидание запроса…",websocket:"WebSocket",connectWs:"Подключиться",subscribe:"Подписаться",sendPing:"Ping",sendEvent:"Отправить room_event",wsNotConnected:"Не подключено",wsConnected:"WebSocket подключен",wsClosed:"WebSocket закрыт",wsError:"WebSocket ошибка",connectSocketFirst:"Сначала подключите сокет",healthError:"Ошибка",unknownError:"Неизвестная ошибка",httpError:"Ошибка HTTP {status}",invalidCredentials:"Неверный логин или пароль.",userExists:"Такой username уже занят.",unauthorized:"Требуется авторизация.",forbidden:"Недостаточно прав.",roomNotFound:"Комната не найдена.",inviteInvalid:"Некорректный invite-код.",validationFailed:"Проверьте корректность введенных данных.",serverUnavailable:"Сервер временно недоступен. Повторите позже."},en:{appTag:"Stories • New interface",title:"Control Center",subtitle:"Rooms, profile, admin panel and live debug in one place.",login:"Sign in",register:"Sign up",logout:"Logout",notAuthorized:"Not authorized",signedAs:"Signed in as",navHome:"Rooms",navProfile:"Profile",navAdmin:"Admin",navDebug:"Debug",openAuth:"Login / Register",close:"Close",authTitle:"Authentication",authHint:"Create an account or sign in.",username:"username",password:"password",createAccount:"Create account",loginSuccess:"Signed in successfully.",registerSuccess:"Account created and signed in.",homeNeedAuth:"Sign in to access rooms.",roomsTitle:"Rooms",createRoom:"Create room",roomName:"Room name",connectCode:"Join by invite code",connect:"Connect",spectator:"Join as spectator",ready:"Ready.",roomCreated:"Room created. Invite code:",roomJoinSuccess:"Connected successfully. Room:",profileTitle:"User profile",profileEdit:"Edit profile",newPassword:"New password (optional)",saveProfile:"Save profile",stats:"Stats",needAuthProfile:"Sign in first.",profileUpdated:"Profile updated.",wins:"Wins",losses:"Losses",vt:"Victory tokens",elim3:"Eliminated with 3",adminTitle:"Admin panel (RBAC)",deckLoad:"Load deck",loadCards:"Show cards",loadEffects:"Show effects",patchCard:"Patch card",cardCode:"cardCode",newName:"New name",newText:"New text",valueOrEmpty:"value (or empty)",effectKey:"effectKey",enabled:"enabled",applyPatch:"Apply PATCH",cardsLoaded:"Cards for {deck} loaded.",effectsLoaded:"Effects loaded.",cardUpdated:"Card updated.",debugTitle:"Debug",oldInterface:"Technical panel for API and WebSocket.",checkHealth:"Check /health",waitingRequest:"Waiting for request…",websocket:"WebSocket",connectWs:"Connect",subscribe:"Subscribe",sendPing:"Ping",sendEvent:"Send room_event",wsNotConnected:"Not connected",wsConnected:"WebSocket connected",wsClosed:"WebSocket closed",wsError:"WebSocket error",connectSocketFirst:"Connect socket first",healthError:"Error",unknownError:"Unknown error",httpError:"HTTP error {status}",invalidCredentials:"Invalid username or password.",userExists:"This username is already taken.",unauthorized:"Authorization required.",forbidden:"Not enough permissions.",roomNotFound:"Room not found.",inviteInvalid:"Invalid invite code.",validationFailed:"Please check input values.",serverUnavailable:"Server is temporarily unavailable. Try again later."}},t={apiBase:window.location.origin,wsUrl:`ws://${window.location.hostname}:8081`,token:localStorage.getItem("stories_token")||"",user:null,activeRoom:null,activeTab:"home",socket:null,lang:localStorage.getItem("stories_lang")||"ru",authOpen:!1},b=document.querySelector("#app"),v=a=>{const o=document.createElement("div");return o.textContent=String(a??""),o.innerHTML},e=(a,o={})=>{const n=h[t.lang]?.[a]??h.ru[a]??a;return Object.entries(o).reduce((s,[r,i])=>s.replaceAll(`{${r}}`,String(i)),n)},f=()=>t.token?{Authorization:`Bearer ${t.token}`}:{},g=(a,o)=>{const n=String(a||"").toUpperCase(),s={INVALID_CREDENTIALS:"invalidCredentials",USER_EXISTS:"userExists",UNAUTHORIZED:"unauthorized",FORBIDDEN:"forbidden",ROOM_NOT_FOUND:"roomNotFound",INVALID_INVITE_CODE:"inviteInvalid",VALIDATION_ERROR:"validationFailed"};return s[n]?s[n]:o===401?"unauthorized":o===403?"forbidden":o>=500?"serverUnavailable":null},y=(a,o,n)=>{const s=g(o?.code||o?.errorCode,a);return s?{key:s,message:e(s)}:{key:null,message:o?.message||o?.error||n||e("httpError",{status:a})}},l=async(a,o={})=>{let n;try{n=await fetch(`${t.apiBase.replace(/\/$/,"")}${a}`,{...o,headers:{"Content-Type":"application/json",...o.headers||{},...f(),Locale:t.lang}})}catch{throw new Error(e("serverUnavailable"))}const s=await n.text();let r={};try{r=s?JSON.parse(s):{}}catch{r={}}if(!n.ok){const i=y(n.status,r,s),u=new Error(i.message||e("unknownError"));throw u.code=i.key,u.status=n.status,u}return r},m=a=>{const o=document.querySelector("#debugLog");if(!o)return;const n=document.createElement("div");n.textContent=`[${new Date().toLocaleTimeString()}] ${typeof a=="string"?a:JSON.stringify(a)}`,o.prepend(n)},d=()=>{const a=t.user?`<div class="session ok">${e("signedAs")} <b>${v(t.user.username)}</b> (${v(t.user.role)})</div>`:`<div class="session">${e("notAuthorized")}</div>`;b.innerHTML=`
  <main class="layout">
    <header class="topbar">
      <div class="brand">
        <span class="badge">${e("appTag")}</span>
        <h1>${e("title")}</h1>
        <p>${e("subtitle")}</p>
        ${a}
      </div>
      <div class="topbar-actions">
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
      ${t.user?.role==="admin"?`<button class="tab ${t.activeTab==="admin"?"active":""}" data-tab="admin">${e("navAdmin")}</button>`:""}
      <button class="tab ${t.activeTab==="debug"?"active":""}" data-tab="debug">${e("navDebug")}</button>
    </nav>

    <section class="panel ${t.activeTab==="home"?"":"hidden"}">${k()}</section>
    <section class="panel ${t.activeTab==="profile"?"":"hidden"}">${$()}</section>
    ${t.user?.role==="admin"?`<section class="panel ${t.activeTab==="admin"?"":"hidden"}">${w()}</section>`:""}
    <section class="panel ${t.activeTab==="debug"?"":"hidden"}">${C()}</section>

    ${S()}
  </main>`,E(),t.activeTab==="debug"&&O(),t.activeTab==="home"&&N(),t.activeTab==="profile"&&A(),t.activeTab==="admin"&&t.user?.role==="admin"&&P(),t.authOpen&&!t.user&&T()},S=()=>!t.authOpen||t.user?"":`
    <div class="modal-overlay" data-act="closeAuth"></div>
    <section class="modal">
      <div class="modal-head">
        <div>
          <h2>${e("authTitle")}</h2>
          <p>${e("authHint")}</p>
        </div>
        <button class="chip" data-act="closeAuth">${e("close")}</button>
      </div>
      <div class="grid auth-grid">
        <article>
          <h3>${e("login")}</h3>
          <div class="stack">
            <input id="loginUsername" placeholder="${e("username")}" />
            <input id="loginPassword" placeholder="${e("password")}" type="password" />
            <button class="primary" data-act="login">${e("login")}</button>
          </div>
        </article>
        <article>
          <h3>${e("register")}</h3>
          <div class="stack">
            <input id="regUsername" placeholder="${e("username")}" />
            <input id="regPassword" placeholder="${e("password")}" type="password" />
            <button class="primary" data-act="register">${e("createAccount")}</button>
          </div>
        </article>
      </div>
      <div id="authStatus" class="status">${e("ready")}</div>
    </section>
  `,k=()=>t.user?`
    <h2>${e("roomsTitle")}</h2>
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
          <button class="primary" data-act="joinByCode">${e("connect")}</button>
        </div>
      </article>
    </div>
    <div id="homeStatus" class="status">${e("ready")}</div>
    ${t.activeRoom?`<pre class="json">${v(JSON.stringify(t.activeRoom,null,2))}</pre>`:""}
  `:`<h2>${e("roomsTitle")}</h2><div id="homeStatus" class="status">${e("homeNeedAuth")}</div>`,$=()=>t.user?`
    <h2>${e("profileTitle")}</h2>
    <div class="grid">
      <article>
        <h3>${e("profileEdit")}</h3>
        <div class="stack">
          <input id="profileUsername" value="${v(t.user.username)}" />
          <input id="profilePassword" placeholder="${e("newPassword")}" type="password" />
          <button class="primary" data-act="saveProfile">${e("saveProfile")}</button>
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
  `:`<h2>${e("profileTitle")}</h2><div class="status">${e("needAuthProfile")}</div>`,w=()=>`
  <h2>${e("adminTitle")}</h2>
  <div class="grid">
    <article>
      <h3>${e("deckLoad")}</h3>
      <div class="stack">
        <select id="adminDeck">
          <option value="character">character</option>
          <option value="decree">decree</option>
          <option value="event">event</option>
        </select>
        <button class="primary" data-act="loadCards">${e("loadCards")}</button>
        <button data-act="loadEffects">${e("loadEffects")}</button>
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
  </div>
  <div id="adminStatus" class="status">${e("ready")}</div>
  <pre id="adminOutput" class="json"></pre>
`,C=()=>`
  <h2>${e("debugTitle")}</h2>
  <p>${e("oldInterface")}</p>
  <div class="grid">
    <article>
      <h3>API</h3>
      <div class="row">
        <input id="apiBase" value="${v(t.apiBase)}" />
        <button id="checkHealth" class="primary">${e("checkHealth")}</button>
      </div>
      <div id="healthStatus" class="status">${e("waitingRequest")}</div>
    </article>
    <article>
      <h3>${e("websocket")}</h3>
      <div class="row">
        <input id="wsUrl" value="${v(t.wsUrl)}" />
        <button id="wsConnect" class="primary">${e("connectWs")}</button>
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
    </article>
  </div>
  <div id="debugLog" class="log"></div>
`,c=(a,o,n=!1)=>{const s=document.querySelector(`#${a}`);s&&(s.textContent=o,s.classList.toggle("ok",n))},E=()=>{document.querySelectorAll("[data-tab]").forEach(a=>{a.addEventListener("click",()=>{t.activeTab=a.dataset.tab,d()})}),document.querySelectorAll("[data-lang]").forEach(a=>{a.addEventListener("click",()=>{t.lang=a.dataset.lang,localStorage.setItem("stories_lang",t.lang),d()})}),document.querySelector('[data-act="toggleAuth"]')?.addEventListener("click",()=>{t.authOpen=!0,d()}),document.querySelectorAll('[data-act="closeAuth"]').forEach(a=>{a.addEventListener("click",()=>{t.authOpen=!1,d()})}),document.querySelector('[data-act="logout"]')?.addEventListener("click",()=>{t.token="",t.user=null,t.activeRoom=null,t.authOpen=!1,localStorage.removeItem("stories_token"),d()})},T=()=>{document.querySelector('[data-act="login"]')?.addEventListener("click",async()=>{try{const a=await l("/auth/login",{method:"POST",body:JSON.stringify({username:document.querySelector("#loginUsername").value,password:document.querySelector("#loginPassword").value})});t.token=a.accessToken,localStorage.setItem("stories_token",t.token),await p(),c("authStatus",e("loginSuccess"),!0),t.authOpen=!1,d()}catch(a){c("authStatus",a.message)}}),document.querySelector('[data-act="register"]')?.addEventListener("click",async()=>{try{const a=await l("/auth/register",{method:"POST",body:JSON.stringify({username:document.querySelector("#regUsername").value,password:document.querySelector("#regPassword").value})});t.token=a.accessToken,localStorage.setItem("stories_token",t.token),await p(),c("authStatus",e("registerSuccess"),!0),t.authOpen=!1,d()}catch(a){c("authStatus",a.message)}})},N=()=>{document.querySelector('[data-act="createRoom"]')?.addEventListener("click",async()=>{try{t.activeRoom=await l("/rooms",{method:"POST",body:JSON.stringify({name:document.querySelector("#roomName").value})}),c("homeStatus",`${e("roomCreated")} ${t.activeRoom.inviteCode}`,!0),d()}catch(a){c("homeStatus",a.message)}}),document.querySelector('[data-act="joinByCode"]')?.addEventListener("click",async()=>{try{t.activeRoom=await l("/rooms/join-by-code",{method:"POST",body:JSON.stringify({inviteCode:document.querySelector("#inviteCode").value,spectator:document.querySelector("#joinAsSpectator").checked})}),c("homeStatus",`${e("roomJoinSuccess")} ${t.activeRoom.roomId}`,!0),d()}catch(a){c("homeStatus",a.message)}})},A=()=>{document.querySelector('[data-act="saveProfile"]')?.addEventListener("click",async()=>{try{const a=document.querySelector("#profileUsername").value,o=document.querySelector("#profilePassword").value,n={username:a};o&&(n.password=o),t.user=await l("/auth/me",{method:"PATCH",body:JSON.stringify(n)}),c("profileStatus",e("profileUpdated"),!0),d()}catch(a){c("profileStatus",a.message)}})},P=()=>{const a=document.querySelector("#adminOutput");document.querySelector('[data-act="loadCards"]').addEventListener("click",async()=>{try{const o=document.querySelector("#adminDeck").value,n=await l(`/admin/cards?deck=${encodeURIComponent(o)}`);a.textContent=JSON.stringify(n,null,2),c("adminStatus",e("cardsLoaded",{deck:o}),!0)}catch(o){c("adminStatus",o.message)}}),document.querySelector('[data-act="loadEffects"]').addEventListener("click",async()=>{try{const o=await l("/admin/effects");a.textContent=JSON.stringify(o,null,2),c("adminStatus",e("effectsLoaded"),!0)}catch(o){c("adminStatus",o.message)}}),document.querySelector('[data-act="patchCard"]').addEventListener("click",async()=>{try{const o=document.querySelector("#adminDeck").value,n=document.querySelector("#adminCardCode").value,s={name:document.querySelector("#adminCardName").value,text:document.querySelector("#adminCardText").value,enabled:document.querySelector("#adminEnabled").checked},r=document.querySelector("#adminCardValue").value,i=document.querySelector("#adminEffectKey").value;r!==""&&(s.value=Number(r)),i!==""&&(s.effectKey=i);const u=await l(`/admin/cards/${encodeURIComponent(o)}/${encodeURIComponent(n)}`,{method:"PATCH",body:JSON.stringify(s)});a.textContent=JSON.stringify(u,null,2),c("adminStatus",e("cardUpdated"),!0)}catch(o){c("adminStatus",o.message)}})},O=()=>{const a={apiBase:document.querySelector("#apiBase"),checkHealth:document.querySelector("#checkHealth"),wsUrl:document.querySelector("#wsUrl"),wsConnect:document.querySelector("#wsConnect"),roomId:document.querySelector("#roomId"),subscribeRoom:document.querySelector("#subscribeRoom"),sendPing:document.querySelector("#sendPing"),sendEvent:document.querySelector("#sendEvent"),eventName:document.querySelector("#eventName")};a.checkHealth.addEventListener("click",async()=>{t.apiBase=a.apiBase.value.replace(/\/$/,"");try{const o=await l("/health");c("healthStatus",`OK: ${JSON.stringify(o)}`,!0)}catch(o){c("healthStatus",`${e("healthError")}: ${o.message}`)}}),a.wsConnect.addEventListener("click",()=>{t.wsUrl=a.wsUrl.value.trim(),t.socket?.close(),t.socket=new WebSocket(t.wsUrl),t.socket.onopen=()=>{c("wsStatus",e("wsConnected"),!0),m("socket open")},t.socket.onmessage=o=>{try{m(JSON.parse(o.data))}catch{m(o.data)}},t.socket.onclose=()=>{c("wsStatus",e("wsClosed")),m("socket close")},t.socket.onerror=()=>{c("wsStatus",e("wsError")),m("socket error")}}),a.subscribeRoom.addEventListener("click",()=>{if(!t.socket||t.socket.readyState!==WebSocket.OPEN)return m(e("connectSocketFirst"));t.socket.send(JSON.stringify({type:"subscribe_room",roomId:a.roomId.value.trim()}))}),a.sendPing.addEventListener("click",()=>{if(!t.socket||t.socket.readyState!==WebSocket.OPEN)return m(e("connectSocketFirst"));t.socket.send(JSON.stringify({type:"ping"}))}),a.sendEvent.addEventListener("click",()=>{if(!t.socket||t.socket.readyState!==WebSocket.OPEN)return m(e("connectSocketFirst"));t.socket.send(JSON.stringify({type:"room_event",roomId:a.roomId.value.trim(),event:a.eventName.value.trim(),data:{source:"frontend"}}))})},p=async()=>{if(t.token)try{t.user=await l("/auth/me")}catch{t.user=null,t.token="",localStorage.removeItem("stories_token")}};await p();d();
//# sourceMappingURL=index-DDiYsiPw.js.map
