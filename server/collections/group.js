const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
  groupName: String,
  access: Array,
  description: String,
});

schema.statics.create = (packet) => {
  let group = new Group(packet);
  return group
    .save()
    .then((snapshot) => {
      return Promise.resolve(snapshot);
    })
    .catch((err) => {
      console.error(
        'Group.create failed when saving ' + packet.username + ' ==> ',
        err
      );
      return Promise.reject(err);
    });
};

var Group;
function make(connection) {
  if (Group) {
    return Group;
  }
  Group = connection.model('Group', schema);
  return Group;
}

module.exports = make;
