const { model, Schema } = require("mongoose");

let schema = new Schema({
  subChapterId: String,
  order: Number,
  title: String,
  timeToResolve: Number,
  difficulty: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
  },
  practicedSkill: [String],
  instructions: String,
  Informations: String,
  demo: String,
  tips: [String],
  baseFile: String,
  solutions: [
    {
      language: String,
      solution: String,
    },
  ],
  solutionFile: String,
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
