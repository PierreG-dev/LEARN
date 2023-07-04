/*
   ___  ___ ________ __
  / _ \/ _ /_  __/ // /
 / ___/ __ |/ / / _  / 
/_/  /_/ |_/_/ /_//_/  
                       
*/
const express = require("express");

module.exports = (app) => {
  const path = require("path");
  app.use(
    "/res",
    express.static(path.join(__dirname, "/public"))
    // add some others
  );
};
