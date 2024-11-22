const express = require('express');
const router = express.Router();
const platilloController = require('./platillo.controller');

router.get('/', platilloController.obtenerPlatillos);
router.post('/', platilloController.crearPlatillo);
router.put('/:id', platilloController.actualizarPlatillo);
router.delete('/:id', platilloController.eliminarPlatillo);

module.exports = router;
