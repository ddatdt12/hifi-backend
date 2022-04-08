const Category = require('../../models/Category');
const Subcategory = require('../../models/Subcategory');
const AppError = require('../../utils/AppError');
const catchAsync = require('../../utils/catchAsync');

const getAllSubcategories = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const result = await Subcategory.find({ category: id });

	res.status(200).json({ message: 'success', data: result });
});

const batchCreateSubcategories = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const { subcategories } = req.body;

	if (!subcategories || !Array.isArray(subcategories)) {
		return next(new AppError('Invalid data', 500));
	}
	if (id) {
		const category = await Category.findById(id);
		if (!category) {
			return next(new AppError('Category not exists!'));
		}
		subcategories.forEach((sub) => (sub.category = id));
	}
	const result = await Subcategory.create(subcategories);

	res.status(200).json({ message: 'success', data: result });
});

const updateSubcategory = catchAsync(async (req, res, next) => {
	const { name } = req.body;
	const { id } = req.params;

	const result = await Subcategory.findByIdAndUpdate(
		id,
		{ name: name },
		{ new: true, runValidators: true }
	);

	res.status(200).json({ message: 'success', data: result });
});

const deleteSubcategory = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const result = await Subcategory.findByIdAndDelete(id);

	res.status(200).json({ message: 'success', data: result });
});

module.exports = {
	batchCreateSubcategories,
	getAllSubcategories,
	updateSubcategory,
	deleteSubcategory,
};
