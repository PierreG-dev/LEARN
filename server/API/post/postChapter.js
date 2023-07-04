const collections = require("../../collections");

module.exports = (req, res) => {
  // if (!req.session || !req.session.isConnected)
  //   res.status(403).send("unauthorized");
  // if (!req.body.chapterName || !req.body.description) {
  //   throw "Empty parameters";
  // }
  collections.Chapter.create({
    chapterName: req.body.chapterName,
    description: req.body.description,
    difficulty: req.body.difficulty,
    categories: req.body.categories,
    languages: req.body.languages,
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
