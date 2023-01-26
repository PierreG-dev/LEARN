const collections = require('../../collections');
module.exports = async (req, res) => {
  if (!req.session.isConnected) res.status(403).send('unauthorized');
  if (!req.params.id) throw 'empty parameters';

  let subChapter = await collections.SubChapter.find({
    _id: req.params.id.slice(1),
  }).lean();

  let updated = await collections.SubChapter.findOneAndUpdate(
    { _id: req.params.id.slice(1) },
    { access: !subChapter[0].access }
  );

  res.status(200).send(!subChapter[0].access);
};
