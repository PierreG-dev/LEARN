const collections = require('../../collections');

module.exports = async (req, res) => {
  const exerciceId = req.params.exerciceId.slice(1);
  const folderPath = __dirname + '../../../ressources/';
  const exercice = await collections.Exercise.findOne({ _id: exerciceId });
  const subChapter = await collections.SubChapter.findOne({
    _id: exercice.subChapterId,
  });
  const chapter = await collections.Chapter.findOne({
    _id: subChapter.chapterId,
  });
  if (!exercice.solutionAccess || !exercice.access)
    res.status(401).send({
      error: 401,
      msg: 'Unauthorized',
    });
  if (!exercice.solutionFile)
    res.status(404).send({
      error: 404,
      msg: 'This exercice has no available ressources',
    });
  res
    .status(200)
    .download(
      folderPath + exerciceId + '.zip',
      chapter.chapterName +
        ' ' +
        subChapter.subChapterName +
        ' exo ' +
        exercice.order +
        '.zip'
    );
};
