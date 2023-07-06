const collections = require("../../collections");
const uuid = require("uuid");
module.exports = async (req, res) => {
  const { title: _title, description: _description } = req.body;

  if (!_title || !_description)
    return res.status(400).send({
      code: 400,
      msg: "Title and description are required to proceed",
    });

  collections.SubChapter.create({
    title: _title,
    description: _description,
    order: (await collections.SubChapter.countDocuments({})) + 1,
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
