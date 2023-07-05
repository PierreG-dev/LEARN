const collections = require("../../collections");

module.exports = (req, res) => {
  const { chapterName, description, difficulty, categories, languages } =
    req.body;

  if (!chapterName || !description || !difficulty || !categories || !languages)
    return res.status(400).send({
      code: 400,
      msg: "chapterName, description, difficulty, categories and languages are all required",
    });

  collections.Chapter.create({
    chapterName: chapterName,
    description: description,
    difficulty: difficulty,
    categories: categories,
    languages: languages,
    timestamp: new Date().getTime(),
  })
    .then(() => {
      res.status(200).send({
        code: 200,
        msg: `Chapter ${req.body.chapterName} successfully created`,
      });
    })
    .catch((error) => {
      console.error("ERROR 500 when creating a Chapter", error);
      res.status(500).send({
        code: 200,
        msg: `Chapter ${req.body.chapterName} could not be created.`,
        error: error,
      });
    });
};
