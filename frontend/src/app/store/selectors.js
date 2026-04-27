import { state } from '../state';

export const getActiveRoomParticipants = () => {
  const participants = state.activeRoom?.participants;
  return Array.isArray(participants) ? participants : [];
};

export const getPlayers = () => getActiveRoomParticipants().filter((participant) => participant.role !== 'spectator');

export const getSpectators = () => getActiveRoomParticipants().filter((participant) => participant.role === 'spectator');

export const getMyParticipant = () => getActiveRoomParticipants().find((participant) => participant.userId === state.user?.id) || null;

export const isRoomOwner = () => Boolean(state.user?.id) && state.activeRoom?.ownerId === state.user.id;

export const isSameActiveRoom = (roomId) => Boolean(roomId && state.activeRoom?.roomId === roomId);

export const getActiveMatchPlayers = () => {
  const players = state.activeMatch?.players;
  return Array.isArray(players) ? players : [];
};

export const isUserInMatch = (match = state.activeMatch, userId = state.user?.id) => {
  if (!userId) return false;
  const players = Array.isArray(match?.players) ? match.players : [];
  return players.some((player) => player.userId === userId);
};

export const getCurrentRound = () => state.activeMatch?.currentRound || null;

export const isMyTurnInMatch = () => Boolean(state.user?.id) && getCurrentRound()?.activePlayerId === state.user.id;

export const getMyMatchRoundPlayer = () => {
  const round = getCurrentRound();
  if (!round || !Array.isArray(round.players)) return null;
  return round.players.find((player) => player.userId === state.user?.id) || null;
};

export const getTargetableMatchPlayers = ({ includeSelf = false } = {}) => {
  const round = getCurrentRound();
  const players = Array.isArray(round?.players) ? round.players : [];
  return players.filter((player) => {
    if (player.eliminated) return false;
    if (player.userId === state.user?.id) {
      return includeSelf;
    }

    return !player.protectedFromEffects;
  });
};

export const getActiveMatchOpponents = () => getTargetableMatchPlayers();
