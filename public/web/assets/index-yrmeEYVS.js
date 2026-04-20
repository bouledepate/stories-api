(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))d(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&d(a)}).observe(document,{childList:!0,subtree:!0});function i(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function d(t){if(t.ep)return;t.ep=!0;const s=i(t);fetch(t.href,s)}})();const l=document.querySelector("#app");l.innerHTML=`
  <main class="layout">
    <section class="hero">
      <span class="badge">Stories • WebSocket-ready UI</span>
      <h1>Игровая панель</h1>
      <p>Красивый frontend-шаблон + подключение к REST API и WebSocket.</p>
    </section>

    <section class="grid">
      <article class="panel">
        <h2>API</h2>
        <div class="row">
          <input id="apiBase" value="${window.location.origin}" />
          <button id="checkHealth" class="primary">Проверить /health</button>
        </div>
        <div id="healthStatus" class="status">Ожидание запроса…</div>
      </article>

      <article class="panel">
        <h2>WebSocket</h2>
        <div class="row">
          <input id="wsUrl" value="ws://${window.location.hostname}:8081" />
          <button id="wsConnect" class="primary">Подключиться</button>
        </div>
        <div class="row" style="margin-top:8px;">
          <input id="roomId" placeholder="roomId" />
          <button id="subscribeRoom">Подписаться</button>
          <button id="sendPing">Ping</button>
        </div>
        <div class="row" style="margin-top:8px;">
          <input id="eventName" value="frontend_debug" />
          <button id="sendEvent">Отправить room_event</button>
        </div>
        <div id="wsStatus" class="status">Не подключено</div>
      </article>
    </section>

    <section class="panel" style="margin-top:16px;">
      <h2>События</h2>
      <div id="wsLog" class="log"></div>
    </section>
  </main>
`;const e={apiBase:document.querySelector("#apiBase"),checkHealth:document.querySelector("#checkHealth"),healthStatus:document.querySelector("#healthStatus"),wsUrl:document.querySelector("#wsUrl"),wsConnect:document.querySelector("#wsConnect"),roomId:document.querySelector("#roomId"),subscribeRoom:document.querySelector("#subscribeRoom"),sendPing:document.querySelector("#sendPing"),sendEvent:document.querySelector("#sendEvent"),eventName:document.querySelector("#eventName"),wsStatus:document.querySelector("#wsStatus"),wsLog:document.querySelector("#wsLog")};let o;const c=n=>{const r=document.createElement("div");r.textContent=`[${new Date().toLocaleTimeString()}] ${typeof n=="string"?n:JSON.stringify(n)}`,e.wsLog.prepend(r)};e.checkHealth.addEventListener("click",async()=>{const n=e.apiBase.value.replace(/\/$/,"");try{const i=await(await fetch(`${n}/health`)).json();e.healthStatus.textContent=`OK: ${JSON.stringify(i)}`,e.healthStatus.classList.add("ok")}catch(r){e.healthStatus.textContent=`Ошибка: ${r.message}`,e.healthStatus.classList.remove("ok")}});e.wsConnect.addEventListener("click",()=>{o?.close(),o=new WebSocket(e.wsUrl.value.trim()),o.onopen=()=>{e.wsStatus.textContent="WebSocket подключен",e.wsStatus.classList.add("ok"),c("socket open")},o.onmessage=n=>{try{c(JSON.parse(n.data))}catch{c(n.data)}},o.onclose=()=>{e.wsStatus.textContent="WebSocket закрыт",e.wsStatus.classList.remove("ok"),c("socket close")},o.onerror=()=>{e.wsStatus.textContent="WebSocket ошибка",e.wsStatus.classList.remove("ok"),c("socket error")}});e.subscribeRoom.addEventListener("click",()=>{if(!o||o.readyState!==WebSocket.OPEN)return c("connect socket first");o.send(JSON.stringify({type:"subscribe_room",roomId:e.roomId.value.trim()}))});e.sendPing.addEventListener("click",()=>{if(!o||o.readyState!==WebSocket.OPEN)return c("connect socket first");o.send(JSON.stringify({type:"ping"}))});e.sendEvent.addEventListener("click",()=>{if(!o||o.readyState!==WebSocket.OPEN)return c("connect socket first");o.send(JSON.stringify({type:"room_event",roomId:e.roomId.value.trim(),event:e.eventName.value.trim(),data:{source:"frontend"}}))});
//# sourceMappingURL=index-yrmeEYVS.js.map
