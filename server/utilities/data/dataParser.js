const adminDataParser = require("./adminDataParser");
const userDataParser = require("./userDataParser");

const dataParser = async (socket) => {
  if (socket.user.roles.includes("admin")) {
    return await adminDataParser(socket);
  } else if (socket.user.roles.includes("user")) {
    return await userDataParser(socket);
  }
};

module.exports = dataParser;
