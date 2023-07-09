const { default: mongoose } = require("mongoose");
const collections = require("../../collections");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

module.exports = async (req, res) => {
  // --- Récupération des paramètres & création des variables
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
    solutions: _solutions_unparsed,
    wiki: _wiki,
    links: _links_unparsed,
  } = req.body;

  const _solutions = _solutions_unparsed.map((obj) => JSON.parse(obj));
  const _links = _links_unparsed
    ? _links_unparsed.map((obj) => JSON.parse(obj))
    : undefined;

  console.log(_solutions);

  const { solutionFile, baseFile } = req.files;

  let solutionFileUrl = "";
  let baseFileUrl = "";

  // --- Vérification des pré requis
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

  // --- Vérification du format de l'id
  if (!mongoose.Types.ObjectId.isValid(_subChapterId))
    return res.status(400).send({
      code: 400,
      msg: "Invalis subchapterId format",
    });

  // --- Vérification de l'existence du sous-chapitre
  const subChapter = await collections.SubChapter.findOne({
    _id: _subChapterId,
  });
  if (!subChapter)
    return res.status(400).send({
      code: 400,
      msg: "The provided subChapter doesn't exist !",
    });

  // --- génération d'un nouvel ID pour l'exercice
  const newId = new mongoose.Types.ObjectId();

  // --- Création d'un nom pour le futur fichier de la solution
  if (solutionFile) {
    // --- Vérification du format du fichier
    if (solutionFile.mimetype !== "application/zip")
      return res.status(400).send({
        code: 400,
        msg: "Wrong solutionFile format => must be .zip",
      });
    solutionFileUrl = `/res/exercises/solutionFiles/solution_${newId.toString()}${path.extname(
      solutionFile.name
    )}`;
  }

  // --- Création d'un nom pour le futur fichier de base
  if (baseFile) {
    if (baseFile.mimetype !== "application/zip")
      return res.status(400).send({
        code: 400,
        msg: "Wrong baseFile format => must be .zip",
      });
    baseFileUrl = `/res/exercises/baseFiles/base_${newId.toString()}${path.extname(
      baseFile.name
    )}`;
  }

  // --- Création de l'exercice dans la BDD
  await collections.Exercise.create({
    _id: newId,
    subChapterId: _subChapterId,
    order:
      (await collections.Exercise.countDocuments({
        subChapterId: _subChapterId,
      })) + 1,
    title: _title,
    timeToResolve: _timeToResolve,
    difficulty: _difficulty,
    practicedSkill: _practicedSkill,
    instructions: _instructions,
    informations: _informations,
    tips: _tips,
    demo: _demo,
    baseFileUrl: baseFileUrl,
    solutions: _solutions,
    solutionFileUrl: solutionFileUrl,
    wiki: _wiki,
    links: _links,
  })
    .then(() => {
      // --- Enregistrement du solutionFile s'il existe
      if (solutionFile) {
        fs.mkdirSync(`${__dirname}/../../public/exercises/solutionFiles/`, {
          recursive: true,
        });
        solutionFile.mv(
          `${__dirname}/../../public/exercises/solutionFiles/base_${newId.toString()}${path.extname(
            solutionFile.name
          )}`
        );
      }

      // --- Enregistrement du baseFile s'il existe
      if (baseFile) {
        fs.mkdirSync(`${__dirname}/../../public/exercises/baseFiles/`, {
          recursive: true,
        });
        baseFile.mv(
          `${__dirname}/../../public/exercises/baseFiles/base_${newId.toString()}${path.extname(
            baseFile.name
          )}`
        );
      }
    })
    .then(() => {
      return res.status(200).send({
        code: 200,
        msg:
          "The exercise " +
          _title +
          " from the " +
          subChapter.title +
          " subchapter has been successfully created",
      });
    })
    .catch((err) => {
      console.error(err);
      console.error(
        "Error while creating the exercice " +
          _title +
          " from the " +
          subChapter.title +
          " subchapter."
      );
      res.status(500).send({
        code: 500,
        msg:
          "Error while creating the exercice " +
          _title +
          " from the " +
          subChapter.title +
          " subchapter.",
      });
    });
};
