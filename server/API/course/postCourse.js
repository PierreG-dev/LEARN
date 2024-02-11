const collections = require('../../collections');

module.exports = async (req, res, next) => {
  const {
    title: _title,
    description: _description,
    iconName: _iconName,
    difficulty: _difficulty,
    categories: _categories,
    languages: _languages,
  } = req.body;

  if (
    !_title ||
    !_description ||
    !_difficulty ||
    !_categories ||
    !_languages ||
    !_iconName
  )
    return res.status(400).send({
      code: 400,
      msg: 'courseName, description, difficulty, categories, languages and iconName are all required',
    });

  collections.Course.create({
    title: _title,
    description: _description,
    iconName: _iconName,
    difficulty: _difficulty,
    categories: _categories,
    languages: _languages,
    timestamp: new Date().getTime(),
    order: (await collections.Course.countDocuments({})) + 1,
  })
    .then(() => {
      res.status(200).send({
        code: 200,
        msg: `Course ${_title} successfully created`,
      });
      next();
    })
    .catch((error) => {
      console.error('ERROR 500 when creating a Course', error);
      res.status(500).send({
        code: 200,
        msg: `Course ${_title} could not be created.`,
        error: error,
      });
    });
};
