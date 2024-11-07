// src/api/usuario.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Usuario = sequelize.define('Usuario', {
  idUsuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  apellidos: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  idrol: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'rol',
      key: 'idrol',
    },
  },
});

module.exports = Usuario;
