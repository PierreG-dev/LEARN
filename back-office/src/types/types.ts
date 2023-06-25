//Store
//===== REDUX REDUCERS =====//
//connection
export interface ConnectionState {
  isConnected: boolean;
  token: string | null;
}

//globalData
export interface GlobalDataState {
  data: Array<object>
}

//===== REDUX ACTIONS =====//
// Connection
export type ConnectionAction = `connection/${'connect' | 'disconnect'}`;

export interface ConnectionPayload {
  token: string | null;
}

// Data update
export type GlobalDataAction = `globalData/${'update'}`

export interface GlobalDataUpdatePayload {
  data: Array<object>
}



//===== API =====//
//API
export interface APIResponse {
  code: number;
  msg: string;
  [key: string]: any;
}
