const API = require("../API");

module.exports = (app, io) => {
  //============== PING =====================//
  app.get("/ping", (req, res) => res.status(200).send("pong"));
  //============== LIVE CHAT =====================//

  // app.put('/api/chatConnect', API.putAuthChat);
  // app.put('/api/chatDisconnect', API.putDisconnectChat);
  app.post("/api/getChat", API.getMessages);
  app.post("/api/postChat", API.postMessageChat);

  //============== EXERCICE GENERATOR =====================//
  app.post("/api/getGeneratedExercices", API.getGeneratedExercices);

  //============== FOR MY STUDENTS ===============//
};
