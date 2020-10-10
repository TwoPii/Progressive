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
    users: [
      {
        username: "genisbosch",
        password: sha1("1234")
      },
      {
        username: "genisbosch2",
        password: sha1("1234")
      }
    ]
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
  let data = [
  { id: 1, name: "Asfo" },
  { id: 2, name: "Denisse" },
  { id: 3, name: "Carlos" }
 ];
 res.setHeader('Access-Control-Allow-Origin', '*')
 res.send(data);
});

app.post('/login', function (req, res) {
  let respuesta;
  if(req.body.username && req.body.password) {
    let userFromDB = db.get('users').find({ username: req.body.username}).value()
    if (userFromDB != undefined && sha1(req.body.password) == userFromDB.password) {
      const payload = {
       check:  true,
       username: req.body.username
      };
      const token = jwt.sign(payload, app.get('key'), {
       expiresIn: 1440
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

app.use(cors());

app.listen(5000, () => {
 console.log("El servidor está inicializado en el puerto 5000");
});
