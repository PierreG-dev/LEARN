const collections = require("@collections");
const { sha256 } = require("js-sha256");

module.exports = async (req, res) => {
  const {
    signupCode: _signupCode,
    firstName: _firstName,
    lastname: _lastName,
    login: _login,
    username: _username,
    password: _password,
  } = req.body;

  if (
    !_login ||
    !_username ||
    !_password ||
    !_signupCode ||
    _firstName ||
    _lastName
  )
    return res.status(400).send({
      code: 400,
      msg: "Login, username, firstName, lastName, password and signupCode are all required",
    });

  const signupCode = await collections.SignupCode.findOne({
    code: _signupCode,
  });

  if (!signupCode || signupCode.usagesAmount <= 0)
    return res.status(400).send({
      code: 400,
      msg: "Invalid code",
    });

  collections.User.create({
    classId: signupCode.classId || "",
    signupCodeId: signupCode._id,
    login: _login,
    username: _username,
    firstName: _firstName,
    lastName: _lastName,
    hashedPassword: sha256(_password),
    timestamp: new Date().getTime(),
    avatarUrl: "",
    lastActivity: new Date().getTime(),
    isBanned: false,
    globalChatAccess: true,
    groupChatAccess: true,
    roles: ["student"],
  })
    .then(async () => {
      await collections.SignupCode.findOneAndUpdate(
        { _id: signupCode._id },
        { usagesAmount: signupCode.usagesAmount - 1 }
      );

      return res.status(200).send({
        code: 200,
        msg: "Welcome aboard " + _username,
      });
    })
    .catch(() => {
      console.error("Error during the account creation of " + login);
      return res.status(500).send({
        code: 500,
        msg:
          "An internal error occured during " +
          _username +
          "'s account creation.",
      });
    });
};
