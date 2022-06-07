const express = require('express');

const router = express.Router();

const authController = require('../../controllers/company/authController');
const { protectEmployer } = require('../../middlewares/auth');

router.post('/register', authController.register);
router.get('/', protectEmployer, authController.verifyAccessToken);
router.post('/login', authController.login);
router.patch('/:idCompany', authController.updateCompany);

module.exports = router;
