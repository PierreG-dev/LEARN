/*
   ___  ___ ________ __
  / _ \/ _ /_  __/ // /
 / ___/ __ |/ / / _  / 
/_/  /_/ |_/_/ /_//_/  
                       
*/
const express = require("express");
const path = require("path");
const moduleAlias = require("module-alias");

const aliases = {
  "@collections": path.resolve(__dirname, "../collections"),
  "@API": path.resolve(__dirname, "../API"),
  "@router": path.resolve(__dirname, "../router"),
  "@settings": path.resolve(__dirname, "../settings"),
  "@utilities": path.resolve(__dirname, "../utilities"),
  "@public": path.resolve(__dirname, "../public"),
};

module.exports = (app) => {
  //Chemins publics
  const resPath = path.join(__dirname, "../public");
  app.use("/res", express.static(resPath, { recursive: true }));

  //Alias pour l'environnement de dev
  moduleAlias.addAliases(aliases);
};
