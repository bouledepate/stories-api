import { state } from '../state';

export const sendSocketMessage = (payload) => {
  if (!state.socket || state.socket.readyState !== WebSocket.OPEN) return;
  state.socket.send(JSON.stringify({
    ...payload,
    token: state.token || undefined,
  }));
};

export const emitLobbiesChanged = (event, data = {}) => {
  sendSocketMessage({
    type: 'lobbies_event',
    event,
    data,
  });
};

export const subscribeRoomSocket = (roomId) => {
  if (!roomId) return;
  sendSocketMessage({ type: 'subscribe_room', roomId });
};
