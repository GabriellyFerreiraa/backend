const { MiRouter } = require('./router.js');

const router = new MiRouter().getRouter();

router.get('/', (req, res) => {
    res.status(200).render('home');
});

router.get('/registro', (req, res) => {
    res.status(200).render('registro');
});

router.get('/login', (req, res) => {
    res.status(200).render('login');
});

router.get('/perfil', (req, res) => {
    res.status(200).render('perfil');
});

module.exports = router;