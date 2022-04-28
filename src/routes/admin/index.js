const express = require('express');

const router = express.Router();
const userRoute = require('./user');
const categoryRoute = require('./category');
const skillRoute = require('./skill');
const companyRoute = require('./company');
const applicationRoute = require('./application');

module.exports = (app) => {
	router.use('/users', userRoute);
	router.use('/categories', categoryRoute);
	router.use('/skills', skillRoute);
	router.use('/companies', companyRoute);
	router.use('/applications', applicationRoute);
	app.use('/api/admin', router);
};
