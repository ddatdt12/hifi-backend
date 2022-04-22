const express = require('express');

const router = express.Router();

const { postController } = require('../../controllers/job_seeker');

router.route('/').get(postController.getAllPost);
router.route('/filter-option').get(postController.getFilterOption);
router.route('/:id').get(postController.getPostById);

module.exports = router;
