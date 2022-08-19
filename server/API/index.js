const getData = require('./get/getData');
const getChapter = require('./get/getChapter');
const getSubChapter = require('./get/getSubChapter');
const getExercise = require('./get/getExercise');

const postChapter = require('./post/postChapter');
const postSubChapter = require('./post/postSubChapter');
const postExercise = require('./post/postExercise');

module.exports = {
  postChapter,
  postSubChapter,
  postExercise,
  getData,
  getChapter,
  getSubChapter,
  getExercise,
};
