const collections = require('../../collections');

const alreadySeen = (array, object) => {
  array.forEach((elem) => {
    if (JSON.stringify(elem) === JSON.stringify(object)) return true;
  });
  return false;
};

module.exports = async (req, res) => {
  if (!req.session.chatConnected) {
    res.status(401).send({
      code: 401,
      msg: 'You are not connected',
    });
    return;
  }

  const messagesArray = await collections.Message.find({}).lean();
  console.log(messagesArray);

  messagesArray.forEach(async (message) => {
    let temp = [...message.seen];
    console.log(temp);
    if (
      !temp.some(
        (elem) =>
          Object.entries(elem).toString() ===
          Object.entries({
            userName: req.session.userName,
            userAvatar: req.session.userAvatar,
          }).toString()
      )
    ) {
      temp.push({
        userName: req.session.userName,
        userAvatar: req.session.userAvatar,
      });
      console.log(temp);
      await collections.Message.findOneAndUpdate(
        { _id: message._id },
        { seen: temp }
      );
    }
  });

  const data = await collections.Message.find({}).lean();

  res.status(200).send({
    code: 200,
    msg: 'Here is the conversation my lord',
    data: data,
  });
};
