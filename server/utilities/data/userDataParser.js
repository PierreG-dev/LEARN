const collections = require('../../collections');

// === Récupération des classes / users / schools... === //
const userDataParser = async (socket) => {

  // --- Récupération des données de l'utilisateur
  const userData = await collections.User.findOne({
    _id: socket.user.id,
  }).lean();

  // --- Récupération de la classe de l'élève
  const classData = await collections.Class.findOne({
    _id: userData.classId,
  });

  // --- Récupération de l'école de l'élève
  const schoolData = await collections.School.findOne({
    _id: classData.schoolId,
  });

  // --- Récupération de l'enseignant de l'élève
  const teacherData = await collections.User.findOne({
    _id: schoolData.teacherId,
  });

  const user = {
    _id: userData._id,
    login: userData.login,
    username: userData.username,
    avatarUrl: userData.avatarUrl,
    timestamp: userData.timestamp,
    roles: userData.roles,
    firstName: userData.firstName,
    lastName: userData.lastName,
    theme: userData.theme
  };

  const userSchool = {
    name: schoolData.name,
    description: schoolData.description,
    logoUrl: schoolData.logoUrl,
  };

  const userClass = {
    _id: classData._id,
    name: classData.name,
    icon: classData.icon,
  };

  const userTeacher = {
    userName: teacherData.userName,
    firstName: teacherData.firstName,
    lastName: teacherData.lastName,
    avatarUrl: teacherData.avatarUrl,
  };

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

  // --- retour des données au format JSON
  return {
    user: user,
    class: userClass,
    school: userSchool,
    teacher: userTeacher,
    chapters: chaptersData,
  };
};

module.exports = userDataParser;
