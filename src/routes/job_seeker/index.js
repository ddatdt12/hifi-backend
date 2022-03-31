const express = require('express');

const router = express.Router();
const postRoute = require('./post');

module.exports = (app) => {
	router.use('/posts', postRoute);
	app.use('/api/job-seeker', router);
};
