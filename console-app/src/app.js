const express = require('express');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const path = require('path');
const firebase = require('firebase/app');
require('firebase/auth');
const { MiRouter, router } = require('./routes/router');

const PORT = 3000;

const firebaseConfig = {
  apiKey: "AIzaSyAEGoxNZ23rbFb_ollA5f90ylaGgEsSND4",
  authDomain: "proyecto-backend-coder1.firebaseapp.com",
  projectId: "proyecto-backend-coder1",
  storageBucket: "proyecto-backend-coder1.appspot.com",
  messagingSenderId: "470036650570",
  appId: "1:470036650570:web:40912c458859b40f4e64b3",
  measurementId: "G-7ZG7P53YHR"
};

firebase.initializeApp(firebaseConfig);

const hbs = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: [path.join(__dirname, 'views/partials')],
});

const miRouter = new MiRouter();
const app = express();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', router); 

app.post('/registro', (req, res) => {
    res.send('Registro exitoso');
});

app.post('/login', (req, res) => {
    res.send('Login exitoso');
});

app.get('/perfil', (req, res) => {
    res.render('perfil');
});

app.get('/', (req, res) => {
    res.render('home');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`Something went wrong! Error: ${err.message}`);
});

const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});

server.on('error', (error) => console.log(error));