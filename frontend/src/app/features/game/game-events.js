import { state } from '../../state';
import { t } from '../../i18n';
import { showToast } from '../../services/feedback';
import { getActiveMatchOpponents, getTargetableMatchPlayers, isMyTurnInMatch } from '../../store/selectors';
import { patchGameCardPlayPrompt, setActiveTab, setGameCardPlayPrompt, setGameCardPreview, setGameChatOpen, setGameChatUnreadCount } from '../../store/mutations';
import { matchCardCatalog } from './card-catalog';
import { leaveFinishedMatchRoom, leaveGameAndRoom, playMatchCard, sendGameChatMessage, startMatchFromRoom, syncGameChatScroll } from './game-flow';

export const bindGameEvents = (render) => {
  document.querySelector('[data-act="toggleGameChat"]')?.addEventListener('click', () => {
    const nextOpen = !state.gameChatOpen;
    setGameChatOpen(nextOpen);
    if (nextOpen) {
      setGameChatUnreadCount(0);
    }
    render();
    if (nextOpen) {
      syncGameChatScroll();
    }
  });

  document.querySelector('[data-act="closeGameChatBackdrop"]')?.addEventListener('click', () => {
    setGameChatOpen(false);
    render();
  });

  document.querySelector('[data-act="closeGameCardPreview"]')?.addEventListener('click', () => {
    setGameCardPreview(null);
    render();
  });

  document.querySelector('[data-act="closeGameCardPlayPrompt"]')?.addEventListener('click', () => {
    setGameCardPlayPrompt(null);
    render();
  });

  document.querySelector('.game-card-preview-shell')?.addEventListener('click', (event) => {
    if (event.target !== event.currentTarget) return;
    setGameCardPreview(null);
    render();
  });

  document.querySelector('.game-card-play-prompt-shell')?.addEventListener('click', (event) => {
    if (event.target !== event.currentTarget) return;
    setGameCardPlayPrompt(null);
    render();
  });

  document.querySelector('[data-act="exitGame"]')?.addEventListener('click', async () => {
    // eslint-disable-next-line no-alert
    const confirmed = window.confirm(t('gameExitConfirm'));
    if (!confirmed) return;
    await leaveGameAndRoom(render);
  });

  document.querySelector('[data-act="leaveFinishedMatch"]')?.addEventListener('click', async () => {
    await leaveFinishedMatchRoom(render);
  });

  document.querySelector('[data-act="playAgainMatch"]')?.addEventListener('click', async () => {
    if (state.activeRoom?.ownerId !== state.user?.id) {
      showToast(t('gamePlayAgainOwnerOnly'));
      return;
    }

    await startMatchFromRoom(render);
  });

  document.querySelector('[data-act="returnToRoomAfterMatch"]')?.addEventListener('click', () => {
    setActiveTab('roomManage');
    render();
  });

  document.querySelectorAll('[data-act="playCard"]').forEach((button) => {
    button.addEventListener('click', async () => {
      if (!isMyTurnInMatch()) {
        showToast(t('notPlayerTurn'));
        return;
      }

      if (button.dataset.cardLocked === 'true') {
        showToast(t('cardPlayBlocked'));
        return;
      }

      const cardCode = button.dataset.cardCode || '';
      const cardInstanceId = button.dataset.cardInstanceId || '';
      if (cardCode !== 'guard' && cardCode !== 'scout' && cardCode !== 'executioner' && cardCode !== 'rebel' && cardCode !== 'feudal_lord') {
        await playMatchCard(render, cardCode, { cardInstanceId });
        return;
      }

      const targets = cardCode === 'rebel' || cardCode === 'feudal_lord'
        ? getTargetableMatchPlayers({ includeSelf: true })
        : getActiveMatchOpponents();
      if (targets.length === 0 || (cardCode === 'feudal_lord' && targets.length < 2)) {
        if (cardCode === 'guard' || cardCode === 'scout' || cardCode === 'executioner' || cardCode === 'feudal_lord') {
          await playMatchCard(render, cardCode, { cardInstanceId });
          return;
        }

        showToast(t('rebelTargetUnavailable'));
        return;
      }

      setGameCardPlayPrompt({
        cardCode,
        cardInstanceId,
        targetUserId: targets[0]?.userId || '',
        secondTargetUserId: cardCode === 'feudal_lord' ? targets[1]?.userId || '' : '',
        guessedCardCode: '',
      });
      render();
    });
  });

  document.querySelectorAll('[data-act="selectGuardTarget"]').forEach((button) => {
    button.addEventListener('click', () => {
      patchGameCardPlayPrompt({ targetUserId: button.dataset.userId || '' });
      render();
    });
  });

  document.querySelectorAll('[data-act="selectGuardGuess"]').forEach((button) => {
    button.addEventListener('click', () => {
      patchGameCardPlayPrompt({ guessedCardCode: button.dataset.cardCode || '' });
      render();
    });
  });

  document.querySelector('[data-act="confirmGuardPlay"]')?.addEventListener('click', async () => {
    const prompt = state.gameCardPlayPrompt;
    if (!prompt?.targetUserId) {
      showToast(t('targetPlayerRequired'));
      return;
    }
    if (!prompt?.guessedCardCode || !matchCardCatalog.some((card) => card.code === prompt.guessedCardCode && card.code !== 'guard')) {
      showToast(t('guardGuessRequired'));
      return;
    }

    await playMatchCard(render, prompt.cardCode || 'guard', {
      targetUserId: prompt.targetUserId,
      guessedCardCode: prompt.guessedCardCode,
      cardInstanceId: prompt.cardInstanceId,
    });
  });

  document.querySelector('[data-act="confirmScoutPlay"]')?.addEventListener('click', async () => {
    const prompt = state.gameCardPlayPrompt;
    if (!prompt?.targetUserId) {
      showToast(t('targetPlayerRequired'));
      return;
    }

    await playMatchCard(render, prompt.cardCode || 'scout', {
      targetUserId: prompt.targetUserId,
      cardInstanceId: prompt.cardInstanceId,
    });
  });

  document.querySelector('[data-act="confirmExecutionerPlay"]')?.addEventListener('click', async () => {
    const prompt = state.gameCardPlayPrompt;
    if (!prompt?.targetUserId) {
      showToast(t('targetPlayerRequired'));
      return;
    }

    await playMatchCard(render, prompt.cardCode || 'executioner', {
      targetUserId: prompt.targetUserId,
      cardInstanceId: prompt.cardInstanceId,
    });
  });

  document.querySelector('[data-act="confirmRebelPlay"]')?.addEventListener('click', async () => {
    const prompt = state.gameCardPlayPrompt;
    if (!prompt?.targetUserId) {
      showToast(t('targetPlayerRequired'));
      return;
    }

    await playMatchCard(render, prompt.cardCode || 'rebel', {
      targetUserId: prompt.targetUserId,
      cardInstanceId: prompt.cardInstanceId,
    });
  });

  document.querySelectorAll('[data-act="selectFeudalTarget"]').forEach((button) => {
    button.addEventListener('click', () => {
      const userId = button.dataset.userId || '';
      const prompt = state.gameCardPlayPrompt;
      if (!prompt || userId === '') return;

      if (prompt.targetUserId === userId) {
        patchGameCardPlayPrompt({ targetUserId: prompt.secondTargetUserId || '', secondTargetUserId: '' });
        render();
        return;
      }

      if (prompt.secondTargetUserId === userId) {
        patchGameCardPlayPrompt({ secondTargetUserId: '' });
        render();
        return;
      }

      if (!prompt.targetUserId) {
        patchGameCardPlayPrompt({ targetUserId: userId });
        render();
        return;
      }

      patchGameCardPlayPrompt({ secondTargetUserId: userId });
      render();
    });
  });

  document.querySelector('[data-act="confirmFeudalPlay"]')?.addEventListener('click', async () => {
    const prompt = state.gameCardPlayPrompt;
    if (!prompt?.targetUserId || !prompt?.secondTargetUserId || prompt.targetUserId === prompt.secondTargetUserId) {
      showToast(t('feudalPromptNeedTwoTargets'));
      return;
    }

    await playMatchCard(render, prompt.cardCode || 'feudal_lord', {
      targetUserId: prompt.targetUserId,
      secondTargetUserId: prompt.secondTargetUserId,
      cardInstanceId: prompt.cardInstanceId,
    });
  });

  document.querySelector('[data-act="confirmFeudalSwap"]')?.addEventListener('click', async () => {
    await playMatchCard(render, 'feudal_lord', { shouldSwap: true });
  });

  document.querySelector('[data-act="confirmFeudalKeep"]')?.addEventListener('click', async () => {
    await playMatchCard(render, 'feudal_lord', { shouldSwap: false });
  });

  document.querySelectorAll('[data-act="previewDiscardCard"]').forEach((button) => {
    button.addEventListener('click', () => {
      setGameCardPreview({
        ownerName: button.dataset.ownerName || '',
        cardName: button.dataset.cardName || '',
        cardCode: button.dataset.cardCode || '',
        cardValue: Number(button.dataset.cardValue || 0),
      });
      render();
    });
  });

  document.querySelector('[data-act="sendGameChat"]')?.addEventListener('click', () => {
    sendGameChatMessage(render);
    syncGameChatScroll();
  });

  document.querySelector('#gameChatInput')?.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' || event.shiftKey) return;
    event.preventDefault();
    sendGameChatMessage(render);
    syncGameChatScroll();
  });
};
