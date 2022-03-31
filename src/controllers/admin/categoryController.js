const Category = require('../../models/Category');
const catchAsync = require('../../utils/catchAsync');

const getAllCategories = catchAsync(async (req, res, next) => {
	const result = await Category.find({}).lean();

	res.status(200).json(result);
});

const getCategory = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const result = await Category.findById(id).populate('subcategories').lean();

	res.status(200).json(result);
});

const createCategory = catchAsync(async (req, res, next) => {
	const { name, imageUrl } = req.body;
	const result = await Category.create({ name: name, imageUrl: imageUrl });

	res.status(200).json(result);
});

const updateCategory = catchAsync(async (req, res, next) => {
	const { name, imageUrl } = req.body;
	const { id } = req.params;
	const result = await Category.findByIdAndUpdate(
		id,
		{ name: name, imageUrl: imageUrl },
		{ new: true, runValidators: true }
	);

	res.status(200).json(result);
});

const deleteCategory = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const result = await Category.findByIdAndDelete(id);

	res.status(200).json(result);
});

module.exports = {
	createCategory,
	getAllCategories,
	getCategory,
	updateCategory,
	deleteCategory,
};
