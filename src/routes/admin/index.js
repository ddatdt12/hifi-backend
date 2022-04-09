const express = require('express');

const router = express.Router();
const userRoute = require('./user');
const categoryRoute = require('./category');
const skillRoute = require('./skill');
const postRoute = require('./post');

router.use('/users', userRoute);
router.use('/categories', categoryRoute);
router.use('/skills', skillRoute);
router.use('/posts', postRoute);

module.exports = router;
