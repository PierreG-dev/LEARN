const collections = require('@collections');

module.exports = async (req, res) => {
  const { signupCode: _signupCode } = req.body;

  if (!_signupCode)
    return res.status(400).send({
      code: 400,
      msg: 'signupCode is required',
    });

  const signupCode = await collections.SignupCode.findOne({
    code: _signupCode,
  });

  if (!signupCode || signupCode.usagesAmount <= 0)
    return res.status(400).send({
      code: 400,
      msg: 'Code invalide',
    });

  if (signupCode.classId) {
    const codeClass = await collections.Class.findOne({
      signupCodeId: signupCode._id,
    });
    const codeSchool = await collections.School.findOne({
      _id: codeClass.schoolId,
    });
    return res.status(200).send({
      code: 200,
      class: true,
      msg: `${codeSchool.name} | ${codeClass.name}`,
    });
  } else {
    return res.status(200).send({
      code: 200,
      class: false,
      msg: 'Etudiant Indépendant',
    });
  }
};
