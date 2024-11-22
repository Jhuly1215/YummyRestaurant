// src/api/categoria.routes.js
const express = require('express');
const router = express.Router();
const categoriaController = require('./categoria.controller');

router.get('/categorias', categoriaController.obtenerCategorias);
router.post('/categorias', categoriaController.crearCategoria);
router.put('/categorias/:id', categoriaController.actualizarCategoria);
router.delete('/categorias/:id', categoriaController.eliminarCategoria);

module.exports = router;
