const collections = require("@collections")
const jwt = require('jsonwebtoken')

module.exports = (req,res,next) => {
    const token = req.headers.authorization
    const {username: _username, theme: _theme} = req.body

    // --- Décodage du token à l'aide de la clé d'encryption
    const decodedToken = jwt.verify(token, process.env.ENCRYPT_KEY);

    console.log(_username, _theme)

    if (!_username || !_theme)  return res.status(400).send({
        code: 400,
        msg: 'Empty argument',
      })

      

      // --- Mise à jour de la base

      collections.User.findOneAndUpdate({_id: decodedToken.id}, {
        theme: _theme,
        username: _username
      })
      .then(res.status(200).send("Updated !"))
    }