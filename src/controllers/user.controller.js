const { User } = require('../models');

const createUser = async (req, res) => {
  const { name, email } = req.body;

  try {
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: 'El correo ya está registrado' });
    }

    const user = await User.create({ name, email });
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getAllUsers = async (_req, res) => {
  try {
    const users = await User.findAll({ include: ['tokens'] });
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { createUser, getAllUsers };
