const express = require('express');

const router = express.Router();
const authController = require('../../controllers/job-seeker/authController');
const { protectJobSeeker } = require('../../middlewares/auth');

router.get('/', protectJobSeeker, authController.authenicate);
router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;
