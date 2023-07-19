const { model, Schema } = require("mongoose");

/**
 * name: nom de l'école
 * description: description de l'école
 * logoUrl: url pour récupérer le logo de l'école (image)
 * lastActivity: epoch correspondant à la denrière activité enregistrée sur l'école
 * order: numéro correspondant à la place de l'école (ordre personnalisé)
 * timestamp: epoch correspondant à la date de création de l'entité
 */

let schema = new Schema({
  teacherId: String,
  name: String,
  description: String,
  logoUrl: String,
  lastActivity: Number,
  order: Number,
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
