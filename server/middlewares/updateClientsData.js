const collections = require("../collections");

module.exports = (io) => async (req, res, next) => {
  await next();
  const chapters = await collections.Chapter.find().lean();
  setTimeout(async () => {
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

    io.emit("dataProvider", data);
  }, 200);
};
