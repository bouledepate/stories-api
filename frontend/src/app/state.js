const wsHost = (window.location.hostname === '0.0.0.0' || window.location.hostname === '') ? 'localhost' : window.location.hostname;
const wsProtocol = window.location.protocol === 'https:' ? 'wss' : 'ws';

export const state = {
  apiBase: window.location.origin,
  wsUrl: `${wsProtocol}://${wsHost}:8081`,
  token: localStorage.getItem('stories_token') || '',
  user: null,
  activeRoom: null,
  activeTab: 'home',
  homeLobbies: [],
  lobbyCatalog: [],
  lobbyFilters: {
    visibility: 'all',
    password: 'all',
    limit: 20,
  },
  socket: null,
  lang: localStorage.getItem('stories_lang') || 'ru',
  authOpen: false,
  authMode: 'login',
  roomModalOpen: false,
  roomModalMode: 'create',
  joinLobbyModalOpen: false,
  joinLobbyRoomId: '',
  joinLobbyOwnerUserId: '',
  joinLobbyNeedsPassword: false,
  joinLobbyPassword: '',
  roomChatMessages: [],
  homeStatusMessage: '',
  myRooms: [],
};
