import { callApi } from '../api';
import { state } from '../state';
import {
  clearActiveMatch,
  clearActiveRoom,
  setActiveMatch,
  setActiveRoom,
  setActiveTab,
  setHomeLobbies,
  setLobbyCatalog,
  setMyRooms,
  setToken,
  setUser,
} from '../store/mutations';
import { shouldOpenMatchView, shouldRestoreFinishedMatchView } from '../features/game/game-flow';

const isOpenLobbyCandidate = (room) => room?.status === 'lobby' && Number(room?.playersCount || 0) < Number(room?.maxPlayers || 6);

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
    if (target === 'home') setHomeLobbies((data.items || []).filter(isOpenLobbyCandidate));
    if (target === 'catalog') setLobbyCatalog(data.items || []);
  } catch {
    if (target === 'home') setHomeLobbies([]);
    if (target === 'catalog') setLobbyCatalog([]);
  }
};

export const restoreActiveRoom = async () => {
  if (!state.user) {
    clearActiveRoom();
    clearActiveMatch();
    return;
  }

  const persistedRoomId = state.activeRoom?.roomId;
  const persistedMatchId = state.activeMatch?.matchId || '';
  if (persistedRoomId) {
    try {
      setActiveRoom(await callApi(`/rooms/${encodeURIComponent(persistedRoomId)}`));
      try {
        const roomMatch = await callApi(`/rooms/${encodeURIComponent(persistedRoomId)}/match`);
        if (roomMatch?.match?.matchId) {
          setActiveMatch(roomMatch.match);
          setActiveTab(
            shouldOpenMatchView(roomMatch.match) || shouldRestoreFinishedMatchView(roomMatch.match, persistedMatchId)
              ? 'game'
              : 'roomManage'
          );
          return;
        }
      } catch {
        // ignore, fallback to room view
      }
      clearActiveMatch();
      setActiveTab('roomManage');
      return;
    } catch {
      clearActiveRoom();
      clearActiveMatch();
    }
  }

  try {
    const currentRoom = await callApi('/rooms/current');
    if (currentRoom?.roomId) {
      setActiveRoom(currentRoom);
      try {
        const roomMatch = await callApi(`/rooms/${encodeURIComponent(currentRoom.roomId)}/match`);
        if (roomMatch?.match?.matchId) {
          setActiveMatch(roomMatch.match);
          setActiveTab(
            shouldOpenMatchView(roomMatch.match) || shouldRestoreFinishedMatchView(roomMatch.match, persistedMatchId)
              ? 'game'
              : 'roomManage'
          );
          return;
        }
      } catch {
        // ignore
      }
      clearActiveMatch();
      setActiveTab('roomManage');
    } else {
      clearActiveRoom();
      clearActiveMatch();
    }
  } catch {
    clearActiveRoom();
    clearActiveMatch();
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
