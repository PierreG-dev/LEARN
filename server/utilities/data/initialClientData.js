const dataParser = require("./dataParser");

module.exports = async (socket) => {
  const data = await dataParser(socket);
  socket.emit("dataProvider", data);
};
