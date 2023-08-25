const utilities = require('./utilities');

module.exports = (io) => {
  //middleware d'authentification
  io.use(utilities.middlewares.auth.authMiddleware);

  io.on('connect', async (socket) => {
    console.log('Nouvelle connexion: ' + socket.user.username);

    //Allumage du socket permettant l'update des clients
    socket.on('dataProvider', () => {});

    //Envoi des données initiales au client
    utilities.data.initialClientData(socket);

    // Écoutez l'événement de déconnexion du socket
    socket.on('disconnect', () => {
      console.log('Déconnexion de ' + socket.user.username);
    });
  });
};
