/*
   ___________ _   _________ 
  / __/ __/ _ \ | / / __/ _ \
 _\ \/ _// , _/ |/ / _// , _/
/___/___/_/|_||___/___/_/|_| 
                             
*/

//========== SETUP ==========//
const settings = require("./settings");
({ app, io, server } = settings());

//========== ROUTER ==========//
require("./router")(app, io);

//========== SOCKETS ==========//
require("./socket")(io);

//========== DEMARRAGE ==========//
const PORT = process.env.port | 8000;
server.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
