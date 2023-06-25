const jwt = require('jsonwebtoken');

// Route de déconnexion pour invalider le JWT
module.exports = (req, res) => {
  // Récupère le JWT depuis les en-têtes de la requête
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token non fourni' });
  }

  try {
    // Vérifie et décode le JWT pour obtenir les informations d'identification de l'utilisateur
    const decoded = jwt.verify(token, process.env.ENCRYPT_KEY);
    // Déconnexion réussie, renvoie une réponse 200 OK
    res.status(200).send({ code: 200, msg: 'Déconnexion réussie' });
  } catch (error) {
    res.status(401).json({ code: 401, msg: 'Token invalide' });
  }
};
