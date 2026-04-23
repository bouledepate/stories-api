import { setAuthModalState } from '../../store/mutations';

export const openAuth = (render, mode = 'login') => {
  setAuthModalState({ open: true, mode });
  render();
};
