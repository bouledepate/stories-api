import { state } from '../../state';
import { t } from '../../i18n';
import { esc } from '../../security';

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
