(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const m of n.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&r(m)}).observe(document,{childList:!0,subtree:!0});function c(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(o){if(o.ep)return;o.ep=!0;const n=c(o);fetch(o.href,n)}})();const e={apiBase:window.location.origin,wsUrl:`ws://${window.location.hostname}:8081`,token:localStorage.getItem("stories_token")||"",user:null,activeRoom:null,activeTab:"home",socket:null},p=document.querySelector("#app"),u=t=>{const a=document.createElement("div");return a.textContent=String(t??""),a.innerHTML},h=()=>e.token?{Authorization:`Bearer ${e.token}`}:{},i=async(t,a={})=>{const c=await fetch(`${e.apiBase.replace(/\/$/,"")}${t}`,{...a,headers:{"Content-Type":"application/json",...a.headers||{},...h()}}),r=await c.text(),o=r?JSON.parse(r):{};if(!c.ok)throw new Error(o.error||`HTTP ${c.status}`);return o},d=t=>{const a=document.querySelector("#debugLog");if(!a)return;const c=document.createElement("div");c.textContent=`[${new Date().toLocaleTimeString()}] ${typeof t=="string"?t:JSON.stringify(t)}`,a.prepend(c)},l=()=>{const t=e.user?`<div class="session ok">Вошли как <b>${u(e.user.username)}</b> (${u(e.user.role)}) <button data-act="logout">Выйти</button></div>`:'<div class="session">Не авторизованы</div>';p.innerHTML=`
  <main class="layout">
    <header class="hero">
      <span class="badge">Stories • Полноценный интерфейс</span>
      <h1>Игровой портал</h1>
      <p>Регистрация, профиль, комнаты по invite-коду, RBAC и админ-панель.</p>
      ${t}
    </header>

    <nav class="tabs">
      <button class="tab ${e.activeTab==="home"?"active":""}" data-tab="home">Главная</button>
      <button class="tab ${e.activeTab==="profile"?"active":""}" data-tab="profile">Профиль</button>
      ${e.user?.role==="admin"?`<button class="tab ${e.activeTab==="admin"?"active":""}" data-tab="admin">Админ</button>`:""}
      <button class="tab ${e.activeTab==="debug"?"active":""}" data-tab="debug">Debug</button>
    </nav>

    <section class="panel ${e.activeTab==="home"?"":"hidden"}">${b()}</section>
    <section class="panel ${e.activeTab==="profile"?"":"hidden"}">${y()}</section>
    ${e.user?.role==="admin"?`<section class="panel ${e.activeTab==="admin"?"":"hidden"}">${S()}</section>`:""}
    <section class="panel ${e.activeTab==="debug"?"":"hidden"}">${f()}</section>
  </main>`,g(),e.activeTab==="debug"&&$(),e.activeTab==="home"&&k(),e.activeTab==="profile"&&w(),e.activeTab==="admin"&&e.user?.role==="admin"&&C()},b=()=>e.user?`
    <h2>Комнаты</h2>
    <div class="grid">
      <article>
        <h3>Создать комнату</h3>
        <div class="stack">
          <input id="roomName" placeholder="Название комнаты" />
          <button class="primary" data-act="createRoom">Создать</button>
        </div>
      </article>
      <article>
        <h3>Подключиться по invite-коду</h3>
        <div class="stack">
          <input id="inviteCode" placeholder="Напр. AB12CD" maxlength="6" />
          <label><input id="joinAsSpectator" type="checkbox" /> Зайти как spectator</label>
          <button class="primary" data-act="joinByCode">Подключиться</button>
        </div>
      </article>
    </div>
    <div id="homeStatus" class="status">Готово.</div>
    ${e.activeRoom?`<pre class="json">${u(JSON.stringify(e.activeRoom,null,2))}</pre>`:""}
  `:`
      <h2>Авторизация</h2>
      <div class="grid">
        <article>
          <h3>Вход</h3>
          <div class="stack">
            <input id="loginUsername" placeholder="username" />
            <input id="loginPassword" placeholder="password" type="password" />
            <button class="primary" data-act="login">Войти</button>
          </div>
        </article>
        <article>
          <h3>Регистрация</h3>
          <div class="stack">
            <input id="regUsername" placeholder="username" />
            <input id="regPassword" placeholder="password" type="password" />
            <button class="primary" data-act="register">Создать аккаунт</button>
          </div>
        </article>
      </div>
      <div id="homeStatus" class="status">Выполните вход для доступа к комнатам.</div>
    `,y=()=>e.user?`
    <h2>Профиль пользователя</h2>
    <div class="grid">
      <article>
        <h3>Редактирование</h3>
        <div class="stack">
          <input id="profileUsername" value="${u(e.user.username)}" />
          <input id="profilePassword" placeholder="Новый пароль (опционально)" type="password" />
          <button class="primary" data-act="saveProfile">Сохранить профиль</button>
        </div>
      </article>
      <article>
        <h3>Статистика</h3>
        <ul>
          <li>Победы: <b>${e.user.wins}</b></li>
          <li>Поражения: <b>${e.user.losses}</b></li>
          <li>Victory tokens: <b>${e.user.victoryTokens}</b></li>
          <li>Eliminated with 3: <b>${e.user.eliminatedWith3}</b></li>
        </ul>
      </article>
    </div>
    <div id="profileStatus" class="status">Данные загружены.</div>
  `:'<h2>Профиль</h2><div class="status">Сначала авторизуйтесь.</div>',S=()=>`
  <h2>Админ-панель (RBAC)</h2>
  <div class="grid">
    <article>
      <h3>Загрузка колоды</h3>
      <div class="stack">
        <select id="adminDeck">
          <option value="character">character</option>
          <option value="decree">decree</option>
          <option value="event">event</option>
        </select>
        <button class="primary" data-act="loadCards">Показать cards</button>
        <button data-act="loadEffects">Показать effects</button>
      </div>
    </article>
    <article>
      <h3>Patch card</h3>
      <div class="stack">
        <input id="adminCardCode" placeholder="cardCode" />
        <input id="adminCardName" placeholder="Новое имя" />
        <input id="adminCardText" placeholder="Новый текст" />
        <input id="adminCardValue" placeholder="value (или пусто)" />
        <input id="adminEffectKey" placeholder="effectKey" />
        <label><input id="adminEnabled" type="checkbox" checked /> enabled</label>
        <button class="primary" data-act="patchCard">Применить PATCH</button>
      </div>
    </article>
  </div>
  <div id="adminStatus" class="status">Готово.</div>
  <pre id="adminOutput" class="json"></pre>
`,f=()=>`
  <h2>Debug-вкладка (старый интерфейс)</h2>
  <div class="grid">
    <article>
      <h3>API</h3>
      <div class="row">
        <input id="apiBase" value="${u(e.apiBase)}" />
        <button id="checkHealth" class="primary">Проверить /health</button>
      </div>
      <div id="healthStatus" class="status">Ожидание запроса…</div>
    </article>
    <article>
      <h3>WebSocket</h3>
      <div class="row">
        <input id="wsUrl" value="${u(e.wsUrl)}" />
        <button id="wsConnect" class="primary">Подключиться</button>
      </div>
      <div class="row topgap">
        <input id="roomId" placeholder="roomId" />
        <button id="subscribeRoom">Подписаться</button>
        <button id="sendPing">Ping</button>
      </div>
      <div class="row topgap">
        <input id="eventName" value="frontend_debug" />
        <button id="sendEvent">Отправить room_event</button>
      </div>
      <div id="wsStatus" class="status">Не подключено</div>
    </article>
  </div>
  <div id="debugLog" class="log"></div>
`,s=(t,a,c=!1)=>{const r=document.querySelector(`#${t}`);r&&(r.textContent=a,r.classList.toggle("ok",c))},g=()=>{document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{e.activeTab=t.dataset.tab,l()})}),document.querySelector('[data-act="logout"]')?.addEventListener("click",()=>{e.token="",e.user=null,e.activeRoom=null,localStorage.removeItem("stories_token"),l()})},k=()=>{document.querySelector('[data-act="login"]')?.addEventListener("click",async()=>{try{const t=await i("/auth/login",{method:"POST",body:JSON.stringify({username:document.querySelector("#loginUsername").value,password:document.querySelector("#loginPassword").value})});e.token=t.accessToken,localStorage.setItem("stories_token",e.token),await v(),s("homeStatus","Успешный вход.",!0),l()}catch(t){s("homeStatus",t.message)}}),document.querySelector('[data-act="register"]')?.addEventListener("click",async()=>{try{const t=await i("/auth/register",{method:"POST",body:JSON.stringify({username:document.querySelector("#regUsername").value,password:document.querySelector("#regPassword").value})});e.token=t.accessToken,localStorage.setItem("stories_token",e.token),await v(),s("homeStatus","Аккаунт создан и выполнен вход.",!0),l()}catch(t){s("homeStatus",t.message)}}),document.querySelector('[data-act="createRoom"]')?.addEventListener("click",async()=>{try{e.activeRoom=await i("/rooms",{method:"POST",body:JSON.stringify({name:document.querySelector("#roomName").value})}),s("homeStatus",`Комната создана. Invite code: ${e.activeRoom.inviteCode}`,!0),l()}catch(t){s("homeStatus",t.message)}}),document.querySelector('[data-act="joinByCode"]')?.addEventListener("click",async()=>{try{e.activeRoom=await i("/rooms/join-by-code",{method:"POST",body:JSON.stringify({inviteCode:document.querySelector("#inviteCode").value,spectator:document.querySelector("#joinAsSpectator").checked})}),s("homeStatus",`Подключение успешно. Room: ${e.activeRoom.roomId}`,!0),l()}catch(t){s("homeStatus",t.message)}})},w=()=>{document.querySelector('[data-act="saveProfile"]')?.addEventListener("click",async()=>{try{const t=document.querySelector("#profileUsername").value,a=document.querySelector("#profilePassword").value,c={username:t};a&&(c.password=a),e.user=await i("/auth/me",{method:"PATCH",body:JSON.stringify(c)}),s("profileStatus","Профиль обновлен.",!0),l()}catch(t){s("profileStatus",t.message)}})},C=()=>{const t=document.querySelector("#adminOutput");document.querySelector('[data-act="loadCards"]').addEventListener("click",async()=>{try{const a=document.querySelector("#adminDeck").value,c=await i(`/admin/cards?deck=${encodeURIComponent(a)}`);t.textContent=JSON.stringify(c,null,2),s("adminStatus",`Cards для ${a} загружены.`,!0)}catch(a){s("adminStatus",a.message)}}),document.querySelector('[data-act="loadEffects"]').addEventListener("click",async()=>{try{const a=await i("/admin/effects");t.textContent=JSON.stringify(a,null,2),s("adminStatus","Effects загружены.",!0)}catch(a){s("adminStatus",a.message)}}),document.querySelector('[data-act="patchCard"]').addEventListener("click",async()=>{try{const a=document.querySelector("#adminDeck").value,c=document.querySelector("#adminCardCode").value,r={name:document.querySelector("#adminCardName").value,text:document.querySelector("#adminCardText").value,enabled:document.querySelector("#adminEnabled").checked},o=document.querySelector("#adminCardValue").value,n=document.querySelector("#adminEffectKey").value;o!==""&&(r.value=Number(o)),n!==""&&(r.effectKey=n);const m=await i(`/admin/cards/${encodeURIComponent(a)}/${encodeURIComponent(c)}`,{method:"PATCH",body:JSON.stringify(r)});t.textContent=JSON.stringify(m,null,2),s("adminStatus","Карта обновлена.",!0)}catch(a){s("adminStatus",a.message)}})},$=()=>{const t={apiBase:document.querySelector("#apiBase"),checkHealth:document.querySelector("#checkHealth"),wsUrl:document.querySelector("#wsUrl"),wsConnect:document.querySelector("#wsConnect"),roomId:document.querySelector("#roomId"),subscribeRoom:document.querySelector("#subscribeRoom"),sendPing:document.querySelector("#sendPing"),sendEvent:document.querySelector("#sendEvent"),eventName:document.querySelector("#eventName")};t.checkHealth.addEventListener("click",async()=>{e.apiBase=t.apiBase.value.replace(/\/$/,"");try{const a=await i("/health");s("healthStatus",`OK: ${JSON.stringify(a)}`,!0)}catch(a){s("healthStatus",`Ошибка: ${a.message}`)}}),t.wsConnect.addEventListener("click",()=>{e.wsUrl=t.wsUrl.value.trim(),e.socket?.close(),e.socket=new WebSocket(e.wsUrl),e.socket.onopen=()=>{s("wsStatus","WebSocket подключен",!0),d("socket open")},e.socket.onmessage=a=>{try{d(JSON.parse(a.data))}catch{d(a.data)}},e.socket.onclose=()=>{s("wsStatus","WebSocket закрыт"),d("socket close")},e.socket.onerror=()=>{s("wsStatus","WebSocket ошибка"),d("socket error")}}),t.subscribeRoom.addEventListener("click",()=>{if(!e.socket||e.socket.readyState!==WebSocket.OPEN)return d("connect socket first");e.socket.send(JSON.stringify({type:"subscribe_room",roomId:t.roomId.value.trim()}))}),t.sendPing.addEventListener("click",()=>{if(!e.socket||e.socket.readyState!==WebSocket.OPEN)return d("connect socket first");e.socket.send(JSON.stringify({type:"ping"}))}),t.sendEvent.addEventListener("click",()=>{if(!e.socket||e.socket.readyState!==WebSocket.OPEN)return d("connect socket first");e.socket.send(JSON.stringify({type:"room_event",roomId:t.roomId.value.trim(),event:t.eventName.value.trim(),data:{source:"frontend"}}))})},v=async()=>{if(e.token)try{e.user=await i("/auth/me")}catch{e.user=null,e.token="",localStorage.removeItem("stories_token")}};await v();l();
//# sourceMappingURL=index-UzXjM0Zb.js.map
