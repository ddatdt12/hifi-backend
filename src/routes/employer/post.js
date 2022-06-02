const express = require('express');

const router = express.Router();

const { postController } = require('../../controllers/company');

router
	.route('/')
	.get(postController.getAllPost)
	.post(postController.createJobPost);
router.route('/filter-option').get(postController.getFilterOption);
router
	.route('/:id')
	.get(postController.getPostById)
	.delete(postController.deletePost);

router.route('/company/:idCompany').get(postController.getAllPostByCompany);

module.exports = router;
