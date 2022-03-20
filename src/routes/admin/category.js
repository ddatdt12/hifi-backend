const express = require('express');

const router = express.Router();
const { categoryController } = require('../../controllers/admin');

router
	.route('/')
	.get(categoryController.getAllCategory)
	.post(categoryController.createCategory);

module.exports = router;
