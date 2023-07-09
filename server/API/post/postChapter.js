const collections = require("../../collections");

module.exports = async (req, res) => {
  const {
    title: _title,
    description: _description,
    difficulty: _difficulty,
    categories: _categories,
    languages: _languages,
  } = req.body;

  if (!_title || !_description || !_difficulty || !_categories || !_languages)
    return res.status(400).send({
      code: 400,
      msg: "chapterName, description, difficulty, categories and languages are all required",
    });

  collections.Chapter.create({
    title: _title,
    description: _description,
    difficulty: _difficulty,
    categories: _categories,
    languages: _languages,
    timestamp: new Date().getTime(),
    order: (await collections.Chapter.countDocuments({})) + 1,
  })
    .then(() => {
      return res.status(200).send({
        code: 200,
        msg: `Chapter ${_title} successfully created`,
      });
    })
    .catch((error) => {
      console.error("ERROR 500 when creating a Chapter", error);
      res.status(500).send({
        code: 200,
        msg: `Chapter ${_title} could not be created.`,
        error: error,
      });
    });
};
