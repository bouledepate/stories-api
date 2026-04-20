import './styles/main.scss';

const state = {
  apiBase: window.location.origin,
  wsUrl: `ws://${window.location.hostname}:8081`,
  token: localStorage.getItem('stories_token') || '',
  user: null,
  activeRoom: null,
  activeTab: 'home',
  socket: null,
};

const app = document.querySelector('#app');

const esc = (value) => {
  const div = document.createElement('div');
  div.textContent = String(value ?? '');
  return div.innerHTML;
};

const authHeader = () => (state.token ? { Authorization: `Bearer ${state.token}` } : {});

const callApi = async (path, options = {}) => {
  const response = await fetch(`${state.apiBase.replace(/\/$/, '')}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      ...authHeader(),
    },
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};
  if (!response.ok) {
    throw new Error(data.error || `HTTP ${response.status}`);
  }

  return data;
};

const logDebug = (payload) => {
  const container = document.querySelector('#debugLog');
  if (!container) return;
  const line = document.createElement('div');
  line.textContent = `[${new Date().toLocaleTimeString()}] ${typeof payload === 'string' ? payload : JSON.stringify(payload)}`;
  container.prepend(line);
};

const render = () => {
  const userBlock = state.user
    ? `<div class="session ok">Вошли как <b>${esc(state.user.username)}</b> (${esc(state.user.role)}) <button data-act="logout">Выйти</button></div>`
    : '<div class="session">Не авторизованы</div>';

  app.innerHTML = `
  <main class="layout">
    <header class="hero">
      <span class="badge">Stories • Полноценный интерфейс</span>
      <h1>Игровой портал</h1>
      <p>Регистрация, профиль, комнаты по invite-коду, RBAC и админ-панель.</p>
      ${userBlock}
    </header>

    <nav class="tabs">
      <button class="tab ${state.activeTab === 'home' ? 'active' : ''}" data-tab="home">Главная</button>
      <button class="tab ${state.activeTab === 'profile' ? 'active' : ''}" data-tab="profile">Профиль</button>
      ${state.user?.role === 'admin' ? `<button class="tab ${state.activeTab === 'admin' ? 'active' : ''}" data-tab="admin">Админ</button>` : ''}
      <button class="tab ${state.activeTab === 'debug' ? 'active' : ''}" data-tab="debug">Debug</button>
    </nav>

    <section class="panel ${state.activeTab === 'home' ? '' : 'hidden'}">${renderHome()}</section>
    <section class="panel ${state.activeTab === 'profile' ? '' : 'hidden'}">${renderProfile()}</section>
    ${state.user?.role === 'admin' ? `<section class="panel ${state.activeTab === 'admin' ? '' : 'hidden'}">${renderAdmin()}</section>` : ''}
    <section class="panel ${state.activeTab === 'debug' ? '' : 'hidden'}">${renderDebug()}</section>
  </main>`;

  bindCommonEvents();
  if (state.activeTab === 'debug') bindDebugEvents();
  if (state.activeTab === 'home') bindHomeEvents();
  if (state.activeTab === 'profile') bindProfileEvents();
  if (state.activeTab === 'admin' && state.user?.role === 'admin') bindAdminEvents();
};

const renderHome = () => {
  if (!state.user) {
    return `
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
    `;
  }

  return `
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
    ${state.activeRoom ? `<pre class="json">${esc(JSON.stringify(state.activeRoom, null, 2))}</pre>` : ''}
  `;
};

const renderProfile = () => {
  if (!state.user) return '<h2>Профиль</h2><div class="status">Сначала авторизуйтесь.</div>';

  return `
    <h2>Профиль пользователя</h2>
    <div class="grid">
      <article>
        <h3>Редактирование</h3>
        <div class="stack">
          <input id="profileUsername" value="${esc(state.user.username)}" />
          <input id="profilePassword" placeholder="Новый пароль (опционально)" type="password" />
          <button class="primary" data-act="saveProfile">Сохранить профиль</button>
        </div>
      </article>
      <article>
        <h3>Статистика</h3>
        <ul>
          <li>Победы: <b>${state.user.wins}</b></li>
          <li>Поражения: <b>${state.user.losses}</b></li>
          <li>Victory tokens: <b>${state.user.victoryTokens}</b></li>
          <li>Eliminated with 3: <b>${state.user.eliminatedWith3}</b></li>
        </ul>
      </article>
    </div>
    <div id="profileStatus" class="status">Данные загружены.</div>
  `;
};

const renderAdmin = () => `
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
`;

const renderDebug = () => `
  <h2>Debug-вкладка (старый интерфейс)</h2>
  <div class="grid">
    <article>
      <h3>API</h3>
      <div class="row">
        <input id="apiBase" value="${esc(state.apiBase)}" />
        <button id="checkHealth" class="primary">Проверить /health</button>
      </div>
      <div id="healthStatus" class="status">Ожидание запроса…</div>
    </article>
    <article>
      <h3>WebSocket</h3>
      <div class="row">
        <input id="wsUrl" value="${esc(state.wsUrl)}" />
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
`;

const setStatus = (id, message, ok = false) => {
  const el = document.querySelector(`#${id}`);
  if (!el) return;
  el.textContent = message;
  el.classList.toggle('ok', ok);
};

const bindCommonEvents = () => {
  document.querySelectorAll('[data-tab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.activeTab = btn.dataset.tab;
      render();
    });
  });

  document.querySelector('[data-act="logout"]')?.addEventListener('click', () => {
    state.token = '';
    state.user = null;
    state.activeRoom = null;
    localStorage.removeItem('stories_token');
    render();
  });
};

const bindHomeEvents = () => {
  document.querySelector('[data-act="login"]')?.addEventListener('click', async () => {
    try {
      const data = await callApi('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          username: document.querySelector('#loginUsername').value,
          password: document.querySelector('#loginPassword').value,
        }),
      });
      state.token = data.accessToken;
      localStorage.setItem('stories_token', state.token);
      await loadMe();
      setStatus('homeStatus', 'Успешный вход.', true);
      render();
    } catch (e) {
      setStatus('homeStatus', e.message);
    }
  });

  document.querySelector('[data-act="register"]')?.addEventListener('click', async () => {
    try {
      const data = await callApi('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          username: document.querySelector('#regUsername').value,
          password: document.querySelector('#regPassword').value,
        }),
      });
      state.token = data.accessToken;
      localStorage.setItem('stories_token', state.token);
      await loadMe();
      setStatus('homeStatus', 'Аккаунт создан и выполнен вход.', true);
      render();
    } catch (e) {
      setStatus('homeStatus', e.message);
    }
  });

  document.querySelector('[data-act="createRoom"]')?.addEventListener('click', async () => {
    try {
      state.activeRoom = await callApi('/rooms', {
        method: 'POST',
        body: JSON.stringify({ name: document.querySelector('#roomName').value }),
      });
      setStatus('homeStatus', `Комната создана. Invite code: ${state.activeRoom.inviteCode}`, true);
      render();
    } catch (e) {
      setStatus('homeStatus', e.message);
    }
  });

  document.querySelector('[data-act="joinByCode"]')?.addEventListener('click', async () => {
    try {
      state.activeRoom = await callApi('/rooms/join-by-code', {
        method: 'POST',
        body: JSON.stringify({
          inviteCode: document.querySelector('#inviteCode').value,
          spectator: document.querySelector('#joinAsSpectator').checked,
        }),
      });
      setStatus('homeStatus', `Подключение успешно. Room: ${state.activeRoom.roomId}`, true);
      render();
    } catch (e) {
      setStatus('homeStatus', e.message);
    }
  });
};

const bindProfileEvents = () => {
  document.querySelector('[data-act="saveProfile"]')?.addEventListener('click', async () => {
    try {
      const username = document.querySelector('#profileUsername').value;
      const password = document.querySelector('#profilePassword').value;
      const payload = { username };
      if (password) payload.password = password;
      state.user = await callApi('/auth/me', {
        method: 'PATCH',
        body: JSON.stringify(payload),
      });
      setStatus('profileStatus', 'Профиль обновлен.', true);
      render();
    } catch (e) {
      setStatus('profileStatus', e.message);
    }
  });
};

const bindAdminEvents = () => {
  const output = document.querySelector('#adminOutput');

  document.querySelector('[data-act="loadCards"]').addEventListener('click', async () => {
    try {
      const deck = document.querySelector('#adminDeck').value;
      const data = await callApi(`/admin/cards?deck=${encodeURIComponent(deck)}`);
      output.textContent = JSON.stringify(data, null, 2);
      setStatus('adminStatus', `Cards для ${deck} загружены.`, true);
    } catch (e) {
      setStatus('adminStatus', e.message);
    }
  });

  document.querySelector('[data-act="loadEffects"]').addEventListener('click', async () => {
    try {
      const data = await callApi('/admin/effects');
      output.textContent = JSON.stringify(data, null, 2);
      setStatus('adminStatus', 'Effects загружены.', true);
    } catch (e) {
      setStatus('adminStatus', e.message);
    }
  });

  document.querySelector('[data-act="patchCard"]').addEventListener('click', async () => {
    try {
      const deck = document.querySelector('#adminDeck').value;
      const cardCode = document.querySelector('#adminCardCode').value;
      const payload = {
        name: document.querySelector('#adminCardName').value,
        text: document.querySelector('#adminCardText').value,
        enabled: document.querySelector('#adminEnabled').checked,
      };
      const value = document.querySelector('#adminCardValue').value;
      const effectKey = document.querySelector('#adminEffectKey').value;
      if (value !== '') payload.value = Number(value);
      if (effectKey !== '') payload.effectKey = effectKey;

      const data = await callApi(`/admin/cards/${encodeURIComponent(deck)}/${encodeURIComponent(cardCode)}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      });
      output.textContent = JSON.stringify(data, null, 2);
      setStatus('adminStatus', 'Карта обновлена.', true);
    } catch (e) {
      setStatus('adminStatus', e.message);
    }
  });
};

const bindDebugEvents = () => {
  const ui = {
    apiBase: document.querySelector('#apiBase'),
    checkHealth: document.querySelector('#checkHealth'),
    wsUrl: document.querySelector('#wsUrl'),
    wsConnect: document.querySelector('#wsConnect'),
    roomId: document.querySelector('#roomId'),
    subscribeRoom: document.querySelector('#subscribeRoom'),
    sendPing: document.querySelector('#sendPing'),
    sendEvent: document.querySelector('#sendEvent'),
    eventName: document.querySelector('#eventName'),
  };

  ui.checkHealth.addEventListener('click', async () => {
    state.apiBase = ui.apiBase.value.replace(/\/$/, '');
    try {
      const data = await callApi('/health');
      setStatus('healthStatus', `OK: ${JSON.stringify(data)}`, true);
    } catch (error) {
      setStatus('healthStatus', `Ошибка: ${error.message}`);
    }
  });

  ui.wsConnect.addEventListener('click', () => {
    state.wsUrl = ui.wsUrl.value.trim();
    state.socket?.close();
    state.socket = new WebSocket(state.wsUrl);

    state.socket.onopen = () => {
      setStatus('wsStatus', 'WebSocket подключен', true);
      logDebug('socket open');
    };
    state.socket.onmessage = (event) => {
      try {
        logDebug(JSON.parse(event.data));
      } catch {
        logDebug(event.data);
      }
    };
    state.socket.onclose = () => {
      setStatus('wsStatus', 'WebSocket закрыт');
      logDebug('socket close');
    };
    state.socket.onerror = () => {
      setStatus('wsStatus', 'WebSocket ошибка');
      logDebug('socket error');
    };
  });

  ui.subscribeRoom.addEventListener('click', () => {
    if (!state.socket || state.socket.readyState !== WebSocket.OPEN) return logDebug('connect socket first');
    state.socket.send(JSON.stringify({ type: 'subscribe_room', roomId: ui.roomId.value.trim() }));
  });

  ui.sendPing.addEventListener('click', () => {
    if (!state.socket || state.socket.readyState !== WebSocket.OPEN) return logDebug('connect socket first');
    state.socket.send(JSON.stringify({ type: 'ping' }));
  });

  ui.sendEvent.addEventListener('click', () => {
    if (!state.socket || state.socket.readyState !== WebSocket.OPEN) return logDebug('connect socket first');
    state.socket.send(JSON.stringify({
      type: 'room_event',
      roomId: ui.roomId.value.trim(),
      event: ui.eventName.value.trim(),
      data: { source: 'frontend' },
    }));
  });
};

const loadMe = async () => {
  if (!state.token) return;
  try {
    state.user = await callApi('/auth/me');
  } catch {
    state.user = null;
    state.token = '';
    localStorage.removeItem('stories_token');
  }
};

await loadMe();
render();
