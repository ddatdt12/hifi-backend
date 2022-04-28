const express = require('express');

const router = express.Router();
const { applicationContronller } = require('../../controllers/admin');

router.route('/').get(applicationContronller.getApplications);

module.exports = router;
