import { t } from '../../i18n';
import { esc } from '../../security';
import { state } from '../../state';
import { getCurrentRound, getMyMatchRoundPlayer, isMyTurnInMatch } from '../../store/selectors';
import { getAvailableGuardGuessCards, getGamePromptModel, isPeasantBestFriendActive } from '../../features/game/game-ui-model';

const highlightName = (text) => `<span class="event-actor">${esc(text)}</span>`;
const highlightCard = (text) => `<span class="event-card">${esc(text)}</span>`;
const resolvePlayerName = (userId) => {
  const players = Array.isArray(state.activeMatch?.players) ? state.activeMatch.players : [];
  return players.find((item) => item.userId === userId)?.username || userId || t('systemUnknownUser');
};

const renderDiscardCard = (card, ownerName, index) => `
  <button
    class="discard-stack-card"
    data-act="previewDiscardCard"
    data-card-code="${esc(card.code || '')}"
    data-card-name="${esc(card.name || card.code || '')}"
    data-card-value="${esc(String(card.value ?? 0))}"
    data-owner-name="${esc(ownerName || '')}"
    style="--stack-index:${esc(String(index))}"
    title="${esc(card.name || card.code || '')}"
  >
    <span class="discard-stack-card-value">${esc(String(card.value ?? 0))}</span>
    <span class="discard-stack-card-name">${esc(card.name || card.code || '')}</span>
  </button>
`;

const renderFaceUpCard = (card, ownerName, className = 'showdown-card') => `
  <button
    class="${className}"
    data-act="previewDiscardCard"
    data-card-code="${esc(card.code || '')}"
    data-card-name="${esc(card.name || card.code || '')}"
    data-card-value="${esc(String(card.value ?? 0))}"
    data-owner-name="${esc(ownerName || '')}"
    title="${esc(card.name || card.code || '')}"
  >
    <span class="${className}-value">${esc(String(card.value ?? 0))}</span>
    <span class="${className}-name">${esc(card.name || card.code || '')}</span>
  </button>
`;

const renderStaticFaceUpCard = (card, className = 'showdown-card', valueClass = 'showdown-card-value', nameClass = 'showdown-card-name') => `
  <div class="${className} static-card" aria-hidden="true">
    <span class="${valueClass}">${esc(String(card?.value ?? 0))}</span>
    <span class="${nameClass}">${esc(card?.name || card?.code || '')}</span>
  </div>
`;

const targetPoints = (playersCount) => {
  if (playersCount <= 2) return 7;
  if (playersCount === 3) return 6;
  if (playersCount === 4) return 5;
  return 4;
};

const formatEventLine = (event) => {
  if (event.type === 'system' || event.type === 'round_summary') return esc(event.text || '');
  if (event.type === 'card_played') {
    const actorName = resolvePlayerName(event.actorUserId);
    return `${highlightName(actorName)}: ${t('playedCardEvent', { card: highlightCard(event.cardName || event.cardCode || 'card') })}`;
  }
  if (event.type === 'guard_guess_hit') {
    const actorName = resolvePlayerName(event.actorUserId);
    const targetName = resolvePlayerName(event.targetUserId);
    return t('guardHitEvent', {
      actor: highlightName(actorName),
      target: highlightName(targetName),
      card: highlightCard(event.guessedCardName || event.guessedCardCode || 'card'),
    });
  }
  if (event.type === 'decree_guard_guess_hit') {
    const actorName = resolvePlayerName(event.actorUserId);
    const targetName = resolvePlayerName(event.targetUserId);
    return t('decreeGuardHitEvent', {
      actor: highlightName(actorName),
      target: highlightName(targetName),
      card: highlightCard(event.guessedCardName || event.guessedCardCode || 'card'),
    });
  }
  if (event.type === 'decree_guard_guess_miss') {
    const actorName = resolvePlayerName(event.actorUserId);
    const targetName = resolvePlayerName(event.targetUserId);
    return t('decreeGuardMissEvent', {
      actor: highlightName(actorName),
      target: highlightName(targetName),
      card: highlightCard(event.guessedCardName || event.guessedCardCode || 'card'),
    });
  }
  if (event.type === 'decree_guard_counter_guess_hit') {
    const actorName = resolvePlayerName(event.actorUserId);
    const targetName = resolvePlayerName(event.targetUserId);
    return t('decreeGuardCounterHitEvent', {
      actor: highlightName(actorName),
      target: highlightName(targetName),
      card: highlightCard(event.guessedCardName || event.guessedCardCode || 'card'),
    });
  }
  if (event.type === 'decree_guard_counter_guess_miss') {
    const actorName = resolvePlayerName(event.actorUserId);
    const targetName = resolvePlayerName(event.targetUserId);
    return t('decreeGuardCounterMissEvent', {
      actor: highlightName(actorName),
      target: highlightName(targetName),
      card: highlightCard(event.guessedCardName || event.guessedCardCode || 'card'),
    });
  }
  if (event.type === 'decree_no_target') {
    const actorName = resolvePlayerName(event.actorUserId);
    return t('decreeNoTargetEvent', {
      actor: highlightName(actorName),
      card: highlightCard(event.cardName || event.cardCode || 'card'),
    });
  }
  if (event.type === 'decree_chosen') {
    const actorName = resolvePlayerName(event.actorUserId);
    return t('decreeChosenEvent', {
      actor: highlightName(actorName),
      decree: highlightCard(event.targetCardName || event.targetCardCode || 'decree'),
    });
  }
  if (event.type === 'guard_guess_miss') {
    const actorName = resolvePlayerName(event.actorUserId);
    const targetName = resolvePlayerName(event.targetUserId);
    return t('guardMissEvent', {
      actor: highlightName(actorName),
      target: highlightName(targetName),
      card: highlightCard(event.guessedCardName || event.guessedCardCode || 'card'),
    });
  }
  if (event.type === 'guard_no_target') {
    const actorName = resolvePlayerName(event.actorUserId);
    return t('guardNoTargetEvent', {
      actor: highlightName(actorName),
      card: highlightCard('Стражник'),
    });
  }
  if (event.type === 'guard_miss_resolved') {
    return t('guardMissResolvedEvent', {
      card: highlightCard('Стражник'),
    });
  }
  if (event.type === 'peasant_reaction_safe') {
    const actorName = resolvePlayerName(event.actorUserId);
    return t('peasantReactionSafeEvent', {
      actor: highlightName(actorName),
      card: highlightCard('Крестьянин'),
    });
  }
  if (event.type === 'peasant_reaction_eliminated') {
    const actorName = resolvePlayerName(event.actorUserId);
    return t('peasantReactionEliminatedEvent', {
      actor: highlightName(actorName),
      card: highlightCard('Крестьянин'),
    });
  }
  if (event.type === 'peasant_reaction_skipped') {
    const actorName = resolvePlayerName(event.actorUserId);
    return t('peasantReactionSkippedEvent', {
      actor: highlightName(actorName),
      card: highlightCard('Крестьянин'),
    });
  }
  if (event.type === 'scout_lock_applied') {
    const actorName = resolvePlayerName(event.actorUserId);
    const targetName = resolvePlayerName(event.targetUserId);
    return t('scoutLockEvent', {
      actor: highlightName(actorName),
      target: highlightName(targetName),
    });
  }
  if (event.type === 'scout_no_target') {
    const actorName = resolvePlayerName(event.actorUserId);
    return t('scoutNoTargetEvent', {
      actor: highlightName(actorName),
      card: highlightCard('Разведчик'),
    });
  }
  if (event.type === 'executioner_eliminate') {
    const actorName = resolvePlayerName(event.actorUserId);
    const targetName = resolvePlayerName(event.targetUserId);
    return t('executionerEliminateEvent', {
      actor: highlightName(actorName),
      target: highlightName(targetName),
    });
  }
  if (event.type === 'executioner_survive') {
    const actorName = resolvePlayerName(event.actorUserId);
    const targetName = resolvePlayerName(event.targetUserId);
    return t('executionerSurviveEvent', {
      actor: highlightName(actorName),
      target: highlightName(targetName),
    });
  }
  if (event.type === 'executioner_no_target') {
    const actorName = resolvePlayerName(event.actorUserId);
    return t('executionerNoTargetEvent', {
      actor: highlightName(actorName),
      card: highlightCard('Палач'),
    });
  }
  if (event.type === 'lady_protection_applied') {
    const actorName = resolvePlayerName(event.actorUserId);
    return t('ladyProtectionEvent', {
      actor: highlightName(actorName),
      card: highlightCard('Дворянка'),
    });
  }
  if (event.type === 'bishop_token_applied') {
    const actorName = resolvePlayerName(event.actorUserId);
    return t('bishopTokenEvent', {
      actor: highlightName(actorName),
      card: highlightCard('Епископ'),
    });
  }
  if (event.type === 'queen_no_decree') {
    const actorName = resolvePlayerName(event.actorUserId);
    return t('queenNoDecreeEvent', {
      actor: highlightName(actorName),
      card: highlightCard('Королева'),
    });
  }
  if (event.type === 'queen_decree_suppressed') {
    const actorName = resolvePlayerName(event.actorUserId);
    return t('queenDecreeSuppressedEvent', {
      actor: highlightName(actorName),
      card: highlightCard('Королева'),
      decree: highlightCard(event.targetCardName || event.targetCardCode || 'decree'),
    });
  }
  if (event.type === 'queen_decree_choice_started') {
    const actorName = resolvePlayerName(event.actorUserId);
    return t('queenDecreeChoiceStartedEvent', {
      actor: highlightName(actorName),
      card: highlightCard('Королева'),
    });
  }
  if (event.type === 'king_discard_elimination') {
    const actorName = resolvePlayerName(event.actorUserId);
    const targetName = resolvePlayerName(event.targetUserId);
    if (event.actorUserId === event.targetUserId) {
      return t('kingSelfEliminationEvent', {
        actor: highlightName(actorName),
        card: highlightCard('Король'),
      });
    }

    return t('kingForcedEliminationEvent', {
      actor: highlightName(actorName),
      target: highlightName(targetName),
      card: highlightCard(event.targetCardName || event.targetCardCode || 'card'),
    });
  }
  if (event.type === 'rebel_redraw') {
    const actorName = resolvePlayerName(event.actorUserId);
    const targetName = resolvePlayerName(event.targetUserId);
    return t('rebelRedrawEvent', {
      actor: highlightName(actorName),
      target: highlightName(targetName),
      card: highlightCard(event.targetCardName || event.targetCardCode || t('systemUnknownUser')),
    });
  }
  if (event.type === 'black_rose_saved') {
    const actorName = resolvePlayerName(event.actorUserId);
    const targetName = resolvePlayerName(event.targetUserId);
    return t('blackRoseSavedEvent', {
      actor: highlightName(actorName),
      target: highlightName(targetName),
      card: highlightCard(event.targetCardName || event.targetCardCode || 'card'),
    });
  }
  if (event.type === 'feudal_no_target') {
    const actorName = resolvePlayerName(event.actorUserId);
    return t('feudalNoTargetEvent', {
      actor: highlightName(actorName),
      card: highlightCard('Феодал'),
    });
  }
  if (event.type === 'feudal_inspect') {
    const actorName = resolvePlayerName(event.actorUserId);
    const firstTargetName = resolvePlayerName(event.targetUserId);
    const secondTargetName = resolvePlayerName(event.secondTargetUserId);
    return t('feudalInspectEvent', {
      actor: highlightName(actorName),
      card: highlightCard('Феодал'),
      firstTarget: highlightName(firstTargetName),
      secondTarget: highlightName(secondTargetName),
    });
  }
  if (event.type === 'feudal_swap') {
    const actorName = resolvePlayerName(event.actorUserId);
    const firstTargetName = resolvePlayerName(event.targetUserId);
    const secondTargetName = resolvePlayerName(event.secondTargetUserId);
    return t('feudalSwapEvent', {
      actor: highlightName(actorName),
      card: highlightCard('Феодал'),
      firstTarget: highlightName(firstTargetName),
      secondTarget: highlightName(secondTargetName),
    });
  }
  if (event.type === 'feudal_keep') {
    const actorName = resolvePlayerName(event.actorUserId);
    const firstTargetName = resolvePlayerName(event.targetUserId);
    const secondTargetName = resolvePlayerName(event.secondTargetUserId);
    return t('feudalKeepEvent', {
      actor: highlightName(actorName),
      card: highlightCard('Феодал'),
      firstTarget: highlightName(firstTargetName),
      secondTarget: highlightName(secondTargetName),
    });
  }
  if (event.type === 'auto_played_on_leave') {
    const actorName = resolvePlayerName(event.actorUserId);
    return t('autoPlayedOnLeaveEvent', { actor: highlightName(actorName), card: highlightCard(event.cardName || event.cardCode || 'card') });
  }
  if (event.type === 'auto_discard_on_turn') {
    const actorName = resolvePlayerName(event.actorUserId);
    return t('autoDiscardOnTurnEvent', { actor: highlightName(actorName), card: highlightCard(event.cardName || event.cardCode || 'card') });
  }
  return esc(event.text || t('unknownError'));
};

const renderLeaderboard = () => {
  const players = (Array.isArray(state.activeMatch?.players) ? state.activeMatch.players : [])
    .slice()
    .sort((a, b) => Number(b.points ?? 0) - Number(a.points ?? 0));
  const target = targetPoints(players.length);

  return `
    <div class="game-card">
      <h4>${t('gameLeaderboard')}</h4>
      <ul class="game-leaderboard">
        ${players.map((player) => `<li class="${player.userId === state.user?.id ? 'is-self' : ''}">
          <span>${esc(player.username || player.userId)}${player.userId === state.user?.id ? ` <em>${esc(t('youLabel'))}</em>` : ''}</span>
          <b>${esc(`${String(player.points ?? 0)}/${String(target)}`)}</b>
        </li>`).join('')}
      </ul>
    </div>
  `;
};

const renderEventLog = () => {
  const events = Array.isArray(state.gameEventLog) ? state.gameEventLog : [];
  const ordered = [...events].reverse();
  return `
    <div class="game-card">
      <h4>${t('gameEvents')}</h4>
      <div class="game-events">
        ${ordered.length ? ordered.map((event) => `<div class="game-event-line ${event.type === 'system' || event.type === 'round_summary' ? 'system' : ''}">${formatEventLine(event)}</div>`).join('') : `<div class="game-muted">${t('gameNoEvents')}</div>`}
      </div>
    </div>
  `;
};

const renderActiveDecrees = () => {
  const decrees = Array.isArray(getCurrentRound()?.activeDecrees)
    ? getCurrentRound().activeDecrees
    : (Array.isArray(state.activeMatch?.activeDecrees) ? state.activeMatch.activeDecrees : []);

  return `
    <div class="game-card">
      <h4>${t('activeDecrees')}</h4>
      <div class="game-decrees">
        ${decrees.length ? decrees.map((decree) => `
          <div class="game-decree ${decree.suppressedByQueen ? 'suppressed' : ''}">
            <strong>${highlightCard(decree.title || decree.code)}</strong>
            <span>${esc(decree.effectText || '')}</span>
          </div>
        `).join('') : `<div class="game-muted">${t('noActiveDecrees')}</div>`}
      </div>
    </div>
  `;
};

const renderPendingDecreeChoice = () => {
  const choice = state.activeMatch?.pendingDecreeChoice;
  if (!choice || !Array.isArray(choice.candidates) || choice.candidates.length === 0) return '';

  const isLeader = choice.leaderUserId === state.user?.id;
  const leaderName = resolvePlayerName(choice.leaderUserId);
  const replaceable = Array.isArray(choice.replaceableDecrees) ? choice.replaceableDecrees : [];
  const defaultReplaceCode = replaceable[0]?.code || '';

  return `
    <div class="game-decree-choice">
      <div class="game-decree-choice-card">
        <p class="game-kicker">${esc(t('decreeChoiceKicker'))}</p>
        <h3>${esc(t('decreeChoiceTitle'))}</h3>
        <p>${esc(isLeader ? t('decreeChoiceHint') : t('decreeChoiceWaiting', { player: leaderName }))}</p>
        <div class="game-decree-choice-options">
          ${choice.candidates.map((decree) => `
            <button
              class="game-decree-choice-option"
              data-act="chooseDecree"
              data-decree-code="${esc(decree.code || '')}"
              data-replace-decree-code="${esc(defaultReplaceCode)}"
              ${isLeader ? '' : 'disabled'}
            >
              <strong>${esc(decree.title || decree.code || '')}</strong>
              <span>${esc(decree.effectText || '')}</span>
            </button>
          `).join('')}
        </div>
      </div>
    </div>
  `;
};

const renderChatWidget = () => {
  const messages = Array.isArray(state.roomChatMessages) ? state.roomChatMessages : [];
  return `
    <div class="game-chat-widget ${state.gameChatOpen ? 'open' : ''}">
      ${state.gameChatOpen ? `<button class="game-chat-backdrop" data-act="closeGameChatBackdrop" aria-label="${t('close')}"></button>` : ''}
      ${state.gameChatOpen ? `
        <div class="game-chat-card">
          <div class="game-chat-toggle-row">
            <h4>${t('roomChat')}</h4>
            <button class="chip" data-act="toggleGameChat">${t('close')}</button>
          </div>
          <div class="game-chat-popover" id="gameChatLog">
            ${(messages || []).length === 0 ? `<div class="game-muted">${t('roomChatEmpty')}</div>` : messages.map((msg) => `
              <div class="game-chat-line ${msg.role === 'system' ? 'system' : ''}">
                <b>${esc(msg.username || t('roleSystem'))}</b>
                <span>${esc(msg.text || '')}</span>
              </div>
            `).join('')}
          </div>
          <div class="row topgap game-chat-composer">
            <input id="gameChatInput" placeholder="${t('chatPlaceholder')}" />
            <button class="primary" data-act="sendGameChat">${t('send')}</button>
          </div>
        </div>
      ` : ''}
      <button class="chip game-chat-fab" data-act="toggleGameChat">
        ${t('roomChat')}
        ${Number(state.gameChatUnreadCount || 0) > 0 ? `<span class="chat-unread-badge">${esc(String(state.gameChatUnreadCount))}</span>` : ''}
      </button>
    </div>
  `;
};

const renderCardPreview = () => {
  if (!state.gameCardPreview) return '';

  const preview = state.gameCardPreview;
  return `
    <div class="game-card-preview-shell">
      <div class="game-card-preview">
        <button class="game-card-preview-close" data-act="closeGameCardPreview" aria-label="${t('close')}">×</button>
        <div class="game-card-preview-owner">${esc(preview.ownerName || '')}</div>
        <div class="game-card-preview-face">
          <span class="game-card-preview-value">${esc(String(preview.cardValue ?? 0))}</span>
          <span class="game-card-preview-name">${esc(preview.cardName || preview.cardCode || '')}</span>
        </div>
      </div>
    </div>
  `;
};

const renderGameConfirmPrompt = () => {
  const prompt = state.gameConfirmPrompt;
  if (!prompt) return '';

  return `
    <div class="game-card-play-prompt-shell game-confirm-prompt-shell">
      <div class="game-card-play-prompt game-confirm-prompt">
        <div class="game-card-play-prompt-head">
          <div>
            <h3>${esc(prompt.title || '')}</h3>
            <p>${esc(prompt.message || '')}</p>
          </div>
          <button class="chip" data-act="closeGameConfirmPrompt" aria-label="${t('close')}">×</button>
        </div>
        <div class="game-card-play-prompt-footer">
          <div class="row">
            <button class="secondary" data-act="closeGameConfirmPrompt">${esc(prompt.cancelLabel || t('cancel'))}</button>
            <button class="primary" data-act="confirmGamePrompt">${esc(prompt.confirmLabel || t('send'))}</button>
          </div>
        </div>
      </div>
    </div>
  `;
};

const renderCardPlayPrompt = () => {
  const prompt = state.gameCardPlayPrompt;
  const promptModel = getGamePromptModel(prompt);
  if (!promptModel) return '';

  const {
    titleKey,
    hintKey,
    summaryKey,
    emptySummaryKey,
    confirmKey,
    confirmAction,
    targetAction,
    targets,
    targetUserId,
    secondTargetUserId,
    selectedGuess,
    guessedCardCode,
    availableGuesses,
    requiresGuess,
    requiresSecondTarget,
  } = promptModel;

  return `
    <div class="game-card-play-prompt-shell">
      <div class="game-card-play-prompt">
        <div class="game-card-play-prompt-head">
          <div>
            <h3>${t(titleKey)}</h3>
            <p>${t(hintKey)}</p>
          </div>
          <button class="chip" data-act="closeGameCardPlayPrompt">${t('close')}</button>
        </div>
        <div class="game-card-play-prompt-section">
          <span class="game-card-play-prompt-label">${requiresSecondTarget ? t('feudalPromptTargets') : t('guardPromptTarget')}</span>
          <div class="game-card-play-prompt-grid">
            ${targets.map((player) => `
              <button
                class="game-prompt-option ${targetUserId === player.userId || secondTargetUserId === player.userId ? 'selected' : ''}"
                data-act="${targetAction}"
                data-user-id="${esc(player.userId)}"
              >
                <strong>
                  ${esc(player.username || player.userId)}
                  ${player.userId === state.user?.id ? ` <em>${esc(t('youLabel'))}</em>` : ''}
                </strong>
              </button>
            `).join('')}
          </div>
        </div>
        ${requiresGuess ? `<div class="game-card-play-prompt-section">
          <span class="game-card-play-prompt-label">${t('guardPromptGuess')}</span>
          <div class="game-card-play-prompt-grid cards">
            ${availableGuesses.map((card) => `
              <button
                class="game-prompt-option card ${guessedCardCode === card.code ? 'selected' : ''}"
                data-act="selectGuardGuess"
                data-card-code="${esc(card.code)}"
              >
                <b>${esc(String(card.value))}</b>
                <span>${esc(card.name)}</span>
              </button>
            `).join('')}
          </div>
        </div>` : ''}
        <div class="game-card-play-prompt-footer">
          <div class="game-card-play-prompt-summary">
            ${requiresGuess
              ? (selectedGuess ? t(summaryKey, { card: selectedGuess.name }) : t(emptySummaryKey))
              : t(summaryKey)}
          </div>
          <button
            class="primary"
            data-act="${confirmAction}"
            ${(!targetUserId || (requiresGuess && !guessedCardCode) || (requiresSecondTarget && (!secondTargetUserId || secondTargetUserId === targetUserId))) ? 'disabled' : ''}
          >${t(confirmKey)}</button>
        </div>
      </div>
    </div>
  `;
};

const renderPendingDecisionPrompt = () => {
  const pendingDecision = getCurrentRound()?.pendingDecision || null;
  if (!pendingDecision) {
    return '';
  }

  if (pendingDecision.type === 'guard_miss_peasant_reaction') {
    if (pendingDecision.canReact) {
      return `
        <div class="game-card-play-prompt-shell">
          <div class="game-card-play-prompt">
            <div class="game-card-play-prompt-head">
              <div>
                <h3>${t('peasantReactionTitle')}</h3>
                <p>${t('peasantReactionHint', { card: pendingDecision.guessedCardName || pendingDecision.guessedCardCode || 'card' })}</p>
              </div>
            </div>
            <div class="game-card-play-prompt-footer">
              <div class="game-card-play-prompt-summary">${t('peasantReactionSummary')}</div>
              <div class="row">
                <button class="secondary" data-act="skipPeasantReact">${t('peasantReactionSkip')}</button>
                <button class="primary" data-act="confirmPeasantReact">${t('peasantReactionConfirm')}</button>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    return `
      <div class="game-card-play-prompt-shell">
        <div class="game-card-play-prompt">
          <div class="game-card-play-prompt-head">
            <div>
              <h3>${t('guardResolutionTitle')}</h3>
              <p>${t('guardResolutionHint')}</p>
            </div>
          </div>
          <div class="game-card-play-prompt-footer">
            <div class="game-card-play-prompt-summary">${t('guardResolutionSummary')}</div>
            <div class="row">
              <button class="primary" data-act="resolveGuardMiss">${t('guardResolutionConfirm')}</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  if (pendingDecision.type === 'queen_decree_suppression') {
    const decrees = Array.isArray(pendingDecision.availableDecrees) ? pendingDecision.availableDecrees : [];

    return `
      <div class="game-card-play-prompt-shell">
        <div class="game-card-play-prompt">
          <div class="game-card-play-prompt-head">
            <div>
              <h3>${t('queenDecreePromptTitle')}</h3>
              <p>${t('queenDecreePromptHint')}</p>
            </div>
          </div>
          <div class="game-card-play-prompt-grid">
            ${decrees.map((decree) => `
              <button class="game-prompt-option" data-act="confirmQueenDecreeSuppression" data-decree-code="${esc(decree.code || '')}">
                <strong>${esc(decree.title || decree.code || '')}</strong>
                <span>${esc(decree.effectText || '')}</span>
              </button>
            `).join('')}
          </div>
          <div class="game-card-play-prompt-footer">
            <div class="game-card-play-prompt-summary">${t('queenDecreePromptSummary')}</div>
          </div>
        </div>
      </div>
    `;
  }

  if (pendingDecision.type === 'suspicion_counter_guess') {
    const counterGuessCards = getAvailableGuardGuessCards({ allowGuard: false });
    const targetName = resolvePlayerName(pendingDecision.targetUserId);

    return `
      <div class="game-card-play-prompt-shell">
        <div class="game-card-play-prompt">
          <div class="game-card-play-prompt-head">
            <div>
              <h3>${t('suspicionCounterTitle')}</h3>
              <p>${t('suspicionCounterHint', { target: targetName })}</p>
            </div>
          </div>
          <div class="game-card-play-prompt-grid cards">
            ${counterGuessCards.map((card) => `
              <button
                class="game-prompt-option card"
                data-act="resolveSuspicionCounterGuess"
                data-card-code="${esc(card.code)}"
              >
                <b>${esc(String(card.value))}</b>
                <span>${esc(card.name)}</span>
              </button>
            `).join('')}
          </div>
          <div class="game-card-play-prompt-footer">
            <div class="game-card-play-prompt-summary">${t('suspicionCounterSummary')}</div>
          </div>
        </div>
      </div>
    `;
  }

  if (pendingDecision.type !== 'feudal_lord_swap') {
    return '';
  }

  const firstTargetName = resolvePlayerName(pendingDecision.targetUserId);
  const secondTargetName = resolvePlayerName(pendingDecision.secondTargetUserId);

  return `
    <div class="game-card-play-prompt-shell">
      <div class="game-card-play-prompt">
        <div class="game-card-play-prompt-head">
          <div>
            <h3>${t('feudalResolveTitle')}</h3>
            <p>${t('feudalResolveHint')}</p>
          </div>
        </div>
        <div class="game-card-play-prompt-grid">
          <div class="game-prompt-option card reveal-card">
            <strong>${esc(firstTargetName)}</strong>
            ${renderStaticFaceUpCard(
              pendingDecision.targetCard,
              'showdown-card prompt-showdown-card',
              'showdown-card-value prompt-showdown-card-value',
              'showdown-card-name prompt-showdown-card-name'
            )}
          </div>
          <div class="game-prompt-option card reveal-card">
            <strong>${esc(secondTargetName)}</strong>
            ${renderStaticFaceUpCard(
              pendingDecision.secondTargetCard,
              'showdown-card prompt-showdown-card',
              'showdown-card-value prompt-showdown-card-value',
              'showdown-card-name prompt-showdown-card-name'
            )}
          </div>
        </div>
        <div class="game-card-play-prompt-footer">
          <div class="game-card-play-prompt-summary">${t('feudalResolveSummary')}</div>
          <div class="row">
            <button class="secondary" data-act="confirmFeudalKeep">${t('feudalKeepConfirm')}</button>
            <button class="primary" data-act="confirmFeudalSwap">${t('feudalSwapConfirm')}</button>
          </div>
        </div>
      </div>
    </div>
  `;
};

const renderRevealedCardsRail = () => {
  const round = getCurrentRound();
  const revealedCards = Array.isArray(round?.revealedCards) ? round.revealedCards : [];
  const removedDecreeCards = Array.isArray(round?.removedDecreeCards) ? round.removedDecreeCards : [];
  const cards = [...revealedCards, ...removedDecreeCards.map((card) => ({ ...card, removedByDecree: true }))];
  if (cards.length === 0) return '';

  return `
    <aside class="game-revealed-rail" aria-label="revealed-cards">
      ${cards.map((card, index) => `
        <div class="${card.removedByDecree ? 'removed-decree-card-wrap' : ''}">
          ${card.removedByDecree ? `<span class="removed-decree-card-label">${esc(t('removedByDecree'))}</span>` : ''}
          ${renderDiscardCard(card, '', index)}
        </div>
      `).join('')}
    </aside>
  `;
};

const renderTablePlayers = () => {
  const allPlayers = Array.isArray(state.activeMatch?.players) ? state.activeMatch.players : [];
  const round = getCurrentRound();
  const roundPlayers = Array.isArray(round?.players) ? round.players : [];
  const players = allPlayers.filter((player) => player.userId !== state.user?.id);
  const totalPlayers = Math.max(2, allPlayers.length || 2);
  const layouts = {
    2: ['seat-top'],
    3: ['seat-top-left', 'seat-top-right'],
    4: ['seat-left-mid', 'seat-top', 'seat-right-mid'],
    5: ['seat-left-top', 'seat-top', 'seat-right-top', 'seat-right-bottom'],
    6: ['seat-left-top', 'seat-left-bottom', 'seat-top', 'seat-right-top', 'seat-right-bottom'],
  };
  const seats = layouts[totalPlayers] || layouts[6];

  return players.map((player, index) => {
    const roundPlayer = roundPlayers.find((item) => item.userId === player.userId);
    const isActive = round?.activePlayerId === player.userId;
    const discard = Array.isArray(roundPlayer?.discard) ? roundPlayer.discard : [];
    const hand = Array.isArray(roundPlayer?.hand) ? roundPlayer.hand : [];
    const isProtected = Boolean(roundPlayer?.protectedFromEffects);
    const hasBlackRoseToken = Boolean(roundPlayer?.hasBlackRoseToken);
    const showShowdown = round?.status === 'finished' && hand.length > 0;
    return `
      <article class="table-player ${seats[index] || 'seat-top'} ${isActive ? 'active' : ''}">
        <div class="table-player-name">
          ${esc(player.username || player.userId)}
          ${isProtected ? `<span class="table-player-status protection">${esc(t('protectedBadge'))}</span>` : ''}
          ${hasBlackRoseToken ? `<span class="table-player-status rose">${esc(t('blackRoseBadge'))}</span>` : ''}
        </div>
        <div class="table-player-meta">
          <span class="table-player-discard-count">${t('gameDiscardCount')}: ${esc(String(discard.length))}</span>
          <div class="table-player-discard discard-stack">
            ${discard.map((card, discardIndex) => renderDiscardCard(card, player.username || player.userId, discardIndex)).join('')}
          </div>
          ${showShowdown ? `
            <div class="table-player-showdown">
              <div class="table-player-showdown-cards">
                ${hand.map((card) => renderFaceUpCard(card, player.username || player.userId)).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </article>
    `;
  }).join('');
};

const renderMatchFinishPanel = () => {
  if (state.activeMatch?.status !== 'finished') {
    return '';
  }

  const players = (Array.isArray(state.activeMatch?.players) ? state.activeMatch.players : [])
    .slice()
    .sort((left, right) => Number(right.points ?? 0) - Number(left.points ?? 0));
  const winner = players.find((player) => player.userId === state.activeMatch?.winnerUserId) || null;
  const totalTarget = targetPoints(players.length);
  const canReplay = state.activeRoom?.ownerId === state.user?.id;
  const canReturnToRoom = canReplay && Number(state.activeRoom?.participants?.length || 0) === 1;

  return `
    <div class="game-finish-shell">
      <div class="game-finish-panel">
        <div class="game-finish-kicker">${t('gameFinalTitle')}</div>
        <h2>${esc(t('matchWinner', { winner: winner?.username || state.activeMatch?.winnerUserId || t('systemUnknownUser') }))}</h2>
        <div class="game-finish-stats">
          <div class="game-finish-stat">
            <span>${t('gameFinalStatsRounds')}</span>
            <strong>${esc(String(state.activeMatch?.roundNumber || 0))}</strong>
          </div>
          <div class="game-finish-stat">
            <span>${t('gameFinalStatsTarget')}</span>
            <strong>${esc(String(totalTarget))}</strong>
          </div>
        </div>
        <div class="game-finish-scoreboard">
          ${players.map((player) => `
            <div class="game-finish-score-row ${player.userId === state.activeMatch?.winnerUserId ? 'winner' : ''}">
              <span>${esc(player.username || player.userId)}${player.userId === state.user?.id ? ` <em>${esc(t('youLabel'))}</em>` : ''}</span>
              <b>${esc(`${String(player.points ?? 0)}/${String(totalTarget)}`)}</b>
            </div>
          `).join('')}
        </div>
        <div class="game-finish-actions">
          ${canReturnToRoom ? `<button class="chip" data-act="returnToRoomAfterMatch">${t('gameReturnToRoom')}</button>` : ''}
          <button class="secondary" data-act="leaveFinishedMatch">${t('gameFinalLeave')}</button>
          <button class="primary" data-act="playAgainMatch" ${canReplay ? '' : 'disabled'}>${t('gamePlayAgain')}</button>
        </div>
        ${canReplay ? '' : `<p class="game-finish-hint">${esc(t('gamePlayAgainOwnerOnly'))}</p>`}
      </div>
    </div>
  `;
};

const renderHandDock = () => {
  const me = getMyMatchRoundPlayer();
  const cards = Array.isArray(me?.hand) ? me.hand : [];
  const myDiscard = Array.isArray(me?.discard) ? me.discard : [];
  const canPlay = isMyTurnInMatch();
  const lockedCardInstanceId = me?.lockedCardInstanceId || null;
  const lockedCardCode = me?.lockedCardCode || null;
  const isProtected = Boolean(me?.protectedFromEffects);
  const hasBlackRoseToken = Boolean(me?.hasBlackRoseToken);
  const peasantPlayForbidden = isPeasantBestFriendActive();

  return `
    <section class="game-hand-dock">
      <div class="game-my-table">
        <div class="game-my-table-head">
          <span class="game-my-table-label">
            ${t('gameMyTable')}
            ${isProtected ? `<span class="table-player-status protection">${esc(t('protectedBadge'))}</span>` : ''}
            ${hasBlackRoseToken ? `<span class="table-player-status rose">${esc(t('blackRoseBadge'))}</span>` : ''}
          </span>
          <span class="game-turn-badge ${canPlay ? 'turn' : 'wait'}">${canPlay ? t('gameYourTurn') : t('gameWaitTurn')}</span>
        </div>
        <div class="game-my-table-cards discard-stack discard-stack-centered">
          ${myDiscard.length ? myDiscard.map((card, discardIndex) => renderDiscardCard(card, t('gameMyTable'), discardIndex)).join('') : `<span class="game-muted">${t('gameNoCardsOnTable')}</span>`}
        </div>
      </div>
      <div class="game-hand-cards">
        ${cards.map((card) => {
          const isLocked = (lockedCardInstanceId && card.instanceId === lockedCardInstanceId)
            || (!lockedCardInstanceId && lockedCardCode && card.code === lockedCardCode);
          const isForbiddenByDecree = peasantPlayForbidden && card.code === 'peasant';
          return `
          <button
            class="game-card-button ${canPlay ? '' : 'muted'} ${isLocked || isForbiddenByDecree ? 'locked' : ''} ${isForbiddenByDecree ? 'decree-forbidden' : ''}"
            data-act="playCard"
            data-card-code="${esc(card.code)}"
            data-card-instance-id="${esc(card.instanceId || '')}"
            data-card-locked="${esc(String(Boolean(isLocked || isForbiddenByDecree)))}"
            data-card-decree-forbidden="${esc(String(Boolean(isForbiddenByDecree)))}"
          >
            <span class="game-card-value">${esc(String(card.value ?? 0))}</span>
            <span class="game-card-name">${esc(card.name || card.code)}</span>
            ${isLocked ? `<span class="game-card-lock-badge">${esc(t('cardLockedBadge'))}</span>` : ''}
            ${isForbiddenByDecree ? `<span class="game-card-lock-badge">${esc(t('cardForbiddenByDecreeBadge'))}</span>` : ''}
          </button>
        `;}).join('')}
      </div>
    </section>
  `;
};

export const renderGameScreen = () => {
  if (!state.activeMatch?.matchId) {
    return `<section class="game-empty">${t('gameNoActiveMatch')}</section>`;
  }

  const round = getCurrentRound();
  const totalPlayers = Math.max(2, Array.isArray(state.activeMatch?.players) ? state.activeMatch.players.length : 2);
  const summary = state.activeMatch?.lastRoundSummary;
  const showRoundSummary = Boolean(summary?.winnerNames?.length)
    && state.activeMatch?.status === 'pending'
    && round?.status === 'finished';
  const winnerBanner = showRoundSummary
    ? t('roundWinnerSummary', { round: summary.roundNumber, winners: summary.winnerNames.join(', ') })
    : '';
  const roundStatusBanner = state.gameStatusMessage
    ? `<div class="game-summary-banner winner">${esc(state.gameStatusMessage)}</div>`
    : (round?.hasPendingDecision ? `<div class="game-summary-banner">${esc(t('guardResolutionPending'))}</div>` : '');

  return `
    <section class="game-layout">
      <main class="game-table-wrap">
        ${winnerBanner ? `<div class="game-summary-banner round-summary-temp">${esc(winnerBanner)}</div>` : ''}
        ${roundStatusBanner}
        <div class="game-table table-layout-${esc(String(totalPlayers))}">
          ${renderRevealedCardsRail()}
          <div class="game-center-stack">
            <div class="game-set-aside">
              <div class="game-deck-title">${t('setAsideCardLabel')}</div>
              <div class="game-set-aside-card hidden-card" title="${t('setAsideHiddenHint')}">
                <span class="game-set-aside-hidden-mark">?</span>
              </div>
            </div>
            <div class="game-main-deck">
              <div class="game-deck-title">${t('gameDeck')}</div>
              <div class="game-deck">
                <div class="game-deck-count">${esc(String(round?.deckCount ?? 0))}</div>
              </div>
            </div>
          </div>
          ${renderTablePlayers()}
        </div>
        ${renderHandDock()}
      </main>
      <aside class="game-sidebar">
        ${renderLeaderboard()}
        ${renderActiveDecrees()}
        ${renderEventLog()}
      </aside>
      ${renderChatWidget()}
      ${renderPendingDecreeChoice()}
      ${renderMatchFinishPanel()}
      ${renderCardPreview()}
      ${renderGameConfirmPrompt()}
      ${renderCardPlayPrompt()}
      ${renderPendingDecisionPrompt()}
    </section>
  `;
};
