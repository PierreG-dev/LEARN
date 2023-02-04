module.exports = async (req, res) => {
  if (!req.session.chatConnected) {
    res.status(400).send({
      code: 400,
      msg: "You can't disconnected because you're not connected",
    });
    return;
  }

  req.session.chatConnected = false;
  res.status(200).send({
    code: 200,
    msg: 'You successfully disconnected',
  });
};
