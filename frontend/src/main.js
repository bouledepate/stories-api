import './styles/main.scss';
import { callApi } from './app/api';
import {
  bindAuthEvents,
  bindCommonEvents,
  ensureLobbyRealtime,
  bindHomeEvents,
  bindLobbyEvents,
  bindProfileEvents,
  bindRoomManagePageEvents,
} from './app/events';
import { renderLayout } from './app/views';
import { state } from './app/state';

const app = document.querySelector('#app');

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

const render = () => {
  if (!app) return;
  loadMyRooms();

  app.innerHTML = renderLayout();

  bindCommonEvents(render);
  if (state.activeTab === 'home') bindHomeEvents(render);
  if (state.activeTab === 'lobbies') bindLobbyEvents(render);
  if (state.activeTab === 'profile') bindProfileEvents(render);
  if (state.activeTab === 'roomManage') bindRoomManagePageEvents(render);
  if (state.authOpen && !state.user) bindAuthEvents(render, loadMe);

  if (state.roomChatInputShouldFocus && state.activeTab === 'roomManage') {
    window.requestAnimationFrame(() => {
      const input = document.querySelector('#roomChatInput');
      if (input instanceof HTMLInputElement) {
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      }
      state.roomChatInputShouldFocus = false;
    });
  }
};

const loadLobbies = async (target = 'home', limit = 4, password = 'all') => {
  try {
    const data = await callApi(`/lobbies?visibility=public&password=${encodeURIComponent(password)}&limit=${limit}`);
    if (target === 'home') state.homeLobbies = data.items || [];
    if (target === 'catalog') state.lobbyCatalog = data.items || [];
  } catch {
    if (target === 'home') state.homeLobbies = [];
    if (target === 'catalog') state.lobbyCatalog = [];
  }
};

const restoreActiveRoom = async () => {
  if (!state.user) {
    state.activeRoom = null;
    localStorage.removeItem('stories_active_room_id');
    return;
  }

  const persistedRoomId = state.activeRoom?.roomId;
  if (persistedRoomId) {
    try {
      state.activeRoom = await callApi(`/rooms/${encodeURIComponent(persistedRoomId)}`);
      state.activeTab = 'roomManage';
      localStorage.setItem('stories_active_room_id', state.activeRoom.roomId);
      return;
    } catch {
      state.activeRoom = null;
      localStorage.removeItem('stories_active_room_id');
    }
  }

  try {
    const currentRoom = await callApi('/rooms/current');
    if (currentRoom?.roomId) {
      state.activeRoom = currentRoom;
      state.activeTab = 'roomManage';
      localStorage.setItem('stories_active_room_id', currentRoom.roomId);
    } else {
      state.activeRoom = null;
      localStorage.removeItem('stories_active_room_id');
    }
  } catch {
    state.activeRoom = null;
    localStorage.removeItem('stories_active_room_id');
  }
};

const loadMyRooms = () => {
  if (!state.user) {
    state.myRooms = [];
    return;
  }

  const all = [...state.homeLobbies, ...state.lobbyCatalog];
  const unique = new Map();
  all
    .filter((room) => room.ownerUserId === state.user.id)
    .forEach((room) => unique.set(room.roomId, room));
  if (state.activeRoom?.ownerId === state.user.id) {
    unique.set(state.activeRoom.roomId, {
      roomId: state.activeRoom.roomId,
      name: state.activeRoom.name,
      inviteCode: state.activeRoom.inviteCode,
      ownerUserId: state.activeRoom.ownerId,
    });
  }
  state.myRooms = [...unique.values()];
};

await loadMe();
await restoreActiveRoom();
await loadLobbies('home', 4);
await loadLobbies('catalog', state.lobbyFilters.limit, state.lobbyFilters.password);
loadMyRooms();
ensureLobbyRealtime(async () => {
  await loadLobbies('home', 4);
  await loadLobbies('catalog', state.lobbyFilters.limit, state.lobbyFilters.password);
  loadMyRooms();
}, render);
render();
