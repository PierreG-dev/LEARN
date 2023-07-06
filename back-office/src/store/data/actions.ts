import { createAction } from "@reduxjs/toolkit";
import { GlobalDataAction, GlobalDataUpdatePayload } from "../../types/types";

//action pour mettre à jour les données globales venant du serveur
export const update = createAction<GlobalDataUpdatePayload>('globalData/update' as GlobalDataAction)