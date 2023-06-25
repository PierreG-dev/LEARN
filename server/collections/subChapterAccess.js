const { model, Schema } = require("mongoose");

let schema = new Schema({
  questerId: String,
  subChapterId: String,
  access: Boolean,
  solutionAccess: Boolean,
});

schema.statics.createSubChapterAccess = (packet) => {
  return new SubChapterAccess(packet)
    .save()
    .then((snapshot) => snapshot)
    .catch((err) => {
      console.error(
        "Group.createsSubChapterAccess failed when saving " +
          packet.questerId +
          " ==> ",
        err
      );
      throw err;
    });
};

const make = (connection) => {
  const SubChapterAccess = connection.model("SubChapterAccess", schema);
  return SubChapterAccess;
};

module.exports = make;
