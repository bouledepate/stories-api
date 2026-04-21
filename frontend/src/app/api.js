import { state } from './state';
import { t } from './i18n';

const authHeader = () => (state.token ? { Authorization: `Bearer ${state.token}` } : {});

const mapErrorCode = (code, status) => {
  const normalized = String(code || '').toUpperCase();
  const byCode = {
    INVALID_CREDENTIALS: 'invalidCredentials',
    USER_EXISTS: 'userExists',
    CURRENT_PASSWORD_INVALID: 'currentPasswordInvalid',
    PASSWORD_CHANGED: 'passwordChanged',
    NO_FIELDS_TO_UPDATE: 'noFieldsToUpdate',
    USER_NOT_FOUND: 'userNotFound',
    MISSING_BEARER_TOKEN: 'unauthorized',
    INVALID_TOKEN_FORMAT: 'unauthorized',
    INVALID_TOKEN_SIGNATURE: 'unauthorized',
    INVALID_TOKEN_PAYLOAD: 'unauthorized',
    INVALID_TOKEN_CLAIMS: 'unauthorized',
    TOKEN_EXPIRED: 'unauthorized',
    UNAUTHORIZED: 'unauthorized',
    FORBIDDEN: 'forbidden',
    INVITE_CODE_NOT_FOUND: 'inviteInvalid',
    INVALID_INVITE_CODE: 'inviteInvalid',
    OWNER_ALREADY_HAS_ROOM: 'ownerAlreadyHasRoom',
    ROOM_PASSWORD_REQUIRED: 'roomPasswordRequired',
    ROOM_PASSWORD_INVALID: 'roomPasswordInvalid',
    ONLY_OWNER_CAN_START_GAME: 'onlyOwnerCanStartGame',
    NEED_READY_PLAYERS: 'needReadyPlayers',
    USER_NOT_IN_ROOM: 'userNotInRoom',
    ROOM_NOT_FOUND: 'roomNotFound',
    GAME_NOT_STARTED: 'gameNotStarted',
    NOT_YOUR_TURN: 'notYourTurn',
    CARD_CODE_REQUIRED: 'cardCodeRequired',
    CARD_NOT_IN_HAND: 'cardNotInHand',
    INVITE_CODE_GENERATION_FAILED: 'inviteCodeGenerationFailed',
    DECK_NOT_FOUND: 'deckNotFound',
    CARD_NOT_FOUND: 'cardNotFound',
    ADMIN_ROLE_REQUIRED: 'adminRoleRequired',
    ONLY_OWNER_CAN_MANAGE_ROOM: 'onlyOwnerCanManageRoom',
    OWNER_CANNOT_BE_REMOVED: 'ownerCannotBeRemoved',
    ONLY_PLAYERS_CAN_BE_KICKED: 'onlyPlayersCanBeKicked',
    USER_BLOCKED_IN_ROOM: 'blockedNotice',
    INVITE_CODE_ROTATE_COOLDOWN: 'inviteRotateCooldown',
    VALIDATION_ERROR: 'validationFailed',
    UNKNOWN_ERROR: 'unknownError',
  };

  if (byCode[normalized]) return byCode[normalized];
  if (status === 401) return 'unauthorized';
  if (status === 403) return 'forbidden';
  if (status >= 500) return 'serverUnavailable';
  return null;
};

const parseApiError = (status, payload, fallbackText) => {
  const rawMessage = payload?.message || payload?.errorMessage || payload?.error || fallbackText || '';
  if (String(payload?.errorCode || payload?.code || '').toUpperCase() === 'UNKNOWN_ERROR' && /must|invalid|required|password|username/i.test(String(rawMessage))) {
    return { key: 'validationFailed', message: String(rawMessage) };
  }

  const key = mapErrorCode(payload?.code || payload?.errorCode, status);
  if (key) return { key, message: t(key) };

  const message = rawMessage || t('httpError', { status });
  return { key: null, message };
};

export const callApi = async (path, options = {}) => {
  let response;
  try {
    response = await fetch(`${state.apiBase.replace(/\/$/, '')}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
        ...authHeader(),
        Locale: state.lang,
      },
    });
  } catch {
    throw new Error(t('serverUnavailable'));
  }

  const text = await response.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = {};
  }

  if (!response.ok) {
    const parsed = parseApiError(response.status, data, text);
    const error = new Error(parsed.message || t('unknownError'));
    error.code = parsed.key;
    error.status = response.status;
    throw error;
  }

  return data;
};
