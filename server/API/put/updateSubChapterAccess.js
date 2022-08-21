const collections = require('../../collections');
module.exports = async (req, res) => {
  if (!req.params.id) throw 'empty parameters';
  let chapter = await collections.Chapter.find({
    _id: req.params.id.slice(1),
  }).lean();

  let updated = await collections.Chapter.findOneAndUpdate(
    { _id: chapter[0]._id },
    { access: !chapter[0].access }
  );

  res.status(200).send(updated);
};
