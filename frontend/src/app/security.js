import { t } from './i18n';

export const esc = (value) => {
  const div = document.createElement('div');
  div.textContent = String(value ?? '');
  return div.innerHTML;
};

export const safeTextValue = (selector, maxLength = 256) => {
  const element = document.querySelector(selector);
  if (!element) return '';
  return String(element.value ?? '').trim().slice(0, maxLength);
};

export const parseSafeUrl = (raw, allowedProtocols) => {
  let parsed;
  try {
    parsed = new URL(String(raw || '').trim());
  } catch {
    throw new Error(t('invalidUrl'));
  }

  if (!allowedProtocols.includes(parsed.protocol)) {
    throw new Error(t('invalidUrl'));
  }

  return parsed.toString().replace(/\/$/, '');
};
