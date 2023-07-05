const { default: mongoose } = require("mongoose");
const collections = require("../../collections");
const { v4: uuidv4 } = require("uuid");

module.exports = async (req, res) => {
  const { schoolId, studentsAmount, name } = req.body;
  if (!schoolId || !studentsAmount || !name)
    return res.status(200).send({
      code: 400,
      msg: "schoolId, studentsAmount and name are all required",
    });

  const newId = new mongoose.Types.ObjectId();

  const signupCode = await collections.SignupCode.create({
    classId: newId.toString(),
    code: uuidv4().replace(/-/g, "").toUpperCase(),
    usagesAmount: studentsAmount,
    timestamp: new Date().getTime(),
  });

  if (!signupCode)
    return res.status(500).send({
      code: 500,
      msg: "Error when creating " + name + "'s signup code",
    });

  collections.Class.create({
    _id: newId,
    signupCodeId: signupCode._id,
    schoolId: schoolId,
    name: name,
    studentsAmount: studentsAmount,
    timestamp: new Date().getTime(),
  })
    .then(() =>
      res.status(200).send({
        code: 200,
        msg: `New class ${name} created successfully`,
      })
    )
    .catch((err) => console.error("Error when creating the class " + name));
};
