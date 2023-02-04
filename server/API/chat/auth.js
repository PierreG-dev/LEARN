module.exports = async (req, res) => {
  if (req.session.chatConnected) {
    res.status(409).send({
      code: 409,
      msg: 'Already connected',
    });
    return;
  }
  if (req.body.password !== 'CDA_2022_11') {
    res.status(401).send({
      code: 401,
      msg: 'bad password',
    });
    return;
  }
  if (
    typeof req.body.userAvatar !== 'string' ||
    typeof req.body.userName !== 'string' ||
    !req.body.userName ||
    !req.body.userAvatar
  ) {
    res.status(400).send({
      code: 401,
      msg: 'Bad parameters',
    });
    return;
  }
  req.session.chatConnected = true;
  req.session.userName = req.body.userName;
  req.session.userAvatar = req.body.userAvatar;
  res.status(200).send({
    code: 200,
    msg: 'Successfully authenticated',
  });
};
