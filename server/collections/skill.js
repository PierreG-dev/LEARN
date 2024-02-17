const { Schema, model } = require("mongoose");

/**
 * name: Intitulé du skill
 * courseId: Id du cours auquel le skill est associé
 * order: Ordre du skill
 * timestamp: date de création du skill
 */

const schema = new Schema({
  name: String,
  courseId: String,
  timestamp: Number,
});

schema.statics.createSkill = (packet) => {
  return new Skill(packet)
    .save()
    .then((snapshot) => snapshot)
    .catch((err) => {
      console.error("Skill.createSkill failed when saving: ", err);
      throw err;
    });
};

const make = (connection) => {
  const Skill = connection.model("Skill", schema);
  return Skill;
};

module.exports = make;
