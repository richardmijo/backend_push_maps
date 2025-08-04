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
}, {
  tableName: 'device_tokens',
  timestamps: true,
});

module.exports = DeviceToken;
