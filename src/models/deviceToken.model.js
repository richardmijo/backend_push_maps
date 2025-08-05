const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const DeviceToken = sequelize.define('DeviceToken', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  token: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  user_id: { // 👈 usa snake_case porque en User está underscored: true
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // 👈 nombre de la tabla, no del modelo
      key: 'id'
    }
  },
}, {
  tableName: 'device_tokens',
  timestamps: true,
  underscored: true
});

module.exports = DeviceToken;
