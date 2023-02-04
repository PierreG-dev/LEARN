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
    if (!req.session.chatConnected) {
      res.status(401).send({
        code: 401,
        msg: 'You are not connected',
      });
      return;
    }
    if (!req.body.content) {
      res.status(400).send({
        code: 400,
        msg: 'Missing parameters',
      });
      return;
    }

    collections.Message.create({
      content: req.body.content,
      author: req.session.userName,
      imageUrl: req.session.userAvatar,
      timestamp: new Date().toLocaleString(),
      seen: [
        { userName: req.session.userName, userAvatar: req.session.userAvatar },
      ],
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
