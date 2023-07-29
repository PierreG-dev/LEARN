/*
   ___   ___  ____
  / _ | / _ \/  _/
 / __ |/ ___// /  
/_/ |_/_/  /___/  
                  
*/

const globalDataProvider = require('@API/get/globalDataProvider');
const getDataHashed = require('@API/get/getDataHashed');
const getChapter = require('@API/get/getChapter');
const getSubChapter = require('@API/get/getSubChapter');
const getExercise = require('@API/get/getExercise');
const getGroup = require('@API/get/getGroup');
const getSoluce = require('@API/get/getSoluce');
const getGeneratedExercices = require('@API/post/postGeneratedExercices');

// ----- DATA CREATION ----- //
const postChapter = require('@API/post/postChapter');
const postSubChapter = require('@API/post/postSubChapter');
const postExercise = require('@API/post/postExercise');
const postSchool = require('@API/post/postSchool');
const postClass = require('@API/post/postClass');
const postSignupCode = require('@API/post/postSignupCode');

// ----- DATA UPDATE ----- //
const updateChapterAccess = require('@API/put/updateChapterAccess');
const updateSubChapterAccess = require('@API/put/updateSubChapterAccess');
const updateExerciseAccess = require('@API/put/updateExerciseAccess');
const updateExerciceSolutionAccess = require('@API/put/updateExerciceSolutionAccess');

// ----- CHAT ----- //
const getMessages = require('@API/chat/getChat');
const postMessageChat = require('@API/chat/postChat');
const putAuthChat = require('@API/chat/auth');
const putDisconnectChat = require('@API/chat/disconnect');

// ----- AUTH ----- //
const login = require('@API/auth/login');
const logout = require('@API/auth/logout');
const signUp = require('@API/auth/signUp');
const createAdmin = require('@API/auth/createAdmin');
const signupCodeCheck = require('@API/auth/signupCodeCheck');

module.exports = {
  postChapter,
  postSubChapter,
  postExercise,
  postSchool,
  postClass,
  postSignupCode,
  globalDataProvider,
  getDataHashed,
  getChapter,
  getSubChapter,
  getExercise,
  getGroup,
  getSoluce,
  getGeneratedExercices,
  updateChapterAccess,
  updateSubChapterAccess,
  updateExerciseAccess,
  updateExerciceSolutionAccess,
  getMessages,
  postMessageChat,
  putAuthChat,
  putDisconnectChat,
  login,
  logout,
  signUp,
  createAdmin,
  signupCodeCheck,
};
