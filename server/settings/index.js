/*
   _________________________  ___________
  / __/ __/_  __/_  __/  _/ |/ / ___/ __/
 _\ \/ _/  / /   / / _/ //    / (_ /\ \  
/___/___/ /_/   /_/ /___/_/|_/\___/___/                                           
*/

const cors = require("./cors");
const path = require("./path");
const request = require("./request");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:3000",
  "http://learn.pierre-godino.com",
  "http://pierre-godino.com",
  "https://localhost:5173",
  "https://localhost:3000",
  "https://127.0.0.1:5173",
  "https://127.0.0.1:3000",
  "https://learn.pierre-godino.com",
  "https://pierre-godino.com",
  "http://www.localhost:5173",
  "http://www.localhost:3000",
  "http://www.127.0.0.1:5173",
  "http://www.127.0.0.1:3000",
  "http://www.learn.pierre-godino.com",
  "http://www.pierre-godino.com",
  "https://www.localhost:5173",
  "https://www.localhost:3000",
  "https://www.127.0.0.1:5173",
  "https://www.127.0.0.1:3000",
  "https://www.learn.pierre-godino.com",
  "https://www.pierre-godino.com",
];
const corsParameters = {
  origin: allowedOrigins,
  methods: ["GET", "POST"],
  credentials: true,
};

module.exports = () => {
  const app = express();
  const server = http.createServer(app);

  //démarrage du serveur socket.io
  const io = socketIO(server, {
    cors: corsParameters,
  });
  //configuration des routes
  path(app);
  //configuration des cors
  cors(app, io, corsParameters);
  //configuration des requêtes
  request(app);

  return { app, io, server };
};
