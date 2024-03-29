const getData = require("./get/getData");
const getDataHashed = require("./get/getDataHashed");
const getChapter = require("./get/getChapter");
const getSubChapter = require("./get/getSubChapter");
const getExercise = require("./get/getExercise");
const getGroup = require("./get/getGroup");
const getSoluce = require("./get/getSoluce");
const getGeneratedExercices = require("./post/postGeneratedExercices");

const postChapter = require("./post/postChapter");
const postSubChapter = require("./post/postSubChapter");
const postExercise = require("./post/postExercise");
const postGroup = require("./post/postGroup");

const updateChapterAccess = require("./put/updateChapterAccess");
const updateSubChapterAccess = require("./put/updateSubChapterAccess");
const updateExerciseAccess = require("./put/updateExerciseAccess");
const updateExerciceSolutionAccess = require("./put/updateExerciceSolutionAccess");

// ----- CHAT ----- //
const getMessages = require("./chat/getChat");
const postMessageChat = require("./chat/postChat");
const putAuthChat = require("./chat/auth");
const putDisconnectChat = require("./chat/disconnect");

module.exports = {
  postChapter,
  postSubChapter,
  postExercise,
  postGroup,
  getData,
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
};
