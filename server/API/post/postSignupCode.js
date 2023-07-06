const { v4: uuidv4 } = require("uuid");
const collections = require("@collections");
const { default: mongoose } = require("mongoose");

module.exports = async (req, res) => {
  const { classId: _classId, usagesAmount: _usagesAmount } = req.body;

  if (!_classId && !_usagesAmount)
    return res.status(400).send({
      code: 400,
      msg: "Missing usages amount (if no class is associated, you need to specify the usage amount)",
    });

  if (_classId && !mongoose.Types.ObjectId.isValid(_classId))
    return res.status(400).send({
      code: 400,
      msg: "Invalid classId format",
    });

  let associatedClass;

  if (_classId) {
    associatedClass = await collections.Class.findOne({
      _id: _classId,
    });
  }

  if (_classId && !associatedClass)
    return res.status(400).send({
      code: 400,
      msg: "The provided classId is not valid",
    });

  let usagesAmount = _usagesAmount || associatedClass.studentsAmount;
  console.log(usagesAmount);

  collections.SignupCode.create({
    classId: associatedClass ? associatedClass._id : "",
    code: uuidv4().replace(/-/g, "").toUpperCase(),
    usagesAmount: usagesAmount,
    timestamp: new Date().getTime(),
  });

  res.status(200).send({
    code: 200,
    msg: "Signup code successfully created !",
  });
};
