const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
  chapterId: String,
  subPartName: String,
  access: Boolean,
});

schema.statics.create = (packet) => {
  let subChapter = new SubChapter(packet);
  return subChapter
    .save()
    .then((snapshot) => {
      return Promise.resolve(snapshot);
    })
    .catch((err) => {
      console.error(
        'SubChapter.create failed when saving ' + packet.username + ' ==> ',
        err
      );
      return Promise.reject(err);
    });
};

var SubChapter;
function make(connection) {
  if (SubChapter) {
    return SubChapter;
  }
  SubChapter = connection.model('SubChapter', schema);
  return SubChapter;
}

module.exports = make;
