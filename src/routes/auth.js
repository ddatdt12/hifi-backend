const express = require('express');

const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middlewares/auth');

module.exports = (app) => {
	router.post('/login', authController.login);
	app.use('/api/auth', router);
};
