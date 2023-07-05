const { model, Schema } = require("mongoose");

/**
 * classId: Id de la classe associée au code, code indépendant si vide
 * code: code à partager
 * usagesAmount: Nombre d'utilisations au code restants
 */

let schema = new Schema({
  classId: String,
  code: String,
  usagesAmount: Number,
  timestamp: Number,
});

schema.statics.createSignupCode = (packet) => {
  return new SignupCode(packet)
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
  const SignupCode = connection.model("SignupCode", schema);
  return SignupCode;
};

module.exports = make;
