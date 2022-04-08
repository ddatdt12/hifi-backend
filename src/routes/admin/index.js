const express = require('express');

const router = express.Router();
const userRoute = require('./user');
const categoryRoute = require('./category');
const subcategoryRoute = require('./subcategory');
const skillRoute = require('./skill');

router.use('/users', userRoute);
router.use('/categories', categoryRoute);
router.use('/subcategories', subcategoryRoute);
router.use('/skills', skillRoute);

module.exports = router;
