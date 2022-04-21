const express = require('express');

const router = express.Router();
const { subCategoryController } = require('../../controllers/admin');

router
	.route('/:id')
	.get(subCategoryController.getAllSubcategories)
	.post(subCategoryController.batchCreateSubcategories)
	.patch(subCategoryController.updateSubcategory)
	.delete(subCategoryController.deleteSubcategory);

module.exports = router;
