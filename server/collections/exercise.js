const { model, Schema } = require("mongoose");

/**
 * subChapterId: id du sous-chapitre associé
 * order: ordre de l'exercice dans le sous-chapitre
 * title: titre de l'exercice
 * timetoResolve: temps moyen requis pour terminer l'exercice (débutant)
 * difficulty: note de l'exercice allant de 1 à 5 représentant la difficultée de ce dernier
 * practicedSkill: tableau contenant les compétences travaillées lors de cet exercice
 * instructions: consigne de l'exercice
 * informations: informations complémentaires liées à l'exercice
 * tips: astuces liées à l'exercice
 * demo: exemple de l'exercice
 * baseFileUrl: environnement de départ de l'exercice
 * solutions: tableau d'objets représentants les différentes solutions de l'exercice
 * solutionFileUrl: url d'un éventuel fichier solution
 * wiki: explication en détails de la résolution de l'exercice
 * links: tableau de liens utiles à l'exercice
 */

let schema = new Schema({
  subChapterId: String,
  order: Number,
  title: String,
  timeToResolve: String,
  difficulty: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
  },
  practicedSkill: [String],
  instructions: String,
  informations: String,
  tips: [String],
  demo: String,
  baseFileUrl: String,
  solutions: [
    {
      title: String,
      language: String,
      solution: String,
    },
  ],
  solutionFileUrl: String,
  wiki: String,
  links: [
    {
      title: String,
      link: String,
    },
  ],
});

schema.statics.createExercise = (packet) => {
  return new Exercise(packet)
    .save()
    .then((snapshot) => snapshot)
    .catch((err) => {
      console.error("Exercise.createExercise failed when saving: ", err);
      throw err;
    });
};

const make = (connection) => {
  const Exercise = connection.model("Exercise", schema);
  return Exercise;
};

module.exports = make;
