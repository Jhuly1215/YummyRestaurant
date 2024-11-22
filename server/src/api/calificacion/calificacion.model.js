const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Calificacion = sequelize.define('Resenia', {
  idresenia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  puntuacion: {
    type: DataTypes.INTEGER,
    allowNull: true, // Permitimos NULL
  },
  idusuario: {
    type: DataTypes.INTEGER,
    allowNull: true, // Permitimos NULL
    references: {
      model: 'usuario',
      key: 'idusuario',
    },
  },
  idplato: {
    type: DataTypes.INTEGER,
    allowNull: true, // Permitimos NULL
    references: {
      model: 'platillo',
      key: 'idplato',
    },
  },
});

module.exports = Calificacion;
