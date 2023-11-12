const adminDataParser = require('./adminDataParser');
const userDataParser = require('./userDataParser');

const dataParser = async (socket) => {
  console.log(socket.user.roles);
  if (!socket.user.roles && !Array.isArray(socket.user.roles)) return;
  if (socket.user.roles.includes('admin')) {
    return await adminDataParser(socket);
  } else if (socket.user.roles.includes('student')) {
    return await userDataParser(socket);
  }
};

module.exports = dataParser;
