// server/src/app.js
const express = require('express');
const sequelize = require('./src/config/db');
const cors = require('cors');
const path = require("path");
const app = express();

// Servir la carpeta uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middleware para JSON
app.use(express.json());

require('dotenv').config();
app.use(cors());
app.use(express.json());


const ofertasRoutes = require('./src/api/ofertas/oferta.routes');
const platillosRoutes = require('./src/api/platillos/platillo.routes');
const usuarioRoutes = require('./src/api/usuario/usuario.routes');
const authRoutes = require('./src/api/autenticacion/authRoutes');
const actividadRoutes = require('./src/api/usuario/actividadRoutes');
const mesasRoutes = require('./src/api/mesas/mesasRoutes');
const reservaRoutes = require('./src/api/reservas/reservas.routes');
const dashboardRoutes = require('./src/api/dashboard/dashboard.routes');


app.use('/api/ofertas', ofertasRoutes);
app.use('/api/platillos', platillosRoutes);
app.use('/api/usuario', usuarioRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/reservas', reservaRoutes);
app.use('/api/actividad', actividadRoutes);
app.use('/api/mesas', mesasRoutes);
app.use('/api/dashboard', dashboardRoutes);


sequelize.sync()
  .then(() => console.log("Base de datos conectada"))
  .catch((error) => console.error("Error al conectar a la base de datos:", error));

module.exports = app;
