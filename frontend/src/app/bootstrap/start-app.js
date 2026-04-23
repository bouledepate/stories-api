import { ensureLobbyRealtime } from '../events';
import { state } from '../state';
import { loadLobbies, loadMe, restoreActiveRoom, syncMyRooms } from './session';
import { createRenderer } from '../ui/render-app';

export const startApp = async () => {
  const app = document.querySelector('#app');
  const render = createRenderer(app, loadMe, syncMyRooms);

  await loadMe();
  await restoreActiveRoom();
  await loadLobbies('home', 4);
  await loadLobbies('catalog', state.lobbyFilters.limit, state.lobbyFilters.password);
  syncMyRooms();
  ensureLobbyRealtime(async () => {
    await loadLobbies('home', 4);
    await loadLobbies('catalog', state.lobbyFilters.limit, state.lobbyFilters.password);
    syncMyRooms();
  }, render);
  render();
};
