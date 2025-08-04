const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const GeoObject = sequelize.define('GeoObject', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('point', 'route', 'polygon'),
    allowNull: false,
  },
  coordinates: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
}, {
  tableName: 'geo_objects',
  timestamps: true,
});

module.exports = GeoObject;
