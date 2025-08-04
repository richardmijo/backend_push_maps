const express = require('express');
const router = express.Router();
const { registerToken, getTokensByUser } = require('../controllers/token.controller');

router.post('/', registerToken);
router.get('/:userId', getTokensByUser);

module.exports = router;
