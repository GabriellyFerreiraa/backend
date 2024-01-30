import express from 'express';
import cookieParser from 'cookie-parser';
import expressHandlebars from 'express-handlebars'; 
import path from 'path';

import { router as heroesRouter } from './routes/heroes.router.js';
import { UsuariosRouter } from './routes/usuarios.router.js';
import { SessionsRouter } from './routes/sessions.router.js';

const PORT = 3000;

const app = express();
const usuariosRouter = new UsuariosRouter();
const sessionsRouter = new SessionsRouter();

app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Manejo de la ruta raíz
app.get('/', (req, res) => {
    res.render('home'); 
});

// Configuración de las rutas
app.use('/api/heroes', heroesRouter);
app.use('/api/usuarios', usuariosRouter.getRouter());
app.use('/api/sessions', sessionsRouter.getRouter());

// Manejador para errores de vistas no encontradas
app.use((req, res, next) => {
    res.status(404).send("Vista no encontrada");
});

const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});

server.on('error', (error) => console.log(error));