const collections = require("../../collections");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const {
    title: _title,
    description: _description,
    iconName: _iconName,
    difficulty: _difficulty,
    categories: _categories,
    languages: _languages,
  } = req.body;

  // --- Décodage du token à l'aide de la clé d'encryption
  const user = jwt.verify(req.headers.authorization, process.env.ENCRYPT_KEY);
  // Test des droits à la création d'un cours
  if (
    !user ||
    (!user.roles.includes("admin") && !user.roles.includes("teacher"))
  ) {
    return res.status(400).send({
      code: 401,
      msg: "Not allowed",
    });
  }

  // --- Test présence des informations nécessaires
  if (
    !_title ||
    !_description ||
    !_difficulty ||
    !_categories ||
    !_languages ||
    !_iconName
  )
    return res.status(400).send({
      code: 400,
      msg: "courseName, description, difficulty, categories, languages and iconName are all required",
    });

  collections.Course.create({
    teacherId: user.id,
    title: _title,
    description: _description,
    iconName: _iconName,
    difficulty: _difficulty,
    categories: _categories,
    languages: _languages,
    timestamp: new Date().getTime(),
    order: (await collections.Course.countDocuments({})) + 1,
  })
    .then(() => {
      res.status(200).send({
        code: 200,
        msg: `Course ${_title} successfully created`,
      });
      next();
    })
    .catch((error) => {
      console.error("ERROR 500 when creating a Course", error);
      res.status(500).send({
        code: 200,
        msg: `Course ${_title} could not be created.`,
        error: error,
      });
    });
};
