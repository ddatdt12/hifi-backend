const { Category, SubCategory } = require('../../models');
const catchAsync = require('../../utils/catchAsync');

const getAllCategory = catchAsync(async (req, res, next) => {
	const categories = await Category.find({}).populate('subcategories').lean();
	res.status(200).json({
		message: 'Get all categories',
		categories,
	});
});

const createCategory = catchAsync(async (req, res, next) => {
	const { name } = req.body;
	const category = await SubCategory.create({ name });
	res.status(200).json({
		message: 'Create categories successfully',
		category,
	});
});

module.exports = { createCategory, getAllCategory };
