const express = require('express');

const router = express.Router();

const { checkEmailUser } = require('../controllers/commonController');

router.get('/check-employer-or-jobseeker', checkEmailUser);

module.exports = router;
