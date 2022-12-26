const collections = require('../../collections');
const Crypt = require('cryptr');
const Cryptr = require('cryptr');

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

  let encrypter = new Cryptr(process.env.ENCRYPT_KEY);
  let encryptedData = encrypter.encrypt(JSON.stringify(data));

  res.status(200).send(encryptedData);
};
