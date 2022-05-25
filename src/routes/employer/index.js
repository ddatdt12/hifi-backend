const express = require('express');

const router = express.Router();
const postRoute = require('./post');
const authRoute = require('./auth');
const applicationRoute = require('./application');
const notificationRoute = require('./notification');
const { protectEmployer } = require('../../middlewares/auth');

const employerRoutes = (app) => {
	router.use('/auth', authRoute);

	router.use(protectEmployer);
	router.use('/posts', postRoute);
	router.use('/applications', applicationRoute);
	router.use('/notifications', notificationRoute);

	app.use('/api/employer', router);
};

module.exports = employerRoutes;
