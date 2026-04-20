ALTER TABLE rooms ADD COLUMN invite_code TEXT;

UPDATE rooms
SET invite_code = substr(upper(hex(randomblob(8))), 1, 6)
WHERE invite_code IS NULL;

CREATE UNIQUE INDEX IF NOT EXISTS rooms_invite_code_unique ON rooms(invite_code);
