const collections = require('../../collections');
module.exports = async (req, res) => {
  if (!req.session.isConnected) res.status(403).send('unauthorized');
  if (!req.params.id) throw 'empty parameters';
  let exercice = await collections.Exercise.find({
    _id: req.params.id.slice(1),
  }).lean();

  let updated = await collections.Exercise.findOneAndUpdate(
    { _id: exercice[0]._id },
    { access: !exercice[0].access }
  );

  res.status(200).send(updated);
};
