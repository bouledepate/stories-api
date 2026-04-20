import { state } from './state';
import { t } from './i18n';
import { esc } from './security';

export const renderAuthModal = () => {
  if (!state.authOpen || state.user) return '';

  const isLogin = state.authMode === 'login';

  return `
    <div class="modal-overlay" data-act="closeAuth"></div>
    <section class="modal auth-modal">
      <div class="modal-head">
        <div>
          <h2>${isLogin ? t('login') : t('register')}</h2>
          <p>${t('authHint')}</p>
        </div>
        <button class="chip" data-act="closeAuth">${t('close')}</button>
      </div>

      <article class="auth-card">
        <div class="stack">
          <input id="authUsername" placeholder="${t('username')}" />
          <input id="authPassword" placeholder="${t('password')}" type="password" />
          <button class="primary" data-act="authSubmit">${isLogin ? t('login') : t('createAccount')}</button>
          <button class="chip" data-act="switchAuthMode">${isLogin ? t('switchToRegister') : t('switchToLogin')}</button>
        </div>
      </article>

      <div id="authStatus" class="status">${t('ready')}</div>
    </section>
  `;
};

const renderHero = () => `
  <section class="hero">
    <div>
      <span class="badge">${t('appTag')}</span>
      <h1>${t('heroTitle')}</h1>
      <p>${t('heroSubtitle')}</p>
    </div>
    <div class="hero-actions">
      <button class="primary" data-act="heroCreate">${t('heroCreate')}</button>
      <button class="secondary" data-act="heroJoin">${t('heroJoin')}</button>
    </div>
  </section>
`;

export const renderHome = () => {
  const actions = state.user
    ? `
      <div class="grid">
        <article>
          <h3>${t('createRoom')}</h3>
          <div class="stack">
            <input id="roomName" placeholder="${t('roomName')}" />
            <button class="primary" data-act="createRoom">${t('createRoom')}</button>
          </div>
        </article>
        <article>
          <h3>${t('connectCode')}</h3>
          <div class="stack">
            <input id="inviteCode" placeholder="AB12CD" maxlength="6" />
            <label><input id="joinAsSpectator" type="checkbox" /> ${t('spectator')}</label>
            <button class="secondary" data-act="joinByCode">${t('connect')}</button>
          </div>
        </article>
      </div>`
    : `<article><p>${t('authRequiredAction')}</p></article>`;

  return `
    ${renderHero()}
    <div id="homeStatus" class="status">${t('ready')}</div>
    ${actions}
    ${state.activeRoom ? `<pre class="json">${esc(JSON.stringify(state.activeRoom, null, 2))}</pre>` : ''}
  `;
};

export const renderProfile = () => {
  if (!state.user) return `<h2>${t('profileTitle')}</h2><div class="status">${t('needAuthProfile')}</div>`;

  return `
    <h2>${t('profileTitle')}</h2>
    <div class="grid">
      <article>
        <h3>${t('profileEdit')}</h3>
        <div class="stack">
          <input id="profileUsername" value="${esc(state.user.username)}" />
          <input id="profilePassword" placeholder="${t('newPassword')}" type="password" />
          <button class="primary" data-act="saveProfile">${t('saveProfile')}</button>
        </div>
      </article>
      <article>
        <h3>${t('stats')}</h3>
        <ul>
          <li>${t('wins')}: <b>${state.user.wins}</b></li>
          <li>${t('losses')}: <b>${state.user.losses}</b></li>
          <li>${t('vt')}: <b>${state.user.victoryTokens}</b></li>
          <li>${t('elim3')}: <b>${state.user.eliminatedWith3}</b></li>
        </ul>
      </article>
    </div>
    <div id="profileStatus" class="status">${t('ready')}</div>
  `;
};

const renderAdminTools = () => `
  <article>
    <h3>${t('deckLoad')}</h3>
    <div class="stack">
      <select id="adminDeck">
        <option value="character">character</option>
        <option value="decree">decree</option>
        <option value="event">event</option>
      </select>
      <button class="primary" data-act="loadCards">${t('loadCards')}</button>
      <button class="secondary" data-act="loadEffects">${t('loadEffects')}</button>
    </div>
  </article>
  <article>
    <h3>${t('patchCard')}</h3>
    <div class="stack">
      <input id="adminCardCode" placeholder="${t('cardCode')}" />
      <input id="adminCardName" placeholder="${t('newName')}" />
      <input id="adminCardText" placeholder="${t('newText')}" />
      <input id="adminCardValue" placeholder="${t('valueOrEmpty')}" />
      <input id="adminEffectKey" placeholder="${t('effectKey')}" />
      <label><input id="adminEnabled" type="checkbox" checked /> ${t('enabled')}</label>
      <button class="primary" data-act="patchCard">${t('applyPatch')}</button>
    </div>
  </article>
`;

const renderDebug = () => `
  <article>
    <h3>API / WebSocket Debug</h3>
    <div class="row">
      <input id="apiBase" value="${esc(state.apiBase)}" />
      <button id="checkHealth" class="secondary">${t('checkHealth')}</button>
    </div>
    <div id="healthStatus" class="status">${t('waitingRequest')}</div>
    <div class="row topgap">
      <input id="wsUrl" value="${esc(state.wsUrl)}" />
      <button id="wsConnect" class="secondary">${t('connectWs')}</button>
    </div>
    <div class="row topgap">
      <input id="roomId" placeholder="roomId" />
      <button id="subscribeRoom">${t('subscribe')}</button>
      <button id="sendPing">${t('sendPing')}</button>
    </div>
    <div class="row topgap">
      <input id="eventName" value="frontend_debug" />
      <button id="sendEvent">${t('sendEvent')}</button>
    </div>
    <div id="wsStatus" class="status">${t('wsNotConnected')}</div>
    <div id="debugLog" class="log"></div>
  </article>
`;

export const renderControlPanel = () => `
  <h2>${t('controlPanelTitle')}</h2>
  <p>${t('controlPanelHint')}</p>
  <div class="grid">
    ${renderAdminTools()}
    ${renderDebug()}
  </div>
  <div id="adminStatus" class="status">${t('ready')}</div>
  <pre id="adminOutput" class="json"></pre>
`;

export const renderLayout = () => {
  const userBlock = state.user
    ? `<div class="session ok">${t('signedAs')} <b>${esc(state.user.username)}</b> (${esc(state.user.role)})</div>`
    : `<div class="session">${t('notAuthorized')}</div>`;

  return `
  <main class="layout ${state.theme}">
    <header class="topbar">
      <div class="brand">
        <h2>${t('title')}</h2>
        ${userBlock}
      </div>
      <div class="topbar-actions">
        <div class="theme-switch">
          <button class="chip ${state.theme === 'dark' ? 'active' : ''}" data-theme="dark">${t('themeDark')}</button>
          <button class="chip ${state.theme === 'light' ? 'active' : ''}" data-theme="light">${t('themeLight')}</button>
        </div>
        <div class="lang-switch">
          <button class="chip ${state.lang === 'ru' ? 'active' : ''}" data-lang="ru">RU</button>
          <button class="chip ${state.lang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
        </div>
        ${state.user
          ? `<button class="primary ghost" data-act="logout">${t('logout')}</button>`
          : `<button class="primary" data-act="toggleAuth">${t('openAuth')}</button>`}
      </div>
    </header>

    <nav class="tabs">
      <button class="tab ${state.activeTab === 'home' ? 'active' : ''}" data-tab="home">${t('navHome')}</button>
      <button class="tab ${state.activeTab === 'profile' ? 'active' : ''}" data-tab="profile">${t('navProfile')}</button>
      ${state.user?.role === 'admin' ? `<button class="tab ${state.activeTab === 'control' ? 'active' : ''}" data-tab="control">${t('navControl')}</button>` : ''}
    </nav>

    <section class="panel ${state.activeTab === 'home' ? '' : 'hidden'}">${renderHome()}</section>
    <section class="panel ${state.activeTab === 'profile' ? '' : 'hidden'}">${renderProfile()}</section>
    ${state.user?.role === 'admin' ? `<section class="panel ${state.activeTab === 'control' ? '' : 'hidden'}">${renderControlPanel()}</section>` : ''}

    ${renderAuthModal()}
  </main>`;
};
