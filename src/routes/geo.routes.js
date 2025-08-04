const express = require('express');
const router = express.Router();
const {
  createGeoObject,
  getAllGeoObjects,
  getGeoObjectById,
  updateGeoObject,
  deleteGeoObject,
} = require('../controllers/geo.controller');

router.post('/', createGeoObject);
router.get('/', getAllGeoObjects);
router.get('/:id', getGeoObjectById);
router.put('/:id', updateGeoObject);
router.delete('/:id', deleteGeoObject);

module.exports = router;
