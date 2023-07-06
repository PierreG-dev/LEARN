const collections = require("@collections");
const { sha256 } = require("js-sha256");

module.exports = async (req, res) => {
  console.log(req.body);
  const { login: _login, username: _username, password: _password } = req.body;

  if (!_login || !_username || !_password)
    return res.status(400).send({
      code: 400,
      msg: "Login, username and password are all required",
    });

  await collections.User.create({
    classId: "",
    signupCodeId: "",
    login: _login,
    username: _username,
    hashedPassword: sha256(_password),
    timestamp: new Date().getTime(),
    avatarUrl: "",
    roles: ["user", "admin"],
  }).catch(() => {
    console.error("Error during the account creation of " + login);
    return res.status(500).send({
      code: 500,
      msg:
        "An internal error occured during " +
        _username +
        "'s account creation.",
    });
  });

  return res.status(200).send({
    code: 200,
    msg: "Welcome aboard " + _username,
  });
};
