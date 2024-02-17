const collections = require("@collections");

module.exports = async (req, res, next) => {
  const { courseId: _courseId, updatedData } = req.body;

  if (
    !_courseId ||
    !updatedData ||
    updatedData.timestamp !== undefined ||
    updatedData.order !== undefined ||
    updatedData.isLocked !== undefined
  ) {
    res.status(400).send({
      code: 400,
      msg: "Invalid request",
    });
    return;
  }

  const course = await collections.Course.findOne({ _id: _courseId });
  if (!course) {
    res.status(400).send({
      code: 400,
      msg: "The course doesn't exist",
    });
    return;
  }

  // --- Vérification que la requête provient bien du responsable
  if (course.teacherId !== req.user.id && !req.user.roles.includes("admin")) {
    res.status(401).send({
      code: 400,
      msg: "You're not allowed to do that",
    });
    return;
  }

  try {
    await collections.Course.findOneAndUpdate(
      { _id: course._id },
      { $set: updatedData }
    );
    res.status(200).send("Course updated successfully");
    next();
  } catch (err) {
    res.status(500).send(err);
  }
};