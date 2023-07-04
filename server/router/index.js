/*
   ___  ____  __  _______________ 
  / _ \/ __ \/ / / /_  __/ __/ _ \
 / , _/ /_/ / /_/ / / / / _// , _/
/_/|_|\____/\____/ /_/ /___/_/|_| 
                                  
*/

const mainRouter = require("./mainRouter");
const secondaryRouter = require("./secondaryRouter");

module.exports = (app, io) => {
  //Main router (Essentials routes)
  mainRouter(app, io);

  //secondaryRouter (Non essentials routes)
  secondaryRouter(app, io);
};
