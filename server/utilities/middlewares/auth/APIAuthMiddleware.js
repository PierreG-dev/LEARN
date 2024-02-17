const getUserFromToken = require("../../auth/getUserFromToken");

module.exports = (req, res, next) => {
  const user = getUserFromToken(req.headers.authorization);

  req.isConnected = user ? true : false;
  req.user = user || "error";

  next();
};
