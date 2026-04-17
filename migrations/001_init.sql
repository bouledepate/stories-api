CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS user_stats (
  user_id TEXT PRIMARY KEY,
  wins INTEGER NOT NULL DEFAULT 0,
  losses INTEGER NOT NULL DEFAULT 0,
  victory_tokens INTEGER NOT NULL DEFAULT 0,
  eliminated_with_3 INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  deck TEXT NOT NULL,
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  text TEXT NOT NULL,
  value INTEGER NULL,
  effect_key TEXT NOT NULL,
  enabled INTEGER NOT NULL DEFAULT 1,
  version INTEGER NOT NULL DEFAULT 1,
  UNIQUE(deck, code)
);

CREATE TABLE IF NOT EXISTS rooms (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  owner_user_id TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (owner_user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS room_participants (
  room_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  role TEXT NOT NULL,
  ready INTEGER NOT NULL DEFAULT 0,
  joined_at TEXT NOT NULL,
  PRIMARY KEY (room_id, user_id),
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS games (
  id TEXT PRIMARY KEY,
  room_id TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL,
  decree_rounds_used INTEGER NOT NULL DEFAULT 0,
  state_json TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);

INSERT INTO cards(deck, code, name, text, value, effect_key, enabled, version) VALUES
('character','guard','Guard','Guess and eliminate.',1,'guard',1,1),
('character','priest','Priest','Peek at a hand.',2,'priest',1,1),
('character','baron','Baron','Compare values.',3,'baron',1,1),
('character','shadow','Shadow','Removed at setup.',10,'shadow',1,1),
('decree','decree_royal_mercy','Royal Mercy','First elimination gives mercy.',NULL,'decree_royal_mercy',1,1),
('decree','decree_silent_court','Silent Court','No hand peeking this round.',NULL,'decree_silent_court',1,1),
('decree','decree_black_rose','Black Rose','Baron comparisons gain a token.',NULL,'decree_black_rose',1,1)
ON CONFLICT(deck, code) DO NOTHING;
