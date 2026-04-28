const GAME_CARD_ACTIONS = {
  guard: {
    promptType: 'target_and_guess',
    confirmAction: 'confirmGuardPlay',
    targetAction: 'selectGuardTarget',
    summaryKey: 'guardPromptSummary',
    emptySummaryKey: 'guardPromptSummaryEmpty',
    titleKey: 'guardPromptTitle',
    hintKey: 'guardPromptHint',
    confirmKey: 'guardPromptConfirm',
  },
  scout: {
    promptType: 'target_only',
    confirmAction: 'confirmScoutPlay',
    targetAction: 'selectGuardTarget',
    summaryKey: 'scoutPromptSummary',
    titleKey: 'scoutPromptTitle',
    hintKey: 'scoutPromptHint',
    confirmKey: 'scoutPromptConfirm',
  },
  executioner: {
    promptType: 'target_only',
    confirmAction: 'confirmExecutionerPlay',
    targetAction: 'selectGuardTarget',
    summaryKey: 'executionerPromptSummary',
    titleKey: 'executionerPromptTitle',
    hintKey: 'executionerPromptHint',
    confirmKey: 'executionerPromptConfirm',
  },
  rebel: {
    promptType: 'target_only',
    includeSelf: true,
    confirmAction: 'confirmRebelPlay',
    targetAction: 'selectGuardTarget',
    summaryKey: 'rebelPromptSummary',
    titleKey: 'rebelPromptTitle',
    hintKey: 'rebelPromptHint',
    confirmKey: 'rebelPromptConfirm',
  },
  feudal_lord: {
    promptType: 'double_target',
    includeSelf: true,
    confirmAction: 'confirmFeudalPlay',
    targetAction: 'selectFeudalTarget',
    summaryKey: 'feudalPromptSummary',
    titleKey: 'feudalPromptTitle',
    hintKey: 'feudalPromptHint',
    confirmKey: 'feudalPromptConfirm',
  },
};

export const getGameCardActionConfig = (cardCode) => GAME_CARD_ACTIONS[cardCode] || null;

export const isInteractiveMatchCard = (cardCode) => Boolean(getGameCardActionConfig(cardCode));
