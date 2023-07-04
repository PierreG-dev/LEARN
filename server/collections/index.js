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

var connection;
function tryConnect() {
  console.log("trying " + db_url);
  connection = mongoose.createConnection(db_url, (err) => {
    if (err) {
      console.error("MongoDB connection error: ", err);
    } else {
      console.log("MongoDB connexion success");
    }
  });
}

tryConnect();

const Chapter = require("./chapter.js")(connection);
const ChapterAccess = require("./chapterAccess.js")(connection);

const SubChapter = require("./subChapter.js")(connection);
const SubChapterAccess = require("./subChapterAccess.js")(connection);

const Exercise = require("./exercise.js")(connection);
const ExerciseAccess = require("./exerciseAccess.js")(connection);

const Class = require("./class.js")(connection);
const User = require("./user.js")(connection);
const Message = require("./message.js")(connection);

const collections = {
  Chapter,
  ChapterAccess,
  SubChapter,
  SubChapterAccess,
  Exercise,
  ExerciseAccess,
  User,
  Class,
  Message,
};

module.exports = collections;
