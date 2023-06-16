const jwt = require('jsonwebtoken');
// Route d'authentification pour définir l'utilisateur dans la session
module.exports = (req, res) => {
  // Vérifiez les informations d'identification
  const username = req.body.username;
  const password = req.body.password;

  // Exemple de vérification basique, vous devriez utiliser votre propre logique d'authentification
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ username: username }, process.env.ENCRYPT_KEY);
    // Renvoyez le JWT au client
    res.status(200).json({ token: token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};
