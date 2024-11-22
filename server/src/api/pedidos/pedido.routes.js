//src/api/pedido/pedido.routes.js
const express = require('express');
const router = express.Router();
const pedidoController = require('./pedido.controller');

router.get('/', pedidoController.obtenerPedidos);
router.post('/', pedidoController.crearPedido);
router.put('/:id', pedidoController.actualizarPedido);
router.delete('/:id', pedidoController.eliminarPedido);

module.exports = router;
