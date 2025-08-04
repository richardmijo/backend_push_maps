const { User, DeviceToken } = require('../models');
const { sendNotification } = require('../services/notification.service');

// Enviar a un usuario
const sendToUser = async (req, res) => {
  const { userId, title, body } = req.body;

  try {
    const tokens = await DeviceToken.findAll({ where: { userId } });
    if (tokens.length === 0) return res.status(404).json({ message: 'Usuario sin tokens registrados' });

    const response = await sendNotification({
      tokens: tokens.map(t => t.token),
      title,
      body
    });

    return res.json({ success: true, response });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Enviar a varios usuarios
const sendToManyUsers = async (req, res) => {
  const { userIds, title, body } = req.body;

  try {
    const tokens = await DeviceToken.findAll({ where: { userId: userIds } });
    if (tokens.length === 0) return res.status(404).json({ message: 'No hay tokens para los usuarios' });

    const response = await sendNotification({
      tokens: tokens.map(t => t.token),
      title,
      body
    });

    return res.json({ success: true, response });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { sendToUser, sendToManyUsers };
