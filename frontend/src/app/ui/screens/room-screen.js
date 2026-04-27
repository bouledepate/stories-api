import { state } from '../../state';
import { t } from '../../i18n';
import { esc } from '../../security';
import { formatClock, initialLetter, roomAccessSummary } from '../shared/view-helpers';

const renderParticipant = (participant) => {
  const me = state.user?.id === participant.userId;
  const isOwnerRoom = state.user?.id && state.activeRoom?.ownerId === state.user.id;
  const canKick = isOwnerRoom && participant.userId !== state.activeRoom?.ownerId;
  const canBan = isOwnerRoom && participant.role === 'player' && participant.userId !== state.activeRoom?.ownerId;
  const canTransferOwnership = isOwnerRoom && participant.role === 'player' && participant.userId !== state.activeRoom?.ownerId;
  const roleLabelMap = {
    owner: t('roleOwnerShort'),
    player: t('rolePlayerShort'),
    spectator: t('roleSpectatorShort'),
  };

  return `
    <li class="participant-item">
      <div class="participant-row">
        <div class="participant-main">
          <span class="participant-avatar role-${esc(participant.role)}">${esc(initialLetter(participant.username, 'U'))}</span>
          <div class="participant-identity">
            <div class="participant-name-row">
              <b class="role-${esc(participant.role)}">${esc(participant.username)}</b>
              ${me ? `<span class="inline-note">(${t('youLabel')})</span>` : ''}
              ${participant.role === 'owner' ? `<span class="badge-chip owner-badge">${t('participantOwnerBadge')}</span>` : ''}
            </div>
            <div class="participant-meta">
              ${esc(roleLabelMap[participant.role] || participant.role)}
              <span class="status-dot ${participant.ready ? 'ready' : 'idle'}"></span>
              <span class="ready-state ${participant.ready ? 'ready' : 'idle'}">${participant.ready ? t('participantReadyBadge') : t('participantNotReadyBadge')}</span>
            </div>
          </div>
        </div>
        ${(canKick || canBan || canTransferOwnership) ? `<div class="participant-actions participant-actions-inline">
          ${canTransferOwnership ? `<button class="chip icon-chip" title="${t('transferOwnershipSymbolLabel')}" aria-label="${t('transferOwnership')}" data-act="transferOwnership" data-user-id="${esc(participant.userId)}">♔</button>` : ''}
          ${canKick ? `<button class="chip icon-chip" title="${t('kickSymbolLabel')}" aria-label="${t('kickPlayer')}" data-act="kickParticipant" data-user-id="${esc(participant.userId)}">×</button>` : ''}
          ${canBan ? `<button class="chip icon-chip" title="${t('banSymbolLabel')}" aria-label="${t('banPlayer')}" data-act="banParticipant" data-user-id="${esc(participant.userId)}">⛔</button>` : ''}
        </div>` : ''}
      </div>
    </li>
  `;
};

export const renderRoomPanel = () => {
  if (!state.activeRoom) return '';

  const participants = Array.isArray(state.activeRoom.participants) ? state.activeRoom.participants : [];
  const players = participants.filter((participant) => participant.role !== 'spectator');
  const spectators = participants.filter((participant) => participant.role === 'spectator');
  const isOwner = Boolean(state.user?.id) && state.user.id === state.activeRoom.ownerId;
  const myParticipant = participants.find((participant) => participant.userId === state.user?.id);
  const canToggleReady = myParticipant?.role === 'owner' || myParticipant?.role === 'player';
  const hasMatch = Boolean(state.activeMatch?.matchId);
  const hasLiveMatch = hasMatch && state.activeMatch?.status !== 'finished';
  const canViewFinishedMatch = hasMatch
    && state.activeMatch?.status === 'finished'
    && (
      (Array.isArray(state.activeMatch?.players) && state.activeMatch.players.some((player) => player.userId === state.user?.id))
      || myParticipant?.role === 'spectator'
    );
  const canOpenGame = hasLiveMatch || canViewFinishedMatch;
  const visibilityLabel = state.activeRoom.isPublic ? t('visibilityPublic') : t('visibilityPrivate');
  const playersLabel = `${players.length} / ${state.activeRoom.maxPlayers || 6}`;

  return `
    <article class="room-panel">
      <div class="room-panel-head">
        <div>
          <div class="hero-kicker">${t('roomDetails')}</div>
          <h3 class="room-title">${esc(state.activeRoom.name || t('roomDetails'))}</h3>
        </div>
        <div class="room-live-pill">${t('roomLiveSync')}</div>
      </div>
      <div class="room-meta room-meta-cards">
        <div class="room-stat-card room-stat-code">
          <span>${t('roomCode')}</span>
          <div class="room-stat-main room-code-row"><b>${esc(state.activeRoom.inviteCode || '—')}</b> ${isOwner ? `<button class="chip room-code-action icon-chip" title="${t('regenerateInvite')}" aria-label="${t('regenerateInvite')}" data-act="regenInvite">${t('regenerateInviteShort')}</button>` : ''}</div>
        </div>
        <div class="room-stat-card">
          <span>${t('roomOwnerName')}</span>
          <div class="room-stat-main">${esc(state.activeRoom.ownerUsername || state.activeRoom.ownerId || '—')}</div>
        </div>
        <div class="room-stat-card">
          <span>${t('roomVisibilityLabel')}</span>
          <div class="room-stat-main">${visibilityLabel}</div>
        </div>
        <div class="room-stat-card">
          <span>${t('roomAccessLabel')}</span>
          <div class="room-stat-main">${roomAccessSummary(state.activeRoom)}</div>
        </div>
        <div class="room-stat-card">
          <span>${t('roomStatsLabel')}</span>
          <div class="room-stat-main">${playersLabel}</div>
        </div>
      </div>
      <div class="room-lists">
        <div class="room-list-card">
          <h4>${t('roomParticipants')} (${players.length})</h4>
          <ul class="participant-list">${players.map(renderParticipant).join('')}</ul>
        </div>
        <div class="room-list-card">
          <h4>${t('roomSpectators')} (${spectators.length})</h4>
          <ul class="participant-list">${spectators.map(renderParticipant).join('')}</ul>
        </div>
      </div>
      <div class="stack">
        <h4>${t('roomActions')}</h4>
        <div class="room-actions">
          ${canToggleReady ? `<button class="secondary" data-act="readyRoom">${(myParticipant?.ready ? t('markNotReady') : t('markReady'))}</button>` : ''}
          ${isOwner ? `<button class="primary" data-act="startGame">${hasLiveMatch ? t('openActiveGame') : (state.activeMatch?.status === 'finished' ? t('gamePlayAgain') : t('startGame'))}</button>` : ''}
          ${!isOwner && canOpenGame ? `<button class="secondary" data-act="openGame">${state.activeMatch?.status === 'finished' ? t('openMatchResults') : t('openActiveGame')}</button>` : ''}
          ${isOwner ? `<button class="secondary" data-act="openRoomSettings">${t('openRoomSettings')}</button>` : ''}
          <button class="chip" data-act="leaveRoom">${isOwner ? t('closeOwnedRoom') : t('leaveRoom')}</button>
        </div>
      </div>
      <div id="roomStatus" class="status">${esc(state.roomStatusMessage || '')}</div>
    </article>
  `;
};

export const renderRoomManage = () => {
  if (!state.activeRoom) return '';

  return `
    <div class="room-manage-layout">
      <article class="room-chat-wide">
        <div class="room-chat-head">
          <div>
            <h3>${t('roomChat')}</h3>
            <p class="room-section-hint">${t('roomChatHint')}</p>
          </div>
        </div>
        <div class="chat-log" id="roomChatLog">
          ${(state.roomChatMessages || []).length === 0 ? `<div class="chat-empty">${t('roomChatEmpty')}</div>` : (state.roomChatMessages || []).map((msg) => {
            const isSelf = msg.userId && state.user?.id && msg.userId === state.user.id;
            const lineClass = msg.role === 'system' ? 'system' : (isSelf ? 'self' : 'remote');
            const username = isSelf ? t('selfMessageLabel') : (msg.username || t('roleSystem'));
            return `<div class="chat-line ${lineClass}">
              <div class="chat-meta-row">
                <span class="chat-author">${esc(username)}</span>
                <span class="chat-time">${esc(formatClock(msg.timestamp))}</span>
              </div>
              <div class="chat-bubble">${esc(msg.text || '')}</div>
            </div>`;
          }).join('')}
        </div>
        <div class="row topgap">
          <input id="roomChatInput" placeholder="${t('chatPlaceholder')}" />
          <button class="primary" data-act="sendRoomChat">${t('send')}</button>
        </div>
      </article>
    </div>
    <div id="roomManageStatus" class="status"></div>
  `;
};
