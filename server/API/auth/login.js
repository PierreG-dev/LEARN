const jwt = require('jsonwebtoken');
// Route d'authentification pour définir l'utilisateur dans la session
module.exports = (req, res) => {
  // Vérifiez les informations d'identification
  const login = req.body.login;
  const password = req.body.password;

  if (
    login === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ username: login }, process.env.ENCRYPT_KEY);
    // retour positif + envoi du JWT
    res.status(200).json({ code: 200, msg: 'Connexion réussie', token: token });
  } else {
    // Retour négatif
    res.status(401).json({
      code: 401,
      msg: 'Identifiants invalides',
    });
  }
};
