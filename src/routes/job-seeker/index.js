const express = require('express');

const router = express.Router();
const postRoute = require('./post');
const authRoute = require('./auth');

module.exports = (app) => {
	router.use('/posts', postRoute);
	router.use('/auth', authRoute);
	app.use('/api/job-seeker', router);
};
