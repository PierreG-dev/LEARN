const { Schema, model } = require("mongoose");

/**
 * chapterName: nom du chapitre
 * description: description du chapitre
 * difficulty: nnote allant de 1 à 5 représentant la difficultée de maitrise du chapitre
 * categories: tableau d'objets, représentants chacun une famille de compétences de dev WEB
 * languages: tableau de strings, représentant les différents languages utilisés dans ce chapitre
 * timestamp: date de création du chapitre
 * order: ordre du chapitre dans la liste
 */

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
  order: Number,
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
