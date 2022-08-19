const collections = require('../../collections');
const uuid = require('uuid');
module.exports = (req, res) => {
  console.log(req.body);

  if (!req.body.chapterId || !req.body.subChapterName) {
    throw 'Empty parameters';
  }
  collections.SubChapter.create({
    chapterId: req.body.chapterId,
    subChapterName: req.body.subChapterName,
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
