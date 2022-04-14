const express = require('express');

const router = express.Router();
const suggestionController = require('../../controllers/suggestion');

module.exports = (app) => {
	router.get('/skills', suggestionController.getSkills);
	router.get('/categories', suggestionController.getAllCategory);

	app.use('/api/suggestion', router);
};
