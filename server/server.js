//==============================//
//             SETUP            //
//==============================//
//Node | Express
const express = require('express');
const app = express();
const socketIO = require('socket.io');
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

//Additionnal packages
var session = require('express-session'); //Session management
const fetch = require('node-fetch');
const morgan = require('morgan'); //HTTP verbs management
const multer = require('multer');
const fileUpload = require('express-fileupload');
const cors = require('cors'); //CORS management
app.use(fileUpload());
app.use(morgan('combined'));

//------ CORS ------ //

const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000'];

const io = socketIO(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// sessionMiddleware = session({
//   secret: 'issou',
//   resave: false,
//   saveUninitialized: false,
// });
// app.use(sessionMiddleware);
// io.engine.use((socket, next) => sessionMiddleware(socket.request, {}, next));

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error(err);
    return res.status(400).send({ status: 404, message: err.message }); // Bad request
  }
  next();
});

//---------- START ---------
server.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
});

////==============================//
//              MAIN             //
//==============================//

//------- ROUTES --------
const api = require('./API');

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
  let pass = process.env.ADMIN_PASSWORD;

  req.session.isConnected = password === pass;

  req.session.isConnected ? res.redirect('/') : res.render('auth');
});

app.get('/classManagement', async (req, res) => {
  if (!req.session.isConnected) {
    res.redirect('/auth');
    return;
  }

  let data = await collections.Group.find().lean();
  res.status(200).render('classManagement', data);
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
app.get('/api/getDataHashed', api.getDataHashed);
app.get('/api/getChapter:id?', api.getChapter);
app.get('/api/getSubChapter:id?', api.getSubChapter);
app.get('/api/getExercise:id?', api.getExercise);
app.get('/api/getGroup', api.getGroup);
app.get('/api/getSoluce:exerciceId', api.getSoluce);

app.post('/api/postChapter', api.postChapter);
app.post('/api/postSubChapter', api.postSubChapter);
app.post('/api/postExercise', api.postExercise);
app.post('/api/postGroup', api.postGroup);

app.put('/api/updateChapterAccess:id?', api.updateChapterAccess); //Changer access d'un Chapter
app.put('/api/updateSubChapterAccess:id?', api.updateSubChapterAccess); //Changer access d'un subChapter
app.put('/api/updateExerciseAccess:id?', api.updateExerciseAccess); //Changer access d'un Exercise
app.put(
  '/api/updateExerciseSolutionAccess:id?',
  api.updateExerciceSolutionAccess
);
//----------- Errors ------------

app.get('/blocked', (req, res) => {
  res.render('errors/blocked', { error: 401, cause: 'Too many trials.' });
});

//==============================//
//            SOCKETS           //
//==============================//
io.use(api.authMiddleware);
io.on('connect', (socket) => {
  console.log('Nouvelle connexion Socket.IO');

  // Écoutez l'événement de déconnexion du socket
  socket.on('disconnect', () => {
    console.log('Déconnexion Socket.IO');
  });
});

app.post('/login', api.login);
app.post('/logout', api.logout);

//============== LIVE CHAT =====================//

// app.put('/api/chatConnect', api.putAuthChat);
// app.put('/api/chatDisconnect', api.putDisconnectChat);
app.post('/api/getChat', api.getMessages);
app.post('/api/postChat', api.postMessageChat);

//============== EXERCICE GENERATOR =====================//
app.post('/api/getGeneratedExercices', api.getGeneratedExercices);

//============== FOR MY STUDENTS ===============//
app.get('/api/tutu', (req, res) => {
  res.status(200).send('cursed');
});
app.get('/api/toto', (req, res) => {
  res.status(200).send('Hello world!');
});
app.get('/api/cda062022', (req, res) => {
  res
    .status(200)
    .send([
      'Noémie',
      'Valentin',
      'Guillaume',
      'Quiterie',
      'Abdou',
      'Jason',
      'Stéphane',
    ]);
});
app.get('/api/myIP', async (req, res) => {
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  let location;
  await fetch(`http://ip-api.com/json/${ip}`)
    .then((response) => response.json())
    .then((data) => {
      location = data;
    });
  res.status(200).send({
    ip: ip,
    location: location,
  });
});

app.post('/fileTest', (req, res) => {
  if (!req.files) res.status(500).send('No files were caught..');
  let imageFile = req.files.file;
  console.log(imageFile);
  imageFile.mv(
    `${__dirname}/public/uploads/${req.body.fileName}.jpg`,
    (err) => {
      if (err) {
        return res.status(500).send(err);
      }

      res.json({ file: `public/${req.body.filename}.jpg` });
      console.log(res.json);
    }
  );

  // res.status(200).send(req.files);
});

//======== 404 ========//
app.get('*', (req, res) => {
  res.status(404).render('errors/404');
});
