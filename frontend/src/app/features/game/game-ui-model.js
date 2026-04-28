import { getCurrentRound, getMyMatchRoundPlayer, getTargetableMatchPlayers } from '../../store/selectors';
import { state } from '../../state';
import { findCatalogCard, matchCardCatalog } from './card-catalog';
import { getGameCardActionConfig } from './game-action-config';

const buildVisibleCardCounts = () => {
  const round = getCurrentRound();
  const counts = new Map();
  const addCard = (card) => {
    const code = card?.code || '';
    if (!code) return;
    counts.set(code, Number(counts.get(code) || 0) + 1);
  };

  const revealedCards = Array.isArray(round?.revealedCards) ? round.revealedCards : [];
  revealedCards.forEach(addCard);
  const removedDecreeCards = Array.isArray(round?.removedDecreeCards) ? round.removedDecreeCards : [];
  removedDecreeCards.forEach(addCard);

  const roundPlayers = Array.isArray(round?.players) ? round.players : [];
  roundPlayers.forEach((player) => {
    const discard = Array.isArray(player?.discard) ? player.discard : [];
    discard.forEach(addCard);
  });

  const myHand = Array.isArray(getMyMatchRoundPlayer()?.hand) ? getMyMatchRoundPlayer().hand : [];
  myHand.forEach(addCard);

  return counts;
};

export const isFreeInterrogationActive = () => (
  getCurrentRound()?.activeDecrees || []
).some((decree) => decree?.code === 'free_interrogation' && !decree?.suppressedByQueen);

export const isPeasantBestFriendActive = () => (
  getCurrentRound()?.activeDecrees || state.activeMatch?.activeDecrees || []
).some((decree) => decree?.code === 'peasant_best_friend' && !decree?.suppressedByQueen);

export const getAvailableGuardGuessCards = ({ allowGuard = isFreeInterrogationActive() } = {}) => {
  const visibleCounts = buildVisibleCardCounts();

  return matchCardCatalog.filter((card) => {
    if (card.code === 'guard' && !allowGuard) return false;
    return Number(visibleCounts.get(card.code) || 0) < Number(card.copies || 0);
  });
};

export const getGamePromptModel = (prompt) => {
  if (!prompt?.cardCode) {
    return null;
  }

  const config = getGameCardActionConfig(prompt.cardCode);
  if (!config) {
    return null;
  }

  const targets = getTargetableMatchPlayers({ includeSelf: Boolean(config.includeSelf) });
  const availableGuesses = config.promptType === 'target_and_guess' ? getAvailableGuardGuessCards() : [];
  const selectedGuess = config.promptType === 'target_and_guess'
    ? findCatalogCard(prompt.guessedCardCode)
    : null;

  return {
    ...config,
    cardCode: prompt.cardCode,
    cardInstanceId: prompt.cardInstanceId || '',
    targetUserId: prompt.targetUserId || '',
    secondTargetUserId: prompt.secondTargetUserId || '',
    guessedCardCode: prompt.guessedCardCode || '',
    targets,
    availableGuesses,
    selectedGuess,
    requiresGuess: config.promptType === 'target_and_guess',
    requiresSecondTarget: config.promptType === 'double_target',
  };
};
