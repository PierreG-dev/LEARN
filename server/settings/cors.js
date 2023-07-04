/*
  _________  ___  ____
 / ___/ __ \/ _ \/ __/
/ /__/ /_/ / , _/\ \  
\___/\____/_/|_/___/  
                      
*/
const cors = require("cors");

module.exports = (app, corsParameters) => {
  app.use(cors(corsParameters));
};
