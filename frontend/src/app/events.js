import { callApi } from './api';
import { t } from './i18n';
import { parseSafeUrl, safeTextValue } from './security';
import { state } from './state';

const LOBBIES_TOPIC = '__lobbies__';

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

const showToast = (message, type = 'error') => {
  const container = document.querySelector('#toastContainer');
  if (!container || !message) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.append(toast);
  window.setTimeout(() => toast.remove(), 3500);
};

const clearFieldError = (selector) => {
  const field = document.querySelector(selector);
  if (!field) return;
  field.classList.remove('input-error');
  field.removeAttribute('aria-invalid');
};

const markFieldError = (selector, message) => {
  const field = document.querySelector(selector);
  if (!field) return;
  field.classList.add('input-error');
  field.setAttribute('aria-invalid', 'true');
  field.focus();
  showToast(message);
};

const sendSocketMessage = (payload) => {
  if (!state.socket || state.socket.readyState !== WebSocket.OPEN) return;
  state.socket.send(JSON.stringify(payload));
};

const emitLobbiesChanged = (event, data = {}) => {
  sendSocketMessage({
    type: 'lobbies_event',
    event,
    data,
  });
};

const subscribeRoomSocket = (roomId) => {
  if (!roomId) return;
  sendSocketMessage({ type: 'subscribe_room', roomId });
};

export const ensureLobbyRealtime = (refreshLobbies, render) => {
  if (state.socket?.readyState === WebSocket.OPEN || state.socket?.readyState === WebSocket.CONNECTING) return;

  state.socket = new WebSocket(state.wsUrl);

  state.socket.onopen = () => {
    sendSocketMessage({ type: 'subscribe_lobbies' });
    if (state.activeRoom?.roomId) {
      subscribeRoomSocket(state.activeRoom.roomId);
    }
  };

  state.socket.onmessage = async (event) => {
    let payload;
    try {
      payload = JSON.parse(event.data);
    } catch {
      return;
    }

    if (payload?.type === 'lobbies_event') {
      await refreshLobbies();

      const changedRoomId = payload?.data?.roomId;
      if (changedRoomId && state.activeRoom?.roomId === changedRoomId) {
        try {
          state.activeRoom = await callApi(`/rooms/${encodeURIComponent(changedRoomId)}`);
        } catch {
          state.activeRoom = null;
          state.activeTab = 'home';
          state.roomNoticeMessage = t('roomClosedNotice');
          showToast(t('roomClosedNotice'));
        }
      }

      if (state.activeTab === 'home' || state.activeTab === 'lobbies' || state.activeTab === 'profile' || state.activeTab === 'roomManage') {
        render();
      }
      return;
    }

    if (payload?.type === 'room_event' && payload?.roomId && state.activeRoom?.roomId === payload.roomId) {
      if (payload?.event === 'chat_message' && payload?.data?.text) {
        state.roomChatMessages = [
          ...state.roomChatMessages,
          {
            username: payload?.data?.username || 'user',
            role: payload?.data?.role || 'player',
            text: payload?.data?.text || '',
          },
        ].slice(-100);
        if (state.activeTab === 'roomManage') render();
        return;
      }
      try {
        state.activeRoom = await callApi(`/rooms/${encodeURIComponent(payload.roomId)}`);
        render();
      } catch {
        state.activeRoom = null;
        state.activeTab = 'home';
        state.roomNoticeMessage = t('roomClosedNotice');
        showToast(t('roomClosedNotice'));
        render();
      }
      return;
    }

    if (payload?.type === 'presence' && payload?.roomId && state.activeRoom?.roomId === payload.roomId) {
      state.roomChatMessages = [
        ...state.roomChatMessages,
        { username: t('roleSystem'), role: 'system', text: payload?.message || '' },
      ].slice(-100);
      if (state.activeTab === 'roomManage') render();
    }
  };

  state.socket.onclose = () => {
    state.socket = null;
    window.setTimeout(() => ensureLobbyRealtime(refreshLobbies, render), 3000);
  };
};

const openAuth = (render, mode = 'login') => {
  state.authOpen = true;
  state.authMode = mode;
  render();
};

const openRoomModal = (render, mode = 'create') => {
  state.roomModalOpen = true;
  state.roomModalMode = mode;
  state.homeStatusMessage = '';
  render();
};

const closeRoomModal = (render) => {
  state.roomModalOpen = false;
  render();
};

const closeJoinLobbyModal = (render) => {
  state.joinLobbyModalOpen = false;
  state.joinLobbyRoomId = '';
  state.joinLobbyOwnerUserId = '';
  state.joinLobbyNeedsPassword = false;
  state.joinLobbyPassword = '';
  render();
};

const joinLobbyRequest = async (render, roomId, ownerUserId, password = '') => {
  try {
    if (state.user?.id && ownerUserId === state.user.id) {
      state.activeRoom = await callApi(`/rooms/${encodeURIComponent(roomId)}`);
    } else {
      const payload = { spectator: false };
      if (password.trim() !== '') payload.password = password.trim();
      state.activeRoom = await callApi(`/rooms/${encodeURIComponent(roomId)}/join`, {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    }
    subscribeRoomSocket(state.activeRoom.roomId);
    emitLobbiesChanged('room_joined', { roomId: state.activeRoom.roomId, topic: LOBBIES_TOPIC });
    state.activeTab = 'roomManage';
    setStatus('homeStatus', `${t('roomJoinSuccess')} ${state.activeRoom.roomId}`, true);
    state.roomChatMessages = [];
    state.roomNoticeMessage = '';
    showToast(t('roomJoinSuccess'), 'ok');
    render();
    return true;
  } catch (e) {
    setStatus('homeStatus', e.message);
    showToast(e.message);
    return false;
  }
};

const bindRoomModalEvents = (render) => {
  document.querySelector('[data-act="createRoom"]')?.addEventListener('click', async () => {
    if (!state.user) return openAuth(render, 'login');
    clearFieldError('#roomName');

    try {
      const name = safeTextValue('#roomName', 64);
      if (name === '') {
        markFieldError('#roomName', t('requiredField'));
        return;
      }
      const password = safeTextValue('#roomPassword', 128);
      const payload = {
        name,
        isPublic: Boolean(document.querySelector('#roomIsPublic')?.checked),
      };
      if (password !== '') payload.password = password;

      state.activeRoom = await callApi('/rooms', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      subscribeRoomSocket(state.activeRoom.roomId);
      state.roomChatMessages = [];
      state.roomNoticeMessage = '';
      emitLobbiesChanged('room_created', { roomId: state.activeRoom.roomId, topic: LOBBIES_TOPIC });
      state.roomModalOpen = false;
      state.activeTab = 'roomManage';
      state.homeStatusMessage = `${t('roomCreated')} ${state.activeRoom.inviteCode}`;
      render();
    } catch (e) {
      state.homeStatusMessage = e.message;
      setStatus('homeStatus', e.message);
      showToast(e.message);
    }
  });

  document.querySelector('[data-act="joinByCode"]')?.addEventListener('click', async () => {
    if (!state.user) return openAuth(render, 'login');
    clearFieldError('#inviteCode');

    try {
      const inviteCode = safeTextValue('#inviteCode', 6).toUpperCase();
      if (inviteCode.length !== 6) {
        markFieldError('#inviteCode', t('inviteCodeInvalid'));
        return;
      }
      const password = safeTextValue('#joinPassword', 128);
      const payload = {
        inviteCode,
        spectator: Boolean(document.querySelector('#joinAsSpectator')?.checked),
      };
      if (password !== '') payload.password = password;

      state.activeRoom = await callApi('/rooms/join-by-code', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      subscribeRoomSocket(state.activeRoom.roomId);
      state.roomChatMessages = [];
      state.roomNoticeMessage = '';
      emitLobbiesChanged('room_joined', { roomId: state.activeRoom.roomId, topic: LOBBIES_TOPIC });
      state.roomModalOpen = false;
      state.activeTab = 'roomManage';
      state.homeStatusMessage = `${t('roomJoinSuccess')} ${state.activeRoom.roomId}`;
      render();
    } catch (e) {
      state.homeStatusMessage = e.message;
      setStatus('homeStatus', e.message);
      showToast(e.message);
    }
  });
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

  document.querySelector('[data-act="toggleAuth"]')?.addEventListener('click', () => openAuth(render, 'login'));

  document.querySelector('[data-act="heroCreate"]')?.addEventListener('click', () => {
    if (!state.user) return openAuth(render, 'login');
    openRoomModal(render, 'create');
  });

  document.querySelector('[data-act="heroJoin"]')?.addEventListener('click', () => {
    if (!state.user) return openAuth(render, 'login');
    openRoomModal(render, 'join');
  });

  document.querySelectorAll('[data-act="closeAuth"]').forEach((node) => {
    node.addEventListener('click', () => {
      state.authOpen = false;
      render();
    });
  });


  document.querySelector('[data-act="closeRoomNotice"]')?.addEventListener('click', () => {
    state.roomNoticeMessage = '';
    render();
  });
  document.querySelector('[data-act="logout"]')?.addEventListener('click', () => {
    state.token = '';
    state.user = null;
    state.activeRoom = null;
    state.authOpen = false;
    state.roomNoticeMessage = '';
    localStorage.removeItem('stories_token');
    render();
  });

  document.querySelectorAll('[data-act="closeRoomModal"]').forEach((node) => {
    node.addEventListener('click', () => closeRoomModal(render));
  });
  document.querySelectorAll('[data-act="closeJoinLobbyModal"]').forEach((node) => {
    node.addEventListener('click', () => closeJoinLobbyModal(render));
  });
  document.querySelector('[data-act="confirmJoinLobby"]')?.addEventListener('click', async () => {
    if (!state.joinLobbyRoomId) return;
    clearFieldError('#lobbyJoinPassword');
    const password = safeTextValue('#lobbyJoinPassword', 128);
    if (state.joinLobbyNeedsPassword && password === '') {
      markFieldError('#lobbyJoinPassword', t('requiredField'));
      setStatus('joinLobbyStatus', t('requiredField'));
      return;
    }
    const ok = await joinLobbyRequest(render, state.joinLobbyRoomId, state.joinLobbyOwnerUserId, password);
    if (ok) closeJoinLobbyModal(render);
  });

  if (state.roomModalOpen && state.user) {
    bindRoomModalEvents(render);
  }
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
  const hydrateActiveRoom = async () => {
    if (!state.activeRoom?.roomId) return;
    if (state.activeRoom.ownerId && state.activeRoom.inviteCode) return;

    try {
      state.activeRoom = await callApi(`/rooms/${encodeURIComponent(state.activeRoom.roomId)}`);
      render();
    } catch (e) {
      setStatus('homeStatus', e.message);
    }
  };

  void hydrateActiveRoom();

  const requireRoom = () => {
    if (!state.activeRoom?.roomId) {
      setStatus('homeStatus', t('roomNotFound'));
      return false;
    }
    return true;
  };

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
      const me = (state.activeRoom.participants || []).find((participant) => participant.userId === state.user?.id);
      const nextReady = !(me?.ready ?? false);
      state.activeRoom = await callApi(`/rooms/${encodeURIComponent(state.activeRoom.roomId)}/ready`, {
        method: 'POST',
        body: JSON.stringify({ ready: nextReady }),
      });
      emitLobbiesChanged('room_ready_changed', { roomId: state.activeRoom.roomId, topic: LOBBIES_TOPIC });
      setStatus('homeStatus', nextReady ? t('statusReady') : t('statusNotReady'), true);
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
      emitLobbiesChanged('room_started', { roomId: state.activeRoom.roomId, topic: LOBBIES_TOPIC });
      setStatus('homeStatus', t('ready'), true);
      render();
    } catch (e) {
      setStatus('homeStatus', e.message);
    }
  });

  document.querySelector('[data-act="leaveRoom"]')?.addEventListener('click', async () => {
    if (!requireRoom()) return;
    try {
      const roomId = state.activeRoom.roomId;
      await callApi(`/rooms/${encodeURIComponent(state.activeRoom.roomId)}/leave`, {
        method: 'POST',
      });
      state.activeRoom = null;
      state.activeTab = 'home';
      state.roomNoticeMessage = '';
      emitLobbiesChanged('room_left', { roomId, topic: LOBBIES_TOPIC });
      setStatus('homeStatus', t('ready'), true);
      render();
    } catch (e) {
      setStatus('homeStatus', e.message);
    }
  });

  document.querySelectorAll('[data-act="joinLobby"]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (!state.user) return openAuth(render, 'login');
      const roomId = btn.dataset.roomId;
      if (!roomId) return;
      const ownerUserId = btn.dataset.roomOwnerId || '';
      const needsPassword = btn.dataset.roomHasPassword === '1';
      if (state.user?.id && ownerUserId === state.user.id) {
        await joinLobbyRequest(render, roomId, ownerUserId);
        return;
      }
      state.joinLobbyModalOpen = true;
      state.joinLobbyRoomId = roomId;
      state.joinLobbyOwnerUserId = ownerUserId;
      state.joinLobbyNeedsPassword = needsPassword;
      render();
    });
  });
};

const bindRoomManageEvents = (render) => {
  document.querySelector('[data-act="saveRoomSettings"]')?.addEventListener('click', async () => {
    if (!state.activeRoom?.roomId) return;
    try {
      const isPublic = Boolean(document.querySelector('#manageIsPublic')?.checked);
      const password = safeTextValue('#managePassword', 128);
      state.activeRoom = await callApi(`/rooms/${encodeURIComponent(state.activeRoom.roomId)}/settings`, {
        method: 'PATCH',
        body: JSON.stringify({ isPublic, password }),
      });
      emitLobbiesChanged('room_settings_updated', { roomId: state.activeRoom.roomId, topic: LOBBIES_TOPIC });
      setStatus('roomManageStatus', t('roomSettingsSaved'), true);
      showToast(t('roomSettingsSaved'), 'ok');
      render();
    } catch (e) {
      setStatus('roomManageStatus', e.message);
      showToast(e.message);
    }
  });

  document.querySelector('[data-act="regenInvite"]')?.addEventListener('click', async () => {
    if (!state.activeRoom?.roomId) return;
    try {
      state.activeRoom = await callApi(`/rooms/${encodeURIComponent(state.activeRoom.roomId)}/invite-code/regenerate`, {
        method: 'POST',
      });
      emitLobbiesChanged('room_invite_regenerated', { roomId: state.activeRoom.roomId, topic: LOBBIES_TOPIC });
      setStatus('roomManageStatus', t('inviteRegenerated'), true);
      showToast(t('inviteRegenerated'), 'ok');
      render();
    } catch (e) {
      setStatus('roomManageStatus', e.message);
      showToast(e.message);
    }
  });

  document.querySelectorAll('[data-act="kickParticipant"]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (!state.activeRoom?.roomId) return;
      const userId = btn.dataset.userId;
      if (!userId) return;
      try {
        state.activeRoom = await callApi(`/rooms/${encodeURIComponent(state.activeRoom.roomId)}/participants/${encodeURIComponent(userId)}/kick`, { method: 'POST' });
        emitLobbiesChanged('room_participant_kicked', { roomId: state.activeRoom.roomId, userId, topic: LOBBIES_TOPIC });
        render();
      } catch (e) {
        setStatus('roomManageStatus', e.message);
        showToast(e.message);
      }
    });
  });

  document.querySelectorAll('[data-act="banParticipant"]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (!state.activeRoom?.roomId) return;
      const userId = btn.dataset.userId;
      if (!userId) return;
      try {
        state.activeRoom = await callApi(`/rooms/${encodeURIComponent(state.activeRoom.roomId)}/participants/${encodeURIComponent(userId)}/ban`, { method: 'POST' });
        emitLobbiesChanged('room_participant_banned', { roomId: state.activeRoom.roomId, userId, topic: LOBBIES_TOPIC });
        render();
      } catch (e) {
        setStatus('roomManageStatus', e.message);
        showToast(e.message);
      }
    });
  });

  document.querySelector('[data-act="sendRoomChat"]')?.addEventListener('click', () => {
    const text = safeTextValue('#roomChatInput', 512);
    if (!state.activeRoom?.roomId || text === '') return;
    sendSocketMessage({
      type: 'room_event',
      roomId: state.activeRoom.roomId,
      event: 'chat_message',
      data: {
        text,
        username: state.user?.username || 'user',
        role: (state.activeRoom.participants || []).find((participant) => participant.userId === state.user?.id)?.role || 'player',
      },
    });
    const input = document.querySelector('#roomChatInput');
    if (input) input.value = '';
  });
};

export const bindLobbyEvents = (render) => {
  const loadLobbies = async () => {
    try {
      state.lobbyCatalog = (await callApi(
        `/lobbies?visibility=${encodeURIComponent(state.lobbyFilters.visibility)}&password=${encodeURIComponent(state.lobbyFilters.password)}&limit=${state.lobbyFilters.limit}`
      )).items || [];
      setStatus('lobbyStatus', t('ready'), true);
      render();
    } catch (e) {
      setStatus('lobbyStatus', e.message);
    }
  };

  document.querySelector('[data-act="loadLobbies"]')?.addEventListener('click', async () => {
    state.lobbyFilters.visibility = safeTextValue('#lobbyVisibility', 16) || 'all';
    state.lobbyFilters.password = safeTextValue('#lobbyPasswordFilter', 20) || 'all';
    state.lobbyFilters.limit = Number(safeTextValue('#lobbyLimit', 3) || '20');
    await loadLobbies();
  });

  document.querySelectorAll('[data-act="joinLobby"]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (!state.user) return openAuth(render, 'login');
      const roomId = btn.dataset.roomId;
      if (!roomId) return;
      const ownerUserId = btn.dataset.roomOwnerId || '';
      const needsPassword = btn.dataset.roomHasPassword === '1';
      if (state.user?.id && ownerUserId === state.user.id) {
        await joinLobbyRequest(render, roomId, ownerUserId);
        return;
      }
      state.joinLobbyModalOpen = true;
      state.joinLobbyRoomId = roomId;
      state.joinLobbyOwnerUserId = ownerUserId;
      state.joinLobbyNeedsPassword = needsPassword;
      render();
    });
  });
};

export const bindProfileEvents = (render) => {
  document.querySelectorAll('[data-act="openOwnedRoom"]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      try {
        const roomId = btn.dataset.roomId;
        if (!roomId) return;
        state.activeRoom = await callApi(`/rooms/${encodeURIComponent(roomId)}`);
        state.activeTab = 'roomManage';
        state.roomNoticeMessage = '';
        render();
      } catch (e) {
        setStatus('profileStatus', e.message);
      }
    });
  });

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

export const bindRoomManagePageEvents = (render) => {
  bindHomeEvents(render);
  bindRoomManageEvents(render);
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
      sendSocketMessage({ type: 'subscribe_lobbies' });
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
