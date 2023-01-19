const collections = require('../../collections');

module.exports = async (req, res) => {
  const exerciceId = req.params.exerciceId.slice(1);
  const folderPath = __dirname + '../../../ressources/';
  const exercice = await collections.Exercise.findOne({ _id: exerciceId });
  if (!exercice.solutionAccess || !exercice.access)
    res.status(401).send({
      error: 401,
      msg: 'Unauthorized',
    });
  if (!exercice.solutionFile)
    res.status(404).send({
      error: 404,
      msg: 'This exercice has no available ressources',
    });
  res
    .status(200)
    .download(
      folderPath + exerciceId + '.zip',
      'solution_exercice_n°' + exercice.order + '.zip'
    );
};
