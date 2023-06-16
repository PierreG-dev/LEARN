const jwt = require('jsonwebtoken');

// Route de déconnexion pour invalider le JWT
module.exports = (req, res) => {
  const token = req.headers.authorization; // Récupère le JWT depuis les en-têtes de la requête
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'Token non fourni' });
  }

  try {
    // Vérifie et décode le JWT pour obtenir les informations d'identification de l'utilisateur
    const decoded = jwt.verify(token, process.env.ENCRYPT_KEY);

    // Effectuez ici toutes les opérations nécessaires pour gérer la déconnexion de l'utilisateur
    // Par exemple, vous pouvez supprimer le JWT de la base de données ou ajouter le JWT à une liste noire

    res.sendStatus(200); // Déconnexion réussie, renvoie une réponse 200 OK
  } catch (error) {
    res.status(401).json({ message: 'Token invalide' });
  }
};
