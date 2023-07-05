const { Schema, model } = require("mongoose");

const schema = new Schema({
  chapterName: String,
  description: String,
  difficulty: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
  },
  categories: [
    {
      type: String,
      enum: ["Front-end", "Back-end", "Dev-ops", "Outils"],
    },
  ],
  languages: [String],
  timestamp: Number,
});

schema.statics.createChapter = (packet) => {
  return new Chapter(packet)
    .save()
    .then((snapshot) => snapshot)
    .catch((err) => {
      console.error("Chapter.createChapter failed when saving: ", err);
      throw err;
    });
};

const make = (connection) => {
  const Chapter = connection.model("Chapter", schema);
  return Chapter;
};

module.exports = make;
