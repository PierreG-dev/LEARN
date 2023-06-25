// actions.ts
import { createAction } from '@reduxjs/toolkit';
import { ConnectionAction, ConnectionPayload } from '../../types/types';

// Nous n'avons pas besoin de payload pour ces actions, alors nous utilisons `void`
// pour indiquer que le payload n'est pas nécessaire.

// L'action pour indiquer une connexion
export const connect = createAction<ConnectionPayload>(
  'connection/connect' as ConnectionAction
);

// L'action pour indiquer une déconnexion
export const disconnect = createAction(
  'connection/disconnect' as ConnectionAction
);
