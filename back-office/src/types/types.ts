//Store
//===== REDUX REDUCERS =====//
//connection
export interface ConnectionState {
  isConnected: boolean;
  token: string | null;
}

//globalData
export interface GlobalDataState {
  data: DataPack;
}

//===== REDUX ACTIONS =====//
// Connection
export type ConnectionAction = `connection/${"connect" | "disconnect"}`;

export interface ConnectionPayload {
  token: string | null;
}

// Data update
export type GlobalDataAction = `globalData/${"update"}`;

export interface GlobalDataUpdatePayload {
  data: Array<object>;
}

//===== API =====//
//API
export interface APIResponse {
  code: number;
  msg: string;
  [key: string]: any;
}

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
  schoolId: string;
  name: string;
  studentsAmount: number;
  registeredStudentsAmount: number;
  timestamp: number;
  exercises: Exercise[];
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
  lastSeen?: number;
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

// --- DataPack
export type DataPack = {
  user: User;
  schools?: School[];
  chapters?: Chapter[];
};
