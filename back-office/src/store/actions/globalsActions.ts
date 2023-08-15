import { createAction } from "@reduxjs/toolkit";

const serverOnline = createAction("globals/SERVER_ONLINE");
const serverOffline = createAction("globals/SERVER_OFFLINE");

export default {
  serverOnline,
  serverOffline,
};
