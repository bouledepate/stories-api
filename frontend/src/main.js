import './styles/main.scss';

const dictionaries = {
  ru: {
    appTag: 'Stories • Новый интерфейс',
    title: 'Control Center',
    subtitle: 'Комнаты, профиль, админка и live debug в одном месте.',
    login: 'Вход',
    register: 'Регистрация',
    logout: 'Выйти',
    notAuthorized: 'Не авторизованы',
    signedAs: 'Вы вошли как',
    navHome: 'Комнаты',
    navProfile: 'Профиль',
    navAdmin: 'Админ',
    navDebug: 'Debug',
    openAuth: 'Войти / Регистрация',
    close: 'Закрыть',
    authTitle: 'Авторизация',
    authHint: 'Откройте аккаунт или войдите в существующий.',
    username: 'username',
    password: 'password',
    createAccount: 'Создать аккаунт',
    loginSuccess: 'Успешный вход.',
    registerSuccess: 'Аккаунт создан и выполнен вход.',
    homeNeedAuth: 'Выполните вход для доступа к комнатам.',
    roomsTitle: 'Комнаты',
    createRoom: 'Создать комнату',
    roomName: 'Название комнаты',
    connectCode: 'Войти по invite-коду',
    connect: 'Подключиться',
    spectator: 'Зайти как spectator',
    ready: 'Готово.',
    roomCreated: 'Комната создана. Invite code:',
    roomJoinSuccess: 'Подключение успешно. Room:',
    profileTitle: 'Профиль пользователя',
    profileEdit: 'Редактирование',
    newPassword: 'Новый пароль (опционально)',
    saveProfile: 'Сохранить профиль',
    stats: 'Статистика',
    needAuthProfile: 'Сначала авторизуйтесь.',
    profileUpdated: 'Профиль обновлен.',
    wins: 'Победы',
    losses: 'Поражения',
    vt: 'Victory tokens',
    elim3: 'Eliminated with 3',
    adminTitle: 'Админ-панель (RBAC)',
    deckLoad: 'Загрузка колоды',
    loadCards: 'Показать cards',
    loadEffects: 'Показать effects',
    patchCard: 'Patch card',
    cardCode: 'cardCode',
    newName: 'Новое имя',
    newText: 'Новый текст',
    valueOrEmpty: 'value (или пусто)',
    effectKey: 'effectKey',
    enabled: 'enabled',
    applyPatch: 'Применить PATCH',
    cardsLoaded: 'Cards для {deck} загружены.',
    effectsLoaded: 'Effects загружены.',
    cardUpdated: 'Карта обновлена.',
    debugTitle: 'Debug',
    oldInterface: 'Техпанель для API и WebSocket.',
    checkHealth: 'Проверить /health',
    waitingRequest: 'Ожидание запроса…',
    websocket: 'WebSocket',
    connectWs: 'Подключиться',
    subscribe: 'Подписаться',
    sendPing: 'Ping',
    sendEvent: 'Отправить room_event',
    wsNotConnected: 'Не подключено',
    wsConnected: 'WebSocket подключен',
    wsClosed: 'WebSocket закрыт',
    wsError: 'WebSocket ошибка',
    connectSocketFirst: 'Сначала подключите сокет',
    healthError: 'Ошибка',
    unknownError: 'Неизвестная ошибка',
    httpError: 'Ошибка HTTP {status}',
    invalidCredentials: 'Неверный логин или пароль.',
    userExists: 'Такой username уже занят.',
    unauthorized: 'Требуется авторизация.',
    forbidden: 'Недостаточно прав.',
    roomNotFound: 'Комната не найдена.',
    inviteInvalid: 'Некорректный invite-код.',
    validationFailed: 'Проверьте корректность введенных данных.',
    serverUnavailable: 'Сервер временно недоступен. Повторите позже.',
  },
  en: {
    appTag: 'Stories • New interface',
    title: 'Control Center',
    subtitle: 'Rooms, profile, admin panel and live debug in one place.',
    login: 'Sign in',
    register: 'Sign up',
    logout: 'Logout',
    notAuthorized: 'Not authorized',
    signedAs: 'Signed in as',
    navHome: 'Rooms',
    navProfile: 'Profile',
    navAdmin: 'Admin',
    navDebug: 'Debug',
    openAuth: 'Login / Register',
    close: 'Close',
    authTitle: 'Authentication',
    authHint: 'Create an account or sign in.',
    username: 'username',
    password: 'password',
    createAccount: 'Create account',
    loginSuccess: 'Signed in successfully.',
    registerSuccess: 'Account created and signed in.',
    homeNeedAuth: 'Sign in to access rooms.',
    roomsTitle: 'Rooms',
    createRoom: 'Create room',
    roomName: 'Room name',
    connectCode: 'Join by invite code',
    connect: 'Connect',
    spectator: 'Join as spectator',
    ready: 'Ready.',
    roomCreated: 'Room created. Invite code:',
    roomJoinSuccess: 'Connected successfully. Room:',
    profileTitle: 'User profile',
    profileEdit: 'Edit profile',
    newPassword: 'New password (optional)',
    saveProfile: 'Save profile',
    stats: 'Stats',
    needAuthProfile: 'Sign in first.',
    profileUpdated: 'Profile updated.',
    wins: 'Wins',
    losses: 'Losses',
    vt: 'Victory tokens',
    elim3: 'Eliminated with 3',
    adminTitle: 'Admin panel (RBAC)',
    deckLoad: 'Load deck',
    loadCards: 'Show cards',
    loadEffects: 'Show effects',
    patchCard: 'Patch card',
    cardCode: 'cardCode',
    newName: 'New name',
    newText: 'New text',
    valueOrEmpty: 'value (or empty)',
    effectKey: 'effectKey',
    enabled: 'enabled',
    applyPatch: 'Apply PATCH',
    cardsLoaded: 'Cards for {deck} loaded.',
    effectsLoaded: 'Effects loaded.',
    cardUpdated: 'Card updated.',
    debugTitle: 'Debug',
    oldInterface: 'Technical panel for API and WebSocket.',
    checkHealth: 'Check /health',
    waitingRequest: 'Waiting for request…',
    websocket: 'WebSocket',
    connectWs: 'Connect',
    subscribe: 'Subscribe',
    sendPing: 'Ping',
    sendEvent: 'Send room_event',
    wsNotConnected: 'Not connected',
    wsConnected: 'WebSocket connected',
    wsClosed: 'WebSocket closed',
    wsError: 'WebSocket error',
    connectSocketFirst: 'Connect socket first',
    healthError: 'Error',
    unknownError: 'Unknown error',
    httpError: 'HTTP error {status}',
    invalidCredentials: 'Invalid username or password.',
    userExists: 'This username is already taken.',
    unauthorized: 'Authorization required.',
    forbidden: 'Not enough permissions.',
    roomNotFound: 'Room not found.',
    inviteInvalid: 'Invalid invite code.',
    validationFailed: 'Please check input values.',
    serverUnavailable: 'Server is temporarily unavailable. Try again later.',
  },
};

const state = {
  apiBase: window.location.origin,
  wsUrl: `ws://${window.location.hostname}:8081`,
  token: localStorage.getItem('stories_token') || '',
  user: null,
  activeRoom: null,
  activeTab: 'home',
  socket: null,
  lang: localStorage.getItem('stories_lang') || 'ru',
  authOpen: false,
};

const app = document.querySelector('#app');

const esc = (value) => {
  const div = document.createElement('div');
  div.textContent = String(value ?? '');
  return div.innerHTML;
};

const t = (key, vars = {}) => {
  const value = dictionaries[state.lang]?.[key] ?? dictionaries.ru[key] ?? key;
  return Object.entries(vars).reduce((acc, [k, v]) => acc.replaceAll(`{${k}}`, String(v)), value);
};

const authHeader = () => (state.token ? { Authorization: `Bearer ${state.token}` } : {});

const mapErrorCode = (code, status) => {
  const normalized = String(code || '').toUpperCase();
  const byCode = {
    INVALID_CREDENTIALS: 'invalidCredentials',
    USER_EXISTS: 'userExists',
    UNAUTHORIZED: 'unauthorized',
    FORBIDDEN: 'forbidden',
    ROOM_NOT_FOUND: 'roomNotFound',
    INVALID_INVITE_CODE: 'inviteInvalid',
    VALIDATION_ERROR: 'validationFailed',
  };

  if (byCode[normalized]) return byCode[normalized];
  if (status === 401) return 'unauthorized';
  if (status === 403) return 'forbidden';
  if (status >= 500) return 'serverUnavailable';
  return null;
};

const parseApiError = (status, payload, fallbackText) => {
  const key = mapErrorCode(payload?.code || payload?.errorCode, status);
  if (key) return { key, message: t(key) };

  const message = payload?.message || payload?.error || fallbackText || t('httpError', { status });
  return { key: null, message };
};

const callApi = async (path, options = {}) => {
  let response;
  try {
    response = await fetch(`${state.apiBase.replace(/\/$/, '')}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
        ...authHeader(),
        Locale: state.lang,
      },
    });
  } catch {
    throw new Error(t('serverUnavailable'));
  }

  const text = await response.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = {};
  }

  if (!response.ok) {
    const parsed = parseApiError(response.status, data, text);
    const error = new Error(parsed.message || t('unknownError'));
    error.code = parsed.key;
    error.status = response.status;
    throw error;
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
    ? `<div class="session ok">${t('signedAs')} <b>${esc(state.user.username)}</b> (${esc(state.user.role)})</div>`
    : `<div class="session">${t('notAuthorized')}</div>`;

  app.innerHTML = `
  <main class="layout">
    <header class="topbar">
      <div class="brand">
        <span class="badge">${t('appTag')}</span>
        <h1>${t('title')}</h1>
        <p>${t('subtitle')}</p>
        ${userBlock}
      </div>
      <div class="topbar-actions">
        <div class="lang-switch">
          <button class="chip ${state.lang === 'ru' ? 'active' : ''}" data-lang="ru">RU</button>
          <button class="chip ${state.lang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
        </div>
        ${state.user
          ? `<button class="primary ghost" data-act="logout">${t('logout')}</button>`
          : `<button class="primary" data-act="toggleAuth">${t('openAuth')}</button>`}
      </div>
    </header>

    <nav class="tabs">
      <button class="tab ${state.activeTab === 'home' ? 'active' : ''}" data-tab="home">${t('navHome')}</button>
      <button class="tab ${state.activeTab === 'profile' ? 'active' : ''}" data-tab="profile">${t('navProfile')}</button>
      ${state.user?.role === 'admin' ? `<button class="tab ${state.activeTab === 'admin' ? 'active' : ''}" data-tab="admin">${t('navAdmin')}</button>` : ''}
      <button class="tab ${state.activeTab === 'debug' ? 'active' : ''}" data-tab="debug">${t('navDebug')}</button>
    </nav>

    <section class="panel ${state.activeTab === 'home' ? '' : 'hidden'}">${renderHome()}</section>
    <section class="panel ${state.activeTab === 'profile' ? '' : 'hidden'}">${renderProfile()}</section>
    ${state.user?.role === 'admin' ? `<section class="panel ${state.activeTab === 'admin' ? '' : 'hidden'}">${renderAdmin()}</section>` : ''}
    <section class="panel ${state.activeTab === 'debug' ? '' : 'hidden'}">${renderDebug()}</section>

    ${renderAuthModal()}
  </main>`;

  bindCommonEvents();
  if (state.activeTab === 'debug') bindDebugEvents();
  if (state.activeTab === 'home') bindHomeEvents();
  if (state.activeTab === 'profile') bindProfileEvents();
  if (state.activeTab === 'admin' && state.user?.role === 'admin') bindAdminEvents();
  if (state.authOpen && !state.user) bindAuthEvents();
};

const renderAuthModal = () => {
  if (!state.authOpen || state.user) return '';

  return `
    <div class="modal-overlay" data-act="closeAuth"></div>
    <section class="modal">
      <div class="modal-head">
        <div>
          <h2>${t('authTitle')}</h2>
          <p>${t('authHint')}</p>
        </div>
        <button class="chip" data-act="closeAuth">${t('close')}</button>
      </div>
      <div class="grid auth-grid">
        <article>
          <h3>${t('login')}</h3>
          <div class="stack">
            <input id="loginUsername" placeholder="${t('username')}" />
            <input id="loginPassword" placeholder="${t('password')}" type="password" />
            <button class="primary" data-act="login">${t('login')}</button>
          </div>
        </article>
        <article>
          <h3>${t('register')}</h3>
          <div class="stack">
            <input id="regUsername" placeholder="${t('username')}" />
            <input id="regPassword" placeholder="${t('password')}" type="password" />
            <button class="primary" data-act="register">${t('createAccount')}</button>
          </div>
        </article>
      </div>
      <div id="authStatus" class="status">${t('ready')}</div>
    </section>
  `;
};

const renderHome = () => {
  if (!state.user) return `<h2>${t('roomsTitle')}</h2><div id="homeStatus" class="status">${t('homeNeedAuth')}</div>`;

  return `
    <h2>${t('roomsTitle')}</h2>
    <div class="grid">
      <article>
        <h3>${t('createRoom')}</h3>
        <div class="stack">
          <input id="roomName" placeholder="${t('roomName')}" />
          <button class="primary" data-act="createRoom">${t('createRoom')}</button>
        </div>
      </article>
      <article>
        <h3>${t('connectCode')}</h3>
        <div class="stack">
          <input id="inviteCode" placeholder="AB12CD" maxlength="6" />
          <label><input id="joinAsSpectator" type="checkbox" /> ${t('spectator')}</label>
          <button class="primary" data-act="joinByCode">${t('connect')}</button>
        </div>
      </article>
    </div>
    <div id="homeStatus" class="status">${t('ready')}</div>
    ${state.activeRoom ? `<pre class="json">${esc(JSON.stringify(state.activeRoom, null, 2))}</pre>` : ''}
  `;
};

const renderProfile = () => {
  if (!state.user) return `<h2>${t('profileTitle')}</h2><div class="status">${t('needAuthProfile')}</div>`;

  return `
    <h2>${t('profileTitle')}</h2>
    <div class="grid">
      <article>
        <h3>${t('profileEdit')}</h3>
        <div class="stack">
          <input id="profileUsername" value="${esc(state.user.username)}" />
          <input id="profilePassword" placeholder="${t('newPassword')}" type="password" />
          <button class="primary" data-act="saveProfile">${t('saveProfile')}</button>
        </div>
      </article>
      <article>
        <h3>${t('stats')}</h3>
        <ul>
          <li>${t('wins')}: <b>${state.user.wins}</b></li>
          <li>${t('losses')}: <b>${state.user.losses}</b></li>
          <li>${t('vt')}: <b>${state.user.victoryTokens}</b></li>
          <li>${t('elim3')}: <b>${state.user.eliminatedWith3}</b></li>
        </ul>
      </article>
    </div>
    <div id="profileStatus" class="status">${t('ready')}</div>
  `;
};

const renderAdmin = () => `
  <h2>${t('adminTitle')}</h2>
  <div class="grid">
    <article>
      <h3>${t('deckLoad')}</h3>
      <div class="stack">
        <select id="adminDeck">
          <option value="character">character</option>
          <option value="decree">decree</option>
          <option value="event">event</option>
        </select>
        <button class="primary" data-act="loadCards">${t('loadCards')}</button>
        <button data-act="loadEffects">${t('loadEffects')}</button>
      </div>
    </article>
    <article>
      <h3>${t('patchCard')}</h3>
      <div class="stack">
        <input id="adminCardCode" placeholder="${t('cardCode')}" />
        <input id="adminCardName" placeholder="${t('newName')}" />
        <input id="adminCardText" placeholder="${t('newText')}" />
        <input id="adminCardValue" placeholder="${t('valueOrEmpty')}" />
        <input id="adminEffectKey" placeholder="${t('effectKey')}" />
        <label><input id="adminEnabled" type="checkbox" checked /> ${t('enabled')}</label>
        <button class="primary" data-act="patchCard">${t('applyPatch')}</button>
      </div>
    </article>
  </div>
  <div id="adminStatus" class="status">${t('ready')}</div>
  <pre id="adminOutput" class="json"></pre>
`;

const renderDebug = () => `
  <h2>${t('debugTitle')}</h2>
  <p>${t('oldInterface')}</p>
  <div class="grid">
    <article>
      <h3>API</h3>
      <div class="row">
        <input id="apiBase" value="${esc(state.apiBase)}" />
        <button id="checkHealth" class="primary">${t('checkHealth')}</button>
      </div>
      <div id="healthStatus" class="status">${t('waitingRequest')}</div>
    </article>
    <article>
      <h3>${t('websocket')}</h3>
      <div class="row">
        <input id="wsUrl" value="${esc(state.wsUrl)}" />
        <button id="wsConnect" class="primary">${t('connectWs')}</button>
      </div>
      <div class="row topgap">
        <input id="roomId" placeholder="roomId" />
        <button id="subscribeRoom">${t('subscribe')}</button>
        <button id="sendPing">${t('sendPing')}</button>
      </div>
      <div class="row topgap">
        <input id="eventName" value="frontend_debug" />
        <button id="sendEvent">${t('sendEvent')}</button>
      </div>
      <div id="wsStatus" class="status">${t('wsNotConnected')}</div>
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

  document.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.lang = btn.dataset.lang;
      localStorage.setItem('stories_lang', state.lang);
      render();
    });
  });

  document.querySelector('[data-act="toggleAuth"]')?.addEventListener('click', () => {
    state.authOpen = true;
    render();
  });

  document.querySelectorAll('[data-act="closeAuth"]').forEach((node) => {
    node.addEventListener('click', () => {
      state.authOpen = false;
      render();
    });
  });

  document.querySelector('[data-act="logout"]')?.addEventListener('click', () => {
    state.token = '';
    state.user = null;
    state.activeRoom = null;
    state.authOpen = false;
    localStorage.removeItem('stories_token');
    render();
  });
};

const bindAuthEvents = () => {
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
      setStatus('authStatus', t('loginSuccess'), true);
      state.authOpen = false;
      render();
    } catch (e) {
      setStatus('authStatus', e.message);
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
      setStatus('authStatus', t('registerSuccess'), true);
      state.authOpen = false;
      render();
    } catch (e) {
      setStatus('authStatus', e.message);
    }
  });
};

const bindHomeEvents = () => {
  document.querySelector('[data-act="createRoom"]')?.addEventListener('click', async () => {
    try {
      state.activeRoom = await callApi('/rooms', {
        method: 'POST',
        body: JSON.stringify({ name: document.querySelector('#roomName').value }),
      });
      setStatus('homeStatus', `${t('roomCreated')} ${state.activeRoom.inviteCode}`, true);
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
      setStatus('homeStatus', `${t('roomJoinSuccess')} ${state.activeRoom.roomId}`, true);
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
      setStatus('profileStatus', t('profileUpdated'), true);
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
      setStatus('adminStatus', t('cardsLoaded', { deck }), true);
    } catch (e) {
      setStatus('adminStatus', e.message);
    }
  });

  document.querySelector('[data-act="loadEffects"]').addEventListener('click', async () => {
    try {
      const data = await callApi('/admin/effects');
      output.textContent = JSON.stringify(data, null, 2);
      setStatus('adminStatus', t('effectsLoaded'), true);
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
      setStatus('adminStatus', t('cardUpdated'), true);
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
      setStatus('healthStatus', `${t('healthError')}: ${error.message}`);
    }
  });

  ui.wsConnect.addEventListener('click', () => {
    state.wsUrl = ui.wsUrl.value.trim();
    state.socket?.close();
    state.socket = new WebSocket(state.wsUrl);

    state.socket.onopen = () => {
      setStatus('wsStatus', t('wsConnected'), true);
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
      setStatus('wsStatus', t('wsClosed'));
      logDebug('socket close');
    };
    state.socket.onerror = () => {
      setStatus('wsStatus', t('wsError'));
      logDebug('socket error');
    };
  });

  ui.subscribeRoom.addEventListener('click', () => {
    if (!state.socket || state.socket.readyState !== WebSocket.OPEN) return logDebug(t('connectSocketFirst'));
    state.socket.send(JSON.stringify({ type: 'subscribe_room', roomId: ui.roomId.value.trim() }));
  });

  ui.sendPing.addEventListener('click', () => {
    if (!state.socket || state.socket.readyState !== WebSocket.OPEN) return logDebug(t('connectSocketFirst'));
    state.socket.send(JSON.stringify({ type: 'ping' }));
  });

  ui.sendEvent.addEventListener('click', () => {
    if (!state.socket || state.socket.readyState !== WebSocket.OPEN) return logDebug(t('connectSocketFirst'));
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
