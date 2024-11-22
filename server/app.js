// server/src/app.js
const express = require('express');
const sequelize = require('./src/config/db');

const cors = require('cors');
const app = express();

require('dotenv').config();
app.use(cors());
app.use(express.json());


const ofertasRoutes = require('./src/api/ofertas/oferta.routes');
const usuarioRoutes = require('./src/api/usuario/usuario.routes');
const authRoutes = require('./src/api/autenticacion/authRoutes');
const actividadRoutes = require('./src/api/usuario/actividadRoutes');
const mesasRoutes = require('./src/api/mesas/mesasRoutes');
const platillosRoutes = require('./src/api/platillos/platillo.routes');
const categoriasRoutes = require('./src/api/categorias/categoria.routes');
const reservaRoutes = require('./src/api/reservas/reservas.routes');
const pedidosRoutes = require('./src/api/pedidos/pedido.routes');
const detalle_pedidoRoutes = require('./src/api/detalle_pedido/detalle_pedido.routes');
const pagosRoutes = require('./src/api/pagos/pago.routes');



app.use('/api/ofertas', ofertasRoutes);
app.use('/api/platillos', platillosRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/usuario', usuarioRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/reservas', reservaRoutes);
app.use('/api/actividad', actividadRoutes);
app.use('/api/mesas', mesasRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use('/api/detalle_pedido', detalle_pedidoRoutes);
app.use('/api/pagos', pagosRoutes);


sequelize.sync()
  .then(() => console.log("Base de datos conectada"))
  .catch((error) => console.error("Error al conectar a la base de datos:", error));

module.exports = app;
