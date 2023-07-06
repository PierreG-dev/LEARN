const { default: mongoose } = require("mongoose");
const collections = require("../../collections");
const uuid = require("uuid");
module.exports = async (req, res) => {
  const {
    title: _title,
    description: _description,
    chapterId: _chapterId,
  } = req.body;

  if (!_chapterId || !_title || !_description)
    return res.status(400).send({
      code: 400,
      msg: "ChapterId, title and description are required to proceed",
    });

  if (!mongoose.Types.ObjectId.isValid(_chapterId)) {
    return res.status(400).send({
      code: 400,
      msg: "Invalid chapter id",
    });
  }

  const chapter = await collections.Chapter.findOne({ _id: _chapterId });
  if (!chapter)
    return res.status(400).send({
      code: 400,
      msg: "Invalid chapter id",
    });

  collections.SubChapter.create({
    chapterId: _chapterId,
    title: _title,
    description: _description,
    order:
      (await collections.SubChapter.countDocuments({
        chapterId: _chapterId,
      })) + 1,
  })
    .then(() =>
      res.status(200).send({
        code: 200,
        msg: "Successfully created " + _title + " subchapter",
      })
    )
    .catch((err) =>
      res.status(500).send({
        code: 500,
        msg:
          "An error occured during the creation of " + _title + " subchapter",
      })
    );
};
