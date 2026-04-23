import { callApi } from './api';
import { t } from './i18n';
import { safeTextValue } from './security';
import { state } from './state';

const LOBBIES_TOPIC = '__lobbies__';

export const setStatus = (id, message, ok = false) => {
  const el = document.querySelector(`#${id}`);
  if (!el) return;
  el.textContent = message;
  el.classList.toggle('ok', ok);
};

const showToast = (message, type = 'error') => {
  const container = document.querySelector('#toastContainer');
  if (!container || !message) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.prepend(toast);
  window.setTimeout(() => toast.remove(), 4200);
};

const persistActiveRoom = (room) => {
  const roomId = room?.roomId || '';
  if (roomId) {
    localStorage.setItem('stories_active_room_id', roomId);
  } else {
    localStorage.removeItem('stories_active_room_id');
  }
};

const showApiError = (statusId, error) => {
  const message = error?.message || t('unknownError');
  setStatus(statusId, message);
  showToast(message);
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
  state.socket.send(JSON.stringify({
    ...payload,
    token: state.token || undefined,
  }));
};

const emitLobbiesChanged = (event, data = {}) => {
  sendSocketMessage({
    type: 'lobbies_event',
    event,
    data,
  });
};

const pushRoomChatMessage = (message) => {
  state.roomChatMessages = [
    ...state.roomChatMessages,
    {
      timestamp: Date.now(),
      ...message,
    },
  ].slice(-100);
};

const syncChatScroll = () => {
  const container = document.querySelector('#roomChatLog');
  if (!container) return;
  window.requestAnimationFrame(() => {
    container.scrollTop = container.scrollHeight;
  });
};

const systemPresenceText = (payload) => {
  const username = payload?.username || t('systemUnknownUser');
  if (payload?.event === 'room_settings_updated') {
    return t('roomUpdatedSystem');
  }
  if (payload?.event === 'room_ownership_transferred') {
    return t('ownershipTransferredSystem', { username });
  }
  if (payload?.event === 'room_participant_kicked') {
    return t('participantKickedSystem', { username });
  }
  if (payload?.event === 'room_participant_banned') {
    return t('participantBannedSystem', { username });
  }
  if (payload?.event === 'joined') {
    return t('systemJoinedRoom', { username });
  }
  if (payload?.event === 'left') {
    return t('systemLeftRoom', { username });
  }

  return payload?.message || '';
};

const pushSystemRoomEvent = (event, payload = {}) => {
  pushRoomChatMessage({
    username: t('roleSystem'),
    role: 'system',
    text: systemPresenceText({ event, ...payload }),
    timestamp: payload?.timestamp || Date.now(),
  });
};

const subscribeRoomSocket = (roomId) => {
  if (!roomId) return;
  sendSocketMessage({ type: 'subscribe_room', roomId });
};

const resetRoomUiState = () => {
  state.roomChatMessages = [];
  state.roomNoticeMessage = '';
  state.roomStatusMessage = '';
  state.roomSettingsOpen = false;
};

const clearActiveRoomState = () => {
  state.activeRoom = null;
  persistActiveRoom(null);
  state.roomStatusMessage = '';
  state.roomSettingsOpen = false;
};

const activateRoomState = (room, { resetChat = true } = {}) => {
  state.activeRoom = room;
  persistActiveRoom(room);
  subscribeRoomSocket(room.roomId);
  if (resetChat) {
    state.roomChatMessages = [];
  }
  state.roomNoticeMessage = '';
  state.roomStatusMessage = '';
  state.activeTab = 'roomManage';
};

const isSameActiveRoom = (roomId) => Boolean(roomId && state.activeRoom?.roomId === roomId);

const returnToCurrentRoom = (render) => {
  state.roomModalOpen = false;
  state.joinLobbyModalOpen = false;
  state.roomSwitchPromptOpen = false;
  state.activeTab = 'roomManage';
  render();
};

const closeRoomSwitchPrompt = (render, shouldRender = true) => {
  state.roomSwitchPromptOpen = false;
  state.roomSwitchPromptMode = 'leave';
  state.roomSwitchTargetLabel = '';
  state.pendingJoinAction = null;
  if (shouldRender) render();
};

const openRoomSwitchPrompt = (render, pendingJoinAction) => {
  state.pendingJoinAction = pendingJoinAction;
  state.roomSwitchPromptMode = state.activeRoom?.ownerId === state.user?.id ? 'close' : 'leave';
  state.roomSwitchTargetLabel = pendingJoinAction.targetLabel || '';
  state.roomSwitchPromptOpen = true;
  render();
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
      const changedUserId = payload?.data?.userId;
      const changedUsername = payload?.data?.username || payload?.username || t('systemUnknownUser');
      if (
        changedRoomId
        && state.activeRoom?.roomId === changedRoomId
        && changedUserId
        && state.user?.id === changedUserId
        && (payload?.event === 'room_participant_kicked' || payload?.event === 'room_participant_banned')
      ) {
        clearActiveRoomState();
        state.activeTab = 'home';
        const message = payload?.event === 'room_participant_banned' ? t('blockedNotice') : t('kickedFromRoomNotice');
        state.roomNoticeMessage = message;
        showToast(message);
        render();

        return;
      }

      if (changedRoomId && state.activeRoom?.roomId === changedRoomId) {
        if (
          payload?.event === 'room_settings_updated'
          || payload?.event === 'room_ownership_transferred'
          || payload?.event === 'room_participant_kicked'
          || payload?.event === 'room_participant_banned'
        ) {
          const isOwnEvent = payload?.data?.actorUserId && payload.data.actorUserId === state.user?.id;
          if (!isOwnEvent) {
            pushSystemRoomEvent(payload.event, {
              username: changedUsername,
              timestamp: payload?.timestamp,
            });
          }
        }
        try {
          state.activeRoom = await callApi(`/rooms/${encodeURIComponent(changedRoomId)}`);
          persistActiveRoom(state.activeRoom);
        } catch {
          clearActiveRoomState();
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
      if (payload?.event === 'access_denied') {
        clearActiveRoomState();
        state.activeTab = 'home';
        const message = payload?.data?.reason === 'banned' ? t('blockedNotice') : t('kickedFromRoomNotice');
        state.roomNoticeMessage = message;
        showToast(message);
        render();

        return;
      }

      if (payload?.event === 'chat_message' && payload?.data?.text) {
        pushRoomChatMessage({
          username: payload?.data?.username || payload?.username || 'user',
          role: payload?.data?.role || 'player',
          userId: payload?.userId || null,
          text: payload?.data?.text || '',
          timestamp: payload?.timestamp,
        });
        if (state.activeTab === 'roomManage') {
          render();
          syncChatScroll();
        }
        return;
      }
      try {
        state.activeRoom = await callApi(`/rooms/${encodeURIComponent(payload.roomId)}`);
        persistActiveRoom(state.activeRoom);
        render();
      } catch {
        clearActiveRoomState();
        state.activeTab = 'home';
        state.roomNoticeMessage = t('roomClosedNotice');
        showToast(t('roomClosedNotice'));
        render();
      }
      return;
    }

    if (payload?.type === 'presence' && payload?.roomId && state.activeRoom?.roomId === payload.roomId) {
      if (payload?.event === 'joined' && state.suppressOwnJoinPresence && payload?.username === state.user?.username) {
        state.suppressOwnJoinPresence = false;
        return;
      }
      pushRoomChatMessage({
        username: t('roleSystem'),
        role: 'system',
        text: systemPresenceText(payload),
        timestamp: payload?.timestamp,
      });
      if (state.activeTab === 'roomManage') {
        render();
        syncChatScroll();
      }
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
  state.joinLobbyRoomName = '';
  state.joinLobbyNeedsPassword = false;
  state.joinLobbyPassword = '';
  render();
};

const leaveCurrentRoom = async () => {
  if (!state.activeRoom?.roomId) return;

  const roomId = state.activeRoom.roomId;
  await callApi(`/rooms/${encodeURIComponent(roomId)}/leave`, {
    method: 'POST',
  });
  clearActiveRoomState();
  emitLobbiesChanged('room_left', { roomId, topic: LOBBIES_TOPIC });
};

const executeJoinLobbyRequest = async (render, roomId, ownerUserId, password = '', statusId = 'homeStatus') => {
  try {
    if (isSameActiveRoom(roomId)) {
      returnToCurrentRoom(render);
      return true;
    }

    if (state.user?.id && ownerUserId === state.user.id) {
      const room = await callApi(`/rooms/${encodeURIComponent(roomId)}`);
      activateRoomState(room, { resetChat: false });
    } else {
      const payload = { spectator: false };
      if (password.trim() !== '') payload.password = password.trim();
      const room = await callApi(`/rooms/${encodeURIComponent(roomId)}/join`, {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      activateRoomState(room);
    }
    emitLobbiesChanged('room_joined', { roomId: state.activeRoom.roomId, topic: LOBBIES_TOPIC });
    setStatus(statusId, `${t('roomJoinSuccess')} ${state.activeRoom.roomId}`, true);
    showToast(t('roomJoinSuccess'), 'ok');
    render();
    return true;
  } catch (e) {
    showApiError(statusId, e);
    return false;
  }
};

const executeJoinByCodeRequest = async (render, inviteCode, password, spectator = false, statusId = 'homeStatus') => {
  try {
    const payload = { inviteCode, spectator };
    if (password !== '') payload.password = password;

    const room = await callApi('/rooms/join-by-code', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    activateRoomState(room);
    emitLobbiesChanged('room_joined', { roomId: state.activeRoom.roomId, topic: LOBBIES_TOPIC });
    state.roomModalOpen = false;
    state.homeStatusMessage = `${t('roomJoinSuccess')} ${state.activeRoom.roomId}`;
    render();
    return true;
  } catch (e) {
    state.homeStatusMessage = e.message;
    showApiError(statusId, e);
    return false;
  }
};

const runPendingJoinAction = async (render) => {
  const pending = state.pendingJoinAction;
  if (!pending) return;

  closeRoomSwitchPrompt(render, false);
  if (pending.kind === 'lobby') {
    const ok = await executeJoinLobbyRequest(render, pending.roomId, pending.ownerUserId, pending.password || '', 'joinLobbyStatus');
    if (ok) {
      state.joinLobbyModalOpen = false;
      state.joinLobbyRoomId = '';
      state.joinLobbyOwnerUserId = '';
      state.joinLobbyRoomName = '';
      state.joinLobbyNeedsPassword = false;
    }
    return;
  }

  if (pending.kind === 'invite') {
    await executeJoinByCodeRequest(render, pending.inviteCode, pending.password || '', Boolean(pending.spectator), 'homeStatus');
    return;
  }

  if (pending.kind === 'open_create_modal') {
    openRoomModal(render, 'create');
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
        maxPlayers: Number(safeTextValue('#roomMaxPlayers', 1) || '6'),
      };
      if (password !== '') payload.password = password;

      if (state.activeRoom?.roomId) {
        openRoomSwitchPrompt(render, {
          kind: 'open_create_modal',
          targetLabel: t('createRoom'),
        });
        return;
      }

      const room = await callApi('/rooms', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      activateRoomState(room);
      emitLobbiesChanged('room_created', { roomId: state.activeRoom.roomId, topic: LOBBIES_TOPIC });
      state.roomModalOpen = false;
      state.homeStatusMessage = `${t('roomCreated')} ${state.activeRoom.inviteCode}`;
      render();
    } catch (e) {
      state.homeStatusMessage = e.message;
      showApiError('homeStatus', e);
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
      const spectator = Boolean(document.querySelector('#joinAsSpectator')?.checked);
      if (state.activeRoom?.inviteCode === inviteCode) {
        returnToCurrentRoom(render);
        return;
      }
      if (state.activeRoom?.roomId) {
        openRoomSwitchPrompt(render, {
          kind: 'invite',
          inviteCode,
          password,
          spectator,
          targetLabel: inviteCode,
        });
        return;
      }

      await executeJoinByCodeRequest(render, inviteCode, password, spectator, 'homeStatus');
    } catch (e) {
      state.homeStatusMessage = e.message;
      showApiError('homeStatus', e);
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

  document.querySelectorAll('[data-act="heroCreate"]').forEach((node) => {
    node.addEventListener('click', () => {
      if (!state.user) return openAuth(render, 'login');
      if (state.activeRoom?.roomId) {
        openRoomSwitchPrompt(render, {
          kind: 'open_create_modal',
          targetLabel: t('createRoom'),
        });
        return;
      }
      openRoomModal(render, 'create');
    });
  });

  document.querySelectorAll('[data-act="heroJoin"]').forEach((node) => {
    node.addEventListener('click', () => {
      if (!state.user) return openAuth(render, 'login');
      openRoomModal(render, 'join');
    });
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
    clearActiveRoomState();
    state.authOpen = false;
    state.roomNoticeMessage = '';
    state.roomSwitchPromptOpen = false;
    state.pendingJoinAction = null;
    if (state.socket?.readyState === WebSocket.OPEN) {
      state.socket.close();
    }
    localStorage.removeItem('stories_token');
    render();
  });

  document.querySelectorAll('[data-act="closeRoomModal"]').forEach((node) => {
    node.addEventListener('click', () => closeRoomModal(render));
  });
  document.querySelectorAll('[data-act="closeRoomSettings"]').forEach((node) => {
    node.addEventListener('click', () => {
      state.roomSettingsOpen = false;
      render();
    });
  });
  document.querySelectorAll('[data-act="closeJoinLobbyModal"]').forEach((node) => {
    node.addEventListener('click', () => closeJoinLobbyModal(render));
  });
  document.querySelectorAll('[data-act="closeRoomSwitchModal"], [data-act="cancelRoomSwitch"]').forEach((node) => {
    node.addEventListener('click', () => closeRoomSwitchPrompt(render));
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
    if (state.activeRoom?.roomId && !isSameActiveRoom(state.joinLobbyRoomId)) {
      openRoomSwitchPrompt(render, {
        kind: 'lobby',
        roomId: state.joinLobbyRoomId,
        ownerUserId: state.joinLobbyOwnerUserId,
        password,
        targetLabel: state.joinLobbyRoomName || state.joinLobbyRoomId,
      });
      return;
    }
    const ok = await executeJoinLobbyRequest(render, state.joinLobbyRoomId, state.joinLobbyOwnerUserId, password, 'joinLobbyStatus');
    if (ok) closeJoinLobbyModal(render);
  });
  document.querySelector('[data-act="confirmRoomSwitch"]')?.addEventListener('click', async () => {
    try {
      await leaveCurrentRoom();
      await runPendingJoinAction(render);
    } catch (e) {
      showApiError('roomSwitchStatus', e);
    }
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
      try {
        const currentRoom = await callApi('/rooms/current');
        if (currentRoom?.roomId) {
          state.activeRoom = currentRoom;
          persistActiveRoom(currentRoom);
          state.activeTab = 'roomManage';
          state.suppressOwnJoinPresence = true;
        } else {
          clearActiveRoomState();
        }
      } catch {
        clearActiveRoomState();
      }
      setStatus('authStatus', successMessage, true);
      state.authOpen = false;
      render();
    } catch (error) {
      showApiError('authStatus', error);
    }
  });
};

export const bindHomeEvents = (render) => {
  const hydrateActiveRoom = async () => {
    if (!state.activeRoom?.roomId) return;
    if (state.activeRoom.ownerId && state.activeRoom.inviteCode) return;

    try {
      state.activeRoom = await callApi(`/rooms/${encodeURIComponent(state.activeRoom.roomId)}`);
      persistActiveRoom(state.activeRoom);
      state.suppressOwnJoinPresence = true;
      render();
    } catch (e) {
      showApiError('homeStatus', e);
    }
  };

  void hydrateActiveRoom();

  const requireRoom = () => {
    if (!state.activeRoom?.roomId) {
      setStatus('roomStatus', t('roomNotFound'));
      return false;
    }
    return true;
  };

  document.querySelector('[data-act="readyRoom"]')?.addEventListener('click', async () => {
    if (!requireRoom()) return;
    try {
      const me = (state.activeRoom.participants || []).find((participant) => participant.userId === state.user?.id);
      const nextReady = !(me?.ready ?? false);
      state.activeRoom = await callApi(`/rooms/${encodeURIComponent(state.activeRoom.roomId)}/ready`, {
        method: 'POST',
        body: JSON.stringify({ ready: nextReady }),
      });
      persistActiveRoom(state.activeRoom);
      emitLobbiesChanged('room_ready_changed', { roomId: state.activeRoom.roomId, topic: LOBBIES_TOPIC });
      render();
    } catch (e) {
      showApiError('roomStatus', e);
    }
  });

  document.querySelector('[data-act="leaveRoom"]')?.addEventListener('click', async () => {
    if (!requireRoom()) return;
    try {
      await leaveCurrentRoom();
      state.activeTab = 'home';
      state.roomNoticeMessage = '';
      setStatus('homeStatus', t('ready'), true);
      render();
    } catch (e) {
      showApiError('roomStatus', e);
    }
  });

  document.querySelectorAll('[data-act="joinLobby"]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (!state.user) return openAuth(render, 'login');
      const roomId = btn.dataset.roomId;
      if (!roomId) return;
      if (isSameActiveRoom(roomId)) {
        returnToCurrentRoom(render);
        return;
      }
      const ownerUserId = btn.dataset.roomOwnerId || '';
      const needsPassword = btn.dataset.roomHasPassword === '1';
      state.joinLobbyModalOpen = true;
      state.joinLobbyRoomId = roomId;
      state.joinLobbyRoomName = btn.dataset.roomName || roomId;
      state.joinLobbyOwnerUserId = ownerUserId;
      state.joinLobbyNeedsPassword = needsPassword;
      render();
    });
  });

  document.querySelector('[data-act="openRoomSettings"]')?.addEventListener('click', () => {
    state.roomSettingsOpen = true;
    render();
  });
};

const bindRoomManageEvents = (render) => {
  document.querySelector('[data-act="saveRoomSettings"]')?.addEventListener('click', async () => {
    if (!state.activeRoom?.roomId) return;
    try {
      const isPublic = Boolean(document.querySelector('#manageIsPublic')?.checked);
      const maxPlayers = Number(safeTextValue('#manageMaxPlayers', 1) || '6');
      const password = safeTextValue('#managePassword', 128);
      state.activeRoom = await callApi(`/rooms/${encodeURIComponent(state.activeRoom.roomId)}/settings`, {
        method: 'PATCH',
        body: JSON.stringify({ isPublic, maxPlayers, password }),
      });
      persistActiveRoom(state.activeRoom);
      emitLobbiesChanged('room_settings_updated', {
        roomId: state.activeRoom.roomId,
        topic: LOBBIES_TOPIC,
        actorUserId: state.user?.id,
      });
      pushSystemRoomEvent('room_settings_updated');
      setStatus('roomManageStatus', t('roomSettingsSaved'), true);
      showToast(t('roomSettingsSaved'), 'ok');
      state.roomSettingsOpen = false;
      render();
    } catch (e) {
      showApiError('roomManageStatus', e);
    }
  });

  document.querySelector('[data-act="regenInvite"]')?.addEventListener('click', async () => {
    if (!state.activeRoom?.roomId) return;
    try {
      state.activeRoom = await callApi(`/rooms/${encodeURIComponent(state.activeRoom.roomId)}/invite-code/regenerate`, {
        method: 'POST',
      });
      persistActiveRoom(state.activeRoom);
      emitLobbiesChanged('room_invite_regenerated', { roomId: state.activeRoom.roomId, topic: LOBBIES_TOPIC });
      setStatus('roomManageStatus', '');
      showToast(t('inviteRegenerated'), 'ok');
      render();
    } catch (e) {
      setStatus('roomManageStatus', '');
      showToast(e?.message || t('unknownError'));
    }
  });

  document.querySelectorAll('[data-act="kickParticipant"]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (!state.activeRoom?.roomId) return;
      const userId = btn.dataset.userId;
      if (!userId) return;
      const participant = (state.activeRoom.participants || []).find((item) => item.userId === userId);
      try {
        state.activeRoom = await callApi(`/rooms/${encodeURIComponent(state.activeRoom.roomId)}/participants/${encodeURIComponent(userId)}/kick`, { method: 'POST' });
        persistActiveRoom(state.activeRoom);
        emitLobbiesChanged('room_participant_kicked', {
          roomId: state.activeRoom.roomId,
          userId,
          username: participant?.username || '',
          actorUserId: state.user?.id,
          topic: LOBBIES_TOPIC,
        });
        pushSystemRoomEvent('room_participant_kicked', { username: participant?.username || t('systemUnknownUser') });
        render();
      } catch (e) {
        showApiError('roomManageStatus', e);
      }
    });
  });

  document.querySelectorAll('[data-act="banParticipant"]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (!state.activeRoom?.roomId) return;
      const userId = btn.dataset.userId;
      if (!userId) return;
      const participant = (state.activeRoom.participants || []).find((item) => item.userId === userId);
      try {
        state.activeRoom = await callApi(`/rooms/${encodeURIComponent(state.activeRoom.roomId)}/participants/${encodeURIComponent(userId)}/ban`, { method: 'POST' });
        persistActiveRoom(state.activeRoom);
        emitLobbiesChanged('room_participant_banned', {
          roomId: state.activeRoom.roomId,
          userId,
          username: participant?.username || '',
          actorUserId: state.user?.id,
          topic: LOBBIES_TOPIC,
        });
        pushSystemRoomEvent('room_participant_banned', { username: participant?.username || t('systemUnknownUser') });
        render();
      } catch (e) {
        showApiError('roomManageStatus', e);
      }
    });
  });

  document.querySelectorAll('[data-act="transferOwnership"]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (!state.activeRoom?.roomId) return;
      const userId = btn.dataset.userId;
      if (!userId) return;
      const participant = (state.activeRoom.participants || []).find((item) => item.userId === userId);
      try {
        state.activeRoom = await callApi(`/rooms/${encodeURIComponent(state.activeRoom.roomId)}/participants/${encodeURIComponent(userId)}/transfer-ownership`, { method: 'POST' });
        persistActiveRoom(state.activeRoom);
        emitLobbiesChanged('room_ownership_transferred', {
          roomId: state.activeRoom.roomId,
          userId,
          username: participant?.username || '',
          actorUserId: state.user?.id,
          topic: LOBBIES_TOPIC,
        });
        pushSystemRoomEvent('room_ownership_transferred', { username: participant?.username || t('systemUnknownUser') });
        setStatus('roomManageStatus', t('ownershipTransferred'), true);
        showToast(t('ownershipTransferred'), 'ok');
        render();
      } catch (e) {
        showApiError('roomManageStatus', e);
      }
    });
  });

  document.querySelector('[data-act="sendRoomChat"]')?.addEventListener('click', () => {
    const text = safeTextValue('#roomChatInput', 512);
    if (!state.activeRoom?.roomId || text === '') return;
    state.roomChatInputShouldFocus = true;
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
    if (input) {
      input.value = '';
      input.focus();
    }
  });

  document.querySelector('#roomChatInput')?.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' || event.shiftKey) return;
    event.preventDefault();
    document.querySelector('[data-act="sendRoomChat"]')?.click();
  });
};

export const bindLobbyEvents = (render) => {
  const loadLobbies = async () => {
    try {
      state.lobbyCatalog = (await callApi(
        `/lobbies?visibility=public&password=${encodeURIComponent(state.lobbyFilters.password)}&limit=${state.lobbyFilters.limit}`
      )).items || [];
      setStatus('lobbyStatus', t('ready'), true);
      render();
    } catch (e) {
      showApiError('lobbyStatus', e);
    }
  };

  document.querySelector('[data-act="loadLobbies"]')?.addEventListener('click', async () => {
    state.lobbyFilters.password = safeTextValue('#lobbyPasswordFilter', 20) || 'all';
    state.lobbyFilters.limit = Number(safeTextValue('#lobbyLimit', 3) || '20');
    await loadLobbies();
  });

  document.querySelectorAll('[data-act="joinLobby"]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (!state.user) return openAuth(render, 'login');
      const roomId = btn.dataset.roomId;
      if (!roomId) return;
      if (isSameActiveRoom(roomId)) {
        returnToCurrentRoom(render);
        return;
      }
      const ownerUserId = btn.dataset.roomOwnerId || '';
      const needsPassword = btn.dataset.roomHasPassword === '1';
      state.joinLobbyModalOpen = true;
      state.joinLobbyRoomId = roomId;
      state.joinLobbyRoomName = btn.dataset.roomName || roomId;
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
        if (isSameActiveRoom(roomId)) {
          returnToCurrentRoom(render);
          return;
        }
        const room = await callApi(`/rooms/${encodeURIComponent(roomId)}`);
        activateRoomState(room, { resetChat: false });
        render();
      } catch (e) {
        showApiError('profileStatus', e);
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
      showApiError('profileStatus', e);
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
      showApiError('profileStatus', e);
    }
  });
};

export const bindRoomManagePageEvents = (render) => {
  bindHomeEvents(render);
  bindRoomManageEvents(render);
};
