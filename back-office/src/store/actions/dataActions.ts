import { createAction } from "@reduxjs/toolkit";
import { DataAction, DataUpdatePayload } from "../../types";

//action pour mettre à jour les données globales venant du serveur
export const update = createAction<DataUpdatePayload>(
  "globalData/update" as DataAction
);

export default {
  update,
};
