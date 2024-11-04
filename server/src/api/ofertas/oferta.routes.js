// src/api/ofertas/oferta.routes.js
const express = require('express');
const router = express.Router();
const ofertasController = require('./oferta.controller');

// Define las rutas
router.post('/', ofertasController.crearOferta);
router.get('/', ofertasController.obtenerOfertas);
router.put('/:id', ofertasController.actualizarOferta);
router.delete('/:id', ofertasController.eliminarOferta);

module.exports = router;
