const collections = require("@collections");
const mongoose = require("mongoose");

module.exports = async (req, res, next) => {
  const { courseId: _courseId, skillName: _skillName } = req.body;

  // --- Vérification des paramètres
  if (!_courseId || !_skillName)
    return res.status(400).send({
      code: 400,
      msg: "Missing parameters",
    });

  // -- vérification du format du courseId
  if (!mongoose.Types.ObjectId.isValid(_courseId))
    return res.status(400).send({
      code: 400,
      msg: "Course ID format is not valid",
    });

  const course = await collections.Course.findOne({ _id: _courseId });

  // --- Vérification de l'existance du cours
  if (!course)
    return res.status(400).send({
      code: 400,
      msg: "This course doesn't exist",
    });

  // --- Vérification des autorisations de l'utilisateur
  if (req.user.id !== course._id && !req.user.roles.includes("admin"))
    return res.status(401).send({
      code: 401,
      msg: "You are not allowed to do this",
    });

  collections.Skill.findOneAndDelete({
    courseId: _courseId,
    name: _skillName,
  })
    .then(() => {
      res.status(200).send("Skill deleted successfully !");
      next();
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
