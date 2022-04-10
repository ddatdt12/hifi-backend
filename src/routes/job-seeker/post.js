const express = require('express');

const router = express.Router();

const { postController } = require('../../controllers/job-seeker');

router.route('/').get(postController.getAllPost);

module.exports = router;
