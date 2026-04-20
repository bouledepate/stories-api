import './styles/main.scss';
import { callApi } from './app/api';
import {
  bindAdminEvents,
  bindAuthEvents,
  bindCommonEvents,
  bindDebugEvents,
  bindHomeEvents,
  bindLobbyEvents,
  bindProfileEvents,
} from './app/events';
import { renderLayout } from './app/views';
import { state } from './app/state';

const app = document.querySelector('#app');

const loadMe = async () => {
  if (!state.token) return;

  try {
    state.user = await callApi('/auth/me');
  } catch {
    state.user = null;
    state.token = '';
    localStorage.removeItem('stories_token');
  }
};

const render = () => {
  if (!app) return;

  app.innerHTML = renderLayout();

  bindCommonEvents(render);
  if (state.activeTab === 'home') bindHomeEvents(render);
  if (state.activeTab === 'lobbies') bindLobbyEvents(render);
  if (state.activeTab === 'profile') bindProfileEvents(render);
  if (state.activeTab === 'control' && state.user?.role === 'admin') {
    bindAdminEvents();
    bindDebugEvents();
  }
  if (state.authOpen && !state.user) bindAuthEvents(render, loadMe);
};

const loadLobbies = async (visibility = 'public', limit = 4) => {
  try {
    const data = await callApi(`/lobbies?visibility=${encodeURIComponent(visibility)}&limit=${limit}`);
    if (visibility === 'public') state.homeLobbies = data.items || [];
    if (visibility === 'all') state.lobbyCatalog = data.items || [];
  } catch {
    if (visibility === 'public') state.homeLobbies = [];
    if (visibility === 'all') state.lobbyCatalog = [];
  }
};

await loadMe();
await loadLobbies('public', 4);
await loadLobbies('all', state.lobbyFilters.limit);
render();
