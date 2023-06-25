const { model, Schema } = require("mongoose");

const schema = new Schema({
  content: String,
  author: String,
  imageUrl: String,
  timestamp: String,
  seen: Array,
});

schema.statics.create = (packet) => {
  return new Message(packet)
    .save()
    .then((snapshot) => snapshot)
    .catch((err) => {
      console.error(
        "Message.create failed when saving " + packet.username + " ==> ",
        err
      );
      throw err;
    });
};

const make = (connection) => {
  const Message = connection.model("Message", schema);
  return Message;
};

module.exports = make;
