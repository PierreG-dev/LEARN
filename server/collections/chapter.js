const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
  chapterName: String,
  access: Boolean,
  description: String,
});

schema.statics.create = (packet) => {
  let chapter = new Chapter(packet);
  return chapter
    .save()
    .then((snapshot) => {
      return Promise.resolve(snapshot);
    })
    .catch((err) => {
      console.error(
        'Chapter.create failed when saving ' + packet.username + ' ==> ',
        err
      );
      return Promise.reject(err);
    });
};

var Chapter;
function make(connection) {
  if (Chapter) {
    return Chapter;
  }
  Chapter = connection.model('Chapter', schema);
  return Chapter;
}

module.exports = make;
