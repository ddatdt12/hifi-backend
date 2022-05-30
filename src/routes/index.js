const express = require('express');

const router = express.Router();

const { checkEmailUser } = require('../controllers/commonController');

module.exports = (app) => {
	router.get('/check-employer-or-jobseeker', checkEmailUser);
	app.use('/api', router);
};
