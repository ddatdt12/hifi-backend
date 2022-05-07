const express = require('express');

const router = express.Router();

const { postController } = require('../../controllers/company');

router
	.route('/')
	.get(postController.getAllPost)
	.post(postController.createJobPost);

router.route('/:idCompany').get(postController.getAllPostByCompany);

module.exports = router;
