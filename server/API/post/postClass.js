const { default: mongoose } = require('mongoose');
const collections = require('../../collections');
const { v4: uuidv4 } = require('uuid');
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = async (req, res, next) => {
  const {
    schoolId: _schoolId,
    studentsAmount: _studentsAmount,
    name: _name,
  } = req.body;

  // --- Vérification de la requête
  if (!_schoolId || !_studentsAmount || !_name)
    return res.status(400).send({
      code: 400,
      msg: 'schoolId, studentsAmount and name are all required',
    });

  // --- Vérification du format du school id
  if (!mongoose.Types.ObjectId.isValid(_schoolId))
    return res.status(400).send({
      code: 400,
      msg: 'School ID format is not valid',
    });

  // --- Vérification de l'existance de l'école
  const school = await collections.School.findOne({ _id: _schoolId });
  if (!school)
    return res.status(400).send({
      code: 400,
      msg: "The provided schoolId doesn't exist",
    });

  // --- Vérification de la disponibilité du nom parmis les classes de l'école
  const classTwin = await collections.Class.findOne({ name: _name });
  if (classTwin)
    return res.status(400).send({
      code: 400,
      msg: 'A Class with this name already exists!',
    });

  // ===== OK ===== //
  let icon;
  try {
    let response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        {
          role: 'user',
          content: `
          trouves moi une icone de la librairie react-icon qui irait bien avec le nom de la classe ${_name}.
          Donnes moi le résultat au format json: {iconName: 'ICON_NAME'}.
  
          Je n'ai besoin de rien de plus que du nom de l'icone et je veux obligatoirement une réponse au format JSON, meme si aucune icone ne convient je veux celle qui parait la plus logique.`,
        },
      ],
    });

    const jsonMatch = response.data.choices[0].message.content.match(
      /\{\s*"iconName":\s*"([^"]+)"\s*\}/
    );
    icon = jsonMatch ? JSON.parse(jsonMatch[0]).iconName : 'AiFillBug';
  } catch {
    icon = 'AiFillBug';
  }

  const newId = new mongoose.Types.ObjectId();

  const signupCode = await collections.SignupCode.create({
    classId: newId.toString(),
    code: uuidv4().replace(/-/g, '').toUpperCase(),
    usagesAmount: _studentsAmount,
    timestamp: new Date().getTime(),
  });

  if (!signupCode)
    return res.status(500).send({
      code: 500,
      msg: 'Error when creating ' + name + "'s signup code",
    });

  await collections.Class.create({
    _id: newId,
    signupCodeId: signupCode._id,
    schoolId: _schoolId,
    name: _name,
    icon: icon,
    studentsAmount: _studentsAmount,
    lastActivity: new Date().getTime(),
    isDisabled: false,
    timestamp: new Date().getTime(),
  })
    .then(() => {
      res.status(200).send({
        code: 200,
        msg: `New class ${_name} created successfully`,
      });
    })
    .catch((err) => console.error('Error when creating the class ' + _name));
  next();
};
