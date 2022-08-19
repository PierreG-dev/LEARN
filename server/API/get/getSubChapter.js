const collections = require('../../collections');
module.exports = (req, res) => {
  collections.SubChapter.find(
    req.params.id ? { chapterId: req.params.id.slice(1) } : {}
  )
    .lean()
    .then((data) => res.status(200).send({ data }))
    .catch((error) => {
      console.error(error);
      res.status(500).send({
        errNo: 500,
        errName: 'Error when retrieving data',
      });
    });
};
