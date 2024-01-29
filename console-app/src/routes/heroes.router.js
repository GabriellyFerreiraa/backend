let heroes = [
    { id: 1, nombre: 'Superman' },
    { id: 2, nombre: 'Batman' },
    { id: 3, nombre: 'Wonder Woman' },
  ];
  
  const obtenerHeroes = (req, res) => {
    res.json(heroes);
  };
  
  const obtenerHeroePorId = (req, res) => {
    const id = parseInt(req.params.id);
    const heroe = heroes.find(hero => hero.id === id);
  
    if (heroe) {
      res.json(heroe);
    } else {
      res.status(404).json({ mensaje: 'Héroe no encontrado' });
    }
  };
  
  const agregarHeroe = (req, res) => {
    const nuevoHeroe = req.body;
    nuevoHeroe.id = heroes.length + 1;
    heroes.push(nuevoHeroe);
  
    res.status(201).json({ mensaje: 'Héroe agregado correctamente', heroe: nuevoHeroe });
  };
  
  const eliminarHeroe = (req, res) => {
    const id = parseInt(req.params.id);
    heroes = heroes.filter(hero => hero.id !== id);
  
    res.json({ mensaje: 'Héroe eliminado correctamente', id: id });
  };
  
  module.exports = {
    obtenerHeroes,
    obtenerHeroePorId,
    agregarHeroe,
    eliminarHeroe,
  };