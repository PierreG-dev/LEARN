const { model, Schema } = require("mongoose");

/**
 * classId: Id de la classe associée au code, code indépendant si vide
 * code: code à partager
 * usages: Nombre d'utilisations au code restants
 */

let schema = new Schema({
  name: String,
  description: String,
  logoUrl: String,
  timestamp: Number,
});

schema.statics.createSchool = (packet) => {
  return new School(packet)
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
  const School = connection.model("School", schema);
  return School;
};

module.exports = make;
