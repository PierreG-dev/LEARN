const { v4: uuidv4 } = require("uuid");
const collections = require("@collections");

module.exports = async (req, res) => {
  console.log(req.body);
  if (!req.body.classId && !req.body.usagesAmount)
    return res.status(400).send({
      code: 400,
      msg: "Missing usages amount (if no class is associated, you need to specify the usage amount)",
    });

  //vérification du classId
  const associatedClass = await collections.Class.findOne({
    _id: req.body.classId,
  }).catch((err) => console.error("Wrong classID format"));
  if (!associatedClass)
    return res.status(400).send({
      code: 400,
      msg: "The provided ClassId is not valid",
    });

  let usagesAmount = req.body.usagesAmount || associatedClass.studentsAmount;

  collections.SignupCode.create({
    classId: associatedClass ? associatedClass._id : "",
    code: uuidv4().replace(/-/g, "").toUpperCase(),
    usagesAmount,
    timestamp: new Date().getTime(),
  });

  res.status(200).send({
    code: 200,
    msg: "Signup code successfully created !",
  });
};
