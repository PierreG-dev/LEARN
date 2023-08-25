const jwt = require('jsonwebtoken');
const collections = require('@collections');
/**
 * Middleware qui se lance à chaque requête reçue, et qui vérifie l'authenticité du JWT proposé
 * Le payload du token est passé dans socket.user
 * A chaque utilisation de ce middleware, si le JWT est validé, alors la propriété lastSeen de l'utilisateur est mise à jour
 * Une fois le JWT validé, le middleware passe la main au middleware suivant
 */
module.exports = async (socket, next) => {
  // --- Récupération du JWT depuis les paramètres de la requête du socket
  const token = socket.handshake.auth.token;

  // Vérifier et décoder le JWT
  if (token) {
    try {
      // --- Décodage du token à l'aide de la clé d'encryption
      const decodedToken = jwt.verify(token, process.env.ENCRYPT_KEY);
      socket.user = decodedToken;

      // --- Mise à jour de la propriété lastSeen de l'utilisateur
      await collections.User.findOneAndUpdate(
        { _id: decodedToken.id },
        { lastActivity: new Date().getTime() }
      );
      next();
    } catch (error) {
      // --- JWT invalide ou expiré
      next(new Error('Invalid or expired token'));
    }
  } else {
    // --- JWT non fourni
    next(new Error('No token provided'));
  }
};
