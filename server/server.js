/*
   ___________ _   _________ 
  / __/ __/ _ \ | / / __/ _ \
 _\ \/ _// , _/ |/ / _// , _/
/___/___/_/|_||___/___/_/|_| 
                             
*/

const settings = require("./settings");
({ app, io, server } = settings());

const PORT = process.env.port | 8000;

//========== DEMARRAGE ==========//
server.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});

//========== ROUTER ==========//
require("./router")(app, io);

//========== SOCKETS ==========//
require("./socket")(io);
