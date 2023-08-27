module.exports = async (io) => {
  // Liste de tous les sockets clients connectés
  const sockets = await io.fetchSockets();

  // Création du tableau des users à partir des infos stockées dans les sockets actifs
  const activeUsers = sockets.map((socket) => {
    console.log(`[Socket ${socket.user.username}: ${socket.connected}]`);
    return socket.user || 'N/A';
  });

  io.emit('activeUsers', activeUsers);
};
