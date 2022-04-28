const express = require('express');

const router = express.Router();

const { postController } = require('../../controllers/job-seeker');

router.route('/').get(postController.getAllPosts);
router.route('/:id').get(postController.getPostDetail);

module.exports = router;
