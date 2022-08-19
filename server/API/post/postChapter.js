const collections = require('../../collections');
const uuid = require('uuid');
module.exports = (req, res) => {
  console.log(req.body);

  if (!req.body.chapterName || !req.body.description) {
    throw 'Empty parameters';
  }
  collections.Chapter.create({
    chapterName: req.body.chapterName,
    description: req.body.description,
    access: false,
  })
    .then(() => {
      res.status(200).send('well received !');
    })
    .catch((error) => {
      console.error('ERROR 500 when creating a Chapter', error);
      res.status(500).send('Error when creating entry.');
    });
};
