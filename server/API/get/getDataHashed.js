const collections = require("../../collections");
const sha256 = require("js-sha256").sha256;

module.exports = async (req, res) => {
  const chapters = await collections.Chapter.find().lean();

  const data = await Promise.all(
    chapters.map(async (chapter) => {
      let subChapterList = await collections.SubChapter.find({
        chapterId: chapter._id,
      }).lean();

      subChapterList = await Promise.all(
        subChapterList.map(async (subChapter) => {
          const exerciceList = await collections.Exercise.find({
            subChapterId: subChapter._id,
          }).lean();

          return {
            ...subChapter,
            exerciceList,
          };
        })
      );

      return {
        ...chapter,
        subChapterList,
      };
    })
  );

  let hashedData = sha256(JSON.stringify(data));

  res.status(200).send(hashedData);
};
