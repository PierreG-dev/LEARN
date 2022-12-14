const collections = require('../../collections');
module.exports = (req, res) => {
  collections.Exercise.find(req.body.filter ? req.body.filter : null)
    .lean()
    .then((data) => res.status(200).send({ data }))
    .catch((error) => {
      console.error(error);
      res.status(500).send({
        errNo: 500,
        errName: 'Error when retrieving Exercises',
      });
    });
};
