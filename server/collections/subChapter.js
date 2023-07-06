const { model, Schema } = require("mongoose");

var schema = new Schema({
  chapterId: String,
  title: String,
  description: String,
  order: Number,
});

schema.statics.createSubChapter = (packet) => {
  return new SubChapter(packet)
    .save()
    .then((snapshot) => snapshot)
    .catch((err) => {
      console.error("createSubChapter failed when saving: ", err);
      throw err;
    });
};

const make = (connection) => {
  const SubChapter = connection.model("SubChapter", schema);
  return SubChapter;
};

module.exports = make;
