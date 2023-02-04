const mongoose = require('mongoose');
const { stringify } = require('uuid');
const Schema = mongoose.Schema;

var schema = new Schema({
  content: String,
  author: String,
  imageUrl: String,
  timestamp: String,
  seen: Array,
});

schema.statics.create = (packet) => {
  let message = new Message(packet);
  return message
    .save()
    .then((snapshot) => {
      return Promise.resolve(snapshot);
    })
    .catch((err) => {
      console.error(
        'Message.create failed when saving ' + packet.username + ' ==> ',
        err
      );
      return Promise.reject(err);
    });
};

var Message;
function make(connection) {
  if (Message) {
    return Message;
  }
  Message = connection.model('Message', schema);
  return Message;
}

module.exports = make;
