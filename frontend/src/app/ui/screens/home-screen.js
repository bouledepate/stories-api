import { state } from '../../state';
import { t } from '../../i18n';
import { esc } from '../../security';
import { roomAccessSummary } from '../shared/view-helpers';

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
              <p>${t('roomOwnerName')}: ${esc(room.ownerUsername || room.ownerUserId || '—')}</p>
            </div>
            <div class="lobby-count">👥 ${room.playersCount} / ${room.maxPlayers || 6}</div>
            <button class="secondary" data-act="joinLobby" data-room-id="${esc(room.roomId)}" data-room-name="${esc(room.name)}" data-room-owner-id="${esc(room.ownerUserId || '')}" data-room-has-password="${room.hasPassword ? '1' : '0'}">${t('joinLobby')}</button>
          </article>
        `).join('')}
      </div>
    </section>
  `;
};

export const renderHome = () => `
  ${renderHero()}
  ${renderLobbyRooms()}
`;
