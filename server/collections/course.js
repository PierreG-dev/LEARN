const { Schema, model } = require("mongoose");

/**
 * title: nom du cours
 * description: description du cours
 * iconName: icone de la librairie react-icons correspondant au cours
 * difficulty: nnote allant de 1 à 5 représentant la difficultée de maitrise du cours
 * categories: tableau d'objets, représentants chacun une famille de compétences de dev WEB
 * languages: tableau de strings, représentant les différents languages utilisés dans ce cours
 * timestamp: date de création du cours
 * order: ordre du cours dans la liste
 */

const schema = new Schema({
  teacherId: String,
  title: String,
  description: String,
  iconName: String,
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

schema.statics.createCourse = (packet) => {
  return new Course(packet)
    .save()
    .then((snapshot) => snapshot)
    .catch((err) => {
      console.error("Course.createCourse failed when saving: ", err);
      throw err;
    });
};

const make = (connection) => {
  const Course = connection.model("Course", schema);
  return Course;
};

module.exports = make;
