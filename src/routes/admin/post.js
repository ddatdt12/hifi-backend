const express = require('express');

const router = express.Router();

const { postController } = require('../../controllers/admin');

router.route('/').get(postController.getAllPost);
router.route('/pending').get(postController.getPostsPending);
router.route('/approved').get(postController.getPostsApproved);
router
	.route('/:id')
	.patch(postController.approvePost)
	.get(postController.getPostById);

module.exports = router;
