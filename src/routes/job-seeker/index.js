const express = require('express');

const router = express.Router();
const postRoute = require('./post');
const authRoute = require('./auth');
const userRoute = require('./user');

module.exports = (app) => {
	router.use('/posts', postRoute);
	router.use('/auth', authRoute);
	router.use('/me', userRoute);

	app.use('/api/job-seeker', router);
};
