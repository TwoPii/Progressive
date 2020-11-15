const express = require("express");
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const sha1 = require('sha1');
var cors = require('cors');
const jwt = require('jsonwebtoken');
const config = require('./configs/config');

const app = express();
const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults(
  {
    lastUserId: 2,
    users: [
      {
        username: "genisbosch",
        password: sha1("1234"),
        userId: 1
      },
      {
        username: "genisbosch2",
        password: sha1("1234"),
        userId: 2
      }
    ],
    heroes: [
      {
        userId: 1,
        name: "Sam",
        attack: 1,
        defense: 1,
        hp: 100
      },
      {
        userId: 2,
        name: "Gandalf",
        attack: 1,
        defense: 1,
        hp: 100
      }]

  }).write();

app.set('key', config.llave);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Middleware
const rutasProtegidas = express.Router();
rutasProtegidas.use((req, res, next) => {
    const token = req.headers['access-token'];

    if (token) {
      jwt.verify(token, app.get('key'), (err, decoded) => {
        if (err) {
          return res.json({ mensaje: 'Invalid Token' });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.send({
          mensaje: 'Token not found.'
      });
    }
 });

//Home
app.get('/', function (req, res) {
  res.send('Saludos desde express');
});

app.get('/info', rutasProtegidas, function (req, res) {
  let userId = req.decoded.userId;;
  let hero = db.get('heroes').find({userId}).value();
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.send(hero);
});

app.post('/login', function (req, res) {
  let respuesta;
  if(req.body.username && req.body.password) {
    let userFromDB = db.get('users').find({ username: req.body.username}).value()
    if (userFromDB != undefined && sha1(req.body.password) == userFromDB.password) {
      const payload = {
       check:  true,
       username: req.body.username,
       userId: userFromDB.userId 
      };
      const token = jwt.sign(payload, app.get('key'), {
       expiresIn: (10*24*3600)
      });
      respuesta = {
      error: false,
      code: 200,
      response: 'OK',
      token: token
     };
    } else {
      respuesta = {
        error: true,
        code: 201,
        response: 'Username or password not valid'
      };
    }
  } else {
    respuesta = {
      error: true,
      code: 201
    };
  }
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.send(respuesta);
});

app.post('/create', rutasProtegidas, function (req, res) {
  let userId = req.decoded.userId;;
  db.get('heroes').push({userId, name: req.body.name, attack: 1, defense: 1, hp: 100}).write();
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.send("OK");
});

app.post('/register', function (req, res) {
  let respuesta;
  if(canBeAdded(req.body.username, req.body.password, req.body.passwordConfirm)) {
    let newId = db.get('lastUserId').value() + 1;
    db.update('lastUserId', n => n + 1).write();
    db.get('users').push({username: req.body.username, password: sha1(req.body.password), userId: newId}).write();
      respuesta = {
        error: false,
        code: 200,
        response: 'OK'
     };
  } else {
    respuesta = {
      error: true,
      code: 201,
      response: 'BAD_PASSWORD'
    };
  }
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.send(respuesta);
});

app.use(cors());

app.listen(5000, () => {
 console.log("El servidor está inicializado en el puerto 5000");
});

function canBeAdded(user, password, passwordConfirm){
  if(user && password && passwordConfirm) {
    let existingUser = db.get('users').find({username: user}).value();
    return (!existingUser && password === passwordConfirm) ?  true : false;
  }
  return false;
}
