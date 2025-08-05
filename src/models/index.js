const User = require('./user.model');
const DeviceToken = require('./deviceToken.model');
const GeoObject = require('./geoObject.model');

// Relaciones
User.hasMany(DeviceToken, { foreignKey: 'user_id', as: 'tokens' });
DeviceToken.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// Relaciones nuevas
User.hasMany(GeoObject, { foreignKey: 'user_id', as: 'geoObjects' });
GeoObject.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

/* const syncModels = async () => {
  await User.sync();
  await DeviceToken.sync();
};

module.exports = {
  User,
  DeviceToken,
  syncModels,
};*/

module.exports = {
  User,
  DeviceToken,
  GeoObject,
  syncModels: async () => {
    await User.sync();
    await DeviceToken.sync();
    await GeoObject.sync();
  },
};
