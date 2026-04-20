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

      <div id="authStatus" class="status"></div>
    </section>
  `;
};

const renderRoomModal = () => {
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
        <div class="stack ${createMode ? '' : 'hidden'}">
          <input id="roomName" placeholder="${t('roomName')}" />
          <label><input id="roomIsPublic" type="checkbox" checked /> ${t('visibilityPublic')}</label>
          <input id="roomPassword" placeholder="${t('roomPassword')}" type="password" />
          <button class="primary" data-act="createRoom">${t('createRoom')}</button>
        </div>

        <div class="stack ${createMode ? 'hidden' : ''}">
          <input id="inviteCode" placeholder="AB12CD" maxlength="6" />
          <input id="joinPassword" placeholder="${t('roomPassword')}" type="password" />
          <label><input id="joinAsSpectator" type="checkbox" /> ${t('spectator')}</label>
          <button class="secondary" data-act="joinByCode">${t('connect')}</button>
        </div>
      </article>

      <div id="homeStatus" class="status">${esc(state.homeStatusMessage || '')}</div>
    </section>
  `;
};

const renderHero = () => `
  <section class="hero">
    <div class="hero-mist" aria-hidden="true"></div>
    <div class="hero-copy">
      <span class="hero-kicker">${t('appTag')}</span>
      <h1>LETTERS:<br/>NO MERCY</h1>
      <p class="hero-subline">DARK MEDIEVAL STORIES</p>
      <p>${t('heroSubtitle')}</p>
      <div class="hero-actions">
        <button class="primary" data-act="heroCreate">＋ ${t('heroCreate')}</button>
        <button class="secondary" data-act="heroJoin">${t('heroJoin')}</button>
      </div>
    </div>
    <div class="hero-art" aria-hidden="true">
      <div class="castle-silhouette"></div>
      <div class="letter-token"></div>
    </div>
  </section>
`;

const renderLobbyRooms = () => {
  const rooms = state.homeLobbies;

  return `
    <section class="lobby-card">
      <div class="lobby-head">
        <h3>${t('availableRooms')}</h3>
        <button class="chip" data-tab="lobbies">${t('navLobbies')}</button>
      </div>
      <div class="lobby-list">
        ${rooms.length === 0 ? `<p>${t('lobbyNoItems')}</p>` : rooms.map((room) => `
          <article class="lobby-item">
            <div class="lobby-icon">${room.isPublic ? '☀' : '☾'}</div>
            <div class="lobby-meta">
              <h4>${esc(room.name)} ${room.hasPassword ? '<span class="inline-tag">🔒</span>' : ''}</h4>
              <p>${room.isPublic ? t('visibilityPublic') : t('visibilityPrivate')} • ${room.hasPassword ? t('lobbyHasPassword') : t('lobbyNoPassword')}</p>
            </div>
            <div class="lobby-count">👥 ${room.playersCount} / 8</div>
            <button class="secondary" data-act="joinLobby" data-room-id="${esc(room.roomId)}" data-room-owner-id="${esc(room.ownerUserId || '')}">${t('joinLobby')}</button>
          </article>
        `).join('')}
      </div>
    </section>
  `;
};

const renderParticipant = (participant) => {
  const me = state.user?.id === participant.userId;
  return `
    <li class="participant-item">
      <div>
        <b>${esc(participant.username)}</b> ${me ? `<span class="inline-note">(${t('youLabel')})</span>` : ''}
      </div>
      <div class="participant-meta">${esc(participant.role)} · ${participant.ready ? 'ready' : 'not ready'}</div>
    </li>
  `;
};

const renderRoomPanel = () => {
  if (!state.activeRoom) return '';

  const participants = Array.isArray(state.activeRoom.participants) ? state.activeRoom.participants : [];
  const players = participants.filter((participant) => participant.role !== 'spectator');
  const spectators = participants.filter((participant) => participant.role === 'spectator');
  const isOwner = Boolean(state.user?.id) && state.user.id === state.activeRoom.ownerId;

  return `
    <article class="room-panel">
      <h3>${t('roomDetails')}</h3>
      <div class="room-meta">
        <div><span>${t('roomCode')}:</span> <b>${esc(state.activeRoom.inviteCode || '—')}</b></div>
        <div><span>${t('roomOwner')}:</span> <b>${esc(state.activeRoom.ownerId || '—')}</b></div>
      </div>
      <div class="room-lists">
        <div>
          <h4>${t('roomParticipants')} (${players.length})</h4>
          <ul class="participant-list">${players.map(renderParticipant).join('')}</ul>
        </div>
        <div>
          <h4>${t('roomSpectators')} (${spectators.length})</h4>
          <ul class="participant-list">${spectators.map(renderParticipant).join('')}</ul>
        </div>
      </div>
      <div class="stack">
        <h4>${t('roomActions')}</h4>
        <div class="room-actions">
          <button class="secondary" data-act="refreshRoom">${t('refreshRoom')}</button>
          <button class="secondary" data-act="readyRoom">${t('markReady')}</button>
          <button class="primary" data-act="startGame">${t('startGame')}</button>
          <button class="chip" data-act="leaveRoom">${isOwner ? t('closeOwnedRoom') : t('leaveRoom')}</button>
        </div>
      </div>
    </article>
  `;
};

export const renderHome = () => {
  return `
    ${renderHero()}
    ${renderLobbyRooms()}
    ${renderRoomPanel()}
  `;
};

export const renderLobbies = () => `
  <h2>${t('lobbyTitle')}</h2>
  <p>${t('lobbyHint')}</p>
  <article>
    <div class="row">
      <select id="lobbyVisibility">
        <option value="all" ${state.lobbyFilters.visibility === 'all' ? 'selected' : ''}>${t('visibilityAll')}</option>
        <option value="public" ${state.lobbyFilters.visibility === 'public' ? 'selected' : ''}>${t('visibilityPublic')}</option>
        <option value="private" ${state.lobbyFilters.visibility === 'private' ? 'selected' : ''}>${t('visibilityPrivate')}</option>
      </select>
      <select id="lobbyPasswordFilter">
        <option value="all" ${state.lobbyFilters.password === 'all' ? 'selected' : ''}>${t('passwordAll')}</option>
        <option value="with_password" ${state.lobbyFilters.password === 'with_password' ? 'selected' : ''}>${t('passwordWith')}</option>
        <option value="without_password" ${state.lobbyFilters.password === 'without_password' ? 'selected' : ''}>${t('passwordWithout')}</option>
      </select>
      <input id="lobbyLimit" type="number" min="1" max="100" value="${state.lobbyFilters.limit}" />
      <button class="secondary" data-act="loadLobbies">${t('loadLobbies')}</button>
    </div>
  </article>
  <div class="lobby-list topgap">
    ${state.lobbyCatalog.length === 0 ? `<article><p>${t('lobbyNoItems')}</p></article>` : state.lobbyCatalog.map((room) => `
      <article class="lobby-item">
        <div class="lobby-icon">${room.isPublic ? '☀' : '☾'}</div>
        <div class="lobby-meta">
          <h4>${esc(room.name)}</h4>
          <p>${room.status} • ${room.hasPassword ? t('lobbyHasPassword') : t('lobbyNoPassword')}</p>
        </div>
        <div class="lobby-count">👥 ${room.playersCount} / 8</div>
        <button class="secondary" data-act="joinLobby" data-room-id="${esc(room.roomId)}" data-room-owner-id="${esc(room.ownerUserId || '')}">${t('joinLobby')}</button>
      </article>
    `).join('')}
  </div>
`;

const renderMyRooms = () => {
  if (!state.user) return '';

  const mine = state.myRooms || [];

  return `
    <article>
      <h3>${t('myRooms')}</h3>
      <div class="stack">
        ${mine.length === 0 ? `<p>${t('lobbyNoItems')}</p>` : mine.map((room) => `
          <div class="row my-room-row">
            <span>${esc(room.name)} (${esc(room.inviteCode)})</span>
            <button class="chip" data-act="openOwnedRoom" data-room-id="${esc(room.roomId)}">${t('openRoom')}</button>
          </div>
        `).join('')}
      </div>
    </article>
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
          <button class="primary" data-act="saveProfile">${t('saveProfile')}</button>
        </div>
      </article>
      ${renderMyRooms()}
      <article>
        <h3>${t('changePassword')}</h3>
        <div class="stack">
          <input id="currentPassword" placeholder="${t('currentPassword')}" type="password" />
          <input id="nextPassword" placeholder="${t('nextPassword')}" type="password" />
          <button class="secondary" data-act="changePassword">${t('changePassword')}</button>
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
    <div id="profileStatus" class="status"></div>
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
  <div id="adminStatus" class="status"></div>
  <pre id="adminOutput" class="json"></pre>
`;

export const renderLayout = () => {
  const authAction = state.user
    ? `<div class="profile-actions"><button class="avatar-btn" data-tab="profile">${esc((state.user.username || 'U').slice(0, 1).toUpperCase())}</button><button class="chip" data-act="logout">${t('logout')}</button></div>`
    : `<button class="primary" data-act="toggleAuth">${t('openAuth')}</button>`;

  return `
  <main class="layout dark">
    <header class="topbar">
      <div class="brand-mini">
        <h2>LETTERS: NO MERCY</h2>
        <p class="brand-sub">Dark Medieval Stories</p>
      </div>
      <nav class="main-nav">
        <button class="tab ${state.activeTab === 'home' ? 'active' : ''}" data-tab="home">${t('navHome')}</button>
        <button class="tab ${state.activeTab === 'lobbies' ? 'active' : ''}" data-tab="lobbies">${t('navLobbies')}</button>
        <button class="tab ${state.activeTab === 'profile' ? 'active' : ''}" data-tab="profile">${t('navProfile')}</button>
      </nav>
      <div class="topbar-actions">
        <button class="primary" data-act="heroCreate">＋ ${t('heroCreate')}</button>
        <div class="lang-switch compact">
          <button class="chip ${state.lang === 'ru' ? 'active' : ''}" data-lang="ru">RU</button>
          <button class="chip ${state.lang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
        </div>
        ${authAction}
      </div>
    </header>

    <section class="panel ${state.activeTab === 'home' ? '' : 'hidden'} cinematic-panel">${renderHome()}</section>
    <section class="panel ${state.activeTab === 'lobbies' ? '' : 'hidden'} cinematic-panel">${renderLobbies()}</section>
    <section class="panel ${state.activeTab === 'profile' ? '' : 'hidden'} cinematic-panel">${renderProfile()}</section>
    ${state.user?.role === 'admin' ? `<section class="panel ${state.activeTab === 'control' ? '' : 'hidden'}">${renderControlPanel()}</section>` : ''}

    ${renderAuthModal()}
    ${renderRoomModal()}
  </main>`;
};
