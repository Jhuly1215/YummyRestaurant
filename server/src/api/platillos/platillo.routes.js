const express = require('express');
const router = express.Router();
const platilloController = require('./platillo.controller');

router.get('/platillos', platilloController.obtenerPlatillos);
router.post('/platillos', platilloController.crearPlatillo);
router.put('/platillos/:id', platilloController.actualizarPlatillo);
router.delete('/platillos/:id', platilloController.eliminarPlatillo);

module.exports = router;
