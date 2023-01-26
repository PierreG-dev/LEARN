const collections = require('../../collections');
const uuid = require('uuid');
const sha256 = require('js-sha256').sha256;
module.exports = async (req, res) => {
  if (!req.session.isConnected) res.status(403).send('unauthorized');
  if (!req.body.groupName || !req.body.description || !req.body.students) {
    throw 'Empty parameters';
  }

  //FIN TESTS

  let group;
  //Création du groupe d'étudiants
  await collections.Group.create({
    groupName: req.body.groupName,
    description: req.body.description,
    access: [],
  })
    .then((newGroup) => {
      group = newGroup;
    })
    .catch((error) => {
      console.error('ERROR 500 when creating a Group', error);
      res.status(500).send('Error when creating entry.');
    });

  let newStudentsList = [];
  //Création des élèves
  req.body.students.forEach(async (studentName) => {
    let fresh_token = uuid.v4();
    newStudentsList.push({
      studentName: studentName,
      token: fresh_token,
    });
    await collections.Student.create({
      studentName: studentName,
      groupId: group._id,
      accessToken_hashed: sha256(fresh_token),
    }).catch((error) => {
      console.error('ERROR 500 when creating a Student', error);
      res.status(500).send('Error when creating student entry.');
    });
  });
  res.status(200).send(`
  Group ${group.groupName} created !\n
  Students:\n
  ${newStudentsList
    .map((student) => {
      return `    - ${student.studentName}: ${student.token}\n`;
    })
    .join('')}
`);

  console.log(newStudentsList);
};
