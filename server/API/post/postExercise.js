const collections = require("../../collections");

module.exports = async (req, res) => {
  const {
    subChapterId: _subChapterId,
    title: _title,
    timeToResolve: _timeToResolve,
    difficulty: _difficulty,
    practicedSkill: _practicedSkill,
    instructions: _instructions,
    informations: _informations,
    demo: _demo,
    tips: _tips,
    baseFileUrl: _baseFile,
    solutions: _solutions,
    solutionFileUrl: _solutionFile,
    wiki: _wiki,
    links: _links,
  } = req.body;

  if (
    !_subChapterId ||
    !_title ||
    !_timeToResolve ||
    !_difficulty ||
    !_practicedSkill ||
    !_instructions ||
    !_demo ||
    !_solutions
  )
    return res.status(400).send({
      code: 400,
      msg: "missing parameters",
    });
};
