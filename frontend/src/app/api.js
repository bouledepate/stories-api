import { state } from './state';
import { t } from './i18n';

const authHeader = () => (state.token ? { Authorization: `Bearer ${state.token}` } : {});

const mapErrorCode = (code, status) => {
  const normalized = String(code || '').toUpperCase();
  const byCode = {
    INVALID_CREDENTIALS: 'invalidCredentials',
    USER_EXISTS: 'userExists',
    UNAUTHORIZED: 'unauthorized',
    FORBIDDEN: 'forbidden',
    ROOM_NOT_FOUND: 'roomNotFound',
    INVALID_INVITE_CODE: 'inviteInvalid',
    INVITE_CODE_NOT_FOUND: 'inviteInvalid',
    ROOM_PASSWORD_REQUIRED: 'roomPasswordRequired',
    ROOM_PASSWORD_INVALID: 'roomPasswordInvalid',
    CURRENT_PASSWORD_INVALID: 'currentPasswordInvalid',
    VALIDATION_ERROR: 'validationFailed',
  };

  if (byCode[normalized]) return byCode[normalized];
  if (status === 401) return 'unauthorized';
  if (status === 403) return 'forbidden';
  if (status >= 500) return 'serverUnavailable';
  return null;
};

const parseApiError = (status, payload, fallbackText) => {
  const key = mapErrorCode(payload?.code || payload?.errorCode, status);
  if (key) return { key, message: t(key) };

  const message = payload?.message || payload?.error || fallbackText || t('httpError', { status });
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
