const collections = require('@collections');
const { sha256 } = require('js-sha256');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  const { login: _login, password: _password } = req.body;

  if (!_login || !_password)
    return res.status(400).send({
      code: 400,
      msg: 'Login and password are required to proceed',
    });

  const user = await collections.User.findOne({ login: _login });
  const userClass = user?.classId
    ? await collections.Class.findOne({ _id: user.classId })
    : undefined;
  console.log(userClass);
  const _hashedPassword = sha256(_password);

  if (!user || _hashedPassword !== user.hashedPassword)
    return res.status(400).send({
      code: 400,
      msg: 'Invalid credentials',
    });

  if (user.isBanned)
    return res.status(403).send({
      code: 403,
      msg: 'Vous êtes banni',
    });

  if (userClass && userClass.isDisabled)
    return res.status(403).send({
      code: 403,
      msg: 'Vous ne pouvez pas vous connecter pour le moment, veuillez réessayer plus tard',
    });

  const token = jwt.sign(
    {
      id: user._id,
      roles: user.roles,
      username: user.username,
      avatarUrl: user.avatarUrl,
    },
    process.env.ENCRYPT_KEY,
    { expiresIn: '12h' }
  );

  return res.status(200).send({
    code: 200,
    msg: 'You are now connected',
    token: token,
  });
};
