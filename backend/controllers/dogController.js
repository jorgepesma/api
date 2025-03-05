const Dog = require('../models/Dog');

exports.getAllDogs = async (req, res) => {
  try {
    const dogs = await Dog.find();
    res.json(dogs);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener razas' });
  }
};

exports.getDogByBreed = async (req, res) => {
  try {
    const breed = req.params.breed;
    const dog = await Dog.findOne({ breed: new RegExp(breed, 'i') });
    if (!dog) {
      return res.status(404).json({ error: 'Raza no encontrada' });
    }
    res.json(dog);
  } catch (err) {
    res.status(500).json({ error: 'Error en la búsqueda' });
  }
};

exports.getDogById = async (req, res) => {
  try {
    const id = req.params.id;
    const dog = await Dog.findById(id);
    if (!dog) {
      return res.status(404).json({ error: 'Raza no encontrada' });
    }
    res.json(dog);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener la raza' });
  }
};
