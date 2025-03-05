const express = require("express");
const router = express.Router();
const dogController = require("../controllers/dogController");

// Obtener todas las razas
router.get('/dogs', dogController.getAllDogs);

// Obtener raza por nombre (búsqueda por breed)
router.get('/dogs/breed/:breed', dogController.getDogByBreed);

// Obtener raza por id
router.get('/dogs/id/:id', dogController.getDogById);

module.exports = router;
