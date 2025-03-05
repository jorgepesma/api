const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/dogs', adminController.createDog);
router.put('/dogs/:id', adminController.updateDog);
router.delete('/dogs/:id', adminController.deleteDog);
router.get('/dogs', adminController.getAllDogs);

module.exports = router;
