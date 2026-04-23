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

export const appendRoomChatMessage = (message) => {
  state.roomChatMessages = [
    ...state.roomChatMessages,
    {
      timestamp: Date.now(),
      ...message,
    },
  ].slice(-100);
};

export const resetRoomChatMessages = () => {
  state.roomChatMessages = [];
};

export const setActiveRoom = (room, { persist = true } = {}) => {
  state.activeRoom = room || null;
  if (persist) {
    persistRoomId(room?.roomId || '');
  }
};

export const clearActiveRoom = () => {
  state.activeRoom = null;
  clearPersistedRoomId();
};

export const setJoinLobbyModalState = ({
  open,
  roomId,
  ownerUserId,
  roomName,
  needsPassword,
  password,
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
};

export const resetJoinLobbyModalState = () => {
  setJoinLobbyModalState({
    open: false,
    roomId: '',
    ownerUserId: '',
    roomName: '',
    needsPassword: false,
    password: '',
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
  setAuthModalState({ open: false });
  setRoomNoticeMessage('');
  resetRoomSwitchPromptState();
};
