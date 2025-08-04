const { DeviceToken, User } = require('../models');

const registerToken = async (req, res) => {
  const { userId, token } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const existing = await DeviceToken.findOne({ where: { token, userId } });
    if (existing) {
      return res.status(200).json({ message: 'Token ya registrado', token: existing });
    }

    const newToken = await DeviceToken.create({ token, userId });
    return res.status(201).json(newToken);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getTokensByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const tokens = await DeviceToken.findAll({ where: { userId } });
    return res.json(tokens);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { registerToken, getTokensByUser };
