const express = require('express');

const router = express.Router();
const { applicationController } = require('../../controllers/admin');

router.route('/').get(applicationController.getApplications);

module.exports = router;
