const express = require('express');

const router = express.Router();

const notificationController = require('../../controllers/job-seeker/notificationController');

router.put('/read', notificationController.readNotification);

module.exports = router;
