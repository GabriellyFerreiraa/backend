const express = require('express');
const {MiRouter} = require('./router')
const UsuariosRouter = require('./usuarios.router');
const ProductosRouter = require('./productos.router');
const VistasRouter = require('./vistas.router');

const miRouter = new MiRouter();
const router = express.Router();
const usuariosRouter = new UsuariosRouter();
const productosRouter = new ProductosRouter();
const vistasRouter = new VistasRouter();

const SessionsRouter = require('./sessions.router');
const sessionsRouter = new SessionsRouter(miRouter);

router.use('/api', miRouter.getRouter());
router.use('/api/sessions', sessionsRouter.getRouter());
router.use('/api/usuarios', usuariosRouter.getRouter());
router.use('/api/productos', productosRouter.getRouter());
router.use('/', vistasRouter.getRouter());

module.exports = { MiRouter, router };