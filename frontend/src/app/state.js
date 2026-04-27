import { storage } from './services/storage';

const wsHost = (window.location.hostname === '0.0.0.0' || window.location.hostname === '') ? 'localhost' : window.location.hostname;
const wsProtocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
const persistedRoomId = storage.readActiveRoomId();
const persistedMatchId = storage.readActiveMatchId();

export const state = {
  apiBase: window.location.origin,
  wsUrl: `${wsProtocol}://${wsHost}:8081`,
  token: storage.readToken(),
  user: null,
  activeRoom: persistedRoomId ? { roomId: persistedRoomId } : null,
  activeMatch: persistedMatchId ? { matchId: persistedMatchId } : null,
  activeTab: 'home',
  homeLobbies: [],
  lobbyCatalog: [],
  lobbyFilters: {
    password: 'all',
    limit: 20,
  },
  socket: null,
  lang: storage.readLanguage(),
  authOpen: false,
  authMode: 'login',
  roomModalOpen: false,
  roomModalMode: 'create',
  roomSettingsOpen: false,
  joinLobbyModalOpen: false,
  joinLobbyRoomId: '',
  joinLobbyOwnerUserId: '',
  joinLobbyRoomName: '',
  joinLobbyNeedsPassword: false,
  joinLobbyPassword: '',
  joinLobbySpectator: false,
  roomSwitchPromptOpen: false,
  roomSwitchPromptMode: 'leave',
  roomSwitchTargetLabel: '',
  pendingJoinAction: null,
  suppressOwnJoinPresence: Boolean(persistedRoomId),
  roomChatMessages: storage.readRoomChatMessages(persistedRoomId),
  roomChatInputShouldFocus: false,
  gameEventLog: storage.readGameEventLog(persistedMatchId),
  gameChatOpen: false,
  gameChatUnreadCount: 0,
  gameCardPreview: null,
  gameCardPlayPrompt: null,
  gameConfirmPrompt: null,
  gameStatusMessage: '',
  homeStatusMessage: '',
  myRooms: [],
  roomNoticeMessage: '',
  roomStatusMessage: '',
};
