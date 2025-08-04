const express = require('express');
const router = express.Router();
const { sendToUser, sendToManyUsers } = require('../controllers/notification.controller');

router.post('/send-one', sendToUser);
router.post('/send-many', sendToManyUsers);

module.exports = router;
