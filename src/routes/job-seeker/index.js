const express = require('express');

const router = express.Router();
const postRoute = require('./post');
const authRoute = require('./auth');
const userRoute = require('./user');
const notificationRoute = require('./notification');

module.exports = (app) => {
	router.use('/posts', postRoute);
	router.use('/auth', authRoute);
	router.use('/me', userRoute);
	router.use('/notifications', notificationRoute);

	app.use('/api/job-seeker', router);
};
