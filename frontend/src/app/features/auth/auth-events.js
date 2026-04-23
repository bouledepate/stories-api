import { callApi } from '../../api';
import { t } from '../../i18n';
import { safeTextValue } from '../../security';
import { state } from '../../state';
import { setStatus, showApiError } from '../../services/feedback';
import {
  setActiveRoom,
  setActiveTab,
  setAuthModalState,
  setSuppressOwnJoinPresence,
  setToken,
} from '../../store/mutations';
import { openAuth } from '../common/ui-state';
import { clearActiveRoomState } from '../rooms/room-flow';

export const bindAuthEvents = async (render, loadMe) => {
  document.querySelector('[data-act="switchAuthMode"]')?.addEventListener('click', () => {
    setAuthModalState({ mode: state.authMode === 'login' ? 'register' : 'login' });
    render();
  });

  document.querySelector('[data-act="authSubmit"]')?.addEventListener('click', async () => {
    const endpoint = state.authMode === 'login' ? '/auth/login' : '/auth/register';
    const successMessage = state.authMode === 'login' ? t('loginSuccess') : t('registerSuccess');

    try {
      const data = await callApi(endpoint, {
        method: 'POST',
        body: JSON.stringify({
          username: safeTextValue('#authUsername', 64),
          password: safeTextValue('#authPassword', 128),
        }),
      });

      setToken(data.accessToken);
      await loadMe();
      try {
        const currentRoom = await callApi('/rooms/current');
        if (currentRoom?.roomId) {
          setActiveRoom(currentRoom);
          setActiveTab('roomManage');
          setSuppressOwnJoinPresence(true);
        } else {
          clearActiveRoomState();
        }
      } catch {
        clearActiveRoomState();
      }
      setStatus('authStatus', successMessage, true);
      setAuthModalState({ open: false });
      render();
    } catch (error) {
      showApiError('authStatus', error);
    }
  });
};
