const { model, Schema } = require("mongoose");

/**
 * classId: id de la classe associée à l'élève, indépendant si vide
 * signupCodeId: id du code utilisé lors de l'inscription
 * login: login de connexion
 * userName: pseudonyme
 * hashedPassword: mot de passe hashé
 * avatarUrl: url de l'image de profil
 * timestamp: date d'inscription
 * lastSeen: date de la dernière requête
 * roles: tableau des différents rôles associés au compte
 */

let schema = new Schema({
  classId: String,
  signupCodeId: String,
  login: String,
  username: String,
  hashedPassword: String,
  avatarUrl: String,
  timestamp: Number,
  lastActivity: Number,
  banned: Boolean,
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
