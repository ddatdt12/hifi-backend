const express = require('express');

const router = express.Router();
const { subcategoryController } = require('../../controllers/job-seeker');

router.route('/:categoryId').get(subcategoryController.getSubByCategoryId);

module.exports = router;
