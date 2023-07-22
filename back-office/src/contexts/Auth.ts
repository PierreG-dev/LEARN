import { createContext } from "react";
import { IAuthContext } from "../types/types";

export const AuthContext = createContext<IAuthContext | object>({});
