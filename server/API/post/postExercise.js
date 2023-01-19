const collections = require('../../collections');
const uuid = require('uuid');
module.exports = async (req, res) => {
  if (!req.body.subChapterId || !req.body.data || !req.body.instructions) {
    console.error('Empty parameters');
    console.log(req.body);
    res.status(502).send('Empty parameters');
    return;
  }

  let coExercisesList = await collections.Exercise.find({
    subChapterId: req.body.subChapterId,
  });

  const newExercice = await collections.Exercise.create({
    order: coExercisesList.length + 1,
    subChapterId: req.body.subChapterId,
    data: req.body.data,
    instructions: req.body.instructions,
    solutionHTML: req.body.solutionHTML,
    solutionCSS: req.body.solutionCSS,
    solutionJS: req.body.solutionJS,
    solutionFile: req.files ? true : false,
    access: false,
    solutionAccess: false,
  })
    .then((newExercice) => {
      if (req.files) {
        let solutionFile = req.files.solutionFile;
        solutionFile.mv(
          `${__dirname}../../../ressources/${newExercice._id}.zip`
        );
      }
    })
    .then(() => {
      res.status(200).send('Well received!');
    })
    .catch((error) => {
      console.error('ERROR 500 when creating a Exercise', error);
      res.status(500).send('Error when creating entry.');
    });
};
