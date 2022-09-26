const collections = require('../../collections');
const uuid = require('uuid');
module.exports = async (req, res) => {
  if (!req.body.subChapterId || !req.body.data || !req.body.instructions) {
    throw 'Empty parameters';
  }
  let coExercisesList = await collections.Exercise.find({
    subChapterId: req.body.subChapterId,
  });
  console.log(coExercisesList);

  collections.Exercise.create({
    order: coExercisesList.length + 1,
    subChapterId: req.body.subChapterId,
    data: req.body.data,
    instructions: req.body.instructions,
    solutionHTML: req.body.solutionHTML,
    solutionCSS: req.body.solutionCSS,
    solutionJS: req.body.solutionJS,
    access: false,
    solutionAccess: false,
  })
    .then(() => {
      res.status(200).send('well received !');
    })
    .catch((error) => {
      console.error('ERROR 500 when creating a Exercise', error);
      res.status(500).send('Error when creating entry.');
    });
};
