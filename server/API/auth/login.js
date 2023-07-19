const collections = require("@collections");
const { sha256 } = require("js-sha256");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  const { login: _login, password: _password } = req.body;

  if (!_login || !_password)
    return res.status(400).send({
      code: 400,
      msg: "Login and password are required to proceed",
    });

  const user = await collections.User.findOne({ login: _login });
  const _hashedPassword = sha256(_password);

  if (!user || _hashedPassword !== user.hashedPassword)
    return res.status(400).send({
      code: 400,
      msg: "Invalid credentials",
    });

  if (user.banned)
    return res.status(403).send({
      code: 403,
      msg: "You are banned",
    });

  const token = jwt.sign(
    { id: user._id, roles: user.roles, username: user.username },
    process.env.ENCRYPT_KEY,
    { expiresIn: "12h" }
  );

  return res.status(200).send({
    code: 200,
    msg: "You are now connected",
    token: token,
  });
};
