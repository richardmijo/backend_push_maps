const { GeoObject } = require('../models');

const createGeoObject = async (req, res) => {
  const { user_id, name, type, coordinates } = req.body;

  try {
    const geo = await GeoObject.create({ user_id, name, type, coordinates });
    return res.status(201).json(geo);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getAllGeoObjects = async (req, res) => {
  try {
    const objects = await GeoObject.findAll();
    return res.json(objects);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getGeoObjectById = async (req, res) => {
  try {
    const geo = await GeoObject.findByPk(req.params.id);
    if (!geo) return res.status(404).json({ message: 'No encontrado' });
    return res.json(geo);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateGeoObject = async (req, res) => {
  try {
    const geo = await GeoObject.findByPk(req.params.id);
    if (!geo) return res.status(404).json({ message: 'No encontrado' });

    const { name, type, coordinates } = req.body;
    await geo.update({ name, type, coordinates });

    return res.json(geo);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteGeoObject = async (req, res) => {
  try {
    const geo = await GeoObject.findByPk(req.params.id);
    if (!geo) return res.status(404).json({ message: 'No encontrado' });

    await geo.destroy();
    return res.json({ message: 'Eliminado correctamente' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createGeoObject,
  getAllGeoObjects,
  getGeoObjectById,
  updateGeoObject,
  deleteGeoObject,
};
