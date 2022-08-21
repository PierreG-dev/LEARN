const getData = require('./get/getData');
const getChapter = require('./get/getChapter');
const getSubChapter = require('./get/getSubChapter');
const getExercise = require('./get/getExercise');

const postChapter = require('./post/postChapter');
const postSubChapter = require('./post/postSubChapter');
const postExercise = require('./post/postExercise');

const updateChapterAccess = require('./put/updateChapterAccess');
const updateSubChapterAccess = require('./put/updateSubChapterAccess');
const updateExerciseAccess = require('./put/updateExerciseAccess');
const updateExerciceSolutionAccess = require('./put/updateExerciceSolutionAccess');

module.exports = {
  postChapter,
  postSubChapter,
  postExercise,
  getData,
  getChapter,
  getSubChapter,
  getExercise,
  updateChapterAccess,
  updateSubChapterAccess,
  updateExerciseAccess,
  updateExerciceSolutionAccess,
};
