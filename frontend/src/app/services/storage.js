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

export const storage = {
  readToken: () => read('stories_token'),
  writeToken: (token) => write('stories_token', token),
  removeToken: () => remove('stories_token'),
  readLanguage: () => read('stories_lang', 'ru'),
  writeLanguage: (lang) => write('stories_lang', lang),
  readActiveRoomId: () => read('stories_active_room_id'),
  writeActiveRoomId: (roomId) => write('stories_active_room_id', roomId),
  removeActiveRoomId: () => remove('stories_active_room_id'),
};
