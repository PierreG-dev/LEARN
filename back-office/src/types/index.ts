//Store
//===== REDUX REDUCERS =====//

import { ReactNode } from 'react';
import { Socket } from 'socket.io-client';

//connection
export interface ConnectionState {
  isConnected: boolean;
  token: string | null;
  isPending: boolean;
}

//data
export interface DataState {
  user?: User;
  schools?: School[];
  chapters?: Chapter[];
  activeUsers?: ActiveUserData[];
}

// global
export interface GlobalsState {
  isServerOnline: boolean;
}

//===== REDUX ACTIONS =====//
// Connection
export type ConnectionAction = `connection/${'connect' | 'disconnect'}`;

export interface ConnectionPayload {
  token: string | null;
}

// Data update
export type DataAction = `globalData/${
  | 'UPDATE_GLOBAL_DATA'
  | 'UPDATE_PRESENCE'}`;

export interface DataUpdatePayload {
  data: DataState;
}

export interface PresenceUpdatePayload {
  data: ActiveUserData[];
}

//===== API =====//
//API
export interface APIResponse {
  code: number;
  msg: string;
  [key: string]: any;
}
export interface CodeCheckResponse extends APIResponse {
  class: boolean;
}

// ===== MODAL ===== //

export type IContentType =
  | 'SchoolCreation'
  | 'ClassCreation'
  | 'ChapterCreation'
  | 'SubchapterCreation'
  | 'ExerciceCreation';

// ===== DATA ===== //

// --- Difficulty
type Difficulty = 1 | 2 | 3 | 4 | 5;

// --- Solution
type Solution = {
  title: string;
  language: string;
  solution: string;
};

// --- Link
type Link = {
  title: string;
  link: string;
};

// --- ActiveUsersData
export type ActiveUserData = {
  id: string;
  roles: [string];
  username: string;
  avatarUrl: string;
};

// --- School
export type School = {
  _id?: string;
  name: string;
  description: string;
  logoUrl: string;
  timestamp: number;
  classes: Class[];
};

// --- Class
export type Class = {
  _id?: string;
  signupCodeId: string;
  signupCode: string;
  schoolId: string;
  name: string;
  icon: string;
  studentsAmount: number;
  registeredStudentsAmount: number;
  timestamp: number;
  exercises: Exercise[];
  users?: User[];
};

// --- User
export type User = {
  _id?: string;
  classId?: string;
  signupCodeId?: string;
  login?: string;
  username: string;
  hashedPassword?: string;
  avatarUrl: string;
  timestamp: number;
  lastActivity?: number;
  roles?: [string];
};

// --- Chapter
export type Chapter = {
  _id?: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  categories: string[];
  languages: string[];
  timestamp?: number;
  order: number;
};

// --- SubChapter
export type SubChapter = {
  _id?: string;
  chapterId?: string;
  title: string;
  description: string;
  order: number;
};

// --- Exercise
export type Exercise = {
  _id?: string;
  subChapterId?: string;
  order: number;
  title: string;
  timeToResolve: number;
  difficulty: Difficulty;
  practicedSkill: string[];
  instructions: string;
  informations?: string;
  tips?: string[];
  demo: string;
  baseFileUrl?: string;
  solutions: Solution[];
  solutionFileUrl?: string;
  wiki?: string;
  links?: Link[];
};

// ===== CONTEXT ===== //
// --- AuthContext
export type IAuthContext = {
  socket: Socket | undefined;
  handleLogin: (login: string, password: string) => Promise<APIResponse>;
  handleSignup: (
    signupCode: string,
    firstName: string,
    lastName: string,
    login: string,
    username: string,
    password: string
  ) => Promise<APIResponse>;
  handleLogout: () => void;
  tryConnect: () => void;
  signupCodeCheck: (signupCode: string) => Promise<CodeCheckResponse>;
};
// --- ModalContext
export type IModalContext = {
  Content: React.FC;
  displayModal: (
    type: IContentType | 'custom' | 'default',
    customContent?: string
  ) => void;
};
