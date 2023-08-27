import { createAction } from '@reduxjs/toolkit';
import {
  DataAction,
  DataUpdatePayload,
  PresenceUpdatePayload,
} from '../../types';

// --- Action pour mettre à jour les données globales venant du serveur
export const update = createAction<DataUpdatePayload>(
  'globalData/UPDATE_GLOBAL_DATA' as DataAction
);

// --- Action pour mettre à jour la liste des utilisateurs connectés
export const updatePresence = createAction<PresenceUpdatePayload>(
  'globalData/UPDATE_PRESENCE' as DataAction
);

export default {
  update,
  updatePresence,
};
