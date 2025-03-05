const Dog = require('../models/Dog');

exports.createDog = async (req, res) => {
  try {
    const { breed, image, temperament, life_span, height, description } = req.body;
    // Si no se recibe descripción, se asigna un valor por defecto
    const newDog = new Dog({
      breed,
      image,
      temperament,
      life_span,
      height,
      description: description || 'Sin descripción'
    });
    const savedDog = await newDog.save();
    res.status(201).json(savedDog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear raza' });
  }
};

exports.updateDog = async (req, res) => {
  try {
    const { breed, image, temperament, life_span, height, description } = req.body;
    const updatedDog = await Dog.findByIdAndUpdate(
      req.params.id,
      {
        breed,
        image,
        temperament,
        life_span,
        height,
        description: description || 'Sin descripción'
      },
      { new: true }
    );
    res.json(updatedDog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar raza' });
  }
};

exports.deleteDog = async (req, res) => {
  try {
    await Dog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Raza eliminada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar raza' });
  }
};

exports.getAllDogs = async (req, res) => {
  try {
    const dogs = await Dog.find();
    res.json(dogs);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener razas' });
  }
};
