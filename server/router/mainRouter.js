const API = require("../API");
const utilities = require("../utilities");
const updater = utilities.middlewares.clientUpdater.updateClientsData;
const multer = require("multer");

module.exports = (app, io) => {
  //----------- API ------------

  // --- AUTH
  app.post("/login", API.login);
  app.post("/logout", API.logout);
  app.post("/signup", API.signUp, updater(io));
  app.post("/createAdmin", API.createAdmin, updater(io));
  app.post("/signupCodeCheck", API.signupCodeCheck);
  app.post("/api/postSchool", API.postSchool, updater(io));
  app.post("/api/postClass", API.postClass, updater(io));
  app.post("/api/postSignupCode", API.postSignupCode);
  app.put("/api/updateUser", API.updateUser, updater(io));

  // --- COURSE
  app.post("/api/postCourse", API.course.postCourse, updater(io));
  app.put("/api/putCourse", API.course.putCourse, updater(io));
  app.get("/api/getCourse", API.course.getCourse);

  // --- SKILL

  // --- LANGUAGE

  // --- EXERCICESET

  // --- EXERCICE
  app.get("/api/getExercise:id?", API.getExercise);
  app.post("/api/postExercise", API.postExercise, updater(io));
  app.put(
    "/api/updateExerciseAccess:id?",
    updater(io),
    API.updateExerciseAccess
  ); //Changer access d'un Exercise
  app.put(
    "/api/updateExerciseSolutionAccess:id?",
    API.updateExerciceSolutionAccess
  );

  // --- CHAPTER
  app.post("/api/postChapter", API.postChapter, updater(io));
  app.get("/api/getChapter:id?", API.getChapter);
  app.put("/api/updateChapterAccess:id?", updater(io), API.updateChapterAccess); //Changer access d'un Chapter

  // --- SUBCHAPTER
  app.post("/api/postSubChapter", API.postSubChapter, updater(io));
  app.put(
    "/api/updateSubChapterAccess:id?",
    updater(io),
    API.updateSubChapterAccess
  );

  // --- LESSON

  // --- STEP

  // ===== LEGACY ===== //
  // --- GET
  // app.get("/api/getGlobalData", API.globalDataProvider);
  // app.get("/api/getDataHashed", API.getDataHashed);

  // app.get("/api/getSubChapter:id?", API.getSubChapter);

  // app.get("/api/getGroup", API.getGroup);
  // app.get("/api/getSoluce:exerciceId", API.getSoluce);

  //POST

  //PUT

  //----------- Errors ------------};
};
