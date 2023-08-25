const collections = require('../../../collections');
const { dataParser } = require('../../data');

module.exports = (io) => async (req, res, next) => {
  // Obtenez la liste de tous les sockets clients connectés
  const sockets = await io.fetchSockets();

  // Pour chaque socket, génèrez les données spécifiques et envoyez-les
  for (const socket of sockets) {
    const data = await dataParser(socket);
    socket.emit('dataProvider', data);
  }

  next();
};
