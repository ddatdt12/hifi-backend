const express = require('express');

const router = express.Router();

const { postController } = require('../../controllers/job_seeker');

router.route('/').get(postController.getAllPost);

module.exports = router;
