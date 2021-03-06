const express = require('express');

const router = express.Router();
const userRoute = require('./user');
const categoryRoute = require('./category');
const subcategoryRoute = require('./subcategory');
const skillRoute = require('./skill');
const postRoute = require('./post');
const companyRoute = require('./company');
const applicationRoute = require('./application');
const notificationRoute = require('./notification');
const authRoute = require('./auth');

module.exports = (app) => {
	router.use('/users', userRoute);
	router.use('/categories', categoryRoute);

	router.use('/subcategories', subcategoryRoute);

	router.use('/skills', skillRoute);
	router.use('/posts', postRoute);

	router.use('/companies', companyRoute);
	router.use('/applications', applicationRoute);

	router.use('/notifications', notificationRoute);
	router.use('/auth', authRoute);

	app.use('/api/admin', router);
};
