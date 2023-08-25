const API = require('../API');
const utilities = require('../utilities');
const updater = utilities.middlewares.clientUpdater.updateClientsData;
const multer = require('multer');

module.exports = (app, io) => {
  //----------- API ------------

  //AUTH
  app.post('/login', API.login);
  app.post('/logout', API.logout);
  app.post('/signup', API.signUp, updater(io));
  app.post('/createAdmin', API.createAdmin, updater(io));
  app.post('/signupCodeCheck', API.signupCodeCheck);

  //GET
  app.get('/api/getGlobalData', API.globalDataProvider);
  app.get('/api/getDataHashed', API.getDataHashed);
  app.get('/api/getChapter:id?', API.getChapter);
  app.get('/api/getSubChapter:id?', API.getSubChapter);
  app.get('/api/getExercise:id?', API.getExercise);
  app.get('/api/getGroup', API.getGroup);
  app.get('/api/getSoluce:exerciceId', API.getSoluce);

  //POST
  app.post('/api/postChapter', API.postChapter, updater(io));
  app.post('/api/postSubChapter', API.postSubChapter, updater(io));
  app.post('/api/postExercise', API.postExercise, updater(io));
  app.post('/api/postSchool', API.postSchool, updater(io));
  app.post('/api/postClass', API.postClass, updater(io));
  app.post('/api/postSignupCode', API.postSignupCode);

  //PUT
  app.put('/api/updateChapterAccess:id?', updater(io), API.updateChapterAccess); //Changer access d'un Chapter
  app.put(
    '/api/updateSubChapterAccess:id?',
    updater(io),
    API.updateSubChapterAccess
  ); //Changer access d'un subChapter
  app.put(
    '/api/updateExerciseAccess:id?',
    updater(io),
    API.updateExerciseAccess
  ); //Changer access d'un Exercise
  app.put(
    '/api/updateExerciseSolutionAccess:id?',
    API.updateExerciceSolutionAccess
  );
  //----------- Errors ------------};
};
