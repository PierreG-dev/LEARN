const { model, Schema } = require("mongoose");

let schema = new Schema({
  classId: String,
  login: String,
  userName: String,
  hashedPassword: String,
  avatarUrl: String,
  roles: [String],
});

schema.statics.createUser = (packet) => {
  return new User(packet)
    .save()
    .then((snapshot) => snapshot)
    .catch((err) => {
      console.error(
        "Student.create failed when saving " + packet.username + " ==> ",
        err
      );
      return Promise.reject(err);
    });
};

const make = (connection) => {
  const User = connection.model("User", schema);
  return User;
};

module.exports = make;
