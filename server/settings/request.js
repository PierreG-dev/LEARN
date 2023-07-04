/*
   ___  ________  __  ________________
  / _ \/ __/ __ \/ / / / __/ __/_  __/
 / , _/ _// /_/ / /_/ / _/_\ \  / /   
/_/|_/___/\___\_\____/___/___/ /_/    
                                      
*/

const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const express = require("express");

module.exports = (app) => {
  //upload de fichiers
  app.use(fileUpload());
  //logs des requêtes
  app.use(morgan("combined"));

  //parsing des requêtes
  app.use(express.json()); // application/json
  app.use(express.urlencoded({ extended: true })); //application/x-www-form-urlencoded

  //Gestion des erreurs de corps
  app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
      console.error(err);
      return res.status(400).send({ status: 404, message: err.message }); // Bad request
    }
    next();
  });
};
