const { model, Schema } = require("mongoose");

/**
 * signupCodeId: id du code d'inscription associé à la classe
 * schoolId: id de l'école associée à la classe (pas d'école si vide)
 * studentsAmount: nombre d'étudiants dans la classe
 * description: description de la classe
 * timestamp: date de création de la classe
 */

let schema = new Schema({
  signupCodeId: String,
  schoolId: String,
  name: String,
  studentsAmount: Number,
  timestamp: Number,
});

schema.statics.createClass = (packet) => {
  return new Class(packet)
    .save()
    .then((snapshot) => snapshot)
    .catch((err) => {
      console.error(
        "Group.create failed when saving " + packet.username + " ==> ",
        err
      );
      throw err;
    });
};

const make = (connection) => {
  const Class = connection.model("Class", schema);
  return Class;
};

module.exports = make;
