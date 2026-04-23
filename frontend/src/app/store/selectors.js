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
