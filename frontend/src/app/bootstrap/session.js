import { callApi } from '../api';
import { state } from '../state';
import {
  clearActiveRoom,
  setActiveRoom,
  setActiveTab,
  setHomeLobbies,
  setLobbyCatalog,
  setMyRooms,
  setToken,
  setUser,
} from '../store/mutations';

export const loadMe = async () => {
  if (!state.token) return;

  try {
    setUser(await callApi('/auth/me'));
  } catch {
    setUser(null);
    setToken('');
  }
};

export const loadLobbies = async (target = 'home', limit = 4, password = 'all') => {
  try {
    const data = await callApi(`/lobbies?visibility=public&password=${encodeURIComponent(password)}&limit=${limit}`);
    if (target === 'home') setHomeLobbies(data.items || []);
    if (target === 'catalog') setLobbyCatalog(data.items || []);
  } catch {
    if (target === 'home') setHomeLobbies([]);
    if (target === 'catalog') setLobbyCatalog([]);
  }
};

export const restoreActiveRoom = async () => {
  if (!state.user) {
    clearActiveRoom();
    return;
  }

  const persistedRoomId = state.activeRoom?.roomId;
  if (persistedRoomId) {
    try {
      setActiveRoom(await callApi(`/rooms/${encodeURIComponent(persistedRoomId)}`));
      setActiveTab('roomManage');
      return;
    } catch {
      clearActiveRoom();
    }
  }

  try {
    const currentRoom = await callApi('/rooms/current');
    if (currentRoom?.roomId) {
      setActiveRoom(currentRoom);
      setActiveTab('roomManage');
    } else {
      clearActiveRoom();
    }
  } catch {
    clearActiveRoom();
  }
};

export const syncMyRooms = () => {
  if (!state.user) {
    setMyRooms([]);
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
  setMyRooms([...unique.values()]);
};
