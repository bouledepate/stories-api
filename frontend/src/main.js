import './styles/main.scss';

const app = document.querySelector('#app');
app.innerHTML = `
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
`;

const ui = {
  apiBase: document.querySelector('#apiBase'),
  checkHealth: document.querySelector('#checkHealth'),
  healthStatus: document.querySelector('#healthStatus'),
  wsUrl: document.querySelector('#wsUrl'),
  wsConnect: document.querySelector('#wsConnect'),
  roomId: document.querySelector('#roomId'),
  subscribeRoom: document.querySelector('#subscribeRoom'),
  sendPing: document.querySelector('#sendPing'),
  sendEvent: document.querySelector('#sendEvent'),
  eventName: document.querySelector('#eventName'),
  wsStatus: document.querySelector('#wsStatus'),
  wsLog: document.querySelector('#wsLog')
};

let socket;

const log = (payload) => {
  const line = document.createElement('div');
  line.textContent = `[${new Date().toLocaleTimeString()}] ${typeof payload === 'string' ? payload : JSON.stringify(payload)}`;
  ui.wsLog.prepend(line);
};

ui.checkHealth.addEventListener('click', async () => {
  const base = ui.apiBase.value.replace(/\/$/, '');
  try {
    const response = await fetch(`${base}/health`);
    const data = await response.json();
    ui.healthStatus.textContent = `OK: ${JSON.stringify(data)}`;
    ui.healthStatus.classList.add('ok');
  } catch (error) {
    ui.healthStatus.textContent = `Ошибка: ${error.message}`;
    ui.healthStatus.classList.remove('ok');
  }
});

ui.wsConnect.addEventListener('click', () => {
  socket?.close();
  socket = new WebSocket(ui.wsUrl.value.trim());

  socket.onopen = () => {
    ui.wsStatus.textContent = 'WebSocket подключен';
    ui.wsStatus.classList.add('ok');
    log('socket open');
  };
  socket.onmessage = (event) => {
    try {
      log(JSON.parse(event.data));
    } catch {
      log(event.data);
    }
  };
  socket.onclose = () => {
    ui.wsStatus.textContent = 'WebSocket закрыт';
    ui.wsStatus.classList.remove('ok');
    log('socket close');
  };
  socket.onerror = () => {
    ui.wsStatus.textContent = 'WebSocket ошибка';
    ui.wsStatus.classList.remove('ok');
    log('socket error');
  };
});

ui.subscribeRoom.addEventListener('click', () => {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    return log('connect socket first');
  }

  socket.send(JSON.stringify({
    type: 'subscribe_room',
    roomId: ui.roomId.value.trim()
  }));
});

ui.sendPing.addEventListener('click', () => {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    return log('connect socket first');
  }

  socket.send(JSON.stringify({ type: 'ping' }));
});

ui.sendEvent.addEventListener('click', () => {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    return log('connect socket first');
  }

  socket.send(JSON.stringify({
    type: 'room_event',
    roomId: ui.roomId.value.trim(),
    event: ui.eventName.value.trim(),
    data: { source: 'frontend' }
  }));
});
