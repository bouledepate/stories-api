const read = (key, fallback = '') => {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
};

const write = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Ignore storage errors in degraded environments.
  }
};

const remove = (key) => {
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore storage errors in degraded environments.
  }
};

const readJson = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
};

const writeJson = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage errors in degraded environments.
  }
};

export const storage = {
  readToken: () => read('stories_token'),
  writeToken: (token) => write('stories_token', token),
  removeToken: () => remove('stories_token'),
  readLanguage: () => read('stories_lang', 'ru'),
  writeLanguage: (lang) => write('stories_lang', lang),
  readActiveRoomId: () => read('stories_active_room_id'),
  writeActiveRoomId: (roomId) => write('stories_active_room_id', roomId),
  removeActiveRoomId: () => remove('stories_active_room_id'),
  readActiveMatchId: () => read('stories_active_match_id'),
  writeActiveMatchId: (matchId) => write('stories_active_match_id', matchId),
  removeActiveMatchId: () => remove('stories_active_match_id'),
  readRoomChatMessages: (roomId) => (roomId ? readJson(`stories_room_chat_${roomId}`, []) : []),
  writeRoomChatMessages: (roomId, messages) => {
    if (!roomId) return;
    writeJson(`stories_room_chat_${roomId}`, messages);
  },
  removeRoomChatMessages: (roomId) => {
    if (!roomId) return;
    remove(`stories_room_chat_${roomId}`);
  },
  readGameEventLog: (matchId) => (matchId ? readJson(`stories_game_event_log_${matchId}`, []) : []),
  writeGameEventLog: (matchId, entries) => {
    if (!matchId) return;
    writeJson(`stories_game_event_log_${matchId}`, entries);
  },
  removeGameEventLog: (matchId) => {
    if (!matchId) return;
    remove(`stories_game_event_log_${matchId}`);
  },
};
