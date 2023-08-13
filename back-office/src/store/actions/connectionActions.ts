import { createAction } from "@reduxjs/toolkit";
import { ConnectionAction, ConnectionPayload } from "../../types";

// L'action pour indiquer une connexion
export const connect = createAction<ConnectionPayload>(
  "connection/CONNECT" as ConnectionAction
);

// L'action pour indiquer une déconnexion
export const disconnect = createAction(
  "connection/DISCONNECT" as ConnectionAction
);

// L'action pour démarrer l'attente de connexion
export const startPending = createAction(
  "connection/START_PENDING" as ConnectionAction
);

// L'action pour arréter l'attente de connexion
export const stopPending = createAction(
  "connection/STOP_PENDING" as ConnectionAction
);

export default {
  connect,
  disconnect,
  startPending,
  stopPending,
};
