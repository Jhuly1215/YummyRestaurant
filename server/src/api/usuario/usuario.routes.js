// src/api/usuario.routes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('./usuario.controller');

// Define las rutas
router.post('/registrar', usuarioController.registrarUsuario);
router.get('/', usuarioController.obtenerUsuarios);
router.get('/:id', usuarioController.obtenerUsuarioPorId); // Ruta para obtener un usuario específico
router.put('/:id', usuarioController.actualizarUsuario);
router.delete('/:id', usuarioController.eliminarUsuario);

// Rutas para verificación de correo
router.post('/enviar-codigo', usuarioController.enviarCodigo); // Ruta para enviar código de verificación
router.post('/verificar-codigo', usuarioController.verificarCodigo); // Ruta para verificar el código de verificación

module.exports = router;
