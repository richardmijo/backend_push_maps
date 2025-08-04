const admin = require('../config/firebase');

const sendNotification = async ({ tokens, title, body }) => {
  const message = {
    notification: { title, body },
    tokens, // envía a múltiples tokens
  };

  try {
    const response = await admin.messaging().sendMulticast(message);
    return response;
  } catch (error) {
    throw new Error('Error al enviar notificaciones: ' + error.message);
  }
};

module.exports = { sendNotification };
