const express = require('express');

const router = express.Router();
const suggestionController = require('../../controllers/suggestion');
const { checkEmailUser } = require('../../controllers/commonController');

module.exports = (app) => {
	router.get('/skills', suggestionController.getSkills);
	router.get('/categories', suggestionController.getAllCategory);
	router.get('/users', suggestionController.getAllUser);
	router.get('/rooms/:userId', suggestionController.getRoomsByUserId);
	router.get('/rooms', suggestionController.getAllRooms);
	router.get('/universities', suggestionController.getUniversities);
	router.get('/majors', suggestionController.getMajors);
	router.get('/degrees', suggestionController.getDegrees);
	router.get('/:categoryId/posts', suggestionController.getPosts);
	router.get('/companies/:idCompany', suggestionController.getCompany);
	router.get('/companies', suggestionController.getCompanies);
	router.get('/check-employer-or-jobseeker', checkEmailUser);

	app.use('/api/suggestion', router);
};
