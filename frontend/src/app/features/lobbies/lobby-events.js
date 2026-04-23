import { callApi } from '../../api';
import { t } from '../../i18n';
import { safeTextValue } from '../../security';
import { state } from '../../state';
import { setStatus, showApiError } from '../../services/feedback';
import { setLobbyCatalog, setLobbyFilters } from '../../store/mutations';
import { openAuth } from '../common/ui-state';
import { isSameActiveRoom, openJoinLobbyModal, returnToCurrentRoom } from '../rooms/room-flow';

export const bindLobbyEvents = (render) => {
  const loadLobbies = async () => {
    try {
      setLobbyCatalog((await callApi(
        `/lobbies?visibility=public&password=${encodeURIComponent(state.lobbyFilters.password)}&limit=${state.lobbyFilters.limit}`
      )).items || []);
      setStatus('lobbyStatus', t('ready'), true);
      render();
    } catch (e) {
      showApiError('lobbyStatus', e);
    }
  };

  document.querySelector('[data-act="loadLobbies"]')?.addEventListener('click', async () => {
    setLobbyFilters({
      password: safeTextValue('#lobbyPasswordFilter', 20) || 'all',
      limit: Number(safeTextValue('#lobbyLimit', 3) || '20'),
    });
    await loadLobbies();
  });

  document.querySelectorAll('[data-act="joinLobby"]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (!state.user) return openAuth(render, 'login');
      const roomId = btn.dataset.roomId;
      if (!roomId) return;
      if (isSameActiveRoom(roomId)) {
        returnToCurrentRoom(render);
        return;
      }

      openJoinLobbyModal(render, {
        roomId,
        roomName: btn.dataset.roomName || roomId,
        ownerUserId: btn.dataset.roomOwnerId || '',
        needsPassword: btn.dataset.roomHasPassword === '1',
      });
    });
  });
};
