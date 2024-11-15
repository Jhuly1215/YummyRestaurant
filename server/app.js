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







app.use('/api/ofertas', ofertasRoutes);
app.use('/api/usuario', usuarioRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/actividad', actividadRoutes);

sequelize.sync()
  .then(() => console.log("Base de datos conectada"))
  .catch((error) => console.error("Error al conectar a la base de datos:", error));

module.exports = app;
