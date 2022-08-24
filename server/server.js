//==============================//
//             SETUP            //
//==============================//
//Node | Express
const express = require('express');
const app = express();

const router = express.Router();
const http = require('http');
const server = http.createServer(app);
const PORT = process.env.port | 8000;
const pug = require('pug');
const path = require('path');
app.set('view engine', 'pug');
app.use(
  '/scripts',
  express.static(path.join(__dirname, '/views/scripts'))
  // add some others
);
app.use(
  '/styles',
  express.static(path.join(__dirname, '/views/styles'))
  // add some others
);
app.use(
  '/res',
  express.static(path.join(__dirname, '/public'))
  // add some others
);

//Database
const mongoose = require('mongoose'); //MongoDB
const collections = require('./collections');
const api = require('./API');

//Additionnal packages
var session = require('express-session'); //Session management
const cors = require('cors'); //CORS management
const morgan = require('morgan'); //HTTP verbs management
const bodyParser = require('body-parser'); //Request's body parser
const multer = require('multer');
const forms = multer();

app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(forms.array());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: 'issou',
    resave: false,
    saveUninitialized: false,
  })
);

//SocketIO
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

//---------- START ---------
server.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
});

////==============================//
//              MAIN             //
//==============================//

//------- ROUTES --------
require('./API');

app.get('/', async (req, res) => {
  if (!req.session.isConnected) {
    res.redirect('/auth');
    return;
  }
  let data = await collections.Chapter.find().lean();
  res.render('home', { data });
});

app.get('/auth', (req, res) => {
  if (req.session.isConnected) {
    res.redirect('/');
    return;
  }
  res.render('auth', {
    isConnected: req.session.isConnected,
  });
});

app.post('/auth', (req, res, next) => {
  if (req.session.isConnected) {
    res.redirect('/');
    return;
  }
  let password = (req.body.password || '').toString();
  let pass = 'godgod82100';

  req.session.isConnected = password === pass;

  req.session.isConnected ? res.redirect('/') : res.render('auth');
});

app.get('/chapter:id', async (req, res) => {
  if (!req.session.isConnected) {
    res.redirect('/auth');
    return;
  }

  const chapters = await collections.Chapter.find({
    _id: req.params['id'].slice(1),
  }).lean();

  const data = await Promise.all(
    chapters.map(async (chapter) => {
      let subChapterList = await collections.SubChapter.find({
        chapterId: chapter._id,
      }).lean();

      subChapterList = await Promise.all(
        subChapterList.map(async (subChapter) => {
          const exerciceList = await collections.Exercise.find({
            subChapterId: subChapter._id,
          }).lean();

          return {
            ...subChapter,
            exerciceList,
          };
        })
      );

      return {
        ...chapter,
        subChapterList,
      };
    })
  );

  res.status(200).render('chapter', { chapter: data[0] });
});

//----------- API ------------
app.get('/api/getData', api.getData);
app.get('/api/getChapter:id?', api.getChapter);
app.get('/api/getSubChapter:id?', api.getSubChapter);
app.get('/api/getExercise:id?', api.getExercise);

app.post('/api/postChapter', api.postChapter);
app.post('/api/postSubChapter', api.postSubChapter);
app.post('/api/postExercise', api.postExercise);

app.put('/api/updateChapterAccess:id?', api.updateChapterAccess); //Changer access d'un Chapter
app.put('/api/updateSubChapterAccess:id?', api.updateSubChapterAccess); //Changer access d'un subChapter
app.put('/api/updateExerciseAccess:id?', api.updateExerciseAccess); //Changer access d'un Exercise
app.put(
  '/api/updateExerciseSolutionAccess:id?',
  api.updateExerciceSolutionAccess
); //Changer solutionAccess d'un Exercise

//----------- Errors ------------

app.get('/blocked', (req, res) => {
  res.render('errors/blocked', { error: 401, cause: 'Too many trials.' });
});

app.get('*', (req, res) => {
  res.status(404).render('errors/404');
});

////==============================//
//            SOCKETS            //
//==============================//

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat_message', (msg) => {
    console.log(msg);
    socket.emit('chat_message', 'well done, loool');
  });

  socket.on('ping', (msg) => {
    let now = new Date();
    socket.emit('chat_message', msg + ' | ' + now.getTime());
  });
});
