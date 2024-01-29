const nodemailer = require('nodemailer');
const { modeloProductos } = require('../models/productos.model.js');
const { MiRouter } = require("./router.js");

class ProductosRouter extends MiRouter {
    

    init() {
        
        this.delete('/eliminar-producto/:id', ['USUARIO', 'ADMIN'], this.verificarUsuarioPremium.bind(this), this.eliminarProducto.bind(this));
    }

    async verificarUsuarioPremium(req, res, next) {
        try {
            const productId = req.params.id;

            const producto = await modeloProductos.findById(productId);

            const esUsuarioPremium = producto.propietario.premium;

            if (esUsuarioPremium) {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'tucorreo@gmail.com',
                        pass: 'tupassword',
                    },
                });

                const mailOptions = {
                    from: 'tucorreo@gmail.com',
                    to: producto.propietario.correo,
                    subject: 'Eliminación de producto premium',
                    text: `Tu producto "${producto.nombre}" ha sido eliminado.`,
                };

                await transporter.sendMail(mailOptions);
            }

            next();
        } catch (error) {
            console.error(error);
            res.errorCliente('Error al verificar usuario premium.');
        }
    }

    async eliminarProducto(req, res) {
        try {
            const productId = req.params.id;

            await modeloProductos.findByIdAndDelete(productId);

            res.success('Producto eliminado correctamente.');
        } catch (error) {
            console.error(error);
            res.errorCliente('Error al eliminar el producto.');
        }
    }
}