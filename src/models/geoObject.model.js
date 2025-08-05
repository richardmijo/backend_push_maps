const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const GeoObject = sequelize.define('GeoObject', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: { // 👈 consistente con el modelo User y DeviceToken
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
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
  underscored: true // 👈 esto convierte camelCase en snake_case automáticamente
});

module.exports = GeoObject;
