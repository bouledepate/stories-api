import { state } from '../state';
import { t } from '../i18n';
import { esc } from '../security';

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

      <div id="authStatus" class="status"></div>
    </section>
  `;
};

export const renderRoomModal = () => {
  if (!state.roomModalOpen || !state.user) return '';

  const createMode = state.roomModalMode === 'create';

  return `
    <div class="modal-overlay" data-act="closeRoomModal"></div>
    <section class="modal room-modal">
      <div class="modal-head">
        <div>
          <h2>${createMode ? t('createRoom') : t('connectCode')}</h2>
          <p>${createMode ? t('heroSubtitle') : t('joinHint')}</p>
        </div>
        <button class="chip" data-act="closeRoomModal">${t('close')}</button>
      </div>

      <article class="auth-card">
        ${createMode ? `
        <div class="stack">
          <input id="roomName" placeholder="${t('roomName')}" />
          <label class="toggle-row"><input id="roomIsPublic" type="checkbox" checked /> ${t('roomVisibilityPublicToggle')}</label>
          <p class="field-help">${t('roomCreateAccessHint')}</p>
          <label class="field-stack">
            <span>${t('roomSize')}</span>
            <select id="roomMaxPlayers">
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6" selected>6</option>
            </select>
          </label>
          <input id="roomPassword" placeholder="${t('roomPasswordOptional')}" type="password" />
          <p class="field-help">${t('roomPasswordHint')}</p>
          <button class="primary" data-act="createRoom">${t('createRoom')}</button>
        </div>` : `
        <div class="stack">
          <input id="inviteCode" placeholder="AB12CD" maxlength="6" />
          <input id="joinPassword" placeholder="${t('roomPasswordOptional')}" type="password" />
          <label><input id="joinAsSpectator" type="checkbox" /> ${t('spectator')}</label>
          <button class="secondary" data-act="joinByCode">${t('connect')}</button>
        </div>`}
      </article>

      <div id="homeStatus" class="status">${esc(state.homeStatusMessage || '')}</div>
    </section>
  `;
};

export const renderRoomSettingsModal = () => {
  if (!state.roomSettingsOpen || !state.activeRoom || state.activeRoom.ownerId !== state.user?.id) return '';

  return `
    <div class="modal-overlay" data-act="closeRoomSettings"></div>
    <section class="modal room-modal">
      <div class="modal-head">
        <div>
          <h2>${t('roomSettingsModalTitle')}</h2>
          <p>${t('roomSettingsHint')}</p>
        </div>
        <button class="chip" data-act="closeRoomSettings">${t('close')}</button>
      </div>
      <article class="auth-card">
        <div class="stack">
          <div class="settings-card">
            <label class="toggle-row"><input id="manageIsPublic" type="checkbox" ${state.activeRoom.isPublic ? 'checked' : ''} /> ${t('roomVisibilityPublicToggle')}</label>
            <p class="field-help">${t('roomCreateAccessHint')}</p>
            <label class="field-stack">
              <span>${t('roomSize')}</span>
              <select id="manageMaxPlayers">
                ${[2, 3, 4, 5, 6].map((value) => `<option value="${value}" ${Number(state.activeRoom.maxPlayers || 6) === value ? 'selected' : ''}>${value}</option>`).join('')}
              </select>
            </label>
            <p class="field-help">${t('roomSizeHelp')}</p>
          </div>
          <input id="managePassword" type="password" placeholder="${t('roomPasswordOptional')}" />
          <p class="field-help">${t('roomPasswordHint')}</p>
          <div class="row">
            <button class="primary" data-act="saveRoomSettings">${t('saveRoomSettings')}</button>
          </div>
        </div>
      </article>
      <div id="roomManageStatus" class="status"></div>
    </section>
  `;
};

export const renderJoinLobbyModal = () => {
  if (!state.joinLobbyModalOpen) return '';

  return `
    <div class="modal-overlay" data-act="closeJoinLobbyModal"></div>
    <section class="modal room-modal">
      <div class="modal-head">
        <div>
          <h2>${t('joinLobby')}</h2>
          <p>${state.joinLobbyNeedsPassword ? t('joinPasswordHint') : t('joinPublicLobbyHint')}</p>
        </div>
        <button class="chip" data-act="closeJoinLobbyModal">${t('close')}</button>
      </div>
      <article class="auth-card">
        <div class="stack">
          ${state.joinLobbyNeedsPassword ? `<input id="lobbyJoinPassword" placeholder="${t('roomPasswordOptional')}" type="password" />` : ''}
          <button class="primary" data-act="confirmJoinLobby">${t('connect')}</button>
        </div>
      </article>
      <div id="joinLobbyStatus" class="status"></div>
    </section>
  `;
};

export const renderRoomSwitchModal = () => {
  if (!state.roomSwitchPromptOpen) return '';

  const actionLabel = state.roomSwitchPromptMode === 'close' ? t('closeAndJoinRoom') : t('leaveAndJoinRoom');
  const hint = state.roomSwitchPromptMode === 'close'
    ? t('roomSwitchCloseHint', { target: state.roomSwitchTargetLabel || 'room' })
    : t('roomSwitchLeaveHint', { target: state.roomSwitchTargetLabel || 'room' });

  return `
    <div class="modal-overlay" data-act="closeRoomSwitchModal"></div>
    <section class="modal room-modal">
      <div class="modal-head">
        <div>
          <h2>${t('roomSwitchTitle')}</h2>
          <p>${hint}</p>
        </div>
        <button class="chip" data-act="closeRoomSwitchModal">${t('close')}</button>
      </div>
      <div class="room-switch-accent">${t('roomSwitchAccent')}</div>
      <article class="auth-card">
        <div class="row">
          <button class="primary" data-act="confirmRoomSwitch">${actionLabel}</button>
          <button class="secondary" data-act="cancelRoomSwitch">${t('close')}</button>
        </div>
      </article>
      <div id="roomSwitchStatus" class="status"></div>
    </section>
  `;
};

export const renderRoomNotice = () => {
  if (!state.roomNoticeMessage) return '';

  return `<div class="room-notice">
    <span>${esc(state.roomNoticeMessage)}</span>
    <button class="chip" data-act="closeRoomNotice">${t('close')}</button>
  </div>`;
};
