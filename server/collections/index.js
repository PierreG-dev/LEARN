const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db_url = process.env.DB_URL || 'mongodb://localhost/LEARN';

var connection;
function tryConnect() {
  connection = mongoose.createConnection(db_url, (err) => {
    if (err) {
      console.error('MongoDB connection error: ', err);
    } else {
      console.log('MongoDB connexion success');
    }
  });
}

tryConnect();

const Chapter = require('./chapter.js')(connection);
const SubChapter = require('./subChapter.js')(connection);
const Exercise = require('./exercise.js')(connection);

const collections = {
  Chapter,
  SubChapter,
  Exercise,
};

module.exports = collections;
