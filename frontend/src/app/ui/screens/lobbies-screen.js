import { state } from '../../state';
import { t } from '../../i18n';
import { esc } from '../../security';
import { roomAccessSummary } from '../shared/view-helpers';

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
