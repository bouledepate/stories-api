import { t } from '../../i18n';
import { safeTextValue } from '../../security';
import { state } from '../../state';
import { clearFieldError, markFieldError, setStatus, showApiError } from '../../services/feedback';
import {
  clearSessionState,
  setActiveTab,
  setAuthModalState,
  setLanguage,
  setRoomNoticeMessage,
  setRoomSettingsOpen,
  setSocket,
} from '../../store/mutations';
import { openAuth } from './ui-state';
import {
  bindRoomModalEvents,
  closeJoinLobbyModal,
  closeRoomModal,
  closeRoomSwitchPrompt,
  executeJoinLobbyRequest,
  leaveCurrentRoom,
  openRoomModal,
  openRoomSwitchPrompt,
  runPendingJoinAction,
} from '../rooms/room-flow';
import { isSameActiveRoom } from '../../store/selectors';

export const bindCommonEvents = (render) => {
  document.querySelectorAll('[data-tab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      setActiveTab(btn.dataset.tab);
      render();
    });
  });

  document.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      setLanguage(btn.dataset.lang);
      render();
    });
  });

  document.querySelector('[data-act="toggleAuth"]')?.addEventListener('click', () => openAuth(render, 'login'));

  document.querySelectorAll('[data-act="heroCreate"]').forEach((node) => {
    node.addEventListener('click', () => {
      if (!state.user) return openAuth(render, 'login');
      if (state.activeRoom?.roomId) {
        openRoomSwitchPrompt(render, {
          kind: 'open_create_modal',
          targetLabel: t('createRoom'),
        });
        return;
      }
      openRoomModal(render, 'create');
    });
  });

  document.querySelectorAll('[data-act="heroJoin"]').forEach((node) => {
    node.addEventListener('click', () => {
      if (!state.user) return openAuth(render, 'login');
      openRoomModal(render, 'join');
    });
  });

  document.querySelectorAll('[data-act="closeAuth"]').forEach((node) => {
    node.addEventListener('click', () => {
      setAuthModalState({ open: false });
      render();
    });
  });

  document.querySelector('[data-act="closeRoomNotice"]')?.addEventListener('click', () => {
    setRoomNoticeMessage('');
    render();
  });

  document.querySelector('[data-act="logout"]')?.addEventListener('click', () => {
    clearSessionState();
    if (state.socket?.readyState === WebSocket.OPEN) {
      state.socket.close();
    }
    setSocket(null);
    render();
  });

  document.querySelectorAll('[data-act="closeRoomModal"]').forEach((node) => {
    node.addEventListener('click', () => closeRoomModal(render));
  });

  document.querySelectorAll('[data-act="closeRoomSettings"]').forEach((node) => {
    node.addEventListener('click', () => {
      setRoomSettingsOpen(false);
      render();
    });
  });

  document.querySelectorAll('[data-act="closeJoinLobbyModal"]').forEach((node) => {
    node.addEventListener('click', () => closeJoinLobbyModal(render));
  });

  document.querySelectorAll('[data-act="closeRoomSwitchModal"], [data-act="cancelRoomSwitch"]').forEach((node) => {
    node.addEventListener('click', () => closeRoomSwitchPrompt(render));
  });

  document.querySelector('[data-act="confirmJoinLobby"]')?.addEventListener('click', async () => {
    if (!state.joinLobbyRoomId) return;
    clearFieldError('#lobbyJoinPassword');
    const password = safeTextValue('#lobbyJoinPassword', 128);
    if (state.joinLobbyNeedsPassword && password === '') {
      markFieldError('#lobbyJoinPassword', t('requiredField'));
      setStatus('joinLobbyStatus', t('requiredField'));
      return;
    }
    if (state.activeRoom?.roomId && !isSameActiveRoom(state.joinLobbyRoomId)) {
      openRoomSwitchPrompt(render, {
        kind: 'lobby',
        roomId: state.joinLobbyRoomId,
        ownerUserId: state.joinLobbyOwnerUserId,
        password,
        targetLabel: state.joinLobbyRoomName || state.joinLobbyRoomId,
      });
      return;
    }
    const ok = await executeJoinLobbyRequest(render, state.joinLobbyRoomId, state.joinLobbyOwnerUserId, password, 'joinLobbyStatus');
    if (ok) closeJoinLobbyModal(render);
  });

  document.querySelector('[data-act="confirmRoomSwitch"]')?.addEventListener('click', async () => {
    try {
      await leaveCurrentRoom();
      await runPendingJoinAction(render);
    } catch (e) {
      showApiError('roomSwitchStatus', e);
    }
  });

  if (state.roomModalOpen && state.user) {
    bindRoomModalEvents(render);
  }
};
