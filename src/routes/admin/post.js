const express = require('express');

const router = express.Router();

const { postController } = require('../../controllers/admin');

router.route('/').get(postController.getAllPost);
router.route('/filter-option').get(postController.getFilterOption);
router
	.route('/:id')
	.patch(postController.approvePost)
	.get(postController.getPostById)
	.delete(postController.deletePost);

module.exports = router;
