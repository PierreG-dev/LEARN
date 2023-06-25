import { createAction } from '@reduxjs/toolkit';
import { ConnectionAction, ConnectionPayload } from '../../types/types';

// L'action pour indiquer une connexion
export const connect = createAction<ConnectionPayload>(
  'connection/connect' as ConnectionAction
);

// L'action pour indiquer une déconnexion
export const disconnect = createAction(
  'connection/disconnect' as ConnectionAction
);
