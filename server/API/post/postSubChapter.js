const collections = require('../../collections');
module.exports = (req, res) => {
  collections.Chapter.find()
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
