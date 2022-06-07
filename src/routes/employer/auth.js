const express = require('express');

const router = express.Router();

const authController = require('../../controllers/company/authController');
const { protectEmployer } = require('../../middlewares/auth');

router.get('/', protectEmployer, authController.verifyAccessToken);
router.post('/login', authController.login);
router.patch('/:idCompany', authController.updateCompany);
router.post('/register', authController.register);
router.patch('/password/:idUser', authController.updatePassword);

module.exports = router;
