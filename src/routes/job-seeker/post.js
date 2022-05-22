const express = require('express');

const router = express.Router();

const { postController } = require('../../controllers/job-seeker');
const { checkUser } = require('../../middlewares/auth');

router.get('/', checkUser, postController.getAllPost);
router.route('/filter-option').get(postController.getFilterOption);
router.get('/:id', checkUser, postController.getPostById);

module.exports = router;
