const collections = require("@collections");
const utilities = require("@utilities");
const updateActiveUsers = utilities.middlewares.clientUpdater.updateActiveUsers;

module.exports = (io) => {
  //middleware d'authentification
  io.use(utilities.middlewares.auth.SocketAuthMiddleware);

  io.on("connect", async (socket) => {
    // --- Mise à jour des utilisateurs connectés
    updateActiveUsers(io);
    console.log("Nouvelle connexion: " + socket.user.username);

    // --- Allumage du socket permettant l'update des clients
    socket.on("dataProvider", () => {});

    // --- Envoi des données initiales au client
    utilities.data.initialClientData(socket);

    // Écoutez l'événement de déconnexion du socket
    socket.on("disconnect", async () => {
      socket.disconnect(true);
      await collections.User.findOneAndUpdate(
        { _id: socket.user.id },
        { lastActivity: new Date().getTime() }
      );
      // --- Mise à jour des utilisateurs connectés
      updateActiveUsers(io);
      console.log("Déconnexion de " + socket.user.username);
    });
  });
};
