const collections = require('../../collections');

/**
  content: String,
  author: String,
  imageUrl: String,
  timestamp: String,
  seen: [String],
 */

module.exports = async (req, res) => {
  try {
    if (req.body.password !== 'CDA_2022_11')
      return res.status(401).send({
        code: 401,
        msg: 'Wrong password',
      });
    if (!req.body.content || !req.body.userAvatar || !req.body.userName) {
      res.status(400).send({
        code: 400,
        msg: 'Missing parameters',
      });
      return;
    }

    collections.Message.create({
      content: req.body.content,
      author: req.body.userName,
      imageUrl: req.body.userAvatar,
      timestamp: new Date().toLocaleString(),
      seen: [{ userName: req.body.userName, userAvatar: req.body.userAvatar }],
    })
      .then(() => {
        res.status(200).send({
          code: 200,
          msg: 'Message successfully sent !',
        });
      })
      .catch((err) =>
        res.status(500).send({
          code: 500,
          msg: `An error occured: ${err}`,
        })
      );
  } catch (err) {
    console.error('prout');
  }
};
