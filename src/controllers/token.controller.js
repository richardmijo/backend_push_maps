const { DeviceToken, User } = require('../models');

const registerToken = async (req, res) => {
  const { user_id, token } = req.body;

  console.error(req.body);

  console.error(user_id);

  try {
    const user = await User.findByPk(user_id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const existing = await DeviceToken.findOne({ where: { token, user_id } });
    if (existing) {
      return res.status(200).json({ message: 'Token ya registrado', token: existing });
    }

    const newToken = await DeviceToken.create({ token, user_id });
    return res.status(201).json(newToken);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getTokensByUser = async (req, res) => {
  const { userId } = req.params;

  //const userId = user_id;
  
  try {
    const tokens = await DeviceToken.findAll({ where: { userId } });
    return res.json(tokens);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


const getAllTokens = async (req, res) => {
  try {
    const tokens = await DeviceToken.findAll(); 
    res.json(tokens);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los tokens' });
  }
};

// module.exports = { registerToken, getTokensByUser };
module.exports = { registerToken, getTokensByUser, getAllTokens };
