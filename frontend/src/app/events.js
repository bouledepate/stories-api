import { callApi } from './api';
import { t } from './i18n';
import { parseSafeUrl, safeTextValue } from './security';
import { state } from './state';

export const setStatus = (id, message, ok = false) => {
  const el = document.querySelector(`#${id}`);
  if (!el) return;
  el.textContent = message;
  el.classList.toggle('ok', ok);
};

export const logDebug = (payload) => {
  const container = document.querySelector('#debugLog');
  if (!container) return;
  const line = document.createElement('div');
  line.textContent = `[${new Date().toLocaleTimeString()}] ${typeof payload === 'string' ? payload : JSON.stringify(payload)}`;
  container.prepend(line);
};

const openAuth = (render, mode = 'login') => {
  state.authOpen = true;
  state.authMode = mode;
  render();
};

export const bindCommonEvents = (render) => {
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

  document.querySelectorAll('[data-theme]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.theme = btn.dataset.theme;
      localStorage.setItem('stories_theme', state.theme);
      render();
    });
  });

  document.querySelector('[data-act="toggleAuth"]')?.addEventListener('click', () => openAuth(render, 'login'));

  document.querySelector('[data-act="heroCreate"]')?.addEventListener('click', () => {
    if (!state.user) return openAuth(render, 'login');
    document.querySelector('#roomName')?.focus();
  });

  document.querySelector('[data-act="heroJoin"]')?.addEventListener('click', () => {
    if (!state.user) return openAuth(render, 'login');
    document.querySelector('#inviteCode')?.focus();
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

export const bindAuthEvents = async (render, loadMe) => {
  document.querySelector('[data-act="switchAuthMode"]')?.addEventListener('click', () => {
    state.authMode = state.authMode === 'login' ? 'register' : 'login';
    render();
  });

  document.querySelector('[data-act="authSubmit"]')?.addEventListener('click', async () => {
    const endpoint = state.authMode === 'login' ? '/auth/login' : '/auth/register';
    const successMessage = state.authMode === 'login' ? t('loginSuccess') : t('registerSuccess');

    try {
      const data = await callApi(endpoint, {
        method: 'POST',
        body: JSON.stringify({
          username: safeTextValue('#authUsername', 64),
          password: safeTextValue('#authPassword', 128),
        }),
      });

      state.token = data.accessToken;
      localStorage.setItem('stories_token', state.token);
      await loadMe();
      setStatus('authStatus', successMessage, true);
      state.authOpen = false;
      render();
    } catch (error) {
      setStatus('authStatus', error.message);
    }
  });
};

export const bindHomeEvents = (render) => {
  const requireRoom = () => {
    if (!state.activeRoom?.roomId) {
      setStatus('homeStatus', t('roomNotFound'));
      return false;
    }
    return true;
  };

  document.querySelector('[data-act="createRoom"]')?.addEventListener('click', async () => {
    if (!state.user) return openAuth(render, 'login');

    try {
      state.activeRoom = await callApi('/rooms', {
        method: 'POST',
        body: JSON.stringify({ name: safeTextValue('#roomName', 64) }),
      });
      setStatus('homeStatus', `${t('roomCreated')} ${state.activeRoom.inviteCode}`, true);
      render();
    } catch (e) {
      setStatus('homeStatus', e.message);
    }
  });

  document.querySelector('[data-act="joinByCode"]')?.addEventListener('click', async () => {
    if (!state.user) return openAuth(render, 'login');

    try {
      state.activeRoom = await callApi('/rooms/join-by-code', {
        method: 'POST',
        body: JSON.stringify({
          inviteCode: safeTextValue('#inviteCode', 6).toUpperCase(),
          spectator: Boolean(document.querySelector('#joinAsSpectator')?.checked),
        }),
      });
      setStatus('homeStatus', `${t('roomJoinSuccess')} ${state.activeRoom.roomId}`, true);
      render();
    } catch (e) {
      setStatus('homeStatus', e.message);
    }
  });

  document.querySelector('[data-act="refreshRoom"]')?.addEventListener('click', async () => {
    if (!requireRoom()) return;
    try {
      state.activeRoom = await callApi(`/rooms/${encodeURIComponent(state.activeRoom.roomId)}`);
      setStatus('homeStatus', t('ready'), true);
      render();
    } catch (e) {
      setStatus('homeStatus', e.message);
    }
  });

  document.querySelector('[data-act="readyRoom"]')?.addEventListener('click', async () => {
    if (!requireRoom()) return;
    try {
      state.activeRoom = await callApi(`/rooms/${encodeURIComponent(state.activeRoom.roomId)}/ready`, {
        method: 'POST',
      });
      setStatus('homeStatus', t('ready'), true);
      render();
    } catch (e) {
      setStatus('homeStatus', e.message);
    }
  });

  document.querySelector('[data-act="startGame"]')?.addEventListener('click', async () => {
    if (!requireRoom()) return;
    try {
      state.activeRoom = await callApi(`/rooms/${encodeURIComponent(state.activeRoom.roomId)}/start`, {
        method: 'POST',
      });
      setStatus('homeStatus', t('ready'), true);
      render();
    } catch (e) {
      setStatus('homeStatus', e.message);
    }
  });

  document.querySelector('[data-act="leaveRoom"]')?.addEventListener('click', async () => {
    if (!requireRoom()) return;
    try {
      await callApi(`/rooms/${encodeURIComponent(state.activeRoom.roomId)}/leave`, {
        method: 'POST',
      });
      state.activeRoom = null;
      setStatus('homeStatus', t('ready'), true);
      render();
    } catch (e) {
      setStatus('homeStatus', e.message);
    }
  });
};

export const bindProfileEvents = (render) => {
  document.querySelector('[data-act="saveProfile"]')?.addEventListener('click', async () => {
    try {
      const username = safeTextValue('#profileUsername', 64);
      const payload = { username };
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

  document.querySelector('[data-act="changePassword"]')?.addEventListener('click', async () => {
    try {
      await callApi('/auth/change-password', {
        method: 'POST',
        body: JSON.stringify({
          currentPassword: safeTextValue('#currentPassword', 128),
          newPassword: safeTextValue('#nextPassword', 128),
        }),
      });
      const currentField = document.querySelector('#currentPassword');
      const nextField = document.querySelector('#nextPassword');
      if (currentField) currentField.value = '';
      if (nextField) nextField.value = '';
      setStatus('profileStatus', t('passwordChanged'), true);
    } catch (e) {
      setStatus('profileStatus', e.message);
    }
  });
};

export const bindAdminEvents = () => {
  const output = document.querySelector('#adminOutput');
  if (!output) return;

  document.querySelector('[data-act="loadCards"]')?.addEventListener('click', async () => {
    try {
      const deck = safeTextValue('#adminDeck', 16);
      const data = await callApi(`/admin/cards?deck=${encodeURIComponent(deck)}`);
      output.textContent = JSON.stringify(data, null, 2);
      setStatus('adminStatus', t('cardsLoaded', { deck }), true);
    } catch (e) {
      setStatus('adminStatus', e.message);
    }
  });

  document.querySelector('[data-act="loadEffects"]')?.addEventListener('click', async () => {
    try {
      const data = await callApi('/admin/effects');
      output.textContent = JSON.stringify(data, null, 2);
      setStatus('adminStatus', t('effectsLoaded'), true);
    } catch (e) {
      setStatus('adminStatus', e.message);
    }
  });

  document.querySelector('[data-act="patchCard"]')?.addEventListener('click', async () => {
    try {
      const deck = safeTextValue('#adminDeck', 16);
      const cardCode = safeTextValue('#adminCardCode', 64);
      const payload = {
        name: safeTextValue('#adminCardName', 64),
        text: safeTextValue('#adminCardText', 512),
        enabled: Boolean(document.querySelector('#adminEnabled')?.checked),
      };
      const value = safeTextValue('#adminCardValue', 16);
      const effectKey = safeTextValue('#adminEffectKey', 64);
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

export const bindDebugEvents = () => {
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
  if (!ui.apiBase || !ui.wsUrl || !ui.checkHealth || !ui.wsConnect) return;

  ui.checkHealth.addEventListener('click', async () => {
    try {
      state.apiBase = parseSafeUrl(ui.apiBase.value, ['http:', 'https:']);
      const data = await callApi('/health');
      setStatus('healthStatus', `OK: ${JSON.stringify(data)}`, true);
    } catch (error) {
      setStatus('healthStatus', `${t('healthError')}: ${error.message}`);
    }
  });

  ui.wsConnect.addEventListener('click', () => {
    try {
      state.wsUrl = parseSafeUrl(ui.wsUrl.value, ['ws:', 'wss:']);
    } catch (error) {
      setStatus('wsStatus', error.message);
      return;
    }

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

  ui.subscribeRoom?.addEventListener('click', () => {
    if (!state.socket || state.socket.readyState !== WebSocket.OPEN) return logDebug(t('connectSocketFirst'));
    state.socket.send(JSON.stringify({ type: 'subscribe_room', roomId: safeTextValue('#roomId', 64) }));
  });

  ui.sendPing?.addEventListener('click', () => {
    if (!state.socket || state.socket.readyState !== WebSocket.OPEN) return logDebug(t('connectSocketFirst'));
    state.socket.send(JSON.stringify({ type: 'ping' }));
  });

  ui.sendEvent?.addEventListener('click', () => {
    if (!state.socket || state.socket.readyState !== WebSocket.OPEN) return logDebug(t('connectSocketFirst'));
    state.socket.send(JSON.stringify({
      type: 'room_event',
      roomId: safeTextValue('#roomId', 64),
      event: safeTextValue('#eventName', 128),
      data: { source: 'frontend' },
    }));
  });
};
