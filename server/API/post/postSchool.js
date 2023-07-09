const collections = require("@collections");
const { default: mongoose } = require("mongoose");
const path = require("path");
const fs = require("fs");

module.exports = (req, res) => {
  if (!req.body.description || !req.body.name)
    return res.status(400).send({
      code: 400,
      msg: "School name and school description are both required",
    });

  if (req.files.logo && !/^image\/.*$/.test(req.files.logo.mimetype))
    return res.status(400).send({
      code: 400,
      msg: "invalid logo format",
    });

  const newId = new mongoose.Types.ObjectId();

  collections.School.create({
    _id: newId,
    timestamp: new Date().getTime(),
    name: req.body.name,
    description: req.body.description,
    logoUrl: req.files.logo
      ? `/res/schools/logo/logo_school_${newId.toString()}${path.extname(
          req.files.logo.name
        )}`
      : "",
  })
    .then(() => {
      if (req.files.logo) {
        fs.mkdirSync(`${__dirname}/../../public/schools/logo/`, {
          recursive: true,
        });
        req.files.logo.mv(
          `${__dirname}/../../public/schools/logo/logo_school_${newId.toString()}${path.extname(
            req.files.logo.name
          )}`
        );
      }
    })
    .then(() =>
      res.status(200).send({
        code: 200,
        msg: `New school ${req.body.name} created successfully`,
      })
    )
    .catch((err) => {
      console.error(err);
      console.error("Error when creating the school " + req.body.name);
      res.status(500).send({
        code: 500,
        msg: "Error when creating the school " + req.body.name,
      });
    });
};
