import { state } from './state';
import { t } from './i18n';
import {
  clearActiveMatch,
  clearActiveRoom,
  setActiveTab,
  setToken,
  setUser,
} from './store/mutations';

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
    USER_ALREADY_HAS_ACTIVE_ROOM: 'userAlreadyHasActiveRoom',
    ROOM_PASSWORD_REQUIRED: 'roomPasswordRequired',
    ROOM_PASSWORD_INVALID: 'roomPasswordInvalid',
    ROOM_IS_FULL: 'roomIsFull',
    USER_NOT_IN_ROOM: 'userNotInRoom',
    ROOM_NOT_FOUND: 'roomNotFound',
    INVITE_CODE_GENERATION_FAILED: 'inviteCodeGenerationFailed',
    ONLY_OWNER_CAN_MANAGE_ROOM: 'onlyOwnerCanManageRoom',
    OWNER_CANNOT_BE_REMOVED: 'ownerCannotBeRemoved',
    CANNOT_TRANSFER_OWNERSHIP_TO_SELF: 'cannotTransferOwnershipToSelf',
    ONLY_PLAYERS_CAN_BE_KICKED: 'onlyPlayersCanBeKicked',
    USER_BLOCKED_IN_ROOM: 'blockedNotice',
    INVITE_CODE_ROTATE_COOLDOWN: 'inviteRotateCooldown',
    MATCH_NOT_FOUND: 'matchNotFound',
    MATCH_ALREADY_EXISTS: 'matchAlreadyExists',
    MATCH_ALREADY_FINISHED: 'matchAlreadyFinished',
    NOT_ENOUGH_PLAYERS_TO_START_MATCH: 'notEnoughPlayersToStartMatch',
    ROUND_NOT_ACTIVE: 'roundNotActive',
    ROUND_ALREADY_ACTIVE: 'roundAlreadyActive',
    NOT_PLAYER_TURN: 'notPlayerTurn',
    PLAYER_NOT_IN_MATCH: 'playerNotInMatch',
    PLAYER_ELIMINATED: 'playerEliminated',
    CARD_NOT_IN_HAND: 'cardNotInHand',
    TARGET_PLAYER_REQUIRED: 'targetPlayerRequired',
    TARGET_PLAYER_INVALID: 'targetPlayerInvalid',
    CARD_GUESS_REQUIRED: 'cardGuessRequired',
    CARD_GUESS_INVALID: 'cardGuessInvalid',
    GUARD_CANNOT_GUESS_GUARD: 'guardCannotGuessGuard',
    PEASANT_REACTION_ONLY: 'peasantReactionOnly',
    CARD_PLAY_BLOCKED: 'cardPlayBlocked',
    TARGET_PLAYER_PROTECTED: 'targetPlayerProtected',
    MATCH_STATE_INVALID: 'matchStateInvalid',
    PLAYERS_NOT_READY: 'playersNotReady',
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
    if (response.status === 401) {
      if (state.socket && state.socket.readyState <= 1) {
        state.socket.close();
      }
      setToken('');
      setUser(null);
      clearActiveMatch();
      clearActiveRoom();
      setActiveTab('home');
    }
    const parsed = parseApiError(response.status, data, text);
    const error = new Error(parsed.message || t('unknownError'));
    error.code = parsed.key;
    error.status = response.status;
    throw error;
  }

  return data;
};
