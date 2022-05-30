const express = require('express');

const router = express.Router();
const authController = require('../../controllers/admin/authController');
const { protectAdmin } = require('../../middlewares/auth');

router.get('/', protectAdmin, authController.verifyAccessToken);
router.post('/login', authController.login);

module.exports = router;
