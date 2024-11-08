// src/api/platillo.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Platillo = sequelize.define('Platillo', {
  idPlatillo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  idCategoria: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categoria', // Asegúrate de que esta referencia existe en tu base de datos
      key: 'idCategoria',
    },
  },
});

module.exports = Platillo;
