const express = require('express');

const router = express.Router();
const postRoute = require('./post');
const authRoute = require('./auth');

const employerRoutes = (app) => {
	router.use('/posts', postRoute);
	router.use('/auth', authRoute);

	app.use('/api/employer', router);
};

module.exports = employerRoutes;
