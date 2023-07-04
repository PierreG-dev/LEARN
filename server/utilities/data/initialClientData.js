const dataParser = require("./dataParser");

module.exports = async (socket) => {
  const data = await dataParser(socket.user.roles);
  socket.emit("dataProvider", data);
};
