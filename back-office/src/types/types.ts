import { Socket } from 'socket.io-client';
// CONNEXION REDUX //

//Store
export interface ConnectionState {
  isConnected: boolean;
  token: string | null;
}

//Actions
export type ConnectionAction = `connection/${'connect' | 'disconnect'}`;

export interface ConnectionPayload {
  token: string | null;
}

//API
export interface APIResponse {
  code: number;
  msg: string;
  [key: string]: any;
}
