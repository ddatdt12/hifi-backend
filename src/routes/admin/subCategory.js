const express = require('express');

const router = express.Router();
const { subCategoryController } = require('../../controllers/admin');

router
	.route('/')
	.get(subCategoryController.getAllSubCategories)
	.post(subCategoryController.batchCreateSubCategories)
	.patch(subCategoryController.updateSubCategory)
	.delete(subCategoryController.deleteSubCategory);

module.exports = router;
