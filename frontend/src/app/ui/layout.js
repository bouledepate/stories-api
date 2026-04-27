import { state } from '../state';
import { t } from '../i18n';
import { esc } from '../security';
import { renderAuthModal, renderJoinLobbyModal, renderRoomModal, renderRoomNotice, renderRoomSettingsModal, renderRoomSwitchModal } from './modals';
import { renderGameScreen } from './screens/game-screen';
import { renderHome } from './screens/home-screen';
import { renderLobbies } from './screens/lobbies-screen';
import { renderProfile } from './screens/profile-screen';
import { renderRoomManage, renderRoomPanel } from './screens/room-screen';

export const renderLayout = () => {
  if (state.activeTab === 'game') {
    return `
    <main class="layout dark game-mode">
      <header class="game-topbar">
        <div class="game-topbar-brand">${t('appName')}</div>
        <div class="game-topbar-actions">
          <button class="chip" data-act="exitGame">${t('logout')}</button>
        </div>
      </header>
      ${renderGameScreen()}
      <div id="toastContainer" class="toast-container"></div>
    </main>`;
  }

  const authAction = state.user
    ? `<div class="profile-actions"><button class="avatar-btn" data-tab="profile">${esc((state.user.username || 'U').slice(0, 1).toUpperCase())}</button><button class="chip" data-act="logout">${t('logout')}</button></div>`
    : `<button class="primary" data-act="toggleAuth">${t('openAuth')}</button>`;

  return `
  <main class="layout dark">
    <header class="topbar">
      <div class="topbar-brand">
        <div class="brand-mini">
          <h2>${t('appName')}</h2>
          <p class="brand-sub">${t('appGenre')}</p>
        </div>
      </div>
      <div class="topbar-content">
        <nav class="main-nav">
          <button class="tab ${state.activeTab === 'home' ? 'active' : ''}" data-tab="home">${t('navHome')}</button>
          <button class="tab ${state.activeTab === 'lobbies' ? 'active' : ''}" data-tab="lobbies">${t('navLobbies')}</button>
          ${state.activeRoom ? `<button class="tab ${state.activeTab === 'roomManage' ? 'active' : ''}" data-tab="roomManage">${t('navRoomActive')}</button>` : ''}
          <button class="tab ${state.activeTab === 'profile' ? 'active' : ''}" data-tab="profile">${t('navProfile')}</button>
        </nav>
        <div class="topbar-actions">
          <button class="primary topbar-create" data-act="heroCreate">＋ ${t('quickCreateRoom')}</button>
          <div class="lang-switch compact">
            <button class="chip ${state.lang === 'ru' ? 'active' : ''}" data-lang="ru">RU</button>
            <button class="chip ${state.lang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
          </div>
          ${authAction}
        </div>
      </div>
    </header>

    ${renderRoomNotice()}

    <section class="panel ${state.activeTab === 'home' ? '' : 'hidden'} cinematic-panel">${renderHome()}</section>
    <section class="panel ${state.activeTab === 'lobbies' ? '' : 'hidden'} cinematic-panel">${renderLobbies()}</section>
    <section class="panel ${state.activeTab === 'roomManage' ? '' : 'hidden'} cinematic-panel">${renderRoomPanel()}${renderRoomManage()}</section>
    <section class="panel ${state.activeTab === 'profile' ? '' : 'hidden'} cinematic-panel">${renderProfile()}</section>

    ${renderAuthModal()}
    ${renderRoomModal()}
    ${renderRoomSettingsModal()}
    ${renderJoinLobbyModal()}
    ${renderRoomSwitchModal()}
    <div id="toastContainer" class="toast-container"></div>
  </main>`;
};
