const express = require('express');
const router = express.Router();
const calificacionesController = require('./calificacion.controller');

// Define las rutas
router.post('/', calificacionesController.crearCalificacion);
router.get('/', calificacionesController.obtenerCalificaciones);
router.put('/:id', calificacionesController.actualizarCalificacion);
router.delete('/:id', calificacionesController.eliminarCalificacion);

module.exports = router;
