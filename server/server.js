//Node | Express setup
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT = process.env.port | 8000;

//SocketIO setup
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
  let now = new Date();
  res.send({
    title: 'Hello world!',
    timestamp: now.getTime(),
  });
});

server.listen(PORT, () => {
  console.log('Server app listening on port ' + PORT);
});

io.on('connection', (socket) => {
  console.log(socket);
  console.log('a user connected');
});
