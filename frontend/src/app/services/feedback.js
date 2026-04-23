import { t } from '../i18n';

export const setStatus = (id, message, ok = false) => {
  const el = document.querySelector(`#${id}`);
  if (!el) return;
  el.textContent = message;
  el.classList.toggle('ok', ok);
};

export const showToast = (message, type = 'error') => {
  const container = document.querySelector('#toastContainer');
  if (!container || !message) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.prepend(toast);
  window.setTimeout(() => toast.remove(), 4200);
};

export const showApiError = (statusId, error) => {
  const message = error?.message || t('unknownError');
  setStatus(statusId, message);
  showToast(message);
};

export const clearFieldError = (selector) => {
  const field = document.querySelector(selector);
  if (!field) return;
  field.classList.remove('input-error');
  field.removeAttribute('aria-invalid');
};

export const markFieldError = (selector, message) => {
  const field = document.querySelector(selector);
  if (!field) return;
  field.classList.add('input-error');
  field.setAttribute('aria-invalid', 'true');
  field.focus();
  showToast(message);
};
