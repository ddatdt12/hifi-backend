const express = require('express');

const router = express.Router();
const { subcategoryController } = require('../../controllers/admin');

router
	.route('/:id')
	.get(subcategoryController.getAllSubcategories)
	.post(subcategoryController.batchCreateSubcategories)
	.patch(subcategoryController.updateSubcategory)
	.delete(subcategoryController.deleteSubcategory);

module.exports = router;
