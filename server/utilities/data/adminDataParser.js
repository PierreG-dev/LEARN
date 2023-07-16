const collections = require("../../collections");

const adminDataParser = async (socket) => {
  // --- Récupération des classes / users / schools...
  const schools = await collections.School.find().lean();
  const schoolsData = await Promise.all(
    schools.map(async (schoolItem) => {
      const classes = await collections.Class.find({
        schoolId: schoolItem._id,
      }).lean();
      const classesData = await Promise.all(
        classes.map(async (classItem) => {
          const registeredStudentsAmount =
            await collections.User.countDocuments({
              classId: classItem._id,
            });
          const users = await collections.User.find({
            classId: classItem._id,
          }).lean();

          return {
            ...classItem,
            registeredStudentsAmount,
            users,
          };
        })
      );

      return { ...schoolItem, classes: classesData };
    })
  );

  // --- Récupération des chapters / subchapters / exercises...
  const chapters = await collections.Chapter.find().lean();
  const chaptersData = await Promise.all(
    chapters.map(async (chapterItem) => {
      const subChapters = await collections.SubChapter.find({
        chapterId: chapterItem._id,
      }).lean();
      const subChaptersData = await Promise.all(
        subChapters.map(async (subChapterItem) => {
          const exercices = await collections.Exercise.find({
            subChapterId: subChapterItem._id,
          }).lean();

          return {
            ...subChapterItem,
            exercices,
          };
        })
      );

      return {
        ...chapterItem,
        subChapters: subChaptersData,
      };
    })
  );

  // --- Récupération des données de l'admin
  let userData = await collections.User.findOne({ _id: socket.user.id }).lean();
  const user = {
    _id: userData._id,
    login: userData.login,
    username: userData.username,
    avatarUrl: userData.avatarUrl,
    timestamp: userData.timestamp,
    roles: userData.roles,
  };

  // --- retour des données au format JSON
  return {
    user: user,
    schools: schoolsData,
    chapters: chaptersData,
  };
};

module.exports = adminDataParser;
