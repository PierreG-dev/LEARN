const collections = require('../../collections');
const { encryptString, decryptString } = require('encrypt-string');

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

  let encryptedData = await encryptString(
    JSON.stringify(data),
    process.env.ENCRYPT_KEY
  );

  res.status(200).send(encryptedData);
};
