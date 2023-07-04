const adminDataParser = require("./adminDataParser");
const userDataParser = require("./userDataParser");

const dataParser = async (roles) => {
  if (roles.includes("admin")) {
    return await adminDataParser();
  } else if (roles.includes("user")) {
    return await userDataParser();
  }
};

module.exports = dataParser;
