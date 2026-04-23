import { state } from '../../state';
import { t } from '../../i18n';

export const formatClock = (timestamp) => {
  const numeric = Number(timestamp || Date.now());
  const date = Number.isFinite(numeric) ? new Date(numeric * (numeric < 10_000_000_000 ? 1000 : 1)) : new Date();
  return new Intl.DateTimeFormat(state.lang === 'en' ? 'en-US' : 'ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const initialLetter = (value, fallback = '?') => String(value || fallback).trim().charAt(0).toUpperCase() || fallback;

export const roomAccessSummary = (room) => {
  if (room.isPublic && room.hasPassword) return t('roomAccessPublicProtected');
  if (room.isPublic) return t('roomAccessPublicOpen');
  if (room.hasPassword) return t('roomAccessPrivateProtected');
  return t('roomAccessPrivateCodeOnly');
};
