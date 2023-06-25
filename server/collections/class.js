const { model, Schema } = require("mongoose");

let schema = new Schema({
  groupName: String,
  access: Array,
  description: String,
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
