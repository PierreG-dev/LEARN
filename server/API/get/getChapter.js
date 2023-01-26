const collections = require('../../collections');
module.exports = (req, res) => {
  if (!req.session.isConnected) res.status(403).send('unauthorized');
  collections.Chapter.find(req.params.id ? { _id: req.params.id.slice(1) } : {})
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
