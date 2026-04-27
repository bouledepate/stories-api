import { callApi } from '../../api';
import { t } from '../../i18n';
import { safeTextValue } from '../../security';
import { state } from '../../state';
import { loadLobbies } from '../../bootstrap/session';
import { clearFieldError, markFieldError, setStatus, showApiError, showToast } from '../../services/feedback';
import { emitLobbiesChanged, sendSocketMessage, subscribeRoomSocket } from '../../services/socket';
import {
  appendRoomChatMessage,
  clearActiveMatch,
  clearActiveRoom,
  resetJoinLobbyModalState,
  resetRoomChatMessages,
  resetRoomSwitchPromptState,
  setActiveRoom,
  setActiveTab,
  setHomeStatusMessage,
  setJoinLobbyModalState,
  setRoomChatMessages,
  setRoomChatInputShouldFocus,
  setRoomModalState,
  setRoomNoticeMessage,
  setRoomSettingsOpen,
  setRoomStatusMessage,
  setRoomSwitchPromptState,
  setSuppressOwnJoinPresence,
} from '../../store/mutations';
import { getMyParticipant, isRoomOwner, isSameActiveRoom } from '../../store/selectors';
import { openAuth } from '../common/ui-state';
import { activateMatch, fetchAndActivateMatch, fetchRoomMatch, shouldOpenMatchView, startMatchFromRoom } from '../game/game-flow';

export const pushRoomChatMessage = (message) => {
  appendRoomChatMessage(message);
};

const collapseTransientPresencePair = (event, payload, message) => {
  const messages = Array.isArray(state.roomChatMessages) ? state.roomChatMessages : [];
  const last = messages[messages.length - 1] || null;
  if (
    !last
    || last.role !== 'system'
    || message.role !== 'system'
    || typeof last.text !== 'string'
    || typeof message.text !== 'string'
    || Math.abs(Number(message.timestamp || 0) - Number(last.timestamp || 0)) > 8000
  ) {
    appendRoomChatMessage(message);
    return;
  }

  const presenceUsername = payload?.username || t('systemUnknownUser');
  const joinedText = t('systemJoinedRoom', { username: presenceUsername });
  const leftText = t('systemLeftRoom', { username: presenceUsername });
  const isOppositePresencePair = (
    (last.text === joinedText && message.text === leftText)
    || (last.text === leftText && message.text === joinedText)
  );

  if (isOppositePresencePair) {
    setRoomChatMessages(messages.slice(0, -1));
    return;
  }

  appendRoomChatMessage(message);
};

export const syncChatScroll = () => {
  const container = document.querySelector('#roomChatLog');
  if (!container) return;
  window.requestAnimationFrame(() => {
    container.scrollTop = container.scrollHeight;
  });
};

export const systemPresenceText = (payload) => {
  const username = payload?.username || t('systemUnknownUser');
  if (payload?.event === 'room_settings_updated') return t('roomUpdatedSystem');
  if (payload?.event === 'room_ownership_transferred') return t('ownershipTransferredSystem', { username });
  if (payload?.event === 'room_participant_kicked') return t('participantKickedSystem', { username });
  if (payload?.event === 'room_participant_banned') return t('participantBannedSystem', { username });
  if (payload?.event === 'joined') return t('systemJoinedRoom', { username });
  if (payload?.event === 'left') return t('systemLeftRoom', { username });

  return payload?.message || '';
};

export const pushSystemRoomEvent = (event, payload = {}) => {
  const message = {
    username: t('roleSystem'),
    role: 'system',
    text: systemPresenceText({ event, ...payload }),
    timestamp: payload?.timestamp || Date.now(),
  };

  if (event === 'joined' || event === 'left') {
    collapseTransientPresencePair(event, payload, message);
    return;
  }

  appendRoomChatMessage(message);
};

export const clearActiveRoomState = () => {
  clearActiveRoom();
  clearActiveMatch();
  setRoomStatusMessage('');
  setRoomSettingsOpen(false);
};

export const activateRoomState = (room, { resetChat = true } = {}) => {
  clearActiveMatch();
  setActiveRoom(room);
  subscribeRoomSocket(room.roomId);
  if (resetChat) {
    resetRoomChatMessages();
  }
  setRoomNoticeMessage('');
  setRoomStatusMessage('');
  setActiveTab('roomManage');
};

export const returnToCurrentRoom = (render) => {
  setRoomModalState({ open: false });
  resetJoinLobbyModalState();
  resetRoomSwitchPromptState();
  setActiveTab('roomManage');
  render();
};

export const closeRoomSwitchPrompt = (render, shouldRender = true) => {
  resetRoomSwitchPromptState();
  if (shouldRender) render();
};

export const openRoomSwitchPrompt = (render, pendingJoinAction) => {
  setRoomSwitchPromptState({
    pendingJoinAction,
    mode: isRoomOwner() ? 'close' : 'leave',
    targetLabel: pendingJoinAction.targetLabel || '',
    open: true,
  });
  render();
};

export const openRoomModal = (render, mode = 'create') => {
  setRoomModalState({ open: true, mode });
  setHomeStatusMessage('');
  render();
};

export const closeRoomModal = (render) => {
  setRoomModalState({ open: false });
  render();
};

export const openJoinLobbyModal = (render, { roomId, roomName, ownerUserId, needsPassword }) => {
  setJoinLobbyModalState({
    open: true,
    roomId,
    roomName,
    ownerUserId,
    needsPassword,
    spectator: false,
  });
  render();
};

export const closeJoinLobbyModal = (render) => {
  resetJoinLobbyModalState();
  render();
};

export const leaveCurrentRoom = async () => {
  if (!state.activeRoom?.roomId) return;

  const roomId = state.activeRoom.roomId;
  const matchId = state.activeMatch?.matchId || null;
  await callApi(`/rooms/${encodeURIComponent(roomId)}/leave`, {
    method: 'POST',
  });
  if (matchId) {
    sendSocketMessage({
      type: 'room_event',
      roomId,
      event: 'match_state_updated',
      data: { matchId },
    });
  }
  clearActiveRoomState();
  emitLobbiesChanged('room_left', { roomId, ...(matchId ? { matchId } : {}) });
  await loadLobbies('home', 4, state.lobbyFilters.password);
  await loadLobbies('catalog', state.lobbyFilters.limit, state.lobbyFilters.password);
};

export const executeJoinLobbyRequest = async (render, roomId, ownerUserId, password = '', spectator = false, statusId = 'homeStatus') => {
  try {
    if (isSameActiveRoom(roomId)) {
      returnToCurrentRoom(render);
      return true;
    }

    if (state.user?.id && ownerUserId === state.user.id) {
      const room = await callApi(`/rooms/${encodeURIComponent(roomId)}`);
      activateRoomState(room, { resetChat: false });
    } else {
      const payload = { spectator: Boolean(spectator) };
      if (password.trim() !== '') payload.password = password.trim();
      const room = await callApi(`/rooms/${encodeURIComponent(roomId)}/join`, {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      activateRoomState(room);
    }
    const roomMatch = await fetchRoomMatch(state.activeRoom.roomId).catch(() => null);
    if (roomMatch?.matchId) {
      activateMatch(roomMatch, { withTab: true });
      if (!shouldOpenMatchView(roomMatch)) {
        setActiveTab('roomManage');
      }
    } else {
      clearActiveMatch();
      setActiveTab('roomManage');
    }
    emitLobbiesChanged('room_joined', { roomId: state.activeRoom.roomId });
    setStatus(statusId, `${t('roomJoinSuccess')} ${state.activeRoom.roomId}`, true);
    showToast(t('roomJoinSuccess'), 'ok');
    render();
    return true;
  } catch (e) {
    showApiError(statusId, e);
    return false;
  }
};

export const executeJoinByCodeRequest = async (render, inviteCode, password, spectator = false, statusId = 'homeStatus') => {
  try {
    const payload = { inviteCode, spectator };
    if (password !== '') payload.password = password;

    const room = await callApi('/rooms/join-by-code', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    activateRoomState(room);
    const roomMatch = await fetchRoomMatch(state.activeRoom.roomId).catch(() => null);
    if (roomMatch?.matchId) {
      activateMatch(roomMatch, { withTab: true });
      if (!shouldOpenMatchView(roomMatch)) {
        setActiveTab('roomManage');
      }
    } else {
      clearActiveMatch();
      setActiveTab('roomManage');
    }
    emitLobbiesChanged('room_joined', { roomId: state.activeRoom.roomId });
    setRoomModalState({ open: false });
    setHomeStatusMessage(`${t('roomJoinSuccess')} ${state.activeRoom.roomId}`);
    render();
    return true;
  } catch (e) {
    setHomeStatusMessage(e.message);
    showApiError(statusId, e);
    return false;
  }
};

export const runPendingJoinAction = async (render) => {
  const pending = state.pendingJoinAction;
  if (!pending) return;

  closeRoomSwitchPrompt(render, false);
  if (pending.kind === 'lobby') {
    const ok = await executeJoinLobbyRequest(
      render,
      pending.roomId,
      pending.ownerUserId,
      pending.password || '',
      Boolean(pending.spectator),
      'joinLobbyStatus'
    );
    if (ok) {
      resetJoinLobbyModalState();
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

export const bindRoomModalEvents = (render) => {
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
      emitLobbiesChanged('room_created', { roomId: state.activeRoom.roomId });
      setRoomModalState({ open: false });
      setHomeStatusMessage(`${t('roomCreated')} ${state.activeRoom.inviteCode}`);
      render();
    } catch (e) {
      setHomeStatusMessage(e.message);
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
      setHomeStatusMessage(e.message);
      showApiError('homeStatus', e);
    }
  });
};

export const bindHomeEvents = (render) => {
  const hydrateActiveRoom = async () => {
    if (!state.activeRoom?.roomId) return;
    if (state.activeRoom.ownerId && state.activeRoom.inviteCode && state.activeMatch?.matchId) return;

    try {
      if (!state.activeRoom.ownerId || !state.activeRoom.inviteCode) {
        setActiveRoom(await callApi(`/rooms/${encodeURIComponent(state.activeRoom.roomId)}`));
        setSuppressOwnJoinPresence(true);
      }
      const match = await fetchRoomMatch(state.activeRoom.roomId).catch(() => null);
      if (match?.matchId) {
        activateMatch(match, { withTab: true, keepViewTab: state.activeTab === 'game' });
        render();
        return;
      }
      clearActiveMatch();
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
      const me = getMyParticipant();
      const nextReady = !(me?.ready ?? false);
      setActiveRoom(await callApi(`/rooms/${encodeURIComponent(state.activeRoom.roomId)}/ready`, {
        method: 'POST',
        body: JSON.stringify({ ready: nextReady }),
      }));
      emitLobbiesChanged('room_ready_changed', { roomId: state.activeRoom.roomId });
      render();
    } catch (e) {
      showApiError('roomStatus', e);
    }
  });

  document.querySelector('[data-act="leaveRoom"]')?.addEventListener('click', async () => {
    if (!requireRoom()) return;
    try {
      await leaveCurrentRoom();
      setActiveTab('home');
      setRoomNoticeMessage('');
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

      openJoinLobbyModal(render, {
        roomId,
        roomName: btn.dataset.roomName || roomId,
        ownerUserId: btn.dataset.roomOwnerId || '',
        needsPassword: btn.dataset.roomHasPassword === '1',
      });
    });
  });

  document.querySelector('[data-act="openRoomSettings"]')?.addEventListener('click', () => {
    setRoomSettingsOpen(true);
    render();
  });

  document.querySelector('[data-act="startGame"]')?.addEventListener('click', async () => {
    if (state.activeMatch?.matchId && state.activeMatch.status !== 'finished') {
      await fetchAndActivateMatch(state.activeMatch.matchId, render, { withTab: true, forceViewTab: true });
      return;
    }
    const participants = Array.isArray(state.activeRoom?.participants) ? state.activeRoom.participants : [];
    const players = participants.filter((participant) => participant.role !== 'spectator');
    const allPlayersReady = players.length >= 2 && players.every((participant) => participant.ready === true);
    if (!allPlayersReady) {
      showToast(t('allPlayersMustReadyHint'));
      return;
    }
    await startMatchFromRoom(render);
  });

  document.querySelector('[data-act="openGame"]')?.addEventListener('click', async () => {
    const match = await fetchRoomMatch(state.activeRoom?.roomId || '').catch(() => null);
    if (!match?.matchId) return;
    activateMatch(match, { withTab: true, forceViewTab: true, keepViewTab: true });
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
      setActiveRoom(await callApi(`/rooms/${encodeURIComponent(state.activeRoom.roomId)}/settings`, {
        method: 'PATCH',
        body: JSON.stringify({ isPublic, maxPlayers, password }),
      }));
      emitLobbiesChanged('room_settings_updated', {
        roomId: state.activeRoom.roomId,
        actorUserId: state.user?.id,
      });
      pushSystemRoomEvent('room_settings_updated');
      setStatus('roomManageStatus', t('roomSettingsSaved'), true);
      showToast(t('roomSettingsSaved'), 'ok');
      setRoomSettingsOpen(false);
      render();
    } catch (e) {
      showApiError('roomManageStatus', e);
    }
  });

  document.querySelector('[data-act="regenInvite"]')?.addEventListener('click', async () => {
    if (!state.activeRoom?.roomId) return;
    try {
      setActiveRoom(await callApi(`/rooms/${encodeURIComponent(state.activeRoom.roomId)}/invite-code/regenerate`, {
        method: 'POST',
      }));
      emitLobbiesChanged('room_invite_regenerated', { roomId: state.activeRoom.roomId });
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
        setActiveRoom(await callApi(`/rooms/${encodeURIComponent(state.activeRoom.roomId)}/participants/${encodeURIComponent(userId)}/kick`, { method: 'POST' }));
        emitLobbiesChanged('room_participant_kicked', {
          roomId: state.activeRoom.roomId,
          userId,
          username: participant?.username || '',
          actorUserId: state.user?.id,
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
        setActiveRoom(await callApi(`/rooms/${encodeURIComponent(state.activeRoom.roomId)}/participants/${encodeURIComponent(userId)}/ban`, { method: 'POST' }));
        emitLobbiesChanged('room_participant_banned', {
          roomId: state.activeRoom.roomId,
          userId,
          username: participant?.username || '',
          actorUserId: state.user?.id,
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
        setActiveRoom(await callApi(`/rooms/${encodeURIComponent(state.activeRoom.roomId)}/participants/${encodeURIComponent(userId)}/transfer-ownership`, { method: 'POST' }));
        emitLobbiesChanged('room_ownership_transferred', {
          roomId: state.activeRoom.roomId,
          userId,
          username: participant?.username || '',
          actorUserId: state.user?.id,
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
    setRoomChatInputShouldFocus(true);
    appendRoomChatMessage({
      username: state.user?.username || 'user',
      role: (state.activeRoom.participants || []).find((participant) => participant.userId === state.user?.id)?.role || 'player',
      userId: state.user?.id || null,
      text,
      timestamp: Date.now(),
    });
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
    render();
    syncChatScroll();
  });

  document.querySelector('#roomChatInput')?.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' || event.shiftKey) return;
    event.preventDefault();
    document.querySelector('[data-act="sendRoomChat"]')?.click();
  });
};

export const bindRoomManagePageEvents = (render) => {
  bindHomeEvents(render);
  bindRoomManageEvents(render);
};
