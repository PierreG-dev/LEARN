const collections = require('../../collections');
module.exports = async (req, res) => {
  if (!req.params.id) throw 'empty parameters';
  let exercice = await collections.Exercise.find({
    _id: req.params.id.slice(1),
  }).lean();

  let updated = await collections.Exercise.findOneAndUpdate(
    { _id: exercice[0]._id },
    { solutionAccess: !exercice[0].solutionAccess }
  );

  res.status(200).send(updated);
};
