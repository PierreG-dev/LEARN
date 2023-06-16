// Gestionnaire de connexion Socket.IO
module.exports = (socket) => {
  console.log('Nouvelle connexion :', socket.request.session.user); // Affiche l'utilisateur associé à la session
};
