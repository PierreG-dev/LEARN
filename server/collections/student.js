const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
  studentName: String,
  groupId: String,
  accessToken_hashed: String,
});

schema.statics.create = (packet) => {
  let student = new Student(packet);
  return student
    .save()
    .then((snapshot) => {
      return Promise.resolve(snapshot);
    })
    .catch((err) => {
      console.error(
        'Student.create failed when saving ' + packet.username + ' ==> ',
        err
      );
      return Promise.reject(err);
    });
};

var Student;
function make(connection) {
  if (Student) {
    return Student;
  }
  Student = connection.model('Student', schema);
  return Student;
}

module.exports = make;
