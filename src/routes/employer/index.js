const express = require('express');

const router = express.Router();
const postRoute = require('./post');
const authRoute = require('./auth');
const applicationRoute = require('./application');

const employerRoutes = (app) => {
	router.use('/posts', postRoute);
	router.use('/auth', authRoute);
	router.use('/applications', applicationRoute);

	app.use('/api/employer', router);
};

module.exports = employerRoutes;
