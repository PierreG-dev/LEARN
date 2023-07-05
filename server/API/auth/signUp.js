const collections = require("@collections");

module.exports = (req, res) => {
  if (!req.body.signupCode)
    return res.status(400).send({
      code: 400,
      msg: "code is not valid or missing",
    });

  if (!req.body.login || !req.body.username || !req.body.password)
    return res.status(400).send({
      code: 400,
      msg: "Missing parameters",
    });
};
