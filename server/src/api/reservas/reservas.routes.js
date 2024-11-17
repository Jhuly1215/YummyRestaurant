// src/api/reserva/reserva.routes.js
const express = require('express');
const router = express.Router();
const reservasController = require('./reservas.controller');

// Define las rutas
router.post('/', reservasController.crearReserva);
router.get('/', reservasController.obtenerReservas);
router.put('/:id', reservasController.actualizarReserva);
router.delete('/:id', reservasController.eliminarReserva);


module.exports = router;
