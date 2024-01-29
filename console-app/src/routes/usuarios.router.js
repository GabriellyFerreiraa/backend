const { MiRouter } = require('./router');

class UsuariosRouter extends MiRouter {
    mostrarAdminPanel(req, res) {
        res.render('admin-panel');
    }

    init() {
        this.get('/', ['USUARIO', 'ADMIN'], (req, res) => {
            res.success('¡Funcionará todo esto?');
        });

        this.get('/compras', ['COMPRADOR', 'ADMIN'], (req, res) => {
            res.success('Compras Page');
        });

        this.post('/', ['PUBLIC'], (req, res) => {
            res.send('Objeto Creado..!!');
        });

        this.get('/admin-panel', ['ADMIN'], this.mostrarAdminPanel);
    }
}

module.exports = UsuariosRouter;