import { callApi } from '../../api';
import { t } from '../../i18n';
import { state } from '../../state';
import { showToast } from '../../services/feedback';
import {
  setActiveRoom,
  setActiveTab,
  setRoomNoticeMessage,
  setSocket,
  setSuppressOwnJoinPresence,
} from '../../store/mutations';
import { sendSocketMessage, subscribeRoomSocket } from '../../services/socket';
import {
  clearActiveRoomState,
  pushRoomChatMessage,
  pushSystemRoomEvent,
  syncChatScroll,
  systemPresenceText,
} from '../rooms/room-flow';

export const ensureLobbyRealtime = (refreshLobbies, render) => {
  if (state.socket?.readyState === WebSocket.OPEN || state.socket?.readyState === WebSocket.CONNECTING) return;

  setSocket(new WebSocket(state.wsUrl));

  state.socket.onopen = () => {
    sendSocketMessage({ type: 'subscribe_lobbies' });
    if (state.activeRoom?.roomId) {
      subscribeRoomSocket(state.activeRoom.roomId);
    }
  };

  state.socket.onmessage = async (event) => {
    let payload;
    try {
      payload = JSON.parse(event.data);
    } catch {
      return;
    }

    if (payload?.type === 'lobbies_event') {
      await refreshLobbies();

      const changedRoomId = payload?.data?.roomId;
      const changedUserId = payload?.data?.userId;
      const changedUsername = payload?.data?.username || payload?.username || t('systemUnknownUser');
      if (
        changedRoomId
        && state.activeRoom?.roomId === changedRoomId
        && changedUserId
        && state.user?.id === changedUserId
        && (payload?.event === 'room_participant_kicked' || payload?.event === 'room_participant_banned')
      ) {
        clearActiveRoomState();
        setActiveTab('home');
        const message = payload?.event === 'room_participant_banned' ? t('blockedNotice') : t('kickedFromRoomNotice');
        setRoomNoticeMessage(message);
        showToast(message);
        render();

        return;
      }

      if (changedRoomId && state.activeRoom?.roomId === changedRoomId) {
        if (
          payload?.event === 'room_settings_updated'
          || payload?.event === 'room_ownership_transferred'
          || payload?.event === 'room_participant_kicked'
          || payload?.event === 'room_participant_banned'
        ) {
          const isOwnEvent = payload?.data?.actorUserId && payload.data.actorUserId === state.user?.id;
          if (!isOwnEvent) {
            pushSystemRoomEvent(payload.event, {
              username: changedUsername,
              timestamp: payload?.timestamp,
            });
          }
        }
        try {
          setActiveRoom(await callApi(`/rooms/${encodeURIComponent(changedRoomId)}`));
        } catch {
          clearActiveRoomState();
          setActiveTab('home');
          setRoomNoticeMessage(t('roomClosedNotice'));
          showToast(t('roomClosedNotice'));
        }
      }

      if (state.activeTab === 'home' || state.activeTab === 'lobbies' || state.activeTab === 'profile' || state.activeTab === 'roomManage') {
        render();
      }
      return;
    }

    if (payload?.type === 'room_event' && payload?.roomId && state.activeRoom?.roomId === payload.roomId) {
      if (payload?.event === 'access_denied') {
        clearActiveRoomState();
        setActiveTab('home');
        const message = payload?.data?.reason === 'banned' ? t('blockedNotice') : t('kickedFromRoomNotice');
        setRoomNoticeMessage(message);
        showToast(message);
        render();

        return;
      }

      if (payload?.event === 'chat_message' && payload?.data?.text) {
        pushRoomChatMessage({
          username: payload?.data?.username || payload?.username || 'user',
          role: payload?.data?.role || 'player',
          userId: payload?.userId || null,
          text: payload?.data?.text || '',
          timestamp: payload?.timestamp,
        });
        if (state.activeTab === 'roomManage') {
          render();
          syncChatScroll();
        }
        return;
      }
      try {
        setActiveRoom(await callApi(`/rooms/${encodeURIComponent(payload.roomId)}`));
        render();
      } catch {
        clearActiveRoomState();
        setActiveTab('home');
        setRoomNoticeMessage(t('roomClosedNotice'));
        showToast(t('roomClosedNotice'));
        render();
      }
      return;
    }

    if (payload?.type === 'presence' && payload?.roomId && state.activeRoom?.roomId === payload.roomId) {
      if (payload?.event === 'joined' && state.suppressOwnJoinPresence && payload?.username === state.user?.username) {
        setSuppressOwnJoinPresence(false);
        return;
      }
      pushRoomChatMessage({
        username: t('roleSystem'),
        role: 'system',
        text: systemPresenceText(payload),
        timestamp: payload?.timestamp,
      });
      if (state.activeTab === 'roomManage') {
        render();
        syncChatScroll();
      }
    }
  };

  state.socket.onclose = () => {
    setSocket(null);
    window.setTimeout(() => ensureLobbyRealtime(refreshLobbies, render), 3000);
  };
};
