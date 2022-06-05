const express = require('express');

const router = express.Router();
const postRoute = require('./post');
const authRoute = require('./auth');
const userRoute = require('./user');
const notificationRoute = require('./notification');
const profileRoute = require('./profile');
const categoryRoute = require('./category');
const subcategoryRoute = require('./subcategory');

module.exports = (app) => {
	router.use('/posts', postRoute);
	router.use('/auth', authRoute);
	router.use('/me', userRoute);
	router.use('/notifications', notificationRoute);
	router.use('/profile', profileRoute);
	router.use('/categories', categoryRoute);
	router.use('/subcategories', subcategoryRoute);

	app.use('/api/job-seeker', router);
};
