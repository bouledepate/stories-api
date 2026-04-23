import { state } from './state';
import { t } from './i18n';
import { esc } from './security';

const formatClock = (timestamp) => {
  const numeric = Number(timestamp || Date.now());
  const date = Number.isFinite(numeric) ? new Date(numeric * (numeric < 10_000_000_000 ? 1000 : 1)) : new Date();
  return new Intl.DateTimeFormat(state.lang === 'en' ? 'en-US' : 'ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const initialLetter = (value, fallback = '?') => String(value || fallback).trim().charAt(0).toUpperCase() || fallback;

const roomAccessSummary = (room) => {
  if (room.isPublic && room.hasPassword) return t('roomAccessPublicProtected');
  if (room.isPublic) return t('roomAccessPublicOpen');
  if (room.hasPassword) return t('roomAccessPrivateProtected');
  return t('roomAccessPrivateCodeOnly');
};

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
              <p>${roomAccessSummary(room)}</p>
            </div>
            <div class="lobby-count">👥 ${room.playersCount} / ${room.maxPlayers || 6}</div>
            <button class="secondary" data-act="joinLobby" data-room-id="${esc(room.roomId)}" data-room-name="${esc(room.name)}" data-room-owner-id="${esc(room.ownerUserId || '')}" data-room-has-password="${room.hasPassword ? '1' : '0'}">${t('joinLobby')}</button>
          </article>
        `).join('')}
      </div>
    </section>
  `;
};

const renderParticipant = (participant) => {
  const me = state.user?.id === participant.userId;
  const isOwnerRoom = state.user?.id && state.activeRoom?.ownerId === state.user.id;
  const canKick = isOwnerRoom && participant.userId !== state.activeRoom?.ownerId;
  const canBan = isOwnerRoom && participant.role === 'player' && participant.userId !== state.activeRoom?.ownerId;
  const canTransferOwnership = isOwnerRoom && participant.role === 'player' && participant.userId !== state.activeRoom?.ownerId;
  const roleLabelMap = {
    owner: t('roleOwnerShort'),
    player: t('rolePlayerShort'),
    spectator: t('roleSpectatorShort'),
  };

  return `
    <li class="participant-item">
      <div class="participant-row">
        <div class="participant-main">
          <span class="participant-avatar role-${esc(participant.role)}">${esc(initialLetter(participant.username, 'U'))}</span>
          <div class="participant-identity">
            <div class="participant-name-row">
              <b class="role-${esc(participant.role)}">${esc(participant.username)}</b>
              ${me ? `<span class="inline-note">(${t('youLabel')})</span>` : ''}
              ${participant.role === 'owner' ? `<span class="badge-chip owner-badge">${t('participantOwnerBadge')}</span>` : ''}
            </div>
            <div class="participant-meta">
              ${esc(roleLabelMap[participant.role] || participant.role)}
              <span class="status-dot ${participant.ready ? 'ready' : 'idle'}"></span>
              <span class="ready-state ${participant.ready ? 'ready' : 'idle'}">${participant.ready ? t('participantReadyBadge') : t('participantNotReadyBadge')}</span>
            </div>
          </div>
        </div>
        ${(canKick || canBan || canTransferOwnership) ? `<div class="participant-actions participant-actions-inline">
          ${canTransferOwnership ? `<button class="chip icon-chip" title="${t('transferOwnershipSymbolLabel')}" aria-label="${t('transferOwnership')}" data-act="transferOwnership" data-user-id="${esc(participant.userId)}">♔</button>` : ''}
          ${canKick ? `<button class="chip icon-chip" title="${t('kickSymbolLabel')}" aria-label="${t('kickPlayer')}" data-act="kickParticipant" data-user-id="${esc(participant.userId)}">×</button>` : ''}
          ${canBan ? `<button class="chip icon-chip" title="${t('banSymbolLabel')}" aria-label="${t('banPlayer')}" data-act="banParticipant" data-user-id="${esc(participant.userId)}">⛔</button>` : ''}
        </div>` : ''}
      </div>
    </li>
  `;
};

const renderRoomPanel = () => {
  if (!state.activeRoom) return '';

  const participants = Array.isArray(state.activeRoom.participants) ? state.activeRoom.participants : [];
  const players = participants.filter((participant) => participant.role !== 'spectator');
  const spectators = participants.filter((participant) => participant.role === 'spectator');
  const isOwner = Boolean(state.user?.id) && state.user.id === state.activeRoom.ownerId;
  const myParticipant = participants.find((participant) => participant.userId === state.user?.id);
  const canToggleReady = myParticipant?.role === 'owner' || myParticipant?.role === 'player';
  const visibilityLabel = state.activeRoom.isPublic ? t('visibilityPublic') : t('visibilityPrivate');
  const accessLabel = state.activeRoom.hasPassword ? t('roomProtected') : t('roomOpenAccess');
  const playersLabel = `${players.length} / ${state.activeRoom.maxPlayers || 6}`;

  return `
    <article class="room-panel">
      <div class="room-panel-head">
        <div>
          <div class="hero-kicker">${t('roomDetails')}</div>
          <h3 class="room-title">${esc(state.activeRoom.name || t('roomDetails'))}</h3>
        </div>
        <div class="room-live-pill">${t('roomLiveSync')}</div>
      </div>
      <div class="room-meta room-meta-cards">
        <div class="room-stat-card room-stat-code">
          <span>${t('roomCode')}</span>
          <div class="room-stat-main room-code-row"><b>${esc(state.activeRoom.inviteCode || '—')}</b> ${isOwner ? `<button class="chip room-code-action icon-chip" title="${t('regenerateInvite')}" aria-label="${t('regenerateInvite')}" data-act="regenInvite">${t('regenerateInviteShort')}</button>` : ''}</div>
        </div>
        <div class="room-stat-card">
          <span>${t('roomOwnerName')}</span>
          <div class="room-stat-main">${esc(state.activeRoom.ownerUsername || state.activeRoom.ownerId || '—')}</div>
        </div>
        <div class="room-stat-card">
          <span>${t('roomVisibilityLabel')}</span>
          <div class="room-stat-main">${visibilityLabel}</div>
        </div>
        <div class="room-stat-card">
          <span>${t('roomAccessLabel')}</span>
          <div class="room-stat-main">${roomAccessSummary(state.activeRoom)}</div>
        </div>
        <div class="room-stat-card">
          <span>${t('roomStatsLabel')}</span>
          <div class="room-stat-main">${playersLabel}</div>
        </div>
      </div>
      <div class="room-lists">
        <div class="room-list-card">
          <h4>${t('roomParticipants')} (${players.length})</h4>
          <ul class="participant-list">${players.map(renderParticipant).join('')}</ul>
        </div>
        <div class="room-list-card">
          <h4>${t('roomSpectators')} (${spectators.length})</h4>
          <ul class="participant-list">${spectators.map(renderParticipant).join('')}</ul>
        </div>
      </div>
      <div class="stack">
        <h4>${t('roomActions')}</h4>
        <div class="room-actions">
          ${canToggleReady ? `<button class="secondary" data-act="readyRoom">${(myParticipant?.ready ? t('markNotReady') : t('markReady'))}</button>` : ''}
          ${isOwner ? `<button class="secondary" data-act="openRoomSettings">${t('openRoomSettings')}</button>` : ''}
          <button class="chip" data-act="leaveRoom">${isOwner ? t('closeOwnedRoom') : t('leaveRoom')}</button>
        </div>
      </div>
      <div id="roomStatus" class="status">${esc(state.roomStatusMessage || '')}</div>
    </article>
  `;
};

const renderRoomManage = () => {
  if (!state.activeRoom) {
    return '';
  }

  return `
    <div class="room-manage-layout">
      <article class="room-chat-wide">
        <div class="room-chat-head">
          <div>
            <h3>${t('roomChat')}</h3>
            <p class="room-section-hint">${t('roomChatHint')}</p>
          </div>
        </div>
        <div class="chat-log" id="roomChatLog">
          ${(state.roomChatMessages || []).length === 0 ? `<div class="chat-empty">${t('roomChatEmpty')}</div>` : (state.roomChatMessages || []).map((msg) => {
            const isSelf = msg.userId && state.user?.id && msg.userId === state.user.id;
            const lineClass = msg.role === 'system' ? 'system' : (isSelf ? 'self' : 'remote');
            const username = isSelf ? t('selfMessageLabel') : (msg.username || t('roleSystem'));
            return `<div class="chat-line ${lineClass}">
              <div class="chat-meta-row">
                <span class="chat-author">${esc(username)}</span>
                <span class="chat-time">${esc(formatClock(msg.timestamp))}</span>
              </div>
              <div class="chat-bubble">${esc(msg.text || '')}</div>
            </div>`;
          }).join('')}
        </div>
        <div class="row topgap">
          <input id="roomChatInput" placeholder="${t('chatPlaceholder')}" />
          <button class="primary" data-act="sendRoomChat">${t('send')}</button>
        </div>
      </article>
    </div>
    <div id="roomManageStatus" class="status"></div>
  `;
};

const renderRoomSettingsModal = () => {
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

export const renderHome = () => {
  return `
    ${renderHero()}
    ${renderLobbyRooms()}
  `;
};

export const renderLobbies = () => `
  <h2>${t('lobbyTitle')}</h2>
  <p>${t('lobbyHint')}</p>
  <article>
    <div class="row">
      <select id="lobbyPasswordFilter">
        <option value="all" ${state.lobbyFilters.password === 'all' ? 'selected' : ''}>${t('passwordAll')}</option>
        <option value="with_password" ${state.lobbyFilters.password === 'with_password' ? 'selected' : ''}>${t('passwordWith')}</option>
        <option value="without_password" ${state.lobbyFilters.password === 'without_password' ? 'selected' : ''}>${t('passwordWithout')}</option>
      </select>
      <input id="lobbyLimit" type="number" min="1" max="100" value="${state.lobbyFilters.limit}" />
      <button class="secondary" data-act="loadLobbies">${t('loadLobbies')}</button>
      <button class="chip" data-act="heroJoin">${t('connectCode')}</button>
    </div>
    <p class="room-section-hint">${t('lobbyCatalogHint')}</p>
  </article>
  <div class="lobby-list topgap">
    ${state.lobbyCatalog.length === 0 ? `<article><p>${t('lobbyNoItems')}</p></article>` : state.lobbyCatalog.map((room) => `
      <article class="lobby-item">
        <div class="lobby-icon">${room.isPublic ? '☀' : '☾'}</div>
        <div class="lobby-meta">
          <h4>${esc(room.name)}</h4>
          <p>${roomAccessSummary(room)}</p>
        </div>
        <div class="lobby-count">👥 ${room.playersCount} / ${room.maxPlayers || 6}</div>
        <button class="secondary" data-act="joinLobby" data-room-id="${esc(room.roomId)}" data-room-name="${esc(room.name)}" data-room-owner-id="${esc(room.ownerUserId || '')}" data-room-has-password="${room.hasPassword ? '1' : '0'}">${t('joinLobby')}</button>
      </article>
    `).join('')}
  </div>
`;

const renderJoinLobbyModal = () => {
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

const renderRoomSwitchModal = () => {
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
    </div>
    <div id="profileStatus" class="status"></div>
  `;
};

const renderRoomNotice = () => {
  if (!state.roomNoticeMessage) return '';

  return `<div class="room-notice">
    <span>${esc(state.roomNoticeMessage)}</span>
    <button class="chip" data-act="closeRoomNotice">${t('close')}</button>
  </div>`;
};

export const renderLayout = () => {
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
