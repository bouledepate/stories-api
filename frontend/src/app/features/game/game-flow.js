import { callApi } from '../../api';
import { loadLobbies } from '../../bootstrap/session';
import { t } from '../../i18n';
import { safeTextValue } from '../../security';
import { state } from '../../state';
import { showApiError, showToast } from '../../services/feedback';
import { emitLobbiesChanged, sendSocketMessage } from '../../services/socket';
import {
  appendRoomChatMessage,
  appendGameEventLog,
  clearActiveMatch,
  clearActiveRoom,
  setGameCardPlayPrompt,
  setGameConfirmPrompt,
  setGameChatUnreadCount,
  resetGameEventLog,
  setActiveMatch,
  setActiveTab,
  setGameChatOpen,
  setGameStatusMessage,
  setRoomNoticeMessage,
} from '../../store/mutations';
import { getMyParticipant, isUserInMatch } from '../../store/selectors';

let nextRoundTimerId = null;
let nextRoundIntervalId = null;
let nextRoundKey = '';

export const shouldOpenMatchView = (match) => match?.status !== 'finished' && isUserInMatch(match, state.user?.id);
export const canViewMatchAsSpectator = () => getMyParticipant()?.role === 'spectator';
export const canKeepMatchView = (match) => Boolean(match?.matchId) && (isUserInMatch(match, state.user?.id) || canViewMatchAsSpectator());
export const shouldRestoreFinishedMatchView = (match, persistedMatchId = '') => (
  Boolean(match?.matchId)
  && match?.status === 'finished'
  && persistedMatchId !== ''
  && match.matchId === persistedMatchId
  && isUserInMatch(match, state.user?.id)
);

const appendLastActionIfNeeded = (match) => {
  const action = match?.currentRound?.lastAction;
  if (!action?.at) return;
  const exists = (state.gameEventLog || []).some((item) => (
    item.actionAt === action.at
    && item.type === (action.type || 'card_played')
    && item.actorUserId === action.actorUserId
  ));
  if (exists) return;
  appendGameEventLog({
    type: action.type || 'card_played',
    actorUserId: action.actorUserId,
    cardCode: action.cardCode,
    cardName: action.cardName,
    targetUserId: action.targetUserId,
    secondTargetUserId: action.secondTargetUserId,
    guessedCardCode: action.guessedCardCode,
    guessedCardName: action.guessedCardName,
    targetCardCode: action.targetCardCode,
    targetCardName: action.targetCardName,
    actionAt: action.at,
  });
};

const appendRoundSummaryIfNeeded = (match) => {
  const summary = match?.lastRoundSummary;
  if (!summary?.roundNumber) return;
  const exists = (state.gameEventLog || []).some(
    (item) => item.type === 'round_summary' && item.roundNumber === summary.roundNumber
  );
  if (exists) return;
  const names = Array.isArray(summary.winnerNames) && summary.winnerNames.length
    ? summary.winnerNames.join(', ')
    : (summary.winnerUserIds || []).join(', ');
  appendGameEventLog({
    type: 'round_summary',
    roundNumber: summary.roundNumber,
    text: t('roundWinnerSummary', { round: summary.roundNumber, winners: names }),
  });
  showToast(t('roundWinnerSummary', { round: summary.roundNumber, winners: names }), 'ok');
};

const clearRoundAutostart = () => {
  if (nextRoundTimerId) {
    window.clearTimeout(nextRoundTimerId);
    nextRoundTimerId = null;
  }
  if (nextRoundIntervalId) {
    window.clearInterval(nextRoundIntervalId);
    nextRoundIntervalId = null;
  }
  nextRoundKey = '';
};

const startNextRound = async (render) => {
  if (!state.activeMatch?.matchId) return;
  try {
    const updated = await callApi(`/matches/${encodeURIComponent(state.activeMatch.matchId)}/start-round`, {
      method: 'POST',
    });
    activateMatch(updated, { withTab: true });
    sendSocketMessage({
      type: 'room_event',
      roomId: state.activeRoom?.roomId,
      event: 'match_state_updated',
      data: { matchId: updated.matchId },
    });
    render();
  } catch (error) {
    showApiError('gameStatus', error);
  }
};

const scheduleNextRoundAutostart = (match, render) => {
  const isPendingAfterRound = match?.status === 'pending' && match?.currentRound?.status === 'finished';
  if (!isPendingAfterRound || !state.activeRoom?.ownerId || !state.user?.id) {
    clearRoundAutostart();
    return;
  }

  const key = `${match.matchId}:${match.roundNumber}`;
  if (nextRoundKey === key) return;
  clearRoundAutostart();
  nextRoundKey = key;

  let secondsLeft = 5;
  setGameStatusMessage(t('nextRoundIn', { seconds: secondsLeft }));
  render();
  nextRoundIntervalId = window.setInterval(() => {
    secondsLeft -= 1;
    if (secondsLeft <= 0) {
      window.clearInterval(nextRoundIntervalId);
      nextRoundIntervalId = null;
      setGameStatusMessage(t('waitingNextRound'));
      render();
      return;
    }

    setGameStatusMessage(t('nextRoundIn', { seconds: secondsLeft }));
    render();
  }, 1000);

  if (state.activeRoom.ownerId !== state.user.id) {
    return;
  }

  nextRoundTimerId = window.setTimeout(async () => {
    clearRoundAutostart();
    await startNextRound(render);
  }, 5000);
};

export const activateMatch = (match, { withTab = true, forceViewTab = false, keepViewTab = false } = {}) => {
  if (!match?.matchId) return;
  setActiveMatch(match);
  appendLastActionIfNeeded(match);
  appendRoundSummaryIfNeeded(match);
  if (match.status === 'finished' && match.winnerUserId) {
    const winner = (match.players || []).find((item) => item.userId === match.winnerUserId)?.username || match.winnerUserId;
    setGameStatusMessage(t('matchWinner', { winner }));
    clearRoundAutostart();
  }
  if (withTab && (shouldOpenMatchView(match) || forceViewTab || (keepViewTab && canKeepMatchView(match)))) {
    setActiveTab('game');
  }
};

export const fetchAndActivateMatch = async (matchId, render, options = {}) => {
  try {
    const match = canViewMatchAsSpectator() && state.activeRoom?.roomId
      ? await fetchRoomMatch(state.activeRoom.roomId)
      : await callApi(`/matches/${encodeURIComponent(matchId)}`);
    if (!match?.matchId) {
      return null;
    }
    activateMatch(match, options);
    if (!(match.status === 'finished' && match.winnerUserId) && !(match.status === 'pending' && match.currentRound?.status === 'finished')) {
      setGameStatusMessage('');
    }
    scheduleNextRoundAutostart(match, render);
    render();
    return match;
  } catch (error) {
    showApiError('gameStatus', error);
    return null;
  }
};

export const fetchRoomMatch = async (roomId) => {
  const response = await callApi(`/rooms/${encodeURIComponent(roomId)}/match`);
  return response?.match || null;
};

export const startMatchFromRoom = async (render) => {
  if (!state.activeRoom?.roomId) return;
  try {
    const created = await callApi('/matches', {
      method: 'POST',
      body: JSON.stringify({ roomId: state.activeRoom.roomId }),
    });
    const started = await callApi(`/matches/${encodeURIComponent(created.matchId)}/start-round`, {
      method: 'POST',
    });
    resetGameEventLog();
    setGameChatUnreadCount(0);
    activateMatch(started);
    emitLobbiesChanged('room_match_started', {
      roomId: state.activeRoom.roomId,
      matchId: started.matchId,
      actorUserId: state.user?.id,
    });
    sendSocketMessage({
      type: 'room_event',
      roomId: state.activeRoom.roomId,
      event: 'match_state_updated',
      data: { matchId: started.matchId },
    });
    showToast(t('gameStarted'), 'ok');
    render();
  } catch (error) {
    showApiError('roomStatus', error);
  }
};

export const playMatchCard = async (render, cardCode, options = {}) => {
  if (!state.activeMatch?.matchId || !cardCode) return;
  try {
    const updated = await callApi(`/matches/${encodeURIComponent(state.activeMatch.matchId)}/play-card`, {
      method: 'POST',
      body: JSON.stringify({
        cardCode,
        targetUserId: options.targetUserId || null,
        secondTargetUserId: options.secondTargetUserId || null,
        guessedCardCode: options.guessedCardCode || null,
        cardInstanceId: options.cardInstanceId || null,
        shouldSwap: typeof options.shouldSwap === 'boolean' ? options.shouldSwap : null,
        shouldReact: typeof options.shouldReact === 'boolean' ? options.shouldReact : null,
        targetDecreeCode: options.targetDecreeCode || null,
      }),
    });
    setGameCardPlayPrompt(null);
    activateMatch(updated, { withTab: true, keepViewTab: state.activeTab === 'game' });
    scheduleNextRoundAutostart(updated, render);
    sendSocketMessage({
      type: 'room_event',
      roomId: state.activeRoom?.roomId,
      event: 'match_state_updated',
      data: { matchId: updated.matchId },
    });
    if (!(updated.status === 'pending' && updated.currentRound?.status === 'finished')) {
      setGameStatusMessage('');
    }
    render();
  } catch (error) {
    setGameStatusMessage(error?.message || t('unknownError'));
    showApiError('gameStatus', error);
  }
};

export const sendGameChatMessage = (render) => {
  const text = safeTextValue('#gameChatInput', 512);
  if (!state.activeRoom?.roomId || text === '') return;
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
  const input = document.querySelector('#gameChatInput');
  if (input instanceof HTMLInputElement) {
    input.value = '';
  }
  render();
  window.requestAnimationFrame(() => {
    syncGameChatScroll();
    const nextInput = document.querySelector('#gameChatInput');
    if (nextInput instanceof HTMLInputElement) {
      nextInput.focus();
    }
  });
};

export const leaveGameAndRoom = async (render) => {
  if (!state.activeRoom?.roomId) return;
  const roomId = state.activeRoom.roomId;
  const matchId = state.activeMatch?.matchId || null;
  try {
    await callApi(`/rooms/${encodeURIComponent(roomId)}/leave`, { method: 'POST' });
  } catch {
    // best effort leave
  }
  if (matchId) {
    sendSocketMessage({
      type: 'room_event',
      roomId,
      event: 'match_state_updated',
      data: { matchId },
    });
  }
  emitLobbiesChanged('room_left', { roomId, ...(matchId ? { matchId } : {}) });
  await loadLobbies('home', 4, state.lobbyFilters.password);
  await loadLobbies('catalog', state.lobbyFilters.limit, state.lobbyFilters.password);
  clearActiveMatch();
  clearActiveRoom();
  clearRoundAutostart();
  setGameChatOpen(false);
  setGameChatUnreadCount(0);
  setGameConfirmPrompt(null);
  setRoomNoticeMessage('');
  setActiveTab('home');
  showToast(t('leftGame'), 'ok');
  render();
};

const pickRandomOwnershipTarget = () => {
  const participants = Array.isArray(state.activeRoom?.participants) ? state.activeRoom.participants : [];
  const eligible = participants.filter((participant) => (
    participant.userId !== state.user?.id
    && (participant.role === 'owner' || participant.role === 'player')
  ));

  if (eligible.length === 0) {
    return null;
  }

  return eligible[Math.floor(Math.random() * eligible.length)] || null;
};

export const leaveFinishedMatchRoom = async (render) => {
  if (!state.activeRoom?.roomId) return;

  const roomId = state.activeRoom.roomId;
  const matchId = state.activeMatch?.matchId || null;

  try {
    if (state.activeRoom.ownerId === state.user?.id) {
      const nextOwner = pickRandomOwnershipTarget();
      if (nextOwner?.userId) {
        await callApi(
          `/rooms/${encodeURIComponent(roomId)}/participants/${encodeURIComponent(nextOwner.userId)}/transfer-ownership`,
          { method: 'POST' }
        );
        emitLobbiesChanged('room_ownership_transferred', {
          roomId,
          userId: nextOwner.userId,
          username: nextOwner.username || '',
          actorUserId: state.user?.id,
        });
      }
    }

    await callApi(`/rooms/${encodeURIComponent(roomId)}/leave`, { method: 'POST' });
  } catch {
    // best effort leave
  }

  if (matchId) {
    sendSocketMessage({
      type: 'room_event',
      roomId,
      event: 'match_state_updated',
      data: { matchId },
    });
  }
  emitLobbiesChanged('room_left', { roomId, ...(matchId ? { matchId } : {}) });
  await loadLobbies('home', 4, state.lobbyFilters.password);
  await loadLobbies('catalog', state.lobbyFilters.limit, state.lobbyFilters.password);
  clearActiveMatch();
  clearActiveRoom();
  clearRoundAutostart();
  setGameChatOpen(false);
  setGameChatUnreadCount(0);
  setGameConfirmPrompt(null);
  setRoomNoticeMessage('');
  setActiveTab('home');
  showToast(t('leftGame'), 'ok');
  render();
};

export const pushGameSystemEvent = (text) => {
  if (!text) return;
  appendGameEventLog({
    type: 'system',
    text,
  });
};

export const syncGameChatScroll = () => {
  const container = document.querySelector('#gameChatLog');
  if (!container) return;
  window.requestAnimationFrame(() => {
    container.scrollTop = container.scrollHeight;
  });
};
