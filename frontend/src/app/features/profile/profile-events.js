import { callApi } from '../../api';
import { t } from '../../i18n';
import { safeTextValue } from '../../security';
import { setStatus, showApiError } from '../../services/feedback';
import { setUser } from '../../store/mutations';
import { activateRoomState, isSameActiveRoom, returnToCurrentRoom } from '../rooms/room-flow';

export const bindProfileEvents = (render) => {
  document.querySelectorAll('[data-act="openOwnedRoom"]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      try {
        const roomId = btn.dataset.roomId;
        if (!roomId) return;
        if (isSameActiveRoom(roomId)) {
          returnToCurrentRoom(render);
          return;
        }
        const room = await callApi(`/rooms/${encodeURIComponent(roomId)}`);
        activateRoomState(room, { resetChat: false });
        render();
      } catch (e) {
        showApiError('profileStatus', e);
      }
    });
  });

  document.querySelector('[data-act="saveProfile"]')?.addEventListener('click', async () => {
    try {
      const username = safeTextValue('#profileUsername', 64);
      setUser(await callApi('/auth/me', {
        method: 'PATCH',
        body: JSON.stringify({ username }),
      }));
      setStatus('profileStatus', t('profileUpdated'), true);
      render();
    } catch (e) {
      showApiError('profileStatus', e);
    }
  });

  document.querySelector('[data-act="changePassword"]')?.addEventListener('click', async () => {
    try {
      await callApi('/auth/change-password', {
        method: 'POST',
        body: JSON.stringify({
          currentPassword: safeTextValue('#currentPassword', 128),
          newPassword: safeTextValue('#nextPassword', 128),
        }),
      });
      const currentField = document.querySelector('#currentPassword');
      const nextField = document.querySelector('#nextPassword');
      if (currentField) currentField.value = '';
      if (nextField) nextField.value = '';
      setStatus('profileStatus', t('passwordChanged'), true);
    } catch (e) {
      showApiError('profileStatus', e);
    }
  });
};
