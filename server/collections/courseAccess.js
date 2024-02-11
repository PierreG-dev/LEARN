const { model, Schema } = require("mongoose");

let schema = new Schema({
  questerId: String,
  courseId: String,
  access: Boolean,
});

schema.statics.createCourseAccess = (packet) => {
  return new CourseAccess(packet)
    .save()
    .then((snapshot) => snapshot)
    .catch((err) => {
      console.error(
        "Group.createCourseAccess failed when saving " +
          packet.questerId +
          " ==> ",
        err
      );
      throw err;
    });
};

const make = (connection) => {
  const CourseAccess = connection.model("CourseAccess", schema);
  return CourseAccess;
};

module.exports = make;
