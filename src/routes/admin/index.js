const express = require('express');

const router = express.Router();
const userRoute = require('./user');
const categoryRoute = require('./category');
const skillRoute = require('./skill');

router.use('/users', userRoute);
router.use('/categories', categoryRoute);
router.use('/skills', skillRoute);

module.exports = router;
