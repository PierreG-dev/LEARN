const { model, Schema } = require("mongoose");

let schema = new Schema({
  questerId: String,
  exerciseId: String,
  access: Boolean,
  solutionAccess: Boolean,
});

schema.statics.createExerciseAccess = (packet) => {
  return new ExerciseAccess(packet)
    .save()
    .then((snapshot) => snapshot)
    .catch((err) => {
      console.error(
        "Group.createExerciseAccess failed when saving " +
          packet.questerId +
          " ==> ",
        err
      );
      throw err;
    });
};

const make = (connection) => {
  const ExerciseAccess = connection.model("ExerciseAccess", schema);
  return ExerciseAccess;
};

module.exports = make;
