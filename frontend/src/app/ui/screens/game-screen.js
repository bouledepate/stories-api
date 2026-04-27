import { t } from '../../i18n';
import { esc } from '../../security';
import { state } from '../../state';
import { getActiveMatchOpponents, getCurrentRound, getMyMatchRoundPlayer, getTargetableMatchPlayers, isMyTurnInMatch } from '../../store/selectors';
import { findCatalogCard, matchCardCatalog } from '../../features/game/card-catalog';

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

  const roundPlayers = Array.isArray(round?.players) ? round.players : [];
  roundPlayers.forEach((player) => {
    const discard = Array.isArray(player?.discard) ? player.discard : [];
    discard.forEach(addCard);
  });

  const myHand = Array.isArray(getMyMatchRoundPlayer()?.hand) ? getMyMatchRoundPlayer().hand : [];
  myHand.forEach(addCard);

  return counts;
};

const availableGuardGuessCards = () => {
  const visibleCounts = buildVisibleCardCounts();

  return matchCardCatalog.filter((card) => {
    if (card.code === 'guard') return false;
    return Number(visibleCounts.get(card.code) || 0) < Number(card.copies || 0);
  });
};
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
    });
  }
  if (event.type === 'lady_protection_applied') {
    const actorName = resolvePlayerName(event.actorUserId);
    return t('ladyProtectionEvent', {
      actor: highlightName(actorName),
    });
  }
  if (event.type === 'bishop_token_applied') {
    const actorName = resolvePlayerName(event.actorUserId);
    return t('bishopTokenEvent', {
      actor: highlightName(actorName),
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
    return t('feudalNoTargetEvent', { actor: highlightName(actorName) });
  }
  if (event.type === 'feudal_inspect') {
    const actorName = resolvePlayerName(event.actorUserId);
    const firstTargetName = resolvePlayerName(event.targetUserId);
    const secondTargetName = resolvePlayerName(event.secondTargetUserId);
    return t('feudalInspectEvent', {
      actor: highlightName(actorName),
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

const renderCardPlayPrompt = () => {
  const prompt = state.gameCardPlayPrompt;
  if (!prompt || (prompt.cardCode !== 'guard' && prompt.cardCode !== 'scout' && prompt.cardCode !== 'executioner' && prompt.cardCode !== 'rebel' && prompt.cardCode !== 'feudal_lord')) return '';

  const selectedGuess = findCatalogCard(prompt.guessedCardCode);
  const opponents = prompt.cardCode === 'rebel'
    ? getTargetableMatchPlayers({ includeSelf: true })
    : getActiveMatchOpponents();
  const isGuardPrompt = prompt.cardCode === 'guard';
  const isScoutPrompt = prompt.cardCode === 'scout';
  const isExecutionerPrompt = prompt.cardCode === 'executioner';
  const isFeudalPrompt = prompt.cardCode === 'feudal_lord';
  const availableGuesses = availableGuardGuessCards();
  const title = isGuardPrompt ? t('guardPromptTitle') : isScoutPrompt ? t('scoutPromptTitle') : isExecutionerPrompt ? t('executionerPromptTitle') : isFeudalPrompt ? t('feudalPromptTitle') : t('rebelPromptTitle');
  const hint = isGuardPrompt ? t('guardPromptHint') : isScoutPrompt ? t('scoutPromptHint') : isExecutionerPrompt ? t('executionerPromptHint') : isFeudalPrompt ? t('feudalPromptHint') : t('rebelPromptHint');

  return `
    <div class="game-card-play-prompt-shell">
      <div class="game-card-play-prompt">
        <div class="game-card-play-prompt-head">
          <div>
            <h3>${title}</h3>
            <p>${hint}</p>
          </div>
          <button class="chip" data-act="closeGameCardPlayPrompt">${t('close')}</button>
        </div>
        <div class="game-card-play-prompt-section">
          <span class="game-card-play-prompt-label">${isFeudalPrompt ? t('feudalPromptTargets') : t('guardPromptTarget')}</span>
          <div class="game-card-play-prompt-grid">
            ${opponents.map((player) => `
              <button
                class="game-prompt-option ${prompt.targetUserId === player.userId || prompt.secondTargetUserId === player.userId ? 'selected' : ''}"
                data-act="${isFeudalPrompt ? 'selectFeudalTarget' : 'selectGuardTarget'}"
                data-user-id="${esc(player.userId)}"
              >
                <strong>
                  ${esc(player.username || player.userId)}
                  ${player.userId === state.user?.id ? ` <em>${esc(t('youLabel'))}</em>` : ''}
                </strong>
                <span>${t('gameDiscardCount')}: ${esc(String((player.discard || []).length))}</span>
              </button>
            `).join('')}
          </div>
        </div>
        ${isGuardPrompt ? `<div class="game-card-play-prompt-section">
          <span class="game-card-play-prompt-label">${t('guardPromptGuess')}</span>
          <div class="game-card-play-prompt-grid cards">
            ${availableGuesses.map((card) => `
              <button
                class="game-prompt-option card ${prompt.guessedCardCode === card.code ? 'selected' : ''}"
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
            ${isGuardPrompt
              ? (selectedGuess ? t('guardPromptSummary', { card: selectedGuess.name }) : t('guardPromptSummaryEmpty'))
              : isScoutPrompt
                ? t('scoutPromptSummary')
                : isExecutionerPrompt
                  ? t('executionerPromptSummary')
                  : isFeudalPrompt
                    ? t('feudalPromptSummary')
                  : t('rebelPromptSummary')}
          </div>
          <button
            class="primary"
            data-act="${isGuardPrompt ? 'confirmGuardPlay' : isScoutPrompt ? 'confirmScoutPlay' : isExecutionerPrompt ? 'confirmExecutionerPlay' : isFeudalPrompt ? 'confirmFeudalPlay' : 'confirmRebelPlay'}"
            ${(!prompt.targetUserId || (isGuardPrompt && !prompt.guessedCardCode) || (isFeudalPrompt && (!prompt.secondTargetUserId || prompt.secondTargetUserId === prompt.targetUserId))) ? 'disabled' : ''}
          >${isGuardPrompt ? t('guardPromptConfirm') : isScoutPrompt ? t('scoutPromptConfirm') : isExecutionerPrompt ? t('executionerPromptConfirm') : isFeudalPrompt ? t('feudalPromptConfirm') : t('rebelPromptConfirm')}</button>
        </div>
      </div>
    </div>
  `;
};

const renderPendingDecisionPrompt = () => {
  const pendingDecision = getCurrentRound()?.pendingDecision || null;
  if (!pendingDecision || pendingDecision.type !== 'feudal_lord_swap') {
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
            ${renderFaceUpCard(pendingDecision.targetCard, firstTargetName, 'showdown-card prompt-showdown-card')}
          </div>
          <div class="game-prompt-option card reveal-card">
            <strong>${esc(secondTargetName)}</strong>
            ${renderFaceUpCard(pendingDecision.secondTargetCard, secondTargetName, 'showdown-card prompt-showdown-card')}
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
  if (revealedCards.length === 0) return '';

  return `
    <aside class="game-revealed-rail" aria-label="revealed-cards">
      ${revealedCards.map((card, index) => renderDiscardCard(card, '', index)).join('')}
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
          return `
          <button
            class="game-card-button ${canPlay ? '' : 'muted'} ${isLocked ? 'locked' : ''}"
            data-act="playCard"
            data-card-code="${esc(card.code)}"
            data-card-instance-id="${esc(card.instanceId || '')}"
            data-card-locked="${esc(String(Boolean(isLocked)))}"
          >
            <span class="game-card-value">${esc(String(card.value ?? 0))}</span>
            <span class="game-card-name">${esc(card.name || card.code)}</span>
            ${isLocked ? `<span class="game-card-lock-badge">${esc(t('cardLockedBadge'))}</span>` : ''}
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

  return `
    <section class="game-layout">
      <main class="game-table-wrap">
        ${winnerBanner ? `<div class="game-summary-banner round-summary-temp">${esc(winnerBanner)}</div>` : ''}
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
        ${renderEventLog()}
      </aside>
      ${renderChatWidget()}
      ${renderMatchFinishPanel()}
      ${renderCardPreview()}
      ${renderCardPlayPrompt()}
      ${renderPendingDecisionPrompt()}
    </section>
  `;
};
