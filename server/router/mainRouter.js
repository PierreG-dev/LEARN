const API = require("../API");
const utilities = require("../utilities");
const updater = utilities.middlewares.clientUpdater.updateClientsData;

module.exports = (app, io) => {
  //----------- API ------------

  //AUTH
  app.post("/login", API.login);
  app.post("/logout", API.logout);
  app.post("/signup", API.signUp);
  app.post("/createAdmin", API.createAdmin);

  //GET
  app.get("/api/getGlobalData", API.globalDataProvider);
  app.get("/api/getDataHashed", API.getDataHashed);
  app.get("/api/getChapter:id?", API.getChapter);
  app.get("/api/getSubChapter:id?", API.getSubChapter);
  app.get("/api/getExercise:id?", API.getExercise);
  app.get("/api/getGroup", API.getGroup);
  app.get("/api/getSoluce:exerciceId", API.getSoluce);

  //POST
  app.post("/api/postChapter", updater(io), API.postChapter);
  app.post("/api/postSubChapter", updater(io), API.postSubChapter);
  app.post("/api/postExercise", updater(io), API.postExercise);
  app.post("/api/postSchool", API.postSchool);
  app.post("/api/postClass", API.postClass);
  app.post("/api/postSignupCode", API.postSignupCode);

  //PUT
  app.put("/api/updateChapterAccess:id?", API.updateChapterAccess); //Changer access d'un Chapter
  app.put("/api/updateSubChapterAccess:id?", API.updateSubChapterAccess); //Changer access d'un subChapter
  app.put("/api/updateExerciseAccess:id?", API.updateExerciseAccess); //Changer access d'un Exercise
  app.put(
    "/api/updateExerciseSolutionAccess:id?",
    API.updateExerciceSolutionAccess
  );
  //----------- Errors ------------};
};
