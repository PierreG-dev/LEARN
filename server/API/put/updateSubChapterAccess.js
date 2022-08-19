const collections = require('../../collections');
const uuid = require('uuid');
module.exports = (req, res) => {
  if (
    !req.body.subChapterId ||
    !req.body.data ||
    !req.body.instructions ||
    !req.body.solution
  ) {
    throw 'Empty parameters';
  }
  collections.Exercise.create({
    subChapterId: req.body.subChapterId,
    data: req.body.data,
    instructions: req.body.instructions,
    solution: req.body.solution,
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
