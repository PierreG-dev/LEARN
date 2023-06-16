const jwt = require('jsonwebtoken');
// Middleware d'authentification
module.exports = (socket, next) => {
  // Récupérer le JWT depuis les paramètres de la requête du socket
  const token = socket.handshake.auth.token;
  console.log(token);

  // Vérifier et décoder le JWT
  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.ENCRYPT_KEY); // Remplacez 'your-secret-key' par votre clé secrète pour la vérification du JWT
      // Authentification réussie, ajouter les informations de l'utilisateur au socket
      socket.userId = decodedToken.userId;
      socket.username = decodedToken.username;
      next();
    } catch (error) {
      // JWT invalide ou expiré
      next(new Error('Invalid or expired token'));
    }
  } else {
    // JWT non fourni
    next(new Error('No token provided'));
  }
};
