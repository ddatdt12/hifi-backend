const express = require('express');

const router = express.Router();

const { postController } = require('../../controllers/job_seeker');

router.route('/posts').get(postController.getAllPost);

module.exports = router;
