import { state } from '../state';
import { storage } from '../services/storage';

const clearPersistedRoomId = () => {
  storage.removeActiveRoomId();
};

const persistRoomId = (roomId) => {
  if (roomId) {
    storage.writeActiveRoomId(roomId);
    return;
  }

  clearPersistedRoomId();
};

const clearPersistedMatchId = () => {
  storage.removeActiveMatchId();
};

const persistMatchId = (matchId) => {
  if (matchId) {
    storage.writeActiveMatchId(matchId);
    return;
  }

  clearPersistedMatchId();
};

export const setToken = (token) => {
  state.token = token || '';
  if (state.token) {
    storage.writeToken(state.token);
  } else {
    storage.removeToken();
  }
};

export const setUser = (user) => {
  state.user = user || null;
};

export const setLanguage = (lang) => {
  state.lang = lang;
  storage.writeLanguage(lang);
};

export const setActiveTab = (tab) => {
  state.activeTab = tab;
};

export const setHomeLobbies = (items) => {
  state.homeLobbies = Array.isArray(items) ? items : [];
};

export const setLobbyCatalog = (items) => {
  state.lobbyCatalog = Array.isArray(items) ? items : [];
};

export const setLobbyFilters = ({ password, limit }) => {
  if (password !== undefined) {
    state.lobbyFilters.password = password;
  }
  if (limit !== undefined) {
    state.lobbyFilters.limit = limit;
  }
};

export const setMyRooms = (items) => {
  state.myRooms = Array.isArray(items) ? items : [];
};

export const setSocket = (socket) => {
  state.socket = socket;
};

export const setAuthModalState = ({ open, mode } = {}) => {
  if (open !== undefined) {
    state.authOpen = Boolean(open);
  }
  if (mode !== undefined) {
    state.authMode = mode;
  }
};

export const setRoomModalState = ({ open, mode } = {}) => {
  if (open !== undefined) {
    state.roomModalOpen = Boolean(open);
  }
  if (mode !== undefined) {
    state.roomModalMode = mode;
  }
};

export const setRoomSettingsOpen = (open) => {
  state.roomSettingsOpen = Boolean(open);
};

export const setRoomStatusMessage = (message) => {
  state.roomStatusMessage = message || '';
};

export const setHomeStatusMessage = (message) => {
  state.homeStatusMessage = message || '';
};

export const setRoomNoticeMessage = (message) => {
  state.roomNoticeMessage = message || '';
};

export const setSuppressOwnJoinPresence = (value) => {
  state.suppressOwnJoinPresence = Boolean(value);
};

export const setRoomChatInputShouldFocus = (value) => {
  state.roomChatInputShouldFocus = Boolean(value);
};

export const setGameStatusMessage = (message) => {
  state.gameStatusMessage = message || '';
};

export const setGameChatOpen = (open) => {
  state.gameChatOpen = Boolean(open);
};

export const setGameChatUnreadCount = (count) => {
  state.gameChatUnreadCount = Math.max(0, Number(count || 0));
};

export const setGameCardPreview = (preview) => {
  state.gameCardPreview = preview || null;
};

export const setGameCardPlayPrompt = (prompt) => {
  state.gameCardPlayPrompt = prompt || null;
};

export const setGameConfirmPrompt = (prompt) => {
  state.gameConfirmPrompt = prompt || null;
};

export const patchGameCardPlayPrompt = (patch) => {
  if (!state.gameCardPlayPrompt) return;
  state.gameCardPlayPrompt = {
    ...state.gameCardPlayPrompt,
    ...(patch || {}),
  };
};

export const incrementGameChatUnreadCount = () => {
  state.gameChatUnreadCount = Math.max(0, Number(state.gameChatUnreadCount || 0) + 1);
};

export const appendGameEventLog = (entry) => {
  state.gameEventLog = [
    ...state.gameEventLog,
    {
      timestamp: Date.now(),
      ...entry,
    },
  ].slice(-120);
  storage.writeGameEventLog(state.activeMatch?.matchId || '', state.gameEventLog);
};

export const resetGameEventLog = () => {
  storage.removeGameEventLog(state.activeMatch?.matchId || '');
  state.gameEventLog = [];
};

export const appendRoomChatMessage = (message) => {
  state.roomChatMessages = [
    ...state.roomChatMessages,
    {
      timestamp: Date.now(),
      ...message,
    },
  ].slice(-100);
  storage.writeRoomChatMessages(state.activeRoom?.roomId || '', state.roomChatMessages);
};

export const setRoomChatMessages = (messages) => {
  state.roomChatMessages = Array.isArray(messages) ? messages.slice(-100) : [];
  storage.writeRoomChatMessages(state.activeRoom?.roomId || '', state.roomChatMessages);
};

export const resetRoomChatMessages = () => {
  storage.removeRoomChatMessages(state.activeRoom?.roomId || '');
  state.roomChatMessages = [];
};

export const setActiveRoom = (room, { persist = true } = {}) => {
  state.activeRoom = room || null;
  state.roomChatMessages = storage.readRoomChatMessages(room?.roomId || '');
  if (persist) {
    persistRoomId(room?.roomId || '');
  }
};

export const clearActiveRoom = () => {
  state.activeRoom = null;
  state.roomChatMessages = [];
  clearPersistedRoomId();
};

export const setActiveMatch = (match, { persist = true } = {}) => {
  state.activeMatch = match || null;
  state.gameEventLog = storage.readGameEventLog(match?.matchId || '');
  if (persist) {
    persistMatchId(match?.matchId || '');
  }
};

export const clearActiveMatch = () => {
  state.activeMatch = null;
  state.gameEventLog = [];
  clearPersistedMatchId();
};

export const setJoinLobbyModalState = ({
  open,
  roomId,
  ownerUserId,
  roomName,
  needsPassword,
  password,
  spectator,
} = {}) => {
  if (open !== undefined) {
    state.joinLobbyModalOpen = Boolean(open);
  }
  if (roomId !== undefined) {
    state.joinLobbyRoomId = roomId;
  }
  if (ownerUserId !== undefined) {
    state.joinLobbyOwnerUserId = ownerUserId;
  }
  if (roomName !== undefined) {
    state.joinLobbyRoomName = roomName;
  }
  if (needsPassword !== undefined) {
    state.joinLobbyNeedsPassword = Boolean(needsPassword);
  }
  if (password !== undefined) {
    state.joinLobbyPassword = password;
  }
  if (spectator !== undefined) {
    state.joinLobbySpectator = Boolean(spectator);
  }
};

export const resetJoinLobbyModalState = () => {
  setJoinLobbyModalState({
    open: false,
    roomId: '',
    ownerUserId: '',
    roomName: '',
    needsPassword: false,
    password: '',
    spectator: false,
  });
};

export const setRoomSwitchPromptState = ({
  open,
  mode,
  targetLabel,
  pendingJoinAction,
} = {}) => {
  if (open !== undefined) {
    state.roomSwitchPromptOpen = Boolean(open);
  }
  if (mode !== undefined) {
    state.roomSwitchPromptMode = mode;
  }
  if (targetLabel !== undefined) {
    state.roomSwitchTargetLabel = targetLabel;
  }
  if (pendingJoinAction !== undefined) {
    state.pendingJoinAction = pendingJoinAction;
  }
};

export const resetRoomSwitchPromptState = () => {
  setRoomSwitchPromptState({
    open: false,
    mode: 'leave',
    targetLabel: '',
    pendingJoinAction: null,
  });
};

export const clearSessionState = () => {
  setToken('');
  setUser(null);
  clearActiveRoom();
  clearActiveMatch();
  setAuthModalState({ open: false });
  setRoomNoticeMessage('');
  setGameChatOpen(false);
  setGameChatUnreadCount(0);
  setGameCardPreview(null);
  resetGameEventLog();
  setGameStatusMessage('');
  resetRoomSwitchPromptState();
};
