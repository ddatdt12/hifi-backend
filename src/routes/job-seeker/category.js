const express = require('express');

const router = express.Router();
const { categoryController } = require('../../controllers/job-seeker');

router.route('/').get(categoryController.getAllCategories);

module.exports = router;
