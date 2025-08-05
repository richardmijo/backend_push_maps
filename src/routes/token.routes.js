const express = require('express');
const router = express.Router();
const { registerToken, getTokensByUser, getAllTokens } = require('../controllers/token.controller');

router.post('/', registerToken);
router.get('/:userId', getTokensByUser);
router.get('/', getAllTokens);

module.exports = router;
