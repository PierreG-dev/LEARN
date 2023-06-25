const { model, Schema } = require("mongoose");

let schema = new Schema({
  questerId: String,
  chapterId: String,
  access: Boolean,
  solutionAccess: Boolean,
});

schema.statics.createChapterAccess = (packet) => {
  return new ChapterAccess(packet)
    .save()
    .then((snapshot) => snapshot)
    .catch((err) => {
      console.error(
        "Group.createChapterAccess failed when saving " +
          packet.questerId +
          " ==> ",
        err
      );
      throw err;
    });
};

const make = (connection) => {
  const ChapterAccess = connection.model("ChapterAccess", schema);
  return ChapterAccess;
};

module.exports = make;
