// server/src/app.js
const express = require('express');
const sequelize = require('./src/config/db');
const ofertasRoutes = require('./src/api/ofertas/oferta.routes');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/ofertas', ofertasRoutes);

sequelize.sync()
  .then(() => console.log("Base de datos conectada"))
  .catch((error) => console.error("Error al conectar a la base de datos:", error));

module.exports = app;
