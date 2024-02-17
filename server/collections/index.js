/*
  _________  __   __   _______________________  _  ______
 / ___/ __ \/ /  / /  / __/ ___/_  __/  _/ __ \/ |/ / __/
/ /__/ /_/ / /__/ /__/ _// /__  / / _/ // /_/ /    /\ \  
\___/\____/____/____/___/\___/ /_/ /___/\____/_/|_/___/  
                                                         
*/

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
require("dotenv").config();

const db_url = process.env.DB_URL || "mongodb://localhost/LEARN";

let connection;
const tryConnect = () => {
  console.log("trying " + db_url);
  try {
    connection = mongoose.createConnection(db_url);
    console.log("MongoDB connexion success");
  } catch (err) {
    console.error("MongoDB connexion error: " + err);
  }
};

tryConnect();

const Course = require("@collections/course.js")(connection);
const CourseAccess = require("@collections/courseAccess.js")(connection);

const Skill = require("@collections/skill.js")(connection);

const Chapter = require("@collections/chapter.js")(connection);
const ChapterAccess = require("@collections/chapterAccess.js")(connection);

const SubChapter = require("@collections/subChapter.js")(connection);
const SubChapterAccess = require("@collections/subChapterAccess.js")(
  connection
);

const Exercise = require("@collections/exercise.js")(connection);
const ExerciseAccess = require("@collections/exerciseAccess.js")(connection);

const School = require("@collections/school.js")(connection);
const SignupCode = require("@collections/signupCode.js")(connection);
const Class = require("@collections/class.js")(connection);
const User = require("@collections/user.js")(connection);

const Message = require("@collections/message.js")(connection);

const collections = {
  Course,
  CourseAccess,
  Skill,
  Chapter,
  ChapterAccess,
  SubChapter,
  SubChapterAccess,
  Exercise,
  ExerciseAccess,
  School,
  SignupCode,
  Class,
  User,
  Message,
};

module.exports = collections;
