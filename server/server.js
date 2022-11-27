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
const fetch = require('node-fetch');
const morgan = require('morgan'); //HTTP verbs management
const bodyParser = require('body-parser'); //Request's body parser
const multer = require('multer');
const forms = multer();
const cors = require('cors'); //CORS management

app.use(morgan('combined'));
app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200,
  })
);
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
// const { Server } = require('socket.io');
// const io = new Server(server, {
//   cors: {
//     origin: '*',
//   },
// });
const io = require('socket.io')(server, {
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

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
//   );
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PUT, DELETE, PATCH, OPTIONS'
//   );
//   console.log('cors set');
//   next();
// });

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
app.get('/api/getChapter:id?', api.getChapter);
app.get('/api/getSubChapter:id?', api.getSubChapter);
app.get('/api/getExercise:id?', api.getExercise);
app.get('/api/getGroup', api.getGroup);

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
); //Changer solutionAccess d'un Exercise
//----------- Errors ------------

app.get('/blocked', (req, res) => {
  res.render('errors/blocked', { error: 401, cause: 'Too many trials.' });
});

////==============================//
//            SOCKETS            //
//==============================//

io.on('connect', (socket) => {
  console.log(`Client with ID of ${socket.id} connected!`);
});
io.on('disconnect', (socket) => {
  socket.removeAllListeners();
  console.log(`Client with ID of ${socket.id} disconnected!`);
});
/*


  socket.on('chat_message', (msg) => {
    console.log(msg);
    socket.emit('chat_message', 'well done, loool');
  });

  socket.on('ping', (msg) => {
    let now = new Date();
    socket.emit('chat_message', msg + ' | ' + now.getTime());
  });
*/

//============== FOR MY STUDENTS ===============//
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

//======== 404 ========//
app.get('*', (req, res) => {
  res.status(404).render('errors/404');
});
