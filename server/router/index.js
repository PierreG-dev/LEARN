/*
   ___  ____  __  _______________ 
  / _ \/ __ \/ / / /_  __/ __/ _ \
 / , _/ /_/ / /_/ / / / / _// , _/
/_/|_|\____/\____/ /_/ /___/_/|_| 
                                  
*/

const mainRouter = require("@router/mainRouter");
const secondaryRouter = require("@router/secondaryRouter");
const APIAuthMiddleware =
  require("@utilities").middlewares.auth.APIAuthMiddleware;

module.exports = (app, io) => {
  // --- Auth middleware for Rest API
  app.use(APIAuthMiddleware);

  // --- Routers
  //Main router (Essentials routes)
  mainRouter(app, io);

  //secondaryRouter (Non essentials routes)
  secondaryRouter(app, io);
};
