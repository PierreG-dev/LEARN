const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
  order: Number,
  subChapterId: String,
  data: String,
  instructions: String,
  solutionHTML: String,
  solutionCSS: String,
  solutionJS: String,
  access: Boolean,
  solutionAccess: Boolean,
});

schema.statics.create = (packet) => {
  let exercise = new Exercise(packet);
  return exercise
    .save()
    .then((snapshot) => {
      return Promise.resolve(snapshot);
    })
    .catch((err) => {
      console.error(
        'Exercise.create failed when saving ' + packet.username + ' ==> ',
        err
      );
      return Promise.reject(err);
    });
};

var Exercise;
function make(connection) {
  if (Exercise) {
    return Exercise;
  }
  Exercise = connection.model('Exercise', schema);
  return Exercise;
}

module.exports = make;
