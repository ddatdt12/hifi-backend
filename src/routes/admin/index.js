const express = require('express');

const router = express.Router();
const userRoute = require('./user');
const categoryRoute = require('./category');
const skillRoute = require('./skill');
const postRoute = require('./post');

module.exports = (app) => {
	router.use('/users', userRoute);

	router.use('/categories', categoryRoute);

	router.use('/skills', skillRoute);
	router.use('/posts', postRoute);

	app.use('/api/admin', router);
};
