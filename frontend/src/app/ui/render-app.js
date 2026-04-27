import {
  bindAuthEvents,
  bindCommonEvents,
  bindGameEvents,
  bindHomeEvents,
  bindLobbyEvents,
  bindProfileEvents,
  bindRoomManagePageEvents,
} from '../events';
import { state } from '../state';
import { setRoomChatInputShouldFocus } from '../store/mutations';
import { renderLayout } from '../views';

export const createRenderer = (app, loadMe, syncMyRooms) => {
  const render = () => {
    if (!app) return;
    syncMyRooms();

    app.innerHTML = renderLayout();

    bindCommonEvents(render);
    if (state.activeTab === 'home') bindHomeEvents(render);
    if (state.activeTab === 'lobbies') bindLobbyEvents(render);
    if (state.activeTab === 'profile') bindProfileEvents(render);
    if (state.activeTab === 'roomManage') bindRoomManagePageEvents(render);
    if (state.activeTab === 'game') bindGameEvents(render);
    if (state.authOpen && !state.user) bindAuthEvents(render, loadMe);

    if (state.roomChatInputShouldFocus && state.activeTab === 'roomManage') {
      window.requestAnimationFrame(() => {
        const input = document.querySelector('#roomChatInput');
        if (input instanceof HTMLInputElement) {
          input.focus();
          input.setSelectionRange(input.value.length, input.value.length);
        }
        setRoomChatInputShouldFocus(false);
      });
    }
  };

  return render;
};
