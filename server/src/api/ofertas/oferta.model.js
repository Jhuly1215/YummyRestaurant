// src/api/oferta.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Oferta = sequelize.define('Oferta', {
  idOferta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descripcion: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  requerimiento: {
    type: DataTypes.STRING(70),
    allowNull: false,
  },
  fecha_inicio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fecha_fin: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  descuento: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idPlato: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'platos',
      key: 'idPlato',
    },
  },
});

module.exports = Oferta;
