const express = require('express');

const router = express.Router();
const postRoute = require('./post');
const profileRoute = require('./profile');

module.exports = (app) => {
	router.use('/posts', postRoute);
	router.use('/:id', profileRoute);
	app.use('/api/job-seeker', router);
};
